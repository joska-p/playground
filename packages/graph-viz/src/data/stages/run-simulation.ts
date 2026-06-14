/**
 * Stage 2: Run the d3-force-3d simulation to compute layout positions.
 */
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation
} from 'd3-force-3d';
import type { SimLink, SimNode } from './sim-types.js';

// ── Configuration ────────────────────────────────────────────────────────────

export type SimulationConfig = {
  /** Number of simulation ticks */
  ticks: number;
  /** Link distance */
  linkDistance: number;
  /** Many-body charge strength (negative = repulsion) */
  chargeStrength: number;
  /** Collision radius */
  collideRadius: number;
  /** Initial alpha */
  alpha: number;
  /** Alpha decay rate */
  alphaDecay: number;
};

export const DEFAULT_SIMULATION_CONFIG: SimulationConfig = {
  ticks: 300,
  linkDistance: 30,
  chargeStrength: -120,
  collideRadius: 8,
  alpha: 1,
  alphaDecay: 0.02
};

// ── Result ───────────────────────────────────────────────────────────────────

export type SimulationResult = {
  simNodes: SimNode[];
  simLinks: SimLink[];
  stats: string[];
};

// ── Stage implementation ─────────────────────────────────────────────────────

export function runSimulation(
  simNodes: SimNode[],
  simLinks: SimLink[],
  config: Partial<SimulationConfig> = {}
): SimulationResult {
  const cfg = { ...DEFAULT_SIMULATION_CONFIG, ...config };
  const stats: string[] = [];

  const simulation = forceSimulation()
    .numDimensions(3)
    .nodes(simNodes as unknown[])
    .force(
      'link',
      forceLink(simLinks)
        .id((d: unknown) => (d as SimNode).id)
        .distance(cfg.linkDistance)
    )
    .force('charge', forceManyBody().strength(cfg.chargeStrength))
    .force('center', forceCenter(0, 0, 0))
    .force('collide', forceCollide(cfg.collideRadius))
    .alpha(cfg.alpha)
    .alphaDecay(cfg.alphaDecay);

  for (let i = 0; i < cfg.ticks; i++) {
    simulation.tick();
  }
  simulation.stop();
  stats.push(`Simulation finished (${cfg.ticks} ticks)`);

  return { simNodes, simLinks, stats };
}
