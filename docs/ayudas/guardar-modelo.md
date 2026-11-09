# Guardar y cargar un modelo

Para usar un modelo fuera del notebook en el que se entrenó (por ejemplo, en una
[API](../glosario.md#api)), hay que guardarlo en un archivo y cargarlo después. Con scikit-learn
se usa la librería `joblib`, que guarda el objeto de Python completo: los parámetros aprendidos,
los hiperparámetros y, si es un [pipeline](pipeline.md), también el preprocesamiento.

## Qué guardar

- **El pipeline completo**, no solo el modelo. Si guarda solo el clasificador, quien lo use tendrá
  que repetir a mano la imputación, el escalado y la codificación, con los mismos valores del
  entrenamiento; con el _pipeline_, basta con pasarle las variables originales.
- **Las versiones de las librerías.** Un archivo de `joblib` solo se puede cargar de forma segura
  con las **mismas versiones** de scikit-learn (y de NumPy y pandas) con las que se guardó. Con
  otras versiones puede fallar al cargar o, peor, cargar y predecir distinto. Anote las versiones
  y fíjelas en el `requirements.txt` del proyecto que use el modelo.

## Cuidados

- Cargue solo archivos de fuentes de confianza: cargar un archivo de `joblib` ejecuta código de
  Python.
- Las funciones propias que use dentro del _pipeline_ (por ejemplo, en un `FunctionTransformer`)
  deben estar disponibles con el mismo nombre en el programa que carga el modelo; si las definió
  en el notebook, no lo estarán. Por eso conviene construir el _pipeline_ solo con
  transformadores de scikit-learn.

## Código

Guardar el modelo y anotar las versiones:

```python
import joblib
import numpy as np
import pandas as pd
import sklearn

joblib.dump(pipeline, "churn_pipeline.joblib")
print("scikit-learn", sklearn.__version__, "| numpy", np.__version__,
      "| pandas", pd.__version__, "| joblib", joblib.__version__)
```

Cargar el modelo y predecir:

```python
import joblib

pipeline = joblib.load("churn_pipeline.joblib")
probabilidades = pipeline.predict_proba(X_nuevo)[:, 1]
```

- `pipeline` es el _pipeline_ ya entrenado y `X_nuevo`, un `DataFrame` con las variables
  originales.
- En Google Colab, descargue el archivo desde el panel de archivos o con
  `from google.colab import files; files.download("churn_pipeline.joblib")`.
