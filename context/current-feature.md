# Current Feature: 00 — Alati i radni tok

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- `develop` napravljen iz `master`-a i push-ovan, a rad teče na `feature/alati-i-radni-tok` iz `develop`-a
- Context fajlovi, skills i PR template commit-ovani bez izmena
- Node je najmanje 20.9
- `.gitignore` pokriva `.env*` (uz izuzetak `!.env.example`), `backups/` i `.vercel`; nijedan pravi env fajl nije u git-u
- `.env.example` sadrži imena svih env varijabli, prazne vrednosti i kratak komentar po grupi
- Prettier podešen (`.prettierrc`, `.editorconfig`, `.prettierignore`, `format` i `format:check`)
- `.vscode/settings.json` sa Prettier-om kao default formatter-om i `formatOnSave`, uključujući `[scss]`
- `sass` komande rade: `sass:file` i `sass:check` (`scripts/check-scss-sync.mjs`)
- Vitest podešen, sa prvim testovima za `isValidEmail`, `isInputLengthValid`, `areAllFieldsFilled` i `formatDate`
- README ima sekciju za razvoj: preduslovi, komande, branch-evi, `.env.example`, pravilo za SCSS
- Ceo projekat formatiran u posebnom commit-u `style: format codebase with prettier`, bez ikakve druge izmene
- `npm run test`, `npm run sass:check`, `npm run format:check` i `npm run build` prolaze; sajt izgleda i radi isto kao pre

## Notes

<!-- Any extra notes -->

- Redosled commit-ova: (1) context fajlovi, skills i PR template; (2) alati; (3) formatiranje celog projekta. Poruke se predlažu vlasniku pre svakog commit-a
- `master` se ne menja; `develop` se iz njega pravi samo ovaj put
- Lint se ne dira (podešava se u feature-u 04)
- Ne regenerisati svih 25 `.module.css` fajlova odjednom
- Komentari u kodu moraju ostati identični posle formatiranja
- Podsetiti vlasnika kako i kada da sredi `MONGO_URL`, `GOOGLE_CLIENT_SECRET` i `NEXTAUTH_SECRET`, koje Vercel označava kao vidljive tajne
- Odluka vlasnika: `sass:check` hex boje poredi bez obzira na veličinu slova, jer Prettier menja `#F4F0FF` u `#f4f0ff` u `src/app/dashboard/page.module.scss`; nijedan `.module.css` se zbog toga ne dira
- Odluka vlasnika: `.env.example` sadrži 8 potvrđenih ključeva iz `.env` (`NEXT_PUBLIC_MAIN_PUBLIC_KEY`, `NEXT_PUBLIC_SERVICE_KEY`, `NEXT_PUBLIC_TEMPLATE_KEY`, `NEXT_PUBLIC_NAME_OF_LINK`, `MONGO_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`) i `NEXTAUTH_URL`, sve sa praznim vrednostima

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
