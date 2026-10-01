# Dimensiones de calidad de los datos

Antes de modelar conviene medir qué tan **completos**, **únicos** y **válidos** son los datos.

## Completitud: valores nulos

```python
df.isna().sum()            # nulos por columna
df.isna().mean() * 100     # porcentaje de nulos por columna
```

## Unicidad: registros duplicados

```python
df.duplicated().sum()          # número de filas repetidas
df[df.duplicated(keep=False)]  # muestra todas las copias de cada fila repetida
```

## Validez: valores extraños

Compare los mínimos y máximos con los rangos esperados del diccionario de datos:

```python
df.describe().loc[["min", "max"]]
```

Y cuente los registros fuera de un rango válido:

```python
(df["RH"] > 100).sum()     # una humedad relativa mayor a 100 % no es posible
(df["area"] == 0).mean()   # proporción de valores exactamente iguales a cero
```
