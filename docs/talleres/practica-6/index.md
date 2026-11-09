# Práctica 6: Despliegue

Un modelo solo genera valor cuando otros sistemas pueden usarlo. En esta práctica se toma el
modelo de **abandono** (_churn_) de la Práctica 2, se convierte en un **pipeline** que incluye
todo el preprocesamiento, se expone mediante una **API** con FastAPI y se despliega en un
**contenedor de Docker**, de modo que se ejecute igual en cualquier equipo o servidor.

### Datos de trabajo: [churn.csv](../../datos/churn.md)

Parta del dataset tratado en la [Actividad 1 de la Práctica 2](../practica-2/actividad-1.md).

!!! info "Dónde se trabaja"
    La Actividad 1 puede hacerse en Google Colab. Las Actividades 2 y 3 se hacen en su equipo,
    con un editor de código (por ejemplo, Visual Studio Code), una terminal, Python y
    [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Actividades

1. [Actividad 1: Pipeline del modelo](actividad-1.md)
2. [Actividad 2: API con FastAPI](actividad-2.md)
3. [Actividad 3: Despliegue con Docker](actividad-3.md)

## Referencias

- [Tutorial de despliegue de modelos con FastAPI y Docker](https://github.com/datascience-uniandes/model-deployment-tutorial)
  (repositorio del curso).
