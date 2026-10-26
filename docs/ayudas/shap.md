# Valores SHAP

Los valores SHAP (_SHapley Additive exPlanations_) reparten una predicción entre las variables:
indican cuánto aportó cada variable a llevar la predicción desde un valor de referencia hasta el
valor final. Se basan en los [valores de Shapley](../glosario.md#shap) de la teoría de juegos,
que reparten la ganancia de un equipo entre sus jugadores según su aporte.

## Valor base y aditividad

- El **[valor base](../glosario.md#valor-base)** es la predicción promedio del modelo sobre una
  **muestra de fondo** de registros de entrenamiento: lo que el modelo predice «sin saber nada»
  de un registro en particular.
- Para cada registro, la suma del valor base y de los valores SHAP de todas sus variables es
  **exactamente** la predicción:

\[
\text{predicción} = \text{valor base} + \sum_{j} \text{SHAP}_j
\]

- Un valor SHAP positivo indica que la variable **subió** la predicción frente al valor base; uno
  negativo, que la **bajó**.
- Los valores están en las unidades de la salida del modelo: en el precio para la regresión y en
  probabilidad cuando la salida es la probabilidad de la clase positiva.

## Local y global

Los valores SHAP son una [explicación local](../glosario.md#explicacion-local): uno por variable
y por registro. Al reunirlos para muchos registros dan una
[explicación global](../glosario.md#explicacion-global): las variables con valores SHAP grandes
en promedio son las que más influyen en el modelo. Los [gráficos SHAP](graficos-shap.md)
muestran las dos miradas.

## Qué explicador usar

- **Explicador agnóstico:** recibe la [función de predicción](funcion-prediccion.md) y una
  muestra de fondo (por ejemplo, 100 registros de entrenamiento). Sirve para cualquier modelo,
  de regresión o de clasificación, porque solo necesita sus predicciones, pero es lento con
  muchas variables o con modelos costosos, como un Random Forest con cientos de árboles.
- **Explicador de árboles (`TreeExplainer`):** para modelos de árboles, como el
  [Random Forest](random-forest.md), calcula los valores exactos en segundos usando la
  estructura de los árboles. Recibe el modelo, no la función, así que se le pasan los datos ya
  transformados (por ejemplo, escalados); después se reemplazan los datos que se muestran en los
  gráficos por los originales. En clasificación devuelve los valores de cada clase; se usa la
  clase positiva. Su valor base es el promedio de las predicciones del modelo en
  entrenamiento.

## Limitaciones

- La muestra de fondo define el valor base: otra muestra da otros valores.
- Como LIME y los gráficos ICE, puede evaluar combinaciones irreales de variables
  correlacionadas.
- Explica el modelo, no la realidad: no muestra causalidad.

!!! warning "Envíe los datos numéricos en la escala que espera el modelo"
    El modelo se entrenó con las variables numéricas **escaladas**, así que debe recibirlas
    escaladas, igual que en el entrenamiento; si no, sus predicciones y los valores SHAP no tienen
    sentido. Quién hace el escalado depende del explicador:

    - **Explicador agnóstico** con la [función de predicción](funcion-prediccion.md) o un
      [pipeline](pipeline.md): envíe `X_fondo` y `X_muestra` **originales, sin escalar**. La
      función o el _pipeline_ los escalan; si los envía ya escalados, se escalan dos veces.
    - **Explicador de árboles**, que recibe el modelo directamente: envíe los datos **escalados**
      con el escalador del entrenamiento (`escalador_clas.transform(X_muestra)`) y luego reemplace
      `valores.data` por los datos originales para los gráficos.

    Para comprobarlo, use la [comprobación de la aditividad](#comprobar-la-aditividad): el valor
    base más la suma de los valores SHAP debe ser igual a la predicción del modelo.

## Código

### Muestra de fondo y muestra a explicar

```python
import shap

X_fondo = X_train.sample(100, random_state=42)
X_muestra = X_test.sample(300, random_state=42)
```

- `X_fondo` es la muestra de fondo: registros de entrenamiento con las variables originales.
  Define el valor base del explicador agnóstico.
- `X_muestra` son los registros de prueba que se van a explicar, también con las variables
  originales.

### Explicador agnóstico

```python
explicador = shap.Explainer(predecir, X_fondo)
valores = explicador(X_muestra)
```

- `predecir` es la [función de predicción](funcion-prediccion.md): para un regresor devuelve la
  predicción (por ejemplo, `predecir_precio`) y para un clasificador, la probabilidad de la clase
  positiva (por ejemplo, `predecir_abandono`). Con un clasificador, los valores SHAP quedan en
  probabilidad.
- `valores` contiene, para cada registro de `X_muestra`, los valores SHAP (`valores.values`), el
  valor base (`valores.base_values`) y los datos (`valores.data`).
- Con un modelo costoso, reduzca `X_muestra` (por ejemplo, a 100 registros) para que el cálculo
  no tarde varios minutos.

### Explicador de árboles para un clasificador

```python
explicador = shap.TreeExplainer(modelo_clas)
valores = explicador(escalador_clas.transform(X_muestra))[:, :, 1]
valores.data = X_muestra.to_numpy()
valores.feature_names = list(X_muestra.columns)
```

- `modelo_clas` es el clasificador de árboles ya entrenado, por ejemplo, el
  [Random Forest](random-forest.md), y `escalador_clas` el escalador con el que se entrenó. Si el
  modelo se entrenó sin escalar, pase `X_muestra` directamente.
- No usa `X_fondo`: el valor base sale de los propios árboles y es el promedio de las
  predicciones del modelo en entrenamiento.
- `[:, :, 1]` toma los valores de la clase positiva, en probabilidad.
- Las dos últimas líneas reemplazan los datos escalados por los originales, para que los gráficos
  muestren, por ejemplo, la edad en años.

### Comprobar la aditividad

```python
i = 0
print(valores.base_values[i] + valores.values[i].sum(), predecir(X_muestra.iloc[[i]])[0])
```

- Los dos números deben ser iguales: el valor base más la suma de los valores SHAP del registro
  `i` es su predicción. Con el explicador de árboles, use `predecir_abandono` como `predecir`.
- La librería `shap` suele venir instalada en Google Colab; si no, use `!pip install shap`.
