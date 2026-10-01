# Dividir en entrenamiento y prueba

Un modelo siempre se ajusta bien a los datos con los que se entrenó. Para saber si funciona con
datos **nuevos**, se reserva una parte de los registros que el modelo no ve durante el
entrenamiento:

- el [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) se usa para ajustar el
  modelo;
- el [conjunto de prueba](../glosario.md#conjunto-prueba) se usa para evaluarlo con datos que
  no vio.

Si el modelo funciona mucho mejor en entrenamiento que en prueba, hay
[sobreajuste](../glosario.md#sobreajuste): memorizó los datos en lugar de aprender el patrón.

## Dividir con `train_test_split`

```python
from sklearn.model_selection import train_test_split

X = df[["columna1", "columna2", "columna3"]]
y = df["columna_objetivo"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

- `X` contiene las variables independientes y `y` la
  [variable objetivo](../glosario.md#variable-objetivo); `columna_objetivo` es su nombre.
- `X_train` y `y_train` forman el conjunto de entrenamiento; `X_test` y `y_test`, el de prueba.
  La función devuelve los cuatro en ese orden.
- `test_size=0.2` reserva el 20 % de los registros para prueba (el 80 % restante queda para
  entrenamiento).
- `random_state=42` fija la semilla de la división aleatoria: con el mismo número, cada
  ejecución produce la misma división y los resultados son reproducibles.
- `shuffle=True` (valor por defecto) mezcla los registros antes de dividir. Así, si el dataset
  viene ordenado (por ejemplo, por fecha o por precio), los dos conjuntos no quedan con
  registros de rangos distintos.

## Proporciones típicas

| Entrenamiento | Prueba | Cuándo usarla |
|---------------|--------|---------------|
| 80 % | 20 % | La opción más común |
| 70 % | 30 % | Datasets pequeños, para tener una prueba más confiable |
| 90 % | 10 % | Datasets muy grandes, donde el 10 % ya son muchos registros |

!!! tip "Divida antes de transformar"
    Haga la división antes de calcular medias, medianas u otros valores a partir de los datos
    (por ejemplo, para imputar nulos o escalar). Si los calcula con todo el dataset, la
    información del conjunto de prueba se filtra al entrenamiento.

## Entrenamiento, validación y prueba { #validacion }

Cuando hay que **elegir** entre varios modelos o entre valores de un
[hiperparámetro](../glosario.md#hiperparametro) (por ejemplo, el grado de una
[regresión polinomial](../glosario.md#regresion-polinomial)), se necesita un tercer conjunto: el
[conjunto de validación](../glosario.md#conjunto-validacion). Se obtiene llamando dos veces a
`train_test_split`:

```python
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42)
```

- La primera llamada separa el 20 % para prueba (`X_test`, `y_test`) y deja el 80 % en
  `X_temp` y `y_temp`.
- La segunda divide ese 80 %: `test_size=0.25` toma la cuarta parte (25 % de 80 % = 20 % del
  total) para validación (`X_val`, `y_val`). El resultado es 60 % / 20 % / 20 %.

Cada conjunto tiene un papel distinto:

| Conjunto | Papel |
|----------|-------|
| Entrenamiento | Ajustar cada modelo candidato (`fit`) |
| Validación | Comparar los candidatos y elegir el modelo o los hiperparámetros |
| Prueba | Evaluar **una sola vez**, al final, el modelo elegido |

!!! warning "No use el conjunto de prueba para elegir"
    Si compara modelos con el conjunto de prueba y se queda con el mejor, la elección se adapta
    a esos datos y la métrica de prueba deja de ser una estimación honesta del desempeño con
    datos nuevos. Elija siempre con validación y use prueba solo al final.

## División estratificada { #estratificada }

En [clasificación](../glosario.md#clasificacion), una división aleatoria puede dejar
proporciones de clases distintas en cada conjunto, sobre todo cuando hay
[desbalance de clases](../glosario.md#desbalance-de-clases): si solo el 10 % de los registros es
de la clase positiva, el conjunto de prueba podría quedar con el 6 % o el 14 %. La
[estratificación](../glosario.md#estratificacion) evita esto: con `stratify=y`, cada conjunto
conserva la misma proporción de clases que el dataset completo.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

En la división en tres conjuntos (60 % / 20 % / 20 %), estratifique en las dos llamadas, cada una
con su propia variable objetivo:

```python
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, random_state=42, stratify=y_temp
)
```

Para comprobarlo, compare las proporciones de cada clase en los conjuntos; deben ser casi iguales:

```python
print(y_train.value_counts(normalize=True), y_test.value_counts(normalize=True))
```

La estratificación solo aplica a clasificación: en regresión la variable objetivo es continua y
no tiene clases que conservar.
