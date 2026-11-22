import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";

export async function confirmByTyping(dbName, reasons) {
  const readline = createInterface({ input: stdin, output: stdout });
  try {
    console.log(`\nThis will ${reasons.join(" and ")}.`);
    const answer = await readline.question(`Type the database name (${dbName}) to continue: `);
    if (answer.trim() !== dbName) {
      throw new Error("The name did not match. Nothing was written.");
    }
  } finally {
    readline.close();
  }
}
