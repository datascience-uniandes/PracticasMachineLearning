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
