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
    parecen separar mejor a los clientes que abandonan?**

3. [**Divida los datos en entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion)
   (60 %, 20 % y 20 %) de forma [**estratificada**](../../ayudas/division-datos.md#estratificada)
   y con `random_state=42`. Luego [**impute los valores nulos**](../../ayudas/nulos.md) con la
   mediana del conjunto de entrenamiento y [**escale las variables**](../../ayudas/escalar-variables.md)
   con un escalador ajustado solo con el entrenamiento, uno por cada conjunto de atributos.
   **Use la misma división para todos los modelos. ¿Por qué es indispensable que todos los
   modelos se evalúen sobre los mismos registros para compararlos después? ¿Para qué se usará
   cada conjunto en esta práctica?**
4. **Configuración 1, ingeniería de características:** retome el **modelo final** que eligió
   en la [Actividad 5 de la Práctica 2](../practica-2/actividad-5.md), con sus mismos
   hiperparámetros, y entrénelo dos veces: con el conjunto **original** (modelo 1A) y con el
   **ampliado** (modelo 1B). **¿Qué cambia entre los dos modelos?**
5. **Configuración 2, tipo de modelo:** retome el **mejor modelo básico** de la
   [Actividad 3](../practica-2/actividad-3.md) (modelo 2A) y el **mejor ensamble** de la
   [Actividad 4](../practica-2/actividad-4.md) de la Práctica 2 (modelo 2B), con sus mismos
   hiperparámetros, y entrénelos con el mismo conjunto de atributos: el que obtenga el mayor F1
   de validación en la configuración 1. **¿Qué cambia entre los dos modelos?**
6. **Compare los modelos en [validación](../../glosario.md#conjunto-validacion):** construya una
   tabla con la [**precisión**](../../ayudas/precision.md), el
   [**recall**](../../ayudas/recall.md) y el [**F1**](../../ayudas/f1.md) de los
   cuatro modelos en validación. El conjunto de validación se usa **para comparar y elegir**: en
   cada configuración, el modelo con mayor F1 de validación es el elegido. **¿Qué modelo gana en
   cada configuración? ¿Las diferencias parecen grandes o pequeñas?**
7. [**Aplique bootstrapping sobre el conjunto de prueba**](../../ayudas/bootstrapping.md) con
   \( B = 1000 \) réplicas y semilla 42, y calcule el F1 de los cuatro modelos en cada réplica.
   Grafique un [histograma](../../ayudas/histograma.md) por configuración con las distribuciones
   de sus dos modelos. **¿Por qué no es necesario volver a entrenar los modelos en cada réplica?
   ¿Por qué el bootstrapping se hace sobre el conjunto de prueba y no sobre el de validación,
   que ya se usó para elegir? ¿Las distribuciones de cada configuración se superponen?**
8. [**Calcule el intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) del F1 de
   cada modelo en prueba con el método de percentiles, y grafíquelos como barras de error,
   agrupados por configuración. **¿Los intervalos de cada configuración se superponen? ¿En qué
   configuración puede afirmar que un modelo es mejor que el otro? Si se superponen, ¿eso
   demuestra que los modelos son equivalentes?**
9. **Contraste validación y prueba:** agregue a la tabla el F1 de prueba y su intervalo junto al
   F1 de validación. **¿El F1 de validación de cada modelo queda dentro de su intervalo de
   prueba? ¿El modelo elegido en validación sigue siendo el mejor en prueba? Si el orden cambia,
   ¿la diferencia es mayor que la incertidumbre que muestran los intervalos?**
10. **Analice el significado de los intervalos:** **¿Qué significa, en palabras para el banco,
    que el F1 de un modelo tenga un intervalo de confianza del 95 % de, por ejemplo, [0,54; 0,61]?
    ¿De qué depende su ancho y qué pasaría si el conjunto de prueba tuviera el doble de
    clientes? ¿Cuáles son las limitaciones de comparar dos cifras de F1 para elegir un
    modelo?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
