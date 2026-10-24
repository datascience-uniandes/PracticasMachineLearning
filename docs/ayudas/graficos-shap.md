# Gráficos SHAP

Los [valores SHAP](shap.md) se leen con tres gráficos: la cascada y el diagrama de fuerza
explican **una predicción**, y el diagrama de enjambre resume **todo el modelo**.

## Cascada (predicción individual)

La cascada (_waterfall_) parte del **valor base**, abajo, y suma una a una las contribuciones de
las variables hasta llegar a la **predicción** del registro, arriba.

- Cada barra es una variable, con su valor para ese registro a la izquierda.
- Las barras rojas suben la predicción y las azules la bajan; su longitud es el valor SHAP.
- Las variables están ordenadas de mayor a menor aporte; las de menor aporte se agrupan al final.

## Diagrama de fuerza

### Individual

Muestra la misma información de la cascada en una sola línea: las variables en rojo **empujan**
la predicción hacia arriba desde la izquierda y las azules hacia abajo desde la derecha. Donde
se encuentran está la predicción del registro. El ancho de cada segmento es su valor SHAP.

### Conjunto

Gira los diagramas individuales de muchos registros y los pone uno al lado del otro. Por defecto
los ordena por **similitud** de sus explicaciones, de modo que aparecen grupos de registros que
el modelo explica de forma parecida. El gráfico es interactivo: permite reordenar los registros
por una variable o por la predicción, y ver la contribución de cada variable al pasar el cursor.

## Diagrama de enjambre

El diagrama de enjambre (_beeswarm_) muestra los valores SHAP de todos los registros:

- Cada fila es una variable, ordenadas de mayor a menor importancia (promedio del valor SHAP
  absoluto).
- Cada punto es un registro; su posición horizontal es su valor SHAP para esa variable.
- El color es el valor de la variable: rojo para valores altos y azul para valores bajos.
- Si los puntos rojos están a la derecha, los valores altos de la variable **suben** la
  predicción; si están a la izquierda, la **bajan**. Una mezcla de colores en los dos lados
  indica un efecto no monótono o interacciones.
- Una fila muy ancha indica una variable con mucha influencia; una fila concentrada en 0, una
  variable que casi no influye.

## Código

```python
import shap

shap.plots.waterfall(valores[i])

shap.plots.force(valores[i], matplotlib=True)

shap.initjs()
shap.plots.force(valores.base_values[0], valores.values, X_muestra)

shap.plots.beeswarm(valores)
```

- `valores` son los valores SHAP calculados como en la [ayuda de valores SHAP](shap.md) y `i`,
  la posición del registro dentro de `X_muestra`.
- `matplotlib=True` dibuja el diagrama de fuerza individual como imagen fija.
- `shap.initjs()` carga el código necesario para el diagrama de fuerza conjunto, que es
  interactivo; llámelo en la misma celda del gráfico.
- `shap.plots.beeswarm` muestra por defecto las 10 variables más importantes; use
  `max_display=15` para ver más.
