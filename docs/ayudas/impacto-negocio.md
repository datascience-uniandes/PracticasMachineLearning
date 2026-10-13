# Calcular el impacto de un modelo

Las métricas como el [F1](f1.md) dicen qué tan bien clasifica un modelo, pero no cuánto dinero
gana o pierde la empresa al usarlo. El **impacto** traduce la
[matriz de confusión](matriz-confusion.md) a dinero, asignando un valor a cada tipo de acierto y
de error.

## Escenario de retención de clientes

El modelo marca a los clientes con riesgo de abandonar y la empresa les hace una oferta de
retención. Se necesitan tres valores del negocio:

- **Costo por cliente contactado** \( C \): lo que cuesta la oferta (un descuento, un bono, la
  llamada de un asesor). Se paga por **todos** los contactados, abandonen o no. Es la
  **inversión** de la campaña.
- **Valor de un cliente retenido** \( V \): el margen que deja el cliente durante el tiempo que se
  queda gracias a la oferta.
- **Tasa de éxito** \( r \): proporción de los clientes que iban a abandonar y que, al recibir la
  oferta, se quedan.

Si la empresa **no recupera a los clientes que ya abandonaron**, cada abandono que el modelo no
detecta (falso negativo) es un cliente perdido para siempre.

## Qué aporta cada casilla de la matriz de confusión

| Casilla | Qué pasa | Efecto en dinero |
|---------|----------|------------------|
| Verdadero positivo (VP) | Iba a abandonar, se le contacta y se queda con probabilidad \( r \) | \( r \cdot V - C \) |
| Falso positivo (FP) | No iba a abandonar, pero se le contacta | \( -C \) |
| Falso negativo (FN) | Abandona sin haber sido contactado | Se pierde \( V \) (igual que sin modelo) |
| Verdadero negativo (VN) | No iba a abandonar y no se le contacta | 0 |

## Fórmulas

Frente a no hacer ninguna campaña:

\[
\text{Inversión} = C \cdot (VP + FP) \qquad
\text{Valor retenido} = r \cdot V \cdot VP
\]

\[
\text{Beneficio neto} = \text{Valor retenido} - \text{Inversión} \qquad
\text{ROI} = \frac{\text{Beneficio neto}}{\text{Inversión}}
\]

El [ROI](../glosario.md#roi) (retorno de la inversión) indica cuánto gana la empresa por cada
unidad invertida: un ROI de 0,3 significa que cada 100 invertidos devuelven 130.

La **pérdida sin campaña** es \( V \) multiplicado por el número de clientes que abandonan: es lo
que la empresa pierde si no hace nada, y sirve de referencia para ver qué parte de esa pérdida
evita el modelo.

## Precisión de equilibrio

La campaña gana dinero solo si cada cliente contactado aporta en promedio más de lo que cuesta.
Eso ocurre cuando la [precisión](precision.md) del modelo supera la **precisión de equilibrio**:

\[
\text{Precisión de equilibrio} = \frac{C}{r \cdot V}
\]

Cuanto mayor es la inversión por cliente, mayor es la precisión que se le exige al modelo. Un
modelo con buena [sensibilidad](sensibilidad.md) pero precisión baja puede detectar muchos
abandonos y aun así perder dinero.

## El umbral de decisión

El beneficio depende del [umbral de decisión](../glosario.md#umbral-decision): un umbral alto
contacta a menos clientes (menos inversión, más precisión, pero más abandonos sin detectar) y uno
bajo, a más. Elija el umbral que maximiza el beneficio en el
[conjunto de validación](../glosario.md#conjunto-validacion) y repórtelo en el de
[prueba](../glosario.md#conjunto-prueba).

## Código: beneficio de un modelo

```python
import numpy as np

def impacto(y_real, y_pred, C, V, r):
    y_real, y_pred = np.asarray(y_real), np.asarray(y_pred)
    vp = np.sum((y_pred == 1) & (y_real == 1))
    fp = np.sum((y_pred == 1) & (y_real == 0))
    inversion = C * (vp + fp)
    valor_retenido = r * V * vp
    beneficio = valor_retenido - inversion
    return {"contactados": vp + fp, "inversion": inversion, "valor_retenido": valor_retenido,
            "beneficio": beneficio, "roi": beneficio / inversion if inversion > 0 else np.nan}

print(impacto(y_val, y_pred, C=C, V=V, r=r))
```

- `y_val` es la clase real del conjunto de evaluación y `y_pred` las clases predichas.
- `C`, `V` y `r` son el costo por contactado, el valor de un cliente retenido y la tasa de éxito.
- Para el escenario «contactar a todos», use `y_pred = np.ones(len(y_val))`.

## Código: beneficio según el umbral

```python
import matplotlib.pyplot as plt

probabilidades = modelo.predict_proba(X_val)[:, 1]
umbrales = np.arange(0.05, 0.96, 0.05)
beneficios = [impacto(y_val, (probabilidades >= u).astype(int), C, V, r)["beneficio"]
              for u in umbrales]

mejor_umbral = umbrales[np.argmax(beneficios)]
plt.plot(umbrales, beneficios, marker="o")
plt.axhline(0, color="gray", linestyle="--")
plt.axvline(mejor_umbral, color="red", linestyle=":")
plt.xlabel("Umbral de decisión")
plt.ylabel("Beneficio neto")
plt.show()
```

- `modelo` es el clasificador ya entrenado y `X_val` las variables del conjunto de validación.
- `beneficios` tiene el beneficio neto para cada umbral; `mejor_umbral` es el que lo maximiza.
- La línea gris marca el beneficio 0: por debajo, la campaña pierde dinero.
