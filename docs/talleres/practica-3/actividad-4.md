# Actividad 4: Agrupación jerárquica

### Datos de trabajo: el notebook de la [Actividad 3](actividad-3.md), con las variables ya estandarizadas

1. Retome las variables estandarizadas de las actividades anteriores.
2. [**Entrene HDBSCAN**](../../ayudas/hdbscan.md) con `min_cluster_size` ∈ {25, 50, 100, 200} y
   `min_samples` ∈ {`None`, 10}. Para cada combinación construya una tabla con el número de grupos,
   el porcentaje de [ruido](../../glosario.md#ruido), la [**silueta**](../../ayudas/silueta.md),
   el [**índice de Davies-Bouldin**](../../ayudas/davies-bouldin.md) y la
   [**inercia media**](../../ayudas/inercia.md), calculadas sin los puntos de ruido.
   **¿Qué porcentaje de clientes queda como ruido? ¿Cómo cambia con `min_cluster_size` y
   `min_samples`?**
3. **Elija la mejor configuración de HDBSCAN** con la misma regla de la Actividad 3: al menos dos
   grupos, menos del 30 % de ruido y la mayor silueta. **¿Alguna configuración cumple la regla?
   Si ninguna la cumple, ¿qué indica eso sobre la estructura de densidad de los datos?**
4. Grafique los [**dendrogramas**](../../ayudas/dendrograma.md) con enlace `ward`, `complete` y
   `average`, truncados a los últimos 30 grupos. **¿Dónde hay un salto grande en la altura de las
   uniones? ¿Cuántos grupos sugiere cada dendrograma? ¿Qué enlace produce grupos más
   equilibrados?**
5. [**Entrene la agrupación aglomerativa**](../../ayudas/agrupacion-aglomerativa.md) con
   `linkage` ∈ {`"ward"`, `"complete"`, `"average"`} y **K = 2, 3, …, 8**. Para cada combinación
   calcule la silueta, el índice de Davies-Bouldin, la inercia media y el tamaño del grupo más
   grande. **¿Qué enlaces dejan a casi todos los clientes en un solo grupo? ¿Por qué ocurre?**
6. **Elija la mejor configuración aglomerativa** con la mayor silueta entre las que no dejen más
   del 80 % de los clientes en un mismo grupo, y compruebe que el número de grupos sea coherente
   con su dendrograma. **¿El número de grupos elegido coincide con el que sugería el dendrograma?**
7. **Caracterice los grupos** del mejor modelo jerárquico con estadística descriptiva, en las **unidades
   originales** (no en las estandarizadas):

    - **a)** **Tamaño:** cuántos clientes quedaron en cada grupo y qué porcentaje representan.
    - **b)** **Mediana** de cada variable por grupo, en una tabla.
    - **c)** [**Gráficos de cajas**](../../ayudas/graficos-por-clase.md) por grupo de las
      principales características, para comparar los grupos entre sí.
    - **d)** [**Distribuciones**](../../ayudas/graficos-por-clase.md) por grupo de las principales
      variables (histogramas superpuestos o separados por grupo).
    - **e)** **Quiénes quedaron en cada grupo:** revise algunos clientes de cada grupo y compruebe
      que sus valores corresponden a lo que describen la tabla y los gráficos.

    **¿Qué variables distinguen a cada grupo? ¿Algún grupo es demasiado pequeño o demasiado grande
    para ser útil?**

8. **Visualice los grupos en dos dimensiones** con las dos primeras
   [**componentes principales (PCA)**](../../ayudas/pca.md), coloreando cada cliente según su grupo.
   **¿Los grupos se ven separados? ¿Por qué esta vista es solo una aproximación?**
9. **Compare con la Actividad 2:** construya una tabla cruzada entre las etiquetas de este modelo y
   las del mejor modelo de la Actividad 2. **¿Los dos modelos encuentran segmentos parecidos? ¿Qué
   segmentos se mantienen y cuáles cambian?**
10. **Comparación final:** construya una tabla con la silueta, el índice de Davies-Bouldin, la
    inercia media, el número de grupos y el porcentaje de ruido del mejor modelo de cada familia
    (centroides, densidad y jerárquico), y elija la **segmentación final**.
    **¿Qué familia de algoritmos funciona mejor con estos datos y por qué? ¿Qué segmentación le
    entregaría al banco, considerando las métricas, el tamaño de los grupos y qué tan fácil es
    interpretarlos?**

!!! success "Fin de la Práctica 3"
    Guarde los cambios en el notebook. Ha terminado la última actividad de la Práctica 3.
