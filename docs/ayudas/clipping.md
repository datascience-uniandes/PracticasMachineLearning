# Clipping de valores atípicos

El [clipping](glosario.md#clipping) limita los valores extremos a un rango: lo que esté por debajo
del límite inferior toma ese límite y lo que esté por encima toma el límite superior.
Los registros no se eliminan.

## Con percentiles

```python
inferior = df["area"].quantile(0.01)
superior = df["area"].quantile(0.99)

df["area_clip"] = df["area"].clip(lower=inferior, upper=superior)
```

## Con el rango intercuartílico (IQR)

```python
q1, q3 = df["area"].quantile([0.25, 0.75])
iqr = q3 - q1
df["area_clip"] = df["area"].clip(lower=q1 - 1.5 * iqr, upper=q3 + 1.5 * iqr)
```

## Comparar antes y después

```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(10, 3))
sns.boxplot(x=df["area"], ax=axes[0]).set_title("Antes")
sns.boxplot(x=df["area_clip"], ax=axes[1]).set_title("Después")
plt.tight_layout()
plt.show()

df[["area", "area_clip"]].describe()
```

!!! warning "Guarde la columna original"
    Cree una columna nueva en vez de sobrescribir la original: así puede comparar
    y, si cambia de criterio, repetir el tratamiento.
