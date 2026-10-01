# Error absoluto medio (MAE)

El [MAE](../glosario.md#mae) mide cuánto se equivoca el modelo en promedio, sin importar si el
error es por encima o por debajo del valor real.

## Fórmula

\[
\text{MAE} = \frac{1}{n} \sum_i |y_i - \hat{y}_i|
\]

\( y_i \) es el valor real, \( \hat{y}_i \) la predicción y \( n \) la cantidad de registros. Se
toma el valor absoluto de cada [residuo](../glosario.md#residuo) para que los errores positivos
y negativos no se cancelen.

## Calcularlo

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, y_pred)
```

`y_test` son los valores reales del [conjunto de prueba](../glosario.md#conjunto-prueba) y
`y_pred` las predicciones del modelo para esos mismos registros, por ejemplo
`y_pred = modelo.predict(X_test)` (vea [regresión lineal](regresion-lineal.md)).

## Cómo interpretarlo

- **Rango**: va de 0 (predicciones perfectas) hacia arriba, sin límite. Menor es mejor.
- **Unidades**: las mismas de la [variable objetivo](../glosario.md#variable-objetivo). Si
  predice un precio en millones, un MAE de 2 significa que el modelo se equivoca en unos
  2 millones en promedio.
- **Errores grandes**: cada error pesa en proporción a su tamaño, así que el MAE es menos
  sensible a unos pocos errores muy grandes que el [RMSE](rmse.md). Siempre se cumple
  RMSE ≥ MAE.
- **Comparación con el R²**: el [R²](r2.md) dice qué proporción de la variabilidad explica el
  modelo; el MAE dice cuánto se equivoca en unidades reales. Conviene reportar ambos.

!!! tip "Juzgue el error según el contexto"
    Un MAE de 10 puede ser excelente si la variable objetivo vale miles y pésimo si vale entre 0
    y 20. Compárelo con la media, la desviación estándar o el rango de `y`, por ejemplo con
    `y.describe()`. Si el MAE es parecido a la desviación estándar de `y`, el modelo apenas
    mejora a predecir siempre la media.
