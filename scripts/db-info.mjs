// Read-only: prints the collections and document counts of one database.
// Usage: npm run db:info -- --source production|dev

import { connect, listCollectionNames, resolveDatabase, runScript } from "./lib/db-connection.mjs";
import { formatBytes, parseArgs } from "./lib/db-utils.mjs";

async function printSize(db) {
  try {
    const stats = await db.stats();
    console.log(`\nData size:    ${formatBytes(stats.dataSize)}`);
    console.log(`Storage size: ${formatBytes(stats.storageSize)}`);
    console.log(`Index size:   ${formatBytes(stats.indexSize)}`);
  } catch {
    console.log("\nSize: not available (dbStats is not allowed on this cluster)");
  }
}

runScript(async () => {
  const { source } = parseArgs(process.argv.slice(2), { values: ["source"] });
  const db = await connect(resolveDatabase(source, "source"));
  const names = await listCollectionNames(db);

  if (names.length === 0) {
    console.log("No collections found. Check the database name in the connection string.");
    return;
  }

  const width = Math.max(...names.map((name) => name.length));
  console.log("Collections:");
  for (const name of names) {
    const count = await db.collection(name).countDocuments();
    console.log(`  ${name.padEnd(width)}  ${String(count).padStart(6)} documents`);
  }

  await printSize(db);
});
