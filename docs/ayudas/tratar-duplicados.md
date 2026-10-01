# Tratar registros duplicados

```python
print("Duplicados:", df.duplicated().sum())

df = df.drop_duplicates().reset_index(drop=True)

print("Registros restantes:", len(df))
```

`drop_duplicates()` conserva la primera aparición de cada fila repetida.
Use `subset=[...]` para comparar solo algunas columnas.
