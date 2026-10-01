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

- **Regularización.** [Lasso](lasso.md) y [Ridge](ridge.md) penalizan el tamaño de los
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

## Estandarizar dentro de un pipeline

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

modelo = make_pipeline(StandardScaler(), modelo_base)
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)
```

- `modelo_base` es el modelo que quiere entrenar, por ejemplo `Lasso(alpha=0.1)` o
  `Ridge(alpha=1)`.
- `make_pipeline` encadena los pasos: `fit` ajusta el `StandardScaler` con `X_train` y luego
  entrena el modelo con los datos ya estandarizados; `predict` estandariza `X_test` con lo
  aprendido y predice.
- `y_train` es la [variable objetivo](../glosario.md#variable-objetivo); no se estandariza.

!!! tip "Prefiera el pipeline"
    Con `make_pipeline` no tiene que acordarse de usar `transform` en lugar de `fit_transform`, y
    la [validación cruzada](validacion-cruzada.md) ajusta el escalador en cada partición solo con
    los datos de entrenamiento de esa partición.

Si hay columnas de la [codificación one-hot](one-hot.md), estandarice solo las continuas con un
`ColumnTransformer`, como se muestra en la [regresión polinomial](regresion-polinomial.md).

## Ejemplo

Con 200 registros de tres variables en escalas muy distintas:

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
n = 200
X = pd.DataFrame({
    "area": rng.uniform(40, 200, n),
    "habitaciones": rng.integers(1, 6, n),
    "distancia_km": rng.exponential(5, n),
})

X_train, X_test = train_test_split(X, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_est = pd.DataFrame(scaler.fit_transform(X_train),
                           columns=X.columns, index=X_train.index)
X_test_est = pd.DataFrame(scaler.transform(X_test),
                          columns=X.columns, index=X_test.index)

print(X_train.describe().loc[["mean", "std", "min", "max"]].round(2))
print(X_train_est.describe().loc[["mean", "std", "min", "max"]].round(2))
print(X_test_est.describe().loc[["mean", "std"]].round(2))
```

Salida:

```text
        area  habitaciones  distancia_km
mean  127.60          3.11          4.70
std    48.55          1.43          5.02
min    40.44          1.00          0.03
max   199.55          5.00         40.64
      area  habitaciones  distancia_km
mean -0.00          0.00         -0.00
std   1.00          1.00          1.00
min  -1.80         -1.48         -0.93
max   1.49          1.33          7.18
      area  habitaciones  distancia_km
mean -0.13         -0.31          0.47
std   0.99          0.99          1.17
```

- Antes de estandarizar, `area` tiene una desviación estándar de 48,55 y `habitaciones` de 1,43.
  Después, las tres variables del entrenamiento tienen media 0 y desviación estándar 1.
- El máximo de `distancia_km` estandarizado es 7,18: ese registro está a más de 7 desviaciones
  estándar de la media, un posible [valor atípico](../glosario.md#outlier). La estandarización
  no elimina el [sesgo](../glosario.md#sesgo) ni los atípicos.
- En `X_test_est` las medias no son exactamente 0 ni las desviaciones exactamente 1, porque se
  usaron la media y la desviación del entrenamiento. Es lo esperado.
