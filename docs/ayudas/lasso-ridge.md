# Regresión Lasso y Ridge

Lasso y Ridge son regresiones lineales con [regularización](../glosario.md#regularizacion):
además de reducir el error, penalizan el tamaño de los
[coeficientes](../glosario.md#coeficiente). Al reducir los coeficientes, disminuyen la varianza
del modelo y ayudan contra el [sobreajuste](../glosario.md#sobreajuste), a cambio de algo de sesgo.

Las dos tienen un [hiperparámetro](../glosario.md#hiperparametro) \( \alpha \) (alfa) que
controla cuánto pesa la penalización:

- **alfa = 0**: no hay penalización; el resultado es el de la regresión lineal.
- **alfa más grande**: los coeficientes se reducen más.

Elija alfa con [validación cruzada](validacion-cruzada.md) (por ejemplo con
[`GridSearchCV`](gridsearchcv.md)), no con el conjunto de prueba.

!!! warning "Alfa demasiado grande"
    Con un alfa muy grande todos los coeficientes quedan en 0 o casi en 0 y el modelo predice
    (casi) la media de `y_train`: [subajuste](../glosario.md#subajuste). El [R²](r2.md) en prueba
    se acerca a 0 o queda negativo.

!!! warning "Estandarice antes de usar Lasso o Ridge"
    La penalización depende del tamaño de los coeficientes, y este depende de las unidades de
    cada variable. Sin [estandarizar](estandarizar.md) (vea también
    [escalar variables](escalar-variables.md)), la penalización afecta más a unas variables que
    a otras solo por su escala, no por su importancia. Por eso el código de esta página
    estandariza las variables con `StandardScaler` antes de entrenar.

Los coeficientes de ambos modelos están en `modelo.coef_`, en la escala estandarizada; para
mostrarlos con el nombre de cada variable, vea [ver los coeficientes](ver-coeficientes.md).

## Lasso (penalización L1) { #lasso }

[Lasso](../glosario.md#lasso) penaliza la suma de los valores absolutos de los coeficientes:

\[
\min_\beta \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \alpha \sum_{j=1}^{p} |\beta_j|
\]

- El primer término es la suma de los errores al cuadrado, el mismo que minimiza la regresión
  lineal.
- El segundo término es la penalización L1. El intercepto \( \beta_0 \) no se penaliza.

**Efecto:** al aumentar alfa, cada vez más coeficientes valen **exactamente 0**. Esas variables
salen del modelo, por lo que Lasso hace **selección de variables**.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Lasso

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_test_esc = escalador.transform(X_test)

modelo = Lasso(alpha=alfa, max_iter=10000)
modelo.fit(X_train_esc, y_train)
y_pred = modelo.predict(X_test_esc)
```

- `alfa` es el valor de alfa que quiere usar.
- `X_train`, `y_train` son las variables y la variable objetivo del conjunto de entrenamiento, y
  `X_test` las variables del conjunto de prueba.
- `max_iter=10000` aumenta el número de iteraciones del algoritmo de ajuste. Con el valor por
  defecto (1000), en ocasiones aparece una advertencia `ConvergenceWarning`.
- `escalador` aprende la media y la desviación estándar de cada variable **solo** con `X_train`
  (`fit_transform`) y aplica esos mismos valores a `X_test` (`transform`); así el conjunto de
  prueba no influye en el escalado.
- `X_train_esc` y `X_test_esc` son las variables ya estandarizadas: el modelo se entrena y
  predice con ellas.

## Ridge (penalización L2) { #ridge }

[Ridge](../glosario.md#ridge) penaliza la suma de los cuadrados de los coeficientes:

\[
\min_\beta \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 + \alpha \sum_{j=1}^{p} \beta_j^2
\]

- El primer término es el mismo que en Lasso.
- El segundo término es la penalización L2. El intercepto \( \beta_0 \) no se penaliza.

**Efecto:** al aumentar alfa, todos los coeficientes se **encogen** hacia 0 de forma gradual,
pero **nunca valen exactamente 0**; Ridge no elimina variables. Con
[multicolinealidad](../glosario.md#multicolinealidad) (variables muy correlacionadas), la
regresión lineal reparte el efecto entre ellas de forma inestable: los coeficientes pueden ser
muy grandes, de signos opuestos o cambiar mucho con pocos datos. Ridge **estabiliza** esos
coeficientes y tiende a repartir el efecto en partes parecidas.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

escalador = StandardScaler()
X_train_esc = escalador.fit_transform(X_train)
X_test_esc = escalador.transform(X_test)

modelo = Ridge(alpha=alfa)
modelo.fit(X_train_esc, y_train)
y_pred = modelo.predict(X_test_esc)
```

- `alfa` es el valor de alfa que quiere usar (el valor por defecto de `Ridge` es 1).
- `X_train`, `y_train`, `X_test`, `escalador`, `X_train_esc` y `X_test_esc` tienen el mismo
  significado que en Lasso.

## Lasso o Ridge { #lasso-o-ridge }

| | Lasso | Ridge |
|---|---|---|
| Penalización | L1: \( \alpha \sum \lvert\beta_j\rvert \) | L2: \( \alpha \sum \beta_j^2 \) |
| Coeficientes en 0 | Sí, con alfa suficientemente grande | No, solo se acercan a 0 |
| Variables correlacionadas | Suele quedarse con una y reducir o eliminar las otras | Reparte el efecto entre ellas |
| Cuándo usarlo | Sospecha que muchas variables no aportan y quiere un modelo más simple | Muchas variables aportan un poco, o hay multicolinealidad |

- Use **Lasso** si quiere un modelo con menos variables, más fácil de
  [interpretar](interpretar-coeficientes.md).
- Use **Ridge** si cree que la mayoría de las variables aportan algo o si hay variables muy
  correlacionadas.
- Si no tiene claro cuál usar, entrene ambas, elija alfa para cada una con validación cruzada y
  compare sus métricas ([R²](r2.md), [MAE](mae.md), [RMSE](rmse.md)) en validación.

`ElasticNet` (en `sklearn.linear_model`) combina las dos penalizaciones; su parámetro `l1_ratio`
indica qué proporción corresponde a L1. Es útil cuando quiere selección de variables, como Lasso,
pero hay grupos de variables correlacionadas.
