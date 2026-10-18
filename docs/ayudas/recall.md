# Recall

El [recall](../glosario.md#recall) responde a la pregunta: **de los registros que
realmente son positivos, ¿qué proporción detectó el modelo?** Mide cuántos casos de interés
logra encontrar. También se conoce como sensibilidad o tasa de verdaderos positivos (TPR).

## Fórmula

\[
\text{Recall} = \frac{VP}{VP + FN}
\]

VP son los verdaderos positivos y FN los falsos negativos de la
[matriz de confusión](matriz-confusion.md). El denominador es el total de positivos reales, es
decir, la fila "real positivo" de la matriz.

## Calcularlo

```python
from sklearn.metrics import recall_score

y_pred = modelo.predict(X_val)
recall = recall_score(y_val, y_pred)
```

`modelo` es un clasificador ya entrenado, `X_val` y `y_val` son las variables y la clase real
del [conjunto de validación](../glosario.md#conjunto-validacion), y `y_pred` las clases
predichas. Por defecto se calcula para la clase positiva `1`; use `pos_label` si la clase
positiva tiene otra etiqueta.

## Cómo interpretarlo

- **Rango**: va de 0 a 1. Mayor es mejor. Un recall de 0,7 significa que el modelo
  detecta 7 de cada 10 positivos y se le escapan 3.
- **Solo mira los positivos reales**: no dice nada de las falsas alarmas (FP). Un modelo que
  predice positivo para todos los registros tiene recall 1, pero es inútil. Por eso se
  reporta junto a la [precisión](precision.md).
- **Cuándo importa**: cuando los falsos negativos son costosos, es decir, cuando dejar pasar un
  positivo sale caro. Por ejemplo, no detectar a un cliente que se va a ir, una transacción
  fraudulenta o una enfermedad.
- **Con [desbalance de clases](../glosario.md#desbalance-de-clases)**, un modelo con buena
  [exactitud](exactitud.md) puede tener un recall muy bajo en la clase minoritaria. Es lo
  primero que conviene revisar en ese caso.

## El compromiso con la precisión

Muchos clasificadores calculan una probabilidad para la clase positiva y la comparan con un
[umbral de decisión](../glosario.md#umbral-decision) (0,5 por defecto en `predict`). Moverlo
cambia el equilibrio entre las dos métricas:

| Cambio del umbral | Efecto en las predicciones | Recall | Precisión |
|-------------------|----------------------------|--------|-----------|
| Bajarlo | El modelo predice positivo con más facilidad: menos FN, más FP | Sube | Suele bajar |
| Subirlo | El modelo predice positivo solo cuando está muy seguro: más FN, menos FP | Baja | Suele subir |

Para aplicar un umbral distinto use las probabilidades en lugar de `predict`:

```python
y_prob = modelo.predict_proba(X_val)[:, 1]
umbral = 0.3
y_pred = (y_prob >= umbral).astype(int)
```

`y_prob` es la probabilidad estimada de la clase positiva para cada registro (la segunda columna
de `predict_proba`). La [curva de precisión-recall](curva-precision-recall.md)
muestra este compromiso para todos los umbrales a la vez y ayuda a elegir uno.

!!! tip "Elija el umbral con validación, no con prueba"
    Elija el umbral con el conjunto de validación y aplíquelo sin cambios al
    [conjunto de prueba](../glosario.md#conjunto-prueba). Ajustarlo mirando la prueba hace que
    su métrica deje de ser una estimación honesta (vea [comparar métricas](comparar-metricas.md)).
