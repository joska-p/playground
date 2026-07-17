#!/usr/bin/env -S npx tsx
/**
 * randomart CLI.
 *
 * Usage:
 *   tsx randomart <textseed> <outputfile> [--rule <id>] [--size <n>] [--colors <hex1,hex2,...>]
 *
 * Writes a PNG to <outputfile>, prints the math expression and an ASCII tree
 * to stdout. On any invalid input it prints an error plus the usage message
 * and exits non-zero.
 */

import { writeFile } from 'node:fs/promises';
import { toTreeView } from './format.js';
import { generate } from './generate.js';
import { listRules } from './grammar/rules/registry.js';

const USAGE = `
randomart — generate visual hash art from a text seed

Usage:
  tsx randomart <textseed> <outputfile> [options]

Arguments:
  <textseed>     Seed string to visualize (required)
  <outputfile>   Path to write the PNG output (required)

Options:
  --rule <id>            Grammar rule id (default: "classic")
  --size <number>        Square output size in pixels (default: 256)
  --colors <h1,h2,...>   Comma-separated hex colors (default: grayscale)
  -h, --help             Show this help message

Available rules:
${listRules()
  .map((r) => `  ${r.id.padEnd(30)} ${r.displayName}`)
  .join('\n')}

Example:
  tsx randomart "hello world" out.png --rule trig --size 512 --colors "#0a0a0a,#38bdf8,#f8fafc"
`.trim();

type ParsedArgs = {
  textSeed?: string;
  outputFile?: string;
  ruleId?: string;
  size?: number;
  colors?: string[];
  help: boolean;
};

/** Parse argv into structured arguments. Throws on malformed flag usage. */
function parseArgs(argv: string[]): ParsedArgs {
  const result: ParsedArgs = { help: false };
  const positionals: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    switch (arg) {
      case '-h':
      case '--help':
        result.help = true;
        break;
      case '--rule': {
        const val = argv[++i];
        if (val === undefined) throw new Error('--rule requires a value.');
        result.ruleId = val;
        break;
      }
      case '--size': {
        const val = argv[++i];
        if (val === undefined) throw new Error('--size requires a value.');
        const n = Number(val);
        if (!Number.isInteger(n)) {
          throw new Error(`--size must be an integer (received "${val}").`);
        }
        result.size = n;
        break;
      }
      case '--colors': {
        const val = argv[++i];
        if (val === undefined) throw new Error('--colors requires a value.');
        result.colors = val
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        break;
      }
      default: {
        if (arg.startsWith('--')) {
          throw new Error(`Unknown option "${arg}".`);
        }
        positionals.push(arg);
      }
    }
  }

  if (positionals[0] !== undefined) result.textSeed = positionals[0];
  if (positionals[1] !== undefined) result.outputFile = positionals[1];
  return result;
}

/** Print an error message + usage and exit with a non-zero code. */
function fail(message: string): never {
  console.error(`Error: ${message}\n`);
  console.error(USAGE);
  process.exit(1);
}

async function main(): Promise<void> {
  let parsed: ParsedArgs;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (err) {
    fail((err as Error).message);
  }

  if (parsed.help) {
    console.log(USAGE);
    process.exit(0);
  }

  if (!parsed.textSeed) fail('Missing required argument <textseed>.');
  if (!parsed.outputFile) fail('Missing required argument <outputfile>.');

  const result = generate(parsed.textSeed, {
    ...(parsed.ruleId !== undefined && { ruleId: parsed.ruleId }),
    ...(parsed.size !== undefined && { size: parsed.size }),
    ...(parsed.colors !== undefined && { colorPalette: parsed.colors })
  });

  if ('error' in result) {
    fail(result.error);
  }

  try {
    await writeFile(parsed.outputFile, result.png);
  } catch (err) {
    fail(`Could not write output file: ${(err as Error).message}`);
  }

  console.log(`Wrote ${result.png.length} bytes to ${parsed.outputFile}`);
  console.log(`Rule:  ${parsed.ruleId ?? 'classic'}`);
  console.log(`Math:  ${result.math}`);
  console.log();
  console.log('Expression tree:');
  console.log(toTreeView(result.node));
}

void main();
