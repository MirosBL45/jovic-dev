**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/bitne-stvari.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint` (radi od feature-a 04; do tada `next lint` nema konfiguraciju)
- **Test**: `npm run test` (single run) ili `npm run test:watch` (od feature-a 00)
- **Format**: `npm run format` i `npm run format:check` (od feature-a 00)
- **SCSS → CSS, jedan fajl**: `npm run sass:file -- putanja/ime.module.scss putanja/ime.module.css` (od feature-a 00)
- **Provera da li se svaki `.module.css` poklapa sa svojim `.module.scss`**: `npm run sass:check` (od feature-a 00)
- **Baza**: `npm run db:info`, `npm run db:backup`, `npm run db:restore` (od feature-a 01)

**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages
**INFO:** If there is changed name of some files, I done it, and that also goes to GitHub

# Pravila implementacije — jovic-dev (miroslavjovic.com)

- Radi feature po feature; ne gradi ništa što nije eksplicitno traženo u toj sesiji.
- Izvor istine za IZGLED je postojeći sajt — vizuelne promene samo kad ih feature fajl izričito traži.
- Izvor istine za funkcionalnost i arhitekturu: context/project-overview.md + feature fajl. Kratke odluke vlasnika: context/bitne-stvari.md.
- Nedoumica ili sukob smernica → PRVO PITATI sa objašnjenjem problematike.
- Ne dirati postojeće komentare u kodu. Ako izmena traži brisanje ili premeštanje koda uz koji stoji komentar → pitati pre toga.
- Projekat ostaje JavaScript (bez TypeScript-a).
- Sve što može da bude serversko je serversko; ono što mora da bude klijentsko ide u posebnu `'use client'` komponentu koja se uvozi u serversku. Važi za sve novo i izmenjeno.
- Stilovi: menja se `.module.scss`, pa se `.module.css` pored njega regeneriše sa `npm run sass:file`. `.module.css` se nikad ne menja ručno. `globals.css` nema SCSS i menja se direktno.
- Sav vidljivi tekst na sajtu je na engleskom.
- Identitet korisnika uvek iz sesije na serveru, nikad iz body-ja request-a.
- Kredencijali samo u env varijablama; ništa osetljivo pod NEXT_PUBLIC_.
- U produkcionu bazu se ne upisuje bez izričitog odobrenja vlasnika; pre svake migracije backup produkcije, pa proba na dev bazi.
- Za sve korake van koda (MongoDB Atlas, Vercel, Google Cloud Console, EmailJS, VS Code) voditi vlasnika klik po klik.
- Posle svakog feature-a: `npm run test` i `npm run build` moraju proći bez grešaka (od feature-a 04 i `npm run lint`).
- Od feature-a 04, `next dev` može sam da doda blok „nextjs-agent-rules" na vrh ovog fajla — zadržati ga i commit-ovati.
