/**
 * Build-time data preparation script for @repo/graph-viz.
 *
 * Reads `graph.json`, runs the force-directed layout, computes all derived data
 * (degrees, community metadata, inter-community edges), and writes
 * `graph-prepared.json` — a single file the runtime app imports directly.
 *
 * Usage: npx tsx src/data/prepare.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CommunityData, GraphData, InterCommunityEdge, PreparedGraphData } from '../types';
import { computeCommunities, computeInterCommunityEdges } from '../utils/communities';
import { computeDegrees } from '../utils/nodes';
import { computeLayout } from './layout';

const __dirname = dirname(fileURLToPath(import.meta.url));

const INPUT = resolve(__dirname, 'graph.json');
const OUTPUT = resolve(__dirname, 'graph-prepared.json');

// Layout tuning (mirrors the worker defaults)
const CENTER: [number, number, number] = [0, 0, 0];
const RADIUS = 30;

function main(): void {
  console.log(`Reading ${INPUT}...`);
  const raw = readFileSync(INPUT, 'utf-8');
  const graphData = JSON.parse(raw) as GraphData;

  const { nodes, links } = graphData;
  console.log(`  Nodes: ${nodes.length}, Links: ${links.length}`);

  // ── 1. Force-directed layout ──
  console.log('Running force-directed layout...');
  const positionsFloat = computeLayout(
    { nodes, links, center: CENTER, radius: RADIUS },
    (progress) => {
      const pct = Math.round(progress * 100);
      if (pct % 20 === 0) console.log(`  Layout: ${pct}%`);
    }
  );
  const positions = Array.from(positionsFloat);
  console.log(`  Layout complete (${positions.length / 3} positions)`);

  // ── 2. Node index and degrees ──
  const nodeIndex = new Map<string, number>();
  for (let i = 0; i < nodes.length; i++) {
    nodeIndex.set(nodes[i]!.id, i);
  }
  const degreesFloat = computeDegrees(nodes, links, nodeIndex);
  const degrees = Array.from(degreesFloat);

  // ── 3. Community metadata ──
  const communities = computeCommunities(nodes, positionsFloat);

  // ── 4. Inter-community edges ──
  const interCommunityEdges = computeInterCommunityEdges(
    links,
    nodes,
    nodeIndex,
    communities
  );

  // ── Serialize Maps to Records ──
  const communitiesRecord: Record<string, CommunityData> = {};
  for (const [cid, data] of communities) {
    communitiesRecord[String(cid)] = data;
  }

  const edgesRecord: Record<string, InterCommunityEdge> = {};
  for (const [key, edge] of interCommunityEdges) {
    edgesRecord[key] = edge;
  }

  // ── 5. Build output ──
  const output: PreparedGraphData = {
    directed: graphData.directed,
    multigraph: graphData.multigraph,
    graph: graphData.graph,
    nodes: graphData.nodes,
    links: graphData.links,
    positions,
    degrees,
    communities: communitiesRecord,
    interCommunityEdges: edgesRecord,
  };

  console.log(`Writing ${OUTPUT}...`);
  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8');

  const communityCount = Object.keys(communitiesRecord).length;
  const edgeCount = Object.keys(edgesRecord).length;
  console.log(`Done — ${nodes.length} nodes, ${communityCount} communities, ${edgeCount} inter-community edges`);
}

main();
