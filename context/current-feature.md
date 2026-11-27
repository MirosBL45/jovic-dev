# Current Feature: 05 — Odobravanje postova

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Model `Post`: polje `approved` (Boolean, default `false`)
- Pravljenje posta: `approved = true` ako je autor admin, inače `false` — određuje server po `ownerId` iz sesije
- Javni prikaz: `/blog` i `/blog/[slug]` prikazuju samo `approved: true`; neodobren post na `/blog/[slug]` → 404 za sve
- Dashboard, autor: u svojim postovima vidi i neodobrene sa oznakom „Awaiting approval" i može da ih obriše
- Dashboard, admin: sekcija „Posts awaiting approval (N)" na vrhu, iznad forme za pravljenje posta; kartica sa naslovom, autorom i datumom; „Show full post" / „Hide full post" proširuje i skuplja karticu (oba headline-a, oba opisa, oba sadržaja, obe slike); dugmad „Approve" i „Delete" (brisanje = odbijanje, potvrda kroz postojeći `DeletePopUp`)
- Server/klijent: serverska `dashboard/page.jsx` proverava sesiju preko `getServerSession` i sekciju renderuje samo za admina; sama sekcija je posebna klijentska komponenta
- API:
  - `GET /api/posts` (javno) → samo odobreni
  - `GET /api/posts?mine=1` → svoji, i odobreni i neodobreni
  - `GET /api/posts?pending=1` → samo admin (403 za ostale), svi neodobreni
  - `GET /api/posts/[slug]` (javno) → 404 ako nije odobren
  - `PATCH /api/posts/[slug]` sa `{ approved: true }` → samo admin; druga polja se ne prihvataju
  - `DELETE` po pravilima iz 02 (vlasnik ili admin)
- Pravila i filteri kao čiste funkcije u `src/utils/`, sa Vitest testovima (ko sme da odobri: admin, ne-admin, bez sesije; filteri za javnu listu, `mine` i `pending`; vrednost `approved` pri pravljenju)
- Obaveštenje (EmailJS): kad ne-admin uspešno napravi post (201), dashboard šalje `emailjs.send` sa istim `SERVICE_BASE`, `TEMPLATE_BASE` i `PUBLIC_BASE` kao kontakt forma; `user_name` = „Blog: new post awaiting approval", `user_email` = email autora iz sesije, `message` = naslov, autor, slug i link `https://miroslavjovic.com/dashboard`; neuspeh slanja samo log, ne obara pravljenje posta
- Migracija `scripts/migrate-05-approved.mjs`: svim postovima bez `approved` upisuje `approved: true`; backup produkcije → kopija u dev → dry-run i `--apply` na dev → produkcija uz odobrenje vlasnika, neposredno pre merge-a u `master`
- Ručni test: test korisnik pravi post → nema ga na `/blog` ni na `/blog/<slug>` (404), u njegovom dashboard-u stoji oznaka čekanja, vlasniku stiže mejl; vlasnik vidi ceo post na čekanju, „Approve" → post na `/blog`, drugi post „Delete" → nestaje i iz autorovog dashboard-a; vlasnikov nov post je odmah na `/blog`; kao test korisnik `fetch` iz konzole: `PATCH` → 403, `?pending=1` → 403; posle migracije na dev svi stari postovi su i dalje na `/blog`
- `npm run lint`, `npm run test` i `npm run build` prolaze

## Notes

<!-- Any extra notes -->

- Faza 3, fajl 1/2; izmena posta nije deo ovog feature-a (06)
- Odluke vlasnika (04.11.2026.): neodobren post se briše (nema statusa „odbijeno"); obaveštenje kroz isti EmailJS template kao kontakt forma; regruter prolazi ceo krug (napravi, vidi u svom dashboard-u, obriše) bez vlasnika; admin sekcija na vrhu dashboard-a, ceo post proširivanjem kartice, bez modala
- Tekstovi (odobreni): „Awaiting approval", „Posts awaiting approval (N)", „Approve", „Delete", „Show full post", „Hide full post"
- EmailJS ključevi su javni po dizajnu (browser SDK); slanje iz browser-a je prihvaćeno jer je ovo obaveštenje, ne sigurnosna mera
- Koristiti postojeće komponente i stilove dashboard-a (`Popup`, `DeletePopUp`, `ClickButton`, kartice postova); novi stilovi u `.module.scss` + `sass:file`
- Postojeći kod za oslonac: `src/utils/postPermissions.js` (+ test), `authOptions.js`, `ownerId.js`, `postValidation.js`, `messages.js`, `src/app/api/posts/route.js` i `[slug]/route.js`, `dashboard/page.jsx` + `DashboardClient.jsx`, `src/models/Post.js`, migracija iz 02 kao obrazac
- Next 16: `await params` u Route Handler-ima i stranicama; pre pisanja koda čitati relevantne vodiče u `node_modules/next/dist/docs/`
- `isAdmin` u sesiji je samo za UI; API svaki put sam proverava
- Iz 01: lokalni build sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build` (do feature-a 10) — blog stranice čitaju preko HTTP-a, pa lokalni build i Preview prikazuju produkcione postove dok produkcija nema `approved` (proveriti ponašanje pre migracije produkcije)
- Iz 02: u dev bazi postoji test korisnik `imgtest210028`
- `mongoose.models = {}` u modelima ostaje do feature-a 10
- Reference: `context/project-overview.md` (poglavlja 8, 9, 10), `context/features/02-zastita-api-ja-done.md`, EmailJS dokumentacija za `emailjs.send` (instalirana verzija `@emailjs/browser` 4.4.1)
- Pre migracije (27.11.2026.): produkcija 16 postova, svi admina; dev 18 (17 admina + test post `novi-slug-za-post` korisnika „Rubi Spava")
- Migracija: post bez `approved` dobija `true` ako je admina, a `false` ako nije (čeka odobrenje) — na produkciji isto kao u specu jer su svi postovi admina; odluka vlasnika (27.11.2026.): odobreno
- Filter za čekanje je `approved: { $ne: true }`, da nijedan post ne ispadne iz obe liste
- `GET /api/posts/[slug]` sada vraća 404 i za nepostojeći slug (ranije 200 sa `null`)
- Ceo post u admin sekciji prikazuje se postojećim `SlugCard` sa bloga (isti izgled kao na `/blog/[slug]`). Odluka vlasnika (27.11.2026.): u 05 ostaje uvoz iz `app/blog/[slug]/`; premeštanje `SlugCard`-a sa stilovima i komentarima u `src/components/` zapisano u feature 10
- `POST /api/posts` vraća `{ slug, approved }`; dashboard šalje mejl samo kad je `approved === false`
- Nove poruke (`messages.js`), odluka vlasnika (27.11.2026.): odobrene — „Only the admin can do this.", „Only { approved: true } can be sent.", „Something went wrong. The post was not approved.", „Something went wrong. Posts awaiting approval were not loaded."
- `/dashboard` je sada dinamička stranica (čita sesiju za proveru admina); odluka vlasnika (27.11.2026.): iz komentara u `dashboard/page.jsx` uklonjeno „stays static and", jer više nije tačno
- Ručni test vlasnika (27.11.2026.): sve stavke iz Testiranja prolaze (test korisnik, mejl, 403 iz konzole, admin sekcija, Approve, Delete, vlasnikov post odmah na blogu)
- Ostaje: migracija produkcije (`npm run db:migrate-05 -- --target production --apply`) uz odobrenje vlasnika, neposredno pre merge-a u `master`; Preview build na Vercel-u posle push-a
- Backup produkcije `jovicData-2026-11-27_18-49`; kopija u dev nije bila potrebna (dev već ima svih 16 produkcionih postova, plan: insert 0); migracija na dev urađena (17 → `true`, 1 → `false`)
- `/blog/<neodobren>` vraća HTTP 200 sa 404 sadržajem (`loading.jsx` streaming, isto kao portfolio u 04)

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

### Friday, 27.11.2026. | 20:13 — Odobravanje postova

Na javni blog sada ide samo ono što vlasnik odobri. Postovi vlasnika se objavljuju odmah, a postovi svih ostalih čekaju odobrenje i ne vide se ni u listi bloga ni na sopstvenoj adresi, gde posetilac dobija stranicu za nepostojeću adresu. O tome da li post čeka odlučuje server po nalogu iz sesije, a ne po podacima koje šalje browser. Autor u svom dashboard-u vidi i postove na čekanju sa oznakom „Awaiting approval" i može da ih obriše, pa regruter i dalje prolazi ceo krug bez vlasnika. Vlasnik na vrhu dashboard-a, iznad forme, ima sekciju sa postovima na čekanju; svaka kartica prikazuje naslov, autora i datum, a ceo post se otvara u istom izgledu kao na blogu. Odobravanje i brisanje sme samo vlasnik, server to proverava pri svakom zahtevu, a odobravanje prihvata isključivo promenu statusa i ništa drugo. Kad neko drugi napravi post, vlasniku stiže mejl kroz isti template kao kontakt forma, a neuspelo slanje ne obara čuvanje posta. Pravila pristupa, filteri za liste i sadržaj mejla su izdvojeni i pokriveni testovima.

Postojećim postovima migracija upisuje status: postovi vlasnika ostaju javni, a tuđi čekaju odobrenje. Vlasnik je odobrio ovo pravilo umesto da svi stari postovi budu odobreni, jer na produkciji daje isti rezultat, pošto su svih 16 postova njegovi, a nijedan tuđi post ne može da bude odobren bez njega. Napravljen je backup produkcije, a na dev bazi je migracija označila 17 postova vlasnika kao javne i jedan test post kao post na čekanju. Migracija produkcije se pokreće uz odobrenje vlasnika, neposredno pre spajanja u glavnu granu. Usput je adresa nepostojećeg posta počela da vraća ispravan odgovor za nepostojeću stranicu. Odobrene su i nove poruke o greškama, a jedan postojeći komentar je uz odobrenje vlasnika skraćen jer više nije bio tačan. Komponenta za prikaz posta sa bloga koristi se i u dashboard-u, a njeno premeštanje među zajedničke komponente, zajedno sa stilovima i komentarima, zapisano je za poslednji feature. Lint, testovi, provera stilova i formata i production build prolaze, a vlasnik je ručno proverio ceo tok na dev bazi.
