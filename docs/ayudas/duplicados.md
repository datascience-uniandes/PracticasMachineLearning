# Revisar y tratar duplicados

**Dimensión de calidad: unicidad.** Un [duplicado](../glosario.md#duplicado) es un registro
idéntico a otro. Si no se elimina, ese registro pesa doble en el análisis.

## Revisar

```python
df.duplicated().sum()            # cantidad de filas repetidas
df[df.duplicated(keep=False)]    # muestra todas las copias de cada fila repetida
```

`df.duplicated()` marca como `True` cada fila que repite una anterior. Con `keep=False`
marca todas las copias, incluida la primera, para poder compararlas.

## Tratar

```python
df = df.drop_duplicates().reset_index(drop=True)
len(df)                          # registros que quedan
```

- `drop_duplicates()` conserva la primera aparición de cada fila repetida.
- `reset_index(drop=True)` vuelve a numerar las filas desde 0.

Para comparar solo algunas columnas (por ejemplo, un identificador), use
`df.drop_duplicates(subset=["columna1", "columna2"])`.
