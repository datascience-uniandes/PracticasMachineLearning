# Actividad 2: Regresión lineal

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md), con los datos ya tratados

1. **Ingeniería de características:** realice [**gráficos de dispersión**](../../ayudas/grafico-dispersion.md)
   entre cada variable continua y la [variable objetivo](../../glosario.md#variable-objetivo)
   tratada en la actividad anterior. **¿Qué variables muestran una relación lineal con el área
   quemada? ¿Alguna muestra una relación no lineal o ninguna relación?**
2. Calcule la [**matriz de correlación**](../../ayudas/correlacion.md) entre las variables
   independientes y con la variable objetivo. Seleccione las variables con una
   [correlación](../../glosario.md#correlacion) de al menos **|r| ≥ 0,05** con la variable objetivo.
   **¿Hay pares de variables independientes muy correlacionadas entre sí (|r| > 0,7)?** Si las hay,
   conserve solo una de cada par para evitar [multicolinealidad](../../glosario.md#multicolinealidad).
3. Aplique [**codificación one-hot**](../../ayudas/one-hot.md) a las variables categóricas.
   **¿Cuántas columnas nuevas se generan? ¿Por qué se elimina una categoría de cada variable?**
4. Divida los datos en [**conjuntos de entrenamiento y de prueba**](../../ayudas/division-datos.md)
   y [**genere el modelo de regresión lineal**](../../ayudas/regresion-lineal.md) con las
   variables seleccionadas.
5. [**Interprete los coeficientes**](../../ayudas/interpretar-coeficientes.md) del modelo.
   **¿Qué variables aumentan el área predicha y cuáles la disminuyen? ¿Cuánto cambia la
   predicción por cada unidad de cada variable? ¿Qué significan los coeficientes de los meses
   respecto a la categoría de referencia? ¿Se pueden comparar las magnitudes directamente?**
6. Calcule el [**R²**](../../ayudas/r2.md), el [**MAE**](../../ayudas/mae.md) y el
   [**RMSE**](../../ayudas/rmse.md) en el conjunto de entrenamiento. **¿Qué tan grande es el
   error frente al rango de la variable objetivo?**
7. Calcule las mismas métricas en el conjunto de prueba y
   [**compárelas con las de entrenamiento**](../../ayudas/comparar-metricas.md). **¿Qué
   significa la diferencia? ¿Hay señales de [sobreajuste](../../glosario.md#sobreajuste)?**
8. [**Compare los valores reales con los predichos**](../../ayudas/reales-vs-predichos.md).
   **¿Las predicciones siguen a los valores reales o se concentran alrededor de la media?**
9. Realice el [**gráfico de residuos vs. valores predichos**](../../ayudas/residuos-vs-predichos.md).
   **¿Se cumple el supuesto de [homocedasticidad](../../glosario.md#homocedasticidad)? ¿Qué patrón
   observa?**
10. Revise la [**distribución de los residuos**](../../ayudas/normalidad-residuos.md) y aplique la
    [**prueba de Shapiro-Wilk**](../../ayudas/shapiro-wilk.md). **¿Se cumple el supuesto de [normalidad](../../glosario.md#normalidad)?
    ¿Qué indica el [valor p](../../glosario.md#valor-p)?**
11. Realice el [**gráfico Q-Q**](../../ayudas/grafico-qq.md) de los residuos.
    **¿Los puntos siguen la línea de referencia? ¿Qué dice la forma de los extremos sobre las
    colas de la distribución?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
