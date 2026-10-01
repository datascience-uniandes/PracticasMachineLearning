# Práctica 1: Regresión lineal

En esta práctica se analizan los incendios forestales del Parque Natural de Montesinho (Portugal)
para entender qué factores meteorológicos, temporales y espaciales influyen en el **área quemada**.

### Datos de trabajo: [forestfires.csv](https://archive.ics.uci.edu/dataset/162/forest+fires)

??? info "Diccionario de datos"

    | Variable | Descripción |
    |----------|-------------|
    | `X` | Coordenada espacial X dentro del mapa del parque (entero, de 1 a 9) |
    | `Y` | Coordenada espacial Y dentro del mapa del parque (entero, de 2 a 9) |
    | `month` | Mes del año: `'jan'`, `'feb'`, …, `'dec'` |
    | `day` | Día de la semana: `'mon'`, `'tue'`, …, `'sun'` |
    | `FFMC` | Índice de humedad de combustibles finos (_Fine Fuel Moisture Code_) |
    | `DMC` | Índice de humedad de la capa orgánica (_Duff Moisture Code_) |
    | `DC` | Índice de sequía (_Drought Code_) |
    | `ISI` | Índice de propagación inicial (_Initial Spread Index_) |
    | `temp` | Temperatura (°C) |
    | `RH` | Humedad relativa (%) |
    | `wind` | Velocidad del viento (km/h) |
    | `rain` | Lluvia (mm/m²) |
    | `area` | Área quemada (hectáreas, incluye ceros). **Variable objetivo** |

## Actividades

1. [Actividad 1: Entendimiento de datos](actividad-1.md)
