# LIME

LIME (_Local Interpretable Model-agnostic Explanations_) explica **una sola predicción**: qué
variables llevaron al modelo a predecir ese valor para ese registro. Es una
[explicación local](../glosario.md#explicacion-local) y sirve para cualquier modelo, porque solo
necesita su [función de predicción](funcion-prediccion.md).

## Cómo funciona

1. **Perturba** el registro: genera miles de registros parecidos cambiando sus valores al azar.
2. **Predice** cada registro perturbado con el modelo.
3. **Pondera** los registros según su cercanía al original: los más parecidos pesan más.
4. **Ajusta un modelo lineal** sobre esos registros ponderados. Ese
   [modelo sustituto](../glosario.md#modelo-sustituto) solo es válido cerca del registro, y sus
   coeficientes son la explicación.

Por defecto, LIME convierte cada variable continua en intervalos (por ejemplo,
`AreaHabitable <= 1430`) y explica con esos intervalos.

## Cómo leer la explicación

- Cada variable tiene un **peso**: positivo si sube la predicción y negativo si la baja. En
  regresión está en las unidades de la variable objetivo; en clasificación, en probabilidad.
- El tamaño del peso indica cuánto influye la variable **para ese registro**; otro registro
  puede tener una explicación muy distinta.

## Fidelidad y estabilidad

- **Fidelidad local:** el R² del modelo sustituto (`score`) mide qué tan bien imita al modelo
  cerca del registro, y `local_pred` es la predicción del sustituto. Si el R² es bajo o
  `local_pred` está lejos de la predicción del modelo, la explicación es poco confiable.
- **Estabilidad:** como las perturbaciones son aleatorias, dos ejecuciones pueden dar pesos
  distintos. Aumentar el número de muestras (`num_samples`) estabiliza la explicación a cambio
  de más tiempo. Fije `random_state` para poder reproducirla.

## Limitaciones

- La explicación depende de cómo se perturba y se pondera: otra configuración da otra
  explicación.
- Las perturbaciones pueden crear combinaciones irreales de variables correlacionadas.
- Explica el modelo, no la realidad: no muestra causalidad.

## Código

```python
import numpy as np
from lime.lime_tabular import LimeTabularExplainer

explicador = LimeTabularExplainer(X_train.to_numpy(), feature_names=list(X_train.columns),
                                  mode="regression", categorical_features=indices_categoricas,
                                  random_state=42)
explicacion = explicador.explain_instance(x.to_numpy(), predecir, num_features=8,
                                          num_samples=5000)

print(explicacion.as_list())
print("Predicción del sustituto:", explicacion.local_pred, "R² local:", explicacion.score)
explicacion.as_pyplot_figure()
```

- `X_train` son las variables originales de entrenamiento (las que recibe `predecir`) y `x`, el
  registro que se quiere explicar (una fila, por ejemplo, `X_test.iloc[0]`).
- `indices_categoricas` es la lista de posiciones de las columnas categóricas o binarias, por
  ejemplo, las columnas one-hot.
- `predecir` es la [función de predicción](funcion-prediccion.md).
- `num_features` es el número de variables de la explicación y `num_samples`, el número de
  perturbaciones.
- En clasificación, use `mode="classification"`, agregue
  `class_names=["No", "Sí"]` al explicador y pase una función que devuelva la probabilidad de
  **las dos** clases:
  `lambda X: np.column_stack([1 - predecir_abandono(X), predecir_abandono(X)])`.
  En ese modo, `local_pred` se lee igual.
- En Google Colab, instale la librería con `!pip install lime`.
