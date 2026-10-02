# Stacking

El [stacking](../glosario.md#stacking) (apilamiento) es un [ensamble](../glosario.md#ensamble)
que combina varios modelos de [clasificación](../glosario.md#clasificacion) distintos, llamados
**modelos base**, mediante un **meta-modelo** que aprende cómo ponderar sus predicciones. La
idea es que modelos diferentes cometen errores diferentes: una
[regresión logística](regresion-logistica.md) capta bien relaciones lineales, un
[árbol de decisión](arbol-decision.md) capta umbrales e interacciones, y
[KNN](knn.md) capta similitud local. El meta-modelo aprende en qué medida confiar en cada uno.

## Cómo se entrena

Si el meta-modelo se entrenara con las predicciones que los modelos base hacen sobre los mismos
datos con los que fueron entrenados, aprendería a confiar sobre todo en el modelo que más
memoriza (por ejemplo, un árbol profundo). Para evitarlo, el stacking usa
[validación cruzada](../glosario.md#validacion-cruzada):

1. El [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) se divide en \( K \)
   folds. Para cada fold, cada modelo base se entrena con los otros \( K - 1 \) folds y predice
   el fold que quedó fuera. Así, cada registro recibe de cada modelo base una predicción hecha
   **sin haberlo visto**.
2. Esas predicciones (una columna por modelo base) son las variables de entrada del
   meta-modelo, que se entrena con ellas y con la variable objetivo real.
3. Finalmente, cada modelo base se reentrena con todo el conjunto de entrenamiento. Para un
   registro nuevo, los modelos base predicen y el meta-modelo combina esas predicciones.

## Escalado

El stacking en sí no escala nada: cada modelo base debe llevar su propio preprocesamiento. Los
modelos que lo necesitan (regresión logística, KNN) deben ir dentro de un pipeline con
[escalado](escalar-variables.md); los árboles pueden ir sin él. El meta-modelo recibe
probabilidades, que ya están entre 0 y 1, así que no necesita escalado adicional.

## Código básico

```python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

modelos_base = [
    ("logistica", make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))),
    ("arbol", DecisionTreeClassifier(max_depth=profundidad, random_state=42)),
    ("knn", make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))),
]
modelo = StackingClassifier(estimators=modelos_base, final_estimator=LogisticRegression(),
                            cv=5, stack_method="predict_proba", n_jobs=-1)
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_val)
y_prob = modelo.predict_proba(X_val)[:, 1]
```

- `modelos_base` es una lista de pares `(nombre, modelo)`. El nombre es libre y sirve para
  identificar cada modelo; `profundidad` y `k` son los hiperparámetros elegidos para el árbol y
  para KNN.
- `final_estimator` es el meta-modelo. Una regresión logística es la opción habitual: es simple,
  difícil de sobreajustar con pocas variables de entrada, y sus coeficientes indican cuánto pesa
  cada modelo base.
- `cv=5` es el número de folds con que se generan las predicciones de los modelos base para
  entrenar el meta-modelo.
- `stack_method="predict_proba"` hace que el meta-modelo reciba las probabilidades de los
  modelos base (en clasificación binaria, una columna por modelo con la probabilidad de la clase
  positiva) en lugar de las clases predichas, que contienen menos información.
- `n_jobs=-1` entrena los modelos base en paralelo.
- `X_train`, `y_train` son los datos de entrenamiento y `X_val` las variables del
  [conjunto de validación](../glosario.md#conjunto-validacion). `y_pred` es la clase predicha
  con umbral 0,5 y `y_prob` la probabilidad que da el meta-modelo.

### Usar modelos base ya ajustados

Si ya optimizó cada modelo por separado con [`GridSearchCV`](gridsearchcv.md), puede usar
directamente sus mejores versiones como modelos base:

```python
modelos_base = [
    ("logistica", busqueda_logistica.best_estimator_),
    ("arbol", busqueda_arbol.best_estimator_),
    ("knn", busqueda_knn.best_estimator_),
]
```

- `busqueda_logistica`, `busqueda_arbol` y `busqueda_knn` son los objetos `GridSearchCV` ya
  ajustados de cada modelo. `best_estimator_` incluye el pipeline completo con los mejores
  hiperparámetros.
- `StackingClassifier` hace copias de estos modelos y los vuelve a entrenar; no modifica los
  objetos originales.

### Ver cuánto pesa cada modelo base

```python
print(modelo.final_estimator_.coef_)
```

- Con un meta-modelo logístico, `coef_` tiene un coeficiente por modelo base, en el mismo orden
  de `modelos_base`. Un coeficiente mayor indica que el meta-modelo confía más en las
  probabilidades de ese modelo.
- Un coeficiente cercano a 0 sugiere que ese modelo base aporta poco una vez considerados los
  demás.
- `modelo.named_estimators_["arbol"]` da acceso a cada modelo base reentrenado con todo el
  conjunto de entrenamiento.

## Stacking o votación

La [votación](votacion.md) (`VotingClassifier`) combina los mismos modelos sin meta-modelo: es más
rápida, pero no aprende a dar menos peso a un modelo débil. El stacking sí lo aprende, a cambio de
más tiempo de entrenamiento y más riesgo de [sobreajuste](../glosario.md#sobreajuste) con pocos
datos.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `estimators` | Los modelos base | Lo más importante es la **diversidad**: modelos de familias distintas cometen errores distintos y se complementan. Varios modelos muy parecidos (por ejemplo, tres árboles similares) aportan poco |
| `final_estimator` | El meta-modelo (por defecto, `LogisticRegression()`) | Un meta-modelo simple reduce el riesgo de [sobreajuste](../glosario.md#sobreajuste); uno complejo rara vez mejora y puede sobreajustar |
| `final_estimator__C` | Regularización del meta-modelo logístico | `C` pequeño: pesos más parecidos entre modelos, riesgo de [subajuste](../glosario.md#subajuste). `C` grande: pesos más libres |
| `cv` | Folds para generar las predicciones de los modelos base | Más folds dan predicciones más fiables para el meta-modelo pero multiplican el tiempo |
| `stack_method` | Qué salida de los modelos base usa el meta-modelo | `"predict_proba"` suele ser la mejor opción en clasificación |

## Búsqueda de hiperparámetros

Lo habitual es ajustar primero cada modelo base por separado y luego ajustar solo el
meta-modelo. Los hiperparámetros del meta-modelo se nombran con el prefijo `final_estimator__`:

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "final_estimator__C": [0.01, 0.1, 1, 10],
    "final_estimator__class_weight": [None, "balanced"],
}
busqueda = GridSearchCV(StackingClassifier(estimators=modelos_base,
                                           final_estimator=LogisticRegression(),
                                           cv=5, stack_method="predict_proba"),
                        param_grid, cv=5, scoring="metrica", n_jobs=-1)
busqueda.fit(X_train, y_train)
print(busqueda.best_params_, busqueda.best_score_)
```

- Hay dos niveles de validación cruzada: la externa (`cv=5` de `GridSearchCV`) evalúa cada
  combinación, y la interna (`cv=5` de `StackingClassifier`) genera las predicciones de los
  modelos base. El número de modelos entrenados se multiplica, por eso conviene mantener la
  grilla pequeña.
- `final_estimator__class_weight="balanced"` es una forma de tener en cuenta el
  [desbalance de clases](../glosario.md#desbalance-de-clases) en la combinación final.
- Los hiperparámetros de un modelo base también pueden ajustarse con el nombre del modelo como
  prefijo, por ejemplo `"arbol__max_depth"`, pero eso hace la búsqueda mucho más lenta.
- `"metrica"` es el *score* de clasificación que quiere optimizar, por ejemplo `"f1"` o
  `"roc_auc"`.

## Cómo interpretar y precauciones

- Compare el stacking con el **mejor modelo base** individual, usando la misma validación
  cruzada y la misma métrica. Si la mejora es pequeña, el modelo individual suele ser
  preferible por ser más simple y rápido.
- El costo es alto: entrenar el stacking requiere entrenar cada modelo base \( K + 1 \) veces
  (una por fold más el reentrenamiento final), y predecir requiere ejecutar todos los modelos.
- Se pierde interpretabilidad: los coeficientes del meta-modelo dicen cuánto pesa cada modelo,
  no cómo influye cada variable original.
- Evalúe el resultado con la [matriz de confusión](matriz-confusion.md), [F1](f1.md) o la
  [curva ROC](curva-roc.md) en el conjunto de validación, igual que cualquier otro
  clasificador.
