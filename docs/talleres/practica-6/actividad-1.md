# Actividad 1: Pipeline del modelo

### Datos de trabajo: el dataset tratado en la [Actividad 1 de la Práctica 2](../practica-2/actividad-1.md)

1. Cree un nuevo notebook y retome el dataset de churn con los duplicados, los valores inválidos y
   las inconsistencias ya tratados, **sin imputar los nulos ni codificar ni escalar**: esos pasos
   quedarán dentro del _pipeline_. Separe la variable objetivo y
   [**divida los datos en entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion)
   (60 %, 20 % y 20 %) de forma estratificada y con `random_state=42`. **¿Por qué la imputación,
   la codificación y el escalado deben ajustarse dentro del _pipeline_ y no antes de dividir los
   datos?**
2. [**Construya el pipeline**](../../ayudas/pipeline.md) con un `ColumnTransformer` de dos ramas
   y el modelo:

    - **a)** variables numéricas: imputación por la mediana y escalado;
    - **b)** variables categóricas (`country` y `gender`): imputación por la moda y codificación
      one-hot con `handle_unknown="ignore"`;
    - **c)** el [Random Forest](../../ayudas/random-forest.md) con los hiperparámetros que eligió
      en la Práctica 2.

    **¿Qué recibe el _pipeline_ y qué devuelve? ¿Por qué el preprocesamiento debe viajar junto con
    el modelo?**

3. **Entrene y evalúe:** entrene el _pipeline_ con el conjunto de entrenamiento y calcule la
   [**precisión**](../../ayudas/precision.md), el [**recall**](../../ayudas/recall.md) y el
   [**F1**](../../ayudas/f1.md) en validación y en prueba. **¿Coinciden con los resultados del
   Random Forest de la Práctica 2? Si no, ¿qué paso es distinto?**
4. **Prediga con un cliente escrito a mano:** construya un `DataFrame` de una fila con las
   variables originales, con texto en `country` y `gender` y un valor faltante (`np.nan`), y
   calcule su probabilidad de abandono con `predict_proba`. **¿Qué ventaja tiene no tener que
   transformar los datos antes de predecir?**
5. [**Guarde el pipeline**](../../ayudas/guardar-modelo.md) con `joblib` en un archivo
   `churn_pipeline.joblib` e imprima las versiones de scikit-learn, NumPy, pandas y joblib.
   Descargue el archivo y anote las versiones: las usará en las siguientes actividades.
   **¿Por qué las versiones de las librerías deben ser las mismas al cargar el modelo?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
