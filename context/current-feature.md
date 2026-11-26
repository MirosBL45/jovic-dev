# Current Feature: 04 — Next.js 16 i React 19

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Prelazak sa `next` 14.2.35 na aktuelni Next 16 i sa React 18 na React 19; ponašanje i izgled sajta ostaju isti
- Node: lokalno ≥ 20.9; na Vercel-u voditi vlasnika klik po klik da proveri i postavi Node.js verziju koju traži aktuelni Next 16
- Pre upgrade-a pročitati zvanični vodič za 16 i delove vodiča za 15 koji važe pri skoku sa 14 (async Request APIs, caching); posle instalacije čitati `node_modules/next/dist/docs/` ako postoji
- Upgrade preko codemod-a (`npx @next/codemod@canary upgrade latest`) ili ručno `next@latest react@latest react-dom@latest eslint-config-next@latest`; pregledati svaki fajl koji codemod promeni, bez izmena komentara
- `await params` u `src/app/blog/[slug]/page.jsx` (`generateMetadata` i stranica), `src/app/portfolio/[category]/page.jsx` i svim handler-ima u `src/app/api/posts/[slug]/route.js`
- `next/image`: `priority` → `preload` (logo u Navbar-u); proveriti `images.qualities`, `localPatterns` za lokalne slike sa query string-om, cache TTL, slike sa razmacima u imenu i `data:` (base64) slike na blogu i u dashboard-u
- ESLint: `eslint` + `eslint.config.mjs` (flat config) sa `eslint-config-next` i `eslint-config-prettier`, skripta `"lint": "eslint ."`; popraviti samo error-e, warning-e popisati i pitati vlasnika; dopuniti `.vscode/settings.json` ESLint ključevima kao u camera-motion
- Turbopack je podrazumevan; ako dev ili build prave problem → privremeno `--webpack` i pitati vlasnika
- `next-auth` v4 ostaje; proveriti `getServerSession` u Route Handler-ima i ceo login/logout tok
- Proveriti `peerDependencies` za React 19 (`swr`, `react-icons`, `@emailjs/browser`) i podići u okviru major verzija ako treba; `mongoose` ostaje 6.x
- Blok „nextjs-agent-rules" koji `next dev` doda na vrh `AGENTS.md` zadržati i commit-ovati
- README: ažurirati verzije i komande (lint)
- `npm audit --omit=dev` posle upgrade-a, broj u History; cilj je da `next` nema poznatih advisory-ja
- `npm run lint`, `npm run test` i `npm run build` prolaze
- Ručni test lokalno (dev baza): početna sa svim sekcijama, portfolio i sve tri kategorije, blog lista i post, kontakt slanje, 404 (odbrojavanje i redirect), stari blog slug-ovi sa `_` → novi, login Google i email + lozinka, logout, dashboard pravljenje i brisanje test posta, oba moda teme
- Preview deployment sa `develop`-a prolazi build na Vercel-u

## Notes

<!-- Any extra notes -->

- Faza 2, jedini fajl; sav kasniji kod (05–10) piše se već za Next 16
- 14.x je end of life od 26.10.2025
- Middleware ne postoji, pa preimenovanje `middleware` → `proxy` ne pogađa projekat
- Ne refaktorisati ništa što upgrade ne traži; problem nađen usput zabeležiti i pitati
- Iz 03: audit posle 03 — 2 (`next` Critical, `postcss` High preko `next`-a); pun audit (sa dev) još i `glob` i `minimatch` preko `eslint-config-next` 14 — sve treba da se zatvori ovde
- Iz 03: import-i `"public/..."` rade preko alias-a `"public/*": ["./public/*"]` u `paths` (`jsconfig.json`), bez `baseUrl` — proveriti da i dalje radi sa Turbopack-om
- Iz 03: `react-icons` 5.7.0 sa `TbBrandAdobePhotoshop` i `TbBrandAdobePremiere`; `mongoose` 6.13.12 ostaje
- Iz 01: lokalni build se pokreće sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build` (do feature-a 10)
- Iz 02: u dev bazi postoji test korisnik `imgtest210028` (login email + lozinka i test post)
- `mongoose.models = {}` u modelima ostaje do feature-a 10
- Reference: https://nextjs.org/docs/app/guides/upgrading/version-16, https://nextjs.org/docs/app/guides/upgrading/version-15, `context/features/03-patch-verzije-done.md`
- Pročitani vodiči za 16 i 15 (v16.4.6). Ne pogađa projekat: middleware/proxy, AMP, runtime config, PPR, parallel routes, cache API-ji, `next/font`, `experimental-edge`. Fetch na blogu već ima `cache: "no-store"`, pa promena podrazumevanog keširanja iz 15 ne menja ponašanje
- Upgrade ručno (bez codemod-a): `next` 16.4.6 i `eslint-config-next` 16.4.6 (tačne verzije), `react` i `react-dom` ^19.3.1, novi dev paketi `eslint` ^10.15.0 i `eslint-config-prettier` ^10.1.8. Lokalno Node 24.11.1
- Peer zavisnosti za React 19: `swr` 2.5.1, `react-icons` 5.7.0 i `next-auth` 4.24.15 podržavaju 19; `@emailjs/browser` 4.4.1 nema React peer — ništa se ne podiže
- Odluka vlasnika (26.11.2026.): ESLint 10 umesto 9 (9.x je van podrške). Pri `npm install` ostaju 3 upozorenja „ERESOLVE overriding peer dependency" jer `eslint-plugin-react`, `-import` i `-jsx-a11y` još deklarišu `^9`; lint radi isto kao na 9
- Async API: `await params` u blog post stranici (i `generateMetadata`), portfolio kategoriji i GET/DELETE u `api/posts/[slug]`; dodatno `await searchParams` u login stranici (nije bilo u specu, otkrio dev log)
- `priority` → `preload` u Navbar-u i u `Keyboard.jsx` na početnoj (ista zastarela opcija, nije bila u specu)
- `next/image` podrazumevana podešavanja (`qualities`, `localPatterns`, `minimumCacheTTL`, `imageSizes`, local IP, redirects) ne pogađaju projekat: nema `quality` prop-a, query string-ova ni remote slika; `data:` slike se ne optimizuju
- ESLint (`eslint.config.mjs`: `core-web-vitals` + `prettier`): 4 error-a, 0 warning-a. 3× `react/no-unescaped-entities` u `not-found.js` → `'` u `&apos;` (isti tekst). 1× `react-hooks/set-state-in-effect` u `ThemeContext.js` → odluka vlasnika (26.11.2026.): `eslint-disable-next-line` iznad `setMode(stored)`, briše se u 07
- `next dev` je dodao blok „nextjs-agent-rules" na kraj (ne na vrh) `AGENTS.md`
- Ručni test vlasnika: console error „Cannot update a component (`LinkComponent`) while rendering a different component (`DashboardClient`)" — `router.push` tokom render-a, što React 19 / Next 16 više ne tolerišu. Odluka vlasnika (26.11.2026.): popravka u 04 — `router.push` premešten u `useEffect` u `DashboardClient.jsx` (unauthenticated → login) i `LoginClient.jsx` (authenticated → dashboard); prikaz ostaje isti
- Next 16 više sam ne isključuje `scroll-behavior: smooth` (iz `*` u `globals.css`) pri prelasku na drugu stranicu, pa bi nova stranica glatko klizila do vrha (dev upozorenje `missing-data-scroll-behavior`). Probano `data-scroll-behavior="smooth"` na `<html>` u root layout-u; odluka vlasnika (26.11.2026.) posle probe: nije dobro, vraćeno (sa atributom linkovi na sekcije početne, npr. `/#about` sa bloga, otvarali su vrh početne umesto sekcije; tek drugi klik je skrolovao do nje) — atribut se ne dodaje, ostaje podrazumevano ponašanje Next 16 i dev upozorenje
- Odluka vlasnika (26.11.2026.): poruke ispod formi za login i registraciju (bold, crvene, veći font) zapisane u feature 10
- Vercel (26.11.2026.): Node.js Version promenjen sa 22.x na 24.x; upozorenje o različitoj verziji za produkcioni deployment nestaje posle sledećeg Production deployment-a
- Build sa Turbopack-om prolazi bez `--webpack`; alias `public/*` radi. Audit posle upgrade-a: 0 (i `--omit=dev` i pun)
- Usput uočeno (nije deo upgrade-a, ne dira se): upozorenje `metadataBase` u build-u (feature 08); mongoose `strictQuery` deprecation u dev log-u; `/portfolio/<nepostojeća>` vraća HTTP 200 sa 404 sadržajem i `noindex` jer `loading.jsx` pokreće streaming (isto ponašanje kao na 14); `router.asPath` u Navbar-u ne postoji u App Router-u (logout redirect)

## History

<!-- Keep this updated. Earliest to latest -->

### Wednesday, 04.11.2026. | 15:33 — Audit projekta i plan rada

Pre ijedne izmene urađen je audit celog projekta: pregledan je kod, pokrenute su provera zavisnosti i lista zastarelih paketa, i napravljen je production build. Najteži nalazi su bili sledeći. Pravljenje i brisanje blog postova nisu imali nikakvu proveru na serveru, pa je svako mogao da obriše bilo koji post ili da napiše post pod tuđim imenom, a post je bio vezan za ime za prikaz, ne za nalog. Next.js 14.0.0 je bez podrške od oktobra 2025. i nosi veliki broj poznatih propusta, kao i paketi za bazu i za prijavu, ukupno 31 advisory od kojih četiri Critical. Zbog načina na koji se tema učitava, server šalje praznu stranicu, pa se sav sadržaj pojavljuje tek kada se učita JavaScript, što je provereno u izgrađenom HTML-u. Post sa dve veće slike prelazi Vercel-ov limit veličine zahteva, a forma se ipak resetuje kao da je post sačuvan. Uočeni su i propusti u metadata podacima, gde je slika za deljenje linka bila mala ikonica sa adrese jednog preview deployment-a, zatim učitavanje fontova koje blokira prvi prikaz, lista bloga koja iz baze vuče sve slike svakog posta i nekoliko sitnica u kodu. SCSS i CSS fajlovi su potpuno usklađeni, a redirect-i starih adresa blog postova su dobro urađeni.

Vlasnik je odlučio da blog ostane otvoren za registraciju preko Google-a i preko email-a sa lozinkom, bez potvrde email-a, jer služi kao živa demonstracija CRUD-a za regrutere. Svaki tuđi post i svaka izmena posta čekaju njegovo odobrenje, neodobren post se briše, a o postu na čekanju ga obaveštava mejl kroz isti EmailJS template kao kontakt forma. Limit je 1 MB po slici. Tema prati operativni sistem dok posetilac ne klikne prekidač, koji ima dva stanja. Ključne reči i alt tekstovi sa imenom ostaju kakvi jesu, a nove naslove i opise stranica vlasnik odobrava pre upisa. Projekat ostaje na JavaScript-u, a stilovi na CSS-u i SCSS-u sa Live Sass Compiler-om; uvode se testovi i Prettier, sa jednim formatirajućim commit-om za ceo projekat. Lokalni razvoj prelazi na posebnu dev bazu, a pre svake promene podataka pravi se backup. Redosled rada: alati i radni tok, dev baza i backup, hitna zaštita API-ja, zakrpe u okviru iste verzije, prelazak na Next 16, pa tek onda odobravanje, izmena posta, tema, metadata, fontovi, performanse i sitnice.

### Wednesday, 04.11.2026. | 16:18 — Odluke pre starta

Vlasnik je pre početka rada odlučio o svim otvorenim pitanjima iz plana, pa feature fajlovi više nemaju ništa za potvrdu na startu. Za registraciju važi ime od 3 do 35 karaktera i lozinka od 10 do 72, a utvrđeni su i tačni tekstovi svih novih poruka na sajtu. Postovi na čekanju stoje na vrhu dashboard-a, iznad forme, a ceo post se vidi proširivanjem kartice. Izmenjen post nestaje sa javnog bloga dok ga vlasnik ponovo ne odobri, bez čuvanja dve verzije. Sitemap i robots su obavezni jer vlasnik koristi Google Search Console, ikonice se prave iz malog SVG logoa koji je isti znak kao sadašnji favicon, a podrazumevana robots podešavanja se brišu iz metadata. Uvedeno je pravilo vlasnika da je sve što može serversko, a ono što mora da bude klijentsko ide u posebnu komponentu koja se uvozi u serversku. Zato stranice za dashboard, prijavu i registraciju prelaze na serversku stranicu sa klijentskom komponentom već pri prvoj izmeni, a naslov taba dolazi iz metadata, pa se stara funkcija za naslov taba briše zajedno sa komentarima uz nju.

### Wednesday, 18.11.2026. | 18:03 — Alati i radni tok

Postavljen je radni tok za doradu projekta. Napravljena je razvojna grana iz glavne, a dokumentacija projekta i uputstva za rad prvi put su ušli u repo. Env fajlovi su sada u potpunosti van git-a, osim primera sa praznim vrednostima koji sadrži osam postojećih ključeva i adresu za NextAuth. Uvedeni su Prettier, Vitest sa prvim testovima za pomoćne funkcije, komanda za kompajliranje jednog SCSS fajla i provera da li se svi SCSS i CSS parovi poklapaju, a README je dobio uputstvo za razvoj.

Ceo projekat je formatiran u posebnom commit-u, u kome je promenjeno 95 fajlova, dok su svih 320 komentara ostali identični, a generisani CSS nije diran. Vlasnik je odlučio da provera SCSS i CSS parova ne razlikuje velika i mala slova u hex bojama, jer Prettier te boje piše malim slovima. Testovi, provera stilova, provera formata i production build prolaze.

### Saturday, 21.11.2026. | 19:30 — Dev okruženje i backup

Lokalni razvoj više ne koristi produkcionu bazu. Na istom Atlas cluster-u napravljena je posebna dev baza, potpuna kopija produkcije sa 16 postova i 2 korisnika i istim indeksima, a sajt lokalno radi na njoj: blog, Google login i registracija sa prijavom email-om su provereni. Produkcioni connection string ostaje lokalno samo za skripte, a sav env je u jednom lokalnom fajlu. Na Vercel-u Production i dalje koristi produkcionu bazu, a Preview dev bazu, pa ništa sa preview adrese ne može da upiše u produkciju.

Uvedene su komande za pregled baze, backup i vraćanje backup-a. Vraćanje podrazumevano samo ispisuje plan, upisuje tek uz izričit flag, za produkciju traži kucanje imena baze, ne briše postojeće dokumente bez posebnog flag-a i odbija rad ako dev i produkcija pokazuju na istu bazu. README je dobio uputstvo za bazu i backup, a Prettier više ne prijavljuje razliku u krajevima redova na Windows-u. Uočeno je da dashboard prikazuje samo jedan post jer je vlasnik promenio ime na Google nalogu, što rešava vezivanje postova za nalog u sledećem feature-u, gde se rade i promena i zaštita tri tajne na Vercel-u. Do prelaska stranica bloga na direktno čitanje baze, Preview prikazuje produkcione postove, a lokalni build traži produkcionu adresu za čitanje postova.

### Sunday, 22.11.2026. | 22:00 — Zaštita API-ja i vlasništvo postova

Pravljenje i brisanje blog postova sada rade samo za ulogovane korisnike. Autor i vlasnik posta uzimaju se iz sesije, a ne iz podataka koje šalje browser, i vlasnik je vezan za nalog (Google ili email sa lozinkom), a ne za ime ili email. Svako može da obriše samo svoje postove, a vlasnik sajta kao admin može da obriše bilo koji. Server proverava sva polja posta i obe slike, sa limitom od 1 MB po slici, sam određuje jedinstven slug i vraća jasne poruke o greškama, a dashboard više ne prikazuje uspeh kad server odbije post i ne prazni formu. Dashboard prikazuje postove po vlasniku, a javni API više ne otkriva vlasnika posta.

Registracija proverava ime, email i dužinu lozinke i na serveru, lozinke se jače hešuju, a zauzet nalog daje čitljivu poruku. Login za nepostojeći email i pogrešnu lozinku daje istu poruku, a prijava više ne vraća hash lozinke. Stranice za dashboard, prijavu i registraciju su prešle na serversku stranicu sa klijentskom komponentom, naslov taba dolazi iz metadata, a pretraživači ih ne indeksiraju. CORS header-i na API-ju su uklonjeni.

Svi postojeći postovi su migracijom dodeljeni vlasniku, prvo na dev bazi, pa na produkciji posle novog backup-a. Na Vercel-u je dodat admin nalog, a sve tri osetljive tajne (baza, Google i NextAuth) su zamenjene novim vrednostima i sačuvane kao Secret, a stare su ugašene. Testovi, provera stilova i formata i production build prolaze, a ručno su provereni test korisnik, admin, slike oko 1 MB, poruke za login i registraciju i naslovi stranica.

### Thursday, 26.11.2026. | 15:39 — Patch verzije unutar istih major verzija

Next.js, njegova ESLint konfiguracija, paket za prijavu, paket za bazu, SWR i paket ikonica podignuti su na najnovije zakrpe u okviru istih major verzija, bez prelaska na novu major verziju. Pre izmene npm audit je prijavljivao 29 paketa sa propustima, od toga 19 Critical, 2 High, 5 Moderate i 3 Low, a posle izmene i jedne bezbedne ispravke zavisnosti uz odobrenje vlasnika ostala su 2, sam Next.js kao Critical i PostCSS koji dolazi uz njega kao High. Oba se zatvaraju tek prelaskom na Next 16 u sledećem feature-u.

Pregledane su beleške o izmenama za Next.js 14.1 i 14.2 i za paket za bazu. Nova verzija Next-a više nije pronalazila slike koje se uvoze iz javnog foldera, pa je build padao; to je rešeno jednim alias-om u podešavanjima putanja, bez izmene ijednog import-a i bez opcije koju editor prijavljuje kao zastarelu. Nova verzija paketa ikonica više nema ikonice za Photoshop i Premiere Pro, pa bi sekcija tehnologija pala u browser-u; po odluci vlasnika zamenjene su istim ikonicama iz drugog seta, u konturnom stilu. Paket za bazu ostaje na verziji iz plana. Testovi, provera stilova i formata i production build prolaze, a vlasnik je ručno proverio sajt na dev bazi.

### Thursday, 26.11.2026. | 23:55 — Next.js 16 i React 19

Projekat je prešao sa Next.js 14 na aktuelni Next.js 16 i sa React 18 na React 19, pa je ponovo na podržanoj verziji. Pre izmene su pročitani zvanični vodiči za verzije 15 i 16, a upgrade je urađen ručno, bez automatskog alata, da bi svaka izmena bila pod kontrolom. Stranice i API rute sada čitaju parametre adrese na novi, asinhroni način, uključujući i stranicu za prijavu, koju je otkrio dev log. Zastarela opcija za prioritetno učitavanje slika zamenjena je novom na logou i na tastaturi na početnoj. Nova podrazumevana podešavanja za slike ne pogađaju projekat, a build radi sa novim podrazumevanim bundler-om i postojećim alias-om za javni folder. Ostali paketi već podržavaju React 19, pa nijedan nije trebalo podizati. Na Vercel-u je Node.js podignut sa 22 na 24. Posle upgrade-a npm audit ne prijavljuje nijedan propust, ni za produkcione ni za razvojne pakete.

Umesto uklonjene Next komande za lint uveden je ESLint 10 sa novim oblikom konfiguracije i Prettier pravilima, a editor ga primenjuje pri čuvanju fajla. Vlasnik je izabrao verziju 10 jer verzija 9 više nije podržana, uz tri upozorenja pri instalaciji dok dodaci ne objave podršku. Lint je prijavio četiri greške i nijedno upozorenje. Apostrofi na stranici za nepostojeću adresu su zapisani na ispravan način, bez promene teksta, a jedna greška u učitavanju teme je po odluci vlasnika privremeno utišana do sređivanja teme. Pri ručnom testu vlasnik je u konzoli video grešku sa preusmeravanjem na dashboard i login, jer je preusmeravanje pokretano usred iscrtavanja stranice. To je ispravljeno uz isto ponašanje. Next 16 više sam ne isključuje glatko skrolovanje pri prelasku na drugu stranicu. Probano je podešavanje koje vraća staro ponašanje, ali su tada linkovi na sekcije početne radili tek iz drugog pokušaja, pa je vraćeno i zapisano za proveru pri sređivanju teme. Poruke ispod formi za prijavu i registraciju se teško uočavaju, pa je njihovo isticanje zapisano za poslednji feature. README je dobio novu verziju i komandu za lint. Lint, testovi, provera stilova i formata i production build prolaze, a vlasnik je ručno proverio ceo sajt na dev bazi. Preview build na Vercel-u se proverava posle push-a.
