# Entrenar una red neuronal

Una vez definida y compilada la [red neuronal](red-neuronal.md), el entrenamiento ajusta sus pesos
para reducir la pérdida en el [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento).
En Keras se hace con `model.fit`, y los dos parámetros principales son el número de épocas y el
tamaño del lote.

## Épocas y lotes

- **Lote (`batch_size`).** Los pesos no se actualizan con todos los registros a la vez, sino con
  lotes pequeños. Cada lote produce una actualización de los pesos. Con lotes pequeños (16 o 32
  registros) hay más actualizaciones por época y el entrenamiento es más ruidoso; con lotes grandes
  (128 o 256), cada época es más rápida y las curvas son más suaves. 32 es un buen valor inicial.
- **Época (`epochs`).** Una [época](../glosario.md#epoca) es una pasada completa por todo el
  conjunto de entrenamiento. Con 1.000 registros y `batch_size=32`, cada época tiene 32
  actualizaciones (31 lotes completos y uno parcial).

El número de épocas controla cuánto aprende la red:

| Épocas | Qué ocurre |
|--------|------------|
| Muy pocas | La red no alcanza a aprender: [subajuste](../glosario.md#subajuste) |
| Las adecuadas | La pérdida de validación llega a su mínimo |
| Demasiadas | La red empieza a memorizar el entrenamiento y la pérdida de validación sube: [sobreajuste](../glosario.md#sobreajuste) |

Para saber cuántas épocas son adecuadas, entrene con datos de validación y revise la
[curva de aprendizaje](curva-aprendizaje.md): la pérdida de entrenamiento y la de validación en
cada época.

## Datos de validación

Si pasa el [conjunto de validación](../glosario.md#conjunto-validacion) en `validation_data`,
Keras calcula la pérdida y las métricas en él al final de cada época, pero **no** lo usa para
ajustar los pesos. Así puede ver, época a época, si la red generaliza.

## Código: entrenar el modelo

```python
historia = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=50,
    batch_size=32,
)
```

- `model` es la red ya definida y compilada (vea [red neuronal](red-neuronal.md)).
- `X_train` e `y_train` son los datos de entrenamiento, ya
  [escalados](escalar-variables.md); `X_val` e `y_val`, los de validación.
- `epochs=50` es el número de pasadas completas por los datos de entrenamiento y `batch_size=32`,
  el número de registros por actualización de los pesos.
- `historia.history` es un diccionario con la pérdida y las métricas de cada época, en
  entrenamiento (`"loss"`, `"auc"`, ...) y en validación (`"val_loss"`, `"val_auc"`, ...).
