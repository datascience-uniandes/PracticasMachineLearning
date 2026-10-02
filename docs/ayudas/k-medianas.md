# K-medianas (K-medians)

[K-medianas](../glosario.md#k-medianas) es un método de
[agrupación](../glosario.md#agrupacion) que divide los registros en \( K \) grupos, igual que
[K-medias](k-medias.md), pero resume cada grupo con la **mediana** de cada variable en lugar de
la media, y mide la cercanía con la distancia **manhattan** en lugar de la euclidiana. El
resultado es un método más robusto a los [valores atípicos](../glosario.md#outlier).

Comparado con las otras variantes: [K-medias](k-medias.md) usa la media y es el más rápido;
[K-medoides](k-medoides.md) usa como centro un registro real del conjunto de datos.

## Cómo funciona

El esquema es el mismo de K-medias:

1. **Inicializar.** Elige \( K \) centros iniciales.
2. **Asignar.** Calcula la distancia manhattan de cada registro a cada centro y asigna el
   registro al grupo del centro más cercano.
3. **Actualizar.** Recalcula cada centro como la **mediana** de los registros de su grupo,
   variable por variable.
4. **Repetir.** Vuelve al paso 2 hasta que los centros casi no se mueven.

La distancia manhattan entre un registro \( x \) y un centro \( m \) es la suma de las
diferencias absolutas en cada una de las \( p \) variables:

\[
d(x, m) = \sum_{j=1}^{p} |x_j - m_j|
\]

El algoritmo busca reducir la suma de esas distancias:

\[
\sum_{k=1}^{K} \sum_{x \in C_k} \sum_{j=1}^{p} |x_j - m_{kj}|
\]

donde \( C_k \) es el conjunto de registros del grupo \( k \) y \( m_{kj} \) es la mediana de la
variable \( j \) en ese grupo. La mediana es justamente el valor que minimiza la suma de
diferencias absolutas, del mismo modo que la media minimiza la suma de diferencias al cuadrado.

El centro de cada grupo no tiene por qué ser un registro real: cada coordenada es la mediana de
una variable, y esas medianas pueden venir de registros distintos.

## Por qué es más robusto que K-medias

- La **mediana** casi no cambia con unos pocos valores extremos; la media sí.
- La distancia manhattan suma diferencias **absolutas**, mientras que K-medias suma diferencias
  **al cuadrado**: un registro muy alejado pesa mucho menos en K-medianas.

A cambio, cada iteración es algo más lenta que en K-medias, y el resultado también depende de los
centros iniciales.

## Escalado

Como todo método basado en distancias, K-medianas queda dominado por la variable con valores más
grandes si no se escalan las variables. [Escale las variables](escalar-variables.md) antes de
agrupar, por ejemplo [estandarizando](estandarizar.md) (vea
[estandarización](../glosario.md#estandarizacion)) con `StandardScaler`. Si usa K-medianas
precisamente porque hay atípicos, [`RobustScaler`](robust-scaler.md) (mediana e IQR) es
coherente con esa elección.

## Biblioteca: pyclustering

scikit-learn no incluye K-medianas. Esta página usa la biblioteca `pyclustering`, que se instala
con:

```bash
pip install pyclustering
```

Tenga en cuenta que:

- `pyclustering` trabaja con **listas de Python**, no con arreglos de NumPy ni DataFrames:
  convierta los datos con `.tolist()`.
- Los centros iniciales se pasan al crear el modelo. Se calculan con la función
  `kmeans_plusplus` de scikit-learn, que aplica la inicialización k-means++ (vea
  [K-medias](k-medias.md#inicializacion-k-means-y-n_init)). El inicializador propio de
  `pyclustering` no funciona con las versiones recientes de NumPy.
- Por defecto, `pyclustering` usa la distancia euclidiana al cuadrado; para usar la distancia
  manhattan hay que indicarlo con `metric`.
- No devuelve etiquetas directamente, sino una lista de grupos, cada uno con los índices de sus
  registros; el código de abajo la convierte en un arreglo de etiquetas.

## Cómo elegir K

\( K \) es un [hiperparámetro](../glosario.md#hiperparametro). Pruebe varios valores y
compárelos con el [método del codo](metodo-codo.md) (usando la suma de distancias en lugar de la
[inercia](../glosario.md#inercia)) y con el [coeficiente de silueta](silueta.md). Una vez
elegido \( K \), compare las medianas de cada grupo para describir qué caracteriza a cada uno.

## Código: entrenar el modelo

```python
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import kmeans_plusplus
from pyclustering.cluster.kmedians import kmedians
from pyclustering.utils.metric import distance_metric, type_metric

escalador = StandardScaler()
X_esc = escalador.fit_transform(X)

centros_iniciales, _ = kmeans_plusplus(X_esc, n_clusters=k, random_state=42)
manhattan = distance_metric(type_metric.MANHATTAN)

modelo = kmedians(X_esc.tolist(), centros_iniciales.tolist(), metric=manhattan)
modelo.process()

etiquetas = np.empty(len(X_esc), dtype=int)
for grupo, indices in enumerate(modelo.get_clusters()):
    etiquetas[indices] = grupo
```

- `X` es un DataFrame con las variables numéricas que quiere usar para agrupar, y `X_esc` el
  arreglo con esas variables estandarizadas.
- `k` es el número de grupos.
- `kmeans_plusplus` devuelve los centros iniciales (y sus índices, que se descartan con `_`).
- `manhattan` indica que las distancias se midan con la distancia manhattan.
- `X_esc.tolist()` y `centros_iniciales.tolist()` convierten los arreglos en listas, el formato
  que espera `pyclustering`.
- `modelo.process()` ejecuta el algoritmo.
- `modelo.get_clusters()` devuelve una lista con un elemento por grupo; cada elemento es la lista
  de índices (posiciones de fila) de los registros del grupo. El ciclo `for` escribe el número de
  grupo en esas posiciones.
- `etiquetas` es un arreglo con el número de grupo (de 0 a `k - 1`) de cada registro, en el mismo
  orden que las filas de `X`.
