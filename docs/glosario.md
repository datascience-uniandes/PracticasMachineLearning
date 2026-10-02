# Glosario

Términos usados en las prácticas, en orden alfabético.

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [J](#j) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [Ñ](#enie) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w) · [X](#x) · [Y](#y) · [Z](#z)

## A

### Árbol de decisión { #arbol-decision }

Modelo que clasifica mediante una secuencia de preguntas sobre las variables (por ejemplo, ¿edad > 45?), organizadas como un árbol. Cada hoja asigna una clase. Los árboles muy profundos tienden al [sobreajuste](#sobreajuste).

### AUC { #auc }

Área bajo la [curva ROC](#curva-roc) (_Area Under the Curve_). Resume en un número entre 0 y 1 la capacidad de un clasificador para ordenar los positivos por encima de los negativos: 0,5 equivale a adivinar al azar y 1 a un clasificador perfecto.

## B

_Sin términos por ahora._

## C

### Chi-cuadrado { #chi-cuadrado }

Prueba estadística que evalúa si dos variables categóricas son independientes, comparando las frecuencias observadas en una tabla de contingencia con las que se esperarían si no hubiera relación.

### Clasificación { #clasificacion }

Tarea de aprendizaje supervisado en la que la [variable objetivo](#variable-objetivo) es categórica, por ejemplo, si un cliente abandona o no un banco.

### Clipping { #clipping }

Técnica que limita los valores de una variable a un rango y reemplaza los extremos por los
límites. Cuando los límites son percentiles también se le llama _winsorización_.

### Codificación one-hot { #codificacion-one-hot }

Transformación de una variable categórica en varias columnas binarias (0 o 1), una por categoría,
para que un modelo pueda usarla sin suponer un orden entre categorías.

### Coeficiente { #coeficiente }

En una [regresión lineal](#regresion-lineal), peso de cada variable: cuánto cambia la predicción
cuando esa variable aumenta en una unidad y las demás se mantienen constantes. El intercepto
(\(\beta_0\)) es la predicción cuando todas las variables valen 0.

### Compromiso sesgo-varianza { #compromiso-sesgo-varianza }

Tensión entre el _sesgo_ (error por usar un modelo demasiado simple, que lleva al
[subajuste](#subajuste)) y la _varianza_ (sensibilidad del modelo a los datos de entrenamiento,
que lleva al [sobreajuste](#sobreajuste)). Al aumentar la complejidad baja el sesgo y sube la
varianza, por lo que el punto adecuado se elige con un [conjunto de validación](#conjunto-validacion).
Este sesgo es distinto del [sesgo](#sesgo) de una distribución.

### Conjunto de entrenamiento { #conjunto-entrenamiento }

Parte de los datos con la que se ajusta el modelo.

### Conjunto de prueba { #conjunto-prueba }

Parte de los datos que se reserva para evaluar el modelo con registros que no vio durante el
entrenamiento.

### Conjunto de validación { #conjunto-validacion }

Parte de los datos que se usa para comparar modelos o elegir [hiperparámetros](#hiperparametro),
separada del conjunto de entrenamiento y del de prueba.

### Correlación { #correlacion }

Medida de qué tanto varían juntas dos variables. El coeficiente de Pearson (\(r\)) va de −1
(relación lineal inversa perfecta) a 1 (relación lineal directa perfecta); 0 indica que no hay
relación lineal.

### Curva de precisión-sensibilidad { #curva-precision-sensibilidad }

Gráfico de la [precisión](#precision) frente a la [sensibilidad](#sensibilidad) de un clasificador para todos los [umbrales de decisión](#umbral-decision). Es más informativa que la curva ROC cuando hay [desbalance de clases](#desbalance-de-clases).

### Curva ROC { #curva-roc }

Gráfico de la tasa de verdaderos positivos frente a la tasa de falsos positivos de un clasificador para todos los [umbrales de decisión](#umbral-decision). Su área es el [AUC](#auc).

## D

### Desbalance de clases { #desbalance-de-clases }

En un problema de clasificación, situación en la que una clase tiene muchos más registros que la
otra. Un modelo puede obtener una exactitud alta prediciendo siempre la clase mayoritaria, así que
hay que evaluarlo con métricas que consideren ambas clases.

### Distribución { #distribucion }

Forma en que se reparten los valores de una variable: dónde se concentran, qué tan dispersos están
y si son simétricos.

### Duplicado { #duplicado }

Registro idéntico a otro en todas sus columnas, o en las columnas que se comparan.

## E

### Early stopping { #early-stopping }

Técnica que detiene el entrenamiento de una [red neuronal](#red-neuronal) cuando el error en validación deja de mejorar durante varias [épocas](#epoca), para evitar el [sobreajuste](#sobreajuste).

### Ensamble { #ensamble }

Modelo que combina las predicciones de varios modelos para obtener un resultado mejor que el de cada uno por separado. Ver [Random Forest](#random-forest), [Gradient Boosting](#gradient-boosting) y [Stacking](#stacking).

### Época { #epoca }

Una pasada completa de una [red neuronal](#red-neuronal) por todos los datos de entrenamiento.

### Estandarización { #estandarizacion }

Transformación que lleva cada variable a media 0 y desviación estándar 1:
\(z = (x - \bar{x}) / s\). Es necesaria antes de regularizar, porque la penalización depende de
la escala de cada coeficiente.

### Estratificación { #estratificacion }

Forma de dividir los datos que conserva en cada conjunto la misma proporción de clases que en el dataset completo.

### Exactitud { #exactitud }

Proporción de predicciones correctas de un clasificador (_accuracy_). Con [desbalance de clases](#desbalance-de-clases) puede ser alta aunque el modelo no detecte la clase minoritaria.

## F

### F1 { #f1 }

Media armónica de la [precisión](#precision) y la [sensibilidad](#sensibilidad). Solo es alta cuando ambas lo son.

### Fuga de datos { #fuga-de-datos }

Error que ocurre cuando información del conjunto de prueba (o de validación) se usa para preparar
o entrenar el modelo, por ejemplo, al imputar nulos o escalar con estadísticas calculadas sobre
todo el dataset. Hace que las métricas parezcan mejores de lo que serán con datos nuevos
(_data leakage_).

### Función de activación { #funcion-activacion }

Función que transforma la salida de cada neurona de una [red neuronal](#red-neuronal). ReLU es la más usada en las capas ocultas y la sigmoide en la salida de una clasificación binaria.

## G

### Gradient Boosting { #gradient-boosting }

[Ensamble](#ensamble) que entrena árboles de forma secuencial: cada árbol nuevo corrige los errores de los anteriores.

## H

### Hiperparámetro { #hiperparametro }

Configuración del modelo que se elige antes de entrenar y no se aprende de los datos, como el
grado de una [regresión polinomial](#regresion-polinomial).

### Homocedasticidad { #homocedasticidad }

Supuesto de la regresión lineal según el cual la varianza de los residuos es constante para todos
los valores predichos. Si la dispersión cambia (por ejemplo, forma un embudo), hay
_heterocedasticidad_.

## I

_Sin términos por ahora._

## J

_Sin términos por ahora._

## K

### K-fold { #k-fold }

Ver [validación cruzada](#validacion-cruzada).

### KNN { #knn }

K vecinos más cercanos (_K-Nearest Neighbors_): clasifica cada registro según la clase mayoritaria de los \(k\) registros de entrenamiento más cercanos. Requiere [estandarizar](#estandarizacion) las variables.

## L

### Lasso { #lasso }

[Regularización](#regularizacion) que penaliza la suma de los valores absolutos de los coeficientes
(penalización L1). Con un alfa suficientemente grande lleva algunos coeficientes exactamente a 0, así
que también selecciona variables.

## M

### MAE { #mae }

Error absoluto medio (_Mean Absolute Error_): promedio de las diferencias absolutas entre los
valores reales y los predichos. Se expresa en las mismas unidades que la variable objetivo.

### Matriz de confusión { #matriz-confusion }

Tabla que cruza las clases reales con las predichas y cuenta los verdaderos positivos, verdaderos negativos, falsos positivos y falsos negativos de un clasificador.

### Multicolinealidad { #multicolinealidad }

Situación en la que dos o más variables independientes están muy correlacionadas entre sí.
Hace inestables los coeficientes de una regresión y difícil su interpretación.

## N

### Normalidad { #normalidad }

Supuesto de la regresión lineal según el cual los residuos siguen una distribución normal
(en forma de campana, simétrica y centrada en cero).

## Ñ { #enie }

_Sin términos por ahora._

## O

### Outlier { #outlier }

Valor atípico: un registro muy alejado del resto. En un gráfico de caja aparece como un punto
fuera de los bigotes, a más de 1,5 veces el rango intercuartílico de la caja.

## P

### Precisión { #precision }

De los registros que el modelo predijo como positivos, proporción que realmente lo son: \(VP / (VP + FP)\).

### Prueba t-estudiante { #prueba-t }

También llamada prueba t de Student. Prueba estadística que compara la media de una variable continua entre dos grupos, por ejemplo, entre los clientes que abandonaron y los que no.

### Prueba U de Mann-Whitney { #prueba-u }

Prueba estadística que compara la distribución de una variable entre dos grupos usando rangos, sin suponer [normalidad](#normalidad). Es la alternativa a la [prueba t-estudiante](#prueba-t) para variables con sesgo o con atípicos.

## Q

_Sin términos por ahora._

## R

### R² { #r2 }

Coeficiente de determinación: proporción de la variabilidad de la variable objetivo que explica
el modelo. Vale 1 si el modelo predice perfectamente y 0 si no mejora a predecir siempre la media.

### Random Forest { #random-forest }

[Ensamble](#ensamble) de muchos [árboles de decisión](#arbol-decision), cada uno entrenado con una muestra distinta de los datos y de las variables. La predicción final es la votación de todos los árboles.

### Red neuronal { #red-neuronal }

Modelo formado por capas de neuronas conectadas. En una red densamente conectada, cada neurona de una capa recibe la salida de todas las neuronas de la capa anterior.

### Regresión lineal { #regresion-lineal }

Modelo que predice una variable continua como una combinación lineal de las variables
independientes: \(\hat{y} = \beta_0 + \beta_1 x_1 + \dots + \beta_p x_p\).

### Regresión logística { #regresion-logistica }

Modelo de [clasificación](#clasificacion) que estima la probabilidad de la clase positiva aplicando la función sigmoide a una combinación lineal de las variables.

### Regresión polinomial { #regresion-polinomial }

[Regresión lineal](#regresion-lineal) sobre términos polinomiales de las variables (cuadrados,
[interacciones](#termino-interaccion)). Con una variable y grado 2:
\(\hat{y} = \beta_0 + \beta_1 x + \beta_2 x^2\). Sigue siendo lineal en los coeficientes.

### Regularización { #regularizacion }

Técnica que agrega al error del modelo una penalización por el tamaño de los coeficientes, para
reducir el [sobreajuste](#sobreajuste). Su fuerza se controla con el hiperparámetro alfa (\(\alpha\)):
con \(\alpha = 0\) se obtiene la regresión lineal sin regularizar. Ver [Lasso](#lasso) y [Ridge](#ridge).

### Residuo { #residuo }

Diferencia entre el valor real y el valor predicho por el modelo: \(e = y - \hat{y}\).

### Ridge { #ridge }

[Regularización](#regularizacion) que penaliza la suma de los cuadrados de los coeficientes
(penalización L2). Reduce los coeficientes hacia 0 sin anularlos y ayuda con la
[multicolinealidad](#multicolinealidad).

### RMSE { #rmse }

Raíz del error cuadrático medio (_Root Mean Squared Error_). Como eleva los errores al cuadrado
antes de promediarlos, penaliza más los errores grandes que el [MAE](#mae). Se expresa en las
mismas unidades que la variable objetivo.

## S

### Sensibilidad { #sensibilidad }

De los registros realmente positivos, proporción que el modelo detecta (_recall_): \(VP / (VP + FN)\).

### Sesgo { #sesgo }

Asimetría de una distribución. Con sesgo a la derecha, la mayoría de valores son pequeños
y unos pocos muy grandes alargan la cola derecha.

### Sobreajuste { #sobreajuste }

Cuando un modelo se ajusta demasiado a los datos de entrenamiento y no generaliza: tiene un error
bajo en entrenamiento y mucho más alto en prueba. Ver
[compromiso sesgo-varianza](#compromiso-sesgo-varianza).

### Stacking { #stacking }

[Ensamble](#ensamble) que combina varios modelos base con un modelo final (meta-modelo) que aprende a partir de sus predicciones.

### Subajuste { #subajuste }

Cuando un modelo es demasiado simple para capturar la relación en los datos: tiene un error alto
tanto en entrenamiento como en prueba.

## T

### Término de interacción { #termino-interaccion }

Producto de dos variables, por ejemplo \(x_1 x_2\), que se agrega a un modelo para que el efecto
de una variable dependa del valor de la otra.

## U

### Umbral de decisión { #umbral-decision }

Probabilidad a partir de la cual un clasificador asigna la clase positiva. Por defecto es 0,5; moverlo cambia el equilibrio entre [precisión](#precision) y [sensibilidad](#sensibilidad).

## V

### Validación cruzada { #validacion-cruzada }

Técnica que divide el conjunto de entrenamiento en \(K\) partes (_folds_), entrena \(K\) veces
dejando una parte distinta para validar y promedia las métricas. Permite elegir
[hiperparámetros](#hiperparametro) sin gastar el conjunto de prueba.

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

### Votación { #votacion }

[Ensamble](#ensamble) que combina varios modelos por mayoría de votos (votación dura) o
promediando sus probabilidades (votación suave), sin aprender cómo combinarlos.

## W

_Sin términos por ahora._

## X

_Sin términos por ahora._

## Y

_Sin términos por ahora._

## Z

_Sin términos por ahora._
