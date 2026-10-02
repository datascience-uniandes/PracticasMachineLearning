# HDBSCAN

[HDBSCAN](../glosario.md#hdbscan) es una extensión jerárquica de [DBSCAN](dbscan.md) para
[agrupación](../glosario.md#agrupacion) por densidad. En lugar de fijar un único radio `eps`,
HDBSCAN recorre **todos los niveles de densidad** posibles: construye una jerarquía en la que los
grupos aparecen, se dividen y desaparecen a medida que se exige más densidad, y al final se queda
con los grupos más **estables**, es decir, los que se mantienen a lo largo de un rango amplio de
niveles. Los puntos que no quedan en ningún grupo estable se marcan como
[ruido](../glosario.md#ruido).

## Ventajas frente a DBSCAN

- **No necesita `eps`.** En DBSCAN, elegir `eps` suele ser lo más difícil: un valor pequeño deja
  casi todo como ruido y uno grande une grupos distintos. HDBSCAN no usa ese radio.
- **Maneja grupos de densidades distintas.** Con un solo `eps`, DBSCAN no puede capturar a la vez
  un grupo compacto y uno disperso. HDBSCAN evalúa cada grupo en el nivel de densidad que le
  corresponde, así que puede encontrar ambos.
- Al igual que DBSCAN, **no hay que indicar el número de grupos** y los grupos pueden tener
  formas no esféricas.

## Hiperparámetros

| [Hiperparámetro](../glosario.md#hiperparametro) | Qué controla | Efecto al aumentarlo |
|---|---|---|
| `min_cluster_size` | Tamaño mínimo para que un conjunto de puntos se considere un grupo | Menos grupos y más grandes; los grupos pequeños pasan a ser ruido o se unen a otros |
| `min_samples` | Qué tan conservador es el algoritmo al estimar la densidad (por defecto, igual a `min_cluster_size`) | Más puntos marcados como ruido; los grupos quedan limitados a las zonas más densas |
| `cluster_selection_method` | Cómo se eligen los grupos dentro de la jerarquía | `"eom"` (por defecto) prefiere pocos grupos grandes y estables; `"leaf"` toma las hojas de la jerarquía y da grupos más pequeños y homogéneos |

Empiece con `min_cluster_size` según el tamaño mínimo de grupo que tendría sentido en su
problema (por ejemplo, el 1 % o el 2 % de los registros) y ajuste `min_samples` si hay demasiado
o muy poco ruido.

## Ruido y probabilidades

- Los puntos de ruido reciben la etiqueta **−1**. No son un grupo: son registros que no
  pertenecen con claridad a ninguno.
- `probabilities_` da, para cada punto, un valor entre 0 y 1 que indica con cuánta fuerza
  pertenece a su grupo. Los puntos del centro denso tienen valores cercanos a 1, los del borde
  valores menores y los de ruido valen 0.

Un porcentaje de ruido moderado es normal. Si supera, por ejemplo, el 30 % o 40 % de los
registros, los hiperparámetros probablemente son demasiado exigentes.

## Cómo evaluar los grupos

Calcule la [silueta](silueta.md) y el [índice de Davies-Bouldin](davies-bouldin.md) **sin los
puntos de ruido**: el ruido no es un grupo y, si lo incluye, distorsiona ambas métricas. Por eso,
además de las métricas, revise siempre el número de grupos y el porcentaje de ruido: una silueta
alta con el 60 % de los datos como ruido describe solo una pequeña parte de los datos.

No compare la [inercia](inercia.md) entre HDBSCAN y K-means: la inercia mide qué tan compactos
son los grupos alrededor de un centro, y HDBSCAN no busca grupos con esa forma.

Una vez elegidos los hiperparámetros, describa cada grupo como se explica en
[interpretar grupos](interpretar-grupos.md).

## Código: agrupar con HDBSCAN

```python
import numpy as np
from sklearn.cluster import HDBSCAN

modelo = HDBSCAN(min_cluster_size=50, min_samples=10)
etiquetas = modelo.fit_predict(X_esc)

n_grupos = len(set(etiquetas)) - (1 if -1 in etiquetas else 0)
porc_ruido = np.mean(etiquetas == -1) * 100
print(f"Número de grupos: {n_grupos}")
print(f"Ruido: {porc_ruido:.1f} % de los registros")
print("Probabilidad media de pertenencia:", modelo.probabilities_.mean().round(3))
```

- `X_esc` son las variables ya [escaladas](escalar-variables.md).
- `min_cluster_size` y `min_samples` son los hiperparámetros descritos arriba.
- `etiquetas` tiene el grupo de cada registro: 0, 1, 2, ... y −1 para el ruido.
- `n_grupos` cuenta los grupos sin contar el ruido.
- `porc_ruido` es el porcentaje de registros marcados como ruido.
- `modelo.probabilities_` tiene la fuerza de pertenencia de cada registro a su grupo.

## Código: probar varias combinaciones de hiperparámetros

```python
import numpy as np
import pandas as pd
from sklearn.cluster import HDBSCAN
from sklearn.metrics import silhouette_score, davies_bouldin_score

resultados = []
for min_cluster_size in [20, 50, 100]:
    for min_samples in [5, 10, 20]:
        etiquetas = HDBSCAN(min_cluster_size=min_cluster_size,
                            min_samples=min_samples).fit_predict(X_esc)
        sin_ruido = etiquetas != -1
        n_grupos = len(set(etiquetas[sin_ruido]))
        fila = {
            "min_cluster_size": min_cluster_size,
            "min_samples": min_samples,
            "n_grupos": n_grupos,
            "porc_ruido": 100 * (1 - sin_ruido.mean()),
            "silueta": np.nan,
            "davies_bouldin": np.nan,
        }
        if n_grupos >= 2:
            fila["silueta"] = silhouette_score(X_esc[sin_ruido], etiquetas[sin_ruido])
            fila["davies_bouldin"] = davies_bouldin_score(X_esc[sin_ruido], etiquetas[sin_ruido])
        resultados.append(fila)

tabla = pd.DataFrame(resultados)
print(tabla.round(3))
```

- Las listas de `min_cluster_size` y `min_samples` son los valores a probar; ajústelas al tamaño
  de sus datos.
- `sin_ruido` vale `True` en los registros que pertenecen a algún grupo. Las métricas se
  calculan solo con ellos.
- La silueta y el índice de Davies-Bouldin necesitan al menos dos grupos; si hay menos, quedan
  como `NaN`.
- `tabla` tiene una fila por combinación. Busque una silueta alta, un índice de Davies-Bouldin
  bajo y un porcentaje de ruido razonable, y prefiera combinaciones vecinas que den resultados
  parecidos: indican una solución estable.
