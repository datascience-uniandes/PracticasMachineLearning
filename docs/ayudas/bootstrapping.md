# Bootstrapping

Una métrica calculada sobre el [conjunto de validación](../glosario.md#conjunto-validacion) o el
de [prueba](../glosario.md#conjunto-prueba) es una sola cifra: con otros registros habría salido
un poco distinta. El
[bootstrapping](../glosario.md#bootstrapping) estima **cuánto podría variar** esa métrica sin
necesidad de recolectar datos nuevos.

## Cómo funciona

1. Tome una **muestra con reemplazo** del conjunto de evaluación (validación o prueba), del
   mismo tamaño que el original.
   Algunos registros salen repetidos y otros no salen.
2. Calcule la métrica (por ejemplo, el [F1](f1.md)) sobre esa muestra.
3. Repita los pasos 1 y 2 muchas veces, por ejemplo, \( B = 1000 \) réplicas.

El resultado es una **distribución** de la métrica: su centro está cerca del valor original y su
ancho muestra la incertidumbre. Con esa distribución se calcula un
[intervalo de confianza](intervalo-confianza.md).

## Detalles importantes

- **No se vuelve a entrenar el modelo.** Las predicciones se calculan una sola vez sobre el
  conjunto de evaluación; el bootstrapping solo remuestrea pares de clase real y clase predicha.
- **El tamaño de cada réplica es igual al del conjunto original.** Muestras más pequeñas darían
  una variabilidad mayor que la real.
- **Fije una semilla** (`np.random.default_rng(42)`) para poder reproducir los resultados.
- **Más réplicas no reducen la incertidumbre**: solo describen mejor la distribución. Entre 1000
  y 2000 réplicas suelen bastar.

## Código

```python
import numpy as np
from sklearn.metrics import f1_score

rng = np.random.default_rng(42)
y_real = np.asarray(y_val)
y_pred = np.asarray(y_pred)
n = len(y_real)
B = 1000

f1_boot = []
for _ in range(B):
    indices = rng.integers(0, n, n)
    f1_boot.append(f1_score(y_real[indices], y_pred[indices]))
f1_boot = np.array(f1_boot)
```

- `y_val` es la clase real del conjunto de evaluación (validación o prueba) y `y_pred` las clases
  predichas por el modelo para esos mismos registros.
- `rng.integers(0, n, n)` sortea `n` posiciones entre 0 y `n - 1`, con reemplazo.
- `f1_boot` tiene una métrica por réplica. Para otra métrica, cambie `f1_score` por la función
  que corresponda; para el [AUC](../glosario.md#auc), use `roc_auc_score` con las
  probabilidades en lugar de las clases predichas.
