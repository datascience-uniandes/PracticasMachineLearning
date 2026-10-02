# Clientes de tarjetas de crédito

Registros de unos 9.000 titulares de tarjetas de crédito con su comportamiento de uso durante los
últimos 6 a 12 meses: saldos, compras, avances en efectivo, pagos y límite de crédito. El dataset
**no tiene variable objetivo**: se usa para encontrar grupos de clientes con comportamientos
parecidos.

[:material-download: Descargar tarjetas.csv](tarjetas.csv){ .md-button .md-button--primary }

Para cargarlo directamente desde Google Colab:

```python
import pandas as pd

df = pd.read_csv("https://datascience-uniandes.github.io/PracticasMachineLearning/datos/tarjetas.csv")
```

!!! warning "Versión adaptada para el curso"
    Este archivo es una versión modificada del dataset original: incluye problemas de calidad
    (nulos, duplicados, valores inválidos e inconsistencias) para practicar su revisión y
    tratamiento. Úselo en lugar del original.

## Diccionario de datos

Los montos están en dólares. Las frecuencias son proporciones entre 0 y 1: 1 significa que la
acción ocurrió en todos los meses del periodo y 0, en ninguno.

| Variable | Descripción | Tipo | Rango válido |
|----------|-------------|------|--------------|
| `CUST_ID` | Identificador del titular (`C` seguido de números) | Identificador | `C10001`, `C10002`, … |
| `BALANCE` | Saldo pendiente en la cuenta | Continua | ≥ 0 |
| `BALANCE_FREQUENCY` | Frecuencia con que se actualiza el saldo | Proporción | 0 a 1 |
| `PURCHASES` | Monto total de compras | Continua | ≥ 0 |
| `ONEOFF_PURCHASES` | Monto de compras hechas en un solo pago | Continua | ≥ 0 |
| `INSTALLMENTS_PURCHASES` | Monto de compras hechas a cuotas | Continua | ≥ 0 |
| `CASH_ADVANCE` | Monto de avances en efectivo | Continua | ≥ 0 |
| `PURCHASES_FREQUENCY` | Frecuencia de compras | Proporción | 0 a 1 |
| `ONEOFF_PURCHASES_FREQUENCY` | Frecuencia de compras en un solo pago | Proporción | 0 a 1 |
| `PURCHASES_INSTALLMENTS_FREQUENCY` | Frecuencia de compras a cuotas | Proporción | 0 a 1 |
| `CASH_ADVANCE_FREQUENCY` | Frecuencia de avances en efectivo | Proporción | 0 a 1 |
| `CASH_ADVANCE_TRX` | Número de transacciones de avance en efectivo | Discreta | ≥ 0 |
| `PURCHASES_TRX` | Número de transacciones de compra | Discreta | ≥ 0 |
| `CREDIT_LIMIT` | Límite de crédito de la tarjeta | Continua | > 0 |
| `PAYMENTS` | Monto total pagado | Continua | ≥ 0 |
| `MINIMUM_PAYMENTS` | Monto total de pagos mínimos | Continua | ≥ 0 |
| `PRC_FULL_PAYMENT` | Proporción de meses en que pagó el saldo completo | Proporción | 0 a 1 |
| `TENURE` | Meses del periodo de servicio registrado | Discreta | 6 a 12 |

`PURCHASES` debería ser la suma de `ONEOFF_PURCHASES` e `INSTALLMENTS_PURCHASES`.

## Fuente

_Credit Card Dataset for Clustering_, publicado en
[Kaggle](https://www.kaggle.com/datasets/arjunbhasin2013/ccdata).

## Usado en

- [Práctica 3: Agrupación](../talleres/practica-3/index.md)
