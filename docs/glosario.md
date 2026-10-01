# Glosario

Términos usados en las prácticas, en orden alfabético.

[C](#c) · [D](#d) · [H](#h) · [M](#m) · [N](#n) · [O](#o) · [R](#r) · [S](#s) · [V](#v)

## C

### Clipping { #clipping }

Técnica que limita los valores de una variable a un rango y reemplaza los extremos por los
límites. Cuando los límites son percentiles también se le llama _winsorización_.

### Codificación one-hot { #codificacion-one-hot }

Transformación de una variable categórica en varias columnas binarias (0 o 1), una por categoría,
para que un modelo pueda usarla sin suponer un orden entre categorías.

### Conjunto de entrenamiento { #conjunto-entrenamiento }

Parte de los datos con la que se ajusta el modelo.

### Conjunto de prueba { #conjunto-prueba }

Parte de los datos que se reserva para evaluar el modelo con registros que no vio durante el
entrenamiento.

### Correlación { #correlacion }

Medida de qué tanto varían juntas dos variables. El coeficiente de Pearson (\(r\)) va de −1
(relación lineal inversa perfecta) a 1 (relación lineal directa perfecta); 0 indica que no hay
relación lineal.

## D

### Distribución { #distribucion }

Forma en que se reparten los valores de una variable: dónde se concentran, qué tan dispersos están
y si son simétricos.

### Duplicado { #duplicado }

Registro idéntico a otro en todas sus columnas, o en las columnas que se comparan.

## H

### Homocedasticidad { #homocedasticidad }

Supuesto de la regresión lineal según el cual la varianza de los residuos es constante para todos
los valores predichos. Si la dispersión cambia (por ejemplo, forma un embudo), hay
_heterocedasticidad_.

## M

### MAE { #mae }

Error absoluto medio (_Mean Absolute Error_): promedio de las diferencias absolutas entre los
valores reales y los predichos. Se expresa en las mismas unidades que la variable objetivo.

### Multicolinealidad { #multicolinealidad }

Situación en la que dos o más variables independientes están muy correlacionadas entre sí.
Hace inestables los coeficientes de una regresión y difícil su interpretación.

## N

### Normalidad { #normalidad }

Supuesto de la regresión lineal según el cual los residuos siguen una distribución normal
(en forma de campana, simétrica y centrada en cero).

## O

### Outlier { #outlier }

Valor atípico: un registro muy alejado del resto. En un gráfico de caja aparece como un punto
fuera de los bigotes, a más de 1,5 veces el rango intercuartílico de la caja.

## R

### R² { #r2 }

Coeficiente de determinación: proporción de la variabilidad de la variable objetivo que explica
el modelo. Vale 1 si el modelo predice perfectamente y 0 si no mejora a predecir siempre la media.

### Regresión lineal { #regresion-lineal }

Modelo que predice una variable continua como una combinación lineal de las variables
independientes: \(\hat{y} = \beta_0 + \beta_1 x_1 + \dots + \beta_p x_p\).

### Residuo { #residuo }

Diferencia entre el valor real y el valor predicho por el modelo: \(e = y - \hat{y}\).

### RMSE { #rmse }

Raíz del error cuadrático medio (_Root Mean Squared Error_). Como eleva los errores al cuadrado
antes de promediarlos, penaliza más los errores grandes que el [MAE](#mae). Se expresa en las
mismas unidades que la variable objetivo.

## S

### Sesgo { #sesgo }

Asimetría de una distribución. Con sesgo a la derecha, la mayoría de valores son pequeños
y unos pocos muy grandes alargan la cola derecha.

### Sobreajuste { #sobreajuste }

Cuando un modelo se ajusta demasiado a los datos de entrenamiento y no generaliza: tiene un error
bajo en entrenamiento y mucho más alto en prueba.

## V

### Valor nulo { #valor-nulo }

Dato faltante en un registro. En pandas se representa como `NaN`.

### Valor p { #valor-p }

En una prueba estadística, probabilidad de observar un resultado al menos tan extremo como el
obtenido si la hipótesis nula fuera cierta. Si es menor que el nivel de significancia
(usualmente 0,05), se rechaza la hipótesis nula.

### Variable categórica { #variable-categorica }

Variable que toma un número limitado de valores o etiquetas, como el mes o el día de la semana.

### Variable continua { #variable-continua }

Variable numérica que puede tomar cualquier valor dentro de un intervalo, como la temperatura o el área.

### Variable objetivo { #variable-objetivo }

Variable que el modelo intenta predecir a partir de las demás. También se llama variable dependiente.
