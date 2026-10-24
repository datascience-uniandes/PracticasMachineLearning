# Gráfico ICE

Un gráfico ICE (_Individual Conditional Expectation_, expectativa condicional individual)
muestra cómo cambia la predicción de un modelo cuando se varía **una sola variable** y se dejan
fijas todas las demás. Dibuja una curva por registro, por eso es una
[explicación](../glosario.md#explicacion-local) de cada predicción que, vista en conjunto,
también describe el comportamiento global del modelo.

## Cómo se construye

1. Elija una variable y una **rejilla** de valores que cubra su rango habitual, por ejemplo,
   entre los percentiles 2 y 98.
2. Para cada registro de una muestra, reemplace el valor de la variable por cada valor de la
   rejilla, sin tocar las demás variables, y calcule la predicción con la
   [función de predicción](funcion-prediccion.md).
3. Una los puntos de cada registro: cada línea es la curva ICE de ese registro.

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
  por eso la rejilla se limita a los percentiles 2 y 98.
- **No muestra causalidad:** describe cómo reacciona **el modelo**, no qué pasaría en la
  realidad si se cambiara la variable.

## Código

```python
import numpy as np
import matplotlib.pyplot as plt

X_muestra = X_test.sample(200, random_state=42)
rejilla = np.linspace(X_muestra[columna].quantile(0.02), X_muestra[columna].quantile(0.98), 30)
curvas = np.array([predecir(X_muestra.assign(**{columna: valor})) for valor in rejilla]).T

plt.plot(rejilla, curvas.T, color="steelblue", alpha=0.2)
plt.xlabel(columna)
plt.ylabel("Predicción")
plt.show()

curvas_centradas = curvas - curvas[:, [0]]
plt.plot(rejilla, curvas_centradas.T, color="steelblue", alpha=0.2)
plt.ylabel("Cambio en la predicción")
plt.show()
```

- `predecir` es la [función de predicción](funcion-prediccion.md) del modelo y `columna`, el
  nombre de la variable que se varía.
- `X_muestra.assign(**{columna: valor})` copia la muestra con la variable fijada en `valor`.
- `curvas` tiene una fila por registro y una columna por valor de la rejilla.
- `curvas[:, [0]]` es la predicción de cada registro en el primer valor de la rejilla.
- Para una variable discreta, use como rejilla sus valores posibles, por ejemplo,
  `rejilla = np.array([1, 2, 3, 4])`.
- Para colorear por subgrupo, grafique por separado `curvas[grupo]` y `curvas[~grupo]` con
  colores distintos, donde `grupo` es una máscara booleana, por ejemplo,
  `grupo = X_muestra["variable_binaria"].to_numpy() == 1`.
