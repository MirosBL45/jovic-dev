# 00 — Alati i radni tok

## Pregled

Faza 0, fajl 1/2. Postavlja se radni tok za doradu jovic-dev projekta nakon dosta vremena: `develop` branch, context fajlovi i skills, Prettier sa jednim commit-om koji formatira ceo projekat, Vitest, `sass` komanda za Claude Code i osnovna higijena repoa. Ponašanje i izgled sajta se ne menjaju.

## Zahtevi

- **Branch-evi**: iz `master`-a napraviti `develop` i push-ovati ga; zatim iz `develop`-a napraviti `feature/alati-i-radni-tok`. Ovo je jedini put da se `develop` pravi iz `master`-a — posle toga `master` se ne dira.
- **Context fajlovi i skills**: `CLAUDE.md`, `AGENTS.md`, `context/`, `.claude/skills/`, `.github/PULL_REQUEST_TEMPLATE.md` — vlasnik ih je ubacio u repo pre starta (još nisu commit-ovani). Idu u prvi commit ovog feature-a, bez izmena; ako nešto u njima ne odgovara stanju repoa → pitati, ne ispravljati.
- **Node**: proveriti `node -v`. Minimum je 20.9 (traži ga Next 16 u feature-u 04, a skripte iz feature-a 01 koriste `node --env-file`). Ako je verzija niža, voditi vlasnika kroz instalaciju aktuelnog LTS-a (Linux, preko `nvm`), korak po korak.
- **`.gitignore`**: dodati `.env*` uz izuzetak `!.env.example`, zatim `backups/` i `.vercel`. Pre toga proveriti `git ls-files | grep -i env` — ako je neki env fajl već commit-ovan, stati i reći vlasniku.
- **`.env`**: obratiti pažnju. Na početku ove dorade u projektu ima 8 ključeva. to su: NEXT_PUBLIC_MAIN_PUBLIC_KEY, NEXT_PUBLIC_SERVICE_KEY, NEXT_PUBLIC_TEMPLATE_KEY, NEXT_PUBLIC_NAME_OF_LINK, MONGO_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET. Na vercel za 3 kluča stoji ovo `IT looks like a secret, but its value is visible to anyone with access. Consider rotating at the source and saving as Secret.` Ta 3 ključa su MONGO_URL, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET. Napomenuti programeru u toku rada kako to srediti i gde treba da se sredi kada za to dođe pravo vreme.
- **`.env.example`**: imena svih env varijabli koje projekat koristi, prazne vrednosti, kratak komentar po grupi (MongoDB, NextAuth i Google, EmailJS, base URL). Imena potvrditi sa vlasnikom: on pokrene `grep -o '^[A-Z_]*' .env.local` (ispisuje samo imena, bez vrednosti) i nalepi rezultat. Varijable koje kod ne čita direktno, a postoje kod vlasnika (npr. `NEXTAUTH_URL`, `NEXTAUTH_SECRET`), takođe idu u `.env.example`.
- **Prettier**: `prettier` kao devDependency; skripte `"format": "prettier --write ."` i `"format:check": "prettier --check ."`.
  - `.prettierrc`:
    ```json
    {
      "semi": true,
      "singleQuote": false,
      "jsxSingleQuote": false,
      "tabWidth": 2,
      "useTabs": false,
      "trailingComma": "es5",
      "printWidth": 100,
      "arrowParens": "always",
      "bracketSpacing": true
    }
    ```
  - `.editorconfig`:
    ```
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
    ```
  - `.prettierignore`: `context/`, `.claude/`, `public/`, `package-lock.json`, `backups/` i `src/**/*.module.css` (generišu ih Live Sass Compiler i `sass:file` — Prettier ne sme da im menja format)
- **`.vscode/settings.json`**: Prettier kao default formatter i `editor.formatOnSave`, uključujući `[scss]`. Bez `workbench.colorCustomizations` i bez ESLint ključeva (ESLint se podešava u 04). Live Sass Compiler podešavanja vlasnik ima u svom VS Code-u i ne dodaju se ovde.
- **Formatirajući commit**: posle commit-a sa context fajlovima i alatima, posebno: `npm run format`, pa commit `style: format codebase with prettier`. U tom commit-u ne sme biti nikakva druga izmena. Pre commit-a: `git diff --stat`, `npm run build` prolazi, `npm run sass:check` prolazi, a na uzorku fajlova proveriti da je tekst komentara ostao identičan (Prettier sme da menja samo razmake, prelome i navodnike u kodu).
- **SCSS komande**: `sass` kao devDependency.
  - `"sass:file": "sass --no-source-map --style=expanded"` — upotreba: `npm run sass:file -- src/putanja/ime.module.scss src/putanja/ime.module.css`
  - `scripts/check-scss-sync.mjs` + `"sass:check": "node scripts/check-scss-sync.mjs"`: za svaki `.module.scss` u `src/` kompajlira u memoriji (sass JS API, isti stil `expanded`) i poredi sa `.module.css` pored njega, ignorišući prazne redove i razlike u razmacima; ispisuje fajlove koji se ne poklapaju (ili fali `.css`) i vraća exit code 1 ako ih ima
  - Ne regenerisati svih 25 `.css` fajlova odjednom — Live Sass Compiler i sass CLI se razlikuju u praznim redovima, pa bi to bio diff bez sadržaja
- **Vitest**: `vitest` kao devDependency; skripte `"test": "vitest run"` i `"test:watch": "vitest"`; `vitest.config.mjs`:
  ```js
  import { fileURLToPath } from "node:url";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    test: {
      environment: "node",
    },
  });
  ```
  Prvi testovi: `src/utils/GeneralFunctions.test.js` za postojeće `isValidEmail`, `isInputLengthValid`, `areAllFieldsFilled` i `formatDate` — bez menjanja samih funkcija.
- **README**: sekcija za razvoj — preduslovi (Node), komande, radni tok sa branch-evima, `.env.example`, pravilo za SCSS (Live Sass Compiler ili `sass:file`, nikad ručna izmena `.module.css`).
- **Lint**: ne dirati u ovom feature-u (`next lint` u 14 nema konfiguraciju i pita interaktivno; ESLint se podešava u 04).

## Napomene

- Context fajlovi su prilagođeni iz camera-motion projekta koji programer već zna da koristi (isti sistem: feature skill, cleanup skill, History u `current-feature.md`).
- Formatirajući commit je namerno odvojen, da budući review i `git blame` ostanu čitljivi.
- Redosled commit-ova: (1) context fajlovi, skills i PR template; (2) alati — `.gitignore`, `.env.example`, Prettier konfiguracija, `sass`, Vitest, skripte, README; (3) formatiranje celog projekta. Tačne poruke predložiti vlasniku pre svakog commit-a.

## Testiranje

1. `npm run test` prolazi (testovi za GeneralFunctions)
2. `npm run sass:check` prolazi (svih 25 parova se poklapa) i pre i posle formatiranja
3. `npm run format:check` prolazi posle formatirajućeg commit-a
4. `npm run build` prolazi; sajt lokalno izgleda i radi isto kao pre
5. `git ls-files | grep -i env` pokazuje samo `.env.example`

## Reference

- @context/project-overview.md (poglavlja 3, 5, 13, 14)
- @context/coding-standards.md (Styling, Testing, Formatting)
- @context/ai-interaction.md (Workflow, Branching, Commits)
