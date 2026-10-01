# Cargar un dataset

Los archivos `.csv` se cargan con `pandas.read_csv`, que devuelve un `DataFrame`.

```python
import pandas as pd

df = pd.read_csv("forestfires.csv")  # ajuste la ruta si el archivo está en otra carpeta
df.head()                            # primeras 5 filas
```

!!! tip "En Google Colab"
    Suba el archivo desde el panel **Archivos** (icono de carpeta) o cárguelo directamente desde una URL:

    ```python
    df = pd.read_csv("https://<url-del-archivo>/forestfires.csv")
    ```
