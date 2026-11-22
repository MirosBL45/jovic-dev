# 01 — Dev okruženje i backup

## Pregled

Faza 0, fajl 2/2. Lokalni razvoj prestaje da koristi produkcionu bazu: dev baza na istom Atlas cluster-u, Vercel Preview na dev bazi, Google login na localhost-u i alat za backup i vraćanje baze. Kod sajta se ne menja — samo skripte, env i dokumentacija. Vlasnik dugo nije radio u MongoDB Atlas-u, pa se svaki korak u Atlas-u, Vercel-u i Google Cloud Console-u objašnjava klik po klik.

## Zahtevi

- **Stanje pre svega**: read-only skripta `scripts/db-info.mjs`, argument `--source production|dev` (`production` čita `MONGO_URL_PRODUCTION`, `dev` čita `MONGO_URL`) — ispisuje ime baze (`mongoose.connection.name`), host, kolekcije i broj dokumenata u svakoj (i veličinu, ako Atlas M0 dozvoli `dbStats`). Ne ispisuje sadržaj dokumenata ni connection string. Prvi put se pokreće pre podele env-a (tada je `MONGO_URL` još produkcija), da se utvrdi tačno ime produkcione baze — komentari u modelima pominju `jovicData`, ali važi ono što skripta ispiše.
- **Env podela lokalno** (`.env.local`):
  - `MONGO_URL_PRODUCTION` = sadašnji connection string (produkcija) — koriste ga samo skripte, sajt ga nikad ne čita
  - `MONGO_URL` = isti cluster, druga baza `<ime>-dev` (npr. `jovicData-dev`) — menja se samo ime baze u putanji connection string-a. Claude Code objasni tačno koji deo stringa se menja, a vlasnik izmenu radi sam (connection string se ne lepi u chat)
  - dopuniti `.env.example`
- **Backup** `scripts/backup-db.mjs`, argument `--source production|dev`: izvozi sve kolekcije u `backups/<ime-baze>-<YYYY-MM-DD_HH-mm>/<kolekcija>.json` kao Extended JSON (`EJSON` iz mongodb drajvera koji dolazi uz mongoose), da `ObjectId` i `Date` prežive vraćanje. JSON je čitljiv, pa iz njega vlasnik u najgorem slučaju može i ručno da prepiše postove. Na kraju ispisuje broj dokumenata po kolekciji i veličinu fajlova.
- **Restore** `scripts/restore-db.mjs`, argumenti `--from <folder backup-a>` i `--target production|dev`:
  - podrazumevano dry-run (ispiše šta bi uradio)
  - stvarni upis tek sa `--apply`
  - za `--target production` dodatno traži da vlasnik u terminalu otkuca ime produkcione baze kao potvrdu
  - postojeće dokumente u ciljnoj kolekciji ne briše bez posebnog `--drop` flaga (koji takođe traži potvrdu)
- **Kopija produkcije u dev**: backup produkcije, pa restore tog backup-a u dev bazu. `db-info` na dev bazi posle toga pokazuje iste kolekcije i brojeve kao produkcija.
- **Vercel Preview env**: voditi vlasnika da u Vercel projektu `MONGO_URL` za okruženje **Preview** postavi na dev bazu (Production ostaje produkcija). Proveriti i koje NextAuth varijable postoje za Preview. Google login na preview URL-ovima neće raditi (URL se menja po deployment-u) — to je prihvaćeno, admin delovi se testiraju lokalno.
- **Google login na localhost-u**: voditi vlasnika kroz Google Cloud Console da u OAuth klijentu koji sajt koristi proveri ili doda `http://localhost:3000/api/auth/callback/google` u Authorized redirect URIs. U `.env.local`: `NEXTAUTH_URL=http://localhost:3000` i `NEXTAUTH_SECRET` (ako ga nema, objasniti kako se generiše).
- **npm skripte**: `db:info`, `db:backup`, `db:restore` — sve preko `node --env-file=.env.local`; argumenti se prosleđuju posle `--`.
- **README**: sekcija „Baza i backup" — razlika dev i produkcija, kako se pravi backup, kako se vraća, gde su backup-i i da se nikad ne commit-uju.

## Napomene

- `backups/` je u `.gitignore` (feature 00). Backup sadrži email adrese i hash-eve lozinki — ostaje samo na vlasnikovom računaru.
- Skripte su Node ESM u `scripts/`, bez novih zavisnosti; ne importuju Next kod.
- Svaka skripta na početku ispiše na koju bazu ide (ime baze i host, bez korisnika i lozinke).
- Ovo je osnova za migracije u feature-ima 02 i 05: backup produkcije → proba na dev kopiji → produkcija uz odobrenje.
- Obe baze dele 512 MB besplatnog cluster-a; `db-info` pokazuje koliko mesta zauzima kopija.

## Testiranje

1. `db:info` na produkciji i na dev bazi posle kopiranja pokazuje iste kolekcije i isti broj dokumenata
2. Backup folder postoji, JSON fajlovi se otvaraju i sadrže postove sa slikama
3. Restore u dev bez `--apply` samo ispisuje plan; sa `--apply` upisuje; `--target production` traži kucanje imena baze
4. Lokalni sajt radi na dev bazi: blog lista i postovi se prikazuju; login preko Google-a i preko email-a i lozinke radi; dashboard se otvara
5. `git status` ne prikazuje ništa iz `backups/` ni `.env.local`

## Reference

- @context/project-overview.md (poglavlja 8, 13, 14)
- @context/features/00-alati-i-radni-tok-done.md
- MongoDB Atlas, Vercel i Google Cloud Console dokumentacija — proveriti aktuelni izgled UI-ja pre davanja uputstava
