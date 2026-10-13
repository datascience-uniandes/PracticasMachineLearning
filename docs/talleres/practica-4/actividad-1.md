# Actividad 1: Intervalos de confianza

### Datos de trabajo: el dataset tratado en la [Actividad 1 de la Práctica 2](../practica-2/actividad-1.md)

1. Cree un nuevo notebook y retome el dataset de churn con los duplicados, los valores inválidos,
   las inconsistencias y los outliers ya tratados en la Actividad 1 de la Práctica 2, **sin
   imputar los nulos**. Aplique [**codificación one-hot**](../../ayudas/one-hot.md) a `country` y
   `gender`.
2. [**Cree características derivadas**](../../ayudas/caracteristicas-derivadas.md):

    - **a)** `balance_cero`: indicador de saldo igual a 0.
    - **b)** `balance_salario`: razón entre el saldo y el salario estimado (sume 1 al
      denominador).
    - **c)** `productos_1` y `productos_3mas`: indicadores de tener un solo producto y de tener
      tres o más.
    - **d)** `edad_activo`: [interacción](../../glosario.md#termino-interaccion) entre la edad y
      `active_member`.

    Defina dos conjuntos de atributos: **original**, con todas las variables originales, y
    **ampliado**, con las originales más las derivadas. **¿Qué características derivadas
    parecen separar mejor a los clientes que abandonan? ¿Por qué `products_number` se relaciona
    con el abandono de una forma que un modelo lineal no puede captar con la variable original?**

3. [**Divida los datos en entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion)
   (60 %, 20 % y 20 %) de forma [**estratificada**](../../ayudas/division-datos.md#estratificada)
   y con `random_state=42`. Luego [**impute los valores nulos**](../../ayudas/nulos.md) con la
   mediana del conjunto de entrenamiento y [**escale las variables**](../../ayudas/escalar-variables.md)
   con un escalador ajustado solo con el entrenamiento, uno por cada conjunto de atributos.
   **Use la misma división para todos los modelos. ¿Por qué es indispensable que todos los
   modelos se evalúen sobre los mismos registros para compararlos después? ¿Para qué se usará
   cada conjunto en esta práctica?**
4. **Configuración 1, ingeniería de características:** entrene una
   [**regresión logística**](../../ayudas/regresion-logistica.md) con los hiperparámetros que
   eligió en la Práctica 2 dos veces: con el conjunto **original** (modelo 1A) y con el
   **ampliado** (modelo 1B). **¿Qué cambia entre los dos modelos?**
5. **Configuración 2, tipo de modelo:** con el conjunto **ampliado**, entrene un
   [**Random Forest**](../../ayudas/random-forest.md) (modelo 2A) y un
   [**Gradient Boosting**](../../ayudas/gradient-boosting.md) (modelo 2B) con los hiperparámetros
   que eligió en la Práctica 2. **¿Qué cambia entre los dos modelos?**
6. **Calcule las métricas en [validación](../../glosario.md#conjunto-validacion):** construya una
   tabla con la [**precisión**](../../ayudas/precision.md), la
   [**sensibilidad**](../../ayudas/sensibilidad.md) y el [**F1**](../../ayudas/f1.md) de los
   cuatro modelos. **¿Qué modelo gana en cada configuración? ¿Las diferencias parecen grandes o
   pequeñas?**
7. [**Aplique bootstrapping sobre el conjunto de validación**](../../ayudas/bootstrapping.md)
   con \( B = 1000 \) réplicas y semilla 42, y calcule el F1 de los cuatro modelos en cada
   réplica. Grafique un [histograma](../../ayudas/histograma.md) por configuración con las
   distribuciones de sus dos modelos. **¿Por qué no es necesario volver a entrenar los modelos en
   cada réplica? ¿Las distribuciones de cada configuración se superponen?**
8. [**Calcule el intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) del F1 de
   cada modelo con el método de percentiles y grafíquelos como barras de error, agrupados por
   configuración. **¿Los intervalos de cada configuración se superponen? ¿En qué configuración
   puede afirmar que un modelo es mejor que el otro? Si se superponen, ¿eso demuestra que los
   modelos son equivalentes?**
9. **Reporte los resultados en el [conjunto de prueba](../../glosario.md#conjunto-prueba):**
   calcule la precisión, la sensibilidad y el F1 de los cuatro modelos en prueba y agréguelos a la
   tabla junto al intervalo de validación. **¿El F1 de prueba de cada modelo queda dentro de su
   intervalo de validación? ¿El orden entre los modelos de cada configuración se mantiene en
   prueba?**
10. **Analice el significado de los intervalos:** **¿Qué significa, en palabras para el banco,
    que el F1 de un modelo tenga un intervalo de confianza del 95 % de, por ejemplo, [0,54; 0,61]?
    ¿Qué no significa? ¿De qué depende su ancho y qué pasaría si el conjunto de validación tuviera
    el doble de clientes? ¿Por qué no basta con comparar dos cifras de F1 para elegir un
    modelo?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
