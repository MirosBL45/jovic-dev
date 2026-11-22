// Restores a backup folder into one database. Dry run by default, writes only with --apply.
// Usage: npm run db:restore -- --from backups/<folder> --target production|dev [--apply] [--drop]

import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { confirmByTyping } from "./lib/confirm.mjs";
import {
  EJSON,
  connect,
  devIsProduction,
  resolveDatabase,
  runScript,
} from "./lib/db-connection.mjs";
import { parseArgs } from "./lib/db-utils.mjs";

async function readBackup(folder) {
  if (!folder || !existsSync(folder)) {
    throw new Error("Use --from with an existing backup folder, for example backups/<folder>");
  }

  const files = (await readdir(folder)).filter((file) => file.endsWith(".json")).sort();
  if (files.length === 0) {
    throw new Error(`No .json files in ${folder}`);
  }

  return Promise.all(
    files.map(async (file) => {
      const documents = EJSON.parse(await readFile(path.join(folder, file), "utf8"));
      if (!Array.isArray(documents)) {
        throw new Error(`${file} does not contain a list of documents`);
      }
      return { name: path.basename(file, ".json"), documents };
    })
  );
}

// Without --drop, documents whose _id already exists in the target are skipped, never replaced.
async function planCollection(db, { name, documents }, drop) {
  const collection = db.collection(name);
  const existing = await collection.countDocuments();
  let toInsert = documents;

  if (!drop && existing > 0) {
    const ids = documents.map((document) => document._id);
    const present = await collection
      .find({ _id: { $in: ids } }, { projection: { _id: 1 } })
      .toArray();
    const presentIds = new Set(present.map((document) => EJSON.stringify(document._id)));
    toInsert = documents.filter((document) => !presentIds.has(EJSON.stringify(document._id)));
  }

  return { name, collection, existing, toInsert, skipped: documents.length - toInsert.length };
}

function printPlan(plan, drop) {
  const width = Math.max(...plan.map((step) => step.name.length));
  console.log("Plan:");
  for (const step of plan) {
    const parts = [`${step.existing} in target now`];
    if (drop && step.existing > 0) parts.push(`delete ${step.existing}`);
    parts.push(`insert ${step.toInsert.length}`);
    if (step.skipped > 0) parts.push(`skip ${step.skipped} (same _id already exists)`);
    console.log(`  ${step.name.padEnd(width)}  ${parts.join(", ")}`);
  }
}

async function applyPlan(plan, drop) {
  console.log("");
  for (const step of plan) {
    if (drop) {
      const { deletedCount } = await step.collection.deleteMany({});
      console.log(`  ${step.name}: deleted ${deletedCount}`);
    }
    if (step.toInsert.length > 0) {
      const { insertedCount } = await step.collection.insertMany(step.toInsert, { ordered: false });
      console.log(`  ${step.name}: inserted ${insertedCount}`);
    }
  }
  console.log("\nRestore finished.");
}

runScript(async () => {
  const options = parseArgs(process.argv.slice(2), {
    values: ["from", "target"],
    flags: ["apply", "drop"],
  });
  const database = resolveDatabase(options.target, "target");

  if (database.environment === "dev" && devIsProduction(database) !== false) {
    throw new Error(
      "MONGO_URL must point to a different database than MONGO_URL_PRODUCTION, and both must be set."
    );
  }

  const backup = await readBackup(options.from);
  const db = await connect(database);
  const plan = [];
  for (const collection of backup) {
    plan.push(await planCollection(db, collection, options.drop));
  }
  printPlan(plan, options.drop);

  if (!options.apply) {
    console.log("\nDry run: nothing was written. Add --apply to write.");
    return;
  }

  const reasons = [];
  if (database.environment === "production") reasons.push("write to the PRODUCTION database");
  if (options.drop) reasons.push("delete all existing documents in the collections above");
  if (reasons.length > 0) {
    await confirmByTyping(db.databaseName, reasons);
  }

  await applyPlan(plan, options.drop);
});
