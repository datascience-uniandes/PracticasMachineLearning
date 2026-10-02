# Graficar curvas desde las predicciones

La [curva ROC](curva-roc.md) y la [curva de precisión-sensibilidad](curva-precision-sensibilidad.md)
se pueden graficar de dos formas en scikit-learn:

- **Desde el estimador** (`from_estimator`): se le entrega el modelo y los datos, y scikit-learn
  calcula las probabilidades internamente. Solo funciona con modelos de scikit-learn.
- **Desde las predicciones** (`from_predictions`): se le entregan los valores reales y las
  probabilidades que usted ya calculó. Funciona con **cualquier** modelo, por ejemplo, una
  [red neuronal](red-neuronal.md) de Keras, que no es un estimador de scikit-learn.

## Qué predicciones usar

Las curvas recorren todos los [umbrales de decisión](../glosario.md#umbral-decision), así que
necesitan la **probabilidad de la clase positiva** de cada registro, no la clase predicha:

| Modelo | Cómo obtener las probabilidades |
|--------|---------------------------------|
| Clasificador de scikit-learn | `modelo.predict_proba(X)[:, 1]` |
| Red neuronal de Keras con salida sigmoide | `modelo.predict(X).ravel()` |

!!! warning "No use las clases predichas"
    Con `modelo.predict(X)` de scikit-learn se obtienen clases 0 o 1, no probabilidades. La curva
    queda reducida a un solo punto y el AUC o el AP pierden sentido.

En Keras, `predict` devuelve un arreglo de forma `(n, 1)`; `.ravel()` lo convierte en un vector
de forma `(n,)`.

## Dibujar en los ejes correctos

Sin el parámetro `ax`, cada llamada a `from_predictions` crea una figura nueva. Para poner varias
curvas en el mismo gráfico, o una figura por conjunto (entrenamiento y validación), cree primero
los ejes con `plt.subplots` y pase `ax=ax` en cada llamada.

## Código: una curva

```python
import matplotlib.pyplot as plt
from sklearn.metrics import RocCurveDisplay, PrecisionRecallDisplay

y_prob = modelo.predict_proba(X_val)[:, 1]

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
RocCurveDisplay.from_predictions(y_val, y_prob, name="Modelo", ax=axes[0])
PrecisionRecallDisplay.from_predictions(y_val, y_prob, name="Modelo", ax=axes[1])
axes[1].axhline((y_val == 1).mean(), color="k", linestyle="--", label="Línea base")
axes[1].legend()
plt.show()
```

- `y_val` son las clases reales y `y_prob` la probabilidad de la clase positiva (para Keras,
  `modelo.predict(X_val, verbose=0).ravel()`).
- `name` es el nombre que aparece en la leyenda, junto con el AUC o el AP.
- La línea horizontal es la línea base de la curva de precisión-sensibilidad: la proporción de
  registros positivos.

## Código: varios modelos en entrenamiento y validación

```python
modelos = {"Modelo A": modelo_a, "Modelo B": modelo_b}
conjuntos = [("Entrenamiento", X_train, y_train), ("Validación", X_val, y_val)]

fig, axes = plt.subplots(1, 2, figsize=(14, 6), sharey=True)
for ax, (titulo, X, y) in zip(axes, conjuntos):
    for nombre, modelo in modelos.items():
        y_prob = modelo.predict_proba(X)[:, 1]
        PrecisionRecallDisplay.from_predictions(y, y_prob, name=nombre, ax=ax)
    ax.axhline((y == 1).mean(), color="k", linestyle="--", label="Línea base")
    ax.set_title(titulo)
    ax.legend(loc="lower right")
plt.tight_layout()
plt.show()
```

- `modelos` asocia el nombre de cada modelo con el modelo ya entrenado.
- `conjuntos` define una figura por conjunto: a la izquierda entrenamiento y a la derecha
  validación.
- Para la curva ROC, cambie `PrecisionRecallDisplay` por `RocCurveDisplay` y quite la línea base.
- Si los modelos son redes de Keras, cambie la línea de `y_prob` por
  `y_prob = modelo.predict(X, verbose=0).ravel()`.
