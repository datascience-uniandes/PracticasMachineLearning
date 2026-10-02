# K-medias (K-means)

[K-medias](../glosario.md#k-medias) es un método de [agrupación](../glosario.md#agrupacion)
que divide los registros en \( K \) grupos. Cada grupo se resume con un
[centroide](../glosario.md#centroide), el promedio de los registros del grupo, y cada registro
queda en el grupo cuyo centroide está más cerca. No usa una variable objetivo: los grupos salen
solo de las variables que usted le entrega.

Es el método de agrupación más usado por ser rápido y sencillo. Dos variantes cambian la forma de
resumir cada grupo: [K-medianas](k-medianas.md) usa la mediana de cada variable y
[K-medoides](k-medoides.md) usa un registro real del conjunto de datos.

## Cómo funciona

El algoritmo más común es el de Lloyd:

1. **Inicializar.** Elige \( K \) centroides iniciales.
2. **Asignar.** Calcula la distancia euclidiana de cada registro a cada centroide y asigna el
   registro al grupo del centroide más cercano.
3. **Actualizar.** Recalcula cada centroide como la **media** de los registros asignados a su
   grupo, variable por variable.
4. **Repetir.** Vuelve al paso 2 hasta que las asignaciones dejan de cambiar (o los centroides
   casi no se mueven).

## Qué optimiza: la inercia

Cada repetición reduce la [inercia](../glosario.md#inercia), la suma de las distancias al
cuadrado entre cada registro y el centroide de su grupo:

\[
\text{Inercia} = \sum_{k=1}^{K} \sum_{x \in C_k} \lVert x - \mu_k \rVert^2
\]

- \( C_k \) es el conjunto de registros del grupo \( k \).
- \( \mu_k \) es el centroide del grupo \( k \).
- \( \lVert x - \mu_k \rVert^2 \) es la distancia euclidiana al cuadrado entre el registro
  \( x \) y su centroide.

Una inercia baja indica grupos compactos. La inercia **siempre baja** al aumentar \( K \) (con un
grupo por registro sería 0), así que no sirve por sí sola para elegir \( K \); vea
[inercia](inercia.md) y [Cómo elegir K](#como-elegir-k).

## Inicialización: k-means++ y `n_init`

El resultado depende de los centroides iniciales: el algoritmo llega a un mínimo **local** de la
inercia, que no siempre es el mejor posible. scikit-learn reduce este problema de dos formas:

- **k-means++** (`init="k-means++"`, valor por defecto) elige los centroides iniciales
  separados entre sí: el primero al azar y cada uno de los siguientes con mayor probabilidad
  cuanto más lejos esté de los ya elegidos.
- **`n_init`** repite el algoritmo completo varias veces con inicializaciones distintas y se
  queda con la de **menor inercia**. Con `n_init=10` se ejecuta 10 veces.

`random_state` fija la semilla aleatoria para que los resultados se puedan reproducir.

## Escalado

K-medias compara registros por distancia, así que una variable medida en miles domina a otra
medida en unidades solo por sus unidades. [Escale las variables](escalar-variables.md) antes de
agrupar; lo habitual es [estandarizar](estandarizar.md) (vea
[estandarización](../glosario.md#estandarizacion)) con `StandardScaler`. Si hay
[valores atípicos](../glosario.md#outlier) marcados, considere
[`RobustScaler`](robust-scaler.md).

En agrupación no hay conjunto de prueba: el escalador se ajusta con todos los registros que va a
agrupar.

## Supuestos y limitaciones

- **Sensible a los valores atípicos.** La media se deja arrastrar por los valores extremos, y la
  distancia al cuadrado amplifica su efecto: unos pocos atípicos pueden mover un centroide o
  formar un grupo propio. Si es un problema, use [K-medianas](k-medianas.md) o
  [K-medoides](k-medoides.md).
- **Sensible a la escala.** Vea la sección anterior.
- **Grupos más o menos esféricos y de tamaño parecido.** K-medias funciona bien cuando los grupos
  son "bolas" compactas de tamaño y dispersión similares. Con grupos alargados, de formas
  irregulares o de densidades muy distintas, puede partir un grupo natural en dos o mezclar dos
  grupos.
- **Solo variables numéricas.** Codifique las categóricas antes (por ejemplo con
  [one-hot](one-hot.md)) o prefiera métodos pensados para ellas.
- **Hay que elegir \( K \).** \( K \) es un [hiperparámetro](../glosario.md#hiperparametro): el
  algoritmo no lo decide.

## Cómo elegir K

Pruebe varios valores de \( K \) y compárelos con el [método del codo](metodo-codo.md) (inercia
contra \( K \)) y con el [coeficiente de silueta](silueta.md); el
[índice de Davies-Bouldin](davies-bouldin.md) es otra opción. Una vez elegido \( K \), compare
los centroides de los grupos (en las unidades originales de cada variable) y los valores de las
variables en cada grupo para describir qué caracteriza a cada uno.

## Código: entrenar el modelo

```python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

escalador = StandardScaler()
X_esc = escalador.fit_transform(X)

modelo = KMeans(n_clusters=k, n_init=10, random_state=42)
etiquetas = modelo.fit_predict(X_esc)
```

- `X` es un DataFrame con las variables numéricas que quiere usar para agrupar.
- `X_esc` es el arreglo de NumPy con las variables estandarizadas.
- `k` es el número de grupos.
- `fit_predict` ejecuta el algoritmo y devuelve `etiquetas`, un arreglo con el número de grupo
  (de 0 a `k - 1`) de cada registro, en el mismo orden que las filas de `X`.
