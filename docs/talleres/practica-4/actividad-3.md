# Actividad 3: Cálculo de impacto

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

Lea el [**contexto de la empresa**](../../datos/churn.md#contexto-de-la-empresa) en la página del
dataset: allí están los supuestos de la campaña de retención y el valor del cliente y el costo de
la oferta en cada país.

Si usted desarrolla el modelo de clasificación que predice qué clientes van a abandonar,
**¿cuánto gana el banco cada mes?, ¿a partir de qué momento el proyecto tiene un ROI de 0? y
¿qué tan bueno tiene que ser el modelo para que se pague en tres meses?** Suponga que la tasa
de abandono del dataset es anual.

1. **Revise el presupuesto del proyecto.** Use la siguiente tabla como la
   [**inversión**](../../ayudas/impacto-negocio.md#retorno-de-la-inversion) del proyecto en todos
   los cálculos de esta actividad:

    | Rubro | Costo mensual | Meses | Total |
    |---|---|---|---|
    | Científico de datos | 6.000 € | 3 | 18.000 € |
    | Ingeniero de datos | 5.500 € | 3 | 16.500 € |
    | Ingeniero de ML (despliegue y monitoreo) | 6.000 € | 2 | 12.000 € |
    | Líder de negocio (50 % de dedicación) | 3.500 € | 3 | 10.500 € |
    | Infraestructura en la nube | 1.500 € | 3 | 4.500 € |
    | Integración con el CRM y los sistemas del banco | — | — | 8.000 € |
    | Capacitación del equipo comercial | — | — | 3.000 € |
    | Contingencia (10 %) | — | — | 7.250 € |
    | **Inversión total** | | | **79.750 €** |

    **¿Qué rubro pesa más? ¿Qué proporción de la inversión corresponde a personas? ¿Qué rubros
    faltarían en un proyecto real (por ejemplo, costos que se repiten cada mes después del
    lanzamiento)?**

2. **Calcule los valores promedio de la cartera:** con la proporción de clientes de cada país en
   el dataset, calcule el **valor promedio ponderado** de un cliente retenido,
   \( \bar{V} = \sum_g w_g V_g \), y el **costo promedio ponderado** de la oferta,
   \( \bar{c} = \sum_g w_g c_g \), donde \( w_g \) es la proporción de clientes del país \( g \).
   Calcule también los clientes que abandonan cada mes en toda la cartera,
   \( M = \) clientes \( \times \) tasa de abandono anual \( / 12 \). Use estos valores en toda
   la Parte 1. **¿Qué país pesa más en los promedios?**
3. **Calcule el valor esperado con la [fórmula de
   Provost](../../ayudas/impacto-negocio.md#formula-de-provost-valor-esperado):** construya la
   matriz de costo-beneficio con \( \bar{V} \) y \( \bar{c} \). Retome los **dos modelos elegidos
   en la Actividad 2**, uno por configuración, según las pruebas estadísticas. Con la matriz de
   confusión de cada uno en el [conjunto de prueba](../../glosario.md#conjunto-prueba) (umbral de
   0,5), calcule el valor esperado por cliente. Multiplíquelo por el número de clientes y divida
   por 12 para obtener el beneficio mensual. **¿Los dos modelos generan un beneficio positivo?
   ¿Cuál genera el mayor?**
4. **Aplique la [fórmula
   simplificada](../../ayudas/impacto-negocio.md#formula-simplificada-ganancia-por-prediccion-ajustada)
   y la [fórmula de equilibrio](../../ayudas/impacto-negocio.md#formula-de-equilibrio):** calcule
   la ganancia por cliente contactado \( \hat{a} \) de cada modelo y la precisión de equilibrio
   \( P_e = \bar{c} / (r \cdot \bar{V}) \), y compárela con la precisión de cada modelo.
   **¿Alguno de los dos modelos queda por debajo? ¿Por qué un modelo con buen [recall](../../ayudas/recall.md) puede
   perder dinero?**
5. **Analice el [punto de
   equilibrio](../../ayudas/impacto-negocio.md#punto-de-equilibrio-y-periodo-de-recuperacion):**
   para cada modelo, calcule el mes en el que el [ROI](../../glosario.md#roi) llega a 0 y el ROI a
   12 meses, y grafique el beneficio acumulado menos la inversión mes a mes. Si un modelo no tiene
   punto de equilibrio, calcule **a partir de qué valor** aparecería: la precisión mínima, el
   costo máximo de la oferta o la tasa de éxito mínima. **¿En cuántos meses recupera la
   inversión el mejor modelo? ¿Qué tendría que cambiar para que el otro recupere la inversión
   antes?**
6. **Elija el umbral con el impacto:** pruebe cuatro variaciones del
   [umbral de decisión](../../glosario.md#umbral-decision) respecto a 0,5: bájelo 0,1 y 0,2
   (0,4 y 0,3) y súbalo 0,1 y 0,2 (0,6 y 0,7). Para cada modelo y cada umbral, incluido 0,5,
   calcule la precisión, el recall y el beneficio mensual en validación. Elija el umbral que
   maximiza el beneficio de cada modelo y reporte su resultado en prueba. **¿Qué pasa con la
   precisión y el recall al subir el umbral? ¿Y al bajarlo? ¿El mejor umbral es 0,5? ¿Cambia el
   mejor modelo? ¿Cuántos meses se ahorra en el periodo de recuperación?**
7. **Recuperar la inversión en 3 meses:** la gerencia pide que el proyecto se pague en un
   trimestre. Con la [condición para \( k = 3 \)
   meses](../../ayudas/impacto-negocio.md#que-modelo-se-necesita-para-recuperar-la-inversion-en-k-meses),
   grafique el recall mínimo según la precisión y ubique los dos modelos como puntos en el
   plano, con el umbral elegido en el paso 6. **¿Alguno de los dos se paga en tres meses? Para la
   precisión de su mejor modelo, ¿qué recall necesitaría? Y para su recall, ¿qué precisión? ¿Es
   realista alcanzar esos valores o hay que ajustar el presupuesto o el plazo?**
8. **Segmente por país:** calcule los clientes que abandonan cada mes en cada país y repita el
   paso 3 por separado para Francia, Alemania y España, con los valores \( V_g \) y \( c_g \) de
   cada país y la matriz de confusión restringida a sus clientes. Luego
   [**sume los tres países**](../../ayudas/impacto-negocio.md#impacto-por-segmento).
   **¿El beneficio total cambia respecto al cálculo global? ¿Por qué el promedio ponderado por
   clientes no da el mismo resultado? ¿Hay algún país en el que uno de los modelos pierda
   dinero?**
9. **Compare la precisión de equilibrio de cada país** con la precisión de cada modelo en ese
   país. **¿En qué país se le exige más precisión al modelo y por qué? ¿El mismo modelo es el
   mejor en los tres países? ¿Conviene hacer la campaña en los tres países o usar un umbral distinto en cada
   uno?**
10. **Conclusiones:** construya una tabla con **los dos mejores modelos**, los elegidos en la
    Actividad 2, cada uno **con el umbral que maximiza el beneficio** (paso 6): F1 de validación,
    resultado de las pruebas de la Actividad 2, beneficio mensual global y por país, mes de
    equilibrio y ROI a 12 meses.

    **¿El modelo con mejor F1 es también el de mayor impacto? ¿Por qué dos modelos con un F1
    parecido pueden producir un impacto distinto? ¿Qué se gana y qué se pierde al hacer el
    cálculo global en lugar de segmentarlo? ¿Qué modelo, qué umbral y qué países le recomendaría a la gerencia? 
    ¿El proyecto se paga en el plazo que pide?**

!!! success "Fin de la Práctica 4"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
