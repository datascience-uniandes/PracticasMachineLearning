# Prueba U de Mann-Whitney

La [prueba U de Mann-Whitney](../glosario.md#prueba-u) compara la
[distribución](../glosario.md#distribucion) de una
[variable continua](../glosario.md#variable-continua) u ordinal entre dos grupos. En lugar de
comparar medias, ordena todos los valores de menor a mayor, les asigna rangos y comprueba si los
valores de un grupo tienden a ser mayores que los del otro. No supone
[normalidad](../glosario.md#normalidad). En [clasificación](../glosario.md#clasificacion)
binaria, los grupos son las dos clases de la
[variable objetivo](../glosario.md#variable-objetivo): si los valores de la variable tienden a
ser distintos en cada clase, la variable probablemente ayuda a predecirla.

## Cuándo preferirla a la prueba t-estudiante

Use la prueba U en lugar de la [prueba t-estudiante](prueba-t.md) cuando:

- la variable tiene un [sesgo](../glosario.md#sesgo) fuerte, sobre todo con muestras pequeñas;
- la variable tiene muchos [valores atípicos](../glosario.md#outlier), que distorsionan la media
  pero afectan poco a los rangos;
- la variable es ordinal (por ejemplo, una escala de 1 a 5), donde la media no tiene una
  interpretación clara.

Puede revisar la forma de la variable con un [histograma](histograma.md), un
[gráfico de cajas](grafico-cajas.md) o la [prueba de Shapiro-Wilk](shapiro-wilk.md).

## Hipótesis

- \( H_0 \): la distribución de la variable es la misma en las dos clases.
- \( H_1 \): los valores de la variable tienden a ser mayores en una de las dos clases.

La prueba entrega un estadístico \( U \) y un [valor p](../glosario.md#valor-p). El estadístico
cuenta, entre todos los pares formados por un registro de la clase 1 y uno de la clase 0, cuántas
veces el valor de la clase 1 es mayor (los empates cuentan como medio). El valor p es la
probabilidad de observar una diferencia tan grande como la obtenida si en realidad la
distribución fuera la misma en las dos clases.

## Cómo decidir

Use un nivel de significancia \( \alpha = 0{,}05 \):

| Resultado | Decisión | Qué significa |
|-----------|----------|---------------|
| \( p < 0{,}05 \) | Rechazar \( H_0 \) | Los valores de la variable tienden a ser distintos entre las clases |
| \( p \geq 0{,}05 \) | No rechazar \( H_0 \) | No hay evidencia de que la variable cambie entre las clases |

No rechazar \( H_0 \) no demuestra que las distribuciones sean iguales, solo que los datos no
muestran una diferencia clara.

## Significativo no es lo mismo que importante

El valor p indica si la diferencia es real, no si es grande. Con muestras grandes casi todo es
significativo: con miles de registros, una diferencia mínima, sin importancia práctica, puede dar
\( p < 0{,}05 \). Por eso, además del valor p, revise siempre el tamaño de la diferencia y los
[gráficos por clase](graficos-por-clase.md).

Dos formas de medir el tamaño de la diferencia son:

- **Diferencia de medianas**: la mediana de la clase 1 menos la mediana de la clase 0, en las
  unidades de la variable.
- **Correlación biserial de rangos**:

  \[
  r = 1 - \frac{2U}{n_1 \cdot n_2}
  \]

  donde \( U \) es el estadístico de la prueba y \( n_1 \) y \( n_2 \) son los tamaños de las
  dos clases. Toma valores entre −1 y 1: cerca de 0, las clases se solapan casi por completo;
  cerca de −1 o 1, los valores de una clase son casi siempre mayores que los de la otra. Con el
  estadístico \( U \) que entrega SciPy para `grupo_1`, un \( r \) negativo indica que los
  valores de la clase 1 tienden a ser mayores.

## Código: una variable

```python
from scipy import stats

grupo_1 = df.loc[df["columna_objetivo"] == 1, "columna"].dropna()
grupo_0 = df.loc[df["columna_objetivo"] == 0, "columna"].dropna()

estadistico, p_valor = stats.mannwhitneyu(grupo_1, grupo_0, alternative="two-sided")
r = 1 - 2 * estadistico / (len(grupo_1) * len(grupo_0))
print(f"Prueba U de Mann-Whitney: U = {estadistico:.1f}, p-valor = {p_valor:.4f}")
print(f"Mediana clase 1: {grupo_1.median():.2f}, mediana clase 0: {grupo_0.median():.2f}")
print(f"Diferencia de medianas: {grupo_1.median() - grupo_0.median():.2f}")
print(f"Correlación biserial de rangos: r = {r:.3f}")
```

- `df` es el DataFrame con los datos.
- `columna_objetivo` es el nombre de la variable objetivo, codificada como 0 y 1.
- `columna` es la variable continua u ordinal que quiere comparar.
- `grupo_1` y `grupo_0` contienen los valores de `columna` en la clase 1 y en la clase 0.
  `.dropna()` elimina los nulos antes de la prueba.
- `alternative="two-sided"` indica que la prueba busca diferencias en cualquier dirección.
- `estadistico` es el estadístico \( U \) de `grupo_1` y `p_valor` es el valor p.
- `r` es la correlación biserial de rangos.

## Código: varias variables

Para revisar varias variables, recorra las columnas y arme una tabla con los resultados:

```python
import pandas as pd
from scipy import stats

columnas = ["columna1", "columna2", "columna3"]

resultados = []
for columna in columnas:
    grupo_1 = df.loc[df["columna_objetivo"] == 1, columna].dropna()
    grupo_0 = df.loc[df["columna_objetivo"] == 0, columna].dropna()
    estadistico, p_valor = stats.mannwhitneyu(grupo_1, grupo_0, alternative="two-sided")
    resultados.append({
        "variable": columna,
        "mediana_clase_1": grupo_1.median(),
        "mediana_clase_0": grupo_0.median(),
        "diferencia_medianas": grupo_1.median() - grupo_0.median(),
        "r": 1 - 2 * estadistico / (len(grupo_1) * len(grupo_0)),
        "U": estadistico,
        "p_valor": p_valor,
    })

tabla = pd.DataFrame(resultados).sort_values("p_valor")
tabla["significativa"] = tabla["p_valor"] < 0.05
print(tabla)
```

- `columnas` es la lista de variables continuas u ordinales que quiere evaluar.
- `tabla` tiene una fila por variable, ordenada de menor a mayor valor p.
- `diferencia_medianas` es la mediana de la clase 1 menos la mediana de la clase 0.
- `r` es la correlación biserial de rangos de cada variable.
- `significativa` vale `True` cuando la diferencia es significativa con \( \alpha = 0{,}05 \).

Para variables categóricas use la [prueba chi-cuadrado](chi-cuadrado.md).
