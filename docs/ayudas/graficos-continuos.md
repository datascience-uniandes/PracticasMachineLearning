# Gráficos para variables continuas

## Gráfico de caja

Muestra la mediana, los cuartiles y los [valores atípicos](glosario.md#outlier).

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.boxplot(x=df["temp"])
plt.title("temp")
plt.show()
```

## Histograma

Muestra la [distribución](glosario.md#distribucion) de los valores.

```python
sns.histplot(df["temp"], bins=30, kde=True)   # kde=True añade la curva de densidad
plt.show()
```

## Varias variables a la vez

```python
columnas = ["FFMC", "DMC", "DC", "ISI", "temp", "RH", "wind", "rain", "area"]

fig, axes = plt.subplots(3, 3, figsize=(12, 9))
for ax, col in zip(axes.ravel(), columnas):
    sns.histplot(df[col], bins=30, ax=ax)
    ax.set_title(col)
plt.tight_layout()
plt.show()
```

Cambie `sns.histplot(df[col], bins=30, ax=ax)` por `sns.boxplot(x=df[col], ax=ax)` para obtener
los gráficos de caja.

!!! tip "Distribuciones muy sesgadas"
    Si casi todos los valores se concentran cerca de cero, pruebe con una escala logarítmica:
    `sns.histplot(np.log1p(df["area"]))`. La función `np.log1p(x)` calcula `log(1 + x)` y admite ceros.
