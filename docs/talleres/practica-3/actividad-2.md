# Actividad 2: Agrupación basada en centroides

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md), con los datos ya tratados

1. Retome el dataset tratado en la actividad anterior y deje solo las variables de comportamiento
   (sin `CUST_ID`). [**Estandarice las variables**](../../ayudas/estandarizar.md).
   **¿Por qué es indispensable escalar antes de agrupar con algoritmos basados en distancias?
   ¿Qué pasaría con una variable como `CREDIT_LIMIT` si no se escala?**
2. [**Entrene K-medias**](../../ayudas/k-medias.md) para **K = 2, 3, …, 10** y elija su K ideal:

    - **a)** Grafique el [**método del codo**](../../ayudas/metodo-codo.md) con la
      [inercia media](../../ayudas/inercia.md) de cada K.
    - **b)** Grafique el [**coeficiente de silueta**](../../ayudas/silueta.md) de cada K.
    - **c)** Elija el K con la **mayor silueta**; use el codo para desempatar entre valores
      parecidos.

    **¿Dónde está el codo? ¿El codo y la silueta sugieren el mismo K?**

3. [**Entrene K-medoides**](../../ayudas/k-medoides.md) para los mismos valores de K y elija su K
   ideal:

    - **a)** Grafique el [**método del codo**](../../ayudas/metodo-codo.md).
    - **b)** Grafique el [**coeficiente de silueta**](../../ayudas/silueta.md).
    - **c)** Elija el K con la mayor silueta.

    **¿Los tres algoritmos coinciden en el número de grupos?**

4. **Compare los tres algoritmos** con el K elegido: construya una tabla con la
   [**silueta**](../../ayudas/silueta.md), la [**inercia media**](../../ayudas/inercia.md) y el
   [**índice de Davies-Bouldin**](../../ayudas/davies-bouldin.md) de cada uno, y elija el **mejor
   modelo** con la mayor silueta; si dos son muy parecidos, prefiera el de menor Davies-Bouldin.
   **¿Las tres métricas señalan el mismo modelo? ¿Por qué la inercia media no sirve, por sí sola,
   para comparar modelos con distinto número de grupos?**
5. **Tamaño de los grupos:** calcule cuántos clientes hay en cada grupo del mejor modelo y qué
   porcentaje representan. **¿Algún grupo es demasiado pequeño o demasiado grande para ser útil?**
6. **Perfil de los grupos:** calcule la mediana de cada variable por grupo en las **unidades
   originales** (no en las estandarizadas) y grafique el perfil relativo de cada grupo frente al
   total en un mapa de calor. **¿Qué variables distinguen a cada grupo?**
7. Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) por grupo de las variables que más
   los diferencian. **¿Los grupos se separan con claridad en esas variables o se traslapan?**
8. **Visualice los grupos en dos dimensiones** con las dos primeras componentes de PCA, coloreando
   cada cliente según su grupo. **¿Los grupos se ven separados? ¿Por qué esta vista es solo una
   aproximación?**
9. **Nombre los segmentos:** asigne a cada grupo un nombre corto que describa su comportamiento
    (por ejemplo, «compradores frecuentes» o «usuarios de avances en efectivo»).
    **¿Qué acción comercial le propondría al banco para cada segmento?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
