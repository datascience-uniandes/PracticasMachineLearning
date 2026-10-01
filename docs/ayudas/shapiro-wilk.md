# Prueba de Shapiro-Wilk

La prueba de Shapiro-Wilk comprueba si una muestra proviene de una
[distribución](../glosario.md#distribucion) normal. En regresión se aplica a los
[residuos](../glosario.md#residuo) para revisar el supuesto de
[normalidad](../glosario.md#normalidad) de la [regresión lineal](regresion-lineal.md).

Las hipótesis de la prueba son:

- \( H_0 \): los datos provienen de una distribución normal.
- \( H_1 \): los datos no provienen de una distribución normal.

```python
from scipy import stats

estadistico, p_valor = stats.shapiro(residuos)
print(f"Shapiro-Wilk: W = {estadistico:.4f}, p-valor = {p_valor:.4f}")
```

- `residuos` son los datos que quiere evaluar; para un modelo, `residuos = y_test - y_pred`.
- `estadistico` es el estadístico \( W \) de la prueba.
- `p_valor` es el [valor p](../glosario.md#valor-p): la probabilidad de obtener un \( W \) tan
  bajo como el observado si los datos fueran realmente normales.

## Cómo decidir

Use un nivel de significancia \( \alpha = 0{,}05 \):

| Resultado | Decisión | Qué significa |
|-----------|----------|---------------|
| \( p < 0{,}05 \) | Rechazar \( H_0 \) | Los datos **no** son normales |
| \( p \geq 0{,}05 \) | No rechazar \( H_0 \) | No hay evidencia en contra de la normalidad |

No rechazar \( H_0 \) no demuestra que los datos sean normales, solo que son compatibles con esa
hipótesis.

## Qué significa el estadístico W

\( W \) mide qué tan bien se ajustan los datos ordenados a los que se esperarían de una
distribución normal. Toma valores entre 0 y 1: cuanto más cerca de 1, más se parecen los datos a
una normal. Valores claramente menores que 1 indican una desviación, pero para decidir use el
valor p, no \( W \) por sí solo.

## Tamaño de la muestra

!!! warning "La prueba depende mucho del tamaño de la muestra"
    Con muchas observaciones la prueba detecta desviaciones mínimas, sin importancia práctica, y
    da \( p < 0{,}05 \) aunque el histograma se vea casi normal. Con más de 5000 observaciones
    scipy además muestra una advertencia, porque el valor p puede no ser exacto. Con muestras
    pequeñas ocurre lo contrario: la prueba puede no rechazar \( H_0 \) aunque haya problemas.

!!! tip "Alternativa: D'Agostino-Pearson"
    Shapiro-Wilk es la prueba más potente para muestras pequeñas y medianas. Con miles de
    observaciones puede usar la prueba de D'Agostino-Pearson, que se basa en la asimetría y la
    curtosis de los datos y se lee igual:

    ```python
    estadistico, p_valor = stats.normaltest(residuos)
    ```

## Complemente la prueba con gráficos

La prueba solo responde si los datos son normales o no; no dice **cómo** se alejan de la normal
(sesgo, colas pesadas, valores atípicos). Para eso revise el
[histograma](histograma.md) de los residuos (vea
[normalidad de los residuos](normalidad-residuos.md)) y el [gráfico Q-Q](grafico-qq.md).
