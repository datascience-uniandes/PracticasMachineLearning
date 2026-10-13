# Actividad 5: Prueba A/B pareada

### Datos de trabajo: el notebook de la [Actividad 4](actividad-4.md)

1. Retome la clase real del conjunto de prueba y las predicciones `y_pred_a` y `y_pred_b`.
2. [**Aplique bootstrapping con muestras pareadas**](../../ayudas/prueba-ab.md#pareada): en cada
   una de las \( B = 1000 \) réplicas, tome **una sola muestra** y calcule el F1 de los dos
   modelos sobre esos mismos registros. **¿Por qué en este problema corresponde una prueba
   pareada y no una de grupos independientes?**
3. **Calcule la diferencia** \( F_1^A - F_1^B \) en cada réplica, grafique su
   [histograma](../../ayudas/histograma.md) con una línea vertical en 0 y calcule su
   [**intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) y la proporción de
   réplicas en las que A no supera a B. **¿El intervalo contiene el 0? ¿En qué porcentaje de las
   réplicas gana cada modelo?**
4. Aplique la **prueba t pareada** (`stats.ttest_rel`) a las dos distribuciones de F1.
   **¿Qué valor p obtuvo? ¿Rechaza la hipótesis nula?**
5. **Compare con la Actividad 4:** ponga en una tabla el intervalo de la diferencia y el valor p
   de la prueba independiente y de la pareada. **¿Cuál intervalo es más estrecho y por qué? ¿Hay
   algún caso en que la prueba pareada detecte una diferencia que la independiente no detecta?
   ¿Coincide con lo que concluyó al comparar la superposición de los intervalos en la
   Actividad 3?**

!!! success "Fin de la Actividad 5"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
