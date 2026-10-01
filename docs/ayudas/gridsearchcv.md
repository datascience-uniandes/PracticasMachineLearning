# Optimizar hiperparámetros con GridSearchCV

Cuando un modelo tiene varios [hiperparámetros](../glosario.md#hiperparametro), probarlos uno
por uno con [validación cruzada](../glosario.md#validacion-cruzada) se vuelve largo y propenso a
errores. `GridSearchCV` automatiza esa búsqueda y funciona con cualquier estimador de
scikit-learn, sea de regresión o de clasificación. Antes de leer esta página, conviene conocer
`KFold`, `cross_val_score` y la convención de signo de los *scores* `neg_`, explicados en
[validación cruzada K-fold](validacion-cruzada.md), y cómo separar los datos en
[entrenamiento y prueba](division-datos.md).

## Buscar en una grilla con `GridSearchCV`

`GridSearchCV` prueba **todas las combinaciones** de una grilla de valores y evalúa cada una con
validación cruzada sobre el [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento):

```python
import pandas as pd
from sklearn.model_selection import KFold, GridSearchCV
from sklearn.pipeline import make_pipeline

pipeline = make_pipeline(preprocesamiento, modelo)
param_grid = {
    "paso__hiperparametro1": [valor1, valor2, valor3],
    "paso__hiperparametro2": [valorA, valorB],
}
kf = KFold(n_splits=5, shuffle=True, random_state=42)
busqueda = GridSearchCV(pipeline, param_grid, cv=kf, scoring="metrica")
busqueda.fit(X_train, y_train)

print("Mejores hiperparámetros:", busqueda.best_params_)
print("Score de validación cruzada:", busqueda.best_score_)
```

- `preprocesamiento` es el paso que prepara los datos (por ejemplo, un `StandardScaler()`) y
  `modelo` es el estimador que se quiere ajustar (por ejemplo, un regresor o un clasificador).
  Si no necesita preprocesamiento, puede pasar `modelo` directamente a `GridSearchCV`.
- `pipeline` encadena ambos pasos. Usar un pipeline garantiza que el preprocesamiento se ajuste
  solo con los folds de entrenamiento de cada partición, sin filtrar información del fold de
  validación.
- `param_grid` es un diccionario: cada clave es un hiperparámetro y cada valor, la lista de
  valores a probar. Aquí hay 3 × 2 = 6 combinaciones; con 5 folds se entrenan 30 modelos.
- `kf` define las particiones de la validación cruzada. También puede pasar un entero
  (`cv=5`); en clasificación, scikit-learn usa entonces particiones estratificadas
  (`StratifiedKFold`), que conservan la proporción de clases en cada fold.
- `"metrica"` es el nombre del *score* con el que se comparan las combinaciones (vea la sección
  siguiente).
- `busqueda` es el objeto `GridSearchCV`. Al llamar `fit`, recorre las combinaciones, hace la
  validación cruzada de cada una y guarda los resultados.
- `busqueda.best_params_` es el diccionario con la mejor combinación, y `busqueda.best_score_`
  su *score* promedio de validación cruzada.

### Elegir `scoring`

`scoring` debe corresponder al tipo de problema y a la métrica que le interesa. `GridSearchCV`
siempre elige la combinación con el **mayor** *score*, por eso las métricas de error se usan
con signo negativo:

| Tipo de problema | Ejemplos de `scoring` | Lectura de `best_score_` |
|------------------|-----------------------|--------------------------|
| Regresión | `"neg_root_mean_squared_error"`, `"neg_mean_absolute_error"`, `"r2"` | Con `neg_`, cambie el signo (`-busqueda.best_score_`) para obtener el error |
| Clasificación | `"accuracy"`, `"f1"`, `"f1_macro"`, `"roc_auc"` | Se lee directamente: más alto es mejor |

Si no indica `scoring`, se usa el método `score` del estimador (R² en regresión, *accuracy* en
clasificación). La lista completa de nombres está en la
[documentación de scikit-learn sobre *scorers*](https://scikit-learn.org/stable/modules/model_evaluation.html#string-name-scorers).

### Nombres `paso__hiperparametro`

Dentro de un pipeline, cada hiperparámetro se nombra con el **nombre del paso**, dos guiones
bajos y el **nombre del parámetro**. `make_pipeline` nombra cada paso con el nombre de su clase
en minúsculas: si el último paso es `NombreDelModelo(...)`, sus hiperparámetros se escriben
`"nombredelmodelo__hiperparametro"`. Si pasa el estimador directamente, sin pipeline, la clave es
solo el nombre del hiperparámetro (`"hiperparametro"`).

Si no recuerda un nombre, `pipeline.get_params().keys()` lista todos los hiperparámetros
disponibles. Lo mismo funciona con pipelines de varios pasos o anidados: el nombre encadena
todos los niveles con `__`.

### Revisar todos los resultados

```python
resultados = pd.DataFrame(busqueda.cv_results_)
columnas = ["params", "mean_test_score", "std_test_score", "rank_test_score"]
print(resultados[columnas].sort_values("rank_test_score").head(10))
```

`busqueda.cv_results_` tiene una fila por combinación. Las columnas de interés son:

| Columna | Contenido |
|---------|-----------|
| `param_<hiperparámetro>` | Valor de cada hiperparámetro en esa combinación |
| `params` | La combinación completa, como diccionario |
| `mean_test_score` | Promedio del *score* en los K folds de validación (negativo si la métrica empieza por `neg_`) |
| `std_test_score` | Desviación estándar del *score* entre los folds |
| `rank_test_score` | Posición de la combinación: 1 es la mejor |
| `split0_test_score`, `split1_test_score`, ... | *Score* de cada fold por separado |

En este contexto, "test" se refiere al fold de validación de cada partición, no al
[conjunto de prueba](../glosario.md#conjunto-prueba).

### Evaluar una sola vez en prueba

Con `refit=True` (valor por defecto), al terminar la búsqueda `GridSearchCV` **reentrena la mejor
combinación con todo `X_train`**. Ese modelo final queda en `busqueda.best_estimator_`, y
`busqueda` puede usarse directamente como modelo:

```python
y_pred = busqueda.predict(X_test)
print("Score en prueba:", busqueda.score(X_test, y_test))
```

- `busqueda.predict` usa `busqueda.best_estimator_` para predecir.
- `busqueda.score` calcula, sobre `X_test`, la misma métrica indicada en `scoring` (con el mismo
  signo). Con `y_pred` puede calcular además cualquier otra métrica de `sklearn.metrics`.

Este es el único momento en que se usa `X_test`. Si consultara el conjunto de prueba para elegir
hiperparámetros, este dejaría de ser una estimación honesta del desempeño con datos nuevos: esa
función la cumplen los folds de validación, que actúan como
[conjunto de validación](../glosario.md#conjunto-validacion).

## Graficar los resultados de la validación cruzada

**Un hiperparámetro**

```python
import matplotlib.pyplot as plt

resultados = pd.DataFrame(busqueda.cv_results_)
valores = resultados["param_paso__hiperparametro1"].astype(float)
media = resultados["mean_test_score"]
desv = resultados["std_test_score"]

plt.plot(valores, media, marker="o")
plt.fill_between(valores, media - desv, media + desv, alpha=0.15)
plt.xlabel("hiperparametro1")
plt.ylabel("Score promedio de validación cruzada")
plt.show()
```

- `valores` son los valores probados del hiperparámetro; `media` y `desv`, el promedio y la
  desviación estándar del *score* entre folds para cada uno.
- `fill_between` (opcional) sombrea una banda de ± una desviación estándar.
- Si los valores crecen en potencias de 10 (por ejemplo, 0.01, 0.1, 1, 10), agregue
  `plt.xscale("log")` para que queden igualmente espaciados.
- Si la métrica empieza por `neg_`, grafique `-media` para ver el error con su signo habitual.

**Dos hiperparámetros: una curva por valor del segundo**

```python
for valor2, grupo in resultados.groupby("param_paso__hiperparametro2"):
    plt.plot(grupo["param_paso__hiperparametro1"].astype(float), grupo["mean_test_score"],
             marker="o", label=f"hiperparametro2 = {valor2}")
plt.xlabel("hiperparametro1")
plt.ylabel("Score promedio de validación cruzada")
plt.legend()
plt.show()
```

`groupby` separa las filas según el valor del segundo hiperparámetro; cada grupo se dibuja como
una curva del *score* en función del primero.

**Dos hiperparámetros: mapa de calor**

```python
import seaborn as sns

tabla = resultados.pivot(index="param_paso__hiperparametro1",
                         columns="param_paso__hiperparametro2", values="mean_test_score")
sns.heatmap(tabla, annot=True, fmt=".3f")
plt.show()
```

`pivot` arma una tabla con un valor del primer hiperparámetro por fila y uno del segundo por
columna; `annot=True` escribe el *score* en cada celda.

### Cómo leer el gráfico

- La combinación con el mejor *score* promedio es la que mejor equilibra
  [subajuste](../glosario.md#subajuste) y [sobreajuste](../glosario.md#sobreajuste) (vea
  [compromiso sesgo-varianza](compromiso-sesgo-varianza.md)).
- Hacia los valores que hacen el modelo **demasiado simple**, el *score* empeora por subajuste;
  hacia los que lo hacen **demasiado complejo**, empeora por sobreajuste.
- Si varias combinaciones tienen *scores* muy parecidos (diferencias menores que
  `std_test_score`), prefiera la que da el modelo más simple. Vea
  [seleccionar hiperparámetros](seleccion-hiperparametros.md).

!!! warning "Si el mejor valor está en el borde de la grilla, amplíela"
    Si el mejor valor de un hiperparámetro es el más pequeño o el más grande de su lista, el
    verdadero óptimo puede estar **fuera** de la grilla. Agregue valores más allá de ese
    extremo y repita la búsqueda hasta que el mejor valor quede rodeado por valores con peor
    *score*.

## Alternativa para grillas grandes: `RandomizedSearchCV`

El número de modelos que entrena `GridSearchCV` es el producto de las longitudes de todas las
listas por el número de folds, y crece muy rápido al agregar hiperparámetros. `RandomizedSearchCV`
se usa igual (`param_distributions` en lugar de `param_grid`), pero prueba solo `n_iter`
combinaciones elegidas al azar, lo que permite explorar rangos amplios con un costo fijo. Una
vez identificada una zona prometedora, puede refinarla con `GridSearchCV`.
