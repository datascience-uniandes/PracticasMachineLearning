# Actividad 2: LIME

### Datos de trabajo: el notebook de la [Actividad 1](actividad-1.md)

1. **Cree un [explicador LIME](../../ayudas/lime.md)** para cada modelo con el conjunto de
   entrenamiento antes de transformar, indicando las variables categóricas (las columnas
   one-hot y las binarias). **¿Qué hace LIME para explicar una sola predicción? ¿Por qué
   necesita la función de predicción y no el modelo?**
2. **Explique tres casas de prueba:** la más barata, una de precio cercano a la mediana y la de
   mayor error absoluto, con las 8 variables más influyentes. **¿Qué variables suben y cuáles
   bajan el precio de cada casa? ¿La explicación coincide con lo que mostraron los gráficos ICE?**
3. [**Revise la fidelidad local:**](../../ayudas/lime.md#fidelidad-y-estabilidad) compare la
   predicción del modelo con la del modelo sustituto (`local_pred`) y revise su R² local
   (`score`) en cada casa. **¿Qué tan bien aproxima LIME al modelo alrededor de cada casa? ¿En
   cuál es menos confiable la explicación?**
4. **Revise la estabilidad:** explique la casa de precio medio cinco veces con semillas distintas
   (`random_state`), primero con `num_samples=1000` y luego con `num_samples=5000`.
   **¿Cambian las variables más influyentes o sus pesos? ¿Qué implica eso para confiar en una
   sola explicación de LIME?**
5. **Explique tres clientes de prueba:** un abandono bien detectado (verdadero positivo), un
   abandono no detectado (falso negativo) y una falsa alarma (falso positivo), con las 6
   variables más influyentes. **¿Qué variables llevaron al Random Forest a cada decisión? ¿Por qué
   cree que se equivocó en el falso negativo y en el falso positivo?**
6. **Compare dos clientes con una probabilidad de abandono parecida** pero con características
   distintas. **¿El modelo llega a la misma probabilidad por las mismas razones?**
7. **Conclusiones:** **si un asesor comercial va a llamar a un cliente en riesgo, ¿qué le diría a
   partir de la explicación de LIME? ¿Qué cuidados debe tener al usar estas explicaciones?**

!!! success "Fin de la Actividad 2"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
