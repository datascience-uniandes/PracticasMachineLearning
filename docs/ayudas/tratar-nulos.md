# Tratar valores nulos

Primero cuente los nulos (`df.isna().sum()`). Luego elija una estrategia.

## Eliminar

Adecuado cuando los nulos son pocos y no siguen un patrón.

```python
df = df.dropna()                     # elimina filas con algún nulo
df = df.dropna(subset=["temp"])      # solo si el nulo está en ciertas columnas
```

## Imputar

Reemplaza el nulo por un valor representativo de la columna.

```python
df["temp"] = df["temp"].fillna(df["temp"].median())     # numérica: mediana
df["month"] = df["month"].fillna(df["month"].mode()[0])  # categórica: moda
```

!!! tip "¿Media o mediana?"
    La mediana no se ve afectada por [valores atípicos](glosario.md#outlier),
    así que es la opción más segura en distribuciones sesgadas.
