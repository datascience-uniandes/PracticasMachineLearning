# K-medoides (K-medoids)

[K-medoides](../glosario.md#k-medoides) es un método de [agrupación](../glosario.md#agrupacion)
que divide los registros en \( K \) grupos y representa cada grupo con un
[medoide](../glosario.md#medoide): el registro **real** del grupo que está, en conjunto, más
cerca de todos los demás registros del grupo. A diferencia del
[centroide](../glosario.md#centroide) de K-medias, el medoide no es un promedio sino una fila
concreta del conjunto de datos, por ejemplo un cliente que existe.

Comparado con las otras variantes: [K-medias](k-medias.md) usa la media de cada variable y
[K-medianas](k-medianas.md) la mediana; en ambos casos el centro puede no coincidir con ningún
registro.

## Qué optimiza

K-medoides busca los \( K \) medoides que minimizan la suma de las distancias de cada registro al
medoide de su grupo:

\[
\sum_{k=1}^{K} \sum_{x \in C_k} d(x, m_k)
\]

- \( C_k \) es el conjunto de registros del grupo \( k \) y \( m_k \) su medoide.
- \( d(x, m_k) \) es la distancia entre el registro \( x \) y el medoide. Las distancias **no se
  elevan al cuadrado**, a diferencia de la [inercia](../glosario.md#inercia) de K-medias.

## Cómo funciona: PAM y FasterPAM

El algoritmo clásico se llama **PAM** (*Partitioning Around Medoids*):

1. **Inicializar.** Elige \( K \) registros como medoides iniciales.
2. **Asignar.** Asigna cada registro al grupo del medoide más cercano.
3. **Intercambiar.** Prueba a cambiar un medoide por otro registro que no lo es. Si el cambio
   reduce la suma de distancias, lo acepta.
4. **Repetir.** Vuelve al paso 2 hasta que ningún intercambio mejora el resultado.

**FasterPAM** es una versión moderna de PAM que llega a resultados de la misma calidad mucho más
rápido. Es la que se usa en esta página.

## Ventajas

- **Cualquier distancia.** Como solo necesita comparar distancias entre registros, puede usar la
  euclidiana, la manhattan u otras, incluso distancias pensadas para variables categóricas.
- **Robusto a los valores atípicos.** El medoide tiene que ser un registro del grupo y las
  distancias no se elevan al cuadrado, así que unos pocos
  [valores atípicos](../glosario.md#outlier) casi no lo mueven.
- **Fácil de interpretar.** Cada grupo tiene un "registro representativo" real que se puede
  describir tal cual, en las unidades originales.

!!! warning "Costo con muchos registros"
    K-medoides necesita las distancias entre **todos los pares** de registros. Con \( n \)
    registros son \( n^2 \) distancias: con 2.000 registros son 4 millones (unos 32 MB), pero con
    50.000 son 2.500 millones (unos 20 GB). El tiempo de cálculo crece de la misma forma. Con
    decenas de miles de registros o más, use [K-medias](k-medias.md) o aplique K-medoides a una
    muestra.

## Escalado

Con la distancia euclidiana o la manhattan, la variable con valores más grandes domina la
distancia. [Escale las variables](escalar-variables.md) antes de agrupar, por ejemplo
[estandarizando](estandarizar.md) (vea [estandarización](../glosario.md#estandarizacion)) con
`StandardScaler`, o con [`RobustScaler`](robust-scaler.md) si hay valores atípicos marcados.

## Biblioteca: kmedoids

scikit-learn no incluye K-medoides. Esta página usa la biblioteca `kmedoids`, que implementa
FasterPAM y se instala con:

```bash
pip install kmedoids
```

!!! warning "Indique `metric`"
    Si no indica `metric`, la biblioteca supone que usted le entrega una **matriz de distancias
    ya calculada** en lugar de los datos. Para pasarle directamente las variables escaladas,
    escriba `metric="euclidean"` (o `metric="manhattan"`).

## Cómo elegir K

\( K \) es un [hiperparámetro](../glosario.md#hiperparametro). Pruebe varios valores y
compárelos con el [método del codo](metodo-codo.md) (usando la suma de distancias en lugar de la
inercia) y con el [coeficiente de silueta](silueta.md). Una vez elegido \( K \),
[interprete los grupos](interpretar-grupos.md) a partir de sus medoides y de los valores de las
variables en cada grupo.

## Código: entrenar el modelo

```python
import pandas as pd
import kmedoids
from sklearn.preprocessing import StandardScaler

escalador = StandardScaler()
X_esc = escalador.fit_transform(X)

modelo = kmedoids.KMedoids(n_clusters=k, metric="euclidean", method="fasterpam", random_state=42)
etiquetas = modelo.fit_predict(X_esc)

print(pd.Series(etiquetas).value_counts().sort_index())
print("Suma de distancias:", modelo.inertia_)
```

- `X` es un DataFrame con las variables numéricas que quiere usar para agrupar, y `X_esc` el
  arreglo con esas variables estandarizadas.
- `k` es el número de grupos.
- `metric="euclidean"` indica que la biblioteca calcule las distancias euclidianas a partir de
  `X_esc`.
- `method="fasterpam"` elige el algoritmo FasterPAM.
- `etiquetas` es un arreglo con el número de grupo (de 0 a `k - 1`) de cada registro, en el mismo
  orden que las filas de `X`.
- `modelo.inertia_` es la suma de las distancias (**sin elevar al cuadrado**) de cada registro a
  su medoide, en unidades escaladas. No es comparable con la inercia de K-medias.

## Código: ver los medoides

```python
medoides = X.iloc[modelo.medoid_indices_]
print(medoides)
```

- `modelo.medoid_indices_` son las posiciones de fila de los medoides, uno por grupo, en el orden
  de los grupos 0, 1, 2…
- Como los medoides son registros reales, basta con buscarlos en `X` con `iloc` para verlos en
  sus **unidades originales**; no hace falta deshacer el escalado.
- `medoides` muestra el registro representativo de cada grupo, por ejemplo el cliente más típico
  de cada segmento.

## Código: probar varios valores de K

```python
valores_k = range(2, 11)
sumas = []
for k in valores_k:
    modelo = kmedoids.KMedoids(n_clusters=k, metric="euclidean", method="fasterpam", random_state=42)
    modelo.fit(X_esc)
    sumas.append(modelo.inertia_)

print(pd.DataFrame({"k": valores_k, "suma_distancias": sumas}))
```

- `sumas` guarda la suma de distancias de cada valor de \( K \). Grafíquela contra `k` para
  aplicar el [método del codo](metodo-codo.md).
- Al terminar, vuelva a entrenar el modelo con el valor de \( K \) elegido.
