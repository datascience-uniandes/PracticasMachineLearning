# Inercia media

La [inercia](../glosario.md#inercia) mide qué tan compactos son los grupos que encontró un
algoritmo de [agrupación](../glosario.md#agrupacion). Suma, para cada punto, la distancia al
cuadrado entre el punto y el [centroide](../glosario.md#centroide) de su grupo. Si los puntos de
cada grupo están cerca de su centro, la inercia es pequeña; si están dispersos, es grande.

Sirve para cualquier algoritmo que entregue una etiqueta de grupo por punto: K-medias,
K-medoides, DBSCAN, MeanShift, HDBSCAN o agrupamiento aglomerativo.

## Fórmula

\[
\text{Inercia} = \sum_{k=1}^{K} \sum_{x_i \in C_k} \lVert x_i - \mu_k \rVert^2
\]

\( K \) es el número de grupos, \( C_k \) el conjunto de puntos del grupo \( k \), \( \mu_k \) su
centroide (la media de sus puntos, variable por variable) y \( \lVert x_i - \mu_k \rVert^2 \) la
distancia euclidiana al cuadrado entre el punto \( x_i \) y ese centroide.

La **inercia media** divide la inercia entre el número de puntos agrupados \( n \):

\[
\text{Inercia media} = \frac{\text{Inercia}}{n}
\]

Es la distancia al cuadrado promedio entre cada punto y el centroide de su grupo.

## Por qué usar la inercia media

La inercia total crece con el número de puntos: con el doble de registros, la inercia es más o
menos el doble aunque los grupos sean igual de compactos. La inercia media no depende del tamaño
de los datos, así que permite comparar:

- resultados obtenidos con distintas cantidades de registros;
- algoritmos que dejan fuera algunos puntos, como DBSCAN y HDBSCAN, con algoritmos que agrupan
  todos los puntos, como K-medias.

## Cómo interpretarla

| Valor | Interpretación |
|-------|----------------|
| 0 | Todos los puntos de cada grupo coinciden con su centroide |
| Pequeño | Los grupos son compactos: sus puntos están cerca de su centro |
| Grande | Los grupos son dispersos: sus puntos están lejos de su centro |

- **Sus unidades dependen de la escala de las variables**. Calcúlela siempre sobre los datos
  escalados (vea [escalar variables](escalar-variables.md)); de lo contrario, las variables con
  valores grandes dominan el resultado.
- **No tiene un umbral universal**: un valor de 0,4 puede ser bueno en unos datos y malo en
  otros. Úsela para comparar resultados sobre los **mismos datos escalados**.
- **Solo mide compacidad**, no separación: no dice si los grupos están lejos unos de otros. Para
  eso use el [coeficiente de silueta](silueta.md) o el
  [índice de Davies-Bouldin](davies-bouldin.md).
- **Favorece grupos redondeados**: como mide distancias al centroide, castiga a los grupos
  alargados o con formas irregulares, que DBSCAN o HDBSCAN pueden encontrar correctamente.

!!! warning "La inercia siempre baja al agregar grupos"
    Con más grupos, cada punto queda más cerca de algún centroide, así que la inercia casi siempre
    disminuye. Con tantos grupos como puntos, la inercia es 0. Por eso **no puede elegir el número
    de grupos buscando la inercia más baja**: siempre ganaría el mayor número de grupos. Lo que
    se busca es el punto donde deja de bajar con fuerza, con el
    [método del codo](metodo-codo.md).

## Puntos de ruido

DBSCAN y HDBSCAN marcan con la etiqueta −1 los puntos de [ruido](../glosario.md#ruido), que no
pertenecen a ningún grupo. Esos puntos **se excluyen** del cálculo: no tienen un centroide al
cual medir la distancia. Tenga en cuenta que un resultado con mucho ruido puede tener una inercia
media muy baja simplemente porque dejó fuera los puntos más difíciles; reporte siempre cuántos
puntos quedaron como ruido.

## El atributo `inertia_` de cada algoritmo

Algunos modelos entregan la inercia directamente, pero no todos la calculan igual:

- `KMeans` tiene el atributo `inertia_`, que es exactamente la inercia de la fórmula anterior.
- `KMedoids` también tiene `inertia_`, pero es la suma de las distancias (**sin elevar al
  cuadrado**) de cada punto a su medoide, no a la media del grupo. No es comparable con la de
  `KMeans`.
- DBSCAN, HDBSCAN, MeanShift y el agrupamiento aglomerativo no tienen `inertia_`.

En `KMeans`, dividir `inertia_` entre el número de registros da exactamente la inercia media.
Para comparar algoritmos, calcule la inercia media de todos con la misma función, a partir de
sus etiquetas, como se muestra al final de esta página.

## Cómo usarla para elegir

1. Calcule la inercia media para varios números de grupos o varios valores de los
   [hiperparámetros](../glosario.md#hiperparametro).
2. Grafíquela y busque el codo (vea [método del codo](metodo-codo.md)).
3. Confirme la elección con el [coeficiente de silueta](silueta.md) y el
   [índice de Davies-Bouldin](davies-bouldin.md), que sí miden la separación entre grupos.

## Código: calcularla para cualquier algoritmo

```python
import numpy as np

def calcular_inercia_media(X_esc, etiquetas):
    X_esc = np.asarray(X_esc)
    etiquetas = np.asarray(etiquetas)
    mascara = etiquetas != -1
    X_grupos = X_esc[mascara]
    etiquetas_grupos = etiquetas[mascara]

    inercia = 0.0
    for grupo in np.unique(etiquetas_grupos):
        puntos = X_grupos[etiquetas_grupos == grupo]
        centroide = puntos.mean(axis=0)
        inercia += ((puntos - centroide) ** 2).sum()

    return inercia / len(X_grupos)

inercia_media = calcular_inercia_media(X_esc, etiquetas)
print(f"Inercia media: {inercia_media:.3f}")
```

- `X_esc` son los datos ya escalados, una fila por registro.
- `etiquetas` es el grupo asignado a cada registro, por ejemplo `modelo.labels_` o el resultado
  de `modelo.fit_predict(X_esc)`.
- `mascara` vale `True` para los puntos que no son ruido; `X_grupos` y `etiquetas_grupos`
  contienen solo esos puntos.
- El ciclo recorre cada grupo, calcula su `centroide` como la media de sus puntos y suma las
  distancias al cuadrado de esos puntos al centroide.
- La función devuelve la inercia dividida entre el número de puntos agrupados.
