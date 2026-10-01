# Prácticas de Machine Learning — Ciencia de Datos

Sitio de talleres prácticos (Python, scikit-learn, Keras) construido con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) y publicado en GitHub Pages.

## Estructura

```
docs/
  index.md          Inicio
  talleres/         Prácticas (practica-1/ con una página por actividad)
  ayudas/           Ayudas genéricas con código
  datos/            Conjuntos de datos (CSV y diccionario)
  glosario.md       Términos de las prácticas
  assets/img/       Imágenes de los ejemplos
mkdocs.yml          Configuración y navegación
```

## Vista previa local

```bash
pip install -r requirements.txt
mkdocs serve
```

## Publicación

Cada push a `main` publica el sitio con GitHub Actions. Activar una vez en
**Settings → Pages → Build and deployment → Source: GitHub Actions**.
