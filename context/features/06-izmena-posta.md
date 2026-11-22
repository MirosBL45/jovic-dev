# 06 — Izmena posta (Update)

## Pregled

Faza 3, fajl 2/2. Blog dobija i Update, pa je CRUD kompletan. Autor menja svoj post; posle izmene post ponovo čeka odobrenje vlasnika, jer neko može da ubaci neprimeren sadržaj. Izmene vlasnika se objavljuju odmah.

## Zahtevi

- **Ko sme**: samo vlasnik posta (`ownerId`). Admin ne menja tuđe postove — on ih odobrava ili briše. Pravilo kao čista funkcija u `src/utils/`, sa testom.
- **`PUT /api/posts/[slug]`**:
  - bez sesije 401; post ne postoji 404; nije vlasnik 403
  - ista polja i ista validacija kao pri pravljenju (modul iz 02); slike su pri izmeni opcione — ako nisu poslate, ostaju postojeće; ako jesu, važi limit od 1 MB
  - `slug`, `ownerId`, `username` i `createdAt` se ne menjaju (slug ostaje isti da linkovi ne pucaju)
  - posle izmene: `approved = true` ako je autor admin, inače `false` — post ne-admina tada nestaje sa javnog bloga dok ga vlasnik ponovo ne odobri (čuva se samo jedna verzija posta)
- **Dashboard**:
  - dugme „Edit" na svakom svom postu
  - forma za pravljenje služi i za izmenu: naslov forme „Edit Post" umesto „Add New Post", popunjena postojećim vrednostima, prikazane trenutne slike, slug zaključan; dugme za slanje „Save changes" (dok se čuva: „Saving changes..."); dugme „Cancel" vraća formu u režim pravljenja
  - nove klijentske delove (dugme „Edit", režim izmene) praviti kao posebne komponente, po pravilu server/klijent
  - provera `res.ok`, greške i Popup-ovi isto kao kod pravljenja
  - posle izmene ne-admina: oznaka čekanja i EmailJS obaveštenje vlasniku (obrazac iz 05, u poruci naznačeno da je u pitanju izmena)
- **Admin sekcija iz 05**: izmenjen post se pojavljuje među postovima na čekanju sa naznakom da je izmenjen (šema ima `timestamps`, pa `updatedAt` postoji).

## Napomene

- Ako izdvajanje forme iz `DashboardClient.jsx` (feature 02) u posebnu komponentu znači premeštanje postojećih komentara → pitati vlasnika pre toga.

## Odluke vlasnika (04.11.2026.)

1. Izmena posta ne-admina čeka novo odobrenje; slug se ne menja posle kreiranja
2. Izmenjen post nestaje sa javnog bloga dok ga vlasnik ponovo ne odobri — nema čuvanja dve verzije
3. Tekstovi: „Edit", „Edit Post", „Save changes", „Saving changes...", „Cancel"

## Testiranje

1. Vitest: ko sme da menja, koja polja se prihvataju, `approved` posle izmene, opcione slike
2. Test korisnik menja svoj odobren post → post nestaje sa `/blog`, ima oznaku čekanja, vlasniku stiže mejl; posle odobrenja na `/blog` je nova verzija sa istim slug-om
3. Izmena bez novih slika zadržava stare slike
4. Pokušaj izmene tuđeg posta (`fetch` iz konzole) → 403
5. Vlasnik menja svoj post → izmena je odmah na `/blog`
6. `npm run lint`, `npm run test`, `npm run build` prolaze

## Reference

- @context/features/02-zastita-api-ja.md
- @context/features/05-odobravanje-postova.md
