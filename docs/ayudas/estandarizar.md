# Estandarizar variables

La [estandarización](../glosario.md#estandarizacion) transforma cada
[variable continua](../glosario.md#variable-continua) para que tenga **media 0** y **desviación
estándar 1**:

\[
z = \frac{x - \text{media}}{\text{desviación estándar}}
\]

Un valor estandarizado indica a cuántas desviaciones estándar está el dato de la media: \( z = 2 \)
es dos desviaciones por encima y \( z = -1 \), una por debajo. La forma de la
[distribución](../glosario.md#distribucion) no cambia; solo cambian su centro y su escala.

La estandarización es una de las formas de [escalar variables](escalar-variables.md); esa página
compara `StandardScaler` con `MinMaxScaler` y [`RobustScaler`](robust-scaler.md).

## Estandarizar con `StandardScaler`

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_est = pd.DataFrame(scaler.fit_transform(X_train),
                           columns=X_train.columns, index=X_train.index)
X_test_est = pd.DataFrame(scaler.transform(X_test),
                          columns=X_test.columns, index=X_test.index)
```

- `X_train` y `X_test` son las variables del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) y del
  [conjunto de prueba](../glosario.md#conjunto-prueba).
- `fit_transform` **aprende** la media y la desviación estándar de cada columna de `X_train` y
  las aplica.
- `transform` aplica a `X_test` **las mismas** medias y desviaciones aprendidas con `X_train`;
  no calcula unas nuevas.
- `StandardScaler` devuelve un arreglo de NumPy; el `DataFrame` recupera los nombres de las
  columnas y el índice.
- `scaler.mean_` y `scaler.scale_` guardan la media y la desviación estándar aprendidas.

!!! warning "Ajuste el escalador solo con el entrenamiento"
    Si usa `fit` o `fit_transform` con todos los datos (o con `X_test`), la media y la desviación
    estándar incluyen información del conjunto de prueba. Esa **fuga de información** hace que
    las métricas en prueba sean más optimistas de lo que serán con datos nuevos. Ajuste con
    `X_train` y solo transforme `X_test`.

## Por qué estandarizar

- **Regularización.** [Lasso](lasso-ridge.md#lasso) y [Ridge](lasso-ridge.md#ridge) penalizan el tamaño de los
  [coeficientes](../glosario.md#coeficiente). Como el tamaño de un coeficiente depende de las
  unidades de su variable (vea [interpretar los coeficientes](interpretar-coeficientes.md)), sin
  estandarizar la penalización castiga más a unas variables que a otras solo por su escala.
  Estandarizadas, todas se penalizan en igualdad de condiciones.
- **Términos polinomiales.** En la [regresión polinomial](regresion-polinomial.md) las potencias
  de una variable con valores grandes crecen muchísimo (\( 800^5 > 10^{14} \)); estandarizar
  antes mantiene los términos en rangos comparables.
- **Comparar coeficientes.** Con variables estandarizadas, cada coeficiente es el cambio en la
  predicción por cada desviación estándar de su variable, y sus magnitudes se pueden comparar.

La [regresión lineal](regresion-lineal.md) sin regularización no necesita estandarizar: sus
predicciones y su [R²](r2.md) son los mismos; solo cambian los coeficientes.

Si hay columnas de la [codificación one-hot](one-hot.md), estandarice solo las continuas con un
`ColumnTransformer`, como se muestra en la [regresión polinomial](regresion-polinomial.md).
