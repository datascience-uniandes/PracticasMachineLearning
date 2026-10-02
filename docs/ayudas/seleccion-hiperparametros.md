# Seleccionar hiperparámetros con validación

Un [hiperparámetro](../glosario.md#hiperparametro) es un valor que se fija **antes** de entrenar
y que el modelo no aprende de los datos, por ejemplo el grado de una
[regresión polinomial](regresion-polinomial.md). Para elegirlo se entrenan varios modelos, uno
por cada valor, y se comparan en un
[conjunto de validación](../glosario.md#conjunto-validacion): datos que el modelo no usó para
entrenar, pero que tampoco son los de prueba.

## Dividir en entrenamiento, validación y prueba

```python
from sklearn.model_selection import train_test_split

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)
```

La primera división separa el 60 % para entrenamiento y deja el 40 % en `X_temp`; la segunda
divide ese 40 % por la mitad: 20 % para validación (`X_val`, `y_val`) y 20 % para prueba
(`X_test`, `y_test`). Vea [división de datos](division-datos.md#validacion).

!!! warning "No elija con el conjunto de prueba"
    Si compara los grados con el conjunto de prueba, el modelo elegido queda ajustado a esos
    datos y su métrica de prueba deja de ser una estimación honesta del error con datos nuevos.
    El conjunto de prueba se usa **una sola vez**, al final.

## Recorrer los valores del hiperparámetro

```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

resultados = []
for grado in [1, 2, 3, 4, 5]:
    polinomio = PolynomialFeatures(degree=grado, include_bias=False)
    X_poly_train = polinomio.fit_transform(X_train)
    X_poly_val = polinomio.transform(X_val)

    escalador = StandardScaler()
    X_train_esc = escalador.fit_transform(X_poly_train)
    X_val_esc = escalador.transform(X_poly_val)

    modelo = LinearRegression()
    modelo.fit(X_train_esc, y_train)
    y_pred_train = modelo.predict(X_train_esc)
    y_pred_val = modelo.predict(X_val_esc)
    resultados.append({
        "grado": grado,
        "R2_train": r2_score(y_train, y_pred_train),
        "R2_val": r2_score(y_val, y_pred_val),
        "RMSE_train": np.sqrt(mean_squared_error(y_train, y_pred_train)),
        "RMSE_val": np.sqrt(mean_squared_error(y_val, y_pred_val)),
    })

tabla = pd.DataFrame(resultados)
print(tabla.round(3))
```

- En cada vuelta se generan los términos polinomiales del `grado` correspondiente: `polinomio`
  se ajusta con `X_train` (`fit_transform`) y transforma `X_val` (`transform`).
- `escalador` se crea de nuevo en cada vuelta, porque el número de columnas cambia con el grado.
  También se ajusta **solo** con los datos de entrenamiento; `X_train_esc` y `X_val_esc` son
  las variables ya estandarizadas.
- El modelo se entrena **solo** con `X_train_esc` y se evalúa en entrenamiento y en validación.
- `resultados` es una lista de diccionarios, uno por grado; `pd.DataFrame` la convierte en una
  tabla con una fila por grado.
- Puede agregar otras métricas, como el [MAE](mae.md) con `mean_absolute_error`. Vea
  [R²](r2.md), [RMSE](rmse.md) y [comparar métricas](comparar-metricas.md).

Si aplica el polinomio solo a las variables continuas, reemplace las líneas de `polinomio` por
el código con `pd.concat` de la sección *Aplicar el polinomio solo a las variables continuas* de
[regresión polinomial](regresion-polinomial.md), usando `X_val` en lugar de `X_test`.

## Graficar la curva de validación

```python
import matplotlib.pyplot as plt

plt.plot(tabla["grado"], tabla["RMSE_train"], marker="o", label="Entrenamiento")
plt.plot(tabla["grado"], tabla["RMSE_val"], marker="o", label="Validación")
plt.xlabel("Grado del polinomio")
plt.ylabel("RMSE")
plt.legend()
plt.show()
```

La curva de validación muestra el error de entrenamiento y el de validación para cada valor del
hiperparámetro. Si los valores de validación crecen mucho, agregue `plt.yscale("log")` antes de
`plt.show()` para ver mejor la zona de errores pequeños.

## Leer la curva: compromiso sesgo-varianza

| Zona de la curva | Entrenamiento | Validación | Diagnóstico |
|------------------|---------------|------------|-------------|
| Grados bajos | Error alto | Error alto, parecido al de entrenamiento | [Subajuste](../glosario.md#subajuste): **alto sesgo**, el modelo es demasiado simple para la forma de los datos |
| Grado intermedio | Error bajo | Error mínimo | Equilibrio entre sesgo y varianza |
| Grados altos | Error cada vez más bajo | Error que sube y se aleja del de entrenamiento | [Sobreajuste](../glosario.md#sobreajuste): **alta varianza**, el modelo memoriza el ruido de los datos de entrenamiento |

Este equilibrio se conoce como
[compromiso sesgo-varianza](../glosario.md#compromiso-sesgo-varianza): al aumentar la
complejidad del modelo baja el sesgo, pero sube la varianza. El error de entrenamiento casi
siempre baja al subir el grado; por eso **no sirve** para elegirlo. El que importa es el de
validación. Vea [compromiso sesgo-varianza](compromiso-sesgo-varianza.md) para una explicación
más detallada.
