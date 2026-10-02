# Actividad 1: Entendimiento de datos

### Datos de trabajo: [churn.csv](../../datos/churn.md) ([diccionario de datos](../../datos/churn.md#diccionario-de-datos))

1. Cree un nuevo notebook y [**cargue el dataset**](../../ayudas/cargar-dataset.md) de trabajo.
2. [**Explore la estructura del dataset**](../../ayudas/explorar-estructura.md).
   **¿Cuántos registros hay? ¿Qué características tiene cada registro y de qué tipo son?**
   ¿Cuáles son [continuas](../../glosario.md#variable-continua), cuáles
   [categóricas](../../glosario.md#variable-categorica) y cuáles binarias (0 o 1)?
3. Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) e
   [**histogramas**](../../ayudas/histograma.md) para las variables continuas.
   **¿Qué puede concluir de la forma de cada [distribución](../../glosario.md#distribucion)?
   ¿Qué variables presentan [sesgo](../../glosario.md#sesgo) o
   [valores atípicos](../../glosario.md#outlier)? ¿Alguna variable concentra muchos registros en
   un solo valor?**
4. Realice [**gráficos de barras**](../../ayudas/grafico-barras.md) para las variables
   categóricas y binarias. **¿En qué países, géneros y número de productos se concentran los
   clientes? ¿Qué puede decir del balance entre categorías?**
5. **Estudie la [variable objetivo](../../glosario.md#variable-objetivo)** `churn`:
   realice su [gráfico de barras](../../ayudas/grafico-barras.md) y calcule la proporción de cada
   clase. **¿Qué proporción de clientes abandonó el banco? ¿Las clases están balanceadas? ¿Qué
   implica el [desbalance de clases](../../glosario.md#desbalance-de-clases) para entrenar y
   evaluar un modelo de clasificación?**
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
7. **Tratamiento de duplicados:** [**elimine los registros duplicados**](../../ayudas/duplicados.md).
   **¿Cuántos registros quedan?**
8. **Tratamiento de outliers:** revise los [outliers](../../glosario.md#outlier) y
   [**aplique clipping**](../../ayudas/valores-atipicos.md) a las variables continuas que los
   presenten. **¿Qué variables y qué percentiles utilizó? ¿Cómo cambian el gráfico de caja y las
   estadísticas descriptivas antes y después del tratamiento? ¿Por qué en este caso no se aplica
   clipping a la variable objetivo?**
9. **Tratamiento de nulos:** [**repare los valores nulos**](../../ayudas/nulos.md).
   Si los nulos son menos del 5 % de los datos, es importante imputarlos: pruebe con la
   **media** y con la **mediana**, y vuelva a graficar los [histogramas](../../ayudas/histograma.md)
   y [gráficos de cajas](../../ayudas/grafico-cajas.md) de las variables imputadas.
   **¿Qué diferencias produce cada opción en la distribución?** Elimine registros o columnas
   solo si la cantidad de nulos es demasiado alta. **Este paso es solo exploratorio:** no conserve
   la imputación para la siguiente actividad. La imputación definitiva se hace después de dividir
   los datos en [**conjuntos de entrenamiento y prueba**](../../ayudas/division-datos.md), con
   valores calculados solo con el entrenamiento, para evitar la
   [fuga de datos](../../glosario.md#fuga-de-datos).

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
