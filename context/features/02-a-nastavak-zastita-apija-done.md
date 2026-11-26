# 02-a — Nastavak: Zaštita API-ja i vlasništvo postova

## Pregled

Nastavak feature-a 02 (@context/features/02-zastita-api-ja.md). Rad je stao 21.11.2026. uveče: kod je napisan, a ostali su koraci koje radi vlasnik (env, baza, ručni testovi), odgovori na otvorena pitanja, Vercel i završetak feature-a. Zahtevi i odluke su u 02 i u @context/current-feature.md (Goals i Notes) — ovde je samo stanje i šta je ostalo.

## Stanje na kraju sesije (21.11.2026.)

1. Grana: `feature/zastita-api-ja` (iz `develop`-a), lokalna, nije push-ovana
2. Commit `9db02ab` — `refactor: move dashboard, login and register pages into client components` (samo doslovno premeštanje; provereno da su `DashboardClient.jsx`, `LoginClient.jsx` i `RegisterClient.jsx` bajt po bajt isti kao stari `page.jsx`)
3. Sva logika feature-a je napisana, ali NIJE commit-ovana (čeka ručne testove):
   1. `src/utils/`: `authOptions.js`, `ownerId.js`, `postPermissions.js`, `postValidation.js`, `slug.js`, `registerValidation.js`, `readErrorMessage.js`, `messages.js` i testovi uz njih
   2. API: `api/auth/[...nextauth]/route.js`, `api/auth/register/route.js`, `api/posts/route.js`, `api/posts/[slug]/route.js`
   3. Stranice: serverski `page.jsx` sa `metadata` i `robots: noindex` za dashboard, login i register; izmene u tri klijentske komponente; `TabTitle` obrisan svuda
   4. Komponenta `src/components/UIComponents/DevOwnerId/` (prikaz `ownerId` samo u development-u, na dnu dashboard-a)
   5. `models/Post.js` (`ownerId`), `next.config.js` (bez CORS `headers()`), `.env.example` (`ADMIN_ID`), README (sekcija „Auth and post ownership" i komanda `db:migrate-02`)
   6. Skripte: `scripts/migrate-02-owner-id.mjs`, `scripts/lib/confirm.mjs` (premešten `confirmByTyping` iz `restore-db.mjs`), `isValidAdminId` i `POSTS_WITHOUT_OWNER` u `scripts/lib/db-utils.mjs`, npm skripta `db:migrate-02`
4. Necommit-ovane su i izmene u `context/` (preimenovan 01 u `-done`, izmenjen 02, `current-feature.md`, ovaj fajl) — vlasnik ih commit-uje ručno
5. Prošlo: `npm run test` (71 test), `npm run sass:check`, `npm run format:check`, `npm run build` (sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build`, do feature-a 10)
6. Prošlo `curl`-om bez sesije na localhost-u: `POST /api/posts`, `DELETE /api/posts/dark-mode` i `GET /api/posts?mine=1` → 401; register sa kratkom lozinkom → 400 sa porukom; `/api` bez CORS header-a; login stranica ima naslov „Login to Dashboard", `noindex, nofollow` i poruku za `?error=`
7. Baza: ništa nije menjano ni u dev ni u produkciji; `ADMIN_ID` još ne postoji ni lokalno ni na Vercel-u

## Koraci za nastavak (redom)

1. **`ADMIN_ID` lokalno** (vlasnik):
   1. `npm run dev`, otvoriti http://localhost:3000/dashboard, ulogovan preko Google-a
   2. Stara sesija nema `ownerId` → Popup „Your session has expired. Please log in again." → klik „All right" → ponovo login preko Google-a (ovo je ujedno test starih sesija)
   3. Na dnu dashboard-a: „Your ownerId (development only, for ADMIN_ID): google:…" → u `.env.local` dodati red `ADMIN_ID=` i posle `=` upisati tu vrednost (ne lepiti u chat)
   4. Restartovati dev server i javiti Claude Code-u da je upisano
2. **Backup produkcije i nova kopija u dev** (vlasnik, u terminalu):
   1. `npm run db:backup -- --source production` (samo čitanje)
   2. `npm run db:restore -- --from backups/<novi folder> --target dev --apply --drop` → ukucati `jovicData-dev` (briše dev bazu, i test korisnika)
3. **Migracija na dev**:
   1. `npm run db:migrate-02 -- --target dev` → dry-run, treba da prikaže 16 postova bez vlasnika
   2. `npm run db:migrate-02 -- --target dev --apply`
   3. Dashboard vlasnika posle toga prikazuje svih 16 postova
4. **Ručni testovi na localhost-u** (Testiranje 3–8 iz 02):
   1. Novi test korisnik (register email + lozinka): pravi post, vidi ga u svojim postovima, briše ga
   2. Test korisnik pokušava da obriše vlasnikov post iz konzole → 403: `fetch("/api/posts/dark-mode", { method: "DELETE" }).then(r => r.status)`
   3. Vlasnik (Google) briše post test korisnika
   4. Post sa dve slike blizu 1 MB prolazi; slika veća od 1 MB se odbija u browser-u; kad server odbije post, forma se ne resetuje
   5. Login sa pogrešnom lozinkom i sa nepostojećim email-om → ista poruka „Wrong email or password."
   6. Register sa zauzetim email-om → „An account with this name or email already exists."
   7. Tabovi dashboard, login i register imaju naslov iz `metadata`; view source pokazuje `noindex`
5. **Odgovori vlasnika na otvorena pitanja** (vidi ispod) i eventualne izmene po njima; posle izmena ponovo `npm run test`, `npm run sass:check`, `npm run format:check` i build
6. **Commit logike** (uz dozvolu vlasnika), npr. `feat: protect blog API with session, ownerId and server validation`; context fajlove vlasnik commit-uje sam
7. **Vercel i rotacija tajni** (odluka vlasnika iz 01, klik po klik, uz proveru aktuelnog UI-ja u dokumentaciji):
   1. `ADMIN_ID` za Production i Preview
   2. Rotacija `MONGO_URL` (nova lozinka database korisnika u Atlas-u → oba reda `MONGO_URL` na Vercel-u + lokalni `MONGO_URL` i `MONGO_URL_PRODUCTION`), `GOOGLE_CLIENT_SECRET` (Google Cloud Console) i `NEXTAUTH_SECRET` (nova vrednost, lokalno i na Vercel-u)
   3. Sve tri ponovo dodate kao Sensitive (Secret)
8. **Push grane**, vlasnik pravi PR ka `develop`-u
9. **Migracija na produkciji** neposredno pre nego što vlasnik merge-uje u `master`: novi backup produkcije, pa `npm run db:migrate-02 -- --target production` (dry-run), pa sa `--apply` i kucanjem `jovicData` — pokreće vlasnik ili izričito odobrava; zatim redeploy produkcije
10. **Complete**: status i History u `current-feature.md`

## Otvorena pitanja za vlasnika (odluke koje je Claude Code doneo sam)

1. Nove poruke van odobrene liste: validacija posta („All fields are required.", „Main Title must be 2–75 characters." i isto za ostala polja, „The first image must be a PNG, JPEG, WebP or GIF image."), „This post does not exist." (404), „You can only delete your own posts." (403) — da li ostaju?
2. Sa CORS `headers()` blokom u `next.config.js` obrisan je i komentar `// matching all API routes` koji je bio unutar bloka — potvrditi
3. U `DashboardClient.jsx` postojeći blok za proveru dužina (sa komentarom `// Error message if input is out of range`) je ostao, a posle njega se poziva `validatePost`, pa su brojevi za dužine na dva mesta. Da li da se blok zameni modulom (briše se kod uz komentar)?
4. Login: svaki `?error=` prikazuje „Wrong email or password." (doslovno po specifikaciji), pa i retka Google greška; tekst iz adrese se nikad ne prikazuje — u redu?
5. Javni `GET /api/posts` i `GET /api/posts/[slug]` sada vraćaju i `ownerId` (lista ostaje kakva je do 05). Rizik je mali, ali može da se sakrije jednim `.select("-ownerId")` — da li sakriti?
6. Register čuva ime i email bez razmaka na početku i kraju — u redu?

## Reference

- @context/features/02-zastita-api-ja.md
- @context/current-feature.md (Goals i Notes za 02)
- @context/coding-standards.md (Auth i bezbednost, Validacija, Database)
- @context/features/01-dev-okruzenje-i-backup-done.md
