# Cargar un dataset

Un archivo `.csv` se carga con la función `read_csv` de pandas, que devuelve una tabla (`DataFrame`):

```python
import pandas as pd

df = pd.read_csv("nombrearchivo.csv")
df.head()
```

- `nombrearchivo` es el nombre del archivo en cuestión. Si el archivo no está en la misma carpeta
  que el notebook, escriba la ruta completa, por ejemplo `"datos/nombrearchivo.csv"`.
- `df` es la variable donde queda guardada la tabla. Puede usar otro nombre.
- `df.head()` muestra las primeras 5 filas. Use `df.head(n)` para ver `n` filas.

## Opciones frecuentes

```python
df = pd.read_csv("nombrearchivo.csv", sep=";")           # columnas separadas por punto y coma
df = pd.read_csv("nombrearchivo.csv", encoding="latin-1") # archivos con tildes mal leídas
df = pd.read_excel("nombrearchivo.xlsx")                  # archivos de Excel
```

!!! tip "En Google Colab"
    Suba el archivo desde el panel **Archivos** (icono de carpeta) y cárguelo con su nombre.
    También puede leerlo directamente desde una URL: `pd.read_csv("https://.../nombrearchivo.csv")`.
