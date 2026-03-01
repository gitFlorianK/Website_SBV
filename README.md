# Website SBV – Sächsischer Bogenschützenverband e.V.

Offizielle Website des Sächsischen Bogenschützenverbands e.V.

## Tech-Stack

- **Eleventy (11ty) 3.x** – Static Site Generator
- **Nunjucks** – Templates
- **Decap CMS** – Git-basiertes Content Management
- **Netlify** – Hosting, Functions, Identity
- **Vanilla CSS/JS** – Kein Framework

## Entwicklung

```bash
npm install
npm run dev       # Lokaler Entwicklungsserver
npm run build     # Produktions-Build → _site/
```

## Projektstruktur

- `src/` – Quellcode (Templates, CSS, JS, Inhalte)
- `src/content/` – CMS-verwaltete Markdown-Inhalte
- `src/_includes/` – Layouts, Partials, Components
- `src/assets/` – CSS, JS, Bilder, Fonts
- `admin/` – Decap CMS Admin-Panel
- `functions/` – Netlify Serverless Functions
- `_site/` – Build-Output (nicht im Repo)

## CMS

Das CMS ist unter `/admin/` erreichbar (nach Netlify-Deployment).

## Branches

- **main** – Stabiler Produktionsbranch
- **develop** – Entwicklungsbranch für neue Features und Änderungen
