# Prueba t-estudiante

La [prueba t-estudiante](../glosario.md#prueba-t), también conocida como prueba t de Student,
compara la media de una [variable continua](../glosario.md#variable-continua) entre dos grupos.
En [clasificación](../glosario.md#clasificacion) binaria, los grupos son las dos clases de la
[variable objetivo](../glosario.md#variable-objetivo): si la media de la variable es distinta en
cada clase, la variable probablemente ayuda a predecirla.

## Hipótesis

- \( H_0 \): la media de la variable es igual en las dos clases.
- \( H_1 \): la media de la variable es distinta en las dos clases.

La prueba entrega un estadístico \( t \) y un [valor p](../glosario.md#valor-p). El estadístico
es positivo si la media de la clase 1 es mayor que la de la clase 0 y negativo en el caso
contrario; cuanto más lejos de 0, mayor es la diferencia en relación con la variabilidad de los
datos. El valor p es la probabilidad de observar una diferencia de medias tan grande como la
obtenida si en realidad las medias fueran iguales.

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
- **Varianzas**: use la versión de **Welch** de la prueba t-estudiante, que no supone que las
  dos clases tengan la misma varianza. Funciona aunque las varianzas sean distintas, por lo que
  no es necesario comprobarlo. En el código se activa con `equal_var=False`.

Si la variable tiene un [sesgo](../glosario.md#sesgo) fuerte, muchos
[valores atípicos](../glosario.md#outlier) o es ordinal, sobre todo con muestras pequeñas, use la
[prueba U de Mann-Whitney](prueba-u.md).

## Significativo no es lo mismo que importante

El valor p indica si la diferencia es real, no si es grande. Con muestras grandes casi todo es
significativo: con miles de registros, una diferencia mínima, sin importancia práctica, puede dar
\( p < 0{,}05 \). Por eso, además del valor p, revise siempre el tamaño de la diferencia de
medias y los [gráficos por clase](graficos-por-clase.md), por ejemplo un
[gráfico de cajas](grafico-cajas.md).

Compare la diferencia de medias con la escala de la variable (por ejemplo, con su desviación
estándar): una diferencia pequeña frente a la dispersión de los datos ayuda poco a separar las
clases, aunque sea significativa.

## Código: una variable

```python
from scipy import stats

grupo_1 = df.loc[df["columna_objetivo"] == 1, "columna"].dropna()
grupo_0 = df.loc[df["columna_objetivo"] == 0, "columna"].dropna()

estadistico, p_valor = stats.ttest_ind(grupo_1, grupo_0, equal_var=False)
print(f"Prueba t-estudiante: t = {estadistico:.4f}, p-valor = {p_valor:.4f}")
print(f"Media clase 1: {grupo_1.mean():.2f}, media clase 0: {grupo_0.mean():.2f}")
print(f"Diferencia de medias: {grupo_1.mean() - grupo_0.mean():.2f}")
```

- `df` es el DataFrame con los datos.
- `columna_objetivo` es el nombre de la variable objetivo, codificada como 0 y 1.
- `columna` es la variable continua que quiere comparar.
- `grupo_1` y `grupo_0` contienen los valores de `columna` en la clase 1 y en la clase 0.
  `.dropna()` elimina los nulos antes de la prueba.
- `equal_var=False` aplica la versión de Welch.
- `estadistico` es el estadístico \( t \) y `p_valor` es el valor p.

## Código: varias variables

Para revisar varias variables continuas, recorra las columnas y arme una tabla con los
resultados:

```python
import pandas as pd
from scipy import stats

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
        "diferencia_medias": grupo_1.mean() - grupo_0.mean(),
        "t": estadistico,
        "p_valor": p_valor,
    })

tabla = pd.DataFrame(resultados).sort_values("p_valor")
tabla["significativa"] = tabla["p_valor"] < 0.05
print(tabla)
```

- `columnas_continuas` es la lista de variables continuas que quiere evaluar.
- `tabla` tiene una fila por variable, ordenada de menor a mayor valor p.
- `diferencia_medias` es la media de la clase 1 menos la media de la clase 0.
- `significativa` vale `True` cuando la diferencia de medias es significativa con
  \( \alpha = 0{,}05 \).

Para variables categóricas use la [prueba chi-cuadrado](chi-cuadrado.md).
