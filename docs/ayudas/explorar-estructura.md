# Explorar la estructura de un dataset

Una vez cargado el dataset en `df`, estas instrucciones resumen su contenido:

```python
df.shape                        # (número de filas, número de columnas)
df.dtypes                       # tipo de dato de cada columna
df.info()                       # tipos, valores no nulos y memoria en una sola vista
df.describe()                   # estadísticas de las columnas numéricas
df.describe(include="object")   # conteo, valores únicos y moda de las columnas de texto
df["columna"].unique()          # valores distintos de una columna
```

`columna` es el nombre de la columna que quiere revisar.

`describe()` entrega, para cada columna numérica, el conteo, la media (`mean`), la desviación
estándar (`std`), el mínimo, los cuartiles (`25%`, `50%`, `75%`) y el máximo.

## Separar columnas por tipo

```python
numericas = df.select_dtypes(include="number").columns.tolist()
categoricas = df.select_dtypes(include="object").columns.tolist()
```

!!! warning "El tipo no siempre basta"
    Una columna numérica puede representar una categoría o un código (por ejemplo, un número de
    zona o de cuadrícula). Revise el diccionario de datos antes de decidir cómo tratarla.
