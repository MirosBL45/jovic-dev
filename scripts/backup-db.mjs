// Exports every collection of one database to backups/<db>-<date>/<collection>.json (Extended JSON).
// Usage: npm run db:backup -- --source production|dev

import { existsSync } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  EJSON,
  connect,
  listCollectionNames,
  resolveDatabase,
  runScript,
} from "./lib/db-connection.mjs";
import { backupFolderName, formatBytes, parseArgs } from "./lib/db-utils.mjs";

const BACKUP_DIR = "backups";

runScript(async () => {
  const { source } = parseArgs(process.argv.slice(2), { values: ["source"] });
  const db = await connect(resolveDatabase(source, "source"));
  const names = await listCollectionNames(db);

  if (names.length === 0) {
    throw new Error("No collections found. Check the database name in the connection string.");
  }

  const folder = path.join(BACKUP_DIR, backupFolderName(db.databaseName, new Date()));
  if (existsSync(folder)) {
    throw new Error(`${folder} already exists. Wait a minute and run the backup again.`);
  }
  await mkdir(folder, { recursive: true });

  const width = Math.max(...names.map((name) => name.length));
  let totalSize = 0;

  for (const name of names) {
    const documents = await db.collection(name).find({}).toArray();
    const file = path.join(folder, `${name}.json`);
    await writeFile(file, EJSON.stringify(documents, null, 2), "utf8");

    const { size } = await stat(file);
    totalSize += size;
    console.log(
      `  ${name.padEnd(width)}  ${String(documents.length).padStart(6)} documents  ${formatBytes(size)}`
    );
  }

  console.log(`\nBackup saved to ${folder} (${formatBytes(totalSize)})`);
});
