# Componentes principales (PCA)

El análisis de componentes principales (PCA, por sus siglas en inglés) resume muchas variables
en unas pocas variables nuevas, las **componentes principales**. Su uso más común es dibujar en
un plano datos que tienen muchas dimensiones, por ejemplo, para ver si los grupos de una
[agrupación](../glosario.md#agrupacion) se separan.

## Cómo funciona

- Cada componente es una **combinación lineal** de las variables originales: una suma ponderada
  de todas ellas.
- La **primera componente** es la dirección en la que los datos varían más; la **segunda**, la
  dirección de mayor variación que es perpendicular a la primera, y así sucesivamente.
- Al quedarse con las dos primeras, cada registro pasa a tener solo dos coordenadas y se puede
  graficar en un plano, conservando la mayor parte posible de la variación de los datos.

PCA depende de la escala de las variables: una variable con valores grandes dominaría las
componentes. Aplíquelo siempre sobre las variables [escaladas](escalar-variables.md).

## Cómo interpretarlo

- **Varianza explicada.** Cada componente explica un porcentaje de la variación total de los
  datos. Si las dos primeras explican, por ejemplo, el 50 %, el gráfico muestra la mitad de la
  información: lo que se ve es una aproximación.
- **Cercanía.** Los registros cercanos en el gráfico tienen valores parecidos en las variables
  originales; los lejanos, valores distintos.
- **Grupos.** Si los colores de los grupos ocupan zonas distintas del plano, los grupos están
  separados. Si se superponen, puede que no lo estén, o que se separen en dimensiones que el
  gráfico no muestra. Una superposición en dos dimensiones no prueba que los grupos sean malos.
- **Ejes.** Las componentes no tienen unidades ni un significado directo: son mezclas de todas las
  variables. Para describir los grupos use las variables originales, no las componentes.

## Código: graficar los grupos en dos dimensiones

```python
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
componentes = pca.fit_transform(X_esc)

print("Varianza explicada:", pca.explained_variance_ratio_.round(3))

plt.scatter(componentes[:, 0], componentes[:, 1], c=etiquetas, cmap="tab10", s=5)
plt.xlabel("Componente 1")
plt.ylabel("Componente 2")
plt.title("Grupos en las dos primeras componentes")
plt.show()
```

- `X_esc` son las variables ya escaladas, las mismas que usó para agrupar.
- `etiquetas` es el grupo de cada registro, el resultado del algoritmo de agrupación.
- `componentes` tiene una fila por registro y dos columnas: sus coordenadas en las dos primeras
  componentes.
- `explained_variance_ratio_` es la proporción de la variación que explica cada componente; su
  suma indica cuánta información conserva el gráfico.
- `c=etiquetas` colorea cada punto según su grupo y `s=5` reduce el tamaño de los puntos para que
  se vean mejor con muchos registros.
