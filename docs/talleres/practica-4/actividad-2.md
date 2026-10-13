# Actividad 2: Selección de modelos

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md)

1. Retome la tabla de los ocho modelos y los conjuntos de entrenamiento, validación y prueba de la
   actividad anterior.
2. **Seleccione dos modelos para comparar:**

    - **a) Modelo A:** el de mayor F1 en validación.
    - **b) Modelo B:** una alternativa más sencilla con un F1 de validación cercano al de A, por
      ejemplo, el mismo algoritmo con un conjunto de atributos más pequeño, o la regresión
      logística con el mismo conjunto.

    **¿Qué modelos eligió? ¿Qué ventajas tendría usar el modelo B si su desempeño fuera
    equivalente al de A?**

3. **Evalúe los dos modelos en el [conjunto de prueba](../../glosario.md#conjunto-prueba):**

    - **a)** Grafique la [**matriz de confusión**](../../ayudas/matriz-confusion.md) de cada uno.
    - **b)** Calcule la [**exactitud**](../../ayudas/exactitud.md), la
      [**precisión**](../../ayudas/precision.md), la
      [**sensibilidad**](../../ayudas/sensibilidad.md) y el [**F1**](../../ayudas/f1.md) de cada
      uno.
    - **c)** Guarde las clases predichas por cada modelo en prueba en `y_pred_a` y `y_pred_b`;
      las usará en el resto de la práctica.

    **¿Cuál de los dos tiene el mayor F1 en prueba? ¿De cuántos puntos es la diferencia?**

4. **Plantee la pregunta de la práctica:** el conjunto de prueba es solo una muestra de los
   clientes del banco. **Si el banco evaluara los dos modelos con otros 2.000 clientes, ¿cree que
   el orden entre A y B se mantendría? ¿Qué información le falta para responder con
   seguridad?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
