# Regresión polinomial

La [regresión polinomial](../glosario.md#regresion-polinomial) amplía la
[regresión lineal](regresion-lineal.md) para capturar relaciones curvas. En lugar de usar solo
las variables originales, agrega nuevas columnas con sus potencias y sus productos, y sobre
ellas ajusta un modelo lineal común. Con dos variables y grado 2, el modelo queda:

\[
\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1^2 + \beta_4 x_1 x_2 + \beta_5 x_2^2
\]

\( x_1^2 \) y \( x_2^2 \) son los **términos al cuadrado** (permiten que la relación se curve) y
\( x_1 x_2 \) es un [término de interacción](../glosario.md#termino-interaccion) (permite que el
efecto de \( x_1 \) dependa del valor de \( x_2 \)). El modelo sigue siendo lineal en los
[coeficientes](../glosario.md#coeficiente) \( \beta \): por eso se entrena con
`LinearRegression`.

## Generar los términos polinomiales

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)

print(poly.get_feature_names_out())
```

- `degree=2` es el grado máximo de los términos: con grado 3 también aparecen \( x_1^3 \),
  \( x_1^2 x_2 \), etc.
- `include_bias=False` evita crear una columna de unos; `LinearRegression` ya calcula el
  intercepto.
- `fit_transform` devuelve un arreglo con las columnas originales seguidas de los nuevos
  términos.
- `get_feature_names_out()` devuelve el nombre de cada columna generada, por ejemplo
  `'columna1^2'` o `'columna1 columna2'` (el producto de dos columnas).

Si solo le interesan los productos entre variables y no las potencias, use
`PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)`.

!!! warning "El número de términos crece muy rápido"
    Con \( p \) variables y grado \( d \) se generan
    \( \binom{p+d}{d} - 1 \) columnas. Con 4 variables: 14 en grado 2, 34 en grado 3, 69 en
    grado 4 y 125 en grado 5. Con muchas columnas y pocos registros el modelo memoriza los datos
    de entrenamiento ([sobreajuste](../glosario.md#sobreajuste)).

## Aplicar el polinomio solo a las variables continuas

Las columnas de la [codificación one-hot](one-hot.md) valen 0 o 1: su cuadrado es igual a la
misma columna y sus productos multiplican el número de términos sin aportar mucho. Por eso se
aplica el polinomio solo a las [variables continuas](../glosario.md#variable-continua) y luego
se agregan las columnas one-hot sin transformar.

**Opción 1: a mano con `pd.concat`**

```python
import pandas as pd

continuas = ["columna1", "columna2", "columna3"]
poly = PolynomialFeatures(degree=2, include_bias=False)

X_train_poly = pd.DataFrame(poly.fit_transform(X_train[continuas]),
                            columns=poly.get_feature_names_out(), index=X_train.index)
X_test_poly = pd.DataFrame(poly.transform(X_test[continuas]),
                           columns=poly.get_feature_names_out(), index=X_test.index)

X_train_poly = pd.concat([X_train_poly, X_train.drop(columns=continuas)], axis=1)
X_test_poly = pd.concat([X_test_poly, X_test.drop(columns=continuas)], axis=1)
```

- `continuas` es la lista de columnas a las que se aplica el polinomio.
- `fit_transform` se usa solo con `X_train`; en `X_test` se usa `transform`, para que la
  transformación se aprenda únicamente con los datos de entrenamiento.
- `index=...` conserva el índice original para que `pd.concat(..., axis=1)` una bien las filas.
- `X_train.drop(columns=continuas)` son las columnas restantes (las one-hot), que se pegan al
  lado sin cambios.

**Opción 2: con `ColumnTransformer` y `make_pipeline`**

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression

transformador = ColumnTransformer(
    [("poly", make_pipeline(StandardScaler(),
                            PolynomialFeatures(degree=2, include_bias=False)), continuas)],
    remainder="passthrough",
)
modelo = make_pipeline(transformador, LinearRegression())
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)
```

- `ColumnTransformer` aplica la transformación `"poly"` solo a las columnas de `continuas`.
- `remainder="passthrough"` deja pasar las demás columnas (las one-hot) sin cambios.
- `make_pipeline` encadena los pasos: al llamar `fit` o `predict`, los datos pasan por cada
  paso en orden, y el escalado y el polinomio se ajustan solo con `X_train`.
- `StandardScaler` estandariza cada variable (media 0, desviación estándar 1) antes de elevarla.

!!! tip "Estandarice antes de usar grados altos"
    Si una variable toma valores cercanos a 800, su potencia 5 supera \( 10^{14} \), mientras que
    otra columna puede estar entre 0 y 1. Esas diferencias de escala vuelven inestables los
    cálculos. `StandardScaler` antes de `PolynomialFeatures` mantiene los términos en rangos
    comparables. Para grado 2 o 3 no siempre es necesario, pero no hace daño.

## Revisar la linealidad de los nuevos términos

Para revisar si cada término nuevo tiene una relación lineal con la variable objetivo, vea
[revisar la linealidad de los términos polinomiales](linealidad-terminos.md).
