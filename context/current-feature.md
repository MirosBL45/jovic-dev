# Current Feature: 03 — Patch verzije unutar istih major verzija

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- `npm audit --omit=dev` pre i posle; brojeve upisati u Notes i u History (stanje iz audita 30.10.2026: 31 advisory — 4 Critical, 4 High, 20 Moderate, 3 Low)
- Tačne verzije: `next@14.2.35`, `eslint-config-next@14.2.35`, `next-auth@4.24.15`, `mongoose@6.13.12`
- `swr` i `react-icons` na najnoviju verziju u okviru iste major verzije (`npm outdated` → kolona Wanted)
- Bez promene major verzija (Next 16 je feature 04) i bez `npm audit fix --force`
- Pregledati release notes za `next` 14.1 i 14.2 i CHANGELOG za `mongoose` 6.11 → 6.13; ako neka izmena ponašanja pogađa projekat → pitati vlasnika
- Ručni test lokalno na dev bazi: početna, portfolio i sve tri kategorije, blog lista i jedan post, kontakt forma (slanje), login obe vrste, logout, dashboard (pravljenje i brisanje test posta)
- `npm run test` i `npm run build` prolaze

## Notes

<!-- Any extra notes -->

- Faza 1, fajl 2/2; kratak međukorak pre Next 16
- Trenutne verzije u `package.json`: `next` 14.0.0, `eslint-config-next` 14.0.0, `next-auth` ^4.24.5, `mongoose` 6.11.1, `swr` ^2.2.4, `react-icons` ^5.4.0
- `mongoose` 6.13.12 zatvara prototype pollution i search injection advisories
- Posle 14.2.35 ostaje oko 23 advisory-ja za `next` koji su zakrpljeni tek u 15.5.x i novijim — očekivano, zatvara ih feature 04
- `mongoose.models = {}` u modelima ostaje do feature-a 10
- Iz 01: lokalni build se pokreće sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build` (do feature-a 10)
- Iz 02: u dev bazi postoji test korisnik `imgtest210028` (može za login email + lozinka i test post)
- Audit pre (26.11.2026.): 29 paketa sa propustima — 19 Critical, 2 High, 5 Moderate, 3 Low (npm broji pakete, ne advisory-je; Critical više nego 30.10 jer su u međuvremenu objavljeni novi advisory-ji za `next` i `fast-xml-parser` preko `@aws-sdk`)
- Instalirano: `next` 14.2.35, `eslint-config-next` 14.2.35, `mongoose` 6.13.12 (tačne verzije, kao i ranije), `next-auth` ^4.24.15, `swr` ^2.5.1, `react-icons` ^5.7.0
- Audit posle instalacije: 3 — 1 Critical (`next`, 26 advisory-ja, ispravka tek u 16), 1 High (`postcss` preko `next`-a), 1 Moderate (`@babel/runtime` 7.26.0 preko `next-auth`-a)
- Odluka vlasnika (26.11.2026.): `npm audit fix` bez `--force` → `@babel/runtime` 7.29.15, menja samo `package-lock.json`. Audit posle: 2 — 1 Critical (`next`), 1 High (`postcss`), oba se zatvaraju u 04. Pun audit (sa dev) još prijavljuje `glob` i `minimatch` preko `eslint-config-next` 14 — isto 04
- Release notes: Next 14.1 i 14.2 i mongoose 6.11 → 6.13 pregledani. Pogađa projekat: razrešavanje import-a `"public/..."` (20 import-a u 9 fajlova) u 14.2 ne radi bez `baseUrl`. Prvo je dodat `"baseUrl": "."`, ali VS Code (TypeScript 6) ga prijavljuje kao deprecated (prestaje da radi u TS 7.0), pa je zamenjen alias-om `"public/*": ["./public/*"]` u `paths` — import-i se ne menjaju, build prolazi
- Odluka vlasnika (26.11.2026.): mongoose ostaje 6.13.12 po specu, iako postoji 6.13.13 (16.11.2026., dodatno ojačanje `sanitizeFilter`-a, koji projekat ne koristi)
- `react-icons` 5.6.0+ više nema `SiAdobephotoshop` i `SiAdobepremierepro` (build upozorenje, sekcija Technologies bi pala u browser-u). Odluka vlasnika (26.11.2026.): 5.7.0 + `TbBrandAdobePhotoshop` i `TbBrandAdobePremiere` iz `react-icons/tb` (vizuelna izmena: konturne ikonice, kao postojeće `TbBrandFramerMotion` i `TbBrandAuth0`)
- 14.2 menja CSS chunking (redosled po import-u); deljeni `.module.css` se uvoze samo unutar iste grupe komponenti — proverava se ručnim testom izgleda
- mongoose: izmene u `sanitizeFilter`, `$comment`, praznim `$and`/`$or` ne pogađaju projekat (`sanitizeFilter` se ne koristi; skripte rade preko native kolekcija)

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
