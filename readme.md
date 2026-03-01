# Website SBV – Sächsischer Bogenschützenverband e.V.

Vereinswebsite des Sächsischen Bogenschützenverbands, gebaut mit Eleventy (11ty) und gehostet auf Netlify.

## Abhängigkeiten / Voraussetzungen

### Laufzeitumgebung

- **Node.js** >= 18 (empfohlen: aktuelle LTS-Version)
- **npm** (wird mit Node.js mitgeliefert)

### Hosting-Plattform

- **Netlify** – die Website ist für Netlify konfiguriert (`netlify.toml`)
  - **Netlify Functions** – serverlose Funktionen für Kontaktformular und Gästebuch (`functions/`)
  - **Netlify Redirects** – für den Admin-Bereich (Decap CMS)

### Kern-Abhängigkeiten (npm)

| Paket | Zweck |
|---|---|
| `@11ty/eleventy` ^3.0.0 | Static-Site-Generator |
| `decap-server` ^3.5.2 (dev) | Lokaler CMS-Proxy für Decap CMS |

### Template-Engine

- **Nunjucks (.njk)** – für Layouts, Partials und Seiten
- **Markdown (.md)** – für Inhaltsseiten (News, Vereine, Vorstand, Dokumente)

### Optionale Dienste (Produktion)

- **E-Mail-Dienst** (z.B. SendGrid, Mailgun) – für das Kontaktformular (aktuell nur Logging)
- **Datenbank** (z.B. Netlify Blobs, FaunaDB) – für das Gästebuch (aktuell In-Memory)
- **Decap CMS** (ehemals Netlify CMS) – Admin-Oberfläche zur Inhaltspflege

## Schnellstart

```bash
# Abhängigkeiten installieren
npm install

# Lokalen Entwicklungsserver starten
npm run dev

# Mit lokalem CMS-Backend starten
npm run dev:cms

# Produktions-Build erstellen
npm run build
```
