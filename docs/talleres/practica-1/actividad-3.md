# Actividad 3: Regresión polinomial

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. Retome la ingeniería de características de la actividad anterior: las
   [variables continuas](../../glosario.md#variable-continua) seleccionadas y las columnas de la
   [**codificación one-hot**](../../ayudas/one-hot.md).
2. [**Genere un modelo de regresión polinomial**](../../ayudas/regresion-polinomial.md) de
   **grado 2**, aplicando el polinomio solo a las variables continuas y conservando las columnas
   one-hot sin transformar.
   **¿Cuántas columnas tiene ahora el modelo? ¿Cuáles son términos al cuadrado y cuáles
   [términos de interacción](../../glosario.md#termino-interaccion)?**
3. [**Revise la linealidad de los nuevos términos**](../../ayudas/linealidad-terminos.md):
   realice [**gráficos de dispersión**](../../ayudas/grafico-dispersion.md) de cada término al
   cuadrado y de cada término de interacción contra la
   [variable objetivo](../../glosario.md#variable-objetivo).
   **¿Algún término muestra una relación más clara con el área quemada que las variables
   originales? ¿Cuáles parecen no aportar?**
4. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) del modelo polinomial en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los del modelo de
   [regresión lineal](../../glosario.md#regresion-lineal) de la actividad anterior.
   **¿El modelo polinomial mejora las predicciones? ¿La mejora se mantiene en el conjunto de
   prueba o solo aparece en entrenamiento?**
5. **Variación de [hiperparámetros](../../glosario.md#hiperparametro):** [**divida los datos en
   entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion) (60 %, 20 % y
   20 %) y [**entrene polinomios de grado 3, 4 y 5**](../../ayudas/seleccion-hiperparametros.md),
   además del de grado 2, usando solo el
   [conjunto de entrenamiento](../../glosario.md#conjunto-entrenamiento).
   **¿Cuántas columnas genera cada grado? ¿Por qué no se debe usar el conjunto de prueba para
   comparar los grados?**
6. **Elija el mejor modelo con las métricas de validación:**

    - **a)** [**Construya una tabla**](../../ayudas/seleccion-hiperparametros.md#recorrer-los-valores-del-hiperparametro)
      con el R², el MAE y el RMSE de cada grado en entrenamiento y en
      [validación](../../glosario.md#conjunto-validacion).
    - **b)** [**Grafique la curva de entrenamiento y validación**](../../ayudas/seleccion-hiperparametros.md#graficar-la-curva-de-validacion)
      (RMSE de entrenamiento y de validación) contra el grado del polinomio.
    - **c)** Elija el grado con el **menor RMSE de validación**; si dos grados tienen un RMSE de
      validación muy parecido, elija el más simple (el de menor grado).

    **¿Qué grado obtiene el menor error de validación? ¿Cómo cambian los errores de entrenamiento y
    de validación al subir el grado? Explique el resultado en términos del
    [compromiso sesgo-varianza](../../glosario.md#compromiso-sesgo-varianza): ¿qué grados muestran
    [subajuste](../../glosario.md#subajuste) y cuáles [sobreajuste](../../glosario.md#sobreajuste)?**

7. **Evalúe el mejor modelo en el conjunto de prueba** (datos nunca vistos) y reporte su
   [**R²**](../../ayudas/r2.md), [**MAE**](../../ayudas/mae.md) y
   [**RMSE**](../../ayudas/rmse.md). Compare el MAE y el RMSE con la media, la
   [**desviación estándar y el rango**](../../ayudas/explorar-estructura.md) de la variable
   objetivo. **¿Qué tan grande es el error frente a la variación natural del área quemada? ¿El
   modelo elegido es mejor que el modelo lineal de la actividad anterior?**
8. Revise de nuevo los supuestos sobre los [residuos](../../glosario.md#residuo) del modelo
   polinomial elegido y compárelos con los del modelo lineal de la actividad anterior:

    - **a)** Realice el [**gráfico de residuos vs. valores predichos**](../../ayudas/residuos-vs-predichos.md).
      **¿Mejoró la [homocedasticidad](../../glosario.md#homocedasticidad) frente al modelo
      lineal? ¿Qué patrón observa?**
    - **b)** Aplique la [**prueba de Shapiro-Wilk**](../../ayudas/shapiro-wilk.md) a los residuos.
      **¿Se cumple el supuesto de [normalidad](../../glosario.md#normalidad)? ¿Qué indica el
      [valor p](../../glosario.md#valor-p)?**
    - **c)** Realice el [**gráfico Q-Q**](../../ayudas/grafico-qq.md) de los residuos.
      **¿Los puntos siguen la línea de referencia mejor que con el modelo lineal? ¿Qué
      limitaciones siguen presentes?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
