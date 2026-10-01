# Revisar y tratar valores inválidos

**Dimensión de calidad: validez.** Un valor es inválido cuando no cumple las reglas de su
variable: está fuera del rango posible (una edad negativa, un porcentaje mayor a 100) o no
pertenece a las categorías permitidas (un mes `"abc"`).

## Revisar

Compare los mínimos y máximos con los rangos del diccionario de datos:

```python
df.describe().loc[["min", "max"]].T
```

Cuente los registros que incumplen una regla:

```python
(df["columna"] < 0).sum()                                     # valores negativos
(~df["columna"].between(minimo, maximo)).sum()                # fuera del rango [minimo, maximo]
(~df["columna_categorica"].isin(categorias_validas)).sum()    # categorías no permitidas
```

- `columna` es una variable numérica, y `minimo` y `maximo` son sus límites válidos.
- `columna_categorica` es una variable de texto y `categorias_validas` es la lista de valores
  permitidos, por ejemplo `["lun", "mar", "mié", "jue", "vie", "sáb", "dom"]`.

## Tratar

Marque el valor inválido como nulo y luego [trátelo como nulo](nulos.md):

```python
import numpy as np

df.loc[~df["columna"].between(minimo, maximo), "columna"] = np.nan
```

Si el valor se puede corregir con certeza (por ejemplo, un porcentaje registrado como `0.45`
en vez de `45`), corríjalo en lugar de borrarlo.

!!! warning "Inválido no es lo mismo que atípico"
    Un valor muy grande pero posible (un ingreso muy alto) no es inválido: es un
    [valor atípico](valores-atipicos.md) y se trata de otra forma.
