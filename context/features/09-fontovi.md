# 09 — Fontovi preko next/font

## Pregled

Faza 4, fajl 3/4. Google Fonts se sada učitavaju preko dva `@import url(...)` reda na vrhu `globals.css`, što blokira prvi prikaz, a Poppins se povlači u 18 varijanti. Prelazak na `next/font/google`: fontovi se serviraju sa sajta, samo težine koje se koriste, bez promene izgleda.

## Zahtevi

- `next/font/google` u root layout-u: **Lexend** (varijabilni font; naslovi h1–h3) i **Poppins** (tekst), sa `display: 'swap'`
- Subsets `latin` i `latin-ext` — tekst sadrži ć, č, š, ž, đ (npr. „Jović")
- Poppins samo u težinama koje se stvarno koriste: po auditu 300, 400, 500 i `bold` (700), bez italic-a. Pre implementacije ponovo proveriti grep-om kroz `globals.css` i sve `.module.scss`
- Fontovi preko CSS varijabli (npr. `--font-lexend`, `--font-poppins`) na `<html>`; `font-family` u `globals.css` koristi te varijable uz postojeće fallback-ove; oba `@import url(...)` reda se uklanjaju
- Ako neki `.module.scss` direktno navodi „Poppins" ili „Lexend" → prebaciti na varijablu i regenerisati `.css` (`sass:file`)

## Napomene

- Tekst mora izgledati isto kao pre — ako se primeti razlika (npr. težina koja fali), stati i pitati.

## Testiranje

1. Network tab: nema zahteva ka `fonts.googleapis.com` ni `fonts.gstatic.com`; fontovi stižu sa `/_next/static/media/`
2. Vizuelno poređenje početne, portfolija i bloga pre i posle, u oba moda; slova ć, č, š, ž, đ izgledaju kao ostatak teksta
3. `npm run lint`, `npm run test`, `npm run build`, `npm run sass:check` prolaze

## Reference

- https://nextjs.org/docs/app/getting-started/fonts
