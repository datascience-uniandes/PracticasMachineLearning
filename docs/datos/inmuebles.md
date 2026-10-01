# Venta de inmuebles

Registros de unas 21.600 ventas de casas en el condado de King (Washington, Estados Unidos) entre
mayo de 2014 y mayo de 2015, con las características de cada casa y su **precio de venta**.

[:material-download: Descargar inmuebles.csv](inmuebles.csv){ .md-button .md-button--primary }

Para cargarlo directamente desde Google Colab:

```python
import pandas as pd

df = pd.read_csv("https://datascience-uniandes.github.io/PracticasMachineLearning/datos/inmuebles.csv")
```

!!! warning "Versión adaptada para el curso"
    Este archivo es una versión modificada del dataset original: incluye problemas de calidad
    (nulos, duplicados, valores inválidos e inconsistencias) para practicar su revisión y
    tratamiento. Úselo en lugar del original.

## Diccionario de datos

Las áreas están en **pies cuadrados** y el precio en **dólares**.

| Variable | Descripción | Tipo | Rango válido |
|----------|-------------|------|--------------|
| `Id` | Identificador de la casa. Una casa vendida dos veces aparece con el mismo `Id` | Identificador | — |
| `Fecha` | Fecha de la venta (`AAAAMMDDT000000`) | Fecha | mayo 2014 a mayo 2015 |
| `Precio` | Precio de venta (USD). **Variable objetivo** | Continua | > 0 |
| `Cuartos` | Número de habitaciones | Discreta | 0 a 15 |
| `Baños` | Número de baños (0,25 = baño con un solo elemento, 0,5 = medio baño) | Discreta | 0 a 8 |
| `AreaHabitable` | Área construida habitable | Continua | > 0 |
| `AreaLote` | Área del lote | Continua | > 0 |
| `Pisos` | Número de pisos | Discreta | 1 a 3,5 |
| `FrenteMar` | La casa tiene vista frente al mar | Categórica | `'SI'`, `'NO'` |
| `Vista` | Calidad de la vista | Ordinal | 0 a 4 |
| `Condición` | Estado general de la casa | Ordinal | 1 a 5 |
| `Calificación` | Calidad de la construcción y el diseño | Ordinal | 1 a 13 |
| `AreaSuperior` | Área construida sobre el nivel del suelo | Continua | > 0 |
| `AreaBase` | Área del sótano | Continua | ≥ 0 |
| `Años` | Año de construcción | Discreta | 1900 a 2015 |
| `Renovación` | Año de la última renovación (0 = nunca renovada) | Discreta | 0, o 1900 a 2015 |
| `CodigoPostal` | Código postal | Categórica | 98001 a 98199 |
| `Latitud` | Latitud (grados) | Continua | 47,1 a 47,8 |
| `Longitud` | Longitud (grados) | Continua | −122,6 a −121,3 |
| `AreaHabitable15` | Área habitable promedio de las 15 casas vecinas más cercanas | Continua | > 0 |
| `AreaLote15` | Área del lote promedio de las 15 casas vecinas más cercanas | Continua | > 0 |

`AreaHabitable` es la suma de `AreaSuperior` y `AreaBase`.

## Fuente

_House Sales in King County, USA_, publicado en
[Kaggle](https://www.kaggle.com/datasets/harlfoxem/housesalesprediction), con los nombres de las
columnas traducidos al español.

## Usado en

- [Práctica 1: Regresión lineal](../talleres/practica-1/index.md)
