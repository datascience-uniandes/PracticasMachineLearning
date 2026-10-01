# Matriz de correlación

La [correlación](../glosario.md#correlacion) de Pearson \( r \) mide qué tan cerca están dos
variables de una relación lineal. Va de \( -1 \) a \( 1 \): cerca de \( 1 \) es una relación
lineal positiva fuerte, cerca de \( -1 \) una negativa fuerte y cerca de \( 0 \) indica que no
hay relación lineal (aunque puede haber una relación curva, revísela en el
[gráfico de dispersión](grafico-dispersion.md)).

## Calcular y graficar la matriz

```python
import matplotlib.pyplot as plt
import seaborn as sns

corr = df.corr(numeric_only=True)

plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1)
plt.title("Matriz de correlación")
plt.show()
```

- `numeric_only=True` ignora las columnas de texto.
- `annot=True` escribe el valor de \( r \) en cada celda y `fmt=".2f"` lo redondea a dos decimales.
- `vmin=-1, vmax=1` fija la escala de colores: rojo para correlaciones positivas, azul para
  negativas y blanco cerca de cero.

## Correlación de cada variable con el objetivo

```python
corr_objetivo = corr["columna_objetivo"].drop("columna_objetivo")
corr_objetivo = corr_objetivo.reindex(corr_objetivo.abs().sort_values(ascending=False).index)
print(corr_objetivo)
```

`columna_objetivo` es el nombre de la variable que quiere predecir. La lista queda ordenada por
el valor absoluto de \( r \): primero las variables con relación más fuerte, sea positiva o
negativa.

## Seleccionar variables

```python
umbral = 0.3
seleccionadas = corr_objetivo[corr_objetivo.abs() >= umbral].index.tolist()
print(seleccionadas)
```

`umbral` es el valor mínimo de \( |r| \) con el objetivo para conservar una variable. Use un
valor según el problema; 0,3 es un punto de partida común.

## Detectar multicolinealidad

Hay [multicolinealidad](../glosario.md#multicolinealidad) cuando dos variables independientes
están muy correlacionadas entre sí: aportan casi la misma información y los coeficientes de la
regresión se vuelven inestables.

```python
import numpy as np

corr_x = df[seleccionadas].corr().abs()
superior = corr_x.where(np.triu(np.ones(corr_x.shape, dtype=bool), k=1))
pares = superior.stack()
print(pares[pares > 0.7].sort_values(ascending=False))
```

- `np.triu(..., k=1)` conserva solo la mitad superior de la matriz, para no repetir cada par
  ni comparar una variable consigo misma.
- `stack()` convierte la matriz en una lista de pares `(variable_a, variable_b)`.

De cada par con \( |r| > 0{,}7 \) conserve solo una variable: normalmente la que tiene mayor
correlación con el objetivo.

```python
eliminar = []
for (a, b), valor in pares[pares > 0.7].items():
    if a in eliminar or b in eliminar:
        continue
    eliminar.append(b if abs(corr_objetivo[a]) >= abs(corr_objetivo[b]) else a)

seleccionadas = [c for c in seleccionadas if c not in eliminar]
```

!!! warning "Correlación no es causalidad"
    Una correlación alta indica que dos variables se mueven juntas, no que una cause la otra.

## Ejemplo

Con un dataset de 400 registros en el que `x2` es casi una copia de `x1`:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

rng = np.random.default_rng(0)
n = 400
df = pd.DataFrame({
    "x1": rng.normal(0, 1, n),
    "x3": rng.normal(0, 1, n),
    "x4": rng.normal(0, 1, n),
    "x5": rng.normal(0, 1, n),
})
df["x2"] = df["x1"] + rng.normal(0, 0.3, n)
df["precio"] = 100 + 10 * df["x1"] - 6 * df["x3"] + 2 * df["x4"] + rng.normal(0, 8, n)
df = df[["x1", "x2", "x3", "x4", "x5", "precio"]]

corr = df.corr(numeric_only=True)

plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1)
plt.title("Matriz de correlación")
plt.show()

corr_objetivo = corr["precio"].drop("precio")
corr_objetivo = corr_objetivo.reindex(corr_objetivo.abs().sort_values(ascending=False).index)
print(corr_objetivo.round(2))

umbral = 0.3
seleccionadas = corr_objetivo[corr_objetivo.abs() >= umbral].index.tolist()

corr_x = df[seleccionadas].corr().abs()
superior = corr_x.where(np.triu(np.ones(corr_x.shape, dtype=bool), k=1))
pares = superior.stack()
print(pares[pares > 0.7].round(2))
```

![Matriz de correlación de x1 a x5 y precio](../assets/img/ayudas/correlacion.png)

Salida:

```text
x1    0.68
x2    0.66
x3   -0.38
x4    0.14
x5   -0.00
Name: precio, dtype: float64
x1  x2    0.95
dtype: float64
```

`x1`, `x2` y `x3` superan el umbral; `x4` y `x5` no. Sin embargo, `x1` y `x2` tienen
\( r \approx 0{,}95 \) entre sí: basta con conservar `x1`, que tiene mayor correlación con
`precio`. Las variables finales serían `x1` y `x3`.
