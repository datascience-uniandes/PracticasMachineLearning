# Actividad 3: Modelos de clasificación

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. Retome las variables seleccionadas y los conjuntos de entrenamiento, validación y prueba de la
   actividad anterior. **No use el conjunto de prueba en esta actividad.**
2. [**Entrene una regresión logística**](../../ayudas/regresion-logistica.md) y
   [**optimice sus hiperparámetros con GridSearchCV**](../../ayudas/gridsearchcv.md) sobre el
   [conjunto de entrenamiento](../../glosario.md#conjunto-entrenamiento), con validación cruzada
   estratificada de 5 folds y `scoring="f1"`:
   `C` ∈ {0,01; 0,1; 1; 10} y `class_weight` ∈ {`None`, `"balanced"`}.
   **¿Qué combinación resultó mejor? ¿Por qué se optimiza el F1 y no la exactitud?**
3. Evalúe la regresión logística en entrenamiento y en [validación](../../glosario.md#conjunto-validacion):
    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md).

    **¿Cuántos clientes que abandonan detecta el modelo? ¿Cuántas falsas alarmas genera?**

4. [**Entrene un árbol de decisión**](../../ayudas/arbol-decision.md) y optimice con GridSearchCV:
   `max_depth` ∈ {3, 5, 7, 10, `None`}, `min_samples_leaf` ∈ {1, 5, 20, 50} y
   `class_weight` ∈ {`None`, `"balanced"`}. **¿Qué profundidad resultó mejor? ¿Qué variables
   son las más importantes para el árbol?**
5. Evalúe el árbol en entrenamiento y en validación:
    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md).

    **¿Hay diferencia entre entrenamiento y validación? ¿Hay señales de
    [sobreajuste](../../glosario.md#sobreajuste)?**

6. [**Entrene un modelo KNN**](../../ayudas/knn.md) y optimice con GridSearchCV:
   `n_neighbors` ∈ {3, 5, 11, 21, 41} y `weights` ∈ {`"uniform"`, `"distance"`}.
   **¿Por qué KNN necesita [escalar las variables](../../ayudas/escalar-variables.md)? ¿Qué número
   de vecinos resultó mejor?**
7. Evalúe el modelo KNN en entrenamiento y en validación:
    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md).

    **¿Qué ocurre con las métricas de entrenamiento? ¿Qué explica ese resultado?**

8. Grafique las [**curvas ROC**](../../ayudas/curva-roc.md) de los tres modelos, una figura para
   entrenamiento y otra para validación. **¿Qué modelo tiene el mayor
   [AUC](../../glosario.md#auc) en validación? ¿Qué modelo cambia más entre entrenamiento y
   validación?**
9. Grafique las [**curvas de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
   de los tres modelos, en entrenamiento y en validación. **¿Dónde está la línea base? ¿Qué modelo
   tiene la mayor precisión promedio (AP) en validación?**
10. **Elija el mejor modelo con las métricas de validación:** construya una tabla con la exactitud,
    la precisión, la sensibilidad, el F1, el AUC y el AP de los tres modelos en validación.
    Elija el modelo con el **mayor F1 de validación**; si dos modelos son muy parecidos, prefiera
    el más simple o el que tenga menos diferencia entre entrenamiento y validación.
    **¿Qué modelo eligió? ¿Cambiaría su elección si para el banco fuera más costoso no detectar a
    un cliente que abandona que contactar a uno que no iba a abandonar?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
