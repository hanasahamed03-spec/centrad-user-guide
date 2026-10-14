# Centrad User Guide (source)

Online help for the Centrad portal, written in Markdown and built with MkDocs (Material theme).

## Preview locally
```
pip install -r requirements.txt
mkdocs serve
```
Open http://127.0.0.1:8000

## Build the static site
```
mkdocs build
```
The finished site is written to `site/` (do not commit it).

## Adding a page
1. Create a `.md` file under `docs/` using `docs/_template.md.txt` as a guide.
2. Add it to `nav:` in `mkdocs.yml`.
3. Screenshots go in `docs/assets/img/`.

File and folder names become the page address, so keep them short, lowercase and hyphenated.
