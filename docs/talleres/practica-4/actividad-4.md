# Actividad 4: Prueba A/B con grupos independientes

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md)

1. Retome la clase real del conjunto de prueba y las predicciones `y_pred_a` y `y_pred_b`.
2. [**Aplique bootstrapping con grupos independientes**](../../ayudas/prueba-ab.md#independiente):
   en cada una de las \( B = 1000 \) réplicas, tome **una muestra para el modelo A y otra muestra
   distinta para el modelo B**, y calcule el F1 de cada uno. **¿Qué situación real simula
   evaluar cada modelo con clientes distintos?**
3. **Calcule la diferencia** \( F_1^A - F_1^B \) en cada réplica, grafique su
   [histograma](../../ayudas/histograma.md) con una línea vertical en 0 y calcule su
   [**intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md).
   **¿El intervalo de la diferencia contiene el 0? ¿Qué significa?**
4. Aplique la [**prueba t-estudiante**](../../ayudas/prueba-t.md) para grupos independientes
   (`stats.ttest_ind` con `equal_var=False`) a las dos distribuciones de F1.
   **¿Qué valor p obtuvo? ¿Rechaza la hipótesis nula de que los dos modelos tienen el mismo F1?
   ¿La prueba t y el intervalo de la diferencia llegan a la misma conclusión?**
5. **Revise el efecto del número de réplicas:** repita los pasos 2 a 4 con \( B = 200 \) y con
   \( B = 5000 \), y construya una tabla con el intervalo de la diferencia y el valor p de cada
   \( B \). **¿Qué le pasa al valor p cuando aumentan las réplicas? ¿Y al intervalo? ¿Cambió la
   evidencia o solo el número de réplicas? ¿En cuál de los dos criterios confiaría para decidir y
   por qué?** (Vea la advertencia de la
   [ayuda de la prueba A/B](../../ayudas/prueba-ab.md#como-decidir).)

!!! success "Fin de la Actividad 4"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
