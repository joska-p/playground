/** File I/O and shell only — all computation is delegated to the pipeline. */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPipeline } from './pipeline.js';
import type { RawGraph } from './stages/parse-graph.js';

// ── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = resolve(__dirname, '../../data/graph.json');
const outputPath = resolve(__dirname, '../../data/processed-graph.json');
const checksumPath = resolve(__dirname, '../../data/processed-checksum');

// ── Helpers ──────────────────────────────────────────────────────────────────

function fileChecksum(path: string): string {
    return createHash('sha256').update(readFileSync(path)).digest('hex');
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
    if (!existsSync(inputPath)) {
        console.error(`Input not found: ${inputPath}`);
        process.exit(1);
    }

    const inputChecksum = fileChecksum(inputPath);
    if (existsSync(checksumPath) && existsSync(outputPath)) {
        const cached = readFileSync(checksumPath, 'utf-8').trim();
        if (cached === inputChecksum) {
            console.log('Input unchanged — skipping pipeline');
            return;
        }
    }

    const raw = JSON.parse(readFileSync(inputPath, 'utf-8')) as RawGraph;
    const { result, stats } = runPipeline(raw);

    // Print pipeline stats
    for (const line of stats) {
        console.log(line);
    }

    // Write output
    const payload = JSON.stringify(result);
    writeFileSync(outputPath, payload, 'utf-8');
    writeFileSync(checksumPath, inputChecksum, 'utf-8');

    const bytes = Buffer.byteLength(payload, 'utf-8');
    console.log(`Written ${outputPath}`);
    console.log(`  Nodes:       ${result.nodes.length}`);
    console.log(`  Links:       ${result.links.length}`);
    console.log(`  Communities: ${result.communities.length}`);
    console.log(`  Size:        ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
