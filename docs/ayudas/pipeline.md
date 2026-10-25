# Crear un pipeline

Un `Pipeline` de scikit-learn encadena en un solo objeto todos los pasos que transforman los
datos y el modelo que predice. Recibe las variables **originales** y aplica, en orden, las mismas
transformaciones que se usaron al entrenar. Es una alternativa a la
[función de predicción](funcion-prediccion.md) escrita a mano.

## Para qué sirve

- **Un solo objeto:** `pipeline.fit(X_train, y_train)` ajusta todos los pasos solo con el
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `pipeline.predict(X)`
  los aplica a datos nuevos. No hay que recordar el orden ni llamar a `transform` paso por paso.
- **Sin fuga de datos:** dentro de una [validación cruzada](validacion-cruzada.md) o de
  [GridSearchCV](gridsearchcv.md), cada paso se ajusta solo con los folds de entrenamiento.
- **Interpretabilidad:** se puede pasar directamente a `PartialDependenceDisplay` para los
  [gráficos ICE](grafico-ice.md), y `pipeline.predict` o `pipeline.predict_proba` sirven como
  función de predicción para [LIME](lime.md) y [SHAP](shap.md).
- **Producción:** se guarda y se carga como un solo archivo, con el preprocesamiento incluido.

## Piezas principales

- **`Pipeline`:** lista ordenada de pasos `(nombre, objeto)`. Todos menos el último deben ser
  transformadores (tienen `fit` y `transform`); el último es el modelo.
- **`ColumnTransformer`:** aplica transformaciones distintas a grupos distintos de columnas, por
  ejemplo, el polinomio solo a las [variables continuas](../glosario.md#variable-continua) y
  ninguna transformación (`"passthrough"`) a las columnas one-hot.
- Los hiperparámetros de un paso interno se nombran `paso__parametro`, por ejemplo,
  `modelo__max_depth` en `GridSearchCV`.

## Dos formas de construirlo

### Con código

Reescriba sus transformaciones como pasos del _pipeline_, con los mismos parámetros que usó al
entrenar sin _pipeline_ (vea el código al final), y compruebe que predice exactamente lo mismo
que su modelo anterior.

### Con un asistente de IA generativa

Puede pedirle a un asistente de IA generativa (por ejemplo, el de Google Colab) que convierta su
código en un _pipeline_. Copie este prompt, pegue su código donde se indica y **revise con
cuidado el resultado** antes de usarlo: el asistente puede cambiar un parámetro, el orden de las
columnas o la forma de dividir los datos sin avisar.

```text
Tengo un modelo entrenado en Python con scikit-learn, sin pipelines. Este es el código con el
que preparé los datos y entrené el modelo:

[PEGUE AQUÍ SU CÓDIGO: tratamiento de datos, codificación one-hot, división en entrenamiento,
validación y prueba, imputación, transformaciones, escalado y entrenamiento]

Reescríbelo como un Pipeline de scikit-learn que reciba las variables originales (antes de las
transformaciones) y cumpla estas condiciones:

1. Usa un ColumnTransformer si las columnas reciben transformaciones distintas.
2. Mantén exactamente los mismos parámetros de cada transformación y del modelo, incluido el
   random_state.
3. No cambies la división de los datos; entrena el pipeline solo con el conjunto de
   entrenamiento.
4. Agrega una celda que compruebe con np.allclose que el pipeline predice lo mismo que mi modelo
   original sobre el conjunto de prueba.
5. Explica brevemente cada paso del código.
```

Si el _pipeline_ no predice lo mismo, revise qué paso es distinto antes de seguir.

## Código

Regresión polinomial (polinomio sobre las variables continuas, columnas one-hot sin cambios,
escalado y regresión lineal):

```python
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression

preprocesamiento = ColumnTransformer([
    ("polinomio", PolynomialFeatures(degree=2, include_bias=False), columnas_continuas),
    ("onehot", "passthrough", columnas_onehot),
])

pipeline_reg = Pipeline([
    ("preprocesamiento", preprocesamiento),
    ("escalado", StandardScaler()),
    ("modelo", LinearRegression()),
])
pipeline_reg.fit(X_train[columnas_continuas + columnas_onehot], y_train)

print(np.allclose(pipeline_reg.predict(X_test), predecir_precio(X_test)))
```

Clasificación con datos escalados:

```python
from sklearn.ensemble import RandomForestClassifier

pipeline_clas = Pipeline([
    ("escalado", StandardScaler()),
    ("modelo", RandomForestClassifier(n_estimators=400, max_depth=10, random_state=42)),
])
pipeline_clas.fit(X_train_clas, y_train_clas)

print(np.allclose(pipeline_clas.predict_proba(X_test_clas)[:, 1], predecir_abandono(X_test_clas)))
```

- `columnas_continuas` y `columnas_onehot` son las mismas listas de columnas usadas al entrenar
  sin _pipeline_, y `degree` es el grado elegido.
- En `RandomForestClassifier` use exactamente los hiperparámetros y el `random_state` de su
  modelo; los de este código son un ejemplo.
- `X_train_clas` y `y_train_clas` son las variables originales y la clase del conjunto de
  entrenamiento del clasificador, y `X_test_clas` las de prueba.
- `np.allclose` debe imprimir `True`: el _pipeline_ predice lo mismo que la función de
  predicción.
- Para LIME y SHAP, use como función de predicción
  `lambda X: pipeline_reg.predict(pd.DataFrame(X, columns=columnas))` o
  `lambda X: pipeline_clas.predict_proba(pd.DataFrame(X, columns=columnas))`, donde `columnas`
  es la lista de columnas originales en su orden.
