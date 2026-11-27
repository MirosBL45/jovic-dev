# 07 — Tema i server rendering

## Pregled

Faza 4, fajl 1/4. Popravlja najveći nalaz iz audita: `ThemeProvider` vraća `null` dok ne pročita temu, pa server šalje prazan `<body>` na svim stranicama, a sadržaj se pojavljuje tek posle JavaScript-a. Tema prelazi na `next-themes`: sadržaj se renderuje na serveru, tema se postavlja pre prvog prikaza (bez bljeska), a sajt prati temu OS-a dok posetilac ne klikne toggle. Izgled u oba moda ostaje isti.

## Zahtevi

- **next-themes**: `ThemeProvider` sa `attribute="class"`, `defaultTheme="system"`, `enableSystem`, klase `light` i `dark` (iste kao u `globals.css`); `<html suppressHydrationWarning>`. Nov `storageKey` (npr. `theme-v2`): stara implementacija je u ključ `theme` upisivala sistemsku temu i bez klika, pa bi sa starim ključem ti posetioci zauvek ostali na staroj temi umesto da prate OS.
- **Toggle**: dva stanja; klik postavlja suprotnu temu od prikazane i to se pamti; bez klika sajt prati OS i odmah reaguje na promenu teme u OS-u. `DarkModeToggle` postaje `<button>` (radi sa tastature, ima `aria-label`), izgled ostaje isti.
- **`src/context/ThemeContext.js`**: komponente više ne zavise od teme pri renderu na serveru. Fajl se svodi na tanak omotač oko `useTheme()` iz next-themes, ili se uklanja ako ga više niko ne koristi — pitati vlasnika pre brisanja.
- **CSS**: klasa je sada na `<html>` i tamo stoji samo `light` ili samo `dark` (danas su obe na `div`-u). Pravila iz `.light` (background, color, transition) moraju da važe u oba moda — preseliti ih na `body` u `globals.css`; `.dark` ostaje izmena CSS varijabli. Omotač `div` sa klasama `light` i trenutne teme (u `ThemeContext.js`) nestaje.
- **Slike i stilovi koji zavise od teme** — server ne zna temu, pa se renderuju obe verzije, a CSS prikazuje pravu (selektori `.dark` / `:not(.dark)` u `.module.scss` → `sass:file`):
  - `src/components/PageComponents/navbar/Navbar.jsx` — logo (crni i beli)
  - `src/components/PageComponents/homePage/landing/Keyboard.jsx` — tastatura i miš
  - `src/components/PageComponents/homePage/about/AboutText.jsx` — kvadrat, linija i boja `hr` linije (sada inline `style` po temi)
  - `src/components/PageComponents/homePage/technologies/Line.jsx` — linija
  - `src/components/UIComponents/DarkModeToggle/DarkModeToggle.jsx` — pozicija kuglice i `title` tekst

  Logo je iznad fold-a, pa obe verzije smeju da se učitaju odmah; ostale slike ostaju lazy.
- **Provera HTML-a**: `scripts/check-ssr-html.mjs` + `"check:ssr": "node scripts/check-ssr-html.mjs"` — posle `npm run build` čita prerenderovan HTML za `/` i `/portfolio` i proverava da `<body>` van `<script>` tagova sadrži naslove (h1–h3) i navigaciju; exit code 1 ako ne.

## Napomene

- Audit (30.10.2026.): u build-ovanom HTML-u za `/` i `/portfolio` `<body>` je prazan, van skripti nema nijednog naslova.
- Odluke vlasnika (04.11.2026.): sajt prati OS dok se ne klikne; toggle ima dva stanja; CSS, SCSS i postojeće CSS varijable ostaju.
- Kombinacija klasa `light dark` na istom elementu je bila namerna i radila je (varijable); sa next-themes je zamenjuje pravilo na `body`.
- `<Scroll />` u `<html>` i relativan import u `layout.js` rešava feature 10, osim ako ovaj feature ionako menja te linije.
- Komponente koje danas koriste temu samo zbog slike ne prepravljati u server komponente u ovom feature-u.
- Iz 04: u `ThemeContext.js` stoji `// eslint-disable-next-line react-hooks/set-state-in-effect` iznad `setMode(stored)` (privremeno, da lint prođe) — kad se fajl prepravi ili ukloni, taj red se briše.
- Iz 04 — skrol: Next 16 više sam ne isključuje `scroll-behavior: smooth` (iz `*` u `globals.css`) pri prelasku na drugu stranicu, pa u dev-u stoji upozorenje `missing-data-scroll-behavior`. Proban je `data-scroll-behavior="smooth"` na `<html>`, ali su tada linkovi na sekcije početne sa druge stranice (npr. `/#about` sa bloga) otvarali vrh početne, a tek drugi klik je skrolovao do sekcije — vlasnik ga je vratio. Verovatan uzrok: sekcija još ne postoji kad Next skroluje, jer početna čeka temu (`ThemeProvider` vraća `null`). Kad server šalje sadržaj, ponovo probati atribut (vidi Testiranje 7) i pitati vlasnika da li ostaje.

## Testiranje

1. `npm run build` pa `npm run check:ssr` prolazi
2. U DevTools isključen JavaScript: početna se vidi sa sadržajem (u light temi, jer bez JS-a nema klase)
3. OS u dark modu, prvi ulazak (prazan localStorage) → sajt je odmah taman, bez bljeska; promena teme u OS-u dok je sajt otvoren → sajt prati
4. Klik na toggle → tema se menja i ostaje posle reload-a; promena u OS-u više ne utiče
5. Oba moda: logo, tastatura i miš, About slike i `hr`, linija u Technologies i kuglica toggle-a izgledaju kao pre
6. Toggle radi i tastaturom (Tab, pa Enter ili Space)
7. Skrol, bez atributa i sa `data-scroll-behavior="smooth"` na `<html>`: sa bloga klik na sekcije početne (About me i ostale `/#...`) → prvi klik vodi pravo na sekciju; sa dna jedne stranice klik na link ka drugoj → nova stranica se otvara na vrhu; dugme za povratak na vrh i dalje glatko skroluje
8. `npm run lint`, `npm run test`, `npm run build`, `npm run sass:check` prolaze

## Reference

- @context/project-overview.md (poglavlje 11)
- next-themes README (aktuelna verzija, App Router)
