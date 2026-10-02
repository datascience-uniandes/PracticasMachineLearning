# Actividad 5: Red neuronal

### Datos de trabajo: el notebook de la [Actividad 4](actividad-4.md)

1. Retome los conjuntos de entrenamiento, validación y prueba, y
   [**estandarice las variables**](../../ayudas/estandarizar.md) ajustando el escalador solo con
   el conjunto de entrenamiento. **Use el conjunto de prueba solo en el paso 6.**
2. [**Construya una red neuronal densamente conectada**](../../ayudas/red-neuronal.md) con dos
   capas ocultas de 16 y 8 neuronas con activación ReLU, y una neurona de salida con activación
   sigmoide. Compílela con el optimizador Adam y la pérdida `binary_crossentropy`.
   **¿Cuántos parámetros tiene la red? ¿Por qué la salida usa una
   [función de activación](../../glosario.md#funcion-activacion) sigmoide?**
3. **Pruebe tres arquitecturas** y compárelas en validación:

    - **a)** una capa oculta de 8 neuronas;
    - **b)** dos capas ocultas de 16 y 8 neuronas;
    - **c)** dos capas ocultas de 32 y 16 neuronas con `Dropout(0.2)`.

    **¿Qué arquitectura obtiene el mayor F1 de validación? ¿Una red más grande es siempre mejor?**

4. Evalúe la mejor red en entrenamiento y en [validación](../../glosario.md#conjunto-validacion):

    - **a)** Grafique su [**matriz de confusión**](../../ayudas/matriz-confusion.md).
    - **b)** Calcule y grafique la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la [**sensibilidad**](../../ayudas/sensibilidad.md)
      y el [**F1**](../../ayudas/f1.md).
    - **c)** Grafique su [**curva de precisión-sensibilidad**](../../ayudas/curva-precision-sensibilidad.md)
      y su [**curva ROC**](../../ayudas/curva-roc.md) en entrenamiento y en validación.

5. **Comparación final en validación:** construya una tabla con la exactitud, la precisión, la
   sensibilidad, el F1, el AUC y el AP en validación del mejor modelo básico (Actividad 3), del
   mejor ensamble (Actividad 4) y de la mejor red neuronal. Grafique en una misma figura sus
   curvas de precisión-sensibilidad de validación. Elija el **modelo final** con el mayor F1 de
   validación. **¿Qué modelo eligió? ¿Qué ventajas y desventajas tiene frente a los otros dos?**
6. **Evalúe la red en el [conjunto de prueba](../../glosario.md#conjunto-prueba)** y agregue a la
   tabla anterior las métricas en prueba de los tres modelos finalistas.
   **¿El modelo elegido en validación sigue siendo el mejor en prueba? Si no, ¿por qué no debe
   cambiar su elección mirando el conjunto de prueba?**
7. **Conclusiones de la práctica.** **¿Qué tan difícil es predecir el abandono con estos datos?
   ¿Qué modelo recomendaría al banco y por qué, considerando el desempeño, la interpretabilidad y
   el costo de los errores?**

!!! success "Fin de la Práctica 2"
    Guarde los cambios en el notebook. Ha terminado la última actividad de la Práctica 2.
