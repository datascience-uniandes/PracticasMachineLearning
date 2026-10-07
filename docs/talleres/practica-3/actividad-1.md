# Actividad 1: Entendimiento de datos

### Datos de trabajo: [tarjetas.csv](../../datos/tarjetas.md) ([diccionario de datos](../../datos/tarjetas.md#diccionario-de-datos))

1. Cree un nuevo notebook y [**cargue el dataset**](../../ayudas/cargar-dataset.md) de trabajo.
2. [**Explore la estructura del dataset**](../../ayudas/explorar-estructura.md).
   **¿Cuántos registros hay? ¿Qué características tiene cada registro y de qué tipo son?**
   ¿Cuáles son montos [continuos](../../glosario.md#variable-continua), cuáles son frecuencias
   (proporciones entre 0 y 1) y cuáles son conteos? ¿Qué columna no describe el comportamiento
   del cliente? **¿Hay una variable objetivo?**
3. Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) e
   [**histogramas**](../../ayudas/histograma.md) para las variables continuas.
   **¿Qué puede concluir de la forma de cada [distribución](../../glosario.md#distribucion)?
   ¿Qué variables presentan [sesgo](../../glosario.md#sesgo) o
   [valores atípicos](../../glosario.md#outlier)? ¿Qué proporción de clientes tiene un valor de 0
   en compras o en avances en efectivo?**
4. Realice [**gráficos de barras**](../../ayudas/grafico-barras.md) para las frecuencias y los
   conteos. **¿Qué tan frecuente es que los clientes compren, compren a cuotas o pidan avances en
   efectivo? ¿Cuántos clientes tienen un periodo de servicio (`TENURE`) menor a 12 meses?**
5. **Estudie las relaciones entre las variables:** calcule la
   [**matriz de correlación**](../../ayudas/correlacion.md) y realice
   [**gráficos de dispersión**](../../ayudas/grafico-dispersion.md) de los pares más
   correlacionados.
   **¿Qué variables están muy correlacionadas entre sí? ¿Qué variables describen comportamientos
   parecidos (por ejemplo, compras frente a avances en efectivo)? ¿Por qué esto importa al agrupar
   clientes?**
6. Revise las [**dimensiones de calidad de los datos**](../../ayudas/dimensiones-calidad.md):
    - [**Unicidad**](../../ayudas/duplicados.md): cada registro aparece una sola vez.
      **¿Cuántos registros duplicados hay?**
    - [**Completitud**](../../ayudas/nulos.md): no faltan valores.
      **¿Cuántos valores nulos hay y en qué columnas?**
    - [**Consistencia**](../../ayudas/inconsistencias.md): un mismo dato se representa siempre
      igual (formato, tipo, unidades y escritura). **¿Hay identificadores escritos de formas
      distintas o frecuencias registradas en otra escala? ¿`PURCHASES` es siempre la suma de
      `ONEOFF_PURCHASES` e `INSTALLMENTS_PURCHASES`?**
    - [**Validez**](../../ayudas/valores-invalidos.md): los valores cumplen las reglas de su
      variable. **¿Qué valores están fuera de los rangos del diccionario de datos?**
7. **Tratamiento de duplicados:** [**elimine los registros duplicados**](../../ayudas/duplicados.md).
   **¿Cuántos registros quedan?**
8. **Tratamiento de valores inválidos:** [**aplique clipping**](../../ayudas/valores-invalidos.md#recortar-al-rango-valido)
   para llevar cada valor fuera de rango al límite más cercano del rango válido del diccionario de
   datos (por ejemplo, montos y conteos mayores o iguales que 0 y frecuencias entre 0 y 1). Las
   frecuencias registradas en porcentaje (de 0 a 100) están en otra escala: divídalas por 100
   antes de recortar. Unifique también la escritura de `CUST_ID`.
   **¿Cuántos valores recortó en cada variable? ¿En qué casos el clipping no es adecuado y conviene
   más marcar el valor como nulo?**
9. **Tratamiento de outliers:** revise los [outliers](../../glosario.md#outlier) y
   [**aplique clipping**](../../ayudas/valores-atipicos.md) a las variables continuas que los
   presenten. **¿Qué variables y qué percentiles utilizó? ¿Cómo cambian el gráfico de caja y las
   estadísticas descriptivas antes y después del tratamiento? ¿Por qué los valores extremos
   pueden afectar a un algoritmo de agrupación?**
10. **Tratamiento de nulos:** [**repare los valores nulos**](../../ayudas/nulos.md).
    Si los nulos son menos del 5 % de los datos, es importante imputarlos: pruebe con la
    **media** y con la **mediana**, y vuelva a graficar los [histogramas](../../ayudas/histograma.md)
    y [gráficos de cajas](../../ayudas/grafico-cajas.md) de las variables imputadas.
    **¿Qué diferencias produce cada opción en la distribución?** Elimine registros o columnas
    solo si la cantidad de nulos es demasiado alta. Como en la agrupación no se separa un conjunto
    de prueba, **conserve la imputación elegida** para la siguiente actividad.

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
