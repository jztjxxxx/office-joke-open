// Entry program for make.fun's "Make the AI Judge Laugh: the Office Joke Open".
//
// The whole entry is one line of office comedy. It is kept in JOKE below and
// also stored verbatim in entry.txt next to this file for easy reading; when
// the program runs it writes the line to /output/entry.txt with no trailing
// newline, exactly as the gate expects to find it.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "Our standup is now async, which is corporate for: we still have the meeting, we just type it slower.";

// The sealed gate accepts UTF-8 text of 1 to 200 characters on a single line.
// Check the joke against that here so a bad edit fails loudly at run time
// instead of quietly producing an invalid entry.
function validate(line: string): string {
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("the entry must be one non-empty line");
  }
  const chars = [...line].length;
  if (chars > 200) {
    throw new Error(`the entry is ${chars} characters; the limit is 200`);
  }
  return line;
}

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", validate(JOKE), "utf8");
}

main();
