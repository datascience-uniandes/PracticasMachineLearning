# DBSCAN

[DBSCAN](../glosario.md#dbscan) es un método de [agrupación](../glosario.md#agrupacion) basado
en densidad: un grupo es una región donde los registros están muy juntos, separada de otras
regiones por zonas con pocos registros. A diferencia de K-medias, no hay que indicar el número de
grupos: DBSCAN lo descubre a partir de los datos, y además marca como
[ruido](../glosario.md#ruido) los registros que no pertenecen a ninguna región densa.

## Cómo funciona

DBSCAN usa dos [hiperparámetros](../glosario.md#hiperparametro):

- `eps`: el radio del vecindario de cada registro. Dos registros son vecinos si la distancia
  entre ellos es como máximo `eps`.
- `min_samples`: el número mínimo de vecinos (contando el propio registro) que debe haber dentro
  de ese radio para considerar que la zona es densa.

Con ellos, cada registro queda en una de tres categorías:

| Tipo de punto | Condición | Resultado |
|---------------|-----------|-----------|
| **Núcleo** | Tiene al menos `min_samples` vecinos a una distancia de `eps` o menos | Forma parte de un grupo y lo extiende |
| **Borde** | No es núcleo, pero está a `eps` o menos de algún punto núcleo | Se une al grupo de ese núcleo |
| **Ruido** | No es núcleo ni está cerca de un núcleo | Recibe la etiqueta **−1** |

Un grupo se forma uniendo puntos núcleo que son vecinos entre sí, en cadena, y agregando los
puntos borde que los rodean. Por eso los grupos pueden tener formas arbitrarias (alargadas,
curvas, en anillo), algo que K-medias no logra porque siempre forma grupos más o menos esféricos
alrededor de un centro.

![Datos con forma de dos medias lunas agrupados con DBSCAN: puntos núcleo, puntos borde y puntos de ruido, con círculos de radio eps alrededor de un ejemplo de cada tipo](../assets/img/ayudas/dbscan.png)

El ruido no es un grupo: es el conjunto de registros aislados, que a menudo coinciden con
[valores atípicos](../glosario.md#outlier). Revíselos aparte en lugar de tratarlos como un grupo
más.

!!! warning "Escale antes de agrupar"
    `eps` es una distancia, así que el resultado depende de la escala de las variables. Una
    variable medida en miles dominaría a otra medida en unidades.
    [Escale las variables](escalar-variables.md) (por ejemplo, con
    [estandarización](../glosario.md#estandarizacion)) antes de usar DBSCAN. En esta página,
    `X_esc` son los datos ya escalados.

## Ventajas y limitaciones

**Ventajas:**

- No necesita el número de grupos.
- Encuentra grupos de forma arbitraria.
- Separa explícitamente el ruido, en lugar de forzar cada registro dentro de un grupo.

**Limitaciones:**

- Usa un solo `eps` para todos los datos. Si hay grupos de densidades muy distintas, un `eps`
  pequeño deja como ruido al grupo disperso y uno grande fusiona los grupos densos cercanos. En
  ese caso, considere [HDBSCAN](hdbscan.md).
- En muchas dimensiones las distancias entre registros se parecen cada vez más y es difícil
  encontrar un `eps` que separe zonas densas de zonas vacías. Con muchas variables, conviene
  reducir antes la dimensión o usar solo las variables relevantes.
- El resultado es muy sensible a `eps`: un cambio pequeño puede pasar de muchos grupos diminutos
  a un único grupo gigante.

## Elegir `min_samples`

Una regla práctica es usar `min_samples` ≈ 2 × número de variables (con un mínimo de alrededor de
4). Valores más altos exigen zonas más densas para formar un grupo, producen grupos más robustos y
marcan más registros como ruido; valores más bajos producen más grupos pequeños.

## Elegir `eps`

Fijado `min_samples`, use la [curva de k-distancia](k-distancia.md) con ese mismo valor: la
distancia en el codo de la curva es un buen valor inicial para `eps`.

## Código: agrupar con DBSCAN

```python
import numpy as np
import pandas as pd
from sklearn.cluster import DBSCAN

eps = 0.3
min_samples = 6

etiquetas = DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X_esc)

n_grupos = len(set(etiquetas)) - (1 if -1 in etiquetas else 0)
pct_ruido = 100 * np.mean(etiquetas == -1)
print(f"Grupos: {n_grupos}, ruido: {pct_ruido:.1f} %")
print(pd.Series(etiquetas).value_counts().sort_index())
```

- `X_esc` son las variables ya [escaladas](escalar-variables.md).
- `eps` es el radio del vecindario y `min_samples`, el número mínimo de vecinos para que un
  registro sea núcleo.
- `etiquetas` tiene un número de grupo (0, 1, 2, …) por registro; el ruido tiene la etiqueta −1.
- `n_grupos` cuenta los grupos sin contar el ruido y `pct_ruido` es el porcentaje de registros
  marcados como ruido.
- `value_counts()` muestra cuántos registros hay en cada grupo y en el ruido (fila −1).
