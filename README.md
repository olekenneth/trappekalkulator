# Trappekalkulator / Stair Calculator

En kalkulator for trappegeometri basert på Pythagoras' teorem. Beregn trappedimensjoner fra trappevange og vinkel.

A staircase geometry calculator based on the Pythagorean theorem. Calculate stair dimensions from stringer length and angle.

## Features

- **Enkel modus**: Oppgi trappevange (C) og stigningsvinkel (∠A)
- **Avansert modus**: Juster totalhøyde (B) eller totallengde (A) direkte
- **Live beregning**: Alle verdier oppdateres automatisk
- **TEK17-validering**: Sjekk mot norske byggeregler
- **Visuell diagram**: SVG-tegning av trappen med målkoteringer og trinn
- **Flerspråklig**: Automatisk språkdeteksjon (norsk/engelsk) basert på browser-språk
- **Enhetsbytte**: Velg mellom cm eller mm
- **URL-state**: All state lagres i URL for deling
- **Print-støtte**: Dedikert print-layout med alle detaljer, stort diagram, og input-verdier

### Print-funksjon

Når du printer (Cmd/Ctrl+P eller bruk Print-knappen):
- Viser header med tittel og dato
- Oppsummering av alle input-verdier
- Stort SVG-diagram (15cm høyt)
- Alle beregnede resultater
- TEK17-validering
- Footer med URL
- Optimalisert layout for A4-papir

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Vanilla CSS** - Styling
- **Client-side only** - Ingen backend

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Åpner på `http://localhost:5173`

### Build

```bash
npm run build
```

Output i `dist/` mappen.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Cloudflare Pages

1. **Via GitHub Integration:**
   - Koble GitHub repo til Cloudflare Pages
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Auto-deploy ved push til main

2. **Via Wrangler CLI:**
   ```bash
   npm install -g wrangler
   wrangler pages deploy dist
   ```

### GitHub Pages

1. **Opprett workflow-fil** `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. **Aktiver GitHub Pages:**
   - Gå til Settings → Pages
   - Source: GitHub Actions
   - Push til main → auto-deploy

## URL State Format

All state lagres i URL query parameters:

```
?c=330&a=30&steps=10&unit=cm&advanced=true&height=265&length=286
```

### Parameters:

- `c` - Trappevange/hypotenuse i cm
- `a` - Stigningsvinkel i grader
- `steps` - Antall trinn
- `unit` - Enhet: `cm` eller `mm`
- `advanced` - Avansert modus: `true` eller `false`
- `height` - Totalhøyde (kun i avansert modus)
- `length` - Totallengde (kun i avansert modus)

## Beregninger

### Fra C og ∠A (default):
```
B (høyde) = C × sin(∠A)
A (lengde) = C × cos(∠A)
∠C = 90° - ∠A
```

### Fra B og ∠A (avansert):
```
C = B / sin(∠A)
A = B / tan(∠A)
```

### Fra A og ∠A (avansert):
```
C = A / cos(∠A)
B = A × tan(∠A)
```

### Trinn:
```
Stigehøyde per trinn = B / antall trinn
Innsteg per trinn = A / antall trinn
```

## TEK17 Krav

Norske byggeregler (TEK17):
- **Stigehøyde**: 170-210 mm
- **Innsteg**: Minimum 250 mm

## Project Structure

```
src/
├── components/
│   ├── InputForm.jsx          # Input fields
│   ├── StairDiagram.jsx       # SVG visualization
│   ├── Results.jsx            # Calculated results
│   ├── ValidationWarning.jsx  # TEK17 validation
│   └── UnitToggle.jsx         # cm/mm toggle
├── hooks/
│   ├── useUrlState.js         # URL state management
│   └── useLanguage.js         # Browser language detection
├── utils/
│   ├── calculations.js        # Pythagoras calculations
│   ├── validation.js          # TEK17 validation
│   └── i18n.js                # Translations (no/en)
├── App.jsx                    # Main app component
└── App.css                    # Styling + print styles
```

## Browser Support

Moderne browsers med ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Domains

- **trappekalkulator.no** - Norsk versjon
- **staircalc.com** - Engelsk versjon

(Språk auto-detekteres fra browser)

## Recent Fixes

### Version 1.3
- ✅ **Trappetrinn-retning**: Trinnene starter nå fra høyre hjørne (∠C) og går oppover mot venstre hjørne (toppen), som matcher faktisk trappegeometri

### Version 1.2
- ✅ **Trappetrinn-orientering**: Trinnene tegnes nå på oversiden av hypotenusen (C) i stedet for inni trekanten, som viser den faktiske trappeformen bedre

### Version 1.1
- ✅ **SVG scaling**: Diagrammet fyller nå hele tilgjengelige området
- ✅ **Unit conversion**: Step details viser nå korrekte verdier (konvertert fra mm)
- ✅ **Print layout**: Komplett redesign med:
  - Header med tittel og dato
  - Input-verdier oppsummert
  - Stort 15cm høyt diagram
  - Alle resultater og validering
  - Footer med URL
- ✅ **Language detection**: Umiddelbar deteksjon ved app-start (ingen flash av feil språk)
