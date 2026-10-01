# Prueba chi-cuadrado de independencia

La [prueba chi-cuadrado](../glosario.md#chi-cuadrado) de independencia comprueba si una
[variable categórica](../glosario.md#variable-categorica) está relacionada con otra. En
[clasificación](../glosario.md#clasificacion), se usa para saber si la proporción de cada clase
de la [variable objetivo](../glosario.md#variable-objetivo) cambia según la categoría: si
cambia, la variable probablemente ayuda a predecir la clase.

Las hipótesis de la prueba son:

- \( H_0 \): la variable y la clase son independientes (la proporción de cada clase es la misma
  en todas las categorías).
- \( H_1 \): la variable y la clase están relacionadas.

## Tabla de contingencia

La prueba parte de una tabla de contingencia, que cuenta los registros de cada combinación de
categoría y clase:

```python
import pandas as pd

tabla = pd.crosstab(df["columna_categorica"], df["columna_objetivo"])
print(tabla)
```

- `columna_categorica` es la variable categórica que quiere evaluar.
- `columna_objetivo` es el nombre de la variable objetivo.
- `tabla` tiene una fila por categoría y una columna por clase. Use los conteos, no
  proporciones (no pase `normalize`).

## Aplicar la prueba

```python
from scipy import stats

chi2, p_valor, grados_libertad, esperadas = stats.chi2_contingency(tabla)
print(f"Chi-cuadrado: chi2 = {chi2:.4f}, p-valor = {p_valor:.4f}, gl = {grados_libertad}")
```

- `chi2` es el estadístico \( \chi^2 \): mide qué tan lejos están los conteos observados de los
  que se esperarían si la variable y la clase fueran independientes. Cuanto mayor, más se alejan.
- `p_valor` es el [valor p](../glosario.md#valor-p): la probabilidad de obtener un \( \chi^2 \)
  tan alto como el observado si la variable y la clase fueran independientes.
- `grados_libertad` es \( (\text{filas} - 1)(\text{columnas} - 1) \) de la tabla.
- `esperadas` es la tabla de frecuencias esperadas bajo independencia, con la misma forma que
  `tabla`.

## Cómo decidir

Use un nivel de significancia \( \alpha = 0{,}05 \):

| Resultado | Decisión | Qué significa |
|-----------|----------|---------------|
| \( p < 0{,}05 \) | Rechazar \( H_0 \) | La variable está relacionada con la clase |
| \( p \geq 0{,}05 \) | No rechazar \( H_0 \) | No hay evidencia de relación entre la variable y la clase |

Para ver **en qué** categorías está la diferencia, revise la proporción de la clase positiva por
categoría en los [gráficos por clase](graficos-por-clase.md).

## Requisito: frecuencias esperadas

!!! warning "Frecuencias esperadas de al menos 5"
    La prueba es confiable cuando todas las frecuencias esperadas son de al menos 5. Revíselo
    con:

    ```python
    print((esperadas < 5).sum(), "celdas con frecuencia esperada menor que 5")
    ```

    Si hay celdas con frecuencias esperadas bajas, agrupe las categorías poco frecuentes en una
    categoría `"Otra"` antes de armar la tabla.

## Tamaño del efecto: V de Cramér

Como en otras pruebas, con muchos registros una relación débil puede dar \( p < 0{,}05 \). La
**V de Cramér** mide la **fuerza** de la relación, en una escala de 0 a 1:

\[
V = \sqrt{\frac{\chi^2}{n \cdot (\min(f, c) - 1)}}
\]

donde \( n \) es el número total de registros y \( f \) y \( c \) son el número de filas y de
columnas de la tabla.

```python
import numpy as np

n = tabla.to_numpy().sum()
v_cramer = np.sqrt(chi2 / (n * (min(tabla.shape) - 1)))
print(f"V de Cramér = {v_cramer:.4f}")
```

| V de Cramér | Fuerza de la relación (referencia) |
|-------------|------------------------------------|
| Menos de 0,1 | Despreciable |
| 0,1 a 0,3 | Débil |
| 0,3 a 0,5 | Moderada |
| Más de 0,5 | Fuerte |

## Varias variables a la vez

Para revisar varias variables categóricas, recorra las columnas y arme una tabla con los
resultados:

```python
columnas_categoricas = ["columna1", "columna2", "columna3"]

resultados = []
for columna in columnas_categoricas:
    tabla = pd.crosstab(df[columna], df["columna_objetivo"])
    chi2, p_valor, grados_libertad, esperadas = stats.chi2_contingency(tabla)
    n = tabla.to_numpy().sum()
    resultados.append({
        "variable": columna,
        "chi2": chi2,
        "p_valor": p_valor,
        "v_cramer": np.sqrt(chi2 / (n * (min(tabla.shape) - 1))),
        "celdas_esperadas_menores_5": int((esperadas < 5).sum()),
    })

resumen = pd.DataFrame(resultados).sort_values("p_valor")
resumen["significativa"] = resumen["p_valor"] < 0.05
print(resumen)
```

- `columnas_categoricas` es la lista de variables categóricas que quiere evaluar.
- `resumen` tiene una fila por variable, ordenada de menor a mayor valor p.
- `celdas_esperadas_menores_5` indica si el requisito de frecuencias esperadas se cumple para esa
  variable (debe ser 0).

Para variables continuas use la [prueba t](prueba-t.md).
