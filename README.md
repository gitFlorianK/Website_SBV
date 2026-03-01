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
npm run dev       # Lokaler Entwicklungsserver (http://localhost:8080)
npm run build     # Produktions-Build → _site/
npm run clean     # Build-Output löschen
```

### CMS lokal nutzen

Damit das Decap CMS lokal auf Dateien zugreifen kann, muss zusätzlich der Decap-Proxy-Server laufen:

```bash
npm run cms       # Startet nur den CMS-Proxy-Server (Port 8081)
npm run dev:cms   # Startet Website + CMS-Proxy gleichzeitig
```

Das CMS ist dann unter http://localhost:8080/admin/ erreichbar.

## Projektstruktur

- `src/` – Quellcode (Templates, CSS, JS, Inhalte)
- `src/content/` – CMS-verwaltete Markdown-Inhalte
- `src/_includes/` – Layouts, Partials, Components
- `src/assets/` – CSS, JS, Bilder, Fonts
- `admin/` – Decap CMS Admin-Panel
- `functions/` – Netlify Serverless Functions
- `_site/` – Build-Output (nicht im Repo)

## CMS

- **Lokal:** http://localhost:8080/admin/ (mit `npm run dev:cms`)
- **Produktion:** `/admin/` (nach Netlify-Deployment)

## Branches

- **main** – Stabiler Produktionsbranch
- **develop** – Entwicklungsbranch für neue Features und Änderungen
