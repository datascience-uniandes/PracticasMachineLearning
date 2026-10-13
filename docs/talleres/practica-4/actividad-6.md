# Actividad 6: Prueba de McNemar

### Datos de trabajo: el notebook de la [Actividad 5](actividad-5.md)

1. Retome la clase real del conjunto de prueba y las predicciones `y_pred_a` y `y_pred_b`.
2. Construya la [**tabla de contingencia**](../../ayudas/prueba-mcnemar.md#tabla-de-contingencia)
   de los aciertos de los dos modelos en prueba. **¿En cuántos clientes aciertan los dos? ¿En
   cuántos acierta solo A y en cuántos solo B? ¿Por qué la prueba solo usa los casos en
   desacuerdo?**
3. [**Aplique la prueba de McNemar**](../../ayudas/prueba-mcnemar.md). Use la versión exacta si
   hay menos de 25 casos en desacuerdo. **¿Qué valor p obtuvo? ¿Un modelo se equivoca
   significativamente más que el otro?**
4. Repita la prueba **solo con los clientes que abandonaron** (`churn = 1`). **¿Qué métrica
   compara la prueba en este caso? ¿Cuál de los dos modelos detecta más clientes que abandonan?**
5. **Conclusiones de la práctica:** construya una tabla con el resultado de cada análisis
   (superposición de intervalos, prueba A/B independiente, prueba A/B pareada y McNemar, en total
   y en la clase positiva) y si cada uno indica una diferencia significativa.

    **¿Todas las pruebas llegan a la misma conclusión? Si no, ¿por qué? Tenga en cuenta qué
    métrica compara cada una (F1, exactitud o sensibilidad) y si trata las muestras como
    pareadas. ¿Qué modelo le recomendaría al banco: el de mejor métrica o el más sencillo? ¿Por
    qué no basta con comparar dos cifras de F1 para elegir un modelo?**

!!! success "Fin de la Práctica 4"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
