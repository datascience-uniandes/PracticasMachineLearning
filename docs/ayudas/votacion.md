# Votación (VotingClassifier)

La votación es el [ensamble](../glosario.md#ensamble) más simple: entrena varios modelos de
[clasificación](../glosario.md#clasificacion) y combina sus predicciones por mayoría o promediando
sus probabilidades. A diferencia del [stacking](stacking.md), no aprende cómo combinarlos: todos
los modelos pesan lo mismo, o lo que usted indique.

## Votación dura y votación suave

- **Votación dura** (`voting="hard"`): cada modelo predice una clase y gana la más votada. Con
  tres modelos, basta que dos predigan «abandona» para que el ensamble prediga «abandona».
- **Votación suave** (`voting="soft"`): se promedian las probabilidades de la clase positiva de
  todos los modelos y se aplica el [umbral de decisión](../glosario.md#umbral-decision) al
  promedio. Suele funcionar mejor que la dura porque tiene en cuenta qué tan seguro está cada
  modelo.

La votación suave exige que todos los modelos tengan `predict_proba`. La votación dura no entrega
probabilidades, así que con ella no se pueden graficar la
[curva ROC](curva-roc.md) ni la [curva de precisión-sensibilidad](curva-precision-sensibilidad.md).

## Escalado

La votación no escala por sí misma. La [regresión logística](regresion-logistica.md) y
[KNN](knn.md) necesitan variables escaladas (vea [escalar variables](escalar-variables.md)), así
que escale los datos una sola vez antes de construir el ensamble y entréguele los datos escalados:

```python
from sklearn.preprocessing import StandardScaler

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_val_esc = escalador.transform(X_val)
```

- `fit_transform` calcula la media y la desviación estándar **solo con el conjunto de
  entrenamiento** y lo escala; `transform` aplica esas mismas medidas a validación.
- El árbol de decisión no necesita escalado, pero tampoco lo perjudica, así que puede usar los
  mismos datos escalados para todos los modelos base.

## Código básico

```python
from sklearn.ensemble import VotingClassifier

modelos_base = [
    ("logistica", modelo_logistico),
    ("arbol", modelo_arbol),
    ("knn", modelo_knn),
]

votacion_dura = VotingClassifier(estimators=modelos_base, voting="hard")
votacion_dura.fit(X_train_esc, y_train)
y_pred = votacion_dura.predict(X_val_esc)

votacion_suave = VotingClassifier(estimators=modelos_base, voting="soft")
votacion_suave.fit(X_train_esc, y_train)
y_prob = votacion_suave.predict_proba(X_val_esc)[:, 1]
```

- `modelos_base` es una lista de pares `(nombre, modelo)`. Los nombres sirven para identificar
  cada modelo dentro del ensamble.
- `modelo_logistico`, `modelo_arbol` y `modelo_knn` son modelos ya configurados, por ejemplo,
  los mejores de una búsqueda con [GridSearchCV](gridsearchcv.md) hecha sobre `X_train_esc`
  (`busqueda.best_estimator_`).
- `fit` vuelve a entrenar cada modelo base con `X_train_esc` e `y_train`.
- `y_pred` son las clases predichas y `y_prob` la probabilidad promedio de la clase positiva.

### Dar más peso a algunos modelos

```python
votacion = VotingClassifier(estimators=modelos_base, voting="soft", weights=[2, 1, 1])
```

`weights` indica cuánto pesa cada modelo, en el mismo orden de `modelos_base`. En el ejemplo, la
regresión logística pesa el doble que los otros dos.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `estimators` | Los modelos que votan | Lo más importante es la **diversidad**: modelos de familias distintas cometen errores distintos y se corrigen entre sí. Modelos muy parecidos aportan poco |
| `voting` | `"hard"` o `"soft"` | `"soft"` aprovecha la confianza de cada modelo y permite graficar curvas |
| `weights` | Peso de cada modelo | Dar más peso al mejor modelo puede ayudar, pero elegir los pesos mirando la validación es otra forma de ajustar [hiperparámetros](../glosario.md#hiperparametro) |

Si quiere buscar los pesos con GridSearchCV, use la clave `weights`, por ejemplo
`{"weights": [[1, 1, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2]]}`.

## Cómo interpretar y precauciones

- Compare la votación con cada modelo base por separado: si no mejora al mejor de ellos, los
  modelos probablemente cometen los mismos errores.
- Un modelo con [sobreajuste](../glosario.md#sobreajuste) fuerte (por ejemplo, un KNN que memoriza
  el entrenamiento) puede inflar las métricas de entrenamiento del ensamble. Evalúe siempre en
  validación.
- La votación es más rápida que el stacking porque no entrena un meta-modelo ni necesita
  validación cruzada interna, pero no puede aprender a ignorar un modelo débil.
