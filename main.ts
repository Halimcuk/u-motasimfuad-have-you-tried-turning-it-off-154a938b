// Have You Tried Turning It Off? — entry program.
// Writes one funny line from a hopeless tech support agent to a desperate
// customer into <output dir>/entry.txt, and checks the 1-199 character gate
// itself before writing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, the agent's cheerfully useless answer as the punch.
// The customer's disaster is felt in a few words; the agent reframes it as
// good news, and the laugh comes from that mismatch.
const ENTRY =
  "I can confirm your files are 100% gone \u2014 but the good news is you'll never lose them again.";

const MIN_CHARS = 1;
const MAX_CHARS = 199;

function outputDir(): string {
  return (
    process.env.OUTPUT_DIR ||
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT ||
    "/output"
  );
}

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry is ${chars} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // A trailing newline keeps entry.txt a well-formed text file; the gate
  // counts the line itself (91 characters), and the file stays inside it.
  writeFileSync(join(dir, "entry.txt"), ENTRY + "\n", "utf8");
  console.log(`wrote ${chars} characters to ${join(dir, "entry.txt")}`);
}

main();
