# Incendios forestales de Montesinho

Registros de 517 incendios forestales en el Parque Natural de Montesinho (noreste de Portugal)
entre 2000 y 2003, con las condiciones meteorológicas del día y el área quemada.

[:material-download: Descargar forestfires.csv](forestfires.csv){ .md-button .md-button--primary }

Para cargarlo directamente desde Google Colab:

```python
import pandas as pd

df = pd.read_csv("https://datascience-uniandes.github.io/PracticasMachineLearning/datos/forestfires.csv")
```

!!! warning "Versión adaptada para el curso"
    Este archivo es una versión modificada del dataset original: incluye a propósito problemas de
    calidad (nulos, duplicados, valores inválidos e inconsistencias) para practicar su revisión y
    tratamiento. Úselo en lugar del original.

## Diccionario de datos

| Variable | Descripción | Tipo | Rango válido |
|----------|-------------|------|--------------|
| `X` | Coordenada X de la celda dentro del mapa del parque | Entero (categórica) | 1 a 9 |
| `Y` | Coordenada Y de la celda dentro del mapa del parque | Entero (categórica) | 2 a 9 |
| `month` | Mes del año | Categórica | `'jan'`, `'feb'`, …, `'dec'` |
| `day` | Día de la semana | Categórica | `'mon'`, `'tue'`, …, `'sun'` |
| `FFMC` | Índice de humedad de combustibles finos (_Fine Fuel Moisture Code_) | Continua | 0 a 101 |
| `DMC` | Índice de humedad de la capa orgánica (_Duff Moisture Code_) | Continua | ≥ 0 |
| `DC` | Índice de sequía (_Drought Code_) | Continua | ≥ 0 |
| `ISI` | Índice de propagación inicial (_Initial Spread Index_) | Continua | ≥ 0 |
| `temp` | Temperatura (°C) | Continua | −10 a 50 |
| `RH` | Humedad relativa (%) | Continua | 0 a 100 |
| `wind` | Velocidad del viento (km/h) | Continua | ≥ 0 |
| `rain` | Lluvia (mm/m²) | Continua | ≥ 0 |
| `area` | Área quemada (hectáreas). Un valor de 0 indica menos de 1 ha. **Variable objetivo** | Continua | ≥ 0 |

`FFMC`, `DMC`, `DC` e `ISI` son componentes del sistema canadiense de índices de peligro de
incendio (_Fire Weather Index_).

## Fuente

Cortez, P. y Morais, A. (2007). _A Data Mining Approach to Predict Forest Fires using
Meteorological Data_. [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/162/forest+fires),
licencia CC BY 4.0.

## Usado en

- [Práctica 1: Regresión lineal](../talleres/practica-1/index.md)
