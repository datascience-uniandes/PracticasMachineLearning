# Regresión logística

La [regresión logística](../glosario.md#regresion-logistica) es un modelo de
[clasificación](../glosario.md#clasificacion) binaria. A pesar de su nombre, no predice un
valor continuo: estima la **probabilidad** de que un registro pertenezca a la clase positiva
(la clase codificada como 1) y, a partir de esa probabilidad, asigna una clase.

## Cómo funciona

El modelo calcula una combinación lineal de las variables, igual que la regresión
lineal, y la transforma con la función sigmoide, que la lleva
al intervalo entre 0 y 1:

\[
p = P(y = 1 \mid x) = \frac{1}{1 + e^{-(\beta_0 + \beta^T x)}}
\]

- \( x \) es el vector de variables de un registro y \( \beta \) el vector de
  [coeficientes](../glosario.md#coeficiente); \( \beta_0 \) es el intercepto.
- Si \( \beta_0 + \beta^T x \) es muy positivo, \( p \) se acerca a 1; si es muy negativo, se
  acerca a 0; si vale 0, \( p = 0{,}5 \).

Despejando, la combinación lineal resulta ser el logaritmo de los *odds* (log-odds):

\[
\log \frac{p}{1 - p} = \beta_0 + \beta_1 x_1 + \dots + \beta_k x_k
\]

Los *odds* \( p / (1 - p) \) comparan la probabilidad de la clase positiva con la de la
negativa: unos *odds* de 3 significan que la clase positiva es tres veces más probable que la
negativa.

### Umbral de decisión

`predict` asigna la clase 1 cuando \( p \geq 0{,}5 \) y la clase 0 en caso contrario. Ese valor
es el [umbral de decisión](../glosario.md#umbral-decision) por defecto. Puede moverlo usando las
probabilidades de `predict_proba`; un umbral más bajo detecta más positivos a cambio de más
falsos positivos. Vea la [matriz de confusión](matriz-confusion.md), la
[curva ROC](curva-roc.md) y la [curva precisión-sensibilidad](curva-precision-sensibilidad.md)
para evaluar distintos umbrales.

## Escalado

La regresión logística de scikit-learn aplica [regularización](../glosario.md#regularizacion)
por defecto, y la penalización depende de la escala de cada variable. Además, el algoritmo de
ajuste converge mejor con variables en rangos parecidos. Por eso conviene
[escalar las variables](escalar-variables.md) (por ejemplo, [estandarizar](estandarizar.md)) y
codificar las categóricas con [one-hot](one-hot.md). El código de esta página estandariza las
variables con `StandardScaler` antes de entrenar el modelo.

## Código básico

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_val_esc = escalador.transform(X_val)

modelo = LogisticRegression(max_iter=1000)
modelo.fit(X_train_esc, y_train)
y_pred = modelo.predict(X_val_esc)
y_prob = modelo.predict_proba(X_val_esc)[:, 1]
```

- `X_train`, `y_train` son las variables y la variable objetivo del
  [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento), y `X_val` las variables del
  [conjunto de validación](../glosario.md#conjunto-validacion) (vea
  [dividir los datos](division-datos.md)).
- `escalador.fit_transform(X_train)` calcula la media y la desviación estándar de cada variable
  **solo con el entrenamiento** y estandariza `X_train`; el resultado es `X_train_esc` («esc» de
  escalado). `escalador.transform(X_val)` aplica esas mismas medias y desviaciones a `X_val`, sin
  volver a calcularlas. Haga lo mismo con `X_test` (`X_test_esc = escalador.transform(X_test)`)
  cuando llegue el momento de evaluar en prueba.
- `max_iter=1000` aumenta el número de iteraciones del algoritmo de ajuste. Con el valor por
  defecto (100), en ocasiones aparece una advertencia `ConvergenceWarning`.
- `y_pred` contiene la clase predicha (0 o 1) de cada registro, usando el umbral 0,5.
- `predict_proba` devuelve una columna por clase; `[:, 1]` toma la probabilidad de la clase
  positiva. `y_prob` es lo que necesitan la curva ROC y la curva precisión-sensibilidad.

## Interpretar los coeficientes

```python
import numpy as np
import pandas as pd

coeficientes = pd.Series(modelo.coef_[0], index=X_train.columns)
odds_ratio = np.exp(coeficientes)
print(pd.DataFrame({"coeficiente": coeficientes, "odds_ratio": odds_ratio})
      .sort_values("coeficiente"))
```

- `modelo.coef_[0]` contiene un coeficiente por variable, en el mismo orden de las columnas de
  `X_train`, y `intercept_[0]` el intercepto.
- **Signo:** un coeficiente positivo indica que, al aumentar la variable, aumenta la probabilidad
  de la clase positiva; uno negativo, que disminuye.
- **Odds ratio:** `np.exp(coef)` es el factor por el que se multiplican los *odds* cuando la
  variable aumenta en una unidad, con las demás fijas. Un valor de 1,5 significa que los *odds*
  aumentan un 50 %; uno de 0,8, que disminuyen un 20 %; un valor de 1, que la variable no tiene
  efecto.
- Como las variables están estandarizadas, "una unidad" equivale a una desviación estándar de la
  variable. Esto permite comparar el tamaño de los coeficientes entre variables.
- Los coeficientes no se leen como en la regresión lineal: el efecto es sobre los log-odds, no
  directamente sobre la probabilidad.

## Hiperparámetros principales

| Hiperparámetro | Qué controla | Efecto |
|----------------|--------------|--------|
| `C` | Inverso de la fuerza de la regularización (por defecto 1) | `C` pequeño: penalización fuerte, coeficientes pequeños, riesgo de [subajuste](../glosario.md#subajuste). `C` grande: penalización débil, riesgo de [sobreajuste](../glosario.md#sobreajuste) |
| `penalty` | Tipo de penalización: `"l2"` (por defecto) o `"l1"` | `"l1"` puede dejar coeficientes en exactamente 0 (selección de variables); `"l2"` los encoge sin anularlos. Vea [Lasso y Ridge](lasso-ridge.md) |
| `class_weight` | Peso de cada clase en el ajuste | `"balanced"` da más peso a la clase minoritaria; útil con [desbalance de clases](../glosario.md#desbalance-de-clases) |
| `solver` | Algoritmo de ajuste | `"lbfgs"` (por defecto) solo admite `"l2"`; para usar `"l1"` utilice `"liblinear"` o `"saga"` |

!!! note "`C` funciona al revés que alfa"
    En [Lasso y Ridge](lasso-ridge.md), un alfa más grande significa **más** regularización. En
    la regresión logística, `C` es el inverso: un `C` más grande significa **menos**
    regularización.

!!! tip "Clases desbalanceadas"
    Si una clase es mucho menos frecuente que la otra, el modelo tiende a predecir casi siempre
    la clase mayoritaria. `class_weight="balanced"` pondera cada clase de forma inversamente
    proporcional a su frecuencia. Evalúe el modelo con métricas como F1 o la curva
    precisión-sensibilidad, no solo con *accuracy*.
