# Gráficos para variables categóricas

## Gráfico de barras

Cuenta cuántos registros hay en cada categoría.

```python
import matplotlib.pyplot as plt
import seaborn as sns

orden_meses = ["jan", "feb", "mar", "apr", "may", "jun",
               "jul", "aug", "sep", "oct", "nov", "dec"]

sns.countplot(x="month", data=df, order=orden_meses)
plt.title("Registros por mes")
plt.show()
```

## Tabla de frecuencias

```python
df["day"].value_counts()                  # conteo absoluto
df["day"].value_counts(normalize=True)    # proporción de cada categoría
```
