# Actividad 2: Pruebas estadísticas

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md)

1. Retome la clase real de los conjuntos de validación (`y_val`) y de prueba (`y_test`) y las
   clases predichas por los cuatro modelos en los dos conjuntos. En cada configuración, el modelo
   A es el primero y el modelo B el segundo. Aplique cada prueba de esta actividad **a las dos
   configuraciones** y, en cada una, compare el [**F1**](../../ayudas/f1.md), la
   [**precisión**](../../ayudas/precision.md) y el [**recall**](../../ayudas/recall.md). Defina
   también un **umbral de diferencia relevante**, por ejemplo, 0,02 en cada métrica. **¿Por qué
   una diferencia significativa no siempre es una diferencia que le importe al banco?**
2. **Prueba A/B con grupos independientes (validación frente a prueba):**

    - **a)** [**Aplique bootstrapping con grupos independientes**](../../ayudas/prueba-ab.md#independiente)
      con \( B = 1000 \) réplicas y semilla 42: evalúe el modelo A con sus predicciones sobre
      **validación** y el modelo B con sus predicciones sobre **prueba**. En cada réplica,
      remuestree cada conjunto por separado, con su propio tamaño (\( n_{val} \) y
      \( n_{test} \)), y calcule el F1, la precisión y el recall de cada modelo.
    - **b)** Calcule la diferencia A − B de cada métrica en cada réplica y grafique el
      [histograma](../../ayudas/histograma.md) de la diferencia del F1 con una línea vertical en
      0. Construya una tabla con la diferencia observada, el
      [**intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) de la diferencia
      y el [**valor p por bootstrapping**](../../ayudas/prueba-ab.md#como-decidir) de cada
      métrica.
    - **c)** Aplique la [**prueba t-estudiante**](../../ayudas/prueba-t.md) de Welch
      (`stats.ttest_ind` con `equal_var=False`) sobre los
      [**valores por cliente**](../../ayudas/prueba-ab.md#metricas) de la exactitud, el recall y
      la precisión.

    **¿Por qué los conjuntos de validación y de prueba son grupos independientes? ¿El intervalo
    de cada diferencia contiene el 0? ¿El valor p por bootstrapping llega a la misma conclusión
    que el intervalo? ¿Por qué el F1 no admite una prueba t? En este diseño, ¿la diferencia puede
    deberse a los modelos o también a que los clientes de los dos conjuntos son distintos?**

3. **Revise el efecto del número de réplicas:** repita el bootstrapping del paso 2 con
   \( B = 200 \) y con \( B = 5000 \). Para la diferencia del F1, construya una tabla con el
   intervalo, el valor p por bootstrapping y, **solo para observar el problema**, el valor p de
   una prueba t aplicada a las réplicas (`stats.ttest_ind` con los \( B \) valores de F1 de cada
   modelo) para cada \( B \). **¿Qué le pasa al valor p de la prueba t sobre réplicas cuando
   aumentan las réplicas? ¿Y al intervalo y al valor p por bootstrapping? ¿Cambió la evidencia o
   solo el número de réplicas? ¿Cuáles son las observaciones reales: los clientes o las
   réplicas?** Por eso la prueba t sobre réplicas no se usa para decidir (vea la advertencia de la
   [ayuda de la prueba A/B](../../ayudas/prueba-ab.md#como-decidir)).
4. **Prueba A/B pareada en el conjunto de prueba:**

    - **a)** [**Aplique bootstrapping con muestras pareadas**](../../ayudas/prueba-ab.md#pareada)
      usando **solo el conjunto de prueba**, con \( B = 1000 \) réplicas y semilla 42: en cada
      réplica, tome una sola muestra de clientes y calcule el F1, la precisión y el recall de los
      dos modelos sobre esos mismos clientes.
    - **b)** Construya la misma tabla del paso 2b (diferencia observada, intervalo del 95 % y
      valor p por bootstrapping de cada métrica) y grafique el histograma de la diferencia del F1.
    - **c)** Aplique la prueba t pareada (`stats.ttest_rel`) sobre los valores por cliente de la
      exactitud y del recall.

    **¿Por qué en este problema corresponde una prueba pareada? ¿Por qué la precisión y el F1
    se comparan solo con bootstrapping? ¿El intervalo pareado de cada métrica es más estrecho que
    el independiente? ¿Por qué? ¿Detecta alguna diferencia que la prueba independiente no
    detectó? Si es así, ¿es una contradicción?**

5. **Prueba de McNemar en el conjunto de prueba:**

    - **a)** Construya la [**tabla de contingencia**](../../ayudas/prueba-mcnemar.md#tabla-de-contingencia)
      de los aciertos de los dos modelos en el conjunto de prueba.
    - **b)** [**Aplique la prueba de McNemar**](../../ayudas/prueba-mcnemar.md) con todos los
      clientes de prueba y luego solo con los clientes que abandonaron (`churn = 1`).

    **¿En cuántos clientes acierta solo A y en cuántos solo B? ¿Un modelo se equivoca
    significativamente más que el otro? ¿Qué métrica compara la prueba en cada caso? ¿Llega a la
    misma conclusión que la prueba t pareada del paso 4c para esa métrica?**

6. **Concluya:** construya una tabla por configuración con una fila por métrica (F1, precisión,
   recall y exactitud) y una columna por análisis: superposición de los intervalos de prueba de
   la Actividad 1, A/B independiente (validación frente a prueba), A/B pareada en prueba y
   McNemar en prueba. Indique en cada celda si la diferencia es significativa y si supera el
   umbral relevante, y marque «no aplica» cuando el análisis no compare esa métrica. Si en la
   Actividad 1 no calculó los intervalos de alguna métrica, obténgalos con las réplicas de cada
   modelo del paso 4.

    **¿En qué métricas y diseños coinciden los análisis? ¿En cuáles no, y por qué? Tenga en
    cuenta qué métrica compara cada prueba y si trata las muestras como pareadas. ¿Por qué la
    superposición de intervalos es más conservadora que el intervalo de la diferencia? ¿La
    ingeniería de características o el cambio de tipo de modelo tuvo un efecto más claro? ¿Qué
    modelo elegiría en cada configuración? ¿La elección hecha en validación en la Actividad 1 se
    confirma en prueba?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
