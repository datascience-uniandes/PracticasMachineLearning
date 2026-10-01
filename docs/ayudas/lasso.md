# Regresión Lasso

La regresión [Lasso](../glosario.md#lasso) es una [regresión lineal](regresion-lineal.md) con
[regularización](../glosario.md#regularizacion) L1: además de reducir el error, penaliza la suma
de los valores absolutos de los [coeficientes](../glosario.md#coeficiente):

\[
\min_\beta \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \alpha \sum_{j=1}^{p} |\beta_j|
\]

- El primer término es la suma de los [residuos](../glosario.md#residuo) al cuadrado, el mismo
  que minimiza la regresión lineal.
- El segundo término es la **penalización**: crece con el tamaño de los coeficientes. El
  intercepto \( \beta_0 \) no se penaliza.
- \( \alpha \) (alfa) es un [hiperparámetro](../glosario.md#hiperparametro) que controla cuánto
  pesa la penalización.

En scikit-learn el primer término se divide por \( 2n \) (\( \frac{1}{2n} \sum (y_i - \hat{y}_i)^2 \)).
La idea es la misma, pero los valores de alfa de scikit-learn no son directamente comparables con
los de otras herramientas.

## Efecto de alfa

- **alfa = 0**: no hay penalización; el resultado es el de la regresión lineal.
- **alfa pequeño**: los coeficientes se reducen un poco.
- **alfa grande**: cada vez más coeficientes valen **exactamente 0**. Esas variables salen del
  modelo, por lo que Lasso hace **selección de variables**.

Al reducir los coeficientes, Lasso disminuye la varianza del modelo y ayuda contra el
[sobreajuste](../glosario.md#sobreajuste), a cambio de algo de sesgo (vea el
[compromiso sesgo-varianza](../glosario.md#compromiso-sesgo-varianza)).

!!! warning "Alfa demasiado grande"
    Con un alfa muy grande todos los coeficientes valen 0 y el modelo predice siempre la media
    de `y_train`: [subajuste](../glosario.md#subajuste). El [R²](r2.md) en prueba se acerca a 0
    (o queda negativo).

!!! warning "Estandarice antes de usar Lasso"
    La penalización depende del tamaño de los coeficientes, y este depende de las unidades de
    cada variable. Sin [estandarizar](estandarizar.md), Lasso elimina primero las variables con
    coeficientes pequeños solo por su escala, no por su importancia.

## Entrenar el modelo

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Lasso

modelo = make_pipeline(StandardScaler(), Lasso(alpha=0.1, max_iter=10000))
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)
```

- `X_train`, `y_train` son las variables y la [variable objetivo](../glosario.md#variable-objetivo)
  del [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `X_test` las variables
  del [conjunto de prueba](../glosario.md#conjunto-prueba).
- `alpha=0.1` es el valor de alfa; cámbielo para probar otros.
- `max_iter=10000` aumenta el número de iteraciones del algoritmo de ajuste. Con el valor por
  defecto (1000), en ocasiones aparece una advertencia `ConvergenceWarning`.
- `make_pipeline` estandariza con la media y la desviación de `X_train` antes de entrenar y
  antes de predecir.

## Ver los coeficientes

Los coeficientes están en `modelo[-1].coef_`, en la escala **estandarizada**. Para mostrarlos con
el nombre de cada variable y contar cuántos valen 0 (las variables que Lasso eliminó), vea
[ver los coeficientes](ver-coeficientes.md).

## Comparar varios valores de alfa

```python
import pandas as pd
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

alfas = [0.01, 0.1, 1, 10]
coeficientes = {}
resultados = []
for alfa in alfas:
    modelo = make_pipeline(StandardScaler(), Lasso(alpha=alfa, max_iter=10000))
    modelo.fit(X_train, y_train)
    y_pred = modelo.predict(X_test)
    coeficientes[alfa] = pd.Series(modelo[-1].coef_, index=X_train.columns)
    resultados.append({
        "alfa": alfa,
        "ceros": (modelo[-1].coef_ == 0).sum(),
        "R2": r2_score(y_test, y_pred),
        "MAE": mean_absolute_error(y_test, y_pred),
        "RMSE": mean_squared_error(y_test, y_pred) ** 0.5,
    })

print(pd.DataFrame(coeficientes).round(3))   # una columna por alfa
print(pd.DataFrame(resultados).round(3))     # una fila por alfa
```

- `alfas` es la lista de valores que quiere probar; `y_test` es la variable objetivo del conjunto
  de prueba.
- `coeficientes` guarda los coeficientes de cada alfa; al convertirlo en `DataFrame` queda una
  fila por variable y una columna por alfa.
- `resultados` guarda, para cada alfa, cuántos coeficientes valen 0 y las métricas
  [R²](r2.md), [MAE](mae.md) y [RMSE](rmse.md) en prueba (vea
  [comparar métricas](comparar-metricas.md)).

!!! tip "Elija alfa con validación, no con el conjunto de prueba"
    Si elige el alfa que mejor resultado da en `X_test`, el conjunto de prueba deja de ser una
    evaluación independiente. Use un [conjunto de validación](../glosario.md#conjunto-validacion)
    o la [validación cruzada](validacion-cruzada.md) para elegir alfa, y evalúe en prueba solo
    el modelo final. Pruebe valores en escala logarítmica, por ejemplo `np.logspace(-3, 1, 20)`.

Compare con [Ridge](ridge.md), que reduce los coeficientes sin llevarlos a 0.
