# Actividad 1: Ingeniería de características

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

    [**Grafique la tasa de abandono**](../../ayudas/graficos-por-clase.md) de cada indicador y la
    distribución de `balance_salario` y `edad_activo` por clase. **¿Qué características derivadas
    parecen separar mejor a los clientes que abandonan? ¿Por qué `products_number` se relaciona
    con el abandono de una forma que un modelo lineal no puede captar con la variable original?**

3. **Defina cuatro conjuntos de atributos**, de menos a más variables:

    - **a) Mínimo:** las tres variables con la relación más fuerte con el abandono según las
      pruebas de la Actividad 2 de la Práctica 2 (por ejemplo, `age`, `products_number` y
      `active_member`).
    - **b) Seleccionado:** las variables que eligió en el paso 6 de la Actividad 2 de la
      Práctica 2.
    - **c) Completo:** todas las variables originales.
    - **d) Ampliado:** todas las variables originales más las características derivadas.

    **¿Cuántas variables tiene cada conjunto?**

4. [**Divida los datos en entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion)
   (60 %, 20 % y 20 %) de forma [**estratificada**](../../ayudas/division-datos.md#estratificada)
   y con `random_state=42`. Luego [**impute los valores nulos**](../../ayudas/nulos.md) con la
   mediana del conjunto de entrenamiento. **Use la misma división para los cuatro conjuntos de
   atributos. ¿Por qué es indispensable que todos los modelos se evalúen sobre los mismos
   registros de prueba para compararlos después?**
5. Para cada conjunto de atributos, [**escale las variables**](../../ayudas/escalar-variables.md)
   con un escalador ajustado solo con el entrenamiento y entrene dos modelos con los
   hiperparámetros que eligió en la Práctica 2:

    - **a)** una [**regresión logística**](../../ayudas/regresion-logistica.md), y
    - **b)** un [**Random Forest**](../../ayudas/random-forest.md).

6. **Compare los ocho modelos en validación:** construya una tabla con el conjunto de atributos,
   el número de variables, el modelo, el [**F1**](../../ayudas/f1.md) y el
   [AUC](../../glosario.md#auc) en [validación](../../glosario.md#conjunto-validacion).
   **¿Más atributos siempre mejoran el modelo? ¿Cuánto se pierde con el conjunto mínimo? ¿Qué
   modelo aprovecha más las características derivadas y por qué? ¿Las diferencias entre los
   modelos parecen grandes o pequeñas?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
