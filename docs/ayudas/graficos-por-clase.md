# Relación de una variable con una clase

En un problema de [clasificación](../glosario.md#clasificacion) binaria, la
[variable objetivo](../glosario.md#variable-objetivo) toma dos valores (por ejemplo, 0 y 1).
Antes de entrenar un modelo conviene revisar, variable por variable, si su comportamiento cambia
entre las dos clases. Una variable cuya [distribución](../glosario.md#distribucion) es distinta
en cada clase probablemente ayuda a predecirla.

El gráfico adecuado depende del tipo de variable:

| Tipo de variable | Gráfico |
|------------------|---------|
| [Continua](../glosario.md#variable-continua) | Cajas o violín por clase; histogramas o curvas de densidad superpuestos |
| [Categórica](../glosario.md#variable-categorica) | Proporción de la clase positiva por categoría; barras apiladas normalizadas |

## Variable continua

### Cajas o violín por clase

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.boxplot(x="columna_objetivo", y="columna", data=df)
plt.show()

sns.violinplot(x="columna_objetivo", y="columna", data=df)
plt.show()
```

- `df` es el DataFrame con los datos.
- `columna_objetivo` es el nombre de la variable objetivo; cada uno de sus valores produce una
  caja (o un violín).
- `columna` es la variable continua que quiere comparar entre las clases.

El gráfico de violín muestra lo mismo que el de [cajas](grafico-cajas.md), pero agrega la forma
completa de la distribución en cada clase.

### Histogramas o densidades superpuestos

```python
sns.histplot(data=df, x="columna", hue="columna_objetivo", stat="density",
             common_norm=False, element="step")
plt.show()

sns.kdeplot(data=df, x="columna", hue="columna_objetivo", common_norm=False)
plt.show()
```

- `hue="columna_objetivo"` dibuja una distribución por cada clase, con un color distinto.
- `stat="density"` y `common_norm=False` normalizan cada clase por separado. Así las dos curvas
  se pueden comparar aunque una clase tenga muchos más registros que la otra (vea
  [desbalance de clases](../glosario.md#desbalance-de-clases)).
- `element="step"` dibuja solo el contorno de cada [histograma](histograma.md), para que no se
  tapen entre sí.
- `sns.kdeplot` dibuja una curva de densidad suavizada en lugar de barras.

## Variable categórica

### Proporción de la clase positiva por categoría

Si la variable objetivo está codificada como 0 y 1, la media de esa columna en cada grupo es la
proporción de registros de la clase positiva (1):

```python
proporcion = df.groupby("columna_categorica")["columna_objetivo"].mean()

proporcion.plot(kind="bar")
plt.axhline(df["columna_objetivo"].mean(), color="gray", linestyle="--")
plt.ylabel("Proporción de la clase positiva")
plt.show()
```

- `columna_categorica` es la variable categórica que quiere analizar.
- `proporcion` contiene, para cada categoría, la fracción de registros con
  `columna_objetivo = 1`.
- La línea punteada marca la proporción de la clase positiva en todo el dataset, como
  referencia.

### Barras apiladas normalizadas

```python
import pandas as pd

tabla = pd.crosstab(df["columna_categorica"], df["columna_objetivo"], normalize="index")

tabla.plot(kind="bar", stacked=True)
plt.ylabel("Proporción")
plt.show()
```

- `pd.crosstab` cuenta los registros de cada combinación de categoría y clase.
- `normalize="index"` divide cada fila por su total: cada barra suma 1 y muestra cómo se reparten
  las clases dentro de esa categoría.
- `stacked=True` apila las clases en una sola barra por categoría (vea
  [gráfico de barras](grafico-barras.md)).

## Cómo interpretarlo

| Lo que observa | Qué significa |
|----------------|---------------|
| Cajas, violines o curvas desplazados entre clases | La variable toma valores distintos en cada clase: probablemente es útil |
| Distribuciones casi superpuestas | La variable, por sí sola, distingue poco entre las clases |
| Proporciones de la clase positiva muy distintas entre categorías | La categoría está relacionada con la clase: probablemente es útil |
| Todas las barras cerca de la línea de referencia | La categoría aporta poca información sobre la clase |

Tenga en cuenta:

- Una categoría con muy pocos registros puede mostrar una proporción extrema solo por azar.
  Revise también cuántos registros tiene cada una con `df["columna_categorica"].value_counts()`.
- Los [valores atípicos](../glosario.md#outlier) pueden estirar el eje y ocultar las diferencias;
  observe dónde se concentra la mayoría de los datos.
- Los gráficos muestran la relación de una variable a la vez. Una variable que parece poco útil
  sola puede serlo en combinación con otras.

Para confirmar con una prueba estadística si la diferencia observada es real, use la
[prueba t](prueba-t.md) para variables continuas y la
[prueba chi-cuadrado](chi-cuadrado.md) para variables categóricas.
