# Docker Compose

Con [Docker](docker.md), la configuración de la ejecución se escribe en la línea de comandos:

```bash
docker run --rm -p 8000:8000 -e ENV=dev --name churn-api churn-api:0.1.0
```

Funciona, pero obliga a recordar y repetir esos parámetros. Docker Compose los registra **como
código** en un archivo `docker-compose.yml`: la imagen que se construye, los puertos, las
variables de entorno y las comprobaciones de salud. Así la ejecución es reproducible y fácil de
compartir y mantener.

## Comprobación de salud (healthcheck)

El _healthcheck_ consulta periódicamente un [endpoint](../glosario.md#endpoint) de salud, como
`/ping`, para saber si el servicio funciona. Docker marca el contenedor como `healthy` o
`unhealthy` según la respuesta. Usa `curl` dentro del contenedor, por eso el
[Dockerfile](docker.md#codigo) lo instala.

## Comandos

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f
docker compose down
```

- `up` crea la red interna y arranca el servicio; `--build` reconstruye la imagen si cambió el
  código; `-d` deja el servicio en segundo plano y libera la terminal.
- `ps` muestra el estado del servicio (incluido `healthy`) y los puertos publicados.
- `logs -f` muestra los registros en tiempo real, por ejemplo, cada petición que recibe Uvicorn.
  Salga con `Ctrl + C`.
- `down` detiene y elimina el servicio.

## Código

`docker-compose.yml`, en la raíz del proyecto:

```yaml
services:
  api:
    build: .
    image: churn-api:0.1.0
    environment:
      ENV: prod
    ports:
      - "8000:8000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/ping"]
      interval: 30s
      timeout: 5s
      retries: 3
```

- `build: .` construye la imagen con el `Dockerfile` de la carpeta; `image` le da nombre y
  versión.
- `environment` define `ENV=prod`; la respuesta de `/ping` debe mostrarlo.
- `ports` publica el puerto 8000 del contenedor en el 8000 del equipo, con el formato
  `"<puerto_equipo>:<puerto_contenedor>"`.
- `healthcheck` consulta `/ping` cada 30 segundos y marca el servicio como `unhealthy` tras 3
  fallos seguidos.
