import mongoose from "mongoose";
import { getEnvKey, isSameDatabase, parseMongoUrl, redactSecrets } from "./db-utils.mjs";

export const { EJSON } = mongoose.mongo.BSON;

export function resolveDatabase(environment, optionName) {
  const envKey = getEnvKey(environment, optionName);
  const url = process.env[envKey];
  if (!url) {
    throw new Error(`${envKey} is not set in .env.local`);
  }
  return { environment, envKey, url, ...parseMongoUrl(url) };
}

// True when MONGO_URL points to the production database, null when it cannot be checked.
export function devIsProduction(dev) {
  const productionUrl = process.env.MONGO_URL_PRODUCTION;
  if (!productionUrl) {
    return null;
  }
  return isSameDatabase(parseMongoUrl(productionUrl), dev);
}

export async function connect(database) {
  console.log(`Database: ${database.dbName}`);
  console.log(`Host:     ${database.host}`);
  console.log(`From:     ${database.envKey} (--${database.environment})`);

  if (database.environment === "dev" && devIsProduction(database)) {
    console.warn("Warning:  MONGO_URL points to the same database as MONGO_URL_PRODUCTION");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(database.url, { serverSelectionTimeoutMS: 15000 });
  console.log(`Connected to "${mongoose.connection.name}"\n`);
  return mongoose.connection.db;
}

export async function listCollectionNames(db) {
  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  return collections
    .map((collection) => collection.name)
    .filter((name) => !name.startsWith("system."))
    .sort();
}

export function runScript(main) {
  main()
    .catch((error) => {
      console.error(`\nError: ${redactSecrets(error.message)}`);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}
