// Feature 02: every post without ownerId gets ownerId = ADMIN_ID (all old posts are the owner's).
// Dry run by default, writes only with --apply.
// Usage: npm run db:migrate-02 -- --target production|dev [--apply]

import { confirmByTyping } from "./lib/confirm.mjs";
import { connect, devIsProduction, resolveDatabase, runScript } from "./lib/db-connection.mjs";
import { POSTS_WITHOUT_OWNER, isValidAdminId, parseArgs } from "./lib/db-utils.mjs";

runScript(async () => {
  const options = parseArgs(process.argv.slice(2), { values: ["target"], flags: ["apply"] });
  const database = resolveDatabase(options.target, "target");

  if (database.environment === "dev" && devIsProduction(database) !== false) {
    throw new Error(
      "MONGO_URL must point to a different database than MONGO_URL_PRODUCTION, and both must be set."
    );
  }

  const adminId = process.env.ADMIN_ID;
  if (!isValidAdminId(adminId)) {
    throw new Error('ADMIN_ID in .env.local must look like "google:<numbers>"');
  }

  const db = await connect(database);
  const posts = db.collection("posts");

  const total = await posts.countDocuments();
  const missing = await posts
    .find(POSTS_WITHOUT_OWNER, { projection: { slug: 1, username: 1 } })
    .toArray();

  console.log(`Posts in total:       ${total}`);
  console.log(`Posts without owner:  ${missing.length}`);
  for (const post of missing) {
    console.log(`  ${post.slug}  (by ${post.username})`);
  }
  console.log(`ownerId to write:     ${adminId}`);

  if (!options.apply) {
    console.log("\nDry run: nothing was written. Add --apply to write.");
    return;
  }

  if (database.environment === "production") {
    await confirmByTyping(db.databaseName, ["write to the PRODUCTION database"]);
  }

  const { modifiedCount } = await posts.updateMany(POSTS_WITHOUT_OWNER, {
    $set: { ownerId: adminId },
  });
  await posts.createIndex({ ownerId: 1 });

  const left = await posts.countDocuments(POSTS_WITHOUT_OWNER);
  console.log(`\nUpdated ${modifiedCount} posts. Posts without owner now: ${left}.`);
  console.log('Index "ownerId_1" is in place.');
});
