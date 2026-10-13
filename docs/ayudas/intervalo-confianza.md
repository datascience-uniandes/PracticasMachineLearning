# Intervalo de confianza por bootstrapping

Un [intervalo de confianza](../glosario.md#intervalo-confianza) del 95 % es un rango de valores
que, con un 95 % de confianza, contiene el valor real de una métrica. Con la distribución que
produce el [bootstrapping](bootstrapping.md), se calcula de forma directa con el **método de
percentiles**.

## Método de percentiles

Ordene las \( B \) métricas del bootstrapping y tome:

- el **percentil 2,5** como límite inferior, y
- el **percentil 97,5** como límite superior.

El 95 % central de las réplicas queda dentro del intervalo. Para un intervalo del 90 %, use los
percentiles 5 y 95.

## Cómo interpretarlo

- **Ancho.** Un intervalo estrecho indica una métrica estable; uno ancho, que con otra muestra
  de prueba la métrica podría cambiar bastante. El ancho depende sobre todo del tamaño del
  conjunto de prueba y, con clases desbalanceadas, de cuántos registros tiene la clase
  minoritaria.
- **Comparar dos modelos por superposición.**

| Situación | Conclusión |
|-----------|------------|
| Los intervalos **no se superponen** | Hay evidencia de que un modelo es mejor que el otro |
| Los intervalos **se superponen** | No se puede concluir nada: la diferencia puede ser real o no |

!!! warning "La superposición es una prueba conservadora"
    Dos intervalos pueden superponerse aunque la diferencia entre los modelos sea real, sobre todo
    cuando los dos modelos se evalúan sobre los mismos registros. Para decidir, calcule el
    intervalo de confianza de la **diferencia** con una
    [prueba A/B pareada](prueba-ab.md#pareada): si ese intervalo no contiene el 0, la diferencia
    es significativa.

## Código

```python
import numpy as np

limite_inferior, limite_superior = np.percentile(metrica_boot, [2.5, 97.5])
print(f"Métrica: {metrica:.3f}  IC 95 %: [{limite_inferior:.3f}; {limite_superior:.3f}]")
```

- `metrica_boot` es el arreglo con la métrica de cada réplica del bootstrapping.
- `metrica` es la métrica calculada sobre el conjunto de prueba completo.
- `limite_inferior` y `limite_superior` son los extremos del intervalo del 95 %.
