# Precisión

La [precisión](../glosario.md#precision) responde a la pregunta: **de los registros que el
modelo predijo como positivos, ¿qué proporción realmente lo era?** Mide qué tan confiables son
las alarmas del modelo.

## Fórmula

\[
\text{Precisión} = \frac{VP}{VP + FP}
\]

VP son los verdaderos positivos y FP los falsos positivos de la
[matriz de confusión](matriz-confusion.md). El denominador es el total de predicciones
positivas, es decir, la columna "predicho positivo" de la matriz.

## Calcularla

```python
from sklearn.metrics import precision_score

y_pred = modelo.predict(X_val)
precision = precision_score(y_val, y_pred)
```

`modelo` es un clasificador ya entrenado, `X_val` y `y_val` son las variables y la clase real
del [conjunto de validación](../glosario.md#conjunto-validacion), y `y_pred` las clases
predichas. Por defecto se calcula para la clase positiva `1`; si la clase positiva tiene otra
etiqueta, indíquela con `pos_label`, por ejemplo `precision_score(y_val, y_pred, pos_label="si")`.

## Cómo interpretarla

- **Rango**: va de 0 a 1. Mayor es mejor. Una precisión de 0,8 significa que 8 de cada 10
  registros señalados como positivos lo son de verdad.
- **Solo mira las predicciones positivas**: no dice nada de los positivos que el modelo dejó
  pasar (FN). Un modelo que predice positivo una sola vez y acierta tiene precisión 1, aunque
  se le escapen casi todos los positivos. Por eso se reporta junto a la
  [sensibilidad](sensibilidad.md).
- **Cuándo importa**: cuando los falsos positivos son costosos. Por ejemplo, si cada caso
  señalado implica una acción cara (una visita, una oferta, una revisión manual) o molesta a una
  persona que no lo necesitaba.
- **Depende del [umbral de decisión](../glosario.md#umbral-decision)**: subir el umbral hace que
  el modelo prediga positivo solo cuando está muy seguro, lo que suele aumentar la precisión y
  reducir la sensibilidad (vea
  [curva de precisión-sensibilidad](curva-precision-sensibilidad.md)).
- **Con [desbalance de clases](../glosario.md#desbalance-de-clases)**, la precisión de la clase
  minoritaria suele ser baja aunque la [exactitud](exactitud.md) sea alta. Compárela con la
  proporción de positivos: un modelo que señala positivos al azar tiene una precisión igual a
  esa proporción.

!!! warning "No la confunda con la exactitud"
    En español cotidiano "precisión" y "exactitud" se usan como sinónimos, pero aquí son métricas
    distintas: la [exactitud](exactitud.md) mide los aciertos sobre **todos** los registros; la
    precisión, los aciertos sobre las **predicciones positivas**.
