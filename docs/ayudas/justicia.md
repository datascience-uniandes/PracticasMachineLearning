# Medir la justicia de un clasificador

Las [medidas de justicia](../glosario.md#justicia-algoritmica) evalúan si un modelo predice de
manera igualitaria para todos los valores de un
[atributo sensible](../glosario.md#atributo-sensible), como el sexo, la edad o el origen. Un
modelo puede tener buenas métricas en general y, aun así, equivocarse más o favorecer más a un
grupo que a otro.

## Notación

| Símbolo | Significado |
|---------|-------------|
| \( G \) | Atributo sensible o protegido (por ejemplo, sexo: \( A \) = mujer, \( B \) = hombre) |
| \( X \) | Atributos que describen a un individuo |
| \( Y \) | Clase real |
| \( S \) | Probabilidad predicha por el modelo |
| \( d \) | Decisión predicha para el individuo (\( d = 1 \) si \( S \) supera el umbral) |

Las definiciones de **justicia de grupo** comparan medidas entre los grupos; las de
**calibración** y **discriminación causal** se acercan a la justicia individual: que cada persona
sea tratada según lo que es y no según el grupo al que pertenece.

## Regla de decisión

En este curso, una **diferencia mayor que 5 puntos porcentuales** (0,05) entre los grupos indica
que el clasificador **no es justo** según esa definición. En la discriminación causal, la regla se
aplica al porcentaje de individuos cuya decisión cambia.

## Definiciones

### Paridad estadística

\[
P(d = 1 \mid G = A) = P(d = 1 \mid G = B)
\]

Los individuos de los dos grupos tienen la misma probabilidad de ser asignados a la clase
positiva. Compara la **tasa de predicciones positivas** de cada grupo, sin mirar la clase real.

### Paridad estadística condicional

\[
P(d = 1 \mid L = l, G = A) = P(d = 1 \mid L = l, G = B)
\]

Extiende la paridad estadística permitiendo que un conjunto de **factores legítimos** \( L \)
afecte el resultado. La comparación se hace **dentro de cada combinación de valores** de \( L \)
(por ejemplo, dentro de cada rango de edad): dos individuos con los mismos factores legítimos
deben tener la misma probabilidad de recibir la clase positiva. Los factores se discretizan en
pocos rangos para que cada combinación tenga suficientes individuos.

### Paridad de predicción

\[
P(Y = 1 \mid d = 1, G = A) = P(Y = 1 \mid d = 1, G = B)
\]

Los dos grupos tienen la misma [precisión](precision.md): de los individuos asignados a la clase
positiva, la misma proporción pertenece realmente a ella.

### Igualdad de exactitud

\[
P(d = Y \mid G = A) = P(d = Y \mid G = B)
\]

Los dos grupos tienen la misma [exactitud](exactitud.md): el modelo acierta en la misma
proporción, ya sea en la clase positiva o en la negativa.

### Calibración

\[
P(Y = 1 \mid S = s, G = A) = P(Y = 1 \mid S = s, G = B) = s
\]

Para cada valor de la probabilidad predicha \( s \), los individuos de los dos grupos tienen la
misma probabilidad de pertenecer realmente a la clase positiva, y esa probabilidad es igual a
\( s \). Como \( S \) es continua, se agrupa en intervalos (por ejemplo, de 0,1 de ancho) y se
compara, en cada intervalo, la proporción real de positivos de cada grupo entre sí y con el
centro del intervalo.

### Discriminación causal

\[
(X_A = X_B \wedge G_A \neq G_B) \rightarrow d_A = d_B
\]

El clasificador produce la misma decisión para dos individuos con los mismos atributos que solo
difieren en el atributo sensible. Para probarlo, se copia el conjunto de evaluación, se cambia el
valor del atributo sensible de cada individuo y se cuenta en qué porcentaje cambia la decisión.

## Cómo interpretar los resultados

- **Las definiciones pueden contradecirse.** Cuando la proporción real de positivos es distinta
  en cada grupo, en general no es posible cumplir al mismo tiempo la paridad estadística, la
  paridad de predicción y la calibración. Hay que decidir cuál importa más para el problema.
- **La diferencia de las tasas reales importa.** Si un grupo realmente tiene más positivos, un
  modelo preciso le asignará más predicciones positivas y no cumplirá la paridad estadística.
- **Quitar el atributo sensible no basta.** Otras variables correlacionadas con él (sus
  _proxies_) pueden reproducir el mismo sesgo.
- **Grupos pequeños dan diferencias inestables.** Revise cuántos individuos hay en cada grupo,
  combinación o intervalo antes de concluir.

## Referencias

- Verma, S. y Rubin, J. (2018). Fairness definitions explained. En _Proceedings of the
  International Workshop on Software Fairness (FairWare '18)_, 1–7.
  [https://doi.org/10.1145/3194770.3194776](https://doi.org/10.1145/3194770.3194776)

## Código

Datos para las definiciones:

```python
import numpy as np
import pandas as pd

s = modelo.predict_proba(X_test)[:, 1]
d = (s >= 0.5).astype(int)
y = np.asarray(y_test)
grupo = X_test["atributo_sensible"].to_numpy()

UMBRAL = 0.05

def comparar(medida, valores):
    diferencia = max(valores.values()) - min(valores.values())
    conclusion = "no es justo" if diferencia > UMBRAL else "es justo"
    valores = {k: round(float(v), 3) for k, v in valores.items()}
    print(f"{medida}: {valores} | diferencia = {diferencia:.3f} -> {conclusion}")
```

- `modelo` es el clasificador o el _pipeline_ entrenado y `X_test`, las variables de prueba;
  `s` son las probabilidades y `d`, las decisiones con umbral 0,5.
- `grupo` tiene el valor del atributo sensible de cada individuo.
- `comparar` recibe un diccionario `{grupo: valor}` y aplica la regla del 5 %.

Paridad estadística:

```python
comparar("Paridad estadística", {g: d[grupo == g].mean() for g in np.unique(grupo)})
```

Paridad estadística condicional:

```python
tabla = pd.DataFrame({"factor": factor_legitimo, "grupo": grupo, "d": d})
condicional = tabla.pivot_table(index="factor", columns="grupo", values="d",
                                aggfunc=["mean", "size"], observed=True)
condicional["diferencia"] = (condicional["mean"].max(axis=1) - condicional["mean"].min(axis=1))
condicional["justo"] = condicional["diferencia"] <= UMBRAL
print(condicional.round(3))
```

- `factor_legitimo` es un arreglo con la combinación de factores legítimos de cada individuo, ya
  discretizada; por ejemplo, el rango de edad unido al número de productos como texto.
- `mean` es la tasa de predicciones positivas y `size`, el número de individuos de cada grupo en
  cada combinación.

Paridad de predicción:

```python
comparar("Paridad de predicción",
         {g: y[(grupo == g) & (d == 1)].mean() for g in np.unique(grupo)})
```

Igualdad de exactitud:

```python
comparar("Igualdad de exactitud", {g: (d == y)[grupo == g].mean() for g in np.unique(grupo)})
```

Calibración:

```python
import matplotlib.pyplot as plt

intervalos = pd.cut(s, np.linspace(0, 1, 11), include_lowest=True)
tabla = pd.DataFrame({"intervalo": intervalos, "grupo": grupo, "y": y})
calibracion = tabla.pivot_table(index="intervalo", columns="grupo", values="y",
                                aggfunc=["mean", "size"], observed=True)
calibracion["centro"] = [intervalo.mid for intervalo in calibracion.index]
calibracion["diferencia"] = (calibracion["mean"].max(axis=1) - calibracion["mean"].min(axis=1))
print(calibracion.round(3))

for g in calibracion["mean"].columns:
    plt.plot(calibracion["centro"], calibracion["mean"][g], marker="o", label=g)
plt.plot([0, 1], [0, 1], "k--", label="Calibración perfecta")
plt.xlabel("Probabilidad predicha (S)")
plt.ylabel("Proporción real de positivos")
plt.legend()
plt.show()
```

- Cada fila es un intervalo de \( S \); `mean` es la proporción real de positivos de cada grupo y
  `size`, el número de individuos.
- `diferencia` compara los grupos entre sí; compare también cada proporción con `centro`.
- En el gráfico, un modelo calibrado sigue la diagonal en los dos grupos.

Discriminación causal:

```python
X_cambiado = X_test.copy()
X_cambiado["atributo_sensible"] = X_cambiado["atributo_sensible"].map({"valor_A": "valor_B",
                                                                       "valor_B": "valor_A"})
d_cambiado = (modelo.predict_proba(X_cambiado)[:, 1] >= 0.5).astype(int)

porcentaje = (d_cambiado != d).mean()
print(f"Decisiones que cambian: {porcentaje:.1%} ->",
      "no es justo" if porcentaje > UMBRAL else "es justo")
```

- `X_cambiado` es una copia idéntica de `X_test` con el atributo sensible intercambiado
  (`valor_A` y `valor_B` son sus dos valores, por ejemplo, `"Female"` y `"Male"`).
- `porcentaje` es la proporción de individuos cuya decisión cambia solo por el atributo sensible.
