# 10 — Performanse i sitnice

## Pregled

Faza 4, fajl 4/4 — kraj plana. Blog stranice čitaju bazu direktno umesto preko HTTP-a ka sopstvenom API-ju, lista bloga ne vuče ceo sadržaj i drugu sliku svakog posta, Mongo konekcija se kešira i ispravljaju se sitnice iz audita.

## Zahtevi

- **Funkcije za podatke** u `src/utils/` (npr. `postsData.js`), zajedničke za API rute i server stranice: lista odobrenih, jedan post po slug-u, moji postovi, postovi na čekanju. API rute postaju tanki omotači oko njih.
- **Server stranice bez HTTP-a**: `src/app/blog/page.jsx` i `src/app/blog/[slug]/page.jsx` pozivaju te funkcije direktno. Dashboard (client) i dalje ide preko API-ja. Ako `BASE_API_URL` / `NEXT_PUBLIC_NAME_OF_LINK` posle toga nigde ne treba → pitati vlasnika pre uklanjanja (i iz `.env.example`, uz podsetnik za Vercel).
- **Lista bloga — samo potrebna polja**: za `/blog` iz baze samo ono što kartica prikazuje (`_id`, `title`, `slug`, `image`, `description1`, `createdAt`), bez `content1/2`, `headline1/2`, `description2` i `imagesecond`.
- **Mongo konekcija**: `src/utils/db.js` kešira konekciju u globalnoj promenljivoj, da se na serverless-u ne otvara nova pri svakom pozivu. Modeli: `mongoose.models.Post || mongoose.model(...)` umesto `mongoose.models = {}` — uz te linije stoje komentari, pa pitati vlasnika pre izmene.
- **`className` bez `undefined` i `false`**: `ImageCard` (`additionalClass` kad nije prosleđen) i Navbar (`&&` uslovi unutar template string-a) — spajanje klasa bez praznih vrednosti.
- **Navbar logout**: `router.asPath` ne postoji u App Router-u — koristiti `pathname` koji komponenta već ima.
- **Poruke ispod formi za login i registraciju** (odluka vlasnika 26.11.2026., iz 04): sada su goli tekst (`{errorMessage}` u `LoginClient.jsx`, `{error}` u `RegisterClient.jsx`) i teško se uočavaju. Treba da budu bold, crvene i malo većeg fonta: nova CSS varijabla za crvenu u `globals.css` (`:root` i `.dark`), `<p>` sa klasom i stil u oba `page.module.scss` (+ regenerisan `.css`). Tačne boje i veličinu fonta vlasnik potvrđuje pre upisa.
- **`layout.js`**: `<Scroll />` iz `<html>` u `<body>`; import `ThemeProvider` preko `@/` aliasa kao ostali (ako je posle 07 i dalje relativan).
- Pre početka proći kroz audit iz History-ja i proveriti šta je već rešeno u ranijim feature-ima; ništa van ove liste bez pitanja.

## Napomene

- Stranice već imaju svoj `<main>`, pa se `<main>` ne dodaje u layout.
- Slike postova ostaju base64 u bazi (odluka vlasnika); izbor polja samo smanjuje koliko se vuče za listu.

## Testiranje

1. Veličina HTML-a za `/blog` pre i posle (npr. `curl -s -o /dev/null -w '%{size_download}\n' http://localhost:3000/blog`), upisana u History
2. Blog lista, post, dashboard (moji, na čekanju), pravljenje, izmena, odobravanje i brisanje rade kao pre
3. U izgrađenom HTML-u nijedan `class` atribut ne sadrži reč `undefined` ni `false`
4. Logout sa dashboard-a vodi na početnu
5. Vitest za nove funkcije sa logikom
6. `npm run lint`, `npm run test`, `npm run build`, `npm run sass:check`, `npm run check:ssr` prolaze

## DoD plana (zbirna provera)

- [ ] Nijedna izmena podataka preko API-ja bez sesije i provere vlasnika ili admina
- [ ] Next 16; `npm audit --omit=dev` bez Critical i High za `next`
- [ ] Odobravanje i izmena rade; regruter može da prođe ceo krug bez vlasnika
- [ ] Server šalje HTML sa sadržajem; tema bez bljeska prati OS
- [ ] Metadata, OG slika, ikonice i fontovi sređeni
- [ ] Testovi, lint i build zeleni

## Reference

- @context/project-overview.md
- @context/current-feature.md (History — audit od 04.11.2026.)
