/** Pure data flow — no I/O, no side effects; the CLI shell handles files. */
import { buildOutput } from './stages/build-output.js';
import { normalizeCoords, type NormalizeConfig } from './stages/normalize-coords.js';
import { parseGraph } from './stages/parse-graph.js';
import { runSimulation, type SimulationConfig } from './stages/run-simulation.js';

import type { GraphData } from './graphData.schema.js';
import type { RawGraph } from './stages/parse-graph.js';

// ── Configuration ────────────────────────────────────────────────────────────

export interface PipelineConfig {
    simulation: Partial<SimulationConfig>;
    normalization: Partial<NormalizeConfig>;
}
// ── Result ───────────────────────────────────────────────────────────────────

export interface PipelineResult {
    result: GraphData;
    stats: string[];
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

export function runPipeline(raw: RawGraph, config: Partial<PipelineConfig> = {}): PipelineResult {
    const cfg = {
        simulation: config.simulation ?? {},
        normalization: config.normalization ?? {}
    };

    const allStats: string[] = [];

    // Stage 1: Parse raw graph
    const { simNodes, simLinks, stats: parseStats } = parseGraph(raw);

    allStats.push(...parseStats);

    // Stage 2: Run force simulation
    const simResult = runSimulation(simNodes, simLinks, cfg.simulation);

    allStats.push(...simResult.stats);

    // Stage 3: Normalise coordinates
    const normResult = normalizeCoords(simResult.simNodes, cfg.normalization);

    allStats.push(...normResult.stats);

    // Stage 4: Build output payload
    const { result, stats: buildStats } = buildOutput(normResult.simNodes, simResult.simLinks);

    allStats.push(...buildStats);

    return { result, stats: allStats };
}
