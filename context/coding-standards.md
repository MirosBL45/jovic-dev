# Coding Standards

## JavaScript

- Projekat ostaje JavaScript — ne uvoditi TypeScript ni `.ts`/`.tsx` fajlove
- ES modules (`import`/`export`) u `src/`; `next.config.js` ostaje CommonJS kakav jeste
- Use `const`/`let`, never `var` in new code (postojeći `var` se ne dira ako feature ne menja tu funkciju)
- JSDoc je dozvoljen gde pomaže razumevanju (npr. oblik objekta koji funkcija vraća), nije obavezan

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks
- DRY: Extract reusable code into smaller components when you can
- Try keep components smaller than 150, max 200 lines. When not sure ask me. You shouldn't force it, but rather tear it where it makes sense
- Postojeće velike komponente (npr. `src/app/dashboard/page.jsx`, 481 linija) se ne razbijaju same od sebe; nova funkcionalnost ide u nove, posebne komponente. Ako izdvajanje postojećeg koda znači premeštanje komentara → pitati

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- **Pravilo vlasnika (za sve novo i izmenjeno):** sve što može da bude serversko je serversko. Ono što mora da bude klijentsko ide u posebnu komponentu sa `'use client'`, koja se uvozi u serversku komponentu (stranicu ili layout). `page.jsx` i `layout.jsx` su serverski, da bi mogli da izvezu `metadata`
- Postojeće klijentske stranice (`dashboard`, `dashboard/(auth)/login`, `dashboard/(auth)/register`) se u feature-u 02 prebacuju na ovaj obrazac: `page.jsx` postaje serverski, a sadašnji kod prelazi doslovno, sa svim komentarima, u klijentsku komponentu pored nje (npr. `DashboardClient.jsx`)
- Naslov taba se postavlja isključivo preko `metadata` (`TabTitle` se uklanja u feature-u 02)
- Projekat koristi **Route Handlers** (`src/app/api/...`) za blog i auth, a dashboard ih zove preko `fetch` + SWR. Taj obrazac ostaje; Server Actions se ne uvode ako ih feature ne traži
- Server stranice čitaju podatke direktno iz baze preko funkcija u `src/utils/` (od feature-a 10), ne preko HTTP-a ka sopstvenom API-ju
- Od feature-a 04 (Next 16): `params` i `searchParams` su Promise — uvek `await params`
- Dynamic routes for item/collection pages

## Auth i bezbednost

- U Route Handler-ima sesija se uzima sa `getServerSession(authOptions)` (`authOptions` iz `src/utils/authOptions.js`, od feature-a 02)
- Identitet (`ownerId`, `username`) uvek iz sesije, nikad iz body-ja; iz body-ja se prihvataju samo dozvoljena polja (whitelist)
- Pravila pristupa (ko sme da pravi, menja, briše, odobrava) su čiste funkcije u `src/utils/`, pokrivene testovima, i API ih uvek poziva na serveru
- `isAdmin` u sesiji služi samo za prikaz u UI-ju; API svaki put sam proverava
- Statusi: 400 nevalidan unos, 401 nema sesije, 403 nema prava, 404 ne postoji, 409 duplikat
- Klijentu nikad sirov `error.message` iz baze ili biblioteke; detalji idu u server log

## Validacija

- Bez nove biblioteke za validaciju — čiste funkcije u `src/utils/`, po uzoru na postojeće u `GeneralFunctions.js`
- Isti modul koriste i browser (dashboard) i server (API), da pravila ne mogu da se raziđu
- Server validacija je obavezna i ona je merodavna

## Images (next/image)

- Use `next/image` by default (automatic optimization, lazy loading, layout shift prevention)
- `sizes` obavezno kad slika nije fiksne render veličine — bez `sizes` browser pretpostavlja `100vw` i preuzima nepotrebno veliku sliku
- Slike blog postova su base64 `data:` URL-ovi iz baze; `next/image` ih ne optimizuje i to je očekivano
- `priority` / `preload`: samo za LCP sliku (npr. logo u Navbar-u). Next.js 16 deprecira `priority` u korist `preload` — od feature-a 04 koristiti `preload`
- `alt` i `title` atributi sa imenom vlasnika („… | Miroslav Jovic Frontend Developer") su namerni zbog SEO-a — ne menjati ih i koristiti isti obrazac za nove slike sajta
- SVG logo i ikonice: postojeći obrazac (static import kroz `next/image`) ostaje
- Imena fajlova u `public/` sa razmacima su namerna — ne preimenovati

### Exceptions (plain `<img>` allowed)

- HTML email templates
- Canvas/download generation, third-party libs manipulating raw `<img>`

## Links

- Use `next/link` for internal navigation within the app (client-side routing, prefetch)
- Exceptions (plain `<a>` allowed):
  - External links (different domain) — use `target="_blank" rel="noopener noreferrer"`
  - `tel:`, `mailto:` links
  - Download links (`download` attribute, npr. CV)
  - Intentional full page reload

## Styling — CSS Modules + SCSS

- Svaki stil komponente je `ime.module.scss` sa kompajliranim `ime.module.css` u istom folderu; komponente importuju **`.module.css`**
- Izvor istine je `.module.scss`. Posle izmene `.scss` odmah regenerisati `.css`:
  `npm run sass:file -- src/putanja/ime.module.scss src/putanja/ime.module.css`
- `.module.css` se nikad ne menja ručno i ne regeneriše se ceo `src/` odjednom (Live Sass Compiler i sass CLI se razlikuju u praznim redovima — to bi bio diff bez sadržaja)
- Novi stil = novi par `ime.module.scss` + `ime.module.css`
- Vlasnik i dalje koristi Live Sass Compiler u VS Code-u; oba načina daju isti CSS
- `npm run sass:check` proverava da se svaki par poklapa — pokreće se pre commit-a
- `globals.css` nema SCSS i menja se direktno
- Boje samo preko postojećih CSS varijabli iz `globals.css` (`:root` i `.dark`), ne sirove vrednosti u novom kodu
- Postojeće veličine fonta, radijusi, razmaci i širine su takođe CSS varijable u `:root` — koristiti njih
- No inline styles in new code (postojeći inline stilovi se menjaju samo kad feature to traži)
- Stilovi zavisni od teme idu kroz CSS selektore (`.dark ...`), ne kroz JavaScript (od feature-a 07)

## File Organization

- Pages i layout-i: `src/app/[route]/page.jsx`, `layout.jsx` (root je `layout.js`)
- Route Handlers: `src/app/api/[resource]/route.js`
- Components: postojeća podela — `src/components/PageComponents/`, `UIComponents/`, `CustomInputs/`, `AuthProvider/`; svaka komponenta u svom folderu sa svojim stilom
- Utility i server logika: `src/utils/` (npr. `authOptions.js`, `postValidation.js`, `postPermissions.js`)
- Sadržaj sajta: `src/utils/allData/`
- Modeli: `src/models/`
- Node skripte (baza, migracije, provere): `scripts/`

## Naming

- Component files: PascalCase.jsx, ime fajla = ime komponente (`ImageCard.jsx`)
- Non-component files: camelCase.js, kao postojeći (`constants.js`, `mainPortfolio.js`); postojeći `GeneralFunctions.js` ostaje kako je
- Functions and variables: camelCase
- Constants: SCREAMING_SNAKE_CASE za nove konstante (postojeće ostaju)
- Skripte: kebab-case (`backup-db.mjs`, `migrate-02-owner-id.mjs`)
- Test files: `ime.test.js` pored fajla koji testiraju

## Database (Mongoose)

- Konekcija samo preko `connectToDB` iz `src/utils/db.js`
- Modeli u `src/models/`
- Promena šeme koja traži izmenu postojećih dokumenata = migraciona skripta u `scripts/`:
  - podrazumevano dry-run (ispiše šta bi promenila i koliko dokumenata)
  - upis tek sa `--apply`
  - za produkciju potvrda kucanjem imena baze
  - redosled: backup produkcije → proba na dev bazi → produkcija uz odobrenje vlasnika
- Skripta na početku ispiše na koju bazu ide (ime baze i host, bez korisnika i lozinke)
- Nikad ne pokretati upis na produkcionu bazu bez izričitog odobrenja vlasnika u toj sesiji

## Data Fetching

- Server komponente: direktno iz baze preko funkcija u `src/utils/` (od feature-a 10)
- Client komponente (dashboard): `fetch` ka Route Handler-ima + SWR; posle svakog `fetch`-a proveriti `res.ok` pre nego što se nešto prikaže kao uspeh

## Error Handling

- Route Handler-i vraćaju JSON `{ error: "..." }` sa tačnim statusom
- U UI-ju poruke za korisnika (na engleskom) kroz postojeće obrasce (`Popup`, tekst ispod forme)
- Neuspela sporedna radnja (npr. EmailJS obaveštenje) ne sme da obori glavnu radnju — samo log

## Testing

- Vitest for unit tests (utilities, validation, permissions, server logic — not components)
- Test files live next to source files: `ime.test.js`
- Run tests: `npm run test` (single run) or `npm run test:watch` (watch mode)
- Use `vi.mock()` for external dependencies (Mongoose, next-auth, EmailJS)
- Use `vi.useFakeTimers()` for time-dependent logic
- Logika koja treba da se testira izvlači se iz Route Handler-a u čiste funkcije u `src/utils/`

## Formatting

- Prettier (od feature-a 00), konfiguracija u `.prettierrc`; `.editorconfig` za editor
- Generisani `.module.css` su u `.prettierignore` — Prettier ih ne dira
- Ne formatirati fajlove van feature-a posle formatirajućeg commit-a iz 00 — svaki feature formatira samo ono što menja

## Code Quality

- Ne dirati postojeće komentare (ni tekst, ni mesto) bez odobrenja vlasnika
- No new commented-out code; postojeći zakomentarisani kod ostaje
- No unused imports or variables in new code
- Keep functions under 50 lines when possible

## Documentation

- Whenever you add something that changes how the project is developed or maintained (new commands, scripts, setup steps, infrastructure, deployment process, database workflow, authentication, etc.), consider whether the `README.md` should also be updated.

- The goal is to keep the `README.md` as the single source of truth for developer onboarding and project setup.
