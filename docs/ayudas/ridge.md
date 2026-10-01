# Regresión Ridge

La regresión [Ridge](../glosario.md#ridge) es una [regresión lineal](regresion-lineal.md) con
[regularización](../glosario.md#regularizacion) L2: además de reducir el error, penaliza la suma
de los cuadrados de los [coeficientes](../glosario.md#coeficiente):

\[
\min_\beta \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \alpha \sum_{j=1}^{p} \beta_j^2
\]

- El primer término es la suma de los [residuos](../glosario.md#residuo) al cuadrado, el mismo
  que minimiza la regresión lineal.
- El segundo término es la **penalización**: crece con el cuadrado de cada coeficiente. El
  intercepto \( \beta_0 \) no se penaliza.
- \( \alpha \) (alfa) es un [hiperparámetro](../glosario.md#hiperparametro) que controla cuánto
  pesa la penalización.

## Efecto de alfa

- **alfa = 0**: no hay penalización; el resultado es el de la regresión lineal.
- **alfa más grande**: todos los coeficientes se **encogen** hacia 0 de forma gradual, pero
  **nunca valen exactamente 0**. Ridge no elimina variables.
- Con [multicolinealidad](../glosario.md#multicolinealidad) (variables muy correlacionadas), la
  regresión lineal reparte el efecto entre ellas de forma inestable: los coeficientes pueden ser
  muy grandes, de signos opuestos o cambiar mucho con pocos datos. Ridge **estabiliza** esos
  coeficientes y tiende a repartir el efecto en partes parecidas.

Al reducir los coeficientes, Ridge disminuye la varianza del modelo y ayuda contra el
[sobreajuste](../glosario.md#sobreajuste), a cambio de algo de sesgo (vea el
[compromiso sesgo-varianza](../glosario.md#compromiso-sesgo-varianza)).

!!! warning "Alfa demasiado grande"
    Con un alfa muy grande todos los coeficientes quedan casi en 0 y el modelo predice casi la
    media de `y_train`: [subajuste](../glosario.md#subajuste). El [R²](r2.md) en prueba se acerca
    a 0.

!!! warning "Estandarice antes de usar Ridge"
    La penalización depende del tamaño de los coeficientes, y este depende de las unidades de
    cada variable. Sin [estandarizar](estandarizar.md), Ridge encoge más unas variables que
    otras solo por su escala.

## Entrenar el modelo

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

modelo = make_pipeline(StandardScaler(), Ridge(alpha=1))
modelo.fit(X_train, y_train)
y_pred = modelo.predict(X_test)
```

- `X_train`, `y_train` son las variables y la [variable objetivo](../glosario.md#variable-objetivo)
  del [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `X_test` las variables
  del [conjunto de prueba](../glosario.md#conjunto-prueba).
- `alpha=1` es el valor de alfa (el valor por defecto); cámbielo para probar otros.
- `make_pipeline` estandariza con la media y la desviación de `X_train` antes de entrenar y
  antes de predecir.

## Ver los coeficientes

Los coeficientes están en `modelo[-1].coef_`, en la escala **estandarizada**. Para mostrarlos con
el nombre de cada variable, vea [ver los coeficientes](ver-coeficientes.md).

## Comparar varios valores de alfa

```python
import pandas as pd
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

alfas = [0.1, 1, 10, 100, 1000]
coeficientes = {}
resultados = []
for alfa in alfas:
    modelo = make_pipeline(StandardScaler(), Ridge(alpha=alfa))
    modelo.fit(X_train, y_train)
    y_pred = modelo.predict(X_test)
    coeficientes[alfa] = pd.Series(modelo[-1].coef_, index=X_train.columns)
    resultados.append({
        "alfa": alfa,
        "R2": r2_score(y_test, y_pred),
        "MAE": mean_absolute_error(y_test, y_pred),
        "RMSE": mean_squared_error(y_test, y_pred) ** 0.5,
    })

print(pd.DataFrame(coeficientes).round(3))   # una columna por alfa
print(pd.DataFrame(resultados).round(3))     # una fila por alfa
```

- `alfas` es la lista de valores que quiere probar; `y_test` es la variable objetivo del conjunto
  de prueba.
- `coeficientes` queda con una fila por variable y una columna por alfa.
- `resultados` guarda las métricas [R²](r2.md), [MAE](mae.md) y [RMSE](rmse.md) en prueba de
  cada alfa (vea [comparar métricas](comparar-metricas.md)). Con Ridge no tiene sentido contar
  ceros: no los hay.

!!! tip "Elija alfa con validación, no con el conjunto de prueba"
    Use un [conjunto de validación](../glosario.md#conjunto-validacion) o la
    [validación cruzada](validacion-cruzada.md) para elegir alfa, y evalúe en prueba solo el
    modelo final. Los valores útiles de alfa en Ridge suelen ser mayores que en Lasso; pruebe un
    rango amplio en escala logarítmica, por ejemplo `np.logspace(-2, 4, 20)`.

## Lasso o Ridge

| | [Lasso](lasso.md) | Ridge |
|---|---|---|
| Penalización | L1: \( \alpha \sum \lvert\beta_j\rvert \) | L2: \( \alpha \sum \beta_j^2 \) |
| Coeficientes en 0 | Sí, con alfa suficientemente grande | No, solo se acercan a 0 |
| Variables correlacionadas | Suele quedarse con una y reducir o eliminar las otras | Reparte el efecto entre ellas |
| Cuándo usarlo | Sospecha que muchas variables no aportan y quiere un modelo más simple | Muchas variables aportan un poco, o hay multicolinealidad |

Las dos necesitan estandarizar y las dos tienen un alfa que se elige con validación. Si no
tiene claro cuál usar, entrene ambas y compare sus métricas en validación.
