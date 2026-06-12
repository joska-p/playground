/// <reference lib="webworker" />

import type { LayoutInput } from '../types';

const VELOCITY_DECAY = 0.85;
const ALPHA_DECAY = 0.985;
const MIN_ALPHA = 0.005;
const MAX_ITERATIONS = 120;
const SAMPLES_PER_NODE = 120;
const REPULSION_STRENGTH = 800;
const ATTRACTION_STRENGTH = 0.008;
const CENTER_STRENGTH = 0.015;
const IDEAL_EDGE_LENGTH = 3;
const ENERGY_THRESHOLD = 0.5;

function computeLayout(input: LayoutInput): Float32Array {
  const { nodes, links, center, radius } = input;
  const n = nodes.length;
  const positions = new Float32Array(n * 3);
  const velocities = new Float32Array(n * 3);

  // Build node id → index map
  const nodeIndex = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    nodeIndex.set(nodes[i]!.id, i);
  }

  // Initialize positions on Fibonacci sphere (good 3D distribution)
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / n);
    const r = radius * Math.cbrt(i / n);
    positions[i * 3] = center[0] + r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = center[2] + r * Math.cos(phi);
  }

  // Build adjacency list for attraction
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const link of links) {
    const si = nodeIndex.get(link.source);
    const ti = nodeIndex.get(link.target);
    if (si !== undefined && ti !== undefined) {
      adj[si]!.push(ti);
      adj[ti]!.push(si);
    }
  }

  let alpha = 1;

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let totalEnergy = 0;

    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      let fx = 0;
      let fy = 0;
      let fz = 0;

      const px = positions[ix]!;
      const py = positions[iy]!;
      const pz = positions[iz]!;

      // Sampled repulsion — randomly pick nodes to repel against
      for (let s = 0; s < SAMPLES_PER_NODE; s++) {
        const j = Math.floor(Math.random() * n);
        if (j === i) continue;

        const dx = px - positions[j * 3];
        const dy = py - positions[j * 3 + 1];
        const dz = pz - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 0.01) continue;

        const dist = Math.sqrt(distSq);
        const force = (REPULSION_STRENGTH * alpha) / (distSq + 1);
        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
        fz += (dz / dist) * force;
      }

      // Attraction along edges
      for (const neighbor of adj[i]!) {
        const dx = positions[neighbor * 3] - px;
        const dy = positions[neighbor * 3 + 1] - py;
        const dz = positions[neighbor * 3 + 2] - pz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        const force = ATTRACTION_STRENGTH * (dist - IDEAL_EDGE_LENGTH) * alpha;
        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
        fz += (dz / dist) * force;
      }

      // Center gravity
      fx += (center[0] - px) * CENTER_STRENGTH * alpha;
      fy += (center[1] - py) * CENTER_STRENGTH * alpha;
      fz += (center[2] - pz) * CENTER_STRENGTH * alpha;

      // Update velocity with damping
      velocities[ix] = (velocities[ix]! + fx) * VELOCITY_DECAY;
      velocities[iy] = (velocities[iy]! + fy) * VELOCITY_DECAY;
      velocities[iz] = (velocities[iz]! + fz) * VELOCITY_DECAY;

      // Update position
      positions[ix] += velocities[ix]!;
      positions[iy] += velocities[iy]!;
      positions[iz] += velocities[iz]!;

      totalEnergy +=
        velocities[ix]! * velocities[ix]! +
        velocities[iy]! * velocities[iy]! +
        velocities[iz]! * velocities[iz]!;
    }

    alpha *= ALPHA_DECAY;
    if (alpha < MIN_ALPHA) break;
    if (totalEnergy / n < ENERGY_THRESHOLD) break;
  }

  return positions;
}

self.onmessage = (event: MessageEvent<LayoutInput>) => {
  const positions = computeLayout(event.data);
  self.postMessage(positions, [positions.buffer]);
};
