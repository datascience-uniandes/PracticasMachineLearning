# Actividad 4: Regularización

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md)

1. Retome la ingeniería de características de la actividad anterior: las variables continuas
   seleccionadas y las columnas de la [codificación one-hot](../../ayudas/one-hot.md), con la
   misma división en entrenamiento y prueba de la [Actividad 2](actividad-2.md).
2. [**Estandarice las variables**](../../ayudas/estandarizar.md) antes de entrenar.
   **¿Por qué la [regularización](../../glosario.md#regularizacion) exige que todas las variables
   estén en la misma escala?**
3. [**Entrene un modelo de regresión Lasso**](../../ayudas/lasso.md) con tres valores del
   [hiperparámetro](../../glosario.md#hiperparametro) alfa: **α = 0,1**, **α = 0,5** y **α = 1**.
4. Revise los [**coeficientes**](../../ayudas/ver-coeficientes.md) de cada modelo Lasso.
   **¿Se eliminó algún coeficiente (quedó exactamente en 0)? ¿Cuáles variables sobreviven al
   aumentar alfa? ¿Coinciden con las que parecían más relacionadas con el área quemada en la
   Actividad 2?**
5. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) de los tres modelos Lasso en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los del modelo de regresión lineal de la
   Actividad 2. **¿Qué valor de alfa da el mejor resultado en prueba? ¿Qué pasa con las métricas
   cuando alfa crece demasiado?**
6. [**Entrene un modelo de regresión Ridge**](../../ayudas/ridge.md) con tres valores de alfa:
   **α = 1**, **α = 100** y **α = 1000**.
7. Revise los [**coeficientes**](../../ayudas/ver-coeficientes.md) de cada modelo Ridge.
   **¿Se eliminó algún coeficiente? ¿Cómo cambian sus magnitudes al aumentar alfa? ¿En qué se
   diferencia este comportamiento del de Lasso?**
8. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) de los tres modelos Ridge en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los de la Actividad 2 y con los de Lasso.
   **¿Cuál de los dos tipos de regularización funciona mejor con estos datos? ¿Por qué?**
9. Use [**validación cruzada K-fold**](../../ayudas/validacion-cruzada.md) sobre el conjunto de
   entrenamiento para [**optimizar a la vez el grado del polinomio**](../../ayudas/gridsearchcv.md)
   (1, 2 y 3) **y la fuerza de la regularización** (alfa) con `GridSearchCV`, una vez con Lasso y
   otra con Ridge.
   [**Grafique las métricas de la validación cruzada**](../../ayudas/gridsearchcv.md) para cada
   combinación. **¿Qué grado y qué alfa resultaron mejores? ¿El mejor valor de alfa quedó en el
   borde de la grilla?**
10. Reporte el mejor modelo de cada tipo (Lasso y Ridge) **solo con el conjunto de prueba**.
    **¿Qué tan lejos está el mejor modelo de predecir siempre la media? ¿Qué concluye sobre la
    capacidad de las variables meteorológicas para predecir el área quemada? ¿Cuál modelo
    escogería y por qué?**

!!! success "Fin de la Práctica 1"
    Guarde los cambios en el notebook. Ha terminado la última actividad de la Práctica 1.
