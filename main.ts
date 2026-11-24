// One Word for the Boss — make.fun entry (program/v1, node22).
//
// The task: send exactly one word that describes the boss. No phrase,
// no caption, no explanation. The gate accepts /output/entry.txt only
// when it holds UTF-8 text of 1 to 30 characters, not only whitespace.
//
// The word this entry sends is "Creditstealer": the boss who presents
// the team's work as their own. It is a single word a person would
// actually use about the one they report to, it lands on its own with
// no caption, it catches a habit every office, kitchen and warehouse
// recognises, and it is not the first word anyone reaches for.
//
// The program is deterministic: same input, same output, every run.
// It reads nothing from the network, the clock or the environment
// except the output directory, and it writes exactly one file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one word. Thirteen characters, one token, no spaces, plain
// ASCII, so the character count the gate reads is the count here.
const WORD = "Creditstealer";

// The gate's own rules, checked here before anything is written so a
// bad word can never reach the file: 1 to 30 characters, a single
// token with no whitespace anywhere in it.
function isGateValid(word: string): boolean {
  if (word.length < 1 || word.length > 30) return false;
  if (word.trim().length !== word.length) return false;
  if (/\s/.test(word)) return false;
  return true;
}

function main(): void {
  if (!isGateValid(WORD)) {
    throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
  }

  // The grader runs with MAKEFUN_OUTPUT_DIR=/output and an empty,
  // writable output directory; locally the same variable points the
  // program at a scratch directory instead.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // One file, the word and nothing else: no trailing newline, no
  // caption, no explanation. The judge reads the file exactly as it
  // is written, so the bytes here are the whole entry.
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
}

main();
