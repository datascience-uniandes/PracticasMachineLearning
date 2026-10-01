# Exactitud (accuracy)

La [exactitud](../glosario.md#exactitud) es la proporción de registros que el modelo clasifica
correctamente. Es la métrica de [clasificación](../glosario.md#clasificacion) más intuitiva,
pero también la que más engaña cuando hay
[desbalance de clases](../glosario.md#desbalance-de-clases).

## Fórmula

\[
\text{Exactitud} = \frac{VP + VN}{VP + VN + FP + FN}
\]

VP, VN, FP y FN son las casillas de la [matriz de confusión](matriz-confusion.md): el numerador
son los aciertos (la diagonal) y el denominador, el total de registros.

## Calcularla

```python
from sklearn.metrics import accuracy_score

y_pred = modelo.predict(X_val)
exactitud = accuracy_score(y_val, y_pred)
```

`modelo` es un clasificador ya entrenado, `X_val` y `y_val` son las variables y la clase real
del [conjunto de validación](../glosario.md#conjunto-validacion), y `y_pred` las clases
predichas para esos mismos registros. Primero van los valores reales y después las predicciones.

## Compararla con la línea base

Antes de juzgar la exactitud, calcule la que obtendría un modelo que **siempre predice la clase
mayoritaria**:

```python
linea_base = y_val.value_counts(normalize=True).max()
```

`value_counts(normalize=True)` da la proporción de cada clase, y `.max()` la de la clase más
frecuente. Esa proporción es la exactitud de un modelo que no aprendió nada.

## Cómo interpretarla

- **Rango**: va de 0 a 1 (o de 0 % a 100 %). Mayor es mejor.
- **Engaña con desbalance de clases**: si el 95 % de los registros son negativos, un modelo que
  siempre responde "negativo" tiene una exactitud de 0,95 sin detectar **ningún** positivo. Una
  exactitud alta solo significa algo si supera claramente la línea base.
- **Trata igual todos los errores**: un FP y un FN pesan lo mismo, aunque en el problema uno
  sea mucho más costoso que el otro (vea [matriz de confusión](matriz-confusion.md)).
- **Cuándo usarla**: es adecuada cuando las clases están más o menos balanceadas y los dos tipos
  de error cuestan parecido. En otro caso, complemente con la [precisión](precision.md), la
  [sensibilidad](sensibilidad.md) y el [F1](f1.md).
- Una exactitud mucho mayor en el
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) que en validación indica
  [sobreajuste](../glosario.md#sobreajuste) (vea [comparar métricas](comparar-metricas.md)).

!!! warning "Reporte siempre la línea base junto a la exactitud"
    "El modelo tiene 92 % de exactitud" no dice nada por sí solo. Si la clase mayoritaria es el
    90 % de los datos, el modelo apenas mejora a no hacer nada; si es el 50 %, el resultado es
    bueno.
