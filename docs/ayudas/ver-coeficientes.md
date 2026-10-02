# Ver los coeficientes

Un modelo de [regresión lineal](regresion-lineal.md) entrenado guarda el intercepto en `intercept_` y un
[coeficiente](../glosario.md#coeficiente) por variable en `coef_`.

## Intercepto y coeficientes

```python
import pandas as pd

print("Intercepto:", modelo.intercept_)
coef = pd.Series(modelo.coef_, index=X_train.columns).sort_values()
print(coef)
```

- `modelo` es el modelo ya entrenado con `fit`; `X_train` es el `DataFrame` con el que se
  entrenó.
- `modelo.coef_` es un arreglo con un coeficiente por columna de `X_train`, en el mismo orden;
  la `Series` los etiqueta con el nombre de cada columna.
- `sort_values()` los ordena de menor a mayor: los más negativos quedan arriba y los más
  positivos abajo.

## Con variables estandarizadas

Si [estandarizó](estandarizar.md) las variables antes de entrenar (por ejemplo, con
`X_train_esc = escalador.fit_transform(X_train)`), el modelo se entrenó con `X_train_esc`, que
es un arreglo de NumPy sin nombres de columnas. Los nombres se toman del `DataFrame` original,
porque `StandardScaler` conserva las columnas y su orden:

```python
coef = pd.Series(modelo.coef_, index=X_train.columns).sort_values()
print("Intercepto:", modelo.intercept_)
```

Si las columnas salieron de `PolynomialFeatures`, use como índice
`polinomio.get_feature_names_out()` o, si unió las columnas one-hot con `pd.concat`, las
columnas del `DataFrame` resultante (vea [regresión polinomial](regresion-polinomial.md)).

Con variables estandarizadas, los coeficientes quedan en la escala **estandarizada**: cada uno
es el cambio en la predicción por cada desviación estándar de su variable.

## Gráfico de barras

```python
import matplotlib.pyplot as plt

coef.plot.barh(figsize=(7, 4))
plt.axvline(0, color="black", linewidth=0.8)
plt.xlabel("Coeficiente")
plt.title("Coeficientes del modelo")
plt.tight_layout()
plt.show()
```

`barh` dibuja una barra horizontal por variable; como `coef` está ordenada, las barras quedan de
la más negativa a la más positiva. La línea vertical en 0 separa los efectos negativos de los
positivos.

!!! warning "Compare coeficientes con cuidado"
    El tamaño de un coeficiente depende de las unidades de su variable. Un coeficiente pequeño
    en una variable medida en miles puede pesar más que uno grande en una variable entre 0 y 1.
    Para comparar, estandarice las variables antes de entrenar.

Para saber qué significa cada coeficiente (signo, unidades, variables categóricas), vea
[interpretar los coeficientes](interpretar-coeficientes.md).
