# Random Forest

Un [random forest](../glosario.md#random-forest) (bosque aleatorio) es un
[ensamble](../glosario.md#ensamble) de muchos [árboles de decisión](arbol-decision.md) para
[clasificación](../glosario.md#clasificacion). Un árbol individual es muy sensible a los datos
con que se entrena: cambiar unos pocos registros puede cambiar por completo sus divisiones. El
random forest aprovecha esa inestabilidad: entrena muchos árboles distintos entre sí y combina
sus votos, de modo que los errores particulares de cada árbol tienden a compensarse.

## Cómo construye los árboles

Cada árbol del bosque se diferencia de los demás por dos fuentes de azar:

- **Bootstrap** (*bagging*): cada árbol se entrena con una muestra del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) del mismo tamaño, tomada
  **con reemplazo**. Algunos registros aparecen varias veces y otros (en promedio, cerca de un
  tercio) quedan fuera de ese árbol.
- **Subconjunto aleatorio de variables**: en cada división, el árbol solo puede elegir entre un
  subconjunto aleatorio de las variables (por defecto, \( \sqrt{p} \) de las \( p \)
  variables). Así se evita que todos los árboles usen siempre la misma variable dominante y se
  parezcan demasiado.

Para predecir, el bosque promedia las probabilidades de todos los árboles:

\[
\hat{p}(x) = \frac{1}{B} \sum_{b=1}^{B} \hat{p}_b(x)
\]

- \( B \) es el número de árboles y \( \hat{p}_b(x) \) la probabilidad de la clase positiva
  que da el árbol \( b \) para el registro \( x \).
- La clase predicha es la de mayor probabilidad promedio.

Promediar muchos árboles profundos reduce mucho la varianza de un árbol individual sin aumentar
su sesgo, por eso el random forest suele generalizar bastante mejor que un solo árbol.

## Escalado

Igual que el árbol de decisión, el random forest **no necesita escalar** las variables: cada
división compara una sola variable con un valor de corte. Sí necesita que las variables
categóricas estén codificadas como números.

## Código básico

```python
from sklearn.ensemble import RandomForestClassifier

modelo = RandomForestClassifier(n_estimators=numero_arboles, random_state=42, n_jobs=-1)
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_val)
y_prob = modelo.predict_proba(X_val)[:, 1]
```

- `numero_arboles` es la cantidad de árboles del bosque (por defecto 100).
- `X_train`, `y_train` son las variables y la variable objetivo del conjunto de entrenamiento, y
  `X_val` las variables del [conjunto de validación](../glosario.md#conjunto-validacion).
- `random_state=42` fija la semilla de los muestreos bootstrap y de los subconjuntos de
  variables, para que el resultado sea reproducible.
- `n_jobs=-1` entrena los árboles en paralelo usando todos los núcleos del procesador. Los
  árboles son independientes entre sí, así que el bosque se paraleliza muy bien.
- `y_pred` es la clase predicha con umbral 0,5.
- `y_prob` es el promedio de las probabilidades de los árboles. A diferencia de un árbol
  individual, toma muchos valores intermedios, lo que permite construir
  [curvas ROC](curva-roc.md) y [curvas de precisión-sensibilidad](curva-precision-sensibilidad.md)
  más informativas.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `n_estimators` | Número de árboles (por defecto 100) | Más árboles nunca producen [sobreajuste](../glosario.md#sobreajuste): el desempeño se estabiliza a partir de cierto número y solo aumenta el tiempo de cómputo. Pocos árboles dan predicciones inestables |
| `max_depth` | Profundidad máxima de cada árbol (por defecto `None`, sin límite) | Árboles profundos son la configuración habitual. Valores pequeños pueden producir [subajuste](../glosario.md#subajuste); limitarla reduce el sobreajuste si se observa |
| `min_samples_leaf` | Mínimo de registros en cada hoja (por defecto 1) | Valores más grandes suavizan los árboles y las probabilidades, y reducen el sobreajuste; demasiado grandes producen subajuste |
| `max_features` | Cuántas variables se consideran en cada división: `"sqrt"` (por defecto), `"log2"`, una fracción (por ejemplo, `0.5`) o `None` (todas) | Valores bajos dan árboles más distintos entre sí (más diversidad, menos varianza) pero cada árbol es más débil. Valores altos hacen los árboles más parecidos entre sí |
| `class_weight` | Peso de cada clase | `"balanced"` da más peso a la clase minoritaria según sus frecuencias en todo el entrenamiento; `"balanced_subsample"` recalcula los pesos en la muestra bootstrap de cada árbol. Útiles con [desbalance de clases](../glosario.md#desbalance-de-clases) |

!!! warning "Rendimiento casi perfecto en entrenamiento"
    Con árboles profundos, el bosque suele acertar casi todo el conjunto de entrenamiento,
    porque cada registro fue memorizado por los árboles que lo vieron. Eso no indica por sí solo
    sobreajuste: compare con el desempeño en validación cruzada o en validación, que es el que
    importa. Si la diferencia es grande, aumente `min_samples_leaf` o limite `max_depth`.

## Cómo interpretar y precauciones

- El random forest es una buena opción "por defecto": funciona razonablemente bien con pocos
  ajustes y es difícil que sobreajuste gravemente.
- A cambio, se pierde la interpretabilidad del árbol individual: no se puede dibujar un solo
  árbol que explique las predicciones.
- Con desbalance de clases, además de `class_weight`, puede ajustar el umbral de decisión usando
  `y_prob` y la [curva de precisión-sensibilidad](curva-precision-sensibilidad.md).
- Evalúe siempre con la [matriz de confusión](matriz-confusion.md) y métricas adecuadas en el
  conjunto de validación, no con el desempeño de entrenamiento.
