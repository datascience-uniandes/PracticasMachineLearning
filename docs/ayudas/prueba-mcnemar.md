# Prueba de McNemar

La [prueba de McNemar](../glosario.md#prueba-mcnemar) compara dos clasificadores evaluados sobre
el **mismo** conjunto de registros, por ejemplo, el de prueba. Es una prueba pareada que no usa
réplicas: mira, registro por registro, en qué casos acierta un modelo y se equivoca el otro.

## Tabla de contingencia

Cruce los aciertos de los dos modelos en el conjunto de evaluación:

|  | B acierta | B se equivoca |
|--|:---------:|:-------------:|
| **A acierta** | \( n_{11} \) | \( n_{10} \) |
| **A se equivoca** | \( n_{01} \) | \( n_{00} \) |

Las casillas \( n_{11} \) y \( n_{00} \) (los dos aciertan o los dos se equivocan) no dicen nada
sobre cuál es mejor. La prueba solo usa los **casos en desacuerdo**: \( n_{10} \), donde solo A
acierta, y \( n_{01} \), donde solo B acierta.

## Hipótesis

- \( H_0 \): los dos modelos se equivocan con la misma frecuencia; \( n_{10} \) y \( n_{01} \)
  solo difieren por azar.
- \( H_1 \): un modelo se equivoca más que el otro.

Con corrección de continuidad, el estadístico es

\[
\chi^2 = \frac{\left(|n_{10} - n_{01}| - 1\right)^2}{n_{10} + n_{01}}
\]

y se compara con una distribución chi-cuadrado de un grado de libertad. Si \( p < 0{,}05 \), se
rechaza \( H_0 \): el modelo con más aciertos exclusivos es mejor. Cuando
\( n_{10} + n_{01} < 25 \), use la versión exacta (`exact=True`), basada en la distribución
binomial.

## Cómo interpretarla

- **Compara aciertos, no el F1.** La prueba evalúa la [exactitud](exactitud.md): cuenta errores
  sin distinguir falsos positivos de falsos negativos. Con
  [desbalance de clases](../glosario.md#desbalance-de-clases), dos modelos con un F1 parecido
  pueden tener exactitudes distintas, y al revés.
- **No necesita réplicas.** Su valor p no depende de ningún parámetro arbitrario, a diferencia de
  una prueba t sobre réplicas de [bootstrapping](bootstrapping.md).
- **Para comparar el desempeño en la clase positiva**, construya la tabla solo con los registros
  de esa clase: la prueba compara entonces el [recall](recall.md) de los dos modelos.

## Código

```python
import numpy as np
import pandas as pd
from statsmodels.stats.contingency_tables import mcnemar

acierta_a = np.asarray(y_pred_a) == np.asarray(y_test)
acierta_b = np.asarray(y_pred_b) == np.asarray(y_test)

tabla = pd.crosstab(acierta_a, acierta_b, rownames=["A acierta"], colnames=["B acierta"])
print(tabla)

resultado = mcnemar(tabla.to_numpy(), exact=False, correction=True)
print(f"McNemar: chi2 = {resultado.statistic:.2f}, p-valor = {resultado.pvalue:.4g}")
```

- `y_test` es la clase real del conjunto de prueba; `y_pred_a` y `y_pred_b`, las clases
  predichas por cada modelo sobre esos mismos registros.
- `acierta_a` y `acierta_b` valen `True` en los registros que cada modelo clasifica bien.
- `tabla` es la tabla de contingencia; las casillas fuera de la diagonal son los casos en
  desacuerdo.
- `exact=False` y `correction=True` aplican la versión chi-cuadrado con corrección de
  continuidad. Use `exact=True` si hay menos de 25 casos en desacuerdo.
- Para comparar el recall, use solo los clientes de la clase positiva: filtre `acierta_a` y
  `acierta_b` con `np.asarray(y_test) == 1` antes de construir la tabla.
