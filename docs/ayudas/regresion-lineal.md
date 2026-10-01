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

Evalúe el modelo con el [R²](r2.md), el [MAE](mae.md) y el [RMSE](rmse.md), y
[compare las métricas de entrenamiento y prueba](comparar-metricas.md). Revise también las
predicciones con el gráfico de [valores reales vs. predichos](reales-vs-predichos.md) y el de
[residuos vs. predichos](residuos-vs-predichos.md).

Vea también: [ver los coeficientes](ver-coeficientes.md) · [interpretar los coeficientes](interpretar-coeficientes.md).
