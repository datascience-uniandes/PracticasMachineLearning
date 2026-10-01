# Actividad 3: Regresión polinomial

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. Retome la ingeniería de características de la actividad anterior: las variables continuas
   seleccionadas y las columnas de la [codificación one-hot](../../ayudas/one-hot.md).
   [**Genere un modelo de regresión polinomial**](../../ayudas/regresion-polinomial.md) de
   **grado 2**, aplicando el polinomio solo a las [variables continuas](../../glosario.md#variable-continua)
   y conservando las columnas one-hot sin transformar.
   **¿Cuántas columnas tiene ahora el modelo? ¿Cuáles son términos al cuadrado y cuáles
   [términos de interacción](../../glosario.md#termino-interaccion)?**
2. [**Revise la linealidad de los nuevos términos**](../../ayudas/regresion-polinomial.md#revisar-la-linealidad-de-los-nuevos-terminos):
   realice [**gráficos de dispersión**](../../ayudas/grafico-dispersion.md) de cada término al
   cuadrado y de cada término de interacción contra la
   [variable objetivo](../../glosario.md#variable-objetivo).
   **¿Algún término muestra una relación más clara con el área quemada que las variables
   originales? ¿Cuáles parecen no aportar?**
3. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) del modelo polinomial en entrenamiento y en prueba, y
   [**compárelos**](../../ayudas/comparar-metricas.md) con los del modelo de
   [regresión lineal](../../glosario.md#regresion-lineal) de la actividad anterior.
   **¿El modelo polinomial mejora las predicciones? ¿La mejora se mantiene en el conjunto de
   prueba o solo aparece en entrenamiento?**
4. **Variación de [hiperparámetros](../../glosario.md#hiperparametro):** [**divida los datos en
   entrenamiento, validación y prueba**](../../ayudas/division-datos.md#validacion) (60 %, 20 % y
   20 %) y [**entrene polinomios de grado 3, 4 y 5**](../../ayudas/seleccion-hiperparametros.md),
   además del de grado 2, usando solo el
   [conjunto de entrenamiento](../../glosario.md#conjunto-entrenamiento).
   **¿Cuántas columnas genera cada grado? ¿Por qué no se debe usar el conjunto de prueba para
   comparar los grados?**
5. [**Elija el mejor modelo con las métricas de validación**](../../ayudas/seleccion-hiperparametros.md#elegir-el-mejor-valor):
   construya una tabla con el R², el MAE y el RMSE de cada grado en entrenamiento y en
   [validación](../../glosario.md#conjunto-validacion), y grafique la
   [**curva de validación**](../../ayudas/seleccion-hiperparametros.md#graficar-la-curva-de-validacion).
   **¿Qué grado obtiene el menor error de validación? ¿Cómo cambian los errores de entrenamiento y
   de validación al subir el grado? Explique el resultado en términos del
   [compromiso sesgo-varianza](../../glosario.md#compromiso-sesgo-varianza): ¿qué grados muestran
   [subajuste](../../glosario.md#subajuste) y cuáles [sobreajuste](../../glosario.md#sobreajuste)?**
6. [**Evalúe el mejor modelo en el conjunto de prueba**](../../ayudas/seleccion-hiperparametros.md#evaluar-el-modelo-elegido-en-prueba)
   (datos nunca vistos) y reporte su R², MAE y RMSE. Compare el MAE y el RMSE con la media, la
   [**desviación estándar y el rango**](../../ayudas/explorar-estructura.md) de la variable
   objetivo. **¿Qué tan grande es el error frente a la variación natural del área quemada? ¿El
   modelo elegido es mejor que el modelo lineal de la actividad anterior?**
7. Revise de nuevo los supuestos con el modelo polinomial elegido: el
   [**gráfico de residuos vs. valores predichos**](../../ayudas/residuos-vs-predichos.md), la
   [**distribución de los residuos**](../../ayudas/normalidad-residuos.md) con la prueba de
   Shapiro-Wilk y el [**gráfico Q-Q**](../../ayudas/grafico-qq.md).
   **¿Mejoraron la [homocedasticidad](../../glosario.md#homocedasticidad) y la
   [normalidad](../../glosario.md#normalidad) de los [residuos](../../glosario.md#residuo) frente
   al modelo lineal? ¿Qué limitaciones siguen presentes?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
