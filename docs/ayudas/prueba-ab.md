# Prueba A/B entre dos modelos

Una [prueba A/B](../glosario.md#prueba-ab) compara dos alternativas, el modelo A y el modelo B,
para decidir si la diferencia en una métrica es real o se debe al azar de la muestra. Con el
[bootstrapping](bootstrapping.md) hay dos formas de hacerla, según cómo se tomen las muestras.

## Hipótesis

- \( H_0 \): los dos modelos tienen el mismo desempeño; la diferencia de la métrica es 0.
- \( H_1 \): los dos modelos tienen desempeños distintos.

## Grupos independientes { #independiente }

En cada réplica se toma **una muestra para A y otra muestra distinta para B**. Simula evaluar
cada modelo con clientes diferentes, como en un experimento A/B en el que cada cliente ve una sola
versión.

- La diferencia en cada réplica es \( d_b = m_A^{(b)} - m_B^{(b)} \), con métricas calculadas
  sobre registros distintos.
- La prueba t se aplica con `stats.ttest_ind` (Welch) sobre las dos distribuciones.
- La variabilidad incluye la diferencia entre los modelos **y** la diferencia entre las muestras,
  así que los intervalos son anchos.

## Muestras pareadas { #pareada }

En cada réplica se toma **una sola muestra y se evalúan los dos modelos sobre los mismos
registros**. Es lo que corresponde cuando A y B predicen sobre el mismo conjunto de prueba (vea
[muestras pareadas](../glosario.md#muestras-pareadas)).

- La diferencia en cada réplica es \( d_b = m_A^{(b)} - m_B^{(b)} \), con las dos métricas sobre
  los mismos registros.
- La prueba t se aplica con `stats.ttest_rel` sobre las dos distribuciones, que equivale a probar
  si la media de \( d_b \) es 0.
- Como los dos modelos ven los mismos clientes, la variabilidad de la muestra se cancela y queda
  solo la diferencia entre los modelos: los intervalos son más estrechos y la prueba detecta
  diferencias más pequeñas.

## Cómo decidir

Hay dos criterios, y el más confiable es el intervalo de la diferencia:

| Criterio | Diferencia significativa si... |
|----------|--------------------------------|
| Intervalo de confianza del 95 % de \( d_b \) (percentiles 2,5 y 97,5) | **No contiene el 0** |
| Prueba t sobre las réplicas | \( p < 0{,}05 \) |

La proporción de réplicas con \( d_b \le 0 \) también es informativa: si es menor que 0,025 (o
mayor que 0,975), el 0 queda fuera del intervalo.

!!! warning "El valor p de la prueba t depende del número de réplicas"
    La prueba t trata cada réplica como si fuera una observación independiente, pero las réplicas
    salen todas del mismo conjunto de prueba. Por eso, al aumentar \( B \), el valor p se hace
    cada vez más pequeño aunque la evidencia sea la misma: con miles de réplicas casi cualquier
    diferencia resulta «significativa». El intervalo de confianza de la diferencia, en cambio,
    se mantiene estable. Use el valor p como referencia y decida con el intervalo.

## Código: grupos independientes

```python
import numpy as np
from scipy import stats
from sklearn.metrics import f1_score

rng = np.random.default_rng(42)
y_real, pred_a, pred_b = np.asarray(y_test), np.asarray(y_pred_a), np.asarray(y_pred_b)
n, B = len(y_real), 1000

f1_a, f1_b = [], []
for _ in range(B):
    idx_a = rng.integers(0, n, n)
    idx_b = rng.integers(0, n, n)
    f1_a.append(f1_score(y_real[idx_a], pred_a[idx_a]))
    f1_b.append(f1_score(y_real[idx_b], pred_b[idx_b]))
f1_a, f1_b = np.array(f1_a), np.array(f1_b)

diferencia = f1_a - f1_b
print("IC 95 % de la diferencia:", np.percentile(diferencia, [2.5, 97.5]).round(3))
estadistico, p_valor = stats.ttest_ind(f1_a, f1_b, equal_var=False)
print(f"Prueba t independiente: t = {estadistico:.2f}, p-valor = {p_valor:.4g}")
```

## Código: muestras pareadas

```python
f1_a, f1_b = [], []
for _ in range(B):
    idx = rng.integers(0, n, n)
    f1_a.append(f1_score(y_real[idx], pred_a[idx]))
    f1_b.append(f1_score(y_real[idx], pred_b[idx]))
f1_a, f1_b = np.array(f1_a), np.array(f1_b)

diferencia = f1_a - f1_b
print("IC 95 % de la diferencia:", np.percentile(diferencia, [2.5, 97.5]).round(3))
print("Proporción de réplicas con A <= B:", np.mean(diferencia <= 0))
estadistico, p_valor = stats.ttest_rel(f1_a, f1_b)
print(f"Prueba t pareada: t = {estadistico:.2f}, p-valor = {p_valor:.4g}")
```

- `y_test` es la clase real del conjunto de prueba; `y_pred_a` y `y_pred_b`, las clases
  predichas por cada modelo sobre esos mismos registros.
- `idx_a` e `idx_b` son muestras distintas para cada modelo; `idx` es una sola muestra para los
  dos.
- `diferencia` tiene la diferencia de F1 de cada réplica: positiva cuando A es mejor.
- `equal_var=False` aplica la versión de Welch (vea [prueba t-estudiante](prueba-t.md)).
