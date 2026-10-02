# Gradient Boosting

El [gradient boosting](../glosario.md#gradient-boosting) es un
[ensamble](../glosario.md#ensamble) de [árboles de decisión](arbol-decision.md) para
[clasificación](../glosario.md#clasificacion) en el que los árboles se construyen **uno tras
otro**, y cada árbol nuevo se concentra en corregir los errores que cometen los anteriores. A
diferencia del [random forest](random-forest.md), donde los árboles son profundos e
independientes y se promedian, aquí cada árbol es pequeño y débil por sí solo; la fuerza del
modelo viene de sumar muchas correcciones pequeñas.

## Cómo construye los árboles

El modelo trabaja sobre el *log-odds* (logit) de la probabilidad de la clase positiva, igual que
la [regresión logística](regresion-logistica.md):

1. Parte de una predicción inicial igual para todos los registros (la proporción de la clase
   positiva en entrenamiento).
2. Calcula, para cada registro, cuánto se equivoca la predicción actual (el gradiente de la
   pérdida logarítmica, que en la práctica es la diferencia entre la clase real y la
   probabilidad predicha).
3. Entrena un árbol pequeño que intenta predecir esos errores.
4. Suma ese árbol al modelo, multiplicado por una tasa de aprendizaje \( \eta \):

\[
F_m(x) = F_{m-1}(x) + \eta \, h_m(x)
\]

- \( F_m(x) \) es el *log-odds* predicho después de \( m \) árboles y \( h_m(x) \) el árbol
  \( m \).
- \( \eta \) (`learning_rate`) controla cuánto corrige cada árbol: valores pequeños hacen
  correcciones cautelosas.
- Los pasos 2 a 4 se repiten `n_estimators` veces. La probabilidad final se obtiene aplicando la
  función logística a \( F_M(x) \).

Como cada árbol se ajusta a lo que los anteriores no explicaron, el modelo puede seguir
mejorando en entrenamiento indefinidamente; por eso, a diferencia del random forest, **demasiados
árboles sí producen [sobreajuste](../glosario.md#sobreajuste)**.

## Escalado

El gradient boosting usa árboles, así que **no necesita escalar** las variables. Sí necesita que
las variables categóricas estén codificadas como números.

## Código básico

```python
from sklearn.ensemble import GradientBoostingClassifier

modelo = GradientBoostingClassifier(n_estimators=numero_arboles, learning_rate=tasa,
                                    max_depth=profundidad, random_state=42)
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_val)
y_prob = modelo.predict_proba(X_val)[:, 1]
```

- `numero_arboles` es la cantidad de árboles que se suman (por defecto 100), `tasa` la tasa de
  aprendizaje (por defecto 0,1) y `profundidad` la profundidad de cada árbol (por defecto 3).
- `X_train`, `y_train` son las variables y la variable objetivo del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `X_val` las variables
  del [conjunto de validación](../glosario.md#conjunto-validacion).
- `random_state=42` fija la semilla (relevante cuando se usa `subsample` o al elegir entre
  divisiones empatadas), para que el resultado sea reproducible.
- `y_pred` es la clase predicha con umbral 0,5 y `y_prob` la probabilidad de la clase positiva.
- `GradientBoostingClassifier` entrena los árboles en secuencia y no tiene `n_jobs`: no puede
  paralelizar el entrenamiento de un modelo.

!!! tip "Alternativas más rápidas"
    Con muchos datos (decenas de miles de filas o más), `GradientBoostingClassifier` se vuelve
    lento. `HistGradientBoostingClassifier`, también de `sklearn.ensemble`, implementa la misma
    idea agrupando cada variable en intervalos (histogramas), es mucho más rápido, admite valores
    nulos sin imputar y tiene detención temprana automática con datos grandes. Sus
    hiperparámetros equivalentes son `max_iter` (número de árboles), `learning_rate`,
    `max_depth` y `max_leaf_nodes`. Fuera de scikit-learn existen bibliotecas especializadas
    como XGBoost y LightGBM, basadas en el mismo principio.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `n_estimators` | Número de árboles (por defecto 100) | Pocos árboles: [subajuste](../glosario.md#subajuste). Demasiados: sobreajuste, porque el modelo sigue corrigiendo el ruido del entrenamiento |
| `learning_rate` | Cuánto aporta cada árbol (por defecto 0,1) | Valores pequeños (0,01 a 0,1) generalizan mejor pero necesitan más árboles. Valores grandes aprenden rápido y sobreajustan con facilidad |
| `max_depth` | Profundidad de cada árbol (por defecto 3) | Árboles de profundidad 2 a 5 son lo habitual. Más profundidad captura interacciones más complejas entre variables, pero aumenta el sobreajuste |
| `subsample` | Fracción de registros que usa cada árbol (por defecto 1,0) | Valores menores que 1 (por ejemplo, 0,8) introducen azar, reducen la varianza y suelen mejorar la generalización; demasiado bajos producen subajuste |
| `min_samples_leaf` | Mínimo de registros en cada hoja (por defecto 1) | Valores más grandes suavizan los árboles y reducen el sobreajuste |

### Compromiso entre `learning_rate` y `n_estimators`

Estos dos hiperparámetros actúan juntos: lo que importa es, aproximadamente, su producto.
Reducir `learning_rate` a la mitad suele requerir el doble de árboles para llegar al mismo
desempeño, aunque con frecuencia el resultado generaliza algo mejor. Por eso no conviene
ajustarlos por separado: fije una tasa pequeña y deje que la detención temprana (sección
siguiente) o la grilla elija el número de árboles.

## Detención temprana

En lugar de fijar `n_estimators`, puede dar un número máximo de árboles y dejar que el modelo se
detenga cuando deja de mejorar:

```python
modelo = GradientBoostingClassifier(n_estimators=1000, learning_rate=0.05,
                                    n_iter_no_change=10, validation_fraction=0.1,
                                    random_state=42)
modelo.fit(X_train, y_train)
print(modelo.n_estimators_)
```

- `validation_fraction=0.1` reserva internamente el 10 % de `X_train` para vigilar el error;
  esos registros no se usan para entrenar los árboles.
- `n_iter_no_change=10` detiene el entrenamiento si el error en esa fracción no mejora durante
  10 árboles seguidos.
- `n_estimators_` (con guion bajo final) es el número de árboles que realmente se entrenaron.
  Si es igual al máximo (1000), el modelo seguía mejorando: aumente el máximo o la tasa.

## Desbalance de clases

`GradientBoostingClassifier` **no tiene** `class_weight`. Para dar más peso a la clase
minoritaria con [desbalance de clases](../glosario.md#desbalance-de-clases), pase pesos por
registro a `fit`:

```python
from sklearn.utils.class_weight import compute_sample_weight

pesos = compute_sample_weight("balanced", y_train)
modelo = GradientBoostingClassifier(random_state=42)
modelo.fit(X_train, y_train, sample_weight=pesos)
```

- `pesos` asigna a cada registro un peso inversamente proporcional a la frecuencia de su clase:
  los registros de la clase minoritaria pesan más.
- Los pesos también pueden pasarse a una búsqueda: `busqueda.fit(X_train, y_train,
  sample_weight=pesos)` los entrega al `fit` del modelo en cada fold.
- `HistGradientBoostingClassifier` sí acepta `class_weight="balanced"` directamente.
- Con o sin pesos, también puede mover el umbral de decisión usando `y_prob`.

## Búsqueda de hiperparámetros

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [100, 300],
    "learning_rate": [0.05, 0.1],
    "max_depth": [2, 3, 5],
    "subsample": [0.8, 1.0],
}
busqueda = GridSearchCV(GradientBoostingClassifier(random_state=42), param_grid,
                        cv=5, scoring="metrica", n_jobs=-1)
busqueda.fit(X_train, y_train)
print(busqueda.best_params_, busqueda.best_score_)
```

- La grilla tiene 2 × 2 × 3 × 2 = 24 combinaciones; con 5 folds se entrenan 120 modelos.
  `n_jobs=-1` en `GridSearchCV` reparte esos modelos entre los núcleos del procesador; con unas
  6.000 filas tarda alrededor de un minuto.
- `"metrica"` es el *score* de clasificación que quiere optimizar, por ejemplo `"f1"` o
  `"roc_auc"`.
- Si el mejor valor de un hiperparámetro queda en un extremo de la grilla, amplíela en esa
  dirección. Vea la [validación cruzada](validacion-cruzada.md) y
  [`GridSearchCV`](gridsearchcv.md) para revisar todos los resultados.

## Cómo interpretar y precauciones

- El gradient boosting suele ser de los modelos más precisos en datos tabulares, pero es más
  sensible a sus hiperparámetros que el random forest: con valores por defecto puede no rendir
  bien, y con una tasa alta y muchos árboles sobreajusta.
- Compare el desempeño de entrenamiento y validación: si el primero es mucho mayor, reduzca
  `learning_rate`, `max_depth` o `n_estimators`, o use `subsample` menor que 1.
- `feature_importances_` está disponible y se interpreta igual que en el
  [árbol de decisión](arbol-decision.md): cuánto reduce cada variable la pérdida, sin signo.
- El entrenamiento es secuencial y, por tanto, más lento que el de un random forest con el mismo
  número de árboles cuando este se paraleliza.
