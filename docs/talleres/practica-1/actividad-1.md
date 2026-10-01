# Actividad 1: Entendimiento de datos

### Datos de trabajo: [forestfires.csv](https://archive.ics.uci.edu/dataset/162/forest+fires) ([diccionario de datos](index.md))

1. Cree un nuevo notebook y [**cargue el dataset**](../../ayudas/cargar-dataset.md) de trabajo.
2. [**Explore la estructura del dataset**](../../ayudas/explorar-estructura.md).
   **¿Cuántos registros hay? ¿Qué características tiene cada registro y de qué tipo son?**
   ¿Cuáles son [continuas](../../ayudas/glosario.md#variable-continua) y cuáles
   [categóricas](../../ayudas/glosario.md#variable-categorica)?
3. Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) e
   [**histogramas**](../../ayudas/histograma.md) para las variables continuas.
   **¿Qué puede concluir de la forma de cada [distribución](../../ayudas/glosario.md#distribucion)?
   ¿Qué variables presentan [sesgo](../../ayudas/glosario.md#sesgo) o
   [valores atípicos](../../ayudas/glosario.md#outlier)?**
4. Realice [**gráficos de barras**](../../ayudas/grafico-barras.md) para las variables
   categóricas. **¿En qué meses y días se concentran los incendios? ¿Qué puede decir del
   balance entre categorías?**
5. **Estudie la [variable objetivo](../../ayudas/glosario.md#variable-objetivo)** `area`:
   revise su [histograma](../../ayudas/histograma.md) y sus valores.
   **¿Qué proporción de incendios tiene un área quemada igual a cero? ¿Entre qué valores se mueve
   el resto? ¿Es una distribución simétrica?**
6. Revise las dimensiones de calidad de los datos.
   **¿Cuántos [valores nulos](../../ayudas/nulos.md) hay? ¿Cuántos
   [registros duplicados](../../ayudas/duplicados.md)? ¿Qué
   [valores inválidos](../../ayudas/valores-invalidos.md) o
   [atípicos](../../ayudas/valores-atipicos.md) encuentra?**
   Compárelos con los rangos del diccionario de datos.
7. **Tratamiento de datos:** [**repare los valores nulos**](../../ayudas/nulos.md).
   **¿Qué estrategia usó (eliminar o imputar) y por qué?**
8. **Tratamiento de datos:** [**elimine los registros duplicados**](../../ayudas/duplicados.md).
   **¿Cuántos registros quedan?**
9. **Tratamiento de datos:** revise los [outliers](../../ayudas/glosario.md#outlier) y
   [**aplique clipping**](../../ayudas/valores-atipicos.md) a la variable objetivo.
   **¿Qué percentiles utilizó? ¿Cómo cambian el gráfico de caja y las estadísticas descriptivas
   antes y después del tratamiento?**

!!! success "Fin de la Actividad 1"
    Ha terminado la primera actividad de la Práctica 1. Guarde los cambios en su notebook:
    el dataset tratado es el punto de partida de la siguiente actividad.
