# Agrupación aglomerativa

La agrupación aglomerativa es la forma más común de
[agrupación jerárquica](../glosario.md#agrupacion-jerarquica). Trabaja de abajo hacia arriba:

1. Al inicio, cada registro es un grupo por sí solo.
2. Se buscan los **dos grupos más cercanos** y se unen en uno.
3. Se repite el paso 2 hasta que todos los registros quedan en un único grupo.

El resultado es una jerarquía completa de uniones, que puede verse en un
[dendrograma](dendrograma.md). Para obtener los grupos finales, se **corta** esa jerarquía en
algún punto. A diferencia de K-means, no depende de centros iniciales aleatorios: con los mismos
datos siempre da el mismo resultado.

## Criterios de enlace

Para unir los dos grupos más cercanos hay que definir qué es la distancia entre dos grupos (no
entre dos puntos). Esa definición es el criterio de [enlace](../glosario.md#enlace), el
hiperparámetro `linkage`:

| `linkage` | Distancia entre dos grupos | Tipo de grupos que tiende a formar |
|---|---|---|
| `"ward"` (por defecto) | El aumento de la varianza dentro de los grupos al unirlos; une los que menos la aumentan | Grupos compactos y de tamaños parecidos, similares a los de K-means. Solo funciona con distancia euclidiana |
| `"complete"` | La distancia entre los dos puntos **más lejanos** de los grupos | Grupos compactos, de diámetro parecido |
| `"average"` | El promedio de las distancias entre todos los pares de puntos de los grupos | Un punto intermedio entre `"complete"` y `"single"` |
| `"single"` | La distancia entre los dos puntos **más cercanos** de los grupos | Puede seguir formas alargadas, pero sufre el **efecto cadena**: une grupos distintos a través de una fila de puntos intermedios y suele dar un grupo enorme y varios diminutos |

`"ward"` es un buen punto de partida. Pruebe los demás si sospecha que los grupos no son
esféricos o si `"ward"` no da resultados claros.

## Cortar la jerarquía

Hay dos formas de indicar dónde cortar:

- **`n_clusters`**: el número de grupos que quiere obtener. El algoritmo detiene las uniones
  cuando quedan exactamente esos grupos.
- **`distance_threshold`**: una distancia máxima. Dos grupos solo se unen si su distancia es
  menor que ese valor; el número de grupos resulta de los datos. Si usa esta opción, indique
  `n_clusters=None`.

Para elegir el número de grupos puede comparar varios valores con la [silueta](silueta.md) y el
[índice de Davies-Bouldin](davies-bouldin.md), o mirar el [dendrograma](dendrograma.md) y cortar
donde hay un salto grande de altura. La [inercia](inercia.md) también se puede calcular con los
grupos obtenidos, pero recuerde que `"ward"` es el único criterio que, como K-means, busca
reducirla.

!!! warning "Costo con muchos registros"
    La agrupación aglomerativa calcula las distancias entre todos los pares de registros, así que
    la memoria y el tiempo crecen aproximadamente con \( n^2 \): con 1000 registros hay cerca de
    medio millón de pares; con 100 000, unos cinco mil millones. Con decenas de miles de
    registros o más, trabaje con una muestra aleatoria o use otro algoritmo, como K-means o
    [HDBSCAN](hdbscan.md).

Una vez elegido el número de grupos, descríbalos como se explica en
[interpretar grupos](interpretar-grupos.md).

## Código: agrupar con un criterio de enlace

```python
from sklearn.cluster import AgglomerativeClustering

k = 3
modelo = AgglomerativeClustering(n_clusters=k, linkage="ward")
etiquetas = modelo.fit_predict(X_esc)
```

- `X_esc` son las variables ya [escaladas](escalar-variables.md).
- `k` es el número de grupos que quiere obtener.
- `linkage` es el criterio de enlace: `"ward"`, `"complete"`, `"average"` o `"single"`.
- `etiquetas` tiene el grupo de cada registro, de 0 a `k − 1`.

Para cortar por distancia en lugar de por número de grupos, use
`AgglomerativeClustering(n_clusters=None, distance_threshold=umbral, linkage="ward")`, donde
`umbral` es la distancia máxima de unión; el número de grupos obtenido queda en
`modelo.n_clusters_`.

## Código: comparar criterios de enlace y números de grupos

```python
import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score, davies_bouldin_score

resultados = []
for linkage in ["ward", "complete", "average", "single"]:
    for k in range(2, 9):
        etiquetas = AgglomerativeClustering(n_clusters=k, linkage=linkage).fit_predict(X_esc)
        resultados.append({
            "linkage": linkage,
            "k": k,
            "silueta": silhouette_score(X_esc, etiquetas),
            "davies_bouldin": davies_bouldin_score(X_esc, etiquetas),
            "tamano_grupo_mayor": pd.Series(etiquetas).value_counts(normalize=True).max(),
        })

tabla = pd.DataFrame(resultados)
print(tabla.round(3))
```

- La lista de `linkage` tiene los criterios de enlace a comparar y `range(2, 9)` los números de
  grupos, de 2 a 8.
- `tabla` tiene una fila por combinación. Busque una silueta alta y un índice de Davies-Bouldin
  bajo.
- `tamano_grupo_mayor` es la proporción de registros en el grupo más grande. Un valor cercano a
  1 indica el efecto cadena: casi todo quedó en un solo grupo, aunque la silueta parezca buena.
