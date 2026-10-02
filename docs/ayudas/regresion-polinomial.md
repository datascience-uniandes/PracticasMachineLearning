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

polinomio = PolynomialFeatures(degree=2, include_bias=False)
X_poly = polinomio.fit_transform(X)

print(polinomio.get_feature_names_out())
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

```python
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

columnas_continuas = ["columna1", "columna2", "columna3"]
columnas_onehot = ["categoria_B", "categoria_C"]

polinomio = PolynomialFeatures(degree=2, include_bias=False)
X_poly_train = polinomio.fit_transform(X_train[columnas_continuas])
X_poly_test = polinomio.transform(X_test[columnas_continuas])

nombres_poly = polinomio.get_feature_names_out()
X_poly_train = pd.concat([pd.DataFrame(X_poly_train, columns=nombres_poly, index=X_train.index),
                          X_train[columnas_onehot]], axis=1)
X_poly_test = pd.concat([pd.DataFrame(X_poly_test, columns=nombres_poly, index=X_test.index),
                         X_test[columnas_onehot]], axis=1)
```

- `columnas_continuas` es la lista de columnas a las que se aplica el polinomio y
  `columnas_onehot`, la de las columnas one-hot, que se conservan sin cambios.
- `fit_transform` se usa solo con `X_train`; en `X_test` se usa `transform`, para que la
  transformación se aprenda únicamente con los datos de entrenamiento.
- `nombres_poly` son los nombres de las columnas generadas, que se usan como encabezados del
  `DataFrame`.
- `index=...` conserva el índice original para que `pd.concat(..., axis=1)` una bien las filas.
- El resultado, `X_poly_train` y `X_poly_test`, tiene los términos polinomiales seguidos de las
  columnas one-hot.

Después, estandarice y entrene el modelo:

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_poly_train)
X_test_esc = escalador.transform(X_poly_test)

modelo = LinearRegression()
modelo.fit(X_train_esc, y_train)
y_pred = modelo.predict(X_test_esc)
```

- `escalador` estandariza cada columna (media 0, desviación estándar 1) con la media y la
  desviación de `X_poly_train`; a `X_poly_test` se le aplican esos mismos valores con
  `transform`.
- `X_train_esc` y `X_test_esc` son arreglos sin nombres de columnas. Para ver cada coeficiente
  con su nombre, use `pd.Series(modelo.coef_, index=X_poly_train.columns)` (vea
  [ver los coeficientes](ver-coeficientes.md)).

!!! tip "Estandarice antes de usar grados altos"
    Si una variable toma valores cercanos a 800, su potencia 5 supera \( 10^{14} \), mientras que
    otra columna puede estar entre 0 y 1. Esas diferencias de escala vuelven inestables los
    cálculos. Estandarizar las columnas con `StandardScaler`, como en el código anterior,
    las deja en rangos comparables. Para grado 2 o 3 no siempre es necesario, pero no hace daño.

## Revisar la linealidad de los nuevos términos

Para revisar si cada término nuevo tiene una relación lineal con la variable objetivo, vea
[revisar la linealidad de los términos polinomiales](linealidad-terminos.md).
