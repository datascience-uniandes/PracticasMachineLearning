# Regresión lineal

La [regresión lineal](../glosario.md#regresion-lineal) predice una
[variable objetivo](../glosario.md#variable-objetivo) continua como una suma ponderada de las
variables independientes:

\[
\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_p x_p
\]

\( \hat{y} \) es la predicción, \( \beta_0 \) es el intercepto (la predicción cuando todas las
variables valen 0) y cada \( \beta_j \) es el coeficiente de la variable \( x_j \): cuánto
cambia \( \hat{y} \) cuando \( x_j \) aumenta en una unidad y las demás se mantienen fijas.

## Separar las variables

```python
X = df[["columna1", "columna2", "columna3"]]
y = df["columna_objetivo"]
```

- `X` contiene las variables independientes (todas numéricas; codifique las categóricas con
  [one-hot](one-hot.md)).
- `y` es la variable que quiere predecir; `columna_objetivo` es su nombre.

Antes de entrenar, separe los datos en `X_train`, `X_test`, `y_train` y `y_test`; vea
[dividir en entrenamiento y prueba](division-datos.md).

## Entrenar y predecir

```python
from sklearn.linear_model import LinearRegression

modelo = LinearRegression()
modelo.fit(X_train, y_train)

y_pred_train = modelo.predict(X_train)
y_pred = modelo.predict(X_test)
```

`fit` calcula los coeficientes que minimizan la suma de los errores al cuadrado en el conjunto
de entrenamiento. `predict` aplica la ecuación a nuevos datos.

Para ver el intercepto y los coeficientes del modelo entrenado, vea
[ver los coeficientes](ver-coeficientes.md).

Evalúe el modelo con el [R²](r2.md), el [MAE](mae.md) y el [RMSE](rmse.md), y
[compare las métricas de entrenamiento y prueba](comparar-metricas.md). Revise también las
predicciones con el gráfico de [valores reales vs. predichos](reales-vs-predichos.md) y el de
[residuos vs. predichos](residuos-vs-predichos.md).

## Ejemplo

Con un dataset de 400 registros con dos variables, una ciudad y un precio:

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
n = 400
df = pd.DataFrame({
    "x1": rng.uniform(0, 10, n),
    "x2": rng.uniform(0, 10, n),
    "ciudad": rng.choice(["Bogotá", "Cali", "Medellín"], n),
})
df["precio"] = (50 + 8 * df["x1"] - 3 * df["x2"]
                + 15 * (df["ciudad"] == "Medellín") + rng.normal(0, 10, n))
df = pd.get_dummies(df, columns=["ciudad"], drop_first=True, dtype=int)

X = df.drop(columns=["precio"])
y = df["precio"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = LinearRegression()
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)

coeficientes = pd.Series(modelo.coef_, index=X.columns)
print("Intercepto:", round(modelo.intercept_, 2))
print(coeficientes.round(2))
```

Salida:

```text
Intercepto: 51.37
x1                  7.74
x2                 -3.14
ciudad_Cali         0.84
ciudad_Medellín    16.54
dtype: float64
```

Los coeficientes quedan cerca de los valores con los que se generaron los datos: el precio sube
unas 8 unidades por cada unidad de `x1`, baja unas 3 por cada unidad de `x2` y es unas 15
unidades mayor en Medellín que en Bogotá (la categoría de referencia). El coeficiente de Cali es
cercano a 0: casi no se diferencia de Bogotá.
