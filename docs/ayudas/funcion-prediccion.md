# Función de predicción para interpretar

Las técnicas de [interpretabilidad](../glosario.md#interpretabilidad) (gráficos ICE, LIME y
SHAP) cambian los valores de las variables y observan cómo cambia la predicción. Para que la
explicación tenga sentido, esas variables deben ser las **originales**, las que una persona
entiende (el área de una casa, la edad de un cliente), y no las columnas transformadas que
recibe el modelo.

## Por qué hace falta

Un modelo entrenado sin _pipelines_ recibe las columnas ya transformadas:

- La [regresión polinomial](regresion-polinomial.md) recibe los términos del polinomio
  (por ejemplo, `AreaHabitable^2` o `AreaHabitable Calificación`) ya escalados. Cambiar solo el
  cuadrado del área, sin cambiar el área, produce una casa imposible.
- Un clasificador entrenado con datos [escalados](escalar-variables.md) recibe valores en
  desviaciones estándar, no en años o en euros.

La **función de predicción** recibe las variables originales, aplica las mismas
transformaciones del entrenamiento, en el mismo orden, y devuelve la predicción. Para las
técnicas de interpretabilidad, la función es «el modelo».

## Reglas

- **Use los objetos ya ajustados.** Dentro de la función solo se llama a `transform` y a
  `predict`, nunca a `fit`: las transformaciones deben ser exactamente las aprendidas con el
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento).
- **Respete las columnas y su orden.** Use las mismas listas de columnas del entrenamiento.
- **Acepte arreglos de NumPy.** LIME y SHAP llaman a la función con arreglos sin nombres de
  columnas; la primera línea los convierte en un `DataFrame`.
- **En clasificación, devuelva la probabilidad de la clase positiva**, que es lo que se
  interpreta (por ejemplo, la probabilidad de abandono).
- **Compruebe la función:** sus predicciones sobre el conjunto de prueba deben ser idénticas a
  las del modelo con los datos transformados.

## Código

Regresión polinomial (polinomio sobre las variables continuas, columnas one-hot sin cambios y
escalado):

```python
import pandas as pd

columnas_modelo = columnas_continuas + columnas_onehot

def predecir_precio(X):
    X = pd.DataFrame(X, columns=columnas_modelo)
    X_poly = polinomio.transform(X[columnas_continuas])
    X_poly = pd.concat([pd.DataFrame(X_poly, columns=nombres_poly, index=X.index),
                        X[columnas_onehot]], axis=1)
    return modelo.predict(escalador.transform(X_poly))
```

Clasificación con datos escalados:

```python
def predecir_abandono(X):
    X = pd.DataFrame(X, columns=columnas_modelo_clas)
    return modelo_clas.predict_proba(escalador_clas.transform(X))[:, 1]
```

- `polinomio`, `nombres_poly`, `escalador` y `modelo` son los objetos y nombres de columnas del
  entrenamiento de la regresión polinomial.
- `columnas_continuas` y `columnas_onehot` son las listas de columnas usadas al entrenar;
  `columnas_modelo_clas`, las columnas del clasificador, en su orden.
- `escalador_clas` y `modelo_clas` son el escalador y el clasificador ya entrenados.
- `[:, 1]` toma la probabilidad de la clase positiva.
