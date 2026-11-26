## Project: Personal Web Portfolio

This project is my personal web portfolio, where you can view my works, download my resume, and contact me. It is developed using the following technologies and tools:

### 1. **Framework and Core**

- **Next.js 16** (App Router, Turbopack, React 19): Provides the foundation for building a scalable and high-performance React application with server-side rendering and static page generation.
- **JavaScript**: The primary programming language used for developing the functionality of the portfolio.

### 2. **Styling**

- **CSS Modules (file.module.css and file.module.scss)**: Used for styling components with scoped CSS to avoid conflicts and ensure modularity.

### 3. **Icons and Visuals**

- **React Icons**: A library of popular icons integrated into the project to enhance the visual appeal.

### 4. **Data Fetching**

- **SWR**: A React hook library for data fetching, ensuring a seamless and efficient way to fetch data on the client-side.
  - [Learn more about SWR](https://swr.vercel.app/)

### 5. **Database and ORM**

- **MongoDB**: A NoSQL database used to store data on the server-side, providing flexibility and scalability.
  - [Learn more about MongoDB](https://www.mongodb.com/)
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to manage data with a schema-based solution.
  - [Learn more about Mongoose](https://mongoosejs.com/)
- **Schema Creation**: Created schemas for User and Post models using Mongoose to define the structure of the data.

### 6. **Authentication**

- **NextAuth**: A complete authentication solution for Next.js applications, used for authenticating users.
  - [Learn more about NextAuth](https://authjs.dev/)
- **GoogleProvider**: Used Google Console to enable Google authentication within the application.
  - [Learn more about Google Console](https://cloud.google.com/)

### 7. **Security**

- **bcryptjs**: Used for hashing passwords to store them securely instead of plaintext.
  - [Learn more about bcryptjs](https://www.npmjs.com/package/bcryptjs)

Each of these technologies plays a vital role in enhancing the functionality and user experience of the personal web portfolio, making it a modern and robust application.

## Development

### Prerequisites

- Node.js 20.9 or newer
- npm

### Setup

1. Install the dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and fill in the values. Env files are never committed, only `.env.example` is.
3. Start the dev server with `npm run dev` and open http://localhost:3000.

### Commands

| Command                                                      | Description                                               |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| `npm run dev`                                                | Start the dev server                                      |
| `npm run build`                                              | Create a production build                                 |
| `npm run start`                                              | Run the production build                                  |
| `npm run lint`                                               | Lint the project with ESLint (`eslint.config.mjs`)        |
| `npm run test`                                               | Run the tests once                                        |
| `npm run test:watch`                                         | Run the tests in watch mode                               |
| `npm run format`                                             | Format the project with Prettier                          |
| `npm run format:check`                                       | Check the formatting without changing files               |
| `npm run sass:file -- path/x.module.scss path/x.module.css`  | Compile one SCSS file                                     |
| `npm run sass:check`                                         | Check that every `.module.css` matches its `.module.scss` |
| `npm run db:info -- --source production\|dev`                | Show collections and document counts of a database        |
| `npm run db:backup -- --source production\|dev`              | Back up a database to `backups/`                          |
| `npm run db:restore -- --from backups/<folder> --target dev` | Restore a backup (dry run unless `--apply` is added)      |
| `npm run db:migrate-02 -- --target production\|dev`          | Set `ownerId` on old posts (dry run unless `--apply`)     |

### Branches

- `master` is production on Vercel.
- `develop` is the base for all work.
- New work goes to `feature/...` or `fix/...` branches created from `develop`.

### Database and backup

Production and development use two databases on the same MongoDB Atlas cluster. The dev database has the same name with `-dev` at the end.

| Where             | `MONGO_URL`         | `MONGO_URL_PRODUCTION`      |
| ----------------- | ------------------- | --------------------------- |
| `.env.local`      | dev database        | production, db scripts only |
| Vercel Production | production database | not set                     |
| Vercel Preview    | dev database        | not set                     |

The site always reads `MONGO_URL`, so local development never touches production data. `--source` and `--target` choose the database for the scripts: `production` reads `MONGO_URL_PRODUCTION`, `dev` reads `MONGO_URL`. Every script prints the database name and host before it does anything.

Back up a database:

```bash
npm run db:backup -- --source production
```

The backup is saved to `backups/<database>-<YYYY-MM-DD_HH-mm>/`, with one Extended JSON file per collection, so `ObjectId` and `Date` values survive a restore.

Restore a backup:

```bash
# Dry run: prints what would be written
npm run db:restore -- --from backups/<folder> --target dev

# Writes to the dev database
npm run db:restore -- --from backups/<folder> --target dev --apply
```

1. Without `--apply` nothing is written.
2. Without `--drop`, existing documents are never deleted or replaced. Documents whose `_id` already exists are skipped.
3. `--drop` deletes all existing documents in the restored collections first and asks you to type the database name.
4. `--target production` always asks you to type the production database name.
5. Restoring to `dev` is refused when `MONGO_URL` points to the same database as `MONGO_URL_PRODUCTION`.

Before every migration: back up production, try the migration on the dev database, and only then run it on production.

### Auth and post ownership

1. A post belongs to the login account in `ownerId`, never to the name or the email: `google:<Google account id>` or `credentials:<user id>`. The `username` on a post is only the author name shown on the blog.
2. `ownerId` is set at login and kept in the session. Sessions from before this change have no `ownerId`, so the user has to log in again.
3. `ADMIN_ID` is the `ownerId` of the owner's Google account. The admin can delete any post, everyone else only their own. In development the dashboard shows your `ownerId` at the bottom of the page, so you can copy it into `.env.local` and into Vercel (Production and Preview).
4. Creating, listing your own and deleting posts need a session. The API checks the rules in `src/utils/postPermissions.js` on every request, and validates posts with `src/utils/postValidation.js`, the same module the dashboard uses (images up to 1 MB each).
5. `npm run db:migrate-02` sets `ownerId = ADMIN_ID` on every post that has no `ownerId` yet.

Backups contain email addresses and password hashes. `backups/` is in `.gitignore` and is never committed.

### Styles

Components import `.module.css`, and the source of every style is the `.module.scss` file next to it. After changing a `.module.scss` file, compile it with Live Sass Compiler or `npm run sass:file`. Never edit a `.module.css` file by hand. `src/app/globals.css` has no SCSS source and is edited directly.
