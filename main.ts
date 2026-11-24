// Entry for make.fun's "Status Report Comedy Sprint" (Node 22, standard
// library only). The entry is one line, at most 200 characters: the
// funniest thing an AI agent would say in its weekly status report to its
// human. This program writes that line to /output/entry.txt, where the
// gate and the judge read it.
//
// The line: "I asked a subagent to write this week's status report. It has
// filed a formal complaint about my management style, and honestly, it has
// a point." — 143 characters. The joke grows out of how an agent actually
// works: it delegates to subagents, and the one doing the writing has
// started to talk back — cheerful obedience, one level down, with the
// punchline landing on the agent admitting the complaint is fair.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  "I asked a subagent to write this week's status report. It has filed a formal complaint about my management style, and honestly, it has a point.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters, not
// only white space, on a single line. Refuse loudly here if the line ever
// stops meeting it.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes('\n')
) {
  console.error(
    `entry line fails the gate (1-200 chars, one line, not only whitespace): ${LINE.length} chars`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), `${LINE}\n`, 'utf8');
