# Actividad 3: Modelos de clasificación

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. Retome las variables seleccionadas y los conjuntos de entrenamiento, validación y prueba de la
   actividad anterior. **Use el conjunto de prueba solo en el paso 9.**
2. [**Entrene una regresión logística**](../../ayudas/regresion-logistica.md) y
   [**optimice sus hiperparámetros con GridSearchCV**](../../ayudas/gridsearchcv.md) sobre el
   [conjunto de entrenamiento](../../glosario.md#conjunto-entrenamiento), con validación cruzada
   estratificada de 5 folds y `scoring="f1"`:
   `C` ∈ {0,01; 0,1; 1; 10} y `class_weight` ∈ {`None`, `"balanced"`}.
   **¿Qué combinación resultó mejor? ¿Por qué se optimiza el F1 y no la exactitud?**
3. [**Entrene un árbol de decisión**](../../ayudas/arbol-decision.md) y optimice con GridSearchCV:
   `max_depth` ∈ {3, 5, 7, 10, `None`}, `min_samples_leaf` ∈ {1, 5, 20, 50} y
   `class_weight` ∈ {`None`, `"balanced"`}. **¿Qué profundidad resultó mejor? ¿Qué variables
   son las más importantes para el árbol?**
4. [**Entrene un modelo KNN**](../../ayudas/knn.md) y optimice con GridSearchCV:
   `n_neighbors` ∈ {3, 5, 11, 21, 41} y `weights` ∈ {`"uniform"`, `"distance"`}.
   **¿Por qué KNN necesita [escalar las variables](../../ayudas/escalar-variables.md)? ¿Qué número
   de vecinos resultó mejor?**
5. **Compare los tres modelos** en entrenamiento y en
   [validación](../../glosario.md#conjunto-validacion):

    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md) de cada modelo.
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md) de cada modelo.

    **¿Cuántos clientes que abandonan detecta cada modelo y cuántas falsas alarmas genera? ¿Qué
    modelo muestra más diferencia entre entrenamiento y validación? ¿Qué ocurre con las métricas
    de entrenamiento de KNN y qué explica ese resultado?**

6. Grafique las [**curvas de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
   de los tres modelos, una figura para entrenamiento y otra para validación. **¿Dónde está la
   línea base? ¿Qué modelo tiene la mayor precisión promedio (AP) en validación?**
7. Grafique las [**curvas ROC**](../../ayudas/curva-roc.md) de los tres modelos, en entrenamiento
   y en validación. **¿Qué modelo tiene el mayor [AUC](../../glosario.md#auc) en validación? ¿Qué
   modelo cambia más entre entrenamiento y validación? ¿Por qué estas curvas se ven más
   optimistas que las de precisión-sensibilidad?**
8. **Elija el mejor modelo con las métricas de validación:** construya una tabla con la exactitud,
   la precisión, la sensibilidad, el F1, el AUC y el AP de los tres modelos en validación.
   Elija el modelo con el **mayor F1 de validación**; si dos modelos son muy parecidos, prefiera
   el más simple o el que tenga menos diferencia entre entrenamiento y validación.
   **¿Qué modelo eligió? ¿Cambiaría su elección si para el banco fuera más costoso no detectar a
   un cliente que abandona que contactar a uno que no iba a abandonar?**
9. **Evalúe el modelo elegido en el [conjunto de prueba](../../glosario.md#conjunto-prueba)**,
   que hasta ahora no se ha usado:

    - **a)** Grafique su [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule la exactitud, la precisión, la sensibilidad y el F1, y
      [**compárelos**](../../ayudas/comparar-metricas.md) con los de validación.
    - **c)** Grafique su [**curva de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
      y su [**curva ROC**](../../ayudas/curva-roc.md) en prueba.
    - **d)** Compare su exactitud con la de un modelo que siempre predice que el cliente **no**
      abandona.

    **¿Las métricas se mantienen respecto a validación? ¿Cuánto mejora el modelo frente a la línea
    base? ¿Por qué la [exactitud](../../glosario.md#exactitud) sola no es suficiente con
    [desbalance de clases](../../glosario.md#desbalance-de-clases)?**

10. **Conclusiones.** **¿Qué variables explican mejor el abandono? ¿Qué tipo de error comete más
    el modelo? Si el banco quisiera detectar más clientes que abandonan, ¿cómo podría usar el
    [umbral de decisión](../../glosario.md#umbral-decision) y qué costo tendría?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
