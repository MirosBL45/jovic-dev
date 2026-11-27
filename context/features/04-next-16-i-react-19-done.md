# 04 — Next.js 16 i React 19

## Pregled

Faza 2, jedini fajl. Prelazak sa Next 14.2.35 na aktuelni Next 16 i React 19, da projekat ponovo bude na podržanoj verziji (14.x je end of life od 26.10.2025). Ponašanje i izgled sajta ostaju isti. Sav kasniji kod (05–10) piše se već za Next 16.

## Zahtevi

- **Node**: lokalno ≥ 20.9 (provereno u 00). Na Vercel-u voditi vlasnika da proveri Node.js verziju projekta i postavi verziju koju traži aktuelni Next 16 — klik po klik, po aktuelnom Vercel UI-ju.
- **Pre upgrade-a**: pročitati zvanični vodič za verziju 16 i delove vodiča za 15 koji važe pri skoku sa 14 (async Request APIs, caching). Posle instalacije čitati dokumentaciju iz `node_modules/next/dist/docs/` ako postoji.
- **Upgrade**: zvanični codemod (`npx @next/codemod@canary upgrade latest`) ili ručno `next@latest react@latest react-dom@latest eslint-config-next@latest`. Pregledati svaki fajl koji codemod promeni; izmene komentara nisu dozvoljene.
- **Async params** (`await params`): `src/app/blog/[slug]/page.jsx` (`generateMetadata` i stranica), `src/app/portfolio/[category]/page.jsx`, `src/app/api/posts/[slug]/route.js` (svi handler-i).
- **next/image**: `priority` → `preload` (logo u Navbar-u). Proveriti nova podrazumevana ponašanja (`images.qualities`, `localPatterns` za lokalne slike sa query string-om, cache TTL), slike sa razmacima u imenu fajla i `data:` (base64) slike na blogu i u dashboard-u.
- **ESLint**: Next 16 nema `next lint`. Postaviti `eslint` + `eslint.config.mjs` (flat config) sa `eslint-config-next` i `eslint-config-prettier`; skripta `"lint": "eslint ."`. Popraviti samo ono što ESLint prijavi kao error; warning-e popisati u izveštaju i pitati vlasnika šta se rešava. Dopuniti `.vscode/settings.json` ESLint ključevima kao u camera-motion (`"editor.codeActionsOnSave": { "source.fixAll.eslint": "always" }`, `"eslint.useFlatConfig": true`, `"eslint.validate": ["javascript", "javascriptreact"]`).
- **Turbopack**: Next 16 ga koristi podrazumevano; ako dev ili build prave problem, privremeno `--webpack` i pitati vlasnika.
- **next-auth v4** ostaje (4.24.15 u `peerDependencies` ima `next ^16` i `react ^19`). Proveriti `getServerSession` u Route Handler-ima i ceo login/logout tok.
- **Ostale zavisnosti**: proveriti `peerDependencies` za React 19 (`swr`, `react-icons`, `@emailjs/browser`) i podići u okviru major verzija ako treba. `mongoose` ostaje 6.x.
- **AGENTS.md**: `next dev` u Next 16 može sam da doda blok „nextjs-agent-rules" na vrh `AGENTS.md` — zadržati ga i commit-ovati (isto kao u camera-motion).
- **README**: ažurirati verzije i komande (lint).

## Napomene

- `npm audit --omit=dev` posle upgrade-a — broj upisati u History; cilj je da `next` nema poznatih advisory-ja.
- Middleware ne postoji, pa preimenovanje `middleware` → `proxy` ne pogađa projekat.
- Ne refaktorisati ništa što upgrade ne traži; problem nađen usput zabeležiti i pitati.

## Testiranje

1. `npm run lint`, `npm run test` i `npm run build` prolaze
2. Ručno lokalno (dev baza): početna sa svim sekcijama, portfolio i sve tri kategorije, blog lista i post, kontakt slanje, 404 stranica (odbrojavanje i redirect), stari blog slug-ovi sa `_` preusmeravaju na nove, login Google i email + lozinka, logout, dashboard pravljenje i brisanje test posta, oba moda teme
3. Preview deployment sa `develop`-a prolazi build na Vercel-u

## Reference

- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://nextjs.org/docs/app/guides/upgrading/version-15
- @context/features/03-patch-verzije-done.md
