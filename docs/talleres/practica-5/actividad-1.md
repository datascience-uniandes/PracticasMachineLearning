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
   polinomio?**

    ??? tip "Paso opcional: construya un pipeline con un asistente de IA"
        En lugar de la función de predicción, puede encapsular el preprocesamiento y el modelo en
        un `Pipeline` de scikit-learn. Copie este prompt en un asistente de IA (por ejemplo, el
        de Google Colab), pegue su código donde se indica y revise con cuidado el resultado antes
        de usarlo:

        ```text
        Tengo dos modelos entrenados en Python con scikit-learn, sin pipelines. Este es el código
        con el que preparé los datos y entrené cada modelo:

        [PEGUE AQUÍ SU CÓDIGO: tratamiento de datos, codificación one-hot, división en
        entrenamiento, validación y prueba, imputación, polinomio, escalado y entrenamiento]

        Reescribe ese código como dos objetos Pipeline de scikit-learn que reciban las variables
        originales (antes del polinomio y del escalado) y cumplan estas condiciones:

        1. Regresión: un ColumnTransformer que aplique PolynomialFeatures (mismo grado,
           include_bias=False) solo a las variables continuas y deje las columnas one-hot sin
           cambios, seguido de StandardScaler y de LinearRegression.
        2. Clasificación: StandardScaler seguido de RandomForestClassifier con exactamente los
           mismos hiperparámetros y el mismo random_state.
        3. No cambies la división de los datos ni la imputación; entrena cada pipeline solo con
           el conjunto de entrenamiento.
        4. Agrega una celda que compruebe con np.allclose que pipeline.predict(X_test) es igual
           a predecir_precio(X_test) y que pipeline.predict_proba(X_test)[:, 1] es igual a
           predecir_abandono(X_test).
        5. Muestra cómo pasar cada pipeline directamente a PartialDependenceDisplay de
           sklearn.inspection (kind="individual") para los gráficos ICE, y cómo usarlo como
           función de predicción para LIME y SHAP, convirtiendo la entrada en un DataFrame con
           los nombres de las columnas.
        6. Explica brevemente cada paso del código.
        ```

        **¿El pipeline predice exactamente lo mismo que su función de predicción? Si no, ¿qué
        paso es distinto? ¿Qué ventajas tiene el pipeline frente a la función al llevar el modelo
        a producción?**

2. **ICE de regresión:** envuelva cada función de predicción en un
   [**estimador de scikit-learn**](../../ayudas/grafico-ice.md#codigo) para poder usar
   `PartialDependenceDisplay` (si construyó el _pipeline_ opcional, use el _pipeline_). Con una
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
7. [**Limitaciones:**](../../ayudas/grafico-ice.md#limitaciones) **al variar `AreaHabitable`,
   ¿qué pasa con las casas cuyo `AreaHabitable15` o `AreaLote` no son compatibles con el área
   asignada? ¿Por qué las variables [correlacionadas](../../glosario.md#correlacion) generan
   combinaciones irreales? ¿Un gráfico ICE muestra una relación causal entre la variable y el
   precio o el abandono?**

!!! success "Fin de la Actividad 1"
    Guarde los cambios en el notebook. Ya estamos listos para continuar con la siguiente actividad.
