# Prueba t de Student

La [prueba t](../glosario.md#prueba-t) compara la media de una
[variable continua](../glosario.md#variable-continua) entre dos grupos. En
[clasificación](../glosario.md#clasificacion) binaria, los grupos son las dos clases de la
[variable objetivo](../glosario.md#variable-objetivo): si la media de la variable es distinta en
cada clase, la variable probablemente ayuda a predecirla.

Las hipótesis de la prueba son:

- \( H_0 \): la media de la variable es igual en las dos clases.
- \( H_1 \): la media de la variable es distinta en las dos clases.

```python
from scipy import stats

grupo_1 = df.loc[df["columna_objetivo"] == 1, "columna"]
grupo_0 = df.loc[df["columna_objetivo"] == 0, "columna"]

estadistico, p_valor = stats.ttest_ind(grupo_1, grupo_0, equal_var=False)
print(f"Prueba t: t = {estadistico:.4f}, p-valor = {p_valor:.4f}")
```

- `columna_objetivo` es el nombre de la variable objetivo, codificada como 0 y 1.
- `columna` es la variable continua que quiere comparar.
- `grupo_1` y `grupo_0` contienen los valores de `columna` en la clase 1 y en la clase 0.
- `equal_var=False` aplica la versión de **Welch**, que no supone que las dos clases tengan la
  misma varianza. Es la opción recomendada.
- `estadistico` es el estadístico \( t \): positivo si la media de `grupo_1` es mayor que la de
  `grupo_0`, negativo en el caso contrario. Cuanto más lejos de 0, mayor es la diferencia en
  relación con la variabilidad de los datos.
- `p_valor` es el [valor p](../glosario.md#valor-p): la probabilidad de observar una diferencia
  de medias tan grande como la obtenida si en realidad las medias fueran iguales.

Si la variable tiene nulos, elimínelos antes de la prueba con `.dropna()` o pase
`nan_policy="omit"`.

## Cómo decidir

Use un nivel de significancia \( \alpha = 0{,}05 \):

| Resultado | Decisión | Qué significa |
|-----------|----------|---------------|
| \( p < 0{,}05 \) | Rechazar \( H_0 \) | La media de la variable es distinta entre las clases |
| \( p \geq 0{,}05 \) | No rechazar \( H_0 \) | No hay evidencia de que la media cambie entre las clases |

No rechazar \( H_0 \) no demuestra que las medias sean iguales, solo que los datos no muestran
una diferencia clara.

## Supuestos

- **Independencia**: cada registro pertenece a una sola clase y los registros no dependen entre
  sí.
- **[Normalidad](../glosario.md#normalidad) aproximada** de la variable en cada clase. Con
  muestras grandes (más de 30 registros por clase, como referencia) este supuesto pierde
  importancia: por el teorema central del límite, la media se comporta de forma aproximadamente
  normal aunque los datos no lo sean. Puede revisarlo con la
  [prueba de Shapiro-Wilk](shapiro-wilk.md) o con un [histograma](histograma.md) por clase.
- **Varianzas**: la versión de Welch (`equal_var=False`) funciona aunque las dos clases tengan
  varianzas distintas, por lo que no es necesario comprobarlo.

!!! tip "Alternativa: prueba U de Mann-Whitney"
    Si la variable tiene un [sesgo](../glosario.md#sesgo) fuerte o muchos
    [valores atípicos](../glosario.md#outlier), sobre todo con muestras pequeñas, use la prueba
    U de Mann-Whitney. No compara medias sino si los valores de una clase tienden a ser mayores
    que los de la otra, y no supone normalidad. Se lee igual que la prueba t:

    ```python
    estadistico, p_valor = stats.mannwhitneyu(grupo_1, grupo_0)
    ```

## Significativo no es lo mismo que importante

!!! warning "Con muestras grandes casi todo es significativo"
    El valor p indica si la diferencia es real, no si es grande. Con miles de registros, una
    diferencia mínima, sin importancia práctica, puede dar \( p < 0{,}05 \). Revise siempre
    también la diferencia de medias y los [gráficos por clase](graficos-por-clase.md):

    ```python
    print(f"Media clase 1: {grupo_1.mean():.2f}, media clase 0: {grupo_0.mean():.2f}")
    print(f"Diferencia: {grupo_1.mean() - grupo_0.mean():.2f}")
    ```

    Compare la diferencia con la escala de la variable (por ejemplo, con su desviación
    estándar): una diferencia pequeña frente a la dispersión de los datos ayuda poco a separar
    las clases, aunque sea significativa.

## Varias variables a la vez

Para revisar varias variables continuas, recorra las columnas y arme una tabla con los
resultados:

```python
import pandas as pd

columnas_continuas = ["columna1", "columna2", "columna3"]

resultados = []
for columna in columnas_continuas:
    grupo_1 = df.loc[df["columna_objetivo"] == 1, columna].dropna()
    grupo_0 = df.loc[df["columna_objetivo"] == 0, columna].dropna()
    estadistico, p_valor = stats.ttest_ind(grupo_1, grupo_0, equal_var=False)
    resultados.append({
        "variable": columna,
        "media_clase_1": grupo_1.mean(),
        "media_clase_0": grupo_0.mean(),
        "t": estadistico,
        "p_valor": p_valor,
    })

tabla = pd.DataFrame(resultados).sort_values("p_valor")
tabla["significativa"] = tabla["p_valor"] < 0.05
print(tabla)
```

- `columnas_continuas` es la lista de variables continuas que quiere evaluar.
- `tabla` tiene una fila por variable, ordenada de menor a mayor valor p.
- `significativa` vale `True` cuando la diferencia de medias es significativa con
  \( \alpha = 0{,}05 \).

Para variables categóricas use la [prueba chi-cuadrado](chi-cuadrado.md).
