# Crear características derivadas

La [ingeniería de características](../glosario.md#ingenieria-caracteristicas) crea variables
nuevas a partir de las existentes para que el modelo encuentre más fácil un patrón. Una
característica derivada no agrega información que no estuviera en los datos, pero la presenta
de una forma que el modelo puede aprovechar mejor.

## Tipos más comunes

- **Indicadores (variables binarias).** Marcan si se cumple una condición, por ejemplo, si un
  saldo es exactamente 0 o si un conteo supera un valor. Son útiles cuando una condición concreta
  se comporta distinto del resto de los valores.
- **Razones.** Dividen una variable por otra para comparar magnitudes relativas, por ejemplo, el
  saldo frente al salario. Sume una constante pequeña al denominador si puede valer 0.
- **Interacciones.** Multiplican dos variables cuando el efecto de una depende de la otra (vea
  [término de interacción](../glosario.md#termino-interaccion)).
- **Agrupaciones de valores.** Convierten una variable discreta o continua en categorías, por
  ejemplo, «un producto», «dos productos» y «tres o más».

## Qué modelos se benefician

- Los modelos lineales, como la [regresión logística](regresion-logistica.md), solo combinan las
  variables sumándolas: no pueden descubrir solos una interacción, una razón o un efecto que
  cambia de dirección. Las características derivadas les ayudan mucho.
- Los modelos basados en árboles, como el [Random Forest](random-forest.md), ya encuentran por sí
  mismos los cortes y las interacciones, así que suelen mejorar poco con ellas.

!!! warning "Cree las características antes de dividir, pero sin usar la variable objetivo"
    Las características que se calculan fila por fila (indicadores, razones, interacciones) se
    pueden crear antes de dividir los datos. Si una característica usa estadísticas de todo el
    dataset (una media, un percentil) o la variable objetivo, calcúlela solo con el conjunto de
    entrenamiento para evitar la [fuga de datos](../glosario.md#fuga-de-datos).

## Código

```python
df["indicador"] = (df["columna"] == valor).astype(int)
df["razon"] = df["columna_1"] / (df["columna_2"] + 1)
df["interaccion"] = df["columna_1"] * df["columna_2"]
df["mayor_que"] = (df["columna"] >= umbral).astype(int)
```

- `df` es el DataFrame con los datos ya tratados.
- `columna`, `columna_1` y `columna_2` son las variables originales.
- `valor` y `umbral` son los valores que definen la condición del indicador.
- `.astype(int)` convierte `True` y `False` en 1 y 0.
