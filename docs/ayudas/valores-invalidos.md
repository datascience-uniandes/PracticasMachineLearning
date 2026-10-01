# Revisar y tratar valores inválidos

**Dimensión de calidad: validez.** Un valor es inválido cuando no cumple las reglas de su
variable: está fuera del rango posible (una edad negativa, un porcentaje mayor a 100) o no
pertenece a las categorías esperadas (`"Bogota"` y `"bogotá"` en lugar de `"Bogotá"`).

## Revisar

Compare los mínimos y máximos con los rangos del diccionario de datos:

```python
df.describe().loc[["min", "max"]].T
```

Cuente los registros que incumplen una regla:

```python
(df["columna"] < 0).sum()                       # valores negativos
(~df["columna"].between(minimo, maximo)).sum()  # valores fuera del rango [minimo, maximo]
df["columna_categorica"].unique()               # categorías presentes
```

`columna` es una variable numérica, `minimo` y `maximo` son los límites válidos, y
`columna_categorica` es una variable de texto.

## Tratar

**Corregir** las categorías mal escritas:

```python
df["columna_categorica"] = df["columna_categorica"].str.strip().str.lower()     # espacios y mayúsculas
df["columna_categorica"] = df["columna_categorica"].replace({"bogota": "bogotá"})  # unificar
```

**Marcar como nulo** un valor numérico imposible, para luego
[tratarlo como nulo](nulos.md):

```python
import numpy as np

df.loc[~df["columna"].between(minimo, maximo), "columna"] = np.nan
```

!!! warning "Inválido no es lo mismo que atípico"
    Un valor muy grande pero posible (un ingreso muy alto) no es inválido: es un
    [valor atípico](valores-atipicos.md) y se trata de otra forma.
