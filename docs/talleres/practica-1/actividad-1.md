# Actividad 1: Entendimiento de datos

### Datos de trabajo: [forestfires.csv](../../datos/forestfires.md) ([diccionario de datos](../../datos/forestfires.md#diccionario-de-datos))

1. Cree un nuevo notebook y [**cargue el dataset**](../../ayudas/cargar-dataset.md) de trabajo.
2. [**Explore la estructura del dataset**](../../ayudas/explorar-estructura.md).
   **¿Cuántos registros hay? ¿Qué características tiene cada registro y de qué tipo son?**
   ¿Cuáles son [continuas](../../glosario.md#variable-continua) y cuáles
   [categóricas](../../glosario.md#variable-categorica)?
3. Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) e
   [**histogramas**](../../ayudas/histograma.md) para las variables continuas.
   **¿Qué puede concluir de la forma de cada [distribución](../../glosario.md#distribucion)?
   ¿Qué variables presentan [sesgo](../../glosario.md#sesgo) o
   [valores atípicos](../../glosario.md#outlier)?**
4. Realice [**gráficos de barras**](../../ayudas/grafico-barras.md) para las variables
   categóricas. **¿En qué meses y días se concentran los incendios? ¿Qué puede decir del
   balance entre categorías?**
5. **Estudie la [variable objetivo](../../glosario.md#variable-objetivo)** `area`:
   revise su [histograma](../../ayudas/histograma.md) y sus valores.
   **¿Qué proporción de incendios tiene un área quemada igual a cero? ¿Entre qué valores se mueve
   el resto? ¿Es una distribución simétrica?**
6. Revise las [**dimensiones de calidad de los datos**](../../ayudas/dimensiones-calidad.md):
    - [**Unicidad**](../../ayudas/duplicados.md): cada registro aparece una sola vez.
      **¿Cuántos registros duplicados hay?**
    - [**Completitud**](../../ayudas/nulos.md): no faltan valores.
      **¿Cuántos valores nulos hay y en qué columnas?**
    - [**Consistencia**](../../ayudas/inconsistencias.md): un mismo dato se representa siempre
      igual (formato, tipo y escritura). **¿Hay categorías escritas de formas distintas o
      columnas con un tipo de dato incorrecto?**
    - [**Validez**](../../ayudas/valores-invalidos.md): los valores cumplen las reglas de su
      variable. **¿Qué valores están fuera de los rangos del diccionario de datos?**
7. **Tratamiento de datos:** [**repare los valores nulos**](../../ayudas/nulos.md).
   Si los nulos son menos del 5 % de los datos, es importante imputarlos: pruebe con la
   **media** y con la **mediana**, y vuelva a graficar los [histogramas](../../ayudas/histograma.md)
   y [gráficos de cajas](../../ayudas/grafico-cajas.md) de las variables imputadas.
   **¿Qué diferencias produce cada opción en la distribución?** Elimine registros o columnas
   solo si la cantidad de nulos es demasiado alta.
8. **Tratamiento de datos:** [**elimine los registros duplicados**](../../ayudas/duplicados.md).
   **¿Cuántos registros quedan?**
9. **Tratamiento de datos:** revise los [outliers](../../glosario.md#outlier) y
   [**aplique clipping**](../../ayudas/valores-atipicos.md) a la variable objetivo.
   **¿Qué percentiles utilizó? ¿Cómo cambian el gráfico de caja y las estadísticas descriptivas
   antes y después del tratamiento?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
