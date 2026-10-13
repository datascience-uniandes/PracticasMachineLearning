# Actividad 3: Cálculo de impacto

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

!!! abstract "Contexto de la empresa"
    Un banco europeo con operación en **Francia, Alemania y España** tiene una cartera de unos
    10.000 clientes, y cerca del **20 %** de ellos abandona el banco cada año. Cada cliente que se
    va deja de generar ingresos por su saldo y por los productos que tenía contratados, y el banco
    **no recupera a los clientes que ya se fueron**: atraer uno nuevo cuesta mucho más que
    retener a uno actual. El área de analítica propone un proyecto para predecir qué clientes
    van a abandonar y lanzar cada mes una campaña de retención dirigida solo a ellos. La gerencia
    está dispuesta a financiarlo, pero antes de aprobar el presupuesto pregunta: **¿cuánto cuesta
    el proyecto?, ¿cuánto gana el banco cada mes?, ¿en cuánto tiempo se recupera la inversión? y
    ¿qué tan bueno tiene que ser el modelo para que valga la pena?**

1. **Presupueste el proyecto.** Construya una tabla con la [**inversión del
   proyecto**](../../ayudas/impacto-negocio.md#elementos-del-calculo) \( I \): perfiles del
   equipo (por ejemplo, científico de datos, ingeniero de datos, líder de negocio), su costo
   mensual y los meses de dedicación, infraestructura, integración con los sistemas del banco y
   cualquier otro rubro que considere necesario. Defina también y justifique los supuestos de la
   campaña: el costo de la oferta por cliente contactado \( c \), el valor de un cliente retenido
   \( V \) (estímelo con los datos, por ejemplo, a partir del saldo y del número de productos) y la
   tasa de éxito \( r \). Calcule los clientes que abandonan cada mes \( M \), suponiendo que la
   tasa de abandono del dataset es anual. **¿Cuál es la inversión total? ¿Qué rubro pesa más?
   ¿Qué supuesto le genera más incertidumbre?**
2. **Calcule el beneficio con la [fórmula
   simplificada](../../ayudas/impacto-negocio.md#formula-simplificada-del-beneficio)**
   \( B = R \cdot M \left( r \cdot V - c / P \right) \) para los cuatro modelos, con la precisión
   y la sensibilidad de cada uno en el [conjunto de prueba](../../glosario.md#conjunto-prueba) y
   el umbral de 0,5. **¿Qué modelos generan un beneficio mensual positivo? ¿Qué papel juega la
   sensibilidad y qué papel juega la precisión en la fórmula?**
3. **Calcule la [precisión de
   equilibrio](../../ayudas/impacto-negocio.md#precision-de-equilibrio)**
   \( P^{*} = c / (r \cdot V) \) y compárela con la precisión de cada modelo. **¿Qué modelos la
   superan? ¿Por qué un modelo con buena sensibilidad puede perder dinero?**
4. **Analice el [retorno de la
   inversión](../../ayudas/impacto-negocio.md#retorno-de-la-inversion-y-punto-de-equilibrio):**
   para cada modelo con beneficio positivo, calcule el periodo de recuperación \( t^{*} = I / B \)
   y el [ROI](../../glosario.md#roi) a 12 meses, y grafique el beneficio acumulado menos la
   inversión mes a mes, marcando el [punto de equilibrio](../../glosario.md#punto-equilibrio).
   Si algún modelo no tiene punto de equilibrio, calcule **a partir de qué valor** aparecería: la
   precisión mínima, el costo máximo por contacto o la tasa de éxito mínima. **¿En cuántos meses
   recupera la inversión el mejor modelo? ¿Qué tendría que cambiar para que el peor modelo
   tuviera retorno?**
5. **Elija el umbral con el impacto:** calcule la precisión, la sensibilidad y el beneficio
   mensual de cada modelo para distintos [umbrales de
   decisión](../../glosario.md#umbral-decision) en validación, elija el umbral que maximiza el
   beneficio y repórtelo en prueba. **¿El mejor umbral es 0,5? ¿Cuántos meses se ahorra en el
   periodo de recuperación al cambiar el umbral?**
6. **Recuperar la inversión en 3 meses:** la gerencia pide que el proyecto se pague en un
   trimestre. Con la [condición para \( k = 3 \)
   meses](../../ayudas/impacto-negocio.md#que-modelo-se-necesita-para-recuperar-la-inversion-en-k-meses),
   grafique la curva de sensibilidad mínima según la precisión y ubique los cuatro modelos como
   puntos en el plano. **¿Qué modelos quedan por encima de la curva? Para la precisión de su
   mejor modelo, ¿qué sensibilidad necesitaría? Y para su sensibilidad, ¿qué precisión? ¿Es
   realista alcanzar esos valores o hay que ajustar el presupuesto o el plazo?**
7. **Impacto por país:** en la práctica, el valor de un cliente y el costo de retenerlo no son
   iguales en los tres países. Defina un valor \( V_g \) y un costo \( c_g \) distintos para
   Francia, Alemania y España (por ejemplo, a partir del saldo medio de cada país) y calcule los
   abandonos mensuales \( M_g \) de cada uno. Con el mejor modelo, [**calcule el impacto por
   país**](../../ayudas/impacto-negocio.md#impacto-por-segmento): la precisión y la sensibilidad
   en los clientes de cada país, su precisión de equilibrio y su beneficio mensual.
   **¿En qué país es más rentable la campaña? ¿Hay algún país donde el modelo pierda dinero?
   ¿Conviene hacer la campaña en los tres países o usar un umbral distinto en cada uno? ¿Cómo
   cambian el periodo de recuperación y la respuesta del paso 6?**
8. **Conclusiones:** construya una tabla con el F1 de validación, el resultado de las pruebas de
   la Actividad 2, el beneficio mensual, el periodo de recuperación y el ROI a 12 meses de los
   cuatro modelos.

    **En la configuración 2, ¿dos modelos con un F1 parecido producen el mismo impacto? ¿Por qué?
    ¿Qué modelo, qué umbral y qué países le recomendaría a la gerencia? ¿El proyecto se paga en
    el plazo que pide? ¿Cómo cambia su recomendación cuando, además de las métricas, considera
    las pruebas estadísticas y el dinero?**

!!! success "Fin de la Práctica 4"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
