# Prácticas de Machine Learning

Talleres prácticos del curso de **Ciencia de Datos** de la Universidad de los Andes.
En cada práctica se trabaja con datos reales en Python, usando **pandas**, **scikit-learn** y **Keras**,
desde la preparación de los datos hasta la evaluación de los modelos.

[Empezar con la Práctica 1 :material-arrow-right:](practica-1.md){ .md-button .md-button--primary }
[Ver el glosario](glosario.md){ .md-button }

## Prácticas

<div class="grid cards" markdown>

-   :material-numeric-1-circle:{ .lg .middle } **Práctica 1**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](practica-1.md)

-   :material-numeric-2-circle:{ .lg .middle } **Práctica 2**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](practica-2.md)

-   :material-numeric-3-circle:{ .lg .middle } **Práctica 3**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](practica-3.md)

-   :material-numeric-4-circle:{ .lg .middle } **Práctica 4**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](practica-4.md)

-   :material-numeric-5-circle:{ .lg .middle } **Práctica 5**

    ---

    _Tema por definir_

    [:octicons-arrow-right-24: Ir a la práctica](practica-5.md)

-   :material-book-open-variant:{ .lg .middle } **Glosario**

    ---

    Términos clave y fragmentos de código de ayuda para resolver los ejercicios.

    [:octicons-arrow-right-24: Consultar](glosario.md)

</div>

## Cómo está organizada cada práctica

Todas las prácticas siguen la misma estructura:

1. **Objetivos**: lo que debe saber hacer al terminar.
2. **Ejercicios guiados**: cada uno tiene
    - un _enunciado_ con la tarea,
    - un _fundamento_ con el concepto y sus fórmulas,
    - un _código_ de partida para completar,
    - un _resultado esperado_ para comprobar su solución.
3. **Ejercicio de síntesis**: integra lo visto en la práctica sobre un dataset nuevo.

!!! tip "Si se atasca"
    Los recuadros de **Ayuda** de cada ejercicio remiten al [Glosario](glosario.md),
    donde hay fragmentos de código listos para adaptar.

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
