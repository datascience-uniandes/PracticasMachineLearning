# Calcular el impacto de un modelo

Las métricas como el [F1](f1.md) dicen qué tan bien clasifica un modelo, pero no si el proyecto
que lo usa **se paga**. El impacto traduce los aciertos y errores del modelo a dinero y compara
lo que el modelo genera con lo que costó construirlo.

## Retorno de la inversión

\[
\text{ROI} = \frac{\text{Retorno} - \text{Inversión}}{\text{Inversión}}
\]

- **Retorno:** el beneficio que generan las predicciones (cuántas se hacen y cuánto vale cada
  una) menos el costo de sus errores.
- **Inversión:** los recursos necesarios para construir y poner en marcha el modelo (personas,
  tiempo, infraestructura) multiplicados por su costo.

El ROI es 0 cuando el retorno iguala la inversión. Un proyecto puede tener mucho valor y aun así
un ROI negativo si cuesta más de lo que genera.

## Fórmula de Provost: valor esperado

Provost y Fawcett proponen asignar un valor en dinero a cada casilla de la
[matriz de confusión](matriz-confusion.md) (la **matriz de costo-beneficio**) y ponderarlo por la
probabilidad de cada casilla:

\[
\text{Valor esperado por registro} =
p(VP)\,v_{VP} + p(FP)\,v_{FP} + p(FN)\,v_{FN} + p(VN)\,v_{VN}
\]

Cada probabilidad es la proporción de registros en esa casilla, por ejemplo,
\( p(VP) = VP / n \). En una campaña de retención, frente a no hacer nada:

| Casilla | Qué pasa | Valor |
|---------|----------|-------|
| VP | Iba a abandonar, se le contacta y se queda con probabilidad \( r \) | \( r \cdot V - c \) |
| FP | No iba a abandonar, pero se le contacta | \( -c \) |
| FN | Abandona sin ser contactado (se pierde igual que sin modelo) | 0 |
| VN | No iba a abandonar y no se le contacta | 0 |

\( V \) es el valor de un cliente retenido, \( c \) el costo de la oferta por cliente contactado y
\( r \) la tasa de éxito de la oferta.

## Fórmula simplificada: ganancia por predicción ajustada

\[
\hat{a} = a - (1 - I) \cdot e
\]

\( a \) es la ganancia de una predicción correcta, \( e \) lo que se pierde con cada error e
\( I \) la proporción de aciertos. En la campaña de retención solo importan los clientes
contactados, así que \( I \) es la [precisión](precision.md) \( P \), \( a = r \cdot V - c \) y
\( e = r \cdot V \): un contacto equivocado paga la oferta sin retener a nadie. La ganancia
mensual es \( \hat{a} \) por el número de clientes contactados en el mes.

## Fórmula de equilibrio

La precisión (o exactitud) **de equilibrio** es la mínima con la que el modelo produce
beneficios, es decir, con la que \( \hat{a} = 0 \):

\[
I_e = 1 - \frac{a}{e}
\qquad\text{que en la campaña de retención es}\qquad
P_e = \frac{c}{r \cdot V}
\]

Por debajo de ella, cada predicción pierde dinero en promedio y el proyecto nunca recupera la
inversión.

## Punto de equilibrio y periodo de recuperación

Si el modelo genera un beneficio \( B \) cada mes y la inversión fue \( I_{\text{proy}} \), el
[punto de equilibrio](../glosario.md#punto-equilibrio), el mes en el que el
[ROI](../glosario.md#roi) llega a 0, es

\[
t^{*} = \frac{I_{\text{proy}}}{B}
\]

Si \( B \le 0 \), no hay punto de equilibrio: busque a partir de qué precisión, costo por
contacto o tasa de éxito aparecería.

## Qué modelo se necesita para recuperar la inversión en \( k \) meses

Con \( M \) clientes que abandonan al mes, el beneficio mensual también se escribe
\( B = R \cdot M \left( r \cdot V - c / P \right) \), donde \( R \) es la
[sensibilidad](sensibilidad.md). Recuperar la inversión en \( k \) meses exige
\( k \cdot B \ge I_{\text{proy}} \), así que la sensibilidad mínima para una precisión dada es

\[
R_{\min} = \frac{I_{\text{proy}}}{k \cdot M \left( r \cdot V - c / P \right)}
\]

Los modelos cuyo par (precisión, sensibilidad) queda por encima de esa curva se pagan en
\( k \) meses o menos.

## Impacto por segmento

Si el valor del cliente o el costo de retención cambian según un segmento (por ejemplo, un país),
calcule el beneficio de cada segmento por separado, con sus propios valores, y **sume** los
resultados para obtener el beneficio total.

## Referencias

- Provost, F. y Fawcett, T. (2013). _Data Science for Business_. O'Reilly. Capítulo 7: el marco
  del valor esperado y la matriz de costo-beneficio.
