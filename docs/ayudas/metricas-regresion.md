# Métricas de regresión

Las métricas de regresión comparan los valores reales \( y_i \) con las predicciones
\( \hat{y}_i \) del modelo. Calcúlelas en el
[conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) y en el
[conjunto de prueba](../glosario.md#conjunto-prueba) para saber qué tan bien predice el modelo
y si generaliza.

## Las tres métricas

**[R²](../glosario.md#r2)** (coeficiente de determinación): proporción de la variabilidad de
\( y \) que explica el modelo.

\[
R^2 = 1 - \frac{\sum_i (y_i - \hat{y}_i)^2}{\sum_i (y_i - \bar{y})^2}
\]

Vale 1 si el modelo acierta exactamente, 0 si no es mejor que predecir siempre la media
\( \bar{y} \), y puede ser negativo si es peor que eso. No tiene unidades.

**[MAE](../glosario.md#mae)** (error absoluto medio): cuánto se equivoca el modelo en promedio.

\[
\text{MAE} = \frac{1}{n} \sum_i |y_i - \hat{y}_i|
\]

**[RMSE](../glosario.md#rmse)** (raíz del error cuadrático medio): parecido al MAE, pero
penaliza más los errores grandes porque los eleva al cuadrado.

\[
\text{RMSE} = \sqrt{\frac{1}{n} \sum_i (y_i - \hat{y}_i)^2}
\]

El MAE y el RMSE están en las **mismas unidades** que la variable objetivo: si predice un precio
en millones, un MAE de 2 significa que el modelo se equivoca en unos 2 millones en promedio.
El RMSE siempre es mayor o igual que el MAE; si es mucho mayor, hay algunos errores muy grandes.

## Calcularlas

```python
import numpy as np
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
```

`y_test` son los valores reales del conjunto de prueba y `y_pred` las predicciones del modelo
para esos mismos registros (vea [regresión lineal](regresion-lineal.md)).

## Comparar entrenamiento y prueba

```python
import pandas as pd

def metricas(y_real, y_predicho):
    return {
        "R2": r2_score(y_real, y_predicho),
        "MAE": mean_absolute_error(y_real, y_predicho),
        "RMSE": np.sqrt(mean_squared_error(y_real, y_predicho)),
    }

tabla = pd.DataFrame({
    "entrenamiento": metricas(y_train, modelo.predict(X_train)),
    "prueba": metricas(y_test, modelo.predict(X_test)),
})
print(tabla.round(3))
```

`metricas` devuelve un diccionario con las tres métricas; la tabla pone una columna por
conjunto para compararlos lado a lado. `modelo` es el modelo ya entrenado con `fit`.

## Cómo interpretarlas

| Situación | Interpretación |
|-----------|----------------|
| R² alto y errores pequeños en los dos conjuntos | El modelo predice bien y generaliza |
| R² cercano a 0 | El modelo apenas mejora a predecir siempre la media |
| Entrenamiento mucho mejor que prueba | [Sobreajuste](../glosario.md#sobreajuste): el modelo memorizó los datos de entrenamiento |
| Los dos conjuntos con métricas malas y parecidas | Subajuste: el modelo es demasiado simple o le faltan variables relevantes |

!!! tip "Juzgue el error según el contexto"
    Un MAE de 10 puede ser excelente si la variable objetivo vale miles y pésimo si vale entre 0
    y 20. Compárelo con la media o el rango de `y`, por ejemplo con `y.describe()`.

## Ejemplo

Con un dataset de 400 registros y una regresión lineal con dos variables:

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

rng = np.random.default_rng(0)
n = 400
df = pd.DataFrame({
    "x1": rng.uniform(0, 10, n),
    "x2": rng.uniform(0, 10, n),
})
df["precio"] = 50 + 8 * df["x1"] - 3 * df["x2"] + rng.normal(0, 10, n)

X = df[["x1", "x2"]]
y = df["precio"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = LinearRegression().fit(X_train, y_train)

def metricas(y_real, y_predicho):
    return {
        "R2": r2_score(y_real, y_predicho),
        "MAE": mean_absolute_error(y_real, y_predicho),
        "RMSE": np.sqrt(mean_squared_error(y_real, y_predicho)),
    }

tabla = pd.DataFrame({
    "entrenamiento": metricas(y_train, modelo.predict(X_train)),
    "prueba": metricas(y_test, modelo.predict(X_test)),
})
print(tabla.round(3))
```

Salida:

```text
      entrenamiento  prueba
R2            0.878   0.884
MAE           7.509   6.316
RMSE          9.512   8.320
```

El modelo explica cerca del 88 % de la variabilidad del precio y se equivoca en unas 6 a 8
unidades en promedio. Las métricas de entrenamiento y prueba son parecidas, así que no hay
sobreajuste. El RMSE es algo mayor que el MAE, como es normal, sin indicar errores extremos.
