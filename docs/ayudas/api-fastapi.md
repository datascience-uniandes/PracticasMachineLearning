# Crear una API con FastAPI

Una [API](../glosario.md#api) permite que otros programas usen un modelo sin saber Python ni
abrir un notebook: envían los datos de un cliente por internet (HTTP) y reciben la predicción.
FastAPI es una librería de Python para crear APIs que valida automáticamente los datos de
entrada y genera una página de documentación interactiva.

## Conceptos

- **[Endpoint](../glosario.md#endpoint):** una dirección de la API que responde a un tipo de
  petición, por ejemplo, `GET /ping` o `POST /predict`. `GET` se usa para consultar y `POST`,
  para enviar datos.
- **Endpoint de salud (`/ping`):** responde si la API está funcionando. Lo usan las herramientas
  de despliegue, como el _healthcheck_ de [Docker Compose](docker-compose.md).
- **JSON:** el formato de texto en que viajan los datos de la petición y de la respuesta.
- **Modelo de datos (Pydantic):** una clase que declara qué variables debe traer cada registro,
  su tipo y su rango válido. Si llega un valor inválido (un país que no existe, una edad de 150
  años), la API responde con un error 422 que explica qué campo falló, sin llegar al modelo.
- **Uvicorn:** el servidor que ejecuta la aplicación de FastAPI y atiende las peticiones.

## Estructura del proyecto

```text
churn-api/
 ├── main.py              # aplicación de FastAPI y sus endpoints
 ├── data_model.py        # modelo de datos de entrada (Pydantic)
 ├── prediction_model.py  # carga del pipeline y predicción
 ├── model/
 │    └── churn_pipeline.joblib
 ├── requirements.txt
 └── test_request.py      # script para probar la API
```

- El modelo se carga **una sola vez**, al iniciar la API, y no en cada petición.
- La ruta del modelo es **relativa** (`model/churn_pipeline.joblib`) para que funcione igual en
  su equipo y dentro de un [contenedor](../glosario.md#contenedor).

## Ejecutar y probar en local

1. Cree y active un entorno virtual, e instale las dependencias:

    ```bash
    python -m venv model_serving
    ```

    En Windows, actívelo con `.\model_serving\Scripts\activate`; en macOS o Linux, con
    `source model_serving/bin/activate`. Luego instale los paquetes:

    ```bash
    pip install -r requirements.txt
    ```

2. Inicie la API desde la carpeta del proyecto:

    ```bash
    uvicorn main:app --reload
    ```

    `--reload` reinicia la API cada vez que guarda un cambio en el código. Detenga la API con
    `Ctrl + C`.

3. Pruébela:
    - `http://127.0.0.1:8000/ping` en el navegador debe responder `{"ok": true, "env": "local"}`.
    - `http://127.0.0.1:8000/docs` abre la documentación interactiva: en `POST /predict`, use
      **Try it out** con el ejemplo y **Execute**.
    - En otra terminal, `python test_request.py` envía dos clientes y muestra sus predicciones.

## Código

`data_model.py`:

```python
from typing import Literal, Optional

from pydantic import BaseModel, Field


class DataModel(BaseModel):
    credit_score: Optional[float] = Field(None, ge=300, le=850)
    country: Literal["France", "Germany", "Spain"]
    gender: Literal["Female", "Male"]
    age: Optional[float] = Field(None, ge=18, le=100)
    tenure: int = Field(ge=0, le=10)
    balance: Optional[float] = Field(None, ge=0)
    products_number: int = Field(ge=1, le=4)
    credit_card: Literal[0, 1]
    active_member: Literal[0, 1]
    estimated_salary: Optional[float] = Field(None, ge=0)

    model_config = {
        "json_schema_extra": {
            "example": {
                "credit_score": 600,
                "country": "Germany",
                "gender": "Female",
                "age": 45,
                "tenure": 3,
                "balance": 120000.0,
                "products_number": 1,
                "credit_card": 1,
                "active_member": 0,
                "estimated_salary": 85000.0,
            }
        }
    }
```

- Cada atributo es una variable de entrada del _pipeline_, con el mismo nombre.
- `Literal` limita los valores permitidos; `Field(ge=..., le=...)`, el rango; `Optional` permite
  enviar `null` en las variables que el _pipeline_ imputa.
- `example` es el cliente de ejemplo que aparece en `/docs`.

`prediction_model.py`:

```python
import joblib


class PredictionModel:

    def __init__(self):
        MODEL_PATH = "model/churn_pipeline.joblib"  # ruta relativa, válida también en el contenedor
        self.model = joblib.load(MODEL_PATH)

    def get_churn_probability(self, data):
        return self.model.predict_proba(data)[:, 1]
```

`main.py`:

```python
import os
from typing import List

import pandas as pd
from fastapi import FastAPI

from data_model import DataModel
from prediction_model import PredictionModel

app = FastAPI(title="API de predicción de abandono de clientes")
prediction_model = PredictionModel()


@app.get("/")
def read_root():
    return {"message": "API de predicción de abandono de clientes"}


@app.get("/ping")
def ping():
    return {"ok": True, "env": os.environ.get("ENV", "local")}


@app.post("/predict")
def make_predictions(X: List[DataModel]):
    data = pd.DataFrame([x.model_dump() for x in X])
    probabilidades = prediction_model.get_churn_probability(data)
    return [{"probabilidad_abandono": round(float(p), 4), "abandona": int(p >= 0.5)}
            for p in probabilidades]
```

- `@app.get` y `@app.post` asocian cada función a un endpoint.
- `/predict` recibe una **lista** de clientes, la convierte en un `DataFrame` con las columnas
  que espera el _pipeline_ y devuelve, por cliente, la probabilidad de abandono y la clase.
- `/ping` devuelve el valor de la variable de entorno `ENV`, que se define al ejecutar el
  contenedor.

`requirements.txt` (reemplace las versiones de scikit-learn, NumPy, pandas y joblib por las que
imprimió al [guardar el modelo](guardar-modelo.md)):

```text
fastapi==0.115.4
uvicorn==0.32.0
scikit-learn==1.6.1
numpy==2.0.2
pandas==2.2.2
joblib==1.4.2
requests==2.32.3
```

`test_request.py`:

```python
import requests

url = "http://127.0.0.1:8000/predict"
clientes = [
    {"credit_score": 600, "country": "Germany", "gender": "Female", "age": 45, "tenure": 3,
     "balance": 120000.0, "products_number": 1, "credit_card": 1, "active_member": 0,
     "estimated_salary": None},
    {"credit_score": 720, "country": "France", "gender": "Male", "age": 30, "tenure": 7,
     "balance": 0.0, "products_number": 2, "credit_card": 1, "active_member": 1,
     "estimated_salary": 60000.0},
]

response = requests.post(url, json=clientes)
print("Respuesta:", response.json() if response.status_code == 200 else response.text)
```

- `None` en Python se envía como `null` en JSON: el _pipeline_ imputa ese valor.
- Si la respuesta no es exitosa, se imprime el mensaje de error, por ejemplo, el de validación.
