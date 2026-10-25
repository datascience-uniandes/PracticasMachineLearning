# Actividad 3: Valores SHAP

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. [**Cree un explicador SHAP**](../../ayudas/shap.md#que-explicador-usar) para cada modelo y
   [**calcule los valores SHAP**](../../ayudas/shap.md#codigo) de una muestra de 300 casas y de
   300 clientes de prueba: use el explicador agnóstico con la función de predicción para la
   regresión polinomial, con una muestra de fondo de 100 casas de entrenamiento, y el explicador
   de árboles para el Random Forest. **¿Qué representa el
   [valor base](../../glosario.md#valor-base) de cada modelo? ¿El valor base del Random Forest
   coincide con la proporción de clientes que abandonan? Si no, ¿qué hiperparámetro del modelo
   lo explica? ¿Qué significa un valor SHAP positivo o negativo? ¿En qué unidades están los
   valores de cada modelo?**
2. **Predicciones individuales:** grafique la [**cascada**](../../ayudas/graficos-shap.md#cascada-prediccion-individual)
   de las tres casas y de los tres clientes (verdadero positivo, falso negativo y falso
   positivo) que explicó en la Actividad 2, y compruebe que el valor base más la suma de los
   valores SHAP da la predicción. **¿Qué variables explican cada predicción? ¿Coinciden con las
   de LIME? ¿Dónde difieren y por qué?**
3. [**Diagrama de fuerza:**](../../ayudas/graficos-shap.md#diagrama-de-fuerza) grafique el
   diagrama de fuerza individual de los mismos casos y luego el diagrama de fuerza conjunto de
   los 300 registros de cada modelo. **¿Qué variables empujan la predicción hacia arriba y cuáles
   hacia abajo? En el diagrama conjunto, ¿se forman grupos de casas o de clientes que el modelo
   explica de forma parecida? ¿Qué los caracteriza?**
4. [**Diagrama de enjambre:**](../../ayudas/graficos-shap.md#diagrama-de-enjambre) grafique el
   diagrama de enjambre de cada modelo. **¿Qué variables pesan más en el precio y en el
   abandono? ¿Los valores altos de cada variable suben o bajan la predicción? ¿Coincide con lo
   que mostraron los gráficos ICE, por ejemplo, para `products_number`?**
5. **Compare las tres técnicas:** construya una tabla con una fila para los gráficos ICE, otra
   para LIME y otra para SHAP, y estas columnas: si la explicación es
   [local](../../glosario.md#explicacion-local) o [global](../../glosario.md#explicacion-global),
   qué pregunta responde, costo de cálculo, estabilidad y limitaciones.

    **¿Las tres técnicas llegan a las mismas variables importantes? ¿Qué técnica le presentaría a
    la inmobiliaria para explicar un precio y cuál al banco para explicar el riesgo de un
    cliente? ¿Por qué ninguna de las tres demuestra una relación causal?**

!!! success "Fin de la Práctica 5"
    Guarde los cambios en el notebook. Ha completado todas las actividades de esta práctica.
