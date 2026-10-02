# Prácticas de Machine Learning

Talleres prácticos del curso de **Ciencia de Datos** de la Universidad de los Andes.
En cada práctica se trabaja con datos reales en Python, usando **pandas**, **scikit-learn** y **Keras**,
desde la preparación de los datos hasta la evaluación de los modelos.

[Empezar con la Práctica 1 :material-arrow-right:](talleres/practica-1/index.md){ .md-button .md-button--primary }
[Ver el glosario](glosario.md){ .md-button }

## Talleres

<div class="grid cards" markdown>

-   :material-numeric-1-circle:{ .lg .middle } **Práctica 1: Regresión lineal**

    ---

    Predicción del precio de venta de casas: entendimiento y tratamiento de los datos, y modelos de regresión lineal, polinomial y regularizada.

    [:octicons-arrow-right-24: Ir a la práctica](talleres/practica-1/index.md)

-   :material-numeric-2-circle:{ .lg .middle } **Práctica 2: Clasificación**

    ---

    Abandono de clientes bancarios: ingeniería de características, modelos básicos, ensambles y una red neuronal.

    [:octicons-arrow-right-24: Ir a la práctica](talleres/practica-2/index.md)

-   :material-numeric-3-circle:{ .lg .middle } **Práctica 3: Agrupación**

    ---

    Segmentación de clientes de tarjetas de crédito: entendimiento y tratamiento de los datos.

    [:octicons-arrow-right-24: Ir a la práctica](talleres/practica-3/index.md)

-   :material-numeric-4-circle:{ .lg .middle } **Práctica 4**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](talleres/practica-4.md)

-   :material-numeric-5-circle:{ .lg .middle } **Práctica 5**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](talleres/practica-5.md)

</div>

## Ayudas

<div class="grid cards" markdown>

-   :material-code-braces:{ .lg .middle } **Fragmentos de código**

    ---

    Código genérico, con ejemplos, para explorar y tratar datos, construir modelos y revisar sus supuestos.

    [:octicons-arrow-right-24: Empezar por cargar un dataset](ayudas/cargar-dataset.md)

</div>

## Conjuntos de datos

<div class="grid cards" markdown>

-   :material-database:{ .lg .middle } **Abandono de clientes bancarios**

    ---

    10.000 clientes de un banco con datos demográficos y financieros, y si abandonaron el banco.

    [:octicons-arrow-right-24: Ver el dataset](datos/churn.md)

-   :material-database:{ .lg .middle } **Clientes de tarjetas de crédito**

    ---

    9.000 titulares de tarjetas con su comportamiento de compras, avances y pagos. Sin variable objetivo.

    [:octicons-arrow-right-24: Ver el dataset](datos/tarjetas.md)

-   :material-database:{ .lg .middle } **Venta de inmuebles**

    ---

    21.600 ventas de casas en el condado de King (EE. UU.) con sus características y precio. Diccionario de datos y descarga.

    [:octicons-arrow-right-24: Ver el dataset](datos/inmuebles.md)

</div>

## Glosario

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } **Glosario**

    ---

    Definiciones de los términos que se usan en las prácticas.

    [:octicons-arrow-right-24: Consultar](glosario.md)

</div>

## Cómo está organizada cada práctica

Cada práctica parte de un **dataset de trabajo** y se divide en **actividades**.
Cada actividad es una secuencia de pasos numerados con instrucciones y preguntas que debe
resolver en su notebook.

!!! tip "Si se atasca"
    Las acciones de cada paso enlazan a una página de **Ayudas** con el código necesario,
    y los términos clave enlazan al [Glosario](glosario.md).

## Antes de empezar

Puede trabajar en la nube o en su propio equipo.

=== "Google Colab"

    No requiere instalación. Abra un cuaderno nuevo en
    [colab.research.google.com](https://colab.research.google.com/):
    pandas, scikit-learn y Keras ya vienen instalados.

=== "En su equipo"

    Cree un entorno virtual e instale las librerías del curso:

    ```bash
    python -m venv .venv
    source .venv/bin/activate        # En Windows: .venv\Scripts\activate
    pip install numpy pandas matplotlib scikit-learn tensorflow jupyter
    ```

Para comprobar que todo funciona, ejecute:

```python
import sklearn, pandas, keras

print("scikit-learn", sklearn.__version__)
print("pandas", pandas.__version__)
print("keras", keras.__version__)
```

## Conocimientos previos

- Programación básica en Python: funciones, listas, diccionarios.
- Manipulación de datos con pandas y NumPy.
- Nociones de estadística descriptiva y álgebra lineal (vectores y matrices).

## Recursos

- [Documentación de scikit-learn](https://scikit-learn.org/stable/user_guide.html)
- [Documentación de Keras](https://keras.io/guides/)
- [Documentación de pandas](https://pandas.pydata.org/docs/user_guide/index.html)
