# 03 — Patch verzije unutar istih major verzija

## Pregled

Faza 1, fajl 2/2. Zakrpe bez promene major verzija, kao kratak međukorak pre Next 16: `next` i `eslint-config-next` 14.0.0 → 14.2.35 (poslednja 14.x), `next-auth` → 4.24.15, `mongoose` 6.11.1 → 6.13.12 (zatvara prototype pollution i search injection advisories).

## Zahtevi

- `npm audit --omit=dev` pre i posle; brojeve upisati u Notes i u History. Stanje iz audita 30.10.2026: 31 advisory — 4 Critical, 4 High, 20 Moderate, 3 Low.
- Instalirati tačne verzije: `next@14.2.35`, `eslint-config-next@14.2.35`, `next-auth@4.24.15`, `mongoose@6.13.12`. `swr` i `react-icons` na najnoviju verziju u okviru iste major verzije (`npm outdated` → kolona Wanted).
- Ne menjati major verzije (Next 16 je feature 04) i ne pokretati `npm audit fix --force`.
- Pregledati release notes za `next` 14.1 i 14.2 i CHANGELOG za `mongoose` 6.11 → 6.13; ako neka izmena ponašanja pogađa ovaj projekat → pitati.

## Napomene

- Posle 14.2.35 ostaje oko 23 advisory-ja za `next` koji su zakrpljeni tek u 15.5.x i novijim — očekivano, zatvara ih feature 04.
- `mongoose.models = {}` u modelima ostaje do feature-a 10.

## Testiranje

1. Ručno lokalno, na dev bazi: početna, portfolio i sve tri kategorije, blog lista i jedan post, kontakt forma (slanje), login obe vrste, logout, dashboard (pravljenje i brisanje test posta)
2. `npm audit --omit=dev` — brojevi upisani
3. `npm run test` i `npm run build` prolaze

## Reference

- @context/features/02-zastita-api-ja-done.md
- Next.js 14.1 i 14.2 release notes; mongoose CHANGELOG (6.x)
