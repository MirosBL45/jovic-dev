# 05 — Odobravanje postova

## Pregled

Faza 3, fajl 1/2. Blog ostaje otvoren za registraciju, ali na javni blog ide samo ono što vlasnik odobri. Postovi vlasnika se objavljuju odmah. Neodobren post se briše. Vlasnik dobija mejl kad post čeka odobrenje.

## Zahtevi

- **Model Post**: polje `approved` (Boolean, default `false`).
- **Pravljenje**: `approved = true` ako je autor admin, inače `false` — određuje server, po `ownerId` iz sesije.
- **Javni prikaz**: `/blog` i `/blog/[slug]` prikazuju samo `approved: true`. Neodobren post na `/blog/[slug]` → 404 za sve.
- **Dashboard — autor**: u svojim postovima vidi i neodobrene, sa oznakom „Awaiting approval", i može da ih obriše.
- **Dashboard — admin**: sekcija „Posts awaiting approval (N)" na vrhu dashboard-a, iznad forme za pravljenje posta. Svaka kartica prikazuje naslov, autora i datum; na „Show full post" kartica se proširi i pokaže ceo sadržaj (oba headline-a, oba opisa, oba sadržaja, obe slike), na „Hide full post" se skupi. Dugmad „Approve" i „Delete" (brisanje = odbijanje, uz potvrdu kroz postojeći `DeletePopUp`). Po pravilu server/klijent: serverska `dashboard/page.jsx` (iz feature-a 02) proverava sesiju preko `getServerSession` i sekciju renderuje samo za admina; sama sekcija je posebna klijentska komponenta.
- **API**:
  - `GET /api/posts` (javno) → samo odobreni
  - `GET /api/posts?mine=1` → svoji, i odobreni i neodobreni
  - `GET /api/posts?pending=1` → samo admin (403 za ostale), svi neodobreni
  - `GET /api/posts/[slug]` (javno) → 404 ako nije odobren
  - `PATCH /api/posts/[slug]` sa `{ approved: true }` → samo admin; druga polja se ne prihvataju
  - `DELETE` po pravilima iz 02 (vlasnik ili admin)
  - pravila i filteri kao čiste funkcije u `src/utils/`, sa testovima
- **Obaveštenje (EmailJS)**: kad ne-admin uspešno napravi post (201), dashboard šalje mejl preko postojećeg contact template-a — `emailjs.send` sa istim `SERVICE_BASE`, `TEMPLATE_BASE` i `PUBLIC_BASE` kao kontakt forma. Template koristi polja iz kontakt forme: `user_name` = „Blog: new post awaiting approval", `user_email` = email autora iz sesije, `message` = naslov, autor, slug i link `https://miroslavjovic.com/dashboard`. Neuspeh slanja mejla ne obara pravljenje posta — samo log.
- **Migracija** `scripts/migrate-05-approved.mjs`: svim postovima bez polja `approved` upisuje `approved: true` (svi postojeći su vlasnikovi). Isti obrazac kao u 02: backup produkcije → kopija u dev → dry-run i `--apply` na dev → produkcija uz odobrenje, neposredno pre merge-a u `master`.

## Napomene

- Odluke vlasnika (04.11.2026.): neodobren post se briše; obaveštenje ide kroz isti EmailJS template kao kontakt forma; regruter treba da može da prođe ceo krug (napravi, vidi u svom dashboard-u, obriše) bez vlasnika.
- EmailJS ključevi su javni po dizajnu (browser SDK); slanje iz browser-a je prihvaćeno jer je ovo obaveštenje, ne sigurnosna mera.
- Koristiti postojeće komponente i stilove dashboard-a (`Popup`, `DeletePopUp`, `ClickButton`, kartice postova); novi stilovi u `.module.scss` + `sass:file`.
- Ovaj feature ne uvodi izmenu posta (06).

## Odluke vlasnika (04.11.2026.)

1. Tekstovi: oznaka „Awaiting approval", naslov sekcije „Posts awaiting approval (N)", dugmad „Approve" i „Delete", proširivanje „Show full post" / „Hide full post"; mejl kao u Zahtevima
2. Admin sekcija je na vrhu dashboard-a, iznad forme; ceo post se vidi proširivanjem kartice, bez modala

## Testiranje

1. Vitest: ko sme da odobri (admin, ne-admin, bez sesije), filteri za javnu listu, `mine` i `pending`, vrednost `approved` pri pravljenju
2. Test korisnik pravi post → nema ga na `/blog` ni na `/blog/<slug>` (404); u njegovom dashboard-u stoji oznaka čekanja; vlasniku stiže mejl
3. Vlasnik vidi post na čekanju sa celim sadržajem; „Approve" → post se pojavljuje na `/blog`; drugi post „Delete" → nestaje i iz autorovog dashboard-a
4. Vlasnikov nov post je odmah na `/blog`
5. Ulogovan kao test korisnik, `fetch` iz konzole: `PATCH` → 403, `?pending=1` → 403
6. Posle migracije na dev svi stari postovi su i dalje na `/blog`
7. `npm run lint`, `npm run test`, `npm run build` prolaze

## Reference

- @context/project-overview.md (poglavlja 8, 9, 10)
- @context/features/02-zastita-api-ja-done.md
- EmailJS dokumentacija za `emailjs.send` (za instaliranu verziju `@emailjs/browser`)
