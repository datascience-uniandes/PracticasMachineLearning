# Revisar y tratar nulos

**Dimensión de calidad: completitud.** Un [valor nulo](../glosario.md#valor-nulo) es un dato
faltante. En pandas aparece como `NaN`.

## Revisar

```python
df.isna().sum()            # cantidad de nulos por columna
df.isna().mean() * 100     # porcentaje de nulos por columna
df[df["columna"].isna()]   # filas con nulo en una columna
```

`columna` es el nombre de la columna que quiere revisar.

## Tratar

La estrategia depende de la proporción de nulos:

| Nulos en la columna | Estrategia |
|---------------------|------------|
| Menos del 5 % | **Imputar**: reemplazar cada nulo por un valor representativo |
| Demasiados (la columna aporta poca información) | **Eliminar** la columna o los registros |

### Imputar con la media o la mediana

```python
df["columna_media"] = df["columna"].fillna(df["columna"].mean())       # media
df["columna_mediana"] = df["columna"].fillna(df["columna"].median())   # mediana
df["columna_categorica"] = df["columna_categorica"].fillna(df["columna_categorica"].mode()[0])  # moda
```

- La **media** conserva el promedio de la columna, pero en distribuciones con
  [sesgo](../glosario.md#sesgo) cae lejos de la mayoría de los datos y desplaza la mediana.
- La **mediana** conserva el valor central y no se ve afectada por los
  [valores atípicos](../glosario.md#outlier), pero cambia el promedio.
- En las dos, todos los nulos reciben el mismo valor: la distribución gana un pico en ese
  punto y la desviación estándar disminuye.
- Las variables categóricas se imputan con la **moda** (la categoría más frecuente).

Guarde cada opción en una columna nueva y vuelva a graficar el [histograma](histograma.md) y el
[gráfico de cajas](grafico-cajas.md) para comparar el efecto antes de decidir.

### Eliminar

```python
df = df.drop(columns=["columna"])      # elimina la columna completa
df = df.dropna(subset=["columna"])     # elimina los registros con nulo en esa columna
```
