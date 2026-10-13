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

## Contexto de la empresa

El abandono de clientes es uno de los mayores costos de un banco: atraer a un cliente nuevo
cuesta varias veces más que retener a uno actual, y un cliente que se va **no se recupera**.
Un banco europeo con operación en **Francia, Alemania y España** tiene una cartera de unos
10.000 clientes y cerca del **20 %** de ellos abandona el banco cada año; en Alemania, donde
los saldos son más altos, la tasa de abandono es casi el doble que en los otros dos países.

Suponga que el banco lanza cada mes una campaña de retención dirigida solo a los clientes
que el modelo marca como riesgo de abandono, y que les ofrece un beneficio (un descuento en
comisiones o un bono) para que se queden. La oferta convence al **50 %** de los clientes que
iban a abandonar, pero se paga por **todos** los clientes contactados, abandonen o no. El
valor de un cliente retenido y el costo de la oferta cambian según el país:

| País | Valor de un cliente retenido \( V \) | Costo de la oferta por cliente contactado \( c \) |
|------|:------------------------------------:|:-------------------------------------------------:|
| Francia | 900 € | 220 € |
| Alemania | 1.500 € | 300 € |
| España | 850 € | 150 € |

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
