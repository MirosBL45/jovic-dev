# Bitne stvari

Ovde idu samo ultrakratke teze — jedna odluka ili savet po redu, bez objašnjavanja.

## Blog

- Registracija otvorena za sve: Google i email + lozinka, bez potvrde email-a
- Svrha bloga: regruter proba ceo CRUD na sajtu
- Postovi vlasnika se objavljuju odmah; svi ostali čekaju odobrenje
- Izmena posta ne-admina ponovo čeka odobrenje; do odobrenja post nije na javnom blogu
- Neodobren post se briše — nema statusa „odbijeno"
- Registracija: ime 3–35, lozinka 10–72 karaktera
- Admin sekcija je na vrhu dashboard-a, iznad forme; ceo post se vidi proširivanjem kartice („Show full post")
- Vlasnik posta = `ownerId` (provider + ID naloga), nikad ime ni email
- Admin = `ADMIN_ID` iz env-a (Google nalog vlasnika)
- Admin ne menja tuđe postove — samo odobrava ili briše
- Slug se ne menja posle kreiranja
- Slike: base64 u bazi, max 1 MB po slici, dve po postu
- Obaveštenje o postu na čekanju: EmailJS, isti template kao kontakt forma
- Svi postojeći postovi su vlasnikovi, pisani preko Google naloga

## Baza

- Besplatan Atlas M0 cluster, 512 MB
- Dev baza = isti cluster, druga baza (`<ime>-dev`)
- Vercel Preview koristi dev bazu, Production produkcionu
- Pre svake migracije backup produkcije, pa proba na dev bazi
- U produkciju se ne upisuje bez izričitog odobrenja vlasnika
- `backups/` se nikad ne commit-uje

## Tema

- Prati OS dok se ne klikne toggle
- Toggle ima dva stanja; klik se pamti

## SEO

- `keywords` ostaje kakav je
- `alt` i `title` sa imenom vlasnika su namerni
- Nove title/description tekstove vlasnik odobrava pre upisa
- OG slika iz koda; ako nije kvalitetna, vlasnik je pravi u Figmi
- `sitemap.xml` i `robots.txt` obavezni (Google Search Console)
- Ikonice iz `smal logo svg …` (isti znak kao favicon)
- Naslov taba samo preko `metadata`; `TabTitle` se briše
- `robots` blok iz root layout-a se briše (podrazumevano je isto)

## Alati

- JavaScript ostaje, bez TypeScript-a
- Sve što može je serversko; klijentsko u posebnoj komponenti uvezenoj u serversku
- Dashboard, login i register: serverski `page.jsx` + klijentska komponenta (od 02)
- CSS + SCSS ostaju; vlasnik kompajlira Live Sass Compiler-om
- Claude Code regeneriše `.module.css` sa `npm run sass:file`
- Prettier ne dira generisane `.module.css`
- Testovi (Vitest) gde god ima logike

## Git

- `develop` iz `master`-a; `feature/*` i `fix/*` iz `develop`-a
- `master`, PR-ove i merge radi isključivo vlasnik
- Commit poruke na engleskom, conventional commits

## Ostalo

- CORS header-i na `/api` se uklanjaju — nijedan drugi sajt ne čita API
- next-auth ostaje v4 (podržava Next 16 i React 19)
- Sajt je na engleskom; komunikacija sa vlasnikom na srpskom
