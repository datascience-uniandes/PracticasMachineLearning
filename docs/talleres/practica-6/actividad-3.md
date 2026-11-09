# Actividad 3: Despliegue con Docker

### Datos de trabajo: el proyecto `churn-api/` de la [Actividad 2](actividad-2.md)

1. [**Instale y verifique Docker:**](../../ayudas/docker.md#instalar-y-verificar) instale Docker
   Desktop, ábralo y ejecute en una terminal `docker version`, `docker info` y
   `docker run hello-world`. **¿Qué diferencia hay entre una
   [imagen](../../glosario.md#imagen-docker) y un [contenedor](../../glosario.md#contenedor)?**
2. **Excluya los archivos no relevantes:** cree el archivo `.dockerignore` en la raíz del proyecto
   (vea el [código](../../ayudas/docker.md#codigo)). **¿Por qué no debe copiarse el entorno
   virtual `model_serving/` a la imagen?**
3. **Defina la imagen:** cree el [Dockerfile](../../glosario.md#dockerfile), sin extensión, en la
   raíz del proyecto (vea el [código](../../ayudas/docker.md#codigo)). **¿Por qué se instalan las
   dependencias antes de copiar el código? ¿Para qué sirve el usuario no-root? ¿Por qué Uvicorn
   debe escuchar en `0.0.0.0`?**
4. [**Construya la imagen y ejecute el contenedor:**](../../ayudas/docker.md#construir-y-ejecutar)

    ```bash
    docker build -t churn-api:0.1.0 .
    docker run --rm -p 8000:8000 -e ENV=dev --name churn-api churn-api:0.1.0
    ```

    **¿Qué indican `-t`, `-p` y `-e`? ¿Cuánto pesa la imagen (`docker images`)?**

5. **Pruebe la API en el contenedor:** en otra terminal o en el navegador, consulte
   `http://localhost:8000/ping` y `http://localhost:8000/docs`, y ejecute
   `python test_request.py`. **¿Qué valor de `env` devuelve `/ping`? ¿Las predicciones son las
   mismas que en local?** Detenga el contenedor con `Ctrl + C`.
6. [**Use Docker Compose:**](../../ayudas/docker-compose.md) cree el archivo
   `docker-compose.yml` con `ENV: prod`, el puerto `"8000:8000"` y el _healthcheck_ de `/ping`, y
   levante el servicio con `docker compose up --build -d`. Revise su estado con
   `docker compose ps`, sus registros con `docker compose logs -f` y la respuesta de
   `http://localhost:8000/ping`, y detenga el servicio con `docker compose down`.
   **¿El servicio aparece como `healthy`? ¿Qué cambió en la respuesta de `/ping` y por qué? ¿Qué
   ventaja tiene Docker Compose frente a escribir el comando `docker run`?**

!!! success "Fin de la Práctica 6"
    Ha desplegado el modelo de abandono como una API en un contenedor. Para detener Docker, cierre
    Docker Desktop (Windows y macOS) o ejecute `sudo systemctl stop docker` (Linux).
