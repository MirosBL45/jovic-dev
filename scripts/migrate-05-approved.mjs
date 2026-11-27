// Feature 05: every post without the approved field gets approved = true when it is the admin's
// (all old production posts are), and approved = false otherwise (it then waits for approval).
// Dry run by default, writes only with --apply.
// Usage: npm run db:migrate-05 -- --target production|dev [--apply]

import { confirmByTyping } from "./lib/confirm.mjs";
import { connect, devIsProduction, resolveDatabase, runScript } from "./lib/db-connection.mjs";
import {
  POSTS_WITHOUT_APPROVED,
  approvedForOldPost,
  isValidAdminId,
  parseArgs,
} from "./lib/db-utils.mjs";

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
    .find(POSTS_WITHOUT_APPROVED, { projection: { slug: 1, username: 1, ownerId: 1 } })
    .toArray();
  const toApprove = missing.filter((post) => approvedForOldPost(post, adminId));
  const toPending = missing.filter((post) => !approvedForOldPost(post, adminId));

  console.log(`Posts in total:            ${total}`);
  console.log(`Posts without approved:    ${missing.length}`);
  console.log(`  of the admin -> true:    ${toApprove.length}`);
  console.log(`  of others    -> false:   ${toPending.length}`);
  for (const post of toPending) {
    console.log(`    ${post.slug}  (by ${post.username})`);
  }

  if (!options.apply) {
    console.log("\nDry run: nothing was written. Add --apply to write.");
    return;
  }

  if (database.environment === "production") {
    await confirmByTyping(db.databaseName, ["write to the PRODUCTION database"]);
  }

  const approved = await posts.updateMany(
    { ...POSTS_WITHOUT_APPROVED, ownerId: adminId },
    { $set: { approved: true } }
  );
  const pending = await posts.updateMany(POSTS_WITHOUT_APPROVED, { $set: { approved: false } });

  const left = await posts.countDocuments(POSTS_WITHOUT_APPROVED);
  console.log(
    `\nSet approved = true on ${approved.modifiedCount} posts and approved = false on ${pending.modifiedCount}.`
  );
  console.log(`Posts without approved now: ${left}.`);
});
