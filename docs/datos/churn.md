# Abandono de clientes bancarios (churn)

Registros de 10.000 clientes de un banco con su información demográfica y financiera, y si
abandonaron o no el banco (_churn_).

[:material-download: Descargar churn.csv](churn.csv){ .md-button .md-button--primary }

Para cargarlo directamente desde Google Colab:

```python
import pandas as pd

df = pd.read_csv("https://datascience-uniandes.github.io/PracticasMachineLearning/datos/churn.csv")
```

!!! warning "Versión adaptada para el curso"
    Este archivo es una versión modificada del dataset original: incluye a propósito
    problemas de calidad (nulos, duplicados, valores inválidos e inconsistencias) para practicar su
    revisión y tratamiento. Úselo en lugar del original.

## Diccionario de datos

| Variable | Descripción | Tipo | Rango válido |
|----------|-------------|------|--------------|
| `credit_score` | Puntaje crediticio del cliente | Continua | 300 a 850 |
| `country` | País de residencia | Categórica | `'France'`, `'Germany'`, `'Spain'` |
| `gender` | Género | Categórica | `'Female'`, `'Male'` |
| `age` | Edad (años) | Continua | 18 a 100 |
| `tenure` | Años como cliente del banco | Discreta | 0 a 10 |
| `balance` | Saldo en la cuenta | Continua | ≥ 0 |
| `products_number` | Número de productos contratados con el banco | Discreta | 1 a 4 |
| `credit_card` | Tiene tarjeta de crédito (1 = sí, 0 = no) | Binaria | 0 o 1 |
| `active_member` | Es miembro activo (1 = sí, 0 = no) | Binaria | 0 o 1 |
| `estimated_salary` | Salario estimado | Continua | ≥ 0 |
| `churn` | Abandonó el banco (1 = sí, 0 = no). **Variable objetivo** | Binaria | 0 o 1 |

## Fuente

_Bank Customer Churn Dataset_ publicado en
[Kaggle](https://www.kaggle.com/datasets/gauravtopre/bank-customer-churn-dataset).

## Usado en

- [Práctica 2: Clasificación](../talleres/practica-2/index.md)
