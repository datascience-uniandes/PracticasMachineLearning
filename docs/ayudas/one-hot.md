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

Con un dataset de 300 registros con una ciudad y un precio:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
df = pd.DataFrame({
    "ciudad": rng.choice(["Bogotá", "Cali", "Medellín"], 300),
    "x1": rng.uniform(0, 10, 300).round(1),
    "precio": rng.normal(100, 15, 300).round(1),
})
print(df.head())

df = pd.get_dummies(df, columns=["ciudad"], drop_first=True, dtype=int)
print(df.head())
```

Salida:

```text
     ciudad   x1  precio
0  Medellín  0.1   111.2
1      Cali  3.7   115.9
2      Cali  0.8   111.5
3    Bogotá  6.5   130.0
4    Bogotá  2.7   116.2
    x1  precio  ciudad_Cali  ciudad_Medellín
0  0.1   111.2            0                1
1  3.7   115.9            1                0
2  0.8   111.5            1                0
3  6.5   130.0            0                0
4  2.7   116.2            0                0
```

La columna `ciudad` se reemplazó por `ciudad_Cali` y `ciudad_Medellín`. Las filas de Bogotá
tienen 0 en las dos columnas.
