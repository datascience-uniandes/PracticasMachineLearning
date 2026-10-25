# Actividad 1: Gráficos ICE

### Datos de trabajo: los notebooks de la [Actividad 3 de la Práctica 1](../practica-1/actividad-3.md) y de la [Actividad 4 de la Práctica 2](../practica-2/actividad-4.md)

1. **Retome los dos modelos:** la regresión polinomial elegida en la Práctica 1 y el
   [Random Forest](../../ayudas/random-forest.md) de la Práctica 2, con sus objetos ya ajustados
   (polinomio, escaladores y modelos) y sus conjuntos de entrenamiento y prueba. Construya para
   cada uno una [**función de predicción**](../../ayudas/funcion-prediccion.md):
   `predecir_precio(X)`, que recibe las variables antes del polinomio y devuelve el precio, y
   `predecir_abandono(X)`, que recibe las variables antes del escalado y devuelve la
   probabilidad de abandono. Compruebe que sus predicciones en el conjunto de prueba son iguales
   a las del modelo. **¿Qué transformaciones aplica cada función? ¿Por qué dentro de ella se usa
   `transform` y no `fit`? ¿Por qué no se pueden interpretar directamente las columnas del
   polinomio?** En lugar de las funciones, también puede
   [**crear un pipeline**](../../ayudas/pipeline.md) para cada modelo, con código o con un
   asistente de IA generativa.
2. **ICE de regresión:** envuelva cada función de predicción en un
   [**estimador de scikit-learn**](../../ayudas/grafico-ice.md#codigo) para poder usar
   `PartialDependenceDisplay` (si construyó un _pipeline_, úselo directamente). Con una
   muestra de 200 casas de prueba, [**grafique las curvas ICE**](../../ayudas/grafico-ice.md) de
   `AreaHabitable` con `PartialDependenceDisplay.from_estimator` y `kind="individual"`.
   **¿Qué forma tiene el efecto del área sobre el precio? ¿Se nota la curvatura del polinomio?
   ¿Las curvas son paralelas o se cruzan, y qué indica eso?**
3. Repita el gráfico con `Calificación` y con `Latitud`. **¿Cuál de las tres variables cambia
   más el precio a lo largo de su rango? ¿Hay zonas donde el efecto se aplana o cambia de
   dirección?**
4. [**ICE centrado:**](../../ayudas/grafico-ice.md#ice-centrado) grafique las curvas de
   `AreaHabitable` centradas en su primer valor (`centered=True`). **¿Todas las casas responden igual al área? Si
   no, ¿qué otra variable podría explicar la diferencia?**
5. **ICE de clasificación:** con una muestra de 200 clientes de prueba, grafique las curvas ICE
   de la probabilidad de abandono frente a `age`, `balance` y `products_number` en una sola
   llamada a `PartialDependenceDisplay` (para `products_number`, la rejilla son sus valores
   posibles, de 1 a 4). **¿En qué rango de edad
   sube más el riesgo de abandono? ¿Qué pasa con la probabilidad al pasar de uno a dos productos
   y de dos a tres o más? ¿El saldo influye tanto como la edad?**
6. [**Colorear por subgrupo:**](../../ayudas/grafico-ice.md#colorear-por-subgrupo) repita el ICE
   de `age` coloreando las curvas según `active_member`: grafique cada subgrupo con su color
   (`ice_lines_kw`) sobre los mismos ejes y con la misma rejilla (`custom_values`). **¿El efecto de la edad es el mismo para
   los miembros activos y los inactivos? ¿Qué
   [interacción](../../glosario.md#termino-interaccion) revela el gráfico?**
7. Escriba una breve explicación, apoyada por los gráficos de ICE, que indiquen como
   funciona la predicción del modelo de regresión y cómo funciona la predicción del modelo de clasificación.

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
