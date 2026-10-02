# Índice de Davies-Bouldin

El [índice de Davies-Bouldin](../glosario.md#davies-bouldin) mide qué tan parecido es cada grupo
a su grupo más similar. Compara la dispersión de los grupos con la distancia entre sus
[centroides](../glosario.md#centroide): dos grupos son «parecidos» cuando están muy dispersos y
sus centros están cerca. Una buena [agrupación](../glosario.md#agrupacion) tiene grupos
compactos y alejados entre sí, es decir, un índice bajo.

Sirve para cualquier algoritmo que entregue una etiqueta de grupo por punto: K-medias,
K-medianas, K-medoides, DBSCAN, MeanShift, HDBSCAN o agrupamiento aglomerativo.

## Fórmula

\[
DB = \frac{1}{K} \sum_{i=1}^{K} \max_{j \neq i} \frac{S_i + S_j}{d(\mu_i, \mu_j)}
\]

- \( K \) es el número de grupos.
- \( S_i \) es la dispersión del grupo \( i \): la distancia promedio entre sus puntos y su
  centroide \( \mu_i \).
- \( d(\mu_i, \mu_j) \) es la distancia entre los centroides de los grupos \( i \) y \( j \).

Para cada grupo \( i \) se busca el grupo \( j \) con el que más se confunde, es decir, el que da
la mayor razón \( (S_i + S_j) / d(\mu_i, \mu_j) \). El índice es el promedio de esas razones
máximas sobre todos los grupos.

## Cómo interpretarlo

El índice es siempre mayor o igual que 0 y **más bajo es mejor**:

| Valor | Interpretación |
|-------|----------------|
| Cerca de 0 | Grupos compactos y muy separados entre sí |
| Alrededor de 1 | La dispersión de los grupos es comparable a la distancia entre sus centros: se solapan en parte |
| Mayor que 1 | Grupos dispersos o con centros muy cercanos: se confunden entre sí |

- **No tiene un límite superior** y no hay un umbral universal. Úselo para comparar resultados
  sobre los mismos datos.
- **Calcúlelo sobre los datos escalados** (vea [escalar variables](escalar-variables.md)); las
  distancias dependen de la escala de las variables.
- **Se basa en centroides**, así que favorece grupos redondeados. Con grupos alargados o de
  formas irregulares, como los que encuentran DBSCAN o HDBSCAN, puede dar un valor alto aunque la
  agrupación sea buena.
- **Necesita al menos dos grupos**.

## Comparación con la silueta

| | [Coeficiente de silueta](silueta.md) | Índice de Davies-Bouldin |
|--|--------------------------------------|--------------------------|
| Mejor valor | El más alto (máximo 1) | El más bajo (mínimo 0) |
| Rango | De −1 a 1 | De 0 en adelante |
| Qué compara | Cada punto con su grupo y con el grupo vecino | Cada grupo con el grupo más parecido, usando centroides |
| Detalle | Un valor por punto: permite ver grupos débiles y puntos mal asignados | Un solo valor por agrupación |
| Costo | Alto: \( O(n^2) \), lento con muchos registros | Bajo: rápido incluso con muchos registros |

Las dos métricas suelen coincidir. Cuando no coinciden, revise el gráfico de silueta y la
utilidad práctica de los grupos. Por su
bajo costo, Davies-Bouldin es una buena alternativa cuando la silueta es demasiado lenta.

## Puntos de ruido

DBSCAN y HDBSCAN marcan con la etiqueta −1 los puntos de [ruido](../glosario.md#ruido).
`davies_bouldin_score` trataría la etiqueta −1 como un grupo más, con un «centroide» sin
sentido, así que **excluya esos puntos** antes de calcular el índice. Reporte siempre cuántos
puntos quedaron fuera: un resultado con mucho ruido puede tener un índice bajo solo porque
descartó los puntos más difíciles.

## Cómo usarlo para elegir

1. Agrupe los datos con varios números de grupos (por ejemplo \( K = 2, \dots, 10 \)) o varios
   valores de los [hiperparámetros](../glosario.md#hiperparametro).
2. Calcule el índice de cada resultado y elija el que tenga el **índice más bajo**.
3. Contraste la elección con el [coeficiente de silueta](silueta.md) y el
   [método del codo](metodo-codo.md) (vea también [inercia media](inercia.md)).

## Código: calcular el índice

```python
from sklearn.metrics import davies_bouldin_score

mascara = etiquetas != -1
indice_db = davies_bouldin_score(X_esc[mascara], etiquetas[mascara])
print(f"Índice de Davies-Bouldin: {indice_db:.3f}")
```

- `X_esc` son los datos ya escalados y `etiquetas` el grupo asignado a cada registro, por
  ejemplo `modelo.labels_` o `modelo.fit_predict(X_esc)`.
- `mascara` vale `True` para los puntos que no son ruido. En algoritmos sin ruido, como
  K-medias, todos los valores son `True` y no cambia nada.
- `indice_db` es el índice de Davies-Bouldin de los puntos agrupados.

Si usa [DBSCAN](dbscan.md) o [HDBSCAN](hdbscan.md), recuerde excluir el ruido como se muestra
arriba.
