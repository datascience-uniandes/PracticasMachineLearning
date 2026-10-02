# Árbol de decisión

Un [árbol de decisión](../glosario.md#arbol-decision) para
[clasificación](../glosario.md#clasificacion) divide los datos con una secuencia de preguntas
simples sobre las variables, del tipo "¿`variable` ≤ `valor`?". Cada pregunta separa los
registros en dos ramas, y el proceso se repite en cada rama hasta llegar a las **hojas**. Para
clasificar un registro nuevo, se recorre el árbol desde la raíz respondiendo las preguntas, y
la hoja a la que llega asigna la clase más frecuente entre los registros de entrenamiento que
quedaron en ella.

## Cómo elige las divisiones

En cada nodo, el árbol prueba muchas variables y valores de corte, y elige la división que deja
los grupos resultantes lo más **puros** posible, es decir, con una clase claramente dominante.
La pureza se mide con un índice de impureza; los dos más usados son:

\[
\text{Gini} = 1 - \sum_{c} p_c^2
\qquad\qquad
\text{Entropía} = -\sum_{c} p_c \log_2 p_c
\]

- \( p_c \) es la proporción de registros de la clase \( c \) en el nodo.
- Ambos valen 0 cuando todos los registros del nodo son de la misma clase y son máximos cuando
  las clases están mezcladas en partes iguales.
- En la práctica dan árboles muy parecidos; Gini es el valor por defecto y es algo más rápido.

## Escalado

Los árboles **no necesitan escalar** las variables: cada división compara una sola variable con
un valor de corte, y ese orden no cambia si la variable se multiplica o se desplaza. Sí necesita
que las variables categóricas sean numéricas, por ejemplo con [one-hot](one-hot.md).

## Código básico

```python
from sklearn.tree import DecisionTreeClassifier

modelo = DecisionTreeClassifier(max_depth=profundidad, random_state=42)
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_val)
y_prob = modelo.predict_proba(X_val)[:, 1]
```

- `profundidad` es el número máximo de niveles de preguntas que quiere permitir.
- `X_train`, `y_train` son las variables y la variable objetivo del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `X_val` las variables del
  [conjunto de validación](../glosario.md#conjunto-validacion) (vea
  [dividir los datos](division-datos.md)).
- `random_state=42` fija la semilla: cuando dos divisiones son igual de buenas, el árbol elige
  siempre la misma y el resultado es reproducible.
- `y_pred` es la clase predicha con el [umbral de decisión](../glosario.md#umbral-decision) 0,5.
- `y_prob` es la proporción de la clase positiva en la hoja a la que llega cada registro. En
  árboles profundos, muchas hojas son puras y las probabilidades quedan en 0 o 1.

## Hiperparámetros principales

Sin restricciones, el árbol sigue dividiendo hasta que cada hoja es pura, lo que suele
significar que memoriza el conjunto de entrenamiento: [sobreajuste](../glosario.md#sobreajuste).
Los [hiperparámetros](../glosario.md#hiperparametro) siguientes limitan su crecimiento:

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `max_depth` | Número máximo de niveles (por defecto `None`, sin límite) | Valor grande o `None`: árbol complejo, riesgo de sobreajuste. Valor pequeño: árbol simple, riesgo de [subajuste](../glosario.md#subajuste) |
| `min_samples_split` | Mínimo de registros que debe tener un nodo para poder dividirse (por defecto 2) | Valores más grandes evitan divisiones con pocos datos y reducen el sobreajuste |
| `min_samples_leaf` | Mínimo de registros en cada hoja (por defecto 1) | Valores más grandes dan hojas más estables y probabilidades menos extremas; demasiado grandes producen subajuste |
| `criterion` | Índice de impureza: `"gini"` (por defecto) o `"entropy"` | Suele tener poco efecto en el desempeño |
| `class_weight` | Peso de cada clase | `"balanced"` da más peso a la clase minoritaria; útil con [desbalance de clases](../glosario.md#desbalance-de-clases) |

!!! warning "Señal de sobreajuste"
    Si el árbol obtiene un desempeño casi perfecto en entrenamiento y bastante peor en
    validación, está demasiado profundo. Reduzca `max_depth` o aumente `min_samples_leaf`.

## Visualizar el árbol

```python
import matplotlib.pyplot as plt
from sklearn.tree import plot_tree

plt.figure(figsize=(14, 6))
plot_tree(modelo, feature_names=X_train.columns, class_names=["0", "1"],
          max_depth=2, filled=True)
plt.show()
```

- `feature_names` pone el nombre de cada variable en las preguntas; `class_names`, el nombre de
  cada clase.
- `max_depth=2` dibuja solo los dos primeros niveles; el árbol completo suele ser ilegible.
- `filled=True` colorea cada nodo según su clase dominante: cuanto más intenso el color, más puro
  el nodo.
- Cada nodo muestra la pregunta, la impureza (`gini` o `entropy`), el número de registros
  (`samples`), cuántos hay de cada clase (`value`) y la clase asignada (`class`).
