# jovic-dev — lični portfolio sajt (miroslavjovic.com)

Ovaj dokument je centralni izvor istine za arhitekturu, konvencije i pravila projekta. Feature fajlovi u `context/features/` referišu poglavlja odavde umesto da ih ponavljaju. Za IZGLED je izvor istine postojeći sajt: ništa se vizuelno ne menja ako to feature fajl izričito ne traži.

## 1. O projektu i cilj

Prezentacioni sajt vlasnika (frontend developer) sa što više njegovih radova: portfolio po kategorijama, o meni, tehnologije, kontakt, CV za preuzimanje.

Sada je cilj da se uradi dorada projekta, da projekat bude bolji, stabilniji, sigurniji i sve što može u sadašnjem smislu novih tehnologija.

Blog postoji kao živa demonstracija CRUD-a, baze i backend-a: regruter treba da može da se registruje, napravi post, vidi ga u svom dashboard-u, izmeni ga i obriše, i tako se uveri da sve radi. Registracija je zato namerno otvorena za sve. Na javni blog ide samo ono što vlasnik odobri (poglavlje 10).

Projekat je pravljen ručno od oktobra 2023, pre rada sa AI alatima. Od novembra 2026. se sređuje feature po feature, po planu iz poglavlja 15.

Programer će u folderu `context/features` povremeno menjati nazive fajlova tako što će na kraju svakog fajla da doda `-done`, to je da ti znaš da ne pitaš za te promene. Shodno tome, u tim fajlovima će menjati Reference po potrebi, ali neće to raditi u sred seanse, već ili na početku ili na kraju da te ne bi zbunilo na pola rada.

## 2. Vlasnik i kontekst

- Vlasnik: Miroslav Jović, frontend developer
- Domen: miroslavjovic.com; sajt se koristi i kao potpis/credit link u drugim projektima vlasnika
- Jezik sajta: engleski (sav vidljivi tekst, poruke o greškama, metadata)
- Google Search Console verifikacija postoji (`verification.google` u root layout-u) i ostaje
- Repo je javan na GitHub-u (MirosBL45/jovic-dev) — sve što se commit-uje vidi svako, uključujući regrutere

## 3. Tehnologije

| Sloj | Izbor |
|---|---|
| Framework | Next.js App Router — 14.0.0, posle feature-a 03 14.2.35, posle feature-a 04 aktuelni 16 |
| React | 18, posle feature-a 04 React 19 |
| Jezik | JavaScript (ostaje JavaScript, bez TypeScript-a) |
| Stilovi | CSS Modules; izvor je `.module.scss`, a `.module.css` pored njega se kompajlira (poglavlje 5) |
| Baza | MongoDB Atlas, besplatan M0 cluster (512 MB), Mongoose 6 |
| Auth | next-auth v4: Google i Credentials (email + lozinka, bcryptjs) |
| Client fetch | SWR (dashboard) |
| Email | EmailJS iz browser-a (`@emailjs/browser`): kontakt forma i obaveštenja o postovima na čekanju |
| Ikonice | react-icons |
| Testovi | Vitest (od feature-a 00) |
| Format | Prettier + `.editorconfig` (od feature-a 00) |
| Lint | ESLint flat config sa `eslint-config-next` (od feature-a 04) |
| Deploy | Vercel: `master` = Production, ostale grane = Preview |
| Package manager | npm |

Pre implementacije svakog sloja proveriti aktuelnu dokumentaciju (verzije se menjaju).

## 4. Principi implementacije

1. **Feature po feature** — ne gradi se ništa što nije eksplicitno traženo u toj sesiji
2. Postojeći izgled je izvor istine; vizuelne izmene samo kad ih feature traži
3. Ne dirati postojeće komentare u kodu; ako izmena traži brisanje ili premeštanje koda uz koji stoji komentar → pitati vlasnika
4. Sve što može da bude serversko je serversko; ono što mora da bude klijentsko ide u posebnu `"use client"` komponentu koja se uvozi u serversku (pravilo vlasnika, važi za sve novo i izmenjeno)
5. Identitet i prava korisnika se proveravaju na serveru, iz sesije; body request-a nikad ne određuje ko je autor ili vlasnik
6. Validacija na serveru je obavezna; validacija u browser-u je samo za korisnika
7. Env kredencijali samo server-side; ništa osetljivo pod `NEXT_PUBLIC_`
8. Produkciona baza: nikakav upis bez izričitog odobrenja vlasnika; pre migracije backup, pa proba na dev bazi
9. Testovi za svu logiku koja može da se testira (validacija, pravila pristupa, utility funkcije)
10. Posle svakog feature-a `npm run test` i `npm run build` moraju proći (od 04 i `npm run lint`)

## 5. Struktura foldera

```
src/
  app/                      # App Router: stranice, layout-i, API rute
    api/auth/[...nextauth]/ # NextAuth
    api/auth/register/      # registracija (Credentials)
    api/posts/              # lista i pravljenje postova
    api/posts/[slug]/       # jedan post: čitanje, brisanje (kasnije izmena i odobravanje)
    blog/, portfolio/, contact/, privacy/, terms/, dashboard/
    globals.css             # globalni stilovi i CSS varijable teme (nema SCSS)
  components/
    PageComponents/         # navbar, footer, sekcije početne strane
    UIComponents/           # kartice, popup-ovi, spinner, toggle teme, scroll
    CustomInputs/           # dugmad, password input
    AuthProvider/           # SessionProvider omotač
  context/ThemeContext.js   # tema (menja se u feature-u 07)
  models/                   # Mongoose modeli: Post, User
  utils/
    allData/                # sadržaj sajta: portfolio, tehnologije, about, linkovi, pravne stranice
    GeneralFunctions.js     # utility funkcije
    constants.js            # env konstante
    db.js                   # konekcija na MongoDB
public/                     # slike, logo, CV (imena fajlova sa razmacima su namerna)
scripts/                    # Node skripte za bazu, migracije i provere (od feature-a 00/01)
context/                    # ova dokumentacija
```

Stilovi: svaki `ime.module.scss` ima kompajlirani `ime.module.css` u istom folderu, a komponente importuju `.module.css`. Vlasnik kompajlira preko Live Sass Compiler-a u VS Code-u i tako ostaje. Claude Code posle izmene `.scss` regeneriše `.css` sa `npm run sass:file` (poglavlje 5 u coding-standards.md). SCSS partial-a i `@use`/`@import` nema.

## 6. Rute

| Ruta | Opis |
|---|---|
| `/` | početna: landing, portfolio izbor, about, tehnologije, kontakt |
| `/portfolio` | izbor kategorije |
| `/portfolio/[category]` | `apps`, `games`, `websites` (podaci iz `utils/allData/mainPortfolio.js`) |
| `/blog` | lista odobrenih postova |
| `/blog/[slug]` | jedan post |
| `/contact` | kontakt forma (EmailJS) |
| `/privacy`, `/terms` | pravne stranice |
| `/dashboard` | pravljenje i upravljanje postovima (samo ulogovani); za admina i postovi na čekanju (od 05) |
| `/dashboard/login`, `/dashboard/register` | prijava i registracija |

Redirect-i starih blog slug-ova (`_` → `-`) su u `next.config.js` i ostaju.

## 7. Podaci u repou

Sav sadržaj sajta osim blog postova živi u `src/utils/allData/` (portfolio, tehnologije, about, kontakt, linkovi, privacy, terms). Portfolio projekti se dodaju tamo.

## 8. Baza

- Atlas M0 cluster; produkciona baza (ime potvrđuje `db:info` u feature-u 01, komentari u modelima pominju `jovicData`)
- Dev baza: isti cluster, druga baza (`<ime>-dev`) — od feature-a 01. Obe dele 512 MB
- Kolekcija `posts`: `title`, `headline1`, `description1`, `content1`, `image`, `headline2`, `description2`, `content2`, `imagesecond`, `username`, `slug` (jedinstven), `timestamps`; od 02 `ownerId`, od 05 `approved`
- Kolekcija `users`: samo Credentials korisnici (`name` i `email` jedinstveni, `password` bcrypt hash). Google korisnici se ne upisuju u bazu
- Slike postova su base64 stringovi u samom dokumentu (`image`, `imagesecond`)
- Backup i vraćanje: skripte iz feature-a 01; backup-i su u `backups/` i nikad se ne commit-uju (sadrže email adrese i hash-eve lozinki)
- Migracije: skripte u `scripts/`, podrazumevano dry-run, upis sa `--apply`, za produkciju potvrda kucanjem imena baze

## 9. Auth i uloge

- Prijava: Google ili email + lozinka; registracija bez potvrde email-a (odluka vlasnika)
- Registracija (od 02): ime 3–35 karaktera, lozinka 10–72 karaktera (72 je limit bcrypt-a), validan email
- `ownerId` (od 02): `google:<providerAccountId>` ili `credentials:<id iz baze>` — računa se pri prijavi i nosi u sesiji. Vlasništvo posta se nikad ne određuje po imenu ni po email-u
- Admin (od 02): korisnik čiji je `ownerId` jednak env varijabli `ADMIN_ID` (Google nalog vlasnika)
- Pravila:

| Radnja | Ko sme |
|---|---|
| Čitanje odobrenih postova | svi |
| Pravljenje posta | ulogovan korisnik |
| Lista svojih postova (i neodobrenih) | vlasnik posta |
| Izmena posta (od 06) | samo vlasnik posta |
| Brisanje posta | vlasnik posta ili admin |
| Lista postova na čekanju, odobravanje (od 05) | samo admin |

## 10. Blog pravila

- Postovi admina se objavljuju odmah; postovi svih ostalih čekaju odobrenje (od 05)
- Izmena posta ne-admina ponovo traži odobrenje, a post do odobrenja nije na javnom blogu (od 06)
- Neodobren post se briše — nema statusa „odbijeno"
- Vlasnik dobija mejl kad post čeka odobrenje: EmailJS, isti template kao kontakt forma
- Slika: max 1 MB po slici, dve slike po postu; Vercel prima body do 4,5 MB
- Slug se ne menja posle kreiranja

## 11. Tema

- Light i dark preko CSS varijabli u `globals.css` (`:root` = light, `.dark` menja varijable)
- Sajt prati temu operativnog sistema dok posetilac ne klikne toggle; toggle ima dva stanja i klik se pamti (od 07)
- Server ne zna temu: slike i stilovi koji zavise od teme rešavaju se CSS-om, ne JavaScript-om (od 07)

## 12. SEO

- `keywords` u root layout-u ostaje kakav je (odluka vlasnika)
- `alt` i `title` atributi slika sa imenom vlasnika su namerni i ostaju
- Nove title i description tekstove Claude Code predlaže, a vlasnik odobrava pre upisa
- OG slika 1200×630 generisana iz koda; ako nije kvalitetna, vlasnik je pravi u Figmi (od 08)
- `sitemap.xml` i `robots.txt` su obavezni (od 08) — vlasnik ih koristi u Google Search Console
- Ikonice sajta se prave iz `public/smal logo svg Miroslav Jovic Frontend Developer.svg` (isti znak kao sadašnji favicon)
- Redirect-i starih slug-ova ostaju

## 13. Env varijable

- **`.env`**: obratiti pažnju. Na početku ove dorade u projektu ima 8 ključeva. to su: NEXT_PUBLIC_MAIN_PUBLIC_KEY, NEXT_PUBLIC_SERVICE_KEY, NEXT_PUBLIC_TEMPLATE_KEY, NEXT_PUBLIC_NAME_OF_LINK, MONGO_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET. Na vercel za 3 kluča stoji ovo `IT looks like a secret, but its value is visible to anyone with access. Consider rotating at the source and saving as Secret.` Ta 3 ključa su MONGO_URL, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET. Napomenuti programeru u toku rada kako to srediti i gde treba da se sredi kada za to dođe pravo vreme.

- Na kraju treba da budu svi ovi ključevi sa ovakvom postavkom:

| Varijabla | Gde | Napomena |
|---|---|---|
| `MONGO_URL` | server | od 01: lokalno dev baza; na Vercel-u Production = produkcija, Preview = dev |
| `MONGO_URL_PRODUCTION` | samo lokalno | od 01, samo za skripte (backup, migracije); nikad na Vercel-u |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | server | Google OAuth |
| `NEXTAUTH_URL` | server | lokalno `http://localhost:3000` |
| `NEXTAUTH_SECRET` | server | |
| `ADMIN_ID` | server | od 02: `ownerId` vlasnika (`google:...`) |
| `NEXT_PUBLIC_NAME_OF_LINK` | public | base URL za fetch ka sopstvenom API-ju (do feature-a 10) |
| `NEXT_PUBLIC_SERVICE_KEY`, `NEXT_PUBLIC_TEMPLATE_KEY`, `NEXT_PUBLIC_MAIN_PUBLIC_KEY` | public | EmailJS service, template i public key — javni po dizajnu EmailJS browser SDK-a |

`.env.example` sa praznim vrednostima i komentarima; `.env*` u `.gitignore` (od 00). Tačna imena potvrđuje vlasnik u feature-u 00.

## 14. Git i deploy

- `master` = produkcija na Vercel-u; njime, PR-ovima i merge-ovima upravlja isključivo vlasnik
- `develop` se pravi iz `master`-a u feature-u 00; feature grane (`feature/...`, `fix/...`) idu iz `develop`-a
- Commit poruke na engleskom, conventional commits; detalji u ai-interaction.md
- Preview deployment-i koriste Preview env varijable → dev baza (od 01). Google login na preview URL-ovima ne radi; admin delovi se testiraju lokalno

## 15. Faze i redosled

| Faza | Feature fajlovi | Sadržaj |
|---|---|---|
| 0 — Temelj | 00, 01 | alati i radni tok; dev okruženje i backup |
| 1 — Hitno | 02, 03 | zaštita API-ja i vlasništvo; patch verzije |
| 2 — Upgrade | 04 | Next 16 i React 19 |
| 3 — Blog | 05, 06 | odobravanje; izmena posta |
| 4 — Sajt | 07, 08, 09, 10 | tema i SSR; metadata i OG slika; fontovi; performanse i sitnice |

Redosled je obavezan (feature-i se naslanjaju jedni na druge). Sav kod od feature-a 05 piše se za Next 16. Zbirna provera celog plana je u feature-u 10.
