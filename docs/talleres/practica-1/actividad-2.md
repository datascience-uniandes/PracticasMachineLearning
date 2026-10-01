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
4. Divida los datos en [conjuntos de entrenamiento](../../glosario.md#conjunto-entrenamiento) y de
   [prueba](../../glosario.md#conjunto-prueba) y [**genere el modelo de regresión
   lineal**](../../ayudas/regresion-lineal.md) con las variables seleccionadas.
   **¿Qué coeficientes son positivos y cuáles negativos? ¿Cómo se interpretan?**
5. [**Calcule el R², el MAE y el RMSE**](../../ayudas/metricas-regresion.md) en el conjunto de
   entrenamiento. **¿Qué tan grande es el error frente al rango de la variable objetivo?**
6. Calcule las mismas [**métricas**](../../ayudas/metricas-regresion.md) en el conjunto de prueba y
   compárelas con las de entrenamiento. **¿Qué significa la diferencia? ¿Hay señales de
   [sobreajuste](../../glosario.md#sobreajuste)?**
7. [**Compare los valores reales con los predichos**](../../ayudas/reales-vs-predichos.md).
   **¿Las predicciones siguen a los valores reales o se concentran alrededor de la media?**
8. Realice el [**gráfico de residuos vs. valores predichos**](../../ayudas/residuos-vs-predichos.md).
   **¿Se cumple el supuesto de [homocedasticidad](../../glosario.md#homocedasticidad)? ¿Qué patrón
   observa?**
9. Revise la [**distribución de los residuos**](../../ayudas/normalidad-residuos.md) y aplique la
   prueba de Shapiro-Wilk. **¿Se cumple el supuesto de [normalidad](../../glosario.md#normalidad)?
   ¿Qué indica el [valor p](../../glosario.md#valor-p)?**
10. Realice el [**gráfico Q-Q**](../../ayudas/grafico-qq.md) de los residuos.
    **¿Los puntos siguen la línea de referencia? ¿Qué dice la forma de los extremos sobre las
    colas de la distribución?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
