# Docker

Cuando una aplicación se ejecuta directamente en un equipo, su comportamiento depende del
sistema operativo, de la versión de Python y de las librerías instaladas. Docker empaqueta la
aplicación con todo lo que necesita para que se ejecute igual en cualquier equipo o servidor.

## Conceptos

- **[Imagen](../glosario.md#imagen-docker):** plantilla inmutable, organizada por capas, que
  contiene el sistema base, las dependencias y el código de la aplicación.
- **[Contenedor](../glosario.md#contenedor):** una imagen en ejecución. A partir de una misma
  imagen se pueden ejecutar varios contenedores.
- **[Dockerfile](../glosario.md#dockerfile):** archivo de instrucciones para construir la
  imagen: la imagen base, la instalación de dependencias, la copia del código y el comando de
  inicio. Cada instrucción crea una **capa** que Docker reutiliza si no cambió, lo que acelera
  las reconstrucciones.
- **`.dockerignore`:** lista de archivos que no deben copiarse a la imagen (cachés, entornos
  virtuales, el repositorio de Git), para reducir su tamaño.
- **Puerto publicado:** la API escucha en el puerto 8000 **dentro** del contenedor; con
  `-p 8000:8000` ese puerto se conecta al puerto 8000 del equipo anfitrión.
- **Variable de entorno:** un valor de configuración que se define al ejecutar el contenedor
  (`-e ENV=dev`) sin cambiar el código.

## Instalar y verificar

Instale Docker Desktop (Windows o macOS) o Docker Engine (Linux) desde el
[sitio oficial de Docker](https://www.docker.com/products/docker-desktop/). En Linux, agregue su
usuario al grupo `docker` para no usar `sudo` y reinicie la sesión. Abra Docker Desktop (si no
tiene cuenta, créela y verifique el correo) y, en una terminal, ejecute:

```bash
docker version
docker info
docker run hello-world
```

Si el contenedor `hello-world` muestra el mensaje de bienvenida, el entorno está listo.

Si en Windows tiene problemas con el motor de Linux, abra PowerShell como administrador y
ejecute (ajuste la ruta de instalación si es distinta):

```bash
cd "C:\Program Files\Docker\Docker"
./DockerCli.exe -SwitchLinuxEngine
```

## Construir y ejecutar

Desde la carpeta del proyecto (donde está el `Dockerfile`):

```bash
docker build -t churn-api:0.1.0 .
docker run --rm -p 8000:8000 -e ENV=dev --name churn-api churn-api:0.1.0
```

- `-t` asigna nombre y versión a la imagen; el punto (`.`) indica que el contexto de
  construcción es la carpeta actual.
- `--rm` borra el contenedor al detenerlo, `-p` publica el puerto, `-e` define la variable de
  entorno `ENV` y `--name` le da un nombre al contenedor.
- El comando queda en ejecución mientras la API esté activa. Pruébela desde otra terminal o desde
  el navegador, y deténgala con `Ctrl + C` (o con `docker stop churn-api`).

## Código

`.dockerignore`:

```text
__pycache__/
*.pyc
*.pyo
*.pyd
*.sqlite3
*.db
.env
.venv/
model_serving/
.git/
.gitignore
README.md
```

`Dockerfile` (sin extensión):

```dockerfile
# 1) Imagen base ligera con Python 3.12
FROM python:3.12-slim

# 2) Ajustes de Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3) Paquetes del sistema: curl, para el healthcheck de Docker Compose
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# 4) Directorio de trabajo dentro del contenedor
WORKDIR /app

# 5) Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6) Copiar el código de la aplicación y el modelo
COPY . .

# 7) Crear y usar un usuario no-root (buena práctica de seguridad)
RUN useradd -u 1000 -m appuser && chown -R appuser:appuser /app
USER appuser

# 8) Documentar el puerto interno
EXPOSE 8000

# 9) Comando por defecto: lanzar Uvicorn en 0.0.0.0:8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- El orden aprovecha el caché: las dependencias, que cambian poco, se instalan antes de copiar el
  código, que cambia seguido. Si solo cambia el código, Docker reutiliza la capa del paso 5.
- `COPY . .` copia también la carpeta `model/` con el _pipeline_.
- `--host 0.0.0.0` hace que la API acepte peticiones desde fuera del contenedor; con el valor por
  defecto (`127.0.0.1`) solo respondería dentro de él.
- La versión de Python de la imagen debe ser compatible con las versiones de `requirements.txt`.
