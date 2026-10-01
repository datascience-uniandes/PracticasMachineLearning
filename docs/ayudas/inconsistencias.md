# Revisar y tratar inconsistencias

**Dimensión de calidad: consistencia.** Un dato es consistente cuando se representa siempre de
la misma forma: el mismo formato, el mismo tipo y la misma escritura en todos los registros.

## Revisar

**Categorías escritas de formas distintas** (mayúsculas, tildes, espacios):

```python
df["columna_categorica"].value_counts()
```

Si aparecen `"Bogotá"`, `"bogota"` y `" BOGOTÁ"` como categorías separadas, es la misma ciudad
escrita de tres formas.

**Tipos de dato incorrectos** (números o fechas guardados como texto):

```python
df.dtypes
```

Una columna numérica que aparece como `object` suele tener algún valor con texto, como `"1.200"`
o `"N/A"`.

`columna_categorica` es el nombre de una variable de texto.

## Tratar

**Unificar la escritura** de las categorías:

```python
df["columna_categorica"] = df["columna_categorica"].str.strip().str.lower()       # sin espacios y en minúsculas
df["columna_categorica"] = df["columna_categorica"].replace({"bogota": "bogotá"})  # unificar variantes
```

**Convertir el tipo** de una columna:

```python
import pandas as pd

df["columna"] = pd.to_numeric(df["columna"], errors="coerce")       # texto a número
df["columna_fecha"] = pd.to_datetime(df["columna_fecha"], errors="coerce")  # texto a fecha
```

`errors="coerce"` convierte en `NaN` los valores que no se pueden transformar. Después de
convertir, [revise los nulos](nulos.md) que hayan aparecido.
