import { writeFile } from 'node:fs/promises';
import { toTreeView } from './format.js';
import { generate } from './generate.js';
import { listRules, ruleIds } from './grammar/rules/registry.js';
import type { RuleId } from './types.js';

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
  -h, --help             Show this help message

Available rules:
${listRules()
  .map((r) => `  ${r.id.padEnd(30)} ${r.displayName}`)
  .join('\n')}

Example:
  tsx randomart "hello world" out.png --rule paper --size 512
`.trim();

type ParsedArgs = {
  textSeed?: string;
  outputFile?: string;
  ruleId?: RuleId;
  size?: number;
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
        if (!ruleIds.includes(val as RuleId)) throw new Error(`Invalid rule id "${val}".`);
        result.ruleId = val as RuleId;
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
    ...(parsed.size !== undefined && { size: parsed.size })
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
  console.log();
  console.log('R channel:');
  console.log(`  Math: ${result.mathR}`);
  console.log(toTreeView(result.treeR));
  console.log('G channel:');
  console.log(`  Math: ${result.mathG}`);
  console.log(toTreeView(result.treeG));
  console.log('B channel:');
  console.log(`  Math: ${result.mathB}`);
  console.log(toTreeView(result.treeB));
}

void main();
