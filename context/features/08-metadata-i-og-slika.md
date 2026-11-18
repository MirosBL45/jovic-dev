# 08 — Metadata, OG slika i ikonice

## Pregled

Faza 4, fajl 2/4. Sređuje metadata: `metadataBase`, prava OG slika 1200×630 umesto favicon-a, ikonice po Next konvencijama, title template, kraći i jedinstveni description-i, statičko generisanje portfolio kategorija, `sitemap.xml` i `robots.txt`. `keywords` i `alt` tekstovi sa imenom ostaju.

## Zahtevi

- **`metadataBase`**: `new URL('https://miroslavjovic.com')` u root layout-u. Build danas upozorava da ga nema, a na Vercel-u se og:image vezivao za URL jednog deployment-a.
- **Title template** u root layout-u: `title: { default, template }` (predlog: default „Miroslav Jović | Frontend Developer", template „%s | Miroslav Jović"); stranice postavljaju samo svoj deo.
- **Description**: po jedan za svaku javnu stranicu, do ~155 karaktera, bez istog teksta na više stranica. `openGraph` i `twitter` koriste iste vrednosti — definisati jednom, ne kopirati tri puta.
- **Tekstovi**: Claude Code predlaže sve nove title i description tekstove (engleski), u tabeli po stranici, i čeka odobrenje vlasnika pre upisa.
- **OG slika**: `src/app/opengraph-image.js` (i `twitter-image.js`) preko `ImageResponse` iz `next/og`, 1200×630 — ime, „Frontend Developer", logo, boje sajta. Vlasnik pogleda rezultat lokalno (`/opengraph-image`). Ako nije zadovoljan kvalitetom, pravi sliku u Figmi, a u projekat ide statički `opengraph-image.png`. `twitter.card` → `summary_large_image`.
- **Ikonice** po Next konvencijama u `src/app/`: `favicon.ico`, `icon.png` i `apple-icon.png` (180×180), napravljene iz `public/smal logo svg Miroslav Jovic Frontend Developer.svg` (isti znak kao sadašnji favicon — provereno) preko `sharp`-a koji dolazi uz Next (proveriti da je instaliran). Blok `icons` iz metadata se uklanja. Stari fajlovi u `public/` se ne brišu bez pitanja.
- **Portfolio kategorije**: `src/app/portfolio/[category]/page.jsx` dobija `generateStaticParams` (`apps`, `games`, `websites` iz `mainPortfolio.js`) i `generateMetadata` sa naslovom i opisom po kategoriji; nepoznata kategorija i dalje vraća 404.
- **Dashboard, login, register**: od feature-a 02 imaju serverski `page.jsx` sa `metadata` i `noindex`; ovde se njihovi title-ovi usklađuju sa template-om (deo tabele tekstova za odobrenje).
- **`src/app/sitemap.js`** (obavezno — vlasnik ga prijavljuje u Google Search Console): početna, `/portfolio`, tri kategorije, `/blog`, svi odobreni postovi (`lastModified` iz `updatedAt`), `/contact`, `/privacy`, `/terms`. Bez dashboard, login i register stranica. Postovi se čitaju direktno iz baze (samo `slug` i `updatedAt`, odobreni).
- **`src/app/robots.js`** (obavezno): dozvoljeno sve osim `/api/`; link ka `https://miroslavjovic.com/sitemap.xml`. Dashboard stranice se ne zabranjuju u robots-u, jer Google mora da ih otvori da bi video njihov `noindex`.
- **`robots` blok** iz root layout-a se briše (`index` i `follow` su podrazumevani, ponašanje ostaje isto).
- **Canonical**: `alternates.canonical` po stranici, relativno (`metadataBase` ga dopunjuje). NE u root layout-u — inače bi sve stranice pokazivale na početnu.
- **Blog post**: postojeći `generateMetadata` dopuniti `openGraph` podacima (title, description, `type: 'article'`) u skladu sa template-om. Slika posta je base64 i ne može biti og:image — post koristi OG sliku sajta.
- **Ostaje kako jeste**: `keywords` (odluka vlasnika), `alt` i `title` atributi slika sa imenom, `verification.google`.

## Napomene

- Audit (30.10.2026.): og:image je bio favicon od 96 px u `.ico` formatu sa URL-a preview deployment-a; sva četiri `icons` unosa vode na isti `.ico` sa razmacima u imenu; description ima ~340 karaktera i isti je na svim stranicama.
- Google u rezultatima prikazuje ~155–160 karaktera description-a; description ne utiče na rangiranje, ali utiče na to šta ljudi vide i da li kliknu.

## Odluke vlasnika (04.11.2026.)

1. `sitemap.js` i `robots.js` su obavezni
2. Ikonice iz `smal logo svg Miroslav Jovic Frontend Developer.svg`
3. `TabTitle` je uklonjen već u feature-u 02
4. `robots` blok iz root layout-a se briše
5. Svi novi title i description tekstovi idu vlasniku na odobrenje pre upisa

## Testiranje

1. Build bez upozorenja o `metadataBase`
2. View source na `/`, `/portfolio/games`, `/blog` i jednom postu: title po template-u, jedinstven description, `og:image` sa `https://miroslavjovic.com/...`, `twitter:card` = `summary_large_image`, tačan canonical
3. `/opengraph-image` se otvara i izgleda kako je vlasnik odobrio
4. `npm run build` prikazuje `/portfolio/[category]` kao SSG, ne kao dinamičku rutu
5. Dashboard, login i register imaju `noindex` i title po template-u
6. `/sitemap.xml` sadrži sve javne stranice i odobrene postove, a ne sadrži dashboard; `/robots.txt` zabranjuje samo `/api/` i pokazuje na sitemap
7. Posle deploy-a vlasnik proveri link u nekom OG alatu (npr. LinkedIn Post Inspector) i prijavi sitemap u Google Search Console — Claude Code ga vodi klik po klik
8. `npm run lint`, `npm run test`, `npm run build` prolaze

## Reference

- https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata (opengraph-image, app icons)
