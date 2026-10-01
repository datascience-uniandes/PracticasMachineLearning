# Prácticas de Machine Learning — Ciencia de Datos

Sitio de talleres prácticos (Python, scikit-learn, Keras) construido con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) y publicado en GitHub Pages.

## Estructura

```
docs/
  index.md          Inicio
  practica-1.md … practica-5.md
  glosario.md       Términos y fragmentos de ayuda
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
