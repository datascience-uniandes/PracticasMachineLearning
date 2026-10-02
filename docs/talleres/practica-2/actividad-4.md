# Actividad 4: Ensambles

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md)

1. Retome los conjuntos de entrenamiento, validación y prueba, y los tres modelos ya optimizados
   de la actividad anterior. **Use el conjunto de prueba solo en el paso 9.**
2. [**Entrene un Random Forest**](../../ayudas/random-forest.md) y
   [**optimice sus hiperparámetros con GridSearchCV**](../../ayudas/gridsearchcv.md) sobre el
   conjunto de entrenamiento (validación cruzada estratificada de 5 folds, `scoring="f1"`):
   `n_estimators` ∈ {200, 400}, `max_depth` ∈ {5, 10, `None`}, `min_samples_leaf` ∈ {1, 5, 20}
   y `class_weight` ∈ {`None`, `"balanced"`}. **¿Qué combinación resultó mejor? ¿Qué variables
   son las más importantes? ¿Coinciden con las del árbol de decisión?**
3. [**Entrene un Gradient Boosting**](../../ayudas/gradient-boosting.md) y optimice con
   GridSearchCV: `n_estimators` ∈ {100, 300}, `learning_rate` ∈ {0,05; 0,1} y
   `max_depth` ∈ {2, 3, 4}. Como este modelo no acepta `class_weight`, use pesos por registro
   balanceados. **¿Qué combinación resultó mejor? ¿Qué relación hay entre `learning_rate` y
   `n_estimators`?**
4. [**Entrene un modelo de Stacking**](../../ayudas/stacking.md) que combine la regresión
   logística, el árbol de decisión y el KNN optimizados en la Actividad 3, con una regresión
   logística como modelo final. Optimice con GridSearchCV el modelo final:
   `final_estimator__C` ∈ {0,1; 1; 10} y `final_estimator__class_weight` ∈ {`None`, `"balanced"`}.
   **¿Por qué conviene que los modelos base sean diferentes entre sí?**
5. **Compare los tres ensambles** en entrenamiento y en
   [validación](../../glosario.md#conjunto-validacion):

    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md) de cada modelo.
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md) de cada modelo.

    **¿Cuántos clientes que abandonan detecta cada ensamble y cuántas falsas alarmas genera? ¿Qué
    ensamble muestra más [sobreajuste](../../glosario.md#sobreajuste)?**

6. Grafique las [**curvas de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
   de los tres ensambles, una figura para entrenamiento y otra para validación.
   **¿Qué ensamble tiene la mayor precisión promedio (AP) en validación?**
7. Grafique las [**curvas ROC**](../../ayudas/curva-roc.md) de los tres ensambles, en
   entrenamiento y en validación. **¿Qué ensamble tiene el mayor [AUC](../../glosario.md#auc) en
   validación?**
8. **Elija el mejor ensamble con las métricas de validación:** construya una tabla con la exactitud,
   la precisión, la sensibilidad, el F1, el AUC y el AP de los tres ensambles en validación y
   agregue el mejor modelo de la Actividad 3. Elija el ensamble con el **mayor F1 de validación**.
   **¿Los ensambles mejoran al mejor modelo básico? ¿La mejora justifica el costo en tiempo de
   entrenamiento y en interpretabilidad?**
9. **Evalúe el ensamble elegido en el [conjunto de prueba](../../glosario.md#conjunto-prueba):**

    - **a)** Grafique su [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule la exactitud, la precisión, la sensibilidad y el F1, y
      [**compárelos**](../../ayudas/comparar-metricas.md) con los de validación.
    - **c)** Grafique su [**curva de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
      y su [**curva ROC**](../../ayudas/curva-roc.md) en prueba.

    **¿Las métricas se mantienen respecto a validación? ¿Cómo se compara con el resultado en
    prueba del mejor modelo de la Actividad 3?**

!!! success "Fin de la Actividad 4"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
