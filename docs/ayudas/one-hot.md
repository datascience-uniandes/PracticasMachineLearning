# Codificación one-hot

Los modelos como la [regresión lineal](regresion-lineal.md) solo trabajan con números. La
[codificación one-hot](../glosario.md#codificacion-one-hot) convierte una
[variable categórica](../glosario.md#variable-categorica) en varias columnas de 0 y 1, una por
categoría.

```python
import pandas as pd

df = pd.get_dummies(df, columns=["columna_categorica"], drop_first=True, dtype=int)
```

- `columna_categorica` es el nombre de la columna de texto que quiere codificar. Puede pasar
  varias en la lista: `columns=["columna_categorica1", "columna_categorica2"]`.
- `dtype=int` crea columnas con 0 y 1 en lugar de `True` y `False`.
- `drop_first=True` elimina la columna de la primera categoría (en orden alfabético).
- La columna original se reemplaza por las nuevas columnas `columna_categorica_<categoría>`.

## Por qué no numerar las categorías

Reemplazar `"Bogotá"`, `"Cali"` y `"Medellín"` por 1, 2 y 3 le haría creer al modelo que
existe un orden y que Medellín "vale" el triple que Bogotá. Con one-hot cada categoría tiene su
propia columna y su propio coeficiente, sin ningún orden.

## Antes y después

| ciudad   |
|----------|
| Bogotá   |
| Cali     |
| Medellín |
| Bogotá   |

Con `drop_first=True`:

| ciudad_Cali | ciudad_Medellín |
|-------------|-----------------|
| 0 | 0 |
| 1 | 0 |
| 0 | 1 |
| 0 | 0 |

Bogotá queda representada por la fila con todos los valores en 0: es la **categoría de
referencia**. En una regresión, el coeficiente de `ciudad_Cali` indica cuánto cambia la
predicción en Cali con respecto a Bogotá.

## Para qué sirve `drop_first`

Si se conservan las tres columnas, siempre suman 1: cualquiera se puede calcular a partir de
las otras dos. Esa dependencia exacta es [multicolinealidad](../glosario.md#multicolinealidad)
perfecta (la llamada _trampa de las variables dummy_) y hace que los coeficientes de la
regresión lineal no tengan una solución única. Eliminar una columna resuelve el problema sin
perder información.

!!! tip "Revise las categorías antes de codificar"
    Use `df["columna_categorica"].value_counts()` para ver las categorías. Corrija primero las
    [inconsistencias](inconsistencias.md) (por ejemplo `"bogota"` y `"Bogotá"`), porque cada
    escritura distinta se convertiría en una columna distinta.

## Ejemplo

Suponga un dataset de 300 viviendas con la ciudad (Bogotá, Cali o Medellín), una variable
numérica `x1` y el precio, al que se le aplica `pd.get_dummies` sobre la columna `ciudad` con
`drop_first=True`. Las primeras cinco filas antes de codificar:

| ciudad   | x1  | precio |
|----------|-----|--------|
| Medellín | 0.1 | 111.2  |
| Cali     | 3.7 | 115.9  |
| Cali     | 0.8 | 111.5  |
| Bogotá   | 6.5 | 130.0  |
| Bogotá   | 2.7 | 116.2  |

Las mismas filas después de codificar:

| x1  | precio | ciudad_Cali | ciudad_Medellín |
|-----|--------|-------------|-----------------|
| 0.1 | 111.2  | 0 | 1 |
| 3.7 | 115.9  | 1 | 0 |
| 0.8 | 111.5  | 1 | 0 |
| 6.5 | 130.0  | 0 | 0 |
| 2.7 | 116.2  | 0 | 0 |

La columna `ciudad` se reemplazó por `ciudad_Cali` y `ciudad_Medellín`. Bogotá, la primera en
orden alfabético, se eliminó y quedó como categoría de referencia: una fila con 0 en las dos
columnas (filas 4 y 5) corresponde a una vivienda en Bogotá.
