# Dimensiones de calidad de los datos

Antes de analizar o modelar, conviene revisar la calidad de los datos en cuatro dimensiones:

| Dimensión | Pregunta que responde | Problema típico | Ayuda |
|-----------|-----------------------|-----------------|-------|
| **Unicidad** | ¿Cada registro aparece una sola vez? | Filas repetidas | [Revisar y tratar duplicados](duplicados.md) |
| **Completitud** | ¿Están todos los valores? | Celdas vacías (`NaN`) | [Revisar y tratar nulos](nulos.md) |
| **Consistencia** | ¿El mismo dato se representa siempre igual? | `"Bogotá"`, `"bogota"` y `" BOGOTÁ"`; números guardados como texto | [Revisar y tratar inconsistencias](inconsistencias.md) |
| **Validez** | ¿Los valores cumplen las reglas de su variable? | Edades negativas, porcentajes mayores a 100 | [Revisar y tratar valores inválidos](valores-invalidos.md) |

## Revisión rápida

```python
df.duplicated().sum()                    # unicidad: filas repetidas
df.isna().sum()                          # completitud: nulos por columna
df.dtypes                                # consistencia: tipos de dato
df["columna_categorica"].unique()        # consistencia: categorías escritas de formas distintas
df.describe().loc[["min", "max"]].T      # validez: rangos de las variables numéricas
```

`columna_categorica` es el nombre de una variable de texto.

!!! note "¿Y los valores atípicos?"
    Un [valor atípico](valores-atipicos.md) puede ser perfectamente válido (un ingreso muy alto)
    y aun así afectar el análisis. No es una dimensión de calidad, pero se revisa junto con ellas.
