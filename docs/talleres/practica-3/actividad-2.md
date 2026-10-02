# Actividad 2: Agrupación basada en centroides

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md), con los datos ya tratados

1. Retome el dataset tratado en la actividad anterior y deje solo las variables de comportamiento
   (sin `CUST_ID`). [**Estandarice las variables**](../../ayudas/estandarizar.md).
   **¿Por qué es indispensable escalar antes de agrupar con algoritmos basados en distancias?
   ¿Qué pasaría con una variable como `CREDIT_LIMIT` si no se escala?**
2. [**Entrene K-medias**](../../ayudas/k-medias.md) para **K = 2, 3, …, 10**. Para cada K guarde
   la [**inercia media**](../../ayudas/inercia.md), el
   [**coeficiente de silueta**](../../ayudas/silueta.md) y el
   [**índice de Davies-Bouldin**](../../ayudas/davies-bouldin.md).
3. [**Entrene K-medianas**](../../ayudas/k-medianas.md) para los mismos valores de K y guarde las
   mismas tres métricas.
4. [**Entrene K-medoides**](../../ayudas/k-medoides.md) para los mismos valores de K y guarde las
   mismas tres métricas.
5. **Elija el K ideal de cada algoritmo:**

    - **a)** Grafique el [**método del codo**](../../ayudas/metodo-codo.md) (inercia media frente
      a K) de los tres algoritmos.
    - **b)** Grafique el [**coeficiente de silueta**](../../ayudas/silueta.md) frente a K de los
      tres algoritmos.
    - **c)** Elija para cada algoritmo el K con la **mayor silueta**; use el codo para desempatar
      entre valores parecidos.

    **¿Dónde está el codo de cada curva? ¿El codo y la silueta sugieren el mismo K? ¿Los tres
    algoritmos coinciden?**

6. **Compare los tres algoritmos** con el K elegido: construya una tabla con la silueta, la inercia
   media y el índice de Davies-Bouldin de cada uno, y elija el **mejor modelo** con la mayor
   silueta; si dos son muy parecidos, prefiera el de menor Davies-Bouldin.
   **¿Las tres métricas señalan el mismo modelo? ¿Por qué la inercia media no sirve, por sí
   sola, para comparar modelos con distinto número de grupos?**
7. [**Interprete los grupos**](../../ayudas/interpretar-grupos.md) del mejor modelo:

    - **a)** Calcule el tamaño de cada grupo (número de clientes y porcentaje).
    - **b)** Construya el perfil de cada grupo con la mediana de cada variable en las **unidades
      originales**, y grafique el perfil relativo en un mapa de calor.
    - **c)** Realice [**gráficos de cajas**](../../ayudas/grafico-cajas.md) por grupo de las
      variables que más los diferencian.
    - **d)** Visualice los grupos en dos dimensiones con PCA.
    - **e)** Asigne a cada grupo un nombre que describa su comportamiento.

    **¿Qué distingue a cada segmento de clientes? ¿Qué acción comercial le propondría al banco
    para cada uno? ¿Algún grupo es demasiado pequeño o demasiado grande para ser útil?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
