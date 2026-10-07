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

Hay tres formas de tratar un valor inválido. Elija según el tipo de error.

### Recortar al rango válido (clipping) { #recortar-al-rango-valido }

El [clipping](../glosario.md#clipping) lleva cada valor fuera de rango al límite más cercano del
rango válido: un valor menor que el mínimo pasa a ser el mínimo y uno mayor que el máximo pasa a
ser el máximo. No elimina registros.

```python
df["columna"] = df["columna"].clip(lower=minimo, upper=maximo)
df["monto"] = df["monto"].clip(lower=0)       # solo límite inferior
```

`minimo` y `maximo` son los límites del rango válido, tomados del diccionario de datos. Si la
variable solo tiene un límite, indique solo `lower` o solo `upper`.

Es adecuado cuando el valor inválido está **cerca del límite** o cuando el límite es el valor más
razonable, por ejemplo, un monto negativo pequeño (un saldo de −5 pasa a 0) o una proporción
de 1,02 que pasa a 1.

### Marcar como nulo

Si el valor está muy lejos del rango (una edad de 210 años), recortarlo al límite inventa un
dato: es mejor marcarlo como nulo y luego [tratarlo como nulo](nulos.md):

```python
import numpy as np

df.loc[~df["columna"].between(minimo, maximo), "columna"] = np.nan
```

### Corregir

Si el valor se puede corregir con certeza, corríjalo. Por ejemplo, una proporción registrada en
porcentaje (`45` en lugar de `0.45`) está en otra escala: divídala por 100 en lugar de
recortarla, porque el clipping la convertiría en 1. Este tipo de error es una
[inconsistencia](inconsistencias.md).

!!! warning "Inválido no es lo mismo que atípico"
    Un valor muy grande pero posible (un ingreso muy alto) no es inválido: es un
    [valor atípico](valores-atipicos.md) y se trata de otra forma.
