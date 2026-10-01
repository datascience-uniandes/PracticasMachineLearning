# Valores reales vs. predichos

Después de entrenar un modelo de [regresión lineal](regresion-lineal.md), compare los valores
reales del [conjunto de prueba](../glosario.md#conjunto-prueba) con las predicciones. Estos
gráficos muestran lo que resumen las métricas [R²](r2.md), [MAE](mae.md) y [RMSE](rmse.md):
dónde acierta el modelo y dónde se equivoca.

## Gráfico de dispersión con la diagonal

```python
import matplotlib.pyplot as plt
import seaborn as sns

minimo = min(y_test.min(), y_pred.min())
maximo = max(y_test.max(), y_pred.max())

sns.scatterplot(x=y_test, y=y_pred, alpha=0.6)
plt.plot([minimo, maximo], [minimo, maximo], color="red", linestyle="--", label="y = x")
plt.xlabel("Valor real")
plt.ylabel("Valor predicho")
plt.legend()
plt.show()
```

- `y_test` son los valores reales del conjunto de prueba y `y_pred` las predicciones del
  modelo para esos registros.
- La línea roja \( y = x \) marca la predicción perfecta: un punto sobre ella es un registro en
  el que el modelo acertó exactamente.

## Comparar las distribuciones

Un [gráfico de cajas](grafico-cajas.md) de los valores reales junto al de los predichos muestra
si el modelo reproduce el rango de la variable objetivo. `pd.melt` convierte las dos columnas en
formato largo (una columna con el tipo y otra con el valor) para que seaborn dibuje una caja por
tipo:

```python
import pandas as pd

comparacion = pd.DataFrame({"Real": y_test.to_numpy(), "Predicho": y_pred})
largo = pd.melt(comparacion, var_name="tipo", value_name="valor")

sns.boxplot(data=largo, x="tipo", y="valor")
plt.show()
```

## Cómo leerlo

- **Puntos cerca de la diagonal**: el modelo predice bien.
- **Puntos lejos de la diagonal**: errores grandes. Revise si se concentran en algún rango
  (por ejemplo, solo en los valores altos).
- **Nube más horizontal que la diagonal**: las predicciones están **comprimidas hacia la
  media**. El modelo explica poco de la variable y predice valores parecidos para todos los
  registros; en el gráfico de cajas, la caja de los predichos se ve mucho más angosta que la de
  los reales.

!!! tip "Complemente con los residuos"
    El gráfico de [residuos vs. predichos](residuos-vs-predichos.md) muestra los mismos errores
    de otra forma y facilita detectar patrones.

## Ejemplo

Con un dataset de 500 registros en el que `x1` explica solo una parte del precio:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
n = 500
df = pd.DataFrame({"x1": rng.uniform(0, 10, n), "x2": rng.uniform(0, 10, n)})
df["precio"] = 50 + 4 * df["x1"] + 4 * df["x2"] + rng.normal(0, 8, n)

X = df[["x1"]]     # el modelo no usa x2
y = df["precio"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
modelo = LinearRegression().fit(X_train, y_train)
y_pred = modelo.predict(X_test)

minimo = min(y_test.min(), y_pred.min())
maximo = max(y_test.max(), y_pred.max())

sns.scatterplot(x=y_test, y=y_pred, alpha=0.6)
plt.plot([minimo, maximo], [minimo, maximo], color="red", linestyle="--", label="y = x")
plt.xlabel("Valor real")
plt.ylabel("Valor predicho")
plt.legend()
plt.show()

comparacion = pd.DataFrame({"Real": y_test.to_numpy(), "Predicho": y_pred})
largo = pd.melt(comparacion, var_name="tipo", value_name="valor")

sns.boxplot(data=largo, x="tipo", y="valor")
plt.show()
```

![Valores reales vs. predichos con la diagonal y = x](../assets/img/ayudas/reales-vs-predichos.png)

![Gráficos de cajas de los valores reales y predichos](../assets/img/ayudas/reales-vs-predichos-2.png)

Los puntos siguen la dirección de la diagonal, pero la nube es más horizontal: el modelo
predice valores demasiado altos para los precios bajos y demasiado bajos para los altos. La caja
de los predichos es más angosta que la de los reales. Al modelo le falta información (`x2`), por
eso sus predicciones quedan comprimidas hacia la media.
