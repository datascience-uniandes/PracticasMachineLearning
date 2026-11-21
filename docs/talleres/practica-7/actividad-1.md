# Actividad 1: Definiciones de justicia

### Datos de trabajo: el notebook de la [Actividad 1 de la Práctica 6](../practica-6/actividad-1.md)

En cada definición, calcule la medida para mujeres y para hombres y concluya con la
[**regla del 5 %**](../../ayudas/justicia.md#regla-de-decision): si la diferencia entre los dos
grupos es mayor que 5 puntos porcentuales (0,05), el clasificador **no es justo** según esa
definición.

1. **Prepare los datos:** retome el _pipeline_ entrenado y el conjunto de prueba, y descarte los
   clientes sin sexo registrado. Calcule para cada cliente la probabilidad de abandono \( S \) y
   la decisión \( d \) con umbral 0,5 (vea el
   [código](../../ayudas/justicia.md#codigo)); el
   [atributo sensible](../../glosario.md#atributo-sensible) \( G \) es `gender`. En este problema,
   \( d = 1 \) significa que el modelo predice que el cliente abandona y, por lo tanto, que el
   banco le hará una oferta de retención. Calcule también la proporción **real** de abandono de
   cada sexo. **¿Cuántos clientes hay de cada sexo? ¿La tasa real de abandono es igual para
   mujeres y hombres? ¿Por qué esto importa para interpretar las definiciones?**
2. [**Paridad estadística:**](../../ayudas/justicia.md#paridad-estadistica) calcule la
   proporción de clientes con \( d = 1 \) en cada sexo. **¿Qué sexo recibe con más probabilidad
   la oferta de retención? Según la regla del 5 %, ¿el clasificador es justo? ¿La diferencia se
   explica por la diferencia en las tasas reales de abandono?**
3. [**Paridad estadística condicional:**](../../ayudas/justicia.md#paridad-estadistica-condicional)
   tome como factores legítimos \( L \) la edad, agrupada en tres rangos (18 a 35, 36 a 50 y 51 o
   más), y el número de productos (1, 2 y 3 o más). Calcule la proporción de \( d = 1 \) de cada
   sexo **dentro de cada combinación** de edad y productos, con el número de clientes de cada una.
   **¿En cuántas combinaciones la diferencia supera el 5 %? ¿En cuáles es mayor? ¿Hay
   combinaciones con tan pocos clientes que la diferencia no sea confiable? ¿El clasificador es
   justo con esta definición?**
4. [**Paridad de predicción:**](../../ayudas/justicia.md#paridad-de-prediccion) calcule la
   [precisión](../../ayudas/precision.md) del modelo en cada sexo. **De los clientes a quienes el
   modelo les haría la oferta, ¿la misma proporción abandona realmente en los dos sexos? ¿El
   clasificador es justo con esta definición?**
5. [**Igualdad de exactitud:**](../../ayudas/justicia.md#igualdad-de-exactitud) calcule la
   [exactitud](../../ayudas/exactitud.md) del modelo en cada sexo. **¿El modelo se equivoca más
   con un sexo que con el otro? ¿El clasificador es justo con esta definición?**
6. [**Calibración:**](../../ayudas/justicia.md#calibracion) agrupe la probabilidad predicha en
   10 intervalos de 0,1 y calcule, en cada intervalo y para cada sexo, la proporción real de
   clientes que abandonan; grafique la curva de calibración de cada sexo junto a la diagonal.
   **¿En cuántos intervalos la diferencia entre sexos supera el 5 %? ¿La proporción real se
   parece a la probabilidad predicha (el centro del intervalo)? ¿Por qué un modelo entrenado con
   `class_weight="balanced"` puede estar descalibrado? ¿El clasificador es justo con esta
   definición?**
7. [**Discriminación causal:**](../../ayudas/justicia.md#discriminacion-causal) cree una copia
   idéntica del conjunto de prueba en la que se intercambie el sexo de cada cliente
   (`"Female"` por `"Male"` y al revés), calcule las nuevas decisiones y el porcentaje de clientes
   cuya decisión cambia. **¿A qué porcentaje de clientes les cambia la decisión solo por su sexo?
   ¿Al cambiar de mujer a hombre la probabilidad de abandono sube o baja? Según la regla del 5 %,
   ¿el clasificador es justo?**
8. **Conclusiones:** construya una tabla con una fila por definición y las columnas: valor para
   mujeres, valor para hombres (o porcentaje de decisiones que cambian), diferencia y conclusión
   (justo o no justo).

    **¿Con cuántas definiciones el clasificador es justo y con cuántas no? ¿Por qué no es posible
    cumplir todas a la vez cuando las tasas reales de abandono son distintas? Para el banco, ¿qué
    definición es más importante en este problema y por qué? ¿Bastaría con quitar `gender` del
    modelo para que fuera justo, o hay otras variables que podrían reproducir el mismo sesgo?**

!!! success "Fin de la Práctica 7"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
