# Explorar la estructura de un dataset

```python
df.shape          # (número de filas, número de columnas)
df.dtypes         # tipo de dato de cada columna
df.info()         # tipos, valores no nulos y memoria en una sola vista
df.describe()     # estadísticas de las columnas numéricas
df.describe(include="object")   # conteo, únicos y moda de las columnas de texto
df["month"].unique()            # valores distintos de una columna
```

Para separar las columnas según su tipo:

```python
numericas = df.select_dtypes(include="number").columns.tolist()
categoricas = df.select_dtypes(include="object").columns.tolist()
```

!!! warning "El tipo no siempre basta"
    Una columna numérica puede representar una categoría o un código (por ejemplo, coordenadas
    de una cuadrícula). Revise el diccionario de datos antes de decidir cómo tratarla.
