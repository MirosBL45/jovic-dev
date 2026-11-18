# 02 — Zaštita API-ja i vlasništvo postova

## Pregled

Faza 1, fajl 1/2. Zatvara Critical i High propuste iz audita: `POST` i `DELETE` na blog API-ju rade samo za ulogovane, autor se uzima iz sesije, briše se samo svoj post (admin bilo koji), server validira sve, slike su do 1 MB. Uvodi `ownerId` i ulogu admina. Dashboard, login i register usput prelaze na obrazac serverska stranica + klijentska komponenta, a naslov taba dolazi iz `metadata` umesto iz `TabTitle`. Radi se još na Next 14 — `params` čitati na jednom mestu u handler-u, da prelazak na 16 (feature 04) bude što manji.

## Zahtevi

- **authOptions na jednom mestu**: NextAuth konfiguracija iz `src/app/api/auth/[...nextauth]/route.js` prelazi u `src/utils/authOptions.js`, a route je samo uvozi — da bi API rute mogle da pozovu `getServerSession(authOptions)`. Uz taj kod stoje komentari → pitati vlasnika pre premeštanja.
- **ownerId**: u `jwt` callback-u, samo pri prijavi (kad postoji `account`):
  - Google → `google:<account.providerAccountId>`
  - email + lozinka → `credentials:<id korisnika iz baze>`

  `session` callback prenosi `ownerId` i `isAdmin` (`ownerId === process.env.ADMIN_ID`) u `session.user`. `isAdmin` služi samo za UI; API svaki put proverava sam. Izvođenje `ownerId` je čista funkcija u `src/utils/`, sa testom.
- **Stare sesije** bez `ownerId` (ulogovani pre deploy-a) → API vraća 401, a dashboard poruku da se korisnik ponovo uloguje.
- **ADMIN_ID**: u development-u (`NODE_ENV === 'development'`) dashboard prikazuje `ownerId` ulogovanog korisnika, da ga vlasnik prepiše u `.env.local` i na Vercel (Production i Preview) — Claude Code vodi kroz Vercel klik po klik. U produkciji se ne prikazuje.
- **Model Post**: novo polje `ownerId` (String, required, index). `username` ostaje i prikazuje se kao autor („by …"), ali se od sada popunjava iz sesije.
- **Pravila pristupa** — čiste funkcije u `src/utils/` (npr. `postPermissions.js`), sa testovima:
  - pravljenje: ulogovan korisnik sa `ownerId`
  - brisanje: vlasnik posta ili admin
  - lista „moji postovi": ulogovan korisnik, po `ownerId`
- **`POST /api/posts`**:
  - bez sesije → 401
  - `username` i `ownerId` iz sesije; iz body-ja se prihvataju samo polja posta (whitelist), sve ostalo se ignoriše
  - validacija na serveru (vidi dole) → 400 sa porukom šta nije u redu
  - slug: normalizacija (razmaci → `-`, mala slova) i jedinstvenost na serveru — ako postoji, dodaje se broj, isti algoritam kao sada u dashboard-u. Povlačenje svih postova iz browser-a radi provere slug-a (`getAllPostSlugs` u dashboard-u) se uklanja — uz taj kod stoje komentari, pa pitati pre brisanja
  - odgovor 201 sa slug-om koji je stvarno sačuvan
- **`DELETE /api/posts/[slug]`**: bez sesije 401; post ne postoji 404; nije vlasnik ni admin 403; inače briše.
- **`GET /api/posts`**: javna lista ostaje kakva je (do feature-a 05). `?username=` se zamenjuje sa `?mine=1` (samo ulogovan, filtrira po `ownerId` iz sesije); dashboard prelazi na `?mine=1`.
- **Validacija** — jedan modul u `src/utils/` (npr. `postValidation.js`) koji koriste i dashboard (browser) i API (server), sa testovima:
  - dužine iste kao sada u dashboard-u, posle trim-a: title 2–75, headline1/2 2–35, description1/2 2–135, content1/2 2–2000, slug 2–35
  - slika: string `data:image/(png|jpeg|webp|gif);base64,...`, dekodirana veličina ≤ 1 MB; obe slike obavezne
  - sva polja obavezna i moraju biti stringovi
- **Dashboard**:
  - limit slike 2 MB → 1 MB, u proveri i u porukama dva postojeća Popup-a („…smaller than 2MB.")
  - posle `fetch`-a za `POST` i `DELETE` proveriti `res.ok`; ako nije ok → prikazati grešku iz odgovora (postojeći Popup obrazac), forma se NE resetuje i ništa se ne prikazuje kao uspeh
- **Dashboard, login i register po pravilu server/klijent** (odluka vlasnika, coding-standards.md → Next.js): pošto ovaj feature ionako menja te tri stranice, svaka `page.jsx` postaje serverska komponenta, a sadašnji kod prelazi doslovno, sa svim komentarima, u klijentsku komponentu u istom folderu (`DashboardClient.jsx`, `LoginClient.jsx`, `RegisterClient.jsx`). Premeštanje je poseban commit, pre bilo koje izmene logike, da bi se u review-u videlo da je samo premešteno. Zatim:
  - serverske `page.jsx` izvoze `metadata` sa `title` jednakim sadašnjim tekstovima iz `TabTitle` („Dashboard for your blogs", „Login to Dashboard", „Register for using Dashboard"; u feature-u 08 se usklađuju sa title template-om) i `robots: { index: false, follow: false }`
  - `TabTitle` pozivi i `useEffect`-i koji služe samo za njih se brišu, zajedno sa komentarom „// for tab title" iznad njih (odobrio vlasnik); funkcija `TabTitle` u `src/utils/GeneralFunctions.js` posle toga nije u upotrebi i briše se zajedno sa komentarom „// TabTitle" iznad nje
  - serverska login stranica čita `?error=` iz `searchParams` i prosleđuje poruku klijentskoj komponenti kao prop
- **Register** (`/api/auth/register`):
  - validacija na serveru: email (postojeći `isValidEmail`), ime 3–35 karaktera, lozinka 10–72 karaktera (72 je limit bcrypt-a); ista pravila i u formi u browser-u, preko istog modula
  - bcrypt cost 10 (postojeći hash-evi i dalje rade, cost je zapisan u samom hash-u)
  - duplikat email-a ili imena → 409 sa opštom porukom, bez sirovog `error.message`
  - register stranica prikazuje poruku iz odgovora umesto opšte „Something went wrong, there is an error"
- **authorize vraća samo** `{ id, name, email }` (id kao string), nikad ceo Mongoose dokument sa hash-om lozinke.
- **Login**: `authorize` za oba slučaja (nema korisnika, pogrešna lozinka) vraća istu poruku, npr. „Wrong email or password". Login stranica tu poruku prikazuje kad u adresi postoji `?error=` (NextAuth tamo vraća korisnika jer je `pages.error` postavljen na login).
- **Greške u API-ju**: odgovor je JSON `{ error: "..." }` sa tačnim statusom; detalji samo u server log-u.
- **CORS**: iz `next.config.js` se uklanja `headers()` blok za `/api/:path*`. `redirects()` i zakomentarisani kod na vrhu fajla ostaju netaknuti.
- **Migracija** `scripts/migrate-02-owner-id.mjs`: svim postovima bez `ownerId` upisuje `ownerId = ADMIN_ID` (svi postojeći postovi su vlasnikovi, pisani preko Google-a). Obrazac iz coding-standards.md: dry-run, `--apply`, `--target production` sa potvrdom imena baze. Redosled: backup produkcije → nova kopija u dev → migracija na dev → provera lokalno → migracija na produkciji neposredno pre nego što vlasnik merge-uje u `master` (vlasnik pokreće ili izričito odobrava).

## Napomene

- Audit (30.10.2026.): `DELETE` i `POST` su bili potpuno otvoreni; post je bio vezan za ime za prikaz, pa su dva korisnika sa istim imenom „delila" postove; Google korisnici se ne upisuju u kolekciju `users`, pa `ownerId` ne zavisi od te kolekcije.
- Zašto vlasnik nije email: register ne proverava vlasništvo email adrese, pa bi neko mogao da se registruje tuđim Gmail-om i preuzme postove tog Google korisnika.
- Vercel prima body do 4,5 MB; dve slike od 1 MB u base64 su oko 2,7 MB, pa ostaje rezerva za tekst.
- Ne uvoditi biblioteku za validaciju.
- Ovaj feature ne uvodi odobravanje (05) ni izmenu posta (06).

## Odluke vlasnika (04.11.2026.)

1. Registracija: ime 3–35 karaktera, lozinka 10–72 karaktera
2. Tekstovi poruka na sajtu:
   - pogrešan login: „Wrong email or password."
   - zauzet nalog: „An account with this name or email already exists."
   - validacija: „Name must be 3–35 characters.", „Please enter a valid email.", „Password must be 10–72 characters."
   - stara sesija: „Your session has expired. Please log in again."
   - prevelika slika: postojeći tekstovi u dva Popup-a, samo „1MB" umesto „2MB"
   - neuspešno čuvanje: „Something went wrong. Your post was not saved."
   - neuspešno brisanje: „Something went wrong. The post was not deleted."
3. Dashboard, login i register prelaze na serverski `page.jsx` + klijentsku komponentu (pravilo server/klijent)
4. `TabTitle` se briše svuda, zajedno sa komentarima uz njega; naslov taba dolazi iz `metadata`

## Testiranje

1. Vitest: validacija (granične dužine, pogrešan tip slike, slika > 1 MB, polja koja fale), pravila pristupa (vlasnik, admin, tuđ post, bez sesije), izvođenje `ownerId`, jedinstvenost slug-a
2. `curl` bez sesije: `POST /api/posts` i `DELETE /api/posts/<slug>` → 401
3. Test korisnik (email i lozinka, dev baza): pravi post, vidi ga u svojim postovima, briše ga; pokušaj brisanja vlasnikovog posta (`fetch` iz konzole) → 403
4. Vlasnik (Google): briše post test korisnika
5. Post sa dve slike blizu 1 MB prolazi; slika veća od 1 MB se odbija i u browser-u i na serveru; kad server odbije, forma se ne resetuje
6. Login sa pogrešnom lozinkom i sa nepostojećim email-om daje istu poruku; register sa zauzetim email-om daje 409 i čitljivu poruku
7. Migracija na dev: dry-run, pa `--apply`; vlasnik posle prijave vidi sve stare postove u svom dashboard-u
8. Tabovi dashboard, login i register stranica imaju naslov bez `TabTitle`; view source pokazuje `noindex`; poruka za `?error=` se prikazuje na login stranici
9. `npm run test` i `npm run build` prolaze

## Reference

- @context/project-overview.md (poglavlja 8, 9, 10, 13)
- @context/coding-standards.md (Auth i bezbednost, Validacija, Database)
- @context/features/01-dev-okruzenje-i-backup.md
- next-auth v4 dokumentacija (callbacks, `getServerSession`) — proveriti za instaliranu verziju
