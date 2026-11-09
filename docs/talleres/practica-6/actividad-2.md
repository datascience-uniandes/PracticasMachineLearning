# Actividad 2: API con FastAPI

### Datos de trabajo: el archivo `churn_pipeline.joblib` de la [Actividad 1](actividad-1.md)

1. **Cree la estructura del proyecto** en una carpeta de trabajo, por ejemplo, `churn-api/`, con
   los archivos `main.py`, `data_model.py`, `prediction_model.py`, `requirements.txt` y
   `test_request.py`, y una carpeta `model/` con el archivo `churn_pipeline.joblib`
   (vea la [estructura del proyecto](../../ayudas/api-fastapi.md#estructura-del-proyecto)).
   Ábrala en un editor de código, por ejemplo, Visual Studio Code.
2. **Escriba `requirements.txt`** con las librerías de la API y las **mismas versiones** de
   scikit-learn, NumPy, pandas y joblib que anotó en la Actividad 1
   (vea el [código](../../ayudas/api-fastapi.md#codigo)). **¿Qué pasaría si instala otra versión
   de scikit-learn?**
3. **Escriba el modelo de datos (`data_model.py`):** una clase de Pydantic con las variables de
   entrada del _pipeline_, sus tipos y sus rangos válidos según el
   [diccionario de datos](../../datos/churn.md#diccionario-de-datos), y un cliente de ejemplo.
   **¿Por qué conviene validar los datos antes de que lleguen al modelo? ¿Qué variables deben
   aceptar valores faltantes?**
4. **Escriba la clase de predicción (`prediction_model.py`)**, que carga el _pipeline_ con una
   ruta relativa y devuelve la probabilidad de abandono, y la **aplicación (`main.py`)** con tres
   [endpoints](../../glosario.md#endpoint): `GET /`, `GET /ping`, que responde si la API está
   funcionando y el valor de la variable de entorno `ENV`, y `POST /predict`, que recibe una lista
   de clientes y devuelve, para cada uno, la probabilidad de abandono y la clase.
   **¿Por qué el modelo se carga una sola vez al iniciar la API y no en cada petición?**
5. [**Ejecute la API en local:**](../../ayudas/api-fastapi.md#ejecutar-y-probar-en-local) cree y
   active un entorno virtual llamado `model_serving`, instale las dependencias con
   `pip install -r requirements.txt` e inicie la API con `uvicorn main:app --reload`.
6. **Pruebe la API:**

    - **a)** Abra `http://127.0.0.1:8000/ping` en el navegador.
    - **b)** Abra la documentación interactiva en `http://127.0.0.1:8000/docs` y pruebe
      `POST /predict` con el cliente de ejemplo.
    - **c)** En otra terminal, ejecute `python test_request.py`.
    - **d)** Envíe desde `/docs` un cliente con `country` igual a `"GERMANY"` y `age` igual a
      150.

    **¿La probabilidad que devuelve la API para el cliente escrito a mano de la Actividad 1 es la
    misma que obtuvo en el notebook? ¿Qué responde la API con el cliente inválido y por qué?**

!!! success "Fin de la Actividad 2"
    Detenga la API con `Ctrl + C`. Ya estamos listos para continuar con la siguiente actividad.
