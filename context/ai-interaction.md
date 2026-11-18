# AI Interaction Guidelines

**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages

## VERY IMPORTANT

- Ako ima nekih nesuglasica oko uputstava, features fajlova, project-overview fajla ili bilo čega, uvek pitaj, nemoj na nagađaš, nemoj da izmišljaš neka uputstva koja nemaš, navedi šta te buni, i ja ti onda kažem šta će i kako da bude

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification
- Write all comunication, explanations and findings in Serbian, ekavica, not jekavica, even you get instructions on English, always write everything in Serbian, ekavica. However, do not translate programming, code, audit, security, API, database, framework, tool, or infrastructure terms. Keep those terms in English, Latin script, and preserve their original casing when relevant.
- Pre svake izmene koda navedi koje fajlove ćeš menjati
- Za sve korake van koda (MongoDB Atlas, Vercel, Google Cloud Console, EmailJS, GitHub, VS Code) daj tačne korake klik po klik: gde je na ekranu, koji meni ili sekcija, kako izgleda, šta se klikne i šta treba da se desi. Ne pretpostavljaj da znam gde je neka opcija. Pre davanja uputstva proveri aktuelni izgled UI-ja u dokumentaciji tog servisa
- Kada ti treba informacija sa mog računara koju ne možeš sam da pročitaš, daj komandu koja ispisuje tekst (ne traži screenshot)
- Nikad ne traži da u chat nalepim lozinke, connection string-ove, ključeve ili tokene — kaži mi tačno koji deo i gde da upišem sam

Examples of terms that should stay in English:
Verdict, Finding, Scope, Summary, Issue, Risk, Impact, Recommendation, Fix, Status, Severity, Critical, High, Medium, Low, Info, Warning, Error, Debug, Log, Limit, Key, Value, Token, Session, Cookie, Header, Payload, Body, Request, Response, Endpoint, Route, Middleware, Handler, Controller, Service, Repository, Component, Hook, Props, State, Context, Store, Provider, Schema, Model, Migration, Seed, Query, Mutation, Database, Table, Column, Index, Constraint, Relation, Foreign key, Primary key, Cache, Redis, TTL, Eviction, Rate limit, Queue, Job, Worker, Cron, Timeout, Retry, Fallback, Redirect, Rewrite, Params, Search params, Slug, Config, Env, Environment variable, Feature flag, Build, Deploy, Preview, Production, Development, Staging, Lint, Format, Test, Mock, Stub, Fixture, Snapshot, Coverage, Commit, Branch, PR, Pull request, Merge, Rebase, Refactor, Code smell, Auth, Login, Logout, Sign in, Sign up, Reset password, Email verified, Hash, Salt, JWT, OAuth, CSRF, CORS, XSS, SQL injection, RBAC, ACL, Webhook, API, REST, GraphQL, CRUD, CLI, SDK, UI, UX.

Serbian is used for explanations, reasoning, and recommendations, but technical terms and labels should remain in English.
Never transliterate English technical labels into Serbian Cyrillic. For example, write Verdict, not Вердикт; Limit, not Лимит; Key, not Кључ, when these are technical/audit/code labels and similar things

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @context/current-feature.md. Make short description of the feature with date and time with headline in this format (name of the day, day.month.year. | hour:min, example: Sunday, 02.08.2026. | 13:03), but I do not want names of the files in the History.
   **Git workflow:**
   - We work **90% of the time from the `develop` branch**.
   - New feature/fix branches should normally be created from `develop`.
   - In some cases, it is also acceptable to create a new branch from an existing local feature branch if it is closely related.
   - **Do not checkout, modify, merge into, or push to the `master` branch.** I handle everything related to `master` myself on GitHub or localy in vscode.
   - Jedini izuzetak je feature 00: tamo se `develop` jednom pravi iz `master`-a i push-uje (bez ikakve izmene na `master`-u).
2. **Branch** - Create a new branch for the feature, fix, or improvement.
3. **Implement** - Implement the feature/fix described in @context/current-feature.md.
4. **Test** - Verify it works in the browser. Add or update unit tests (Vitest) for any new utilities, validation, permissions or server logic, run `npm run test`, then run `npm run build` and fix any errors. If styles changed, run `npm run sass:check`. From feature 04 also run `npm run lint`.
5. **Iterate** - Iterate and improve the implementation if needed.
6. **Commit** - Do not add Claude or Codex or any AI to any commit messages. Commit only after the build passes and everything works correctly.
7. **Push** - Push the branch to GitHub (I will create the Pull Request on GitHub).
8. **Delete Branch** - Delete the branch after it has been pushed.
9. **Review** - Review AI-generated code periodically and on demand.
10. **Complete** - Mark the task as completed in @context/current-feature.md and add it to the History.

Do NOT commit without permission and until the build passes. If build fails, fix the issues first.

## Branching

We will usually create a new branch for every feature/fix. Name branch **feature/[feature]** or **fix/[fix]**, etc. Ask to delete the branch once pushed.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages in English (feat:, fix:, chore:, style:, test:, docs:, etc.)
- Never put "Generated With Claude" in the commit messages

## Baza podataka

- Nikad ne upisuj ništa u produkcionu bazu bez mog izričitog odobrenja u toj sesiji
- Pre svake migracije: backup produkcije (`npm run db:backup`), pa proba na dev bazi, pa tek onda produkcija
- Lokalni razvoj i testiranje idu na dev bazu (`MONGO_URL` u `.env.local`, od feature-a 01)
- Backup-i (`backups/`) i `.env*` fajlovi (osim `.env.example`) se nikad ne commit-uju

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase
- Ne diraj postojeće komentare. Ako izmena traži brisanje ili premeštanje koda uz koji stoji komentar, pitaj pre toga
- Posle izmene `.module.scss` regeneriši `.module.css` sa `npm run sass:file` (vidi coding-standards.md)

## Code Review

Review AI-generated code periodically, especially for:

- Security (auth checks, input validation, identity from session — never from request body)
- Performance (unnecessary re-renders, N+1 queries, large payloads from the database)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)
- Comments (no existing comment changed or removed without approval)
