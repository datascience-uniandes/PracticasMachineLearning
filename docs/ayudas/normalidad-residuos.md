# Normalidad de los residuos

La [regresión lineal](regresion-lineal.md) supone que los [residuos](../glosario.md#residuo)
siguen una [distribución](../glosario.md#distribucion) normal. Este supuesto es necesario para
que los intervalos de confianza y los [valores p](../glosario.md#valor-p) de los coeficientes
sean válidos. Revíselo con un histograma y con una prueba estadística de
[normalidad](../glosario.md#normalidad).

## Histograma de los residuos

```python
import matplotlib.pyplot as plt
import seaborn as sns

residuos = y_test - y_pred

sns.histplot(residuos, kde=True)
plt.xlabel("Residuo")
plt.ylabel("Frecuencia")
plt.show()
```

`y_test` son los valores reales del [conjunto de prueba](../glosario.md#conjunto-prueba) y
`y_pred` las predicciones del modelo para ese conjunto. `kde=True` superpone una curva suavizada
de la distribución, que facilita ver su forma. Vea más opciones en
[histograma](histograma.md).

## Prueba de Shapiro–Wilk

```python
from scipy import stats

estadistico, p_valor = stats.shapiro(residuos)
print(f"Shapiro-Wilk: estadístico = {estadistico:.4f}, p-valor = {p_valor:.4f}")
```

Las hipótesis de la prueba son:

- \( H_0 \): los residuos provienen de una distribución normal.
- \( H_1 \): los residuos no provienen de una distribución normal.

Si \( p < 0{,}05 \), rechace \( H_0 \): los residuos **no** son normales. Si
\( p \geq 0{,}05 \), no hay evidencia en contra de la normalidad (esto no demuestra que los
residuos sean normales, solo que los datos son compatibles con esa hipótesis).

!!! tip "Alternativa para muestras grandes: D'Agostino–Pearson"
    Shapiro–Wilk es la prueba más potente para muestras pequeñas y medianas. Con miles de
    observaciones puede usar la prueba de D'Agostino–Pearson, que se basa en la asimetría y la
    curtosis de los residuos y se lee igual:

    ```python
    estadistico, p_valor = stats.normaltest(residuos)
    ```

!!! warning "Con muestras grandes, combine la prueba con los gráficos"
    Con muchas observaciones las pruebas detectan desviaciones mínimas, sin importancia
    práctica, y dan \( p < 0{,}05 \) aunque el histograma se vea casi normal. Con muestras
    pequeñas ocurre lo contrario: la prueba puede no rechazar \( H_0 \) aunque haya problemas.
    Decida siempre mirando también el histograma y el [gráfico Q-Q](grafico-qq.md).

## Cómo interpretarlo

| Forma del histograma | Qué indica |
|----------------------|------------|
| Campana simétrica centrada en 0 | Residuos aproximadamente normales |
| Cola larga hacia la derecha (o la izquierda) | [Sesgo](../glosario.md#sesgo): el modelo comete errores grandes en una sola dirección |
| Pico muy alto y colas largas en ambos lados | Colas pesadas: hay más errores extremos de los que permite la normal |
| Dos picos | Puede haber dos grupos de datos que el modelo trata igual (por ejemplo, una [variable categórica](../glosario.md#variable-categorica) que falta en el modelo) |
| Algunas barras aisladas lejos del resto | [Valores atípicos](../glosario.md#outlier) en los residuos |

Cuando los residuos tienen sesgo, transformar la
[variable objetivo](../glosario.md#variable-objetivo) (por ejemplo con `np.log1p`) suele
acercarlos a la normalidad.

## Ejemplo

Con dos conjuntos de 200 residuos sintéticos, uno normal y otro con sesgo a la derecha:

```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

rng = np.random.default_rng(0)
casos = {
    "Residuos normales": rng.normal(0, 1, 200),
    "Residuos con sesgo a la derecha": rng.exponential(1, 200) - 1,
}

fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
for ax, (titulo, residuos) in zip(axes, casos.items()):
    sns.histplot(residuos, kde=True, ax=ax)
    ax.set_title(titulo)
    ax.set_xlabel("Residuo")
    ax.set_ylabel("Frecuencia")
    _, p_shapiro = stats.shapiro(residuos)
    _, p_dagostino = stats.normaltest(residuos)
    print(f"{titulo}: Shapiro-Wilk p = {p_shapiro:.4f} | D'Agostino-Pearson p = {p_dagostino:.4f}")
plt.tight_layout()
plt.show()
```

```text
Residuos normales: Shapiro-Wilk p = 0.1255 | D'Agostino-Pearson p = 0.2546
Residuos con sesgo a la derecha: Shapiro-Wilk p = 0.0000 | D'Agostino-Pearson p = 0.0000
```

![Histogramas de residuos normales y de residuos con sesgo a la derecha](../assets/img/ayudas/normalidad-residuos.png)

El histograma de la izquierda tiene forma de campana alrededor de 0 y las dos pruebas dan
\( p \geq 0{,}05 \): no hay evidencia en contra de la normalidad. El de la derecha concentra
los residuos cerca de −1 y tiene una cola larga hacia la derecha; las dos pruebas dan
\( p < 0{,}05 \), así que se rechaza la normalidad.
