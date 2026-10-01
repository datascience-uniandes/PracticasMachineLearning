# Escalar con RobustScaler

`RobustScaler` es una forma de [escalar variables](escalar-variables.md) que usa la **mediana** y
el **rango intercuartílico** (IQR) en lugar de la media y la desviación estándar:

\[
x_{\text{esc}} = \frac{x - \text{mediana}}{\text{IQR}}, \qquad \text{IQR} = Q_3 - Q_1
\]

donde \( Q_1 \) y \( Q_3 \) son los percentiles 25 y 75 de la variable. Tras escalar, la variable
tiene mediana 0 y rango intercuartílico 1. Como en la [estandarización](estandarizar.md), la forma
de la [distribución](../glosario.md#distribucion) no cambia.

## Por qué resiste los valores atípicos

La media y la desviación estándar se calculan con todos los valores, así que unos pocos
[valores atípicos](../glosario.md#outlier) las desplazan y las inflan. La mediana y los cuartiles
dependen solo del orden de los datos: un valor extremo cuenta igual que cualquier otro valor por
encima de \( Q_3 \), sin importar qué tan lejos esté. Por eso:

- El centro y la escala que aprende `RobustScaler` describen a la mayoría de los datos, no a los
  extremos.
- Los valores típicos quedan en un rango razonable, y los atípicos siguen apareciendo como
  valores grandes (en valor absoluto) después de escalar.

`RobustScaler` **no elimina** los atípicos; solo evita que distorsionen la escala del resto. Para
tratarlos, vea [valores atípicos](valores-atipicos.md).

## Escalar con `RobustScaler`

```python
import pandas as pd
from sklearn.preprocessing import RobustScaler

escalador = RobustScaler()
X_train_esc = pd.DataFrame(escalador.fit_transform(X_train),
                           columns=X_train.columns, index=X_train.index)
X_test_esc = pd.DataFrame(escalador.transform(X_test),
                          columns=X_test.columns, index=X_test.index)
```

- `X_train` y `X_test` son las variables del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) y del
  [conjunto de prueba](../glosario.md#conjunto-prueba).
- `fit_transform` **aprende** la mediana y el IQR de cada columna de `X_train` y los aplica.
- `transform` aplica a `X_test` **las mismas** medianas e IQR aprendidos con `X_train`; no calcula
  unos nuevos.
- `RobustScaler` devuelve un arreglo de NumPy; el `DataFrame` recupera los nombres de las columnas
  y el índice.
- `escalador.center_` y `escalador.scale_` guardan la mediana y el IQR aprendidos.

!!! warning "Ajuste el escalador solo con el entrenamiento"
    Si usa `fit` o `fit_transform` con todos los datos (o con `X_test`), la mediana y el IQR
    incluyen información del conjunto de prueba. Esa **fuga de información** hace que las métricas
    en prueba sean más optimistas de lo que serán con datos nuevos.

## Parámetros

```python
RobustScaler(quantile_range=(25.0, 75.0), with_centering=True, with_scaling=True)
```

- `quantile_range` son los percentiles que definen la escala. Con el valor por defecto
  `(25.0, 75.0)` se usa el IQR. Un rango más amplio, como `(10.0, 90.0)`, usa más datos pero es
  algo más sensible a los atípicos.
- `with_centering`: si es `True`, resta la mediana. Con `False` no centra la variable.
- `with_scaling`: si es `True`, divide entre el rango de percentiles. Con `False` solo centra.

## Cuándo preferirlo sobre `StandardScaler`

- Cuando las variables tienen **valores atípicos** que no quiere o no puede eliminar (por ejemplo,
  porque son datos válidos).
- Cuando la distribución es muy **asimétrica**, con una cola larga que infla la desviación
  estándar.

Si las variables no tienen atípicos marcados, `StandardScaler` y `RobustScaler` dan resultados
parecidos y `StandardScaler` es la opción habitual. La tabla de
[escalar variables](escalar-variables.md#comparacion-de-escaladores) compara ambos con
`MinMaxScaler`.
