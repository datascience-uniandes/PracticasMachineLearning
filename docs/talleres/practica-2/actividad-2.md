# Actividad 2: Ingeniería de características

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md), con los datos ya tratados

1. Retome el dataset tratado en la actividad anterior.
2. [**Grafique la relación de cada variable continua con la clase**](../../ayudas/graficos-por-clase.md):
   gráficos de cajas o histogramas de cada variable separados según `churn`.
   **¿Qué variables muestran distribuciones distintas entre los clientes que abandonaron y los que
   no? ¿Cuáles parecen no diferenciarlos?**
3. [**Grafique la tasa de abandono por categoría**](../../ayudas/graficos-por-clase.md) para cada
   variable categórica y binaria. **¿En qué países, géneros o número de productos es más alto el
   abandono? ¿Qué pasa con los miembros activos?**
4. Aplique la [**prueba t-estudiante**](../../ayudas/prueba-t.md) a cada variable continua para
   comparar su media entre las dos clases, y construya una tabla con los
   [valores p](../../glosario.md#valor-p). Para las variables con [sesgo](../../glosario.md#sesgo)
   o con muchos atípicos, aplique también la [**prueba U de Mann-Whitney**](../../ayudas/prueba-u.md). **¿Qué variables tienen una diferencia significativa
   (p < 0,05)? ¿Coincide con lo que vio en los gráficos? ¿Las dos pruebas llegan a la misma
   conclusión? ¿Una diferencia significativa es también una diferencia grande?**
5. Aplique la [**prueba chi-cuadrado**](../../ayudas/chi-cuadrado.md) a cada variable categórica y
   binaria frente a `churn`, y calcule la V de Cramér. **¿Qué variables están relacionadas con el
   abandono? ¿Cuál tiene la relación más fuerte?**
6. **Seleccione las variables** del modelo a partir de los gráficos y las pruebas estadísticas.
   **¿Qué variables descartó y por qué?**
7. Aplique [**codificación one-hot**](../../ayudas/one-hot.md) a las variables categóricas
   seleccionadas. **¿Conviene tratar `products_number` como numérica o como categórica? ¿Por qué?**
8. [**Divida los datos en entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion)
   (60 %, 20 % y 20 %) de forma [**estratificada**](../../ayudas/division-datos.md#estratificada).
   Luego [**impute los valores nulos**](../../ayudas/nulos.md) con la media o la mediana calculada
   **solo con el conjunto de entrenamiento**, y aplique esos mismos valores a validación y prueba.
   **¿Qué proporción de clientes que abandonan hay en cada conjunto? ¿Por qué es importante
   estratificar cuando hay [desbalance de clases](../../glosario.md#desbalance-de-clases)? ¿Por qué
   no se deben calcular los valores de imputación con todo el dataset?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
