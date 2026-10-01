# Revisar y tratar nulos

**Dimensión de calidad: completitud.** Un [valor nulo](glosario.md#valor-nulo) es un dato
faltante. En pandas aparece como `NaN`.

## Revisar

```python
df.isna().sum()            # cantidad de nulos por columna
df.isna().mean() * 100     # porcentaje de nulos por columna
df[df["columna"].isna()]   # filas con nulo en una columna
```

`columna` es el nombre de la columna que quiere revisar.

## Tratar

Hay dos estrategias principales.

**Eliminar** las filas con nulos. Es adecuado cuando son pocas y no siguen un patrón.

```python
df = df.dropna()                       # elimina las filas con algún nulo
df = df.dropna(subset=["columna"])     # solo las filas con nulo en esa columna
```

**Imputar**: reemplazar el nulo por un valor representativo de la columna.

```python
df["columna"] = df["columna"].fillna(df["columna"].median())   # numérica: mediana
df["columna"] = df["columna"].fillna(df["columna"].mode()[0])  # categórica: moda
```

!!! tip "¿Media o mediana?"
    La mediana no se ve afectada por los [valores atípicos](glosario.md#outlier),
    así que es la opción más segura en distribuciones con [sesgo](glosario.md#sesgo).

!!! warning "Columnas casi vacías"
    Si una columna tiene una gran proporción de nulos (por ejemplo, más del 50 %), puede ser
    mejor eliminarla: `df = df.drop(columns=["columna"])`.
