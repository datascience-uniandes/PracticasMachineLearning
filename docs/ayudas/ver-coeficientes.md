# Ver los coeficientes

Un modelo lineal entrenado ([regresión lineal](regresion-lineal.md), [Lasso](lasso.md) o
[Ridge](ridge.md)) guarda el intercepto en `intercept_` y un
[coeficiente](../glosario.md#coeficiente) por variable en `coef_`.

## Intercepto y coeficientes

```python
import pandas as pd

print("Intercepto:", modelo.intercept_)
coef = pd.Series(modelo.coef_, index=X_train.columns).sort_values()
print(coef)
```

- `modelo` es el modelo ya entrenado con `fit`; `X_train` es el `DataFrame` con el que se
  entrenó.
- `modelo.coef_` es un arreglo con un coeficiente por columna de `X_train`, en el mismo orden;
  la `Series` los etiqueta con el nombre de cada columna.
- `sort_values()` los ordena de menor a mayor: los más negativos quedan arriba y los más
  positivos abajo.

## Desde un pipeline

Si el modelo es un `Pipeline` (por ejemplo, `make_pipeline(StandardScaler(), Lasso(...))`), los
coeficientes están en el último paso:

```python
coef = pd.Series(modelo[-1].coef_, index=X_train.columns).sort_values()
print("Intercepto:", modelo[-1].intercept_)
```

`modelo[-1]` es el último paso del pipeline. También puede pedirlo por su nombre con
`modelo.named_steps["lasso"]`; `make_pipeline` nombra cada paso con el nombre de su clase en
minúsculas (`"standardscaler"`, `"lasso"`, `"ridge"`, `"linearregression"`).

Si el pipeline [estandariza](estandarizar.md), los coeficientes quedan en la escala
**estandarizada**: cada uno es el cambio en la predicción por cada desviación estándar de su
variable.

## Lasso y Ridge

`Lasso` y `Ridge` tienen los mismos atributos `intercept_` y `coef_`, así que el código es el
mismo. Con [Lasso](lasso.md) es útil contar cuántos coeficientes valen exactamente 0, es decir,
cuántas variables eliminó el modelo:

```python
print("Coeficientes en 0:", (coef == 0).sum())
print("Variables eliminadas:", list(coef[coef == 0].index))
```

`coef == 0` da `True` para cada coeficiente igual a 0, y `.sum()` cuenta los `True`. Con
[Ridge](ridge.md) el resultado es siempre 0: sus coeficientes se acercan a 0, pero no llegan.

## Gráfico de barras

```python
import matplotlib.pyplot as plt

coef.plot.barh(figsize=(7, 4))
plt.axvline(0, color="black", linewidth=0.8)
plt.xlabel("Coeficiente")
plt.title("Coeficientes del modelo")
plt.tight_layout()
plt.show()
```

`barh` dibuja una barra horizontal por variable; como `coef` está ordenada, las barras quedan de
la más negativa a la más positiva. La línea vertical en 0 separa los efectos negativos de los
positivos.

!!! warning "Compare coeficientes con cuidado"
    El tamaño de un coeficiente depende de las unidades de su variable. Un coeficiente pequeño
    en una variable medida en miles puede pesar más que uno grande en una variable entre 0 y 1.
    Para comparar, estandarice las variables antes de entrenar.

Para saber qué significa cada coeficiente (signo, unidades, variables categóricas), vea
[interpretar los coeficientes](interpretar-coeficientes.md).

## Ejemplo

Con 200 registros y 5 variables, de las cuales solo `x1`, `x2` y `x3` influyen en `y`:

```python
import numpy as np
import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Lasso

rng = np.random.default_rng(0)
n = 200
X = pd.DataFrame(rng.normal(0, 1, (n, 5)), columns=["x1", "x2", "x3", "x4", "x5"])
y = 10 + 4 * X["x1"] - 3 * X["x2"] + 1 * X["x3"] + rng.normal(0, 1, n)

lineal = LinearRegression().fit(X, y)
coef = pd.Series(lineal.coef_, index=X.columns).sort_values()
print("Intercepto:", round(lineal.intercept_, 2))
print(coef.round(2))

lasso = make_pipeline(StandardScaler(), Lasso(alpha=0.5)).fit(X, y)
coef_lasso = pd.Series(lasso[-1].coef_, index=X.columns).sort_values()
print(coef_lasso.round(2))
print("Coeficientes en 0:", (coef_lasso == 0).sum())
```

Salida:

```text
Intercepto: 10.04
x2   -3.08
x4    0.05
x5    0.10
x3    0.97
x1    4.08
dtype: float64
x2   -2.28
x4    0.00
x5    0.00
x3    0.34
x1    3.15
dtype: float64
Coeficientes en 0: 2
```

- La regresión lineal recupera valores cercanos a los usados para generar los datos: intercepto
  10, y coeficientes 4, −3 y 1 para `x1`, `x2` y `x3`. Los de `x4` y `x5` son cercanos a 0.
- Lasso (alfa = 0,5) deja `x4` y `x5` en exactamente 0 y reduce los demás coeficientes hacia 0.
