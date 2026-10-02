# K vecinos más cercanos (KNN)

El modelo de [k vecinos más cercanos](../glosario.md#knn) (KNN, por *k-nearest neighbors*)
clasifica un registro nuevo buscando los \( k \) registros del
[conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) más parecidos a él y
asignándole la clase **mayoritaria** entre esos vecinos. No aprende coeficientes ni reglas:
"entrenar" consiste solo en guardar los datos, y todo el cálculo ocurre al predecir.

## Cómo mide la cercanía

El parecido entre dos registros \( x \) y \( z \) se mide con una distancia. scikit-learn usa
por defecto la distancia de Minkowski:

\[
d(x, z) = \left( \sum_{j=1}^{p} |x_j - z_j|^{q} \right)^{1/q}
\]

- Con \( q = 2 \) (`p=2`, valor por defecto) es la distancia **euclidiana**, la distancia "en
  línea recta".
- Con \( q = 1 \) (`p=1`) es la distancia **manhattan**, la suma de las diferencias absolutas.
- En scikit-learn el exponente se llama `p`; aquí se escribe \( q \) para no confundirlo con el
  número de variables \( p \).

La probabilidad que devuelve `predict_proba` es la proporción de vecinos de cada clase. Por
ejemplo, con \( k = 5 \) y 4 vecinos de la clase positiva, la probabilidad es 0,8.

## Escalado y variables categóricas

KNN **necesita escalar** las variables. La distancia suma diferencias de todas las variables, de
modo que una variable medida en miles domina a otra medida en unidades solo por sus unidades.
[Escale las variables](escalar-variables.md) (por ejemplo, [estandarice](estandarizar.md)) y
codifique las categóricas con [one-hot](one-hot.md), porque la distancia solo se calcula sobre
variables numéricas. El código de esta página estandariza las variables con `StandardScaler`
antes de entrenar el modelo.

## Código básico

```python
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_val_esc = escalador.transform(X_val)

modelo = KNeighborsClassifier(n_neighbors=k)
modelo.fit(X_train_esc, y_train)
y_pred = modelo.predict(X_val_esc)
y_prob = modelo.predict_proba(X_val_esc)[:, 1]
```

- `k` es el número de vecinos que quiere usar (el valor por defecto es 5).
- `X_train`, `y_train` son las variables y la variable objetivo del conjunto de entrenamiento, y
  `X_val` las variables del [conjunto de validación](../glosario.md#conjunto-validacion) (vea
  [dividir los datos](division-datos.md)).
- `escalador.fit_transform(X_train)` calcula la media y la desviación estándar de cada variable
  **solo con el entrenamiento** y estandariza `X_train`; el resultado es `X_train_esc` («esc» de
  escalado). `escalador.transform(X_val)` aplica esas mismas medias y desviaciones a `X_val`, sin
  volver a calcularlas. Haga lo mismo con `X_test` (`X_test_esc = escalador.transform(X_test)`)
  cuando llegue el momento de evaluar en prueba.
- `y_pred` es la clase predicha con el [umbral de decisión](../glosario.md#umbral-decision) 0,5;
  `y_prob` es la proporción de vecinos de la clase positiva.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `n_neighbors` | Número de vecinos \( k \) | \( k \) pequeño (por ejemplo, 1): la predicción depende de muy pocos registros y sigue el ruido, [sobreajuste](../glosario.md#sobreajuste). \( k \) grande: la predicción se parece cada vez más a la clase mayoritaria global, [subajuste](../glosario.md#subajuste) |
| `weights` | Peso de cada vecino: `"uniform"` (por defecto) o `"distance"` | `"distance"` da más peso a los vecinos más cercanos; reduce el efecto de un \( k \) grande, pero con `"distance"` el desempeño en entrenamiento es (casi) perfecto y no sirve para detectar sobreajuste |
| `p` | Exponente de la distancia: 2 (euclidiana) o 1 (manhattan) | Manhattan es algo menos sensible a diferencias grandes en una sola variable |

!!! tip "Valores de k"
    En clasificación binaria, un \( k \) impar evita empates en la votación. Con
    [desbalance de clases](../glosario.md#desbalance-de-clases), un \( k \) grande favorece a la
    clase mayoritaria; KNN no tiene `class_weight`, así que en ese caso conviene mover el umbral
    usando `y_prob`.

!!! warning "KNN es lento al predecir"
    Para cada registro nuevo, KNN calcula la distancia a todos los registros de entrenamiento.
    Con muchas filas (o muchas variables) la predicción, y por tanto la validación cruzada, puede
    tardar bastante. Además, con muchas variables las distancias se vuelven parecidas entre sí y
    el modelo pierde capacidad de distinguir vecinos.
