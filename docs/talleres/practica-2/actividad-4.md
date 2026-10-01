# Actividad 4: Evaluación en prueba

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md)

1. Retome el mejor modelo elegido en la actividad anterior, entrenado con el conjunto de
   entrenamiento y con sus mejores hiperparámetros.
2. Prediga el [conjunto de prueba](../../glosario.md#conjunto-prueba), que hasta ahora no se ha
   usado, y grafique su [**matriz de confusión**](../../ayudas/matriz-confusion.md).
   **¿Cuántos clientes que abandonan detecta el modelo y cuántos se le escapan?**
3. Calcule la [**exactitud**](../../ayudas/exactitud.md), la [**precisión**](../../ayudas/precision.md),
   la [**sensibilidad**](../../ayudas/sensibilidad.md) y el [**F1**](../../ayudas/f1.md) en prueba,
   y [**compárelos**](../../ayudas/comparar-metricas.md) con los de validación.
   **¿Las métricas se mantienen? ¿Qué significaría una caída grande?**
4. Grafique la [**curva ROC**](../../ayudas/curva-roc.md) y la
   [**curva de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md) del modelo en
   prueba. **¿Cuánto valen el AUC y el AP? ¿Qué tan lejos está el modelo de la línea base?**
5. Compare la exactitud del modelo con la de un modelo que siempre predice que el cliente **no**
   abandona. **¿Cuánto mejora el modelo frente a esa línea base? ¿Por qué la
   [exactitud](../../glosario.md#exactitud) sola no es suficiente con
   [desbalance de clases](../../glosario.md#desbalance-de-clases)?**
6. **Conclusiones.** **¿Qué variables explican mejor el abandono? ¿Qué tipo de error comete más el
   modelo? Si el banco quisiera detectar más clientes que abandonan, ¿cómo podría usar el
   [umbral de decisión](../../glosario.md#umbral-decision) y qué costo tendría?**

!!! success "Fin de la Práctica 2"
    Guarde los cambios en el notebook. Ha terminado la última actividad de la Práctica 2.
