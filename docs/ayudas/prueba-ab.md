# Prueba A/B entre dos modelos

Una [prueba A/B](../glosario.md#prueba-ab) compara dos alternativas, el modelo A y el modelo B,
para decidir si la diferencia en una métrica es real o se debe al azar de los clientes evaluados.
Hay dos diseños, según si los dos modelos se evalúan con clientes distintos o con los mismos
clientes, y en ambos la decisión se toma con el intervalo de confianza de la **diferencia**.

## Hipótesis

- \( H_0 \): los dos modelos tienen el mismo desempeño; la diferencia de la métrica es 0.
- \( H_1 \): los dos modelos tienen desempeños distintos.

## Grupos independientes { #independiente }

Cada modelo se evalúa con **clientes distintos**, como en un experimento A/B en el que cada
cliente ve una sola versión. Con los datos de una práctica, un ejemplo es evaluar el modelo A con
sus predicciones sobre el [conjunto de validación](../glosario.md#conjunto-validacion) y el
modelo B con sus predicciones sobre el [conjunto de prueba](../glosario.md#conjunto-prueba): los
dos conjuntos no comparten clientes.

- **Bootstrapping:** en cada réplica se remuestrea **cada grupo por separado y con su propio
  tamaño**: \( n_{val} \) posiciones con reemplazo del conjunto de validación para A y
  \( n_{test} \) del de prueba para B. La diferencia de la réplica es
  \( d_b = m_A^{(b)} - m_B^{(b)} \).
- **Prueba t:** se aplica la versión de Welch (`stats.ttest_ind` con `equal_var=False`) sobre
  los **valores por cliente** de cada grupo (vea [qué prueba usar según la métrica](#metricas)).
- La variabilidad de \( d_b \) incluye la diferencia entre los modelos **y** la diferencia entre
  los clientes de cada grupo, así que los intervalos son anchos. Además, una diferencia
  significativa puede deberse a los modelos o a que los dos grupos de clientes son distintos.

## Muestras pareadas { #pareada }

Los dos modelos se evalúan sobre **los mismos clientes**, por ejemplo, los del conjunto de prueba
(vea [muestras pareadas](../glosario.md#muestras-pareadas)). Es el diseño habitual al comparar
modelos de machine learning, porque todos predicen sobre el mismo conjunto de evaluación.

- **Bootstrapping:** en cada réplica se toma **una sola muestra** de posiciones del conjunto de
  prueba y se calculan las métricas de los dos modelos sobre esos mismos clientes.
- **Prueba t:** se aplica la prueba t pareada (`stats.ttest_rel`) sobre los **valores por
  cliente** de los dos modelos, que equivale a probar si la media de sus diferencias es 0.
- **Es más potente.** La varianza de la diferencia es
  \( \operatorname{Var}(d) = \operatorname{Var}(A) + \operatorname{Var}(B) - 2\operatorname{Cov}(A, B) \).
  Como los dos modelos aciertan y fallan en clientes parecidos, la covarianza es positiva y la
  variación entre clientes se cancela: los intervalos son más estrechos y la prueba detecta
  diferencias más pequeñas. Es normal que la prueba pareada encuentre una diferencia que la
  independiente no encuentra.

## Qué prueba usar según la métrica { #metricas }

La prueba t compara **medias de valores por cliente**: cada cliente aporta un 0 o un 1, y la media
de esos valores es la métrica. No todas las métricas se pueden escribir así:

| Métrica | Valor por cliente | Clientes que entran | Independiente | Pareada |
|---------|-------------------|---------------------|---------------|---------|
| [Exactitud](exactitud.md) | 1 si el modelo acierta | Todos | Welch | `ttest_rel` o [McNemar](prueba-mcnemar.md) |
| [Recall](recall.md) | 1 si el modelo lo marca como abandono | Solo los de \( y = 1 \) | Welch | `ttest_rel` o McNemar con \( y = 1 \) |
| [Precisión](precision.md) | 1 si el cliente realmente abandona | Solo los de predicción \( = 1 \) | Welch | Solo bootstrapping |
| [F1](f1.md) | No existe: no es una media por cliente | — | Solo bootstrapping | Solo bootstrapping |

- **Precisión pareada:** cada modelo marca como abandono a clientes distintos, así que los valores
  de A y de B no corresponden a los mismos clientes y no se pueden emparejar. Use el bootstrapping
  pareado.
- **F1:** combina la precisión y el recall, por lo que no es el promedio de un valor por cliente
  y no admite prueba t. Use el bootstrapping.

## Cómo decidir

Con las \( B \) diferencias \( d_b \) del bootstrapping:

| Criterio | Diferencia significativa si... |
|----------|--------------------------------|
| Intervalo de confianza del 95 % de \( d_b \) (percentiles 2,5 y 97,5) | **No contiene el 0** |
| Valor p por bootstrapping | \( p < 0{,}05 \) |
| Prueba t sobre valores por cliente (solo las métricas que la admiten) | \( p < 0{,}05 \) |

El **valor p por bootstrapping** es

\[
p \approx 2 \cdot \min\left( \frac{\#\{d_b \le 0\}}{B},\ \frac{\#\{d_b \ge 0\}}{B} \right)
\]

y siempre coincide con el intervalo: \( p < 0{,}05 \) cuando el 0 queda fuera del intervalo del
95 %, y \( p \ge 0{,}05 \) cuando queda dentro.

Para concluir que un modelo es mejor, pida dos condiciones: que el intervalo **excluya el 0** y
que la diferencia **supere un umbral relevante** para el negocio. Con muchos clientes, una
diferencia mínima puede ser significativa y no importar en la práctica.

Al interpretar los resultados:

- **No rechazar \( H_0 \) no demuestra que los modelos sean iguales**, solo que los datos no
  muestran una diferencia clara. Si una prueba la detecta y otra no, no hay contradicción: la
  pareada suele ser más potente que la independiente.
- **Compare siempre la misma métrica.** Una diferencia en exactitud no dice nada sobre el F1, y
  al revés.

!!! warning "No aplique la prueba t a las réplicas del bootstrapping"
    Las observaciones son los clientes, no las réplicas. Si se aplica una prueba t a las \( B \)
    métricas de cada modelo, el valor p baja sin fin al aumentar \( B \), aunque los datos sean los
    mismos: con suficientes réplicas, cualquier diferencia resulta «significativa» (White et al.,
    2014). El intervalo de la diferencia y el valor p por bootstrapping, en cambio, se mantienen
    estables. Decida con ellos o con la prueba t sobre valores por cliente.

## Código: bootstrapping con grupos independientes

```python
import numpy as np
from sklearn.metrics import f1_score, precision_score, recall_score

metricas = {"F1": f1_score, "Precisión": precision_score, "Recall": recall_score}
rng = np.random.default_rng(42)
B = 1000

y_val, y_pred_a_val = np.asarray(y_val), np.asarray(y_pred_a_val)
y_test, y_pred_b_test = np.asarray(y_test), np.asarray(y_pred_b_test)
n_val, n_test = len(y_val), len(y_test)

boot_a = {nombre: np.empty(B) for nombre in metricas}
boot_b = {nombre: np.empty(B) for nombre in metricas}
for b in range(B):
    idx_val = rng.integers(0, n_val, n_val)
    idx_test = rng.integers(0, n_test, n_test)
    for nombre, metrica in metricas.items():
        boot_a[nombre][b] = metrica(y_val[idx_val], y_pred_a_val[idx_val], zero_division=0)
        boot_b[nombre][b] = metrica(y_test[idx_test], y_pred_b_test[idx_test], zero_division=0)

observada = {nombre: metrica(y_val, y_pred_a_val) - metrica(y_test, y_pred_b_test)
             for nombre, metrica in metricas.items()}
```

- `y_val` y `y_pred_a_val` son la clase real y las predicciones del modelo A en validación;
  `y_test` y `y_pred_b_test`, la clase real y las predicciones del modelo B en prueba.
- `idx_val` e `idx_test` remuestrean cada conjunto por separado, cada uno con su tamaño.
- `boot_a` y `boot_b` guardan, para cada métrica, el valor de cada réplica.
- `observada` es la diferencia A − B calculada con los conjuntos completos.

## Código: bootstrapping con muestras pareadas

```python
import numpy as np
from sklearn.metrics import f1_score, precision_score, recall_score

metricas = {"F1": f1_score, "Precisión": precision_score, "Recall": recall_score}
rng = np.random.default_rng(42)
B = 1000

y_test, y_pred_a, y_pred_b = np.asarray(y_test), np.asarray(y_pred_a), np.asarray(y_pred_b)
n_test = len(y_test)

boot_a = {nombre: np.empty(B) for nombre in metricas}
boot_b = {nombre: np.empty(B) for nombre in metricas}
for b in range(B):
    idx = rng.integers(0, n_test, n_test)
    for nombre, metrica in metricas.items():
        boot_a[nombre][b] = metrica(y_test[idx], y_pred_a[idx], zero_division=0)
        boot_b[nombre][b] = metrica(y_test[idx], y_pred_b[idx], zero_division=0)

observada = {nombre: metrica(y_test, y_pred_a) - metrica(y_test, y_pred_b)
             for nombre, metrica in metricas.items()}
```

- `y_test` es la clase real del conjunto de prueba; `y_pred_a` y `y_pred_b`, las predicciones de
  cada modelo sobre esos mismos clientes.
- `idx` es una sola muestra para los dos modelos.

## Código: intervalo y valor p de la diferencia

```python
import pandas as pd

umbral = 0.02

filas = []
for nombre in metricas:
    d = boot_a[nombre] - boot_b[nombre]
    inferior, superior = np.percentile(d, [2.5, 97.5])
    p_boot = min(1.0, 2 * min(np.mean(d <= 0), np.mean(d >= 0)))
    filas.append({"métrica": nombre, "diferencia": observada[nombre],
                  "IC 2,5 %": inferior, "IC 97,5 %": superior, "p bootstrapping": p_boot})

resumen = pd.DataFrame(filas)
resumen["excluye 0"] = (resumen["IC 2,5 %"] > 0) | (resumen["IC 97,5 %"] < 0)
resumen["relevante"] = resumen["excluye 0"] & (resumen["diferencia"].abs() >= umbral)
print(resumen.round(4))
```

- Funciona con el resultado de cualquiera de los dos diseños.
- `d` tiene la diferencia A − B de cada réplica: positiva cuando A es mejor.
- `umbral` es la diferencia mínima que se considera relevante para el negocio.

## Código: prueba t con valores por cliente

Grupos independientes (Welch):

```python
from scipy import stats

valores = {
    "Exactitud": ((y_pred_a_val == y_val).astype(int), (y_pred_b_test == y_test).astype(int)),
    "Recall": (y_pred_a_val[y_val == 1], y_pred_b_test[y_test == 1]),
    "Precisión": (y_val[y_pred_a_val == 1], y_test[y_pred_b_test == 1]),
}
for nombre, (valores_a, valores_b) in valores.items():
    estadistico, p_valor = stats.ttest_ind(valores_a, valores_b, equal_var=False)
    print(f"{nombre}: A = {valores_a.mean():.3f}, B = {valores_b.mean():.3f}, "
          f"t = {estadistico:.2f}, p-valor = {p_valor:.4g}")
```

Muestras pareadas (solo exactitud y recall):

```python
from scipy import stats

positivos = y_test == 1
valores = {
    "Exactitud": ((y_pred_a == y_test).astype(int), (y_pred_b == y_test).astype(int)),
    "Recall": (y_pred_a[positivos], y_pred_b[positivos]),
}
for nombre, (valores_a, valores_b) in valores.items():
    estadistico, p_valor = stats.ttest_rel(valores_a, valores_b)
    print(f"{nombre}: A = {valores_a.mean():.3f}, B = {valores_b.mean():.3f}, "
          f"t = {estadistico:.2f}, p-valor = {p_valor:.4g}")
```

- La media de cada arreglo es la métrica del modelo: los aciertos dan la exactitud; las
  predicciones de los clientes con \( y = 1 \), el recall, y la clase real de los clientes
  marcados como abandono, la precisión.
- `equal_var=False` aplica la versión de Welch (vea [prueba t-estudiante](prueba-t.md)).
- `ttest_rel` necesita que la posición `i` de los dos arreglos sea el mismo cliente.

## Referencias

- Dietterich, T. G. (1998). Approximate statistical tests for comparing supervised
  classification learning algorithms. *Neural Computation*, 10(7), 1895–1924.
  [PDF](https://web.engr.oregonstate.edu/~tgd/publications/dietterich-approximate-statistical-tests-nc1998.pdf)
- Efron, B. y Tibshirani, R. J. (1993). *An Introduction to the Bootstrap*. Chapman & Hall.
- Kohavi, R., Tang, D. y Xu, Y. (2020). *Trustworthy Online Controlled Experiments: A Practical
  Guide to A/B Testing*. Cambridge University Press.
- Montgomery, D. C. *Design and Analysis of Experiments*. Wiley. Capítulo 2 (comparaciones
  pareadas).
- Nadeau, C. y Bengio, Y. (2003). Inference for the generalization error. *Machine Learning*, 52,
  239–281.
- White, J. W., Rassweiler, A., Samhouri, J. F., Stier, A. C. y White, C. (2014). Ecologists
  should not use statistical significance tests to interpret simulation model results. *Oikos*,
  123(4), 385–388. [PDF](https://sites.stat.washington.edu/peter/342/White.pdf)
