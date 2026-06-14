/**
 * CLI entrypoint — file I/O and shell execution only.
 * All computation is delegated to the pipeline.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPipeline } from './pipeline.js';
import type { RawGraph } from './stages/parse-graph.js';

// ── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Input: repo-root-level graphify-out/graph.json */
const inputPath = resolve(__dirname, '../../../../graphify-out/graph.json');
/** Output: written next to this script */
const outputPath = resolve(__dirname, 'processed-graph.json');

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exit(1);
  }

  const raw: RawGraph = JSON.parse(readFileSync(inputPath, 'utf-8'));
  const { result, stats } = runPipeline(raw);

  // Print pipeline stats
  for (const line of stats) {
    console.log(line);
  }

  // Write output
  const payload = JSON.stringify(result);
  writeFileSync(outputPath, payload, 'utf-8');

  const bytes = Buffer.byteLength(payload, 'utf-8');
  console.log(`Written ${outputPath}`);
  console.log(`  Nodes:       ${result.nodes.length}`);
  console.log(`  Links:       ${result.links.length}`);
  console.log(`  Communities: ${result.communities.length}`);
  console.log(`  Size:        ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
