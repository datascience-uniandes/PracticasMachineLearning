# Actividad 3: Agrupación por densidad

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md), con las variables ya estandarizadas

1. Retome las variables estandarizadas de la actividad anterior.
2. **Prepare DBSCAN:** grafique la [**curva de k-distancia**](../../ayudas/k-distancia.md) para
   `min_samples` ∈ {10, 20, 34}. **¿A partir de qué distancia sube con fuerza cada curva? ¿Qué
   valores de `eps` sugiere?**
3. [**Entrene DBSCAN**](../../ayudas/dbscan.md) con `eps` ∈ {1, 5, 10} + el `eps` del punto anterior y
   `min_samples` ∈ {10, 20, 34}. Para cada combinación construya una tabla con el número de
   grupos, el porcentaje de [ruido](../../glosario.md#ruido), la
   [**silueta**](../../ayudas/silueta.md), el [**índice de Davies-Bouldin**](../../ayudas/davies-bouldin.md)
   y la [**inercia media**](../../ayudas/inercia.md), calculadas sin los puntos de ruido.
   **¿Cómo cambian el número de grupos y el ruido al aumentar `eps`? ¿Y al aumentar
   `min_samples`?**
4. **Elija la mejor configuración de DBSCAN:** entre las que tengan al menos dos grupos y menos
   del 30 % de ruido, elija la de **mayor silueta**. **¿Los grupos que encontró tienen tamaños
   útiles? ¿Por qué una silueta alta no basta si casi todos los clientes quedan en un solo grupo?**
5. [**Entrene Mean Shift**](../../ayudas/mean-shift.md) con el ancho de ventana estimado para
   `quantile` ∈ {0,1; 0,2; 0,3}, y calcule para cada uno el número de grupos, sus tamaños, la
   silueta, el índice de Davies-Bouldin y la inercia media. **¿Cómo cambia el número de grupos con
   el ancho de ventana? ¿Cuántos grupos tienen menos de 50 clientes?**
6. **Elija la mejor configuración de Mean Shift** con la mayor silueta, y construya una tabla que
   compare el mejor DBSCAN, el mejor Mean Shift y el mejor modelo de la
   [Actividad 2](actividad-2.md). **¿Los algoritmos por densidad mejoran a los basados en
   centroides con estos datos? ¿Qué características del dataset (número de variables, forma de
   las distribuciones) pueden explicar el resultado?**
7. **Caracterice los grupos** del mejor modelo por densidad con estadística descriptiva, en las **unidades
   originales** (no en las estandarizadas):

    - **a)** **Tamaño:** cuántos clientes quedaron en cada grupo y qué porcentaje representan. Incluya el [ruido](../../glosario.md#ruido) como una
      categoría aparte.
    - **b)** **Mediana** de cada variable por grupo, en una tabla.
    - **c)** [**Gráficos de cajas**](../../ayudas/graficos-por-clase.md) por grupo de las
      principales características, para comparar los grupos entre sí.
    - **d)** [**Distribuciones**](../../ayudas/graficos-por-clase.md) por grupo de las principales
      variables (histogramas superpuestos o separados por grupo).
    - **e)** **Quiénes quedaron en cada grupo:** revise algunos clientes de cada grupo y compruebe
      que sus valores corresponden a lo que describen la tabla y los gráficos.

    **¿Qué variables distinguen a cada grupo? ¿Algún grupo es demasiado pequeño o demasiado grande
    para ser útil? ¿Qué tipo de clientes quedaron como ruido?**

8. **Visualice los grupos y el ruido en dos dimensiones** con las dos primeras
   [**componentes principales (PCA)**](../../ayudas/pca.md), coloreando cada cliente según su grupo.
   **¿Dónde se ubican los puntos de ruido frente a los grupos?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
