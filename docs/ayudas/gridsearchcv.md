# Optimizar hiperparámetros con GridSearchCV

`GridSearchCV` prueba varios valores de un [hiperparámetro](../glosario.md#hiperparametro), evalúa
cada uno con [validación cruzada](../glosario.md#validacion-cruzada) sobre el
[conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) y se queda con el mejor. Un uso
típico es elegir la **fuerza de la regularización** de un modelo: el `alpha` de
[Lasso o Ridge](lasso-ridge.md), o el `C` de una [regresión logística](regresion-logistica.md).

Antes de leer esta página, conviene conocer `KFold` y `cross_val_score`, explicados en
[validación cruzada K-fold](validacion-cruzada.md), y cómo separar los datos en
[entrenamiento y prueba](division-datos.md).

## Cómo funciona

1. Usted define una lista de valores para el hiperparámetro, por ejemplo
   `alpha` ∈ {0,01; 0,1; 1; 10; 100}.
2. Para cada valor, `GridSearchCV` entrena el modelo K veces con la validación cruzada y promedia
   la métrica de los K folds de validación.
3. Elige el valor con la mejor métrica promedio y, al final, vuelve a entrenar el modelo con ese
   valor usando todo el conjunto de entrenamiento.

Con 5 valores y 5 folds se entrenan 25 modelos, más el entrenamiento final.

!!! warning "Escale antes de buscar"
    La regularización depende de la escala de las variables, así que
    [escale las variables](escalar-variables.md) antes de la búsqueda: ajuste el escalador con
    `X_train` y transforme con él `X_train` y `X_test`.

## Elegir `scoring`

`scoring` es la métrica con la que se comparan los valores. `GridSearchCV` siempre elige el
**mayor** *score*, por eso las métricas de error se usan con signo negativo:

| Tipo de problema | Ejemplos de `scoring` | Lectura de `best_score_` |
|------------------|-----------------------|--------------------------|
| Regresión | `"neg_root_mean_squared_error"`, `"neg_mean_absolute_error"`, `"r2"` | Con `neg_`, cambie el signo (`-busqueda.best_score_`) para obtener el error |
| Clasificación | `"accuracy"`, `"f1"`, `"roc_auc"` | Se lee directamente: más alto es mejor |

Si no indica `scoring`, se usa el método `score` del modelo (R² en regresión, exactitud en
clasificación). La lista completa de nombres está en la
[documentación de scikit-learn sobre *scorers*](https://scikit-learn.org/stable/modules/model_evaluation.html#string-name-scorers).

## Cómo leer los resultados

- La mejor métrica promedio indica el valor que mejor equilibra
  [subajuste](../glosario.md#subajuste) y [sobreajuste](../glosario.md#sobreajuste) (vea
  [compromiso sesgo-varianza](compromiso-sesgo-varianza.md)). Con una regularización **muy
  fuerte** el modelo se vuelve demasiado simple y la métrica empeora por subajuste; con una **muy
  débil**, puede empeorar por sobreajuste.
- Si varios valores tienen métricas muy parecidas (diferencias menores que su desviación estándar
  entre folds), prefiera el que da el modelo más simple, es decir, la regularización más fuerte.
- En los resultados, «test» se refiere al fold de validación de cada partición, no al
  [conjunto de prueba](../glosario.md#conjunto-prueba). El conjunto de prueba se usa **una sola
  vez**, al final, con el modelo elegido: si lo consultara para elegir el hiperparámetro, dejaría
  de ser una estimación honesta del desempeño con datos nuevos.

!!! warning "Si el mejor valor está en el borde de la lista, amplíela"
    Si el mejor valor es el más pequeño o el más grande de la lista, el verdadero óptimo puede
    estar **fuera** de ella. Agregue valores más allá de ese extremo y repita la búsqueda hasta
    que el mejor valor quede rodeado por valores con peor métrica.

## Código: buscar el mejor valor

```python
from sklearn.model_selection import KFold, GridSearchCV

param_grid = {"alpha": [0.01, 0.1, 1, 10, 100]}
kf = KFold(n_splits=5, shuffle=True, random_state=42)

busqueda = GridSearchCV(modelo, param_grid, cv=kf, scoring="neg_root_mean_squared_error")
busqueda.fit(X_train, y_train)

print("Mejor valor:", busqueda.best_params_)
print("Métrica de validación cruzada:", -busqueda.best_score_)
```

- `modelo` es el modelo sin entrenar, por ejemplo `Ridge()` o `Lasso(max_iter=10000)`.
- `param_grid` es un diccionario: la clave es el **nombre exacto** del hiperparámetro en
  scikit-learn (`"alpha"` en Lasso y Ridge, `"C"` en regresión logística) y el valor, la lista de
  valores a probar.
- `kf` define las particiones de la validación cruzada. También puede escribir `cv=5`; en
  clasificación, scikit-learn usa entonces particiones estratificadas.
- `X_train` e `y_train` son los datos de entrenamiento, ya escalados.
- `busqueda.best_params_` es el mejor valor encontrado y `busqueda.best_score_` su métrica
  promedio de validación cruzada (con signo negativo si la métrica empieza por `neg_`).

## Código: evaluar una sola vez en prueba

```python
y_pred = busqueda.predict(X_test)
```

`busqueda` guarda el modelo ya reentrenado con el mejor valor (también disponible en
`busqueda.best_estimator_`), así que se usa directamente para predecir `X_test`. Con `y_pred`
calcule las métricas que necesite.
