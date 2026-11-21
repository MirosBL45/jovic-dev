# Current Feature: 01 — Dev okruženje i backup

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- `scripts/db-info.mjs` (read-only), `--source production|dev`: ispisuje ime baze, host, kolekcije i broj dokumenata (i veličinu, ako M0 dozvoli `dbStats`), bez sadržaja dokumenata i bez connection string-a
- `db:info` pokrenut na produkciji pre podele env-a, da se utvrdi tačno ime produkcione baze
- Lokalni env podeljen: `MONGO_URL_PRODUCTION` = produkcija (samo za skripte), `MONGO_URL` = dev baza `<ime>-dev` na istom cluster-u; vlasnik sam menja ime baze u connection string-u
- `.env.example` dopunjen sa `MONGO_URL_PRODUCTION`
- `scripts/backup-db.mjs`, `--source production|dev`: sve kolekcije u `backups/<ime-baze>-<YYYY-MM-DD_HH-mm>/<kolekcija>.json` kao Extended JSON; na kraju broj dokumenata po kolekciji i veličina fajlova
- `scripts/restore-db.mjs`, `--from <folder>` i `--target production|dev`: podrazumevano dry-run, upis tek sa `--apply`, za produkciju potvrda kucanjem imena baze, brisanje postojećih dokumenata samo uz `--drop` (sa potvrdom)
- Produkcija kopirana u dev (backup → restore); `db:info` na dev bazi pokazuje iste kolekcije i brojeve kao produkcija
- Vercel: `MONGO_URL` za Preview pokazuje na dev bazu, Production ostaje produkcija; proverene NextAuth varijable za Preview
- Google login radi na localhost-u: `http://localhost:3000/api/auth/callback/google` u Authorized redirect URIs; `NEXTAUTH_URL=http://localhost:3000` i `NEXTAUTH_SECRET` lokalno
- npm skripte `db:info`, `db:backup`, `db:restore` preko `node --env-file=.env.local`, argumenti posle `--`
- README ima sekciju „Baza i backup"
- Lokalni sajt radi na dev bazi: blog lista i postovi, login preko Google-a i email-a, dashboard
- `git status` ne prikazuje ništa iz `backups/` ni `.env.local`; `npm run test` i `npm run build` prolaze

## Notes

<!-- Any extra notes -->

- Kod sajta se ne menja — samo skripte, env i dokumentacija
- Skripte su Node ESM u `scripts/`, bez novih zavisnosti, ne importuju Next kod; svaka na početku ispiše ime baze i host (bez korisnika i lozinke)
- Connection string, lozinke i tajne vlasnik nikad ne lepi u chat — Claude Code kaže tačno koji deo i gde da upiše sam
- Svaki korak u Atlas-u, Vercel-u i Google Cloud Console-u objasniti klik po klik, uz prethodnu proveru aktuelnog UI-ja u dokumentaciji
- U produkcionu bazu se ne upisuje; restore ide samo u dev bazu
- Backup sadrži email adrese i hash-eve lozinki — ostaje samo na vlasnikovom računaru (`backups/` je u `.gitignore`)
- Obe baze dele 512 MB besplatnog cluster-a
- Google login na preview URL-ovima ne radi — prihvaćeno, admin delovi se testiraju lokalno
- Osnova za migracije u feature-ima 02 i 05: backup produkcije → proba na dev kopiji → produkcija uz odobrenje
- Odluka vlasnika: sve iz `.env` prelazi u `.env.local`, a `.env` se briše — jedan env fajl lokalno, bez tihog pada na produkciju (vlasnik uradio sam pre starta; `.env.local` ima svih 8 ključeva, `MONGO_URL` je još produkcija, `NEXTAUTH_URL` se dodaje u ovom feature-u)
- Odluka vlasnika: skripte u `scripts/` su izuzetak od pravila „konekcija samo preko `connectToDB`" — same zovu `mongoose.connect` sa URL-om izabranim po `--source`/`--target`
- `db:info` na produkciji (21.11.2026.): baza `jovicData`, `posts` 16, `users` 2, storage 4,2 MB; dev baza je `jovicData-dev`
- Lokalno na dev bazi (21.11.2026.): blog radi, Google login radi, registracija i login email-om rade (test korisnik samo u `jovicData-dev`). Google nalozi se ne upisuju u `users` — očekivano
- Dashboard prikazuje 1 od 16 postova jer 15 postova ima `username` „Miroslav Jovic", a jedan i sadašnje Google ime „Miroslav Jović" — postojeći problem vezivanja za ime, rešava se `ownerId` migracijom u feature-u 02 (svih 16 postova pripada vlasnikovom Google nalogu)
- Vercel env (21.11.2026.): svih 8 ključeva na „All Environments"; `NEXTAUTH_URL` ne postoji (nije potreban — next-auth v4 na Vercel-u uzima host iz request-a); `NEXT_PUBLIC_NAME_OF_LINK` = `https://jovic-dev.vercel.app` (produkcija) za sva okruženja → na Preview-u `/blog`, `/blog/[slug]` i provera slug-a u dashboard-u čitaju produkciju preko njenog API-ja (samo čitanje); svi upisi (pravljenje i brisanje posta, registracija, login email-om) idu relativno, na preview API → dev baza. Trajno rešenje: feature 10 (server stranice čitaju bazu direktno)
- Bez `--drop`, restore preskače dokumente čiji `_id` već postoji u cilju; restore u dev odbija rad ako `MONGO_URL` i `MONGO_URL_PRODUCTION` pokazuju na istu bazu ili ako `MONGO_URL_PRODUCTION` nije postavljen
- `npm run build` prerenderuje `/blog` preko `fetch`-a ka `NEXT_PUBLIC_NAME_OF_LINK` (`localhost:3000`), pa lokalni build pada kad dev server ne radi — postojeće ponašanje, rešava se u feature-u 10. Do tada se build pokreće sa `$env:NEXT_PUBLIC_NAME_OF_LINK = 'https://jovic-dev.vercel.app'; npm run build` (samo javno čitanje, kao na Vercel-u); tako je 21.11.2026. prošao
- `format:check` je lokalno padao samo zbog CRLF u radnom folderu (`core.autocrlf=true`), a repo je LF. Odluka vlasnika: `"endOfLine": "auto"` u `.prettierrc`, u ovom feature-u
- Vercel posle 8b: dva reda `MONGO_URL` — Production = `jovicData`, Preview = `jovicData-dev`; `MONGO_URL_PRODUCTION` i `NEXTAUTH_URL` se na Vercel ne dodaju
- Odluka vlasnika: rotacija `MONGO_URL`, `GOOGLE_CLIENT_SECRET` i `NEXTAUTH_SECRET` i ponovno dodavanje kao Secret rade se u feature-u 02 (uz dodavanje `ADMIN_ID` i redeploy produkcije); podsetiti vlasnika na početku 02

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
