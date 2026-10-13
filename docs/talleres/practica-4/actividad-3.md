# Actividad 3: Intervalos de confianza

### Datos de trabajo: el notebook de la [Actividad 2](actividad-2.md)

1. Retome la clase real del conjunto de prueba y las predicciones `y_pred_a` y `y_pred_b` de la
   actividad anterior.
2. [**Aplique bootstrapping**](../../ayudas/bootstrapping.md) al conjunto de prueba con
   \( B = 1000 \) réplicas y semilla 42, y calcule el [**F1**](../../ayudas/f1.md) de cada modelo
   en cada réplica. **¿Por qué no es necesario volver a entrenar los modelos en cada réplica?**
3. Grafique en un mismo [**histograma**](../../ayudas/histograma.md) la distribución del F1 de
   los dos modelos. **¿Dónde está el centro de cada distribución? ¿Cuál es más ancha? ¿Las
   distribuciones se superponen?**
4. [**Calcule el intervalo de confianza del 95 %**](../../ayudas/intervalo-confianza.md) del F1 de
   cada modelo con el método de percentiles, y grafíquelos como barras de error, una por modelo.
   **¿Qué tan ancho es cada intervalo? ¿Qué significa ese ancho para el banco?**
5. **Valide si los intervalos se superponen.** **¿Se superponen? ¿Qué puede concluir sobre la
   diferencia entre A y B? Si se superponen, ¿eso demuestra que los modelos son equivalentes?**
6. Repita los pasos 2 a 5 con la [**sensibilidad**](../../ayudas/sensibilidad.md).
   **¿La conclusión cambia con la métrica? La sensibilidad se calcula solo con los clientes que
   abandonaron: ¿qué efecto tiene eso en el ancho del intervalo?**

!!! success "Fin de la Actividad 3"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
