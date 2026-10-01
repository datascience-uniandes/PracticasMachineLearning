# Comparar métricas entre conjuntos

Una métrica calculada en un solo conjunto dice poco. Comparar el [R²](r2.md), el [MAE](mae.md)
y el [RMSE](rmse.md) en el [conjunto de entrenamiento](../glosario.md#conjunto-entrenamiento),
el de [validación](../glosario.md#conjunto-validacion) y el de
[prueba](../glosario.md#conjunto-prueba) muestra si el modelo generaliza a datos que no vio
(vea [división de datos](division-datos.md)).

## Cómo interpretar la comparación

Ponga las métricas de cada conjunto lado a lado y observe tanto su valor como las diferencias
entre ellas:

| Situación | Interpretación |
|-----------|----------------|
| R² alto y errores pequeños en todos los conjuntos | El modelo predice bien y generaliza |
| R² cercano a 0 | El modelo apenas mejora a predecir siempre la media |
| Entrenamiento mucho mejor que validación y prueba | [Sobreajuste](../glosario.md#sobreajuste): el modelo memorizó los datos de entrenamiento |
| Todos los conjuntos con métricas malas y parecidas | [Subajuste](../glosario.md#subajuste): el modelo es demasiado simple o le faltan variables relevantes |

Es normal que el entrenamiento salga un poco mejor que los demás conjuntos; lo que indica
sobreajuste es una diferencia **grande**.

El sobreajuste y el subajuste son los dos extremos del
[compromiso sesgo-varianza](compromiso-sesgo-varianza.md).

!!! warning "No elija el modelo con el conjunto de prueba"
    Compare modelos o [hiperparámetros](../glosario.md#hiperparametro) con las métricas de
    **validación** y use el conjunto de prueba una sola vez, al final. Si compara muchos modelos
    con el conjunto de prueba y se queda con el mejor, la métrica de prueba deja de ser una
    estimación honesta del desempeño en datos nuevos.
