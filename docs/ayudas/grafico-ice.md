# Gráfico ICE

Un gráfico ICE (_Individual Conditional Expectation_, expectativa condicional individual)
muestra cómo cambia la predicción de un modelo cuando se varía **una sola variable** y se dejan
fijas todas las demás. Dibuja una curva por registro, por eso es una
[explicación](../glosario.md#explicacion-local) de cada predicción que, vista en conjunto,
también describe el comportamiento global del modelo.

## Cómo se construye

1. Elija una variable y una **rejilla** de valores que cubra su rango habitual (por defecto,
   scikit-learn usa los percentiles 5 y 95, o todos los valores distintos si son pocos).
2. Para cada registro de una muestra, reemplace el valor de la variable por cada valor de la
   rejilla, sin tocar las demás variables, y calcule la predicción con la
   [función de predicción](funcion-prediccion.md).
3. Una los puntos de cada registro: cada línea es la curva ICE de ese registro.

scikit-learn hace estos pasos con `PartialDependenceDisplay` y la opción `kind="individual"`.
Esa clase necesita un **estimador** de scikit-learn que reciba las variables originales. Si el
modelo se entrenó sin _pipeline_, envuelva la función de predicción en un estimador mínimo (vea
el código); si construyó un _pipeline_, páselo directamente.

## Cómo leerlo

- **Forma de la curva:** una recta indica un efecto lineal; una curva, que el efecto cambia a lo
  largo del rango (se acelera, se aplana o cambia de dirección).
- **Pendiente:** cuánto cambia la predicción por cada unidad de la variable. Una curva plana
  indica que la variable casi no influye en ese registro.
- **Curvas paralelas:** todos los registros responden igual a la variable; su efecto no depende
  de las demás.
- **Curvas que se cruzan o con formas distintas:** el efecto de la variable depende de otras
  variables, es decir, hay **interacciones**.

## ICE centrado

Las curvas empiezan a alturas distintas porque cada registro tiene una predicción distinta, y
eso dificulta comparar sus formas. El **ICE centrado** resta a cada curva su primer valor, de modo
que todas parten de 0 y muestran solo **cuánto cambia** la predicción. Si las curvas centradas
se abren en abanico, el efecto de la variable no es el mismo para todos los registros.

## Colorear por subgrupo

Para encontrar qué variable explica la diferencia entre curvas, coloréelas según otra variable,
por ejemplo, una variable binaria. Si las curvas de cada color tienen formas distintas, las dos
variables interactúan.

## Limitaciones

- **Combinaciones irreales:** al cambiar una variable sin cambiar las que están
  [correlacionadas](../glosario.md#correlacion) con ella, el modelo predice casos que no existen
  (una casa enorme en un lote diminuto). Las conclusiones sobre esas zonas son poco confiables.
- **Fuera del rango de entrenamiento:** el modelo extrapola y la curva puede no tener sentido;
  por eso la rejilla se limita a los percentiles 5 y 95.
- **No muestra causalidad:** describe cómo reacciona **el modelo**, no qué pasaría en la
  realidad si se cambiara la variable.

## Código

Estimadores que envuelven las [funciones de predicción](funcion-prediccion.md):

```python
import numpy as np
from sklearn.base import BaseEstimator, RegressorMixin, ClassifierMixin

class RegresorDesdeFuncion(RegressorMixin, BaseEstimator):
    def __init__(self, funcion=None):
        self.funcion = funcion
    def fit(self, X, y=None):
        self.ajustado_ = True
        return self
    def predict(self, X):
        return self.funcion(X)

class ClasificadorDesdeFuncion(ClassifierMixin, BaseEstimator):
    def __init__(self, funcion=None):
        self.funcion = funcion
    def fit(self, X, y=None):
        self.classes_ = np.array([0, 1])
        return self
    def predict_proba(self, X):
        p = self.funcion(X)
        return np.column_stack([1 - p, p])
    def predict(self, X):
        return (self.funcion(X) >= 0.5).astype(int)

regresor = RegresorDesdeFuncion(predecir_precio).fit(X_train)
clasificador = ClasificadorDesdeFuncion(predecir_abandono).fit(X_train_clas)
```

- `predecir_precio` y `predecir_abandono` son las funciones de predicción; `X_train` y
  `X_train_clas`, las variables originales de entrenamiento de cada modelo.
- `fit` no vuelve a entrenar nada: el modelo ya está entrenado dentro de la función. Solo marca
  el estimador como listo para usarse.
- `predict_proba` devuelve la probabilidad de las dos clases; el gráfico usa la de la clase 1.

Gráficos ICE y su versión centrada:

```python
import matplotlib.pyplot as plt
from sklearn.inspection import PartialDependenceDisplay

X_muestra = X_test.sample(200, random_state=42).astype(float)

PartialDependenceDisplay.from_estimator(estimador, X_muestra, ["columna1", "columna2"],
                                        kind="individual")
plt.show()

PartialDependenceDisplay.from_estimator(estimador, X_muestra, ["columna1"],
                                        kind="individual", centered=True)
plt.show()
```

- `estimador` es `regresor`, `clasificador` o un _pipeline_ ya entrenado.
- `.astype(float)` evita una advertencia de scikit-learn con columnas de números enteros.
- La lista de columnas genera un gráfico por variable; para una variable discreta con pocos
  valores, la rejilla son sus valores posibles.
- `kind="individual"` dibuja solo las curvas ICE; `centered=True` las centra en su primer valor.

Colorear las curvas por subgrupo:

```python
import numpy as np
from matplotlib.lines import Line2D

columna = "columna1"
grupo = X_muestra["variable_binaria"] == 1
rejilla = {X_muestra.columns.get_loc(columna):
           np.linspace(X_muestra[columna].quantile(0.05), X_muestra[columna].quantile(0.95), 30)}

display = PartialDependenceDisplay.from_estimator(
    estimador, X_muestra[grupo], [columna], kind="individual", custom_values=rejilla,
    ice_lines_kw={"color": "tab:blue", "alpha": 0.3})
PartialDependenceDisplay.from_estimator(
    estimador, X_muestra[~grupo], [columna], kind="individual", custom_values=rejilla,
    ax=display.axes_, ice_lines_kw={"color": "tab:red", "alpha": 0.3})
display.axes_[0, 0].legend(handles=[Line2D([], [], color="tab:blue", label="Grupo 1"),
                                    Line2D([], [], color="tab:red", label="Grupo 0")])
plt.show()
```

- `grupo` separa la muestra en dos subgrupos según `variable_binaria`.
- `rejilla` fija **la misma rejilla** para los dos subgrupos; sin ella, cada uno calcularía la
  suya con sus propios valores. La clave es la **posición** de la columna
  (`columns.get_loc`), no su nombre.
- La segunda llamada dibuja sobre los ejes de la primera (`ax=display.axes_`).
- `ice_lines_kw` define el color y la transparencia de las curvas de cada subgrupo, y la
  leyenda se arma con `Line2D`.
