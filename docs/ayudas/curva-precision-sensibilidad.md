# Curva de precisión-sensibilidad

La [curva de precisión-sensibilidad](../glosario.md#curva-precision-sensibilidad) muestra cómo
cambian la [precisión](precision.md) y la [sensibilidad](sensibilidad.md) de un clasificador
binario al mover el [umbral de decisión](../glosario.md#umbral-decision). Se concentra en la
clase positiva, por eso es más informativa que la [curva ROC](curva-roc.md) cuando hay
[desbalance de clases](../glosario.md#desbalance-de-clases).

## Qué se grafica

- **Eje horizontal, sensibilidad**: proporción de positivos reales que el modelo detecta,
  \( VP / (VP + FN) \).
- **Eje vertical, precisión**: proporción de predicciones positivas que son correctas,
  \( VP / (VP + FP) \).

Cada punto de la curva es un umbral distinto. Con un umbral alto el modelo predice positivo
pocas veces: la sensibilidad es baja y la precisión suele ser alta (izquierda de la curva). Al
bajar el umbral detecta más positivos, pero también comete más falsas alarmas: la sensibilidad
sube y la precisión baja (derecha de la curva).

![Curvas de precisión-sensibilidad conceptuales con la línea base de la proporción de positivos](../assets/img/ayudas/curva-precision-sensibilidad.png){ width="460" }

## La precisión promedio (AP) y la línea base

La **precisión promedio** (AP, *average precision*) resume la curva en un solo número, de forma
parecida al área bajo ella. Va de 0 a 1 y mayor es mejor.

La **línea base** es la proporción de la clase positiva en los datos. Un modelo que predice al
azar tiene una precisión igual a esa proporción para cualquier sensibilidad, de modo que su
curva es una línea horizontal a esa altura. Por eso, a diferencia del [AUC](../glosario.md#auc),
el valor de referencia de la AP **no es 0,5**: si solo el 10 % de los registros es positivo, una
AP de 0,4 ya es cuatro veces mejor que el azar.

```python
linea_base = (y_val == 1).mean()
```

## Calcularla y graficarla

Para un solo modelo y un solo conjunto:

```python
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay, average_precision_score

fig, ax = plt.subplots(figsize=(6, 5))
PrecisionRecallDisplay.from_estimator(modelo, X_val, y_val, ax=ax, name="Modelo")
ax.axhline(linea_base, color="k", linestyle="--", label="Línea base")
ax.legend()
plt.show()

y_prob = modelo.predict_proba(X_val)[:, 1]
ap = average_precision_score(y_val, y_prob)
```

`modelo` es un clasificador ya entrenado que tiene `predict_proba` o `decision_function`,
`X_val` y `y_val` son las variables y la clase real del
[conjunto de validación](../glosario.md#conjunto-validacion), y `y_prob` la probabilidad
estimada de la clase positiva. La leyenda muestra la AP de cada curva. Si ya tiene las
probabilidades, puede usar
`PrecisionRecallDisplay.from_predictions(y_val, y_prob, ax=ax, name="Modelo")`.

## Comparar varios modelos en entrenamiento y validación

```python
modelos = {
    "Regresión logística": modelo_1,
    "Árbol de decisión": modelo_2,
    "KNN": modelo_3,
}

fig, axes = plt.subplots(1, 2, figsize=(12, 5), sharey=True)
conjuntos = [("Entrenamiento", X_train, y_train), ("Validación", X_val, y_val)]

for ax, (titulo, X, y) in zip(axes, conjuntos):
    for nombre, modelo in modelos.items():
        PrecisionRecallDisplay.from_estimator(modelo, X, y, ax=ax, name=nombre)
    ax.axhline((y == 1).mean(), color="k", linestyle="--", label="Línea base")
    ax.set_title(titulo)
    ax.legend(loc="lower left")

plt.tight_layout()
plt.show()
```

`modelos` es un diccionario con los clasificadores ya entrenados (por ejemplo una
[regresión logística](regresion-logistica.md), un [árbol de decisión](arbol-decision.md) y un
[KNN](knn.md)) y el nombre de cada uno en la leyenda. `X_train` y `y_train` son los datos del
[conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento).

## Cómo interpretarla

- **Más cerca de la esquina superior derecha es mejor**: ese punto (sensibilidad 1,
  precisión 1) es un modelo que detecta todos los positivos sin falsas alarmas.
- **Compare con la línea base**: una curva pegada a ella no aporta nada frente al azar.
- **Compare modelos con el gráfico de validación**: el modelo con la curva más alta (y mayor AP)
  logra más precisión para la misma sensibilidad.
- **Una brecha grande entre entrenamiento y validación indica
  [sobreajuste](../glosario.md#sobreajuste)** (vea [comparar métricas](comparar-metricas.md)).
- **La curva suele ser escalonada e irregular**, sobre todo con pocos positivos; no es un error.

## Por qué es más informativa que la ROC con desbalance

La [curva ROC](curva-roc.md) usa la tasa de falsos positivos, que divide los FP entre **todos**
los negativos. Si los negativos son muchos, incluso cientos de falsos positivos producen una
tasa pequeña y la curva ROC se ve casi perfecta. La precisión, en cambio, compara los FP con los
VP: si la mayoría de las alarmas son falsas, la precisión cae y la curva lo muestra. Con clases
balanceadas, ambas curvas suelen llevar a las mismas conclusiones.

## Elegir un umbral

La curva ayuda a elegir el umbral según lo que exija el problema, por ejemplo "la mayor
sensibilidad posible con una precisión de al menos 0,6":

```python
from sklearn.metrics import precision_recall_curve

y_prob = modelo.predict_proba(X_val)[:, 1]
precisiones, sensibilidades, umbrales = precision_recall_curve(y_val, y_prob)

cumple = precisiones[:-1] >= 0.6
umbral = umbrales[cumple][0]
y_pred = (y_prob >= umbral).astype(int)
```

`precision_recall_curve` devuelve la precisión y la sensibilidad para cada umbral candidato;
`precisiones` y `sensibilidades` tienen un elemento más que `umbrales`, por eso se descarta el
último. Como los umbrales están ordenados de menor a mayor, el primero que cumple la condición es
el que conserva más sensibilidad. Si prefiere equilibrar ambas métricas, puede elegir el umbral
que maximiza el [F1](f1.md).

!!! tip "Elija el umbral con validación, no con prueba"
    Elija el umbral con el conjunto de validación y aplíquelo sin cambios al
    [conjunto de prueba](../glosario.md#conjunto-prueba). Revise después la
    [matriz de confusión](matriz-confusion.md) con ese umbral para ver cuántos errores de cada
    tipo comete el modelo.
