# Current Feature: 02 — Zaštita API-ja i vlasništvo postova

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- NextAuth konfiguracija prelazi u `src/utils/authOptions.js`, a `src/app/api/auth/[...nextauth]/route.js` je samo uvozi (raspored komentara odobren, vidi Notes)
- `ownerId` u `jwt` callback-u samo pri prijavi: Google → `google:<providerAccountId>`, email + lozinka → `credentials:<id iz baze>`; `session` callback prenosi `ownerId` i `isAdmin` (`ownerId === ADMIN_ID`, samo za UI); izvođenje `ownerId` je čista funkcija u `src/utils/` sa testom
- Stare sesije bez `ownerId` → API 401, dashboard „Your session has expired. Please log in again."
- U development-u dashboard prikazuje `ownerId` ulogovanog korisnika (za `ADMIN_ID`); u produkciji ne
- `ADMIN_ID` upisan u `.env.local` i na Vercel (Production i Preview), klik po klik
- Model Post: `ownerId` (String, required, index); `username` ostaje za prikaz, popunjava se iz sesije
- Pravila pristupa kao čiste funkcije (`postPermissions.js`) sa testovima: pravljenje (ulogovan sa `ownerId`), brisanje (vlasnik ili admin), „moji postovi" (po `ownerId`)
- `POST /api/posts`: bez sesije 401; `username` i `ownerId` iz sesije; whitelist polja iz body-ja; validacija → 400 sa porukom; slug normalizovan i jedinstven na serveru (isti algoritam kao sada u dashboard-u); odgovor 201 sa stvarno sačuvanim slug-om
- `getAllPostSlugs` u dashboard-u se uklanja (brisanje i premeštanje komentara odobreno, vidi Notes)
- `DELETE /api/posts/[slug]`: 401 bez sesije, 404 ne postoji, 403 nije vlasnik ni admin, inače briše
- `GET /api/posts`: javna lista ostaje; `?username=` → `?mine=1` (samo ulogovan, po `ownerId` iz sesije); dashboard prelazi na `?mine=1`
- Validacija u jednom modulu (`postValidation.js`) za browser i server, sa testovima: dužine posle trim-a (title 2–75, headline1/2 2–35, description1/2 2–135, content1/2 2–2000, slug 2–35); slika `data:image/(png|jpeg|webp|gif);base64,...` ≤ 1 MB dekodirano, obe obavezne; sva polja obavezna i stringovi
- Dashboard: limit slike 2 MB → 1 MB (provera i dva Popup-a); posle `POST` i `DELETE` provera `res.ok`, greška iz odgovora u Popup-u, forma se ne resetuje
- Dashboard, login i register: prvo poseban commit sa doslovnim premeštanjem koda (sa komentarima) u `DashboardClient.jsx`, `LoginClient.jsx`, `RegisterClient.jsx`; zatim serverski `page.jsx` sa `metadata` (`title` = sadašnji `TabTitle` tekstovi, `robots: { index: false, follow: false }`)
- `TabTitle` pozivi, njihovi `useEffect`-i i komentari „// for tab title" se brišu; funkcija `TabTitle` i komentar „// TabTitle" u `GeneralFunctions.js` se brišu (odobreno)
- Serverska login stranica čita `?error=` iz `searchParams` i prosleđuje poruku klijentskoj komponenti
- Register: server validacija (email preko `isValidEmail`, ime 3–35, lozinka 10–72), ista pravila u formi preko istog modula; bcrypt cost 10; duplikat → 409 „An account with this name or email already exists."; stranica prikazuje poruku iz odgovora
- `authorize` vraća samo `{ id, name, email }` (id kao string); za nepostojećeg korisnika i pogrešnu lozinku ista poruka „Wrong email or password."
- Greške u API-ju: JSON `{ error: "..." }` sa tačnim statusom, detalji samo u server log-u
- CORS: `headers()` blok za `/api/:path*` uklonjen iz `next.config.js`; `redirects()` i zakomentarisani kod ostaju
- Migracija `scripts/migrate-02-owner-id.mjs`: postovima bez `ownerId` upisuje `ADMIN_ID`; dry-run, `--apply`, `--target production` sa potvrdom imena baze
- Redosled migracije: backup produkcije → nova kopija u dev → migracija na dev → provera lokalno → migracija na produkciji neposredno pre merge-a u `master` (vlasnik pokreće ili izričito odobrava)
- Rotacija `MONGO_URL`, `GOOGLE_CLIENT_SECRET` i `NEXTAUTH_SECRET` i ponovno dodavanje kao Secret na Vercel-u, uz `ADMIN_ID` i redeploy produkcije (odluka vlasnika iz 01)
- Vitest: validacija, pravila pristupa, `ownerId`, jedinstvenost slug-a; `curl` bez sesije → 401; ručni testovi iz feature fajla (test korisnik, vlasnik, slike oko 1 MB, login/register poruke, tabovi i `noindex`)
- `npm run test` i `npm run build` prolaze

## Notes

<!-- Any extra notes -->

- Faza 1, fajl 1/2; radi se još na Next 14 — `params` čitati na jednom mestu u handler-u, da prelazak na 16 (feature 04) bude što manji
- Zašto vlasnik nije email: register ne proverava vlasništvo email adrese, pa bi neko mogao da se registruje tuđim Gmail-om i preuzme postove tog Google korisnika
- Google korisnici se ne upisuju u `users`, pa `ownerId` ne zavisi od te kolekcije
- Vercel prima body do 4,5 MB; dve slike od 1 MB u base64 su oko 2,7 MB
- Ne uvoditi biblioteku za validaciju
- Ne uvodi se odobravanje (05) ni izmena posta (06)
- Tekstovi poruka (odluka vlasnika 04.11.2026.): „Wrong email or password.", „An account with this name or email already exists.", „Name must be 3–35 characters.", „Please enter a valid email.", „Password must be 10–72 characters.", „Your session has expired. Please log in again.", „Something went wrong. Your post was not saved.", „Something went wrong. The post was not deleted."; prevelika slika: postojeći tekstovi Popup-a, „1MB" umesto „2MB"
- `metadata` naslovi: „Dashboard for your blogs", „Login to Dashboard", „Register for using Dashboard" (usklađuju se sa title template-om u 08)
- Iz 01: baza `jovicData`, dev `jovicData-dev`; svih 16 postova je vlasnikovo (Google), dashboard sada prikazuje 1 od 16 zbog promene imena — migracija na `ownerId` to rešava
- Iz 01: lokalni build se pokreće sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build` (do feature-a 10)
- Iz 01: na Preview-u `/blog` i `/blog/[slug]` čitaju produkciju preko njenog API-ja (samo čitanje); upisi idu na preview API → dev baza. Google login na preview URL-ovima ne radi — admin delovi se testiraju lokalno
- Iz 01: na Vercel-u `MONGO_URL` Production = `jovicData`, Preview = `jovicData-dev`; `MONGO_URL_PRODUCTION` i `NEXTAUTH_URL` se na Vercel ne dodaju
- Pre koda koji ide uz `getServerSession` i callback-e proveriti next-auth v4 dokumentaciju za instaliranu verziju
- Odluka vlasnika (21.11.2026.), premeštanje `authOptions`: `// react/next stuff` i `// stuff for data` prelaze u `authOptions.js` iznad svojih import-a; `// check password` ide doslovno uz `authorize`; zakomentarisan `// import Error from "next/error";` ostaje u `route.js`
- Napredak (21.11.2026.): commit premeštanja `9db02ab`; kod, testovi (71), `sass:check`, `format:check` i build prolaze; `curl` bez sesije → 401 za `POST`, `DELETE` i `?mine=1`; login stranica ima `noindex` i naslov iz `metadata`. Čeka se: `ADMIN_ID`, nova kopija produkcije u dev, migracija na dev, ručni testovi
- Tekstovi poruka koje je Claude Code dodao (nisu bili na listi, vlasnik ih proverava): validacija posta („All fields are required.", „Main Title must be 2–75 characters." itd., „The first image must be a PNG, JPEG, WebP or GIF image."), „This post does not exist." (404), „You can only delete your own posts." (403)
- `confirmByTyping` premešten iz `restore-db.mjs` u `scripts/lib/confirm.mjs` (koriste ga restore i migracija); npm skripta `db:migrate-02`
- Odluka vlasnika (21.11.2026.), `getAllPostSlugs`: `// function for catching data to see slugs` i `// fetch all slugs` se brišu zajedno sa kodom; `// if there is the same slug add number` prelazi doslovno uz isti algoritam u serversku funkciju u `src/utils/`
- Napredak (22.11.2026.): `ADMIN_ID` u `.env.local`; nova kopija produkcije u dev i migracija na dev (16 postova dobilo `ownerId`); svi ručni testovi prošli; otvorena pitanja iz 02-a rešena po predlogu: poruke ostaju, `// matching all API routes` obrisan sa blokom, stari blok za dužine u dashboard-u (sa `// Error message if input is out of range`) i Popup „Match pattern for fileds!" obrisani, svaki `?error=` daje istu poruku, javni API ne vraća `ownerId`, register čuva ime i email bez razmaka i ne prazni formu kad server odbije. Test, `format:check`, `sass:check` i build prolaze. U dev bazi ostaje test korisnik `imgtest210028`. Commit logike `6807049`. Vercel: `ADMIN_ID` (Production i Preview) dodat; rotirane sve tri tajne (novi Atlas korisnik `jovic-app-2026`, stari obrisan; novi Google secret, stari obrisan; novi `NEXTAUTH_SECRET`), sve kao Secret, lokalno i na Vercel-u; redeploy produkcije, sajt i Google login rade. Grana push-ovana, PR ka `develop`-u otvoren. Migracija na produkciji (22.11.2026.): backup `jovicData-2026-11-22_21-58`, 16 postova dobilo `ownerId`, sajt radi; produkcija dobija novi kod kad vlasnik merge-uje u `master`

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
