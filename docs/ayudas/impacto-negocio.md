# Calcular el impacto de un modelo

Las métricas como el [F1](f1.md) dicen qué tan bien clasifica un modelo, pero no si el proyecto
que lo usa **se paga**. El impacto traduce la [precisión](precision.md) y la
[sensibilidad](sensibilidad.md) del modelo a dinero y responde tres preguntas: ¿cuánto gana la
empresa cada mes?, ¿cuándo recupera lo invertido? y ¿qué tan bueno debe ser el modelo para
recuperarlo en un plazo dado?

## Elementos del cálculo

Para un proyecto de retención de clientes, en el que el modelo marca a los clientes con riesgo
de abandonar y la empresa les hace una oferta:

| Símbolo | Qué es | Quién lo define |
|---------|--------|-----------------|
| \( I \) | **Inversión del proyecto**: desarrollo, equipo, infraestructura e integración | Presupuesto propio |
| \( c \) | Costo de la oferta por cliente contactado (descuento, bono, llamada) | Supuesto de negocio |
| \( V \) | Valor de un cliente retenido: margen que deja mientras se queda | Estimado con los datos |
| \( r \) | Tasa de éxito: proporción de los que iban a abandonar que se quedan al recibir la oferta | Supuesto de negocio |
| \( M \) | Clientes que abandonan cada mes | Estimado con los datos |
| \( P \), \( R \) | Precisión y sensibilidad (_recall_) del modelo | Medidas en validación o prueba |

Se supone que la empresa **no recupera a los clientes que ya abandonaron**: cada abandono que el
modelo no detecta es un cliente perdido.

## Fórmula simplificada del beneficio

Cada mes, el modelo detecta \( R \cdot M \) de los clientes que iban a abandonar (verdaderos
positivos). Como su precisión es \( P \), para encontrarlos contacta en total a
\( R \cdot M / P \) clientes. De los detectados se quedan \( r \cdot R \cdot M \), y cada
contacto cuesta \( c \). El beneficio neto mensual es

\[
B = \underbrace{r \cdot V \cdot R \cdot M}_{\text{valor retenido}}
  - \underbrace{c \cdot \frac{R \cdot M}{P}}_{\text{costo de la campaña}}
  = R \cdot M \left( r \cdot V - \frac{c}{P} \right)
\]

- La **sensibilidad** \( R \) multiplica el beneficio: cuantos más abandonos detecta el modelo,
  más gana la empresa, siempre que el paréntesis sea positivo.
- La **precisión** \( P \) decide el signo del paréntesis: con una precisión baja, el costo de
  contactar a clientes que no iban a abandonar se come el valor retenido.

## Precisión de equilibrio

La campaña gana dinero solo si el paréntesis es positivo, es decir, si la precisión supera la
**precisión de equilibrio**:

\[
P^{*} = \frac{c}{r \cdot V}
\]

Por debajo de \( P^{*} \), cada mes de campaña pierde dinero sin importar la sensibilidad, y el
proyecto nunca recupera la inversión.

## Retorno de la inversión y punto de equilibrio

La inversión \( I \) se paga una sola vez; el beneficio \( B \) llega cada mes. Después de
\( t \) meses:

\[
\text{ROI}(t) = \frac{t \cdot B - I}{I}
\qquad
t^{*} = \frac{I}{B}
\]

- El [ROI](../glosario.md#roi) es negativo mientras la empresa no recupera lo invertido, vale 0
  en el [punto de equilibrio](../glosario.md#punto-equilibrio) \( t^{*} \) y es positivo
  después.
- \( t^{*} \) es el **periodo de recuperación**: el número de meses necesarios para recuperar la
  inversión. Si \( B \le 0 \), no hay punto de equilibrio: el proyecto nunca se paga.
- Cuando no hay punto de equilibrio, busque **a partir de qué valor** de una variable aparece:
  la precisión mínima (\( P > P^{*} \)), el costo máximo por contacto
  (\( c < r \cdot V \cdot P \)) o la tasa de éxito mínima (\( r > c / (V \cdot P) \)).

## Qué modelo se necesita para recuperar la inversión en \( k \) meses

Para recuperar la inversión en \( k \) meses se necesita \( k \cdot B \ge I \):

\[
R \left( r \cdot V - \frac{c}{P} \right) \ge \frac{I}{k \cdot M}
\]

Despejando, para una precisión dada la sensibilidad mínima es

\[
R_{\min}(P) = \frac{I}{k \cdot M \left( r \cdot V - c / P \right)}
\qquad (P > P^{*})
\]

y para una sensibilidad dada la precisión mínima es

\[
P_{\min}(R) = \frac{c}{r \cdot V - \dfrac{I}{k \cdot M \cdot R}}
\]

\( R_{\min}(P) \) es una curva en el plano precisión-sensibilidad: los modelos que quedan **por
encima** de ella recuperan la inversión en \( k \) meses o menos. Si \( R_{\min}(P) > 1 \) para
toda precisión posible, ningún modelo lo logra y hay que revisar el presupuesto, el plazo o la
oferta.

!!! tip "Precisión y sensibilidad dependen del umbral"
    Cada [umbral de decisión](../glosario.md#umbral-decision) da un par \( (P, R) \) distinto, así
    que también da un beneficio distinto. Elija el umbral que maximiza \( B \) en el
    [conjunto de validación](../glosario.md#conjunto-validacion) y repórtelo en el de
    [prueba](../glosario.md#conjunto-prueba).

## Impacto por segmento

Si el valor del cliente y el costo de retención cambian según un segmento (un país, un tipo de
cliente), el cálculo se hace por segmento y luego se suma:

\[
B = \sum_{g} R_g \cdot M_g \left( r_g \cdot V_g - \frac{c_g}{P_g} \right)
\qquad
P^{*}_g = \frac{c_g}{r_g \cdot V_g}
\]

- Cada segmento \( g \) tiene su propia precisión de equilibrio \( P^{*}_g \): donde el cliente
  vale más o la oferta cuesta menos, se puede aceptar un modelo menos preciso.
- La precisión \( P_g \) y la sensibilidad \( R_g \) se miden **solo con los clientes de cada
  segmento**: el mismo modelo puede ser rentable en un segmento y perder dinero en otro.
- Si un segmento queda por debajo de su \( P^{*}_g \), conviene no hacer la campaña allí o usar
  un **umbral de decisión distinto por segmento**.

## Código: beneficio, ROI y punto de equilibrio

```python
def beneficio_mensual(P, R, M, V, r, c):
    return R * M * (r * V - c / P)

B = beneficio_mensual(P, R, M, V, r, c)
precision_equilibrio = c / (r * V)
meses_equilibrio = I / B if B > 0 else float("inf")
roi_12 = (12 * B - I) / I

print(f"Beneficio mensual: {B:,.0f}")
print(f"Precisión de equilibrio: {precision_equilibrio:.3f}")
print(f"Meses para recuperar la inversión: {meses_equilibrio:.1f}")
print(f"ROI a 12 meses: {roi_12:.1%}")
```

- `P` y `R` son la precisión y la sensibilidad del modelo.
- `M`, `V`, `r`, `c` e `I` son los elementos de la tabla anterior.
- `meses_equilibrio` es infinito cuando el beneficio mensual no es positivo.

## Código: curva para recuperar la inversión en k meses

```python
import numpy as np
import matplotlib.pyplot as plt

k = 3
precisiones = np.linspace(c / (r * V) + 0.01, 1, 200)
recall_minimo = I / (k * M * (r * V - c / precisiones))

plt.plot(precisiones, recall_minimo, label=f"Recuperar en {k} meses")
for nombre, (p, s) in modelos.items():
    plt.scatter(p, s, label=nombre)
plt.ylim(0, 1)
plt.xlabel("Precisión")
plt.ylabel("Sensibilidad mínima")
plt.legend()
plt.show()
```

- `precisiones` recorre las precisiones por encima de la de equilibrio.
- `recall_minimo` es la sensibilidad mínima para cada precisión.
- `modelos` es un diccionario con el nombre de cada modelo y su par (precisión, sensibilidad),
  por ejemplo `{"Modelo A": (0.60, 0.67)}`.

## Código: impacto por segmento

```python
import pandas as pd
from sklearn.metrics import precision_score, recall_score

filas = []
for g, (V_g, c_g, M_g) in parametros.items():
    mascara = (segmento == g)
    P_g = precision_score(y_val[mascara], y_pred[mascara])
    R_g = recall_score(y_val[mascara], y_pred[mascara])
    filas.append({"segmento": g, "precision": P_g, "sensibilidad": R_g,
                  "precision_equilibrio": c_g / (r * V_g),
                  "beneficio_mensual": beneficio_mensual(P_g, R_g, M_g, V_g, r, c_g)})

tabla = pd.DataFrame(filas)
print(tabla)
print("Beneficio mensual total:", tabla["beneficio_mensual"].sum())
```

- `parametros` es un diccionario con el valor del cliente, el costo de retención y los abandonos
  mensuales de cada segmento, por ejemplo `{"France": (V_fr, c_fr, M_fr), ...}`.
- `segmento` es un arreglo con el segmento de cada registro del conjunto de evaluación, en el
  mismo orden que `y_val` y `y_pred`.
- Si usa codificación one-hot, reconstruya el país a partir de las columnas codificadas o
  guárdelo antes de codificar.
