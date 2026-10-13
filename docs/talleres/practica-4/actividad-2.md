# Actividad 2: Pruebas estadísticas

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md)

1. Retome la clase real del conjunto de validación y las clases predichas por los cuatro modelos
   en validación. En cada configuración, llame `y_pred_a` a las del modelo A y `y_pred_b` a las
   del modelo B. Aplique cada prueba de esta actividad **a las dos configuraciones**.
2. **Prueba A/B con grupos independientes:**

    - **a)** [**Aplique bootstrapping con grupos independientes**](../../ayudas/prueba-ab.md#independiente):
      en cada una de las \( B = 1000 \) réplicas, tome una muestra para el modelo A y otra
      muestra distinta para el modelo B, y calcule el F1 de cada uno.
    - **b)** Calcule la diferencia \( F_1^A - F_1^B \) de cada réplica, grafique su
      [histograma](../../ayudas/histograma.md) con una línea vertical en 0 y calcule su
      [**intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md).
    - **c)** Aplique la [**prueba t-estudiante**](../../ayudas/prueba-t.md) para grupos
      independientes (`stats.ttest_ind` con `equal_var=False`).

    **¿El intervalo de la diferencia contiene el 0? ¿La prueba t rechaza la hipótesis nula?
    ¿Los dos criterios llegan a la misma conclusión?**

3. **Revise el efecto del número de réplicas:** repita el paso 2 con \( B = 200 \) y con
   \( B = 5000 \) y construya una tabla con el intervalo de la diferencia y el valor p de cada
   \( B \). **¿Qué le pasa al valor p cuando aumentan las réplicas? ¿Y al intervalo? ¿Cambió la
   evidencia o solo el número de réplicas? ¿En cuál de los dos criterios confiaría para decidir?**
   (Vea la advertencia de la [ayuda de la prueba A/B](../../ayudas/prueba-ab.md#como-decidir).)
4. **Prueba A/B pareada:**

    - **a)** [**Aplique bootstrapping con muestras pareadas**](../../ayudas/prueba-ab.md#pareada):
      en cada réplica, tome una sola muestra y calcule el F1 de los dos modelos sobre esos
      mismos registros.
    - **b)** Calcule el intervalo del 95 % de la diferencia y la proporción de réplicas en las que
      A no supera a B.
    - **c)** Aplique la prueba t pareada (`stats.ttest_rel`).

    **¿Por qué en este problema corresponde una prueba pareada? ¿El intervalo pareado es más
    estrecho que el independiente? ¿Por qué? ¿Detecta alguna diferencia que la prueba
    independiente no detectó?**

5. **Prueba de McNemar:**

    - **a)** Construya la [**tabla de contingencia**](../../ayudas/prueba-mcnemar.md#tabla-de-contingencia)
      de los aciertos de los dos modelos.
    - **b)** [**Aplique la prueba de McNemar**](../../ayudas/prueba-mcnemar.md) con todos los
      clientes y luego solo con los clientes que abandonaron (`churn = 1`).

    **¿En cuántos clientes acierta solo A y en cuántos solo B? ¿Un modelo se equivoca
    significativamente más que el otro? ¿Qué métrica compara la prueba en cada caso?**

6. **Concluya:** construya una tabla con una fila por configuración y una columna por análisis
   (superposición de intervalos de la Actividad 1, A/B independiente, A/B pareada, McNemar total
   y McNemar en la clase positiva), indicando si cada uno muestra una diferencia significativa.

    **¿En qué configuración todas las pruebas coinciden? ¿En cuál no, y por qué? Tenga en cuenta
    qué métrica compara cada prueba (F1, exactitud o sensibilidad) y si trata las muestras como
    pareadas. ¿La ingeniería de características o el cambio de tipo de modelo tuvo un efecto
    más claro? ¿Qué modelo elegiría en cada configuración? ¿Los resultados de prueba de la
    Actividad 1 confirman esa elección?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
