# Futuro del Welfare — prototipo Tundr × Generali

Prototipo mobile standalone dell'app Welfare per dipendenti Generali.
React + Vite, single-file build, token del Design System Tundr (mode employee/mobile).

Su desktop l'app gira dentro un mockup smartphone; su mobile (≤480px) va full-bleed.

## Sviluppo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # output in dist/ (single file, tutto inline)
npm run preview    # anteprima del build
```

## Deploy — Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Framework preset:** nessuno (Vite)

Il build usa `vite-plugin-singlefile`: l'intera app finisce in `dist/index.html`
(JS e CSS inline), servibile come sito statico.

## Note

- I token del DS sono già generati in `src/kit/styles/tokens.css`. Per rigenerarli
  serve il file sorgente dei token (fuori dal repo): `npm run tokens`.
- La schermata Fringe carica la lista brand a runtime dal foglio Google (endpoint
  gviz) e i loghi dal CDN Tundr: nessun dato brand è hardcoded nel repo.
- Le immagini dei merchant Go Flex sono linkate da Unsplash; la mappa usa tile CartoDB.
