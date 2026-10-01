# Raíz del error cuadrático medio (RMSE)

El [RMSE](../glosario.md#rmse) mide cuánto se equivoca el modelo, igual que el [MAE](mae.md),
pero eleva cada error al cuadrado antes de promediar. Por eso **penaliza más los errores
grandes**.

## Fórmula

\[
\text{RMSE} = \sqrt{\frac{1}{n} \sum_i (y_i - \hat{y}_i)^2}
\]

\( y_i \) es el valor real, \( \hat{y}_i \) la predicción y \( n \) la cantidad de registros. El
promedio de los [residuos](../glosario.md#residuo) al cuadrado es el MSE (error cuadrático
medio); la raíz cuadrada lo devuelve a las unidades de la variable objetivo.

## Calcularlo

```python
import numpy as np
from sklearn.metrics import mean_squared_error

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
```

`y_test` son los valores reales del [conjunto de prueba](../glosario.md#conjunto-prueba) y
`y_pred` las predicciones del modelo para esos mismos registros, por ejemplo
`y_pred = modelo.predict(X_test)` (vea [regresión lineal](regresion-lineal.md)).
`mean_squared_error` devuelve el MSE y `np.sqrt` le saca la raíz.

## Cómo interpretarlo

- **Rango**: va de 0 (predicciones perfectas) hacia arriba, sin límite. Menor es mejor.
- **Unidades**: las mismas de la [variable objetivo](../glosario.md#variable-objetivo), igual
  que el MAE.
- **Relación con el MAE**: siempre se cumple RMSE ≥ MAE. Son iguales solo si todos los errores
  tienen el mismo tamaño. Si el RMSE es mucho mayor que el MAE, hay unos pocos errores muy
  grandes; revíselos con el [gráfico de residuos](residuos-vs-predichos.md).
- **Comparación con el R²**: el [R²](r2.md) no tiene unidades; el RMSE dice cuánto se equivoca
  el modelo en unidades reales. Si el RMSE es parecido a la desviación estándar de `y`, el R²
  está cerca de 0.

!!! tip "Juzgue el error según el contexto"
    Compare el RMSE con la media, la desviación estándar o el rango de `y`, por ejemplo con
    `y.describe()`. Un RMSE de 10 no significa lo mismo si `y` vale miles que si vale entre 0
    y 20.

!!! warning "Sensible a valores atípicos"
    Un solo [valor atípico](../glosario.md#outlier) mal predicho puede inflar el RMSE. Si los
    errores grandes son especialmente costosos en su problema, el RMSE es la métrica adecuada;
    si no, el MAE describe mejor el error típico.
