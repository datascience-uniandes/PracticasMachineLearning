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

## Evaluar un modelo con `cross_val_score`

```python
import numpy as np
from sklearn.model_selection import KFold, cross_val_score

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(modelo, X_train, y_train, cv=kf,
                         scoring="neg_root_mean_squared_error")

rmse = -scores
print("RMSE por fold:", rmse.round(3))
print("RMSE promedio:", rmse.mean().round(3))
print("Desviación estándar:", rmse.std().round(3))
```

- `KFold` define cómo se parten los datos: `n_splits=5` es el número de folds (K),
  `shuffle=True` mezcla los registros antes de partirlos y `random_state=42` fija la semilla
  para que la partición sea reproducible.
- `cross_val_score` entrena una copia de `modelo` en cada iteración y devuelve un arreglo con
  las K métricas, una por fold. `modelo` puede ser un modelo simple o un pipeline completo.
- `scoring="neg_root_mean_squared_error"` indica que la métrica es el [RMSE](rmse.md).
- `rmse.mean()` es la estimación del error; `rmse.std()` indica cuánto varía entre folds.

!!! tip "Por qué el RMSE sale negativo"
    scikit-learn siempre **maximiza** el *score*: un valor más grande significa un modelo mejor.
    Como en el RMSE y el [MAE](mae.md) un valor más pequeño es mejor, se usan con signo
    cambiado: `"neg_root_mean_squared_error"` y `"neg_mean_absolute_error"` devuelven
    \( -\text{RMSE} \) y \( -\text{MAE} \). Multiplique por −1 (`-scores`) para volver a la
    escala original. Con `scoring="r2"` no hace falta cambiar el signo, porque en el [R²](r2.md)
    un valor más grande ya es mejor.

Para optimizar varios hiperparámetros a la vez, vea
[Optimizar hiperparámetros con GridSearchCV](gridsearchcv.md).
