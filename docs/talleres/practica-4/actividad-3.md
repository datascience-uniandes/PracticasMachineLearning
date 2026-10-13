# Actividad 3: Cálculo de impacto

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

!!! abstract "Contexto de la empresa"
    El abandono de clientes es uno de los mayores costos de un banco: atraer a un cliente nuevo
    cuesta varias veces más que retener a uno actual, y un cliente que se va **no se recupera**.
    Un banco europeo con operación en **Francia, Alemania y España** tiene una cartera de unos
    10.000 clientes y cerca del **20 %** de ellos abandona el banco cada año; en Alemania, donde
    los saldos son más altos, la tasa de abandono es casi el doble que en los otros dos países.

    Suponga que el banco lanza cada mes una campaña de retención dirigida solo a los clientes
    que el modelo marca como riesgo de abandono, y que les ofrece un beneficio (un descuento en
    comisiones o un bono) para que se queden. La oferta convence al **50 %** de los clientes que
    iban a abandonar, pero se paga por **todos** los clientes contactados, abandonen o no. El
    valor de un cliente retenido y el costo de la oferta cambian según el país:

    | País | Valor de un cliente retenido \( V \) | Costo de la oferta por cliente contactado \( c \) |
    |------|:------------------------------------:|:-------------------------------------------------:|
    | Francia | 900 € | 220 € |
    | Alemania | 1.500 € | 300 € |
    | España | 850 € | 150 € |

    Si usted desarrolla el modelo de clasificación que predice qué clientes van a abandonar,
    **¿cuánto gana el banco cada mes?, ¿a partir de qué momento el proyecto tiene un ROI de 0? y
    ¿qué tan bueno tiene que ser el modelo para que se pague en tres meses?** Suponga que la tasa
    de abandono del dataset es anual.

1. **Presupueste el proyecto.** Construya una tabla con la
   [**inversión**](../../ayudas/impacto-negocio.md#retorno-de-la-inversion) del proyecto: perfiles
   del equipo (por ejemplo, científico de datos, ingeniero de datos, líder de negocio), su costo
   mensual y los meses de dedicación, infraestructura, integración con los sistemas del banco y
   cualquier otro rubro que considere necesario. **¿Cuál es la inversión total? ¿Qué rubro pesa
   más?**
2. **Calcule los clientes y los abandonos de cada país:** el número de clientes de cada país en
   el dataset y los clientes que abandonan cada mes, \( M = \) clientes \( \times \) tasa de
   abandono anual \( / 12 \). **¿En qué país se pierden más clientes al mes?**
3. **Calcule el valor esperado con la [fórmula de
   Provost](../../ayudas/impacto-negocio.md#formula-de-provost-valor-esperado):** construya la
   matriz de costo-beneficio de cada país y, con la matriz de confusión de cada uno de los cuatro
   modelos en el [conjunto de prueba](../../glosario.md#conjunto-prueba) (umbral de 0,5),
   restringida a los clientes de cada país, calcule el valor esperado por cliente. Multiplíquelo
   por los clientes del país y divida por 12 para obtener el beneficio mensual, y
   [**sume los tres países**](../../ayudas/impacto-negocio.md#impacto-por-segmento).
   **¿Qué modelo genera el mayor beneficio mensual? ¿Hay algún país en el que un modelo pierda
   dinero?**
4. **Aplique la [fórmula
   simplificada](../../ayudas/impacto-negocio.md#formula-simplificada-ganancia-por-prediccion-ajustada)
   y la [fórmula de equilibrio](../../ayudas/impacto-negocio.md#formula-de-equilibrio):** calcule
   la ganancia por cliente contactado \( \hat{a} \) y la precisión de equilibrio
   \( P_e = c / (r \cdot V) \) de cada país, y compárela con la precisión de cada modelo en ese
   país. **¿En qué país se le exige más precisión al modelo y por qué? ¿Por qué un modelo con
   buena sensibilidad puede perder dinero?**
5. **Analice el [punto de
   equilibrio](../../ayudas/impacto-negocio.md#punto-de-equilibrio-y-periodo-de-recuperacion):**
   para cada modelo, calcule el mes en el que el [ROI](../../glosario.md#roi) llega a 0 y el ROI a
   12 meses, y grafique el beneficio acumulado menos la inversión mes a mes. Si un modelo no tiene
   punto de equilibrio, calcule **a partir de qué valor** aparecería: la precisión mínima, el
   costo máximo de la oferta o la tasa de éxito mínima. **¿En cuántos meses recupera la
   inversión el mejor modelo? ¿Qué tendría que cambiar para que el peor tuviera retorno?**
6. **Elija el umbral con el impacto:** calcule el beneficio mensual de cada modelo para
   distintos [umbrales de decisión](../../glosario.md#umbral-decision) en validación, elija el
   umbral que lo maximiza y repórtelo en prueba. Si lo considera conveniente, use un umbral
   distinto en cada país. **¿El mejor umbral es 0,5? ¿Cuántos meses se ahorra en el periodo de
   recuperación? ¿Conviene hacer la campaña en los tres países?**
7. **Recuperar la inversión en 3 meses:** la gerencia pide que el proyecto se pague en un
   trimestre. Con la [condición para \( k = 3 \)
   meses](../../ayudas/impacto-negocio.md#que-modelo-se-necesita-para-recuperar-la-inversion-en-k-meses),
   suponiendo la misma precisión y sensibilidad en los tres países y sumando los países en el
   denominador, grafique la sensibilidad mínima según la precisión y ubique los cuatro modelos
   como puntos en el plano. **¿Qué modelos se pagan en tres meses? Para la precisión de su mejor
   modelo, ¿qué sensibilidad necesitaría? Y para su sensibilidad, ¿qué precisión? ¿Es realista
   alcanzar esos valores o hay que ajustar el presupuesto o el plazo?**
8. **Conclusiones:** construya una tabla con el F1 de validación, el resultado de las pruebas de
   la Actividad 2, el beneficio mensual, el mes de equilibrio y el ROI a 12 meses de los cuatro
   modelos.

    **En la configuración 2, ¿dos modelos con un F1 parecido producen el mismo impacto? ¿Por qué?
    ¿Qué modelo, qué umbral y qué países le recomendaría a la gerencia? ¿El proyecto se paga en
    el plazo que pide? ¿Cómo cambia su recomendación cuando, además de las métricas, considera
    las pruebas estadísticas y el dinero?**

!!! success "Fin de la Práctica 4"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
