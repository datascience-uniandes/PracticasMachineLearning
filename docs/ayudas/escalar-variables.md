# Escalar variables

Escalar consiste en transformar cada variable continua para
que todas queden en rangos comparables. Si una variable se mide en miles (por ejemplo, un área en
metros cuadrados) y otra en unidades (el número de habitaciones), algunos modelos le dan más peso
a la primera solo por sus unidades.

## Por qué escalar

Escalar importa en los modelos que son sensibles a la escala de las variables:

- **Regularización.** [Lasso](lasso-ridge.md#lasso) y [Ridge](lasso-ridge.md#ridge) penalizan el tamaño de los
  coeficientes (vea [regularización](../glosario.md#regularizacion)).
  Sin escalar, la penalización castiga más a unas variables que a otras solo por sus unidades.
- **Distancias.** Los modelos que comparan registros por distancia (por ejemplo, k vecinos más
  cercanos o k-medias) quedan dominados por la variable con valores más grandes.
- **Métodos de gradiente.** Los algoritmos que se entrenan con descenso de gradiente (por ejemplo,
  las redes neuronales) convergen más rápido y de forma más estable con variables en rangos
  similares.
- **Términos polinomiales.** En la [regresión polinomial](regresion-polinomial.md) las potencias
  de una variable con valores grandes crecen muchísimo; escalar antes mantiene los términos en
  rangos comparables.

La [regresión lineal](regresion-lineal.md) sin regularización y los modelos basados en árboles no
necesitan escalar: sus predicciones no cambian.

## Ajustar con el entrenamiento y transformar la prueba

Todos los escaladores de scikit-learn se usan igual:

```python
escalador.fit_transform(X_train)
escalador.transform(X_test)
```

- `escalador` es cualquiera de los escaladores de la tabla de abajo, por ejemplo
  `StandardScaler()`, `MinMaxScaler()` o `RobustScaler()`.
- `X_train` y `X_test` son las variables del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) y del
  [conjunto de prueba](../glosario.md#conjunto-prueba) (vea [dividir los datos](division-datos.md)).
- `fit_transform` **aprende** los valores que necesita el escalador (media, mínimo, mediana,
  etc.) a partir de `X_train` y los aplica.
- `transform` aplica a `X_test` **los mismos** valores aprendidos con `X_train`; no calcula unos
  nuevos.

!!! warning "Ajuste el escalador solo con el entrenamiento"
    Si usa `fit` o `fit_transform` con todos los datos (o con `X_test`), el escalador incorpora
    información del conjunto de prueba. Esa **fuga de información** hace que las métricas en
    prueba sean más optimistas de lo que serán con datos nuevos. Ajuste con `X_train` y solo
    transforme `X_test`.

## Comparación de escaladores

| Escalador | Fórmula | Resultado | Sensibilidad a [valores atípicos](../glosario.md#outlier) | Cuándo usarlo |
|---|---|---|---|---|
| [`StandardScaler`](estandarizar.md) | \( \dfrac{x - \text{media}}{\text{desviación estándar}} \) | Media 0 y desviación estándar 1 | Alta: la media y la desviación estándar se dejan arrastrar por los atípicos | Opción por defecto para regularización y métodos de gradiente |
| `MinMaxScaler` | \( \dfrac{x - \text{mín}}{\text{máx} - \text{mín}} \) | Rango \([0, 1]\) en el entrenamiento | Muy alta: un solo atípico define el mínimo o el máximo y comprime el resto | Cuando el modelo necesita un rango acotado, sin atípicos marcados |
| [`RobustScaler`](robust-scaler.md) | \( \dfrac{x - \text{mediana}}{\text{IQR}} \) | Mediana 0 y rango intercuartílico 1 | Baja: la mediana y el IQR casi no cambian con los atípicos | Cuando hay valores atípicos que no quiere eliminar |

- `mín` y `máx` son el mínimo y el máximo de la columna en `X_train`. En `X_test` puede haber
  valores fuera de \([0, 1]\) si superan esos extremos; es lo esperado.
- `IQR` es el rango intercuartílico: la diferencia entre los percentiles 75 y 25.
- Ningún escalador cambia la forma de la [distribución](../glosario.md#distribucion) ni elimina
  los atípicos; solo cambian el centro y la escala. Para tratarlos, vea
  [valores atípicos](valores-atipicos.md).

Para usar `MinMaxScaler`:

```python
from sklearn.preprocessing import MinMaxScaler

escalador = MinMaxScaler()
X_train_esc = escalador.fit_transform(X_train)
X_test_esc = escalador.transform(X_test)
```

- `X_train_esc` y `X_test_esc` son los arreglos de NumPy con las variables escaladas.
- `escalador.data_min_` y `escalador.data_max_` guardan el mínimo y el máximo aprendidos.
