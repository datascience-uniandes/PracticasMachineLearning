# Actividad 3: Cálculo de impacto

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

El banco quiere lanzar una campaña de retención: a los clientes que el modelo marque como riesgo
de abandono les ofrecerá un beneficio para que se queden. Use estos supuestos:

| Supuesto | Valor |
|----------|-------|
| Costo de la oferta por cliente contactado, \( C \) (inversión) | 250 € |
| Valor de un cliente retenido, \( V \) | 1.200 € |
| Tasa de éxito de la oferta en clientes que iban a abandonar, \( r \) | 50 % |

El banco **no recupera a los clientes que ya abandonaron**: cada cliente que abandona sin haber
sido contactado se pierde, con todo su valor.

1. Retome los cuatro modelos de la Actividad 1, sus probabilidades en validación y en prueba, y
   los supuestos de la tabla. Calcule la **pérdida sin campaña** en el conjunto de prueba: el
   número de clientes que abandonan multiplicado por \( V \). **¿Cuánto perdería el banco si no
   hiciera nada?**
2. [**Calcule el impacto**](../../ayudas/impacto-negocio.md) de cada modelo en el conjunto de
   prueba con el umbral de 0,5: clientes contactados, inversión, valor retenido, beneficio neto y
   [ROI](../../glosario.md#roi). Agregue el escenario **contactar a todos los clientes**.
   **¿Qué modelos ganan dinero y cuáles pierden? ¿Por qué contactar a todos es tan mala idea?
   ¿Qué parte de la pérdida sin campaña evita el mejor modelo?**
3. Calcule la [**precisión de equilibrio**](../../ayudas/impacto-negocio.md#precision-de-equilibrio)
   con los supuestos y compárela con la precisión de cada modelo en prueba.
   **¿Qué modelos la superan? ¿Por qué un modelo con buena sensibilidad puede perder dinero
   cuando la inversión por cliente es alta?**
4. [**Aplique bootstrapping sobre el conjunto de validación**](../../ayudas/bootstrapping.md)
   para calcular el [**intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) del
   beneficio neto de cada modelo (con el umbral de 0,5), y reporte junto a él el beneficio en
   prueba. **¿Algún intervalo contiene el 0? ¿Qué significa eso para la decisión del banco? ¿El
   beneficio de prueba queda dentro del intervalo?**
5. **Elija el umbral con el impacto:** [**grafique el beneficio neto según el umbral de
   decisión**](../../ayudas/impacto-negocio.md#el-umbral-de-decision) de cada modelo en
   validación y elija el umbral que lo maximiza. Con ese umbral, calcule el impacto en prueba.
   **¿El mejor umbral es 0,5? ¿Cuánto mejora el beneficio en prueba al cambiar el umbral? ¿Qué
   pasa con la sensibilidad y la precisión?**
6. **Analice la sensibilidad a los supuestos:** repita el paso 2 con un costo por cliente de
   150 € y de 350 €. **¿Cambia el orden de los modelos? ¿A partir de qué costo deja de ser
   rentable la campaña con el mejor modelo?**
7. **Conclusiones:** construya una tabla con el F1 de validación, el resultado de las pruebas de
   la Actividad 2, el beneficio neto en prueba (con el umbral de 0,5 y con el mejor umbral) y el
   ROI de los cuatro modelos.

    **En la configuración 2, ¿dos modelos con un F1 parecido producen el mismo impacto? ¿Por qué?
    ¿Qué modelo y qué umbral le recomendaría al banco? ¿Cómo cambia su recomendación cuando,
    además de las métricas, considera las pruebas estadísticas y el dinero?**

!!! success "Fin de la Práctica 4"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
