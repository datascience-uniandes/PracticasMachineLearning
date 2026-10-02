# Validación cruzada K-fold

Con un solo [conjunto de validación](../glosario.md#conjunto-validacion) (vea
[división de datos](division-datos.md#validacion)), la elección de los
[hiperparámetros](../glosario.md#hiperparametro) depende de **qué registros** cayeron en ese
conjunto: con otra división aleatoria el mejor valor puede cambiar. Además, esos registros no se
usan para entrenar. La [validación cruzada](../glosario.md#validacion-cruzada) K-fold resuelve
los dos problemas.

## Qué es la validación cruzada K-fold

1. Se divide el [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento) en **K partes
   del mismo tamaño** (los *folds*).
2. Se entrena el modelo con K−1 folds y se calcula la métrica en el fold restante, que hace de
   validación.
3. Se repite el paso 2 **K veces**, cada vez con un fold distinto como validación.
4. Se promedian las K métricas. Ese promedio es la estimación del error con datos nuevos.

![Esquema de validación cruzada con 5 folds: en cada iteración un fold distinto es de validación y los otros cuatro de entrenamiento](../assets/img/ayudas/validacion-cruzada.png)

Frente a una sola división en entrenamiento y validación:

- **Usa todos los datos de entrenamiento:** cada registro sirve para validar una vez y para
  entrenar K−1 veces. No hace falta apartar un 20 % fijo solo para validación.
- **Depende menos de una división:** el resultado es un promedio de K evaluaciones, no de una
  sola, así que una división "afortunada" o "desafortunada" pesa mucho menos.
- **Indica la variabilidad:** la desviación estándar de las K métricas muestra qué tan estable es
  el resultado.

El costo es entrenar el modelo K veces por cada combinación de hiperparámetros. Los valores más
usados son K = 5 y K = 10.

!!! warning "La prueba queda fuera"
    La validación cruzada se hace **solo con el conjunto de entrenamiento**. El
    [conjunto de prueba](../glosario.md#conjunto-prueba) se separa antes con
    `train_test_split` y se usa una sola vez, al final, con el modelo ya elegido.

## Regresión y clasificación

La validación cruzada funciona igual con cualquier modelo. Solo cambian dos cosas según el tipo de
problema:

| | Regresión | Clasificación |
|---|---|---|
| Cómo partir los datos | `KFold` | `StratifiedKFold`: cada fold conserva la proporción de clases del conjunto de entrenamiento, algo importante con [desbalance de clases](../glosario.md#desbalance-de-clases) |
| Ejemplos de `scoring` | `"neg_root_mean_squared_error"` ([RMSE](rmse.md)), `"neg_mean_absolute_error"` ([MAE](mae.md)), `"r2"` ([R²](r2.md)) | `"accuracy"` ([exactitud](exactitud.md)), `"f1"` ([F1](f1.md)), `"precision"`, `"recall"`, `"roc_auc"` ([AUC](curva-roc.md)) |

Si pasa un número entero (`cv=5`) en lugar de un objeto, scikit-learn usa `StratifiedKFold` en
clasificación y `KFold` en regresión, pero sin mezclar los registros antes de partirlos. Por eso
conviene crear el objeto explícitamente con `shuffle=True`.

### Por qué algunas métricas salen negativas

scikit-learn siempre **maximiza** el *score*: un valor más grande significa un modelo mejor. En
las métricas de error, como el RMSE o el MAE, un valor más pequeño es mejor, así que se usan con
el signo cambiado: `"neg_root_mean_squared_error"` devuelve \( -\text{RMSE} \). Multiplique por
−1 para volver a la escala original. Las métricas en las que más alto ya es mejor (R², exactitud,
F1, AUC) se leen directamente.

## Código: regresión

```python
from sklearn.model_selection import KFold, cross_val_score

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(modelo, X_train, y_train, cv=kf, scoring="metrica")

print("Métrica por fold:", scores.round(3))
print("Promedio:", scores.mean().round(3))
print("Desviación estándar:", scores.std().round(3))
```

## Código: clasificación

```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(modelo, X_train, y_train, cv=skf, scoring="metrica")

print("Métrica por fold:", scores.round(3))
print("Promedio:", scores.mean().round(3))
print("Desviación estándar:", scores.std().round(3))
```

- `modelo` es el modelo sin entrenar, de regresión o de clasificación.
- `n_splits=5` es el número de folds (K); `shuffle=True` mezcla los registros antes de partirlos
  y `random_state=42` fija la semilla para que la partición sea reproducible.
- `"metrica"` es el nombre de la métrica que quiere usar (vea la tabla de arriba). Si empieza por
  `neg_`, use `-scores` para leer el error con su signo habitual.
- `cross_val_score` entrena una copia de `modelo` en cada iteración y devuelve un arreglo con las
  K métricas, una por fold. Si el modelo necesita datos escalados, páselos ya
  [escalados](escalar-variables.md).
- `scores.mean()` es la estimación del desempeño con datos nuevos y `scores.std()` indica cuánto
  varía entre folds.

Para elegir el mejor valor de un hiperparámetro con validación cruzada, vea
[Optimizar hiperparámetros con GridSearchCV](gridsearchcv.md).
