# Actividad 4: Regularización

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md)

1. Retome el **mejor modelo de la [Actividad 3](actividad-3.md)**: las variables continuas
   seleccionadas con los términos polinomiales del **grado elegido** y las columnas de la
   [codificación one-hot](../../ayudas/one-hot.md), con la división en entrenamiento y prueba de
   la [Actividad 2](actividad-2.md). Todos los modelos de esta actividad usan esas mismas columnas.
2. [**Estandarice las variables**](../../ayudas/estandarizar.md) antes de entrenar.
   **¿Por qué la [regularización](../../glosario.md#regularizacion) exige que todas las variables
   estén en la misma escala?**
3. [**Entrene un modelo de regresión Lasso**](../../ayudas/lasso-ridge.md#lasso) con tres valores del
   [hiperparámetro](../../glosario.md#hiperparametro) alfa: **α = 1.000**, **α = 5.000** y **α = 10.000**.
4. Revise los [**coeficientes**](../../ayudas/ver-coeficientes.md) de cada modelo Lasso.
   **¿Se eliminó algún coeficiente (quedó exactamente en 0)? ¿Cuántos? ¿Qué términos sobreviven
   al aumentar alfa: los originales, los términos al cuadrado o los de interacción?**
5. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) de los tres modelos Lasso en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los del mejor modelo de la
   Actividad 3, sin regularizar. **¿Qué valor de alfa da el mejor resultado en prueba? ¿Qué pasa con las métricas
   cuando alfa crece demasiado?**
6. [**Entrene un modelo de regresión Ridge**](../../ayudas/lasso-ridge.md#ridge) con tres valores de alfa:
   **α = 10**, **α = 1.000** y **α = 10.000**.
7. Revise los [**coeficientes**](../../ayudas/ver-coeficientes.md) de cada modelo Ridge.
   **¿Se eliminó algún coeficiente? ¿Cómo cambian sus magnitudes al aumentar alfa? ¿En qué se
   diferencia este comportamiento del de Lasso?**
8. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) de los tres modelos Ridge en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los del mejor modelo de la Actividad 3 y
   con los de Lasso.
   **¿Cuál de los dos tipos de regularización funciona mejor con estos datos? ¿Por qué?**
9. Use [**validación cruzada K-fold**](../../ayudas/validacion-cruzada.md) sobre el conjunto de
   entrenamiento para [**optimizar la fuerza de la regularización con GridSearchCV**](../../ayudas/gridsearchcv.md),
   manteniendo el grado del polinomio elegido en la Actividad 3: una vez con Lasso,
   **α ∈ {10; 100; 1.000; 5.000; 10.000}**, y otra con Ridge,
   **α ∈ {0,1; 1; 10; 100; 1.000; 10.000}**. **¿Qué alfa resultó mejor en cada caso? ¿Quedó en el borde de la lista? Si es así, ¿qué
   debería hacer?**
10. Reporte el mejor modelo de cada tipo (Lasso y Ridge) **solo con el conjunto de prueba**.
    **¿La regularización mejora al mejor modelo de la Actividad 3? ¿Qué tan lejos está el mejor
    modelo de predecir siempre la media? ¿Qué concluye sobre la
    capacidad de las características de la casa y de su ubicación para predecir el precio? ¿Cuál modelo
    escogería y por qué?**

!!! success "Fin de la Práctica 1"
    Guarde los cambios en el notebook. Ha terminado la última actividad de la Práctica 1.
