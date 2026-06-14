// @ts-nocheck
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from 'd3-force-3d';

// ── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Input: repo-root-level graphify-out/graph.json */
const inputPath = resolve(__dirname, '../../../../graphify-out/graph.json');
/** Output: written next to this script */
const outputPath = resolve(__dirname, 'processed-graph.json');

// ── Raw data types (mirrors graphify output) ─────────────────────────────────

interface RawNode {
  id: string;
  label?: string;
  norm_label?: string;
  file_type?: string;
  community?: number;
  [key: string]: unknown;
}

interface RawLink {
  source: string;
  target: string;
  relation?: string;
  [key: string]: unknown;
}

interface RawGraph {
  nodes: RawNode[];
  links: RawLink[];
}

// ── Simulation node / link (extends the d3 datum so it can go into the sim) ──

interface SimNode {
  index?: number;
  id: string;
  label: string;
  norm_label: string;
  file_type: string;
  community: number;
  inDegree: number;
  outDegree: number;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

interface SimLink {
  source: SimNode | string;
  target: SimNode | string;
  relation: string;
}

// ── Optimised output types ───────────────────────────────────────────────────

interface ProcessedNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  inDegree: number;
  outDegree: number;
  community: number;
  file_type: string;
}

interface ProcessedLink {
  sourceIdx: number;
  targetIdx: number;
  relation: string;
}

interface CommunityMeta {
  id: number;
  centroid: { x: number; y: number; z: number };
}

interface ProcessedGraph {
  nodes: ProcessedNode[];
  links: ProcessedLink[];
  communities: CommunityMeta[];
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  // 1. Read input
  if (!existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exit(1);
  }
  const raw: RawGraph = JSON.parse(readFileSync(inputPath, 'utf-8'));
  const { nodes, links } = raw;
  console.log(`Read ${nodes.length} nodes, ${links.length} links`);

  // 2. Build simulation node array & degree computation
  const simNodes: SimNode[] = nodes.map((n) => ({
    id: n.id,
    label: n.label ?? n.norm_label ?? n.id,
    norm_label: n.norm_label ?? n.label ?? n.id,
    file_type: n.file_type ?? 'unknown',
    community: n.community ?? 0,
    inDegree: 0,
    outDegree: 0,
  }));

  const nodeById = new Map<string, SimNode>();
  for (const n of simNodes) {
    nodeById.set(n.id, n);
  }

  for (const link of links) {
    const src = nodeById.get(link.source);
    const tgt = nodeById.get(link.target);
    if (src) src.outDegree += 1;
    if (tgt) tgt.inDegree += 1;
  }

  console.log(
    `In-memory graph: ${simNodes.length} nodes, max in-degree ${Math.max(...simNodes.map((n) => n.inDegree))}, max out-degree ${Math.max(...simNodes.map((n) => n.outDegree))}`,
  );

  // 3. Build simulation links (keep relation)
  const simLinks: SimLink[] = [];
  for (const link of links) {
    const src = nodeById.get(link.source);
    const tgt = nodeById.get(link.target);
    if (src && tgt) {
      simLinks.push({ source: src, target: tgt, relation: link.relation ?? 'unknown' });
    }
  }
  console.log(`Simulation links: ${simLinks.length} (${links.length - simLinks.length} dropped due to missing endpoints)`);

  // 4. Run d3-force-3d simulation (300 ticks)
  const simulation = forceSimulation(simNodes as unknown[])
    .force(
      'link',
      forceLink(simLinks)
        .id((d: unknown) => (d as SimNode).id)
        .distance(30),
    )
    .force('charge', forceManyBody().strength(-120))
    .force('center', forceCenter(0, 0, 0))
    .force('collide', forceCollide(8))
    .alpha(1)
    .alphaDecay(0.02);

  for (let i = 0; i < 300; i++) {
    simulation.tick();
  }
  simulation.stop();
  console.log('Simulation finished (300 ticks)');

  // 5. Build optimised payload
  const processedNodes: ProcessedNode[] = simNodes.map((n) => ({
    id: n.id,
    label: n.label,
    x: n.x ?? 0,
    y: n.y ?? 0,
    z: n.z ?? 0,
    inDegree: n.inDegree,
    outDegree: n.outDegree,
    community: n.community,
    file_type: n.file_type,
  }));

  const nodeIndex = new Map<string, number>();
  for (let i = 0; i < processedNodes.length; i++) {
    nodeIndex.set(processedNodes[i].id, i);
  }

  const processedLinks: ProcessedLink[] = simLinks.map((l) => {
    const srcObj = typeof l.source === 'object' ? l.source : nodeById.get(l.source as string)!;
    const tgtObj = typeof l.target === 'object' ? l.target : nodeById.get(l.target as string)!;
    return {
      sourceIdx: nodeIndex.get(srcObj.id)!,
      targetIdx: nodeIndex.get(tgtObj.id)!,
      relation: l.relation,
    };
  });

  // 6. Compute community centroids
  const commAccum = new Map<
    number,
    { sumX: number; sumY: number; sumZ: number; count: number }
  >();
  for (const n of processedNodes) {
    let acc = commAccum.get(n.community);
    if (!acc) {
      acc = { sumX: 0, sumY: 0, sumZ: 0, count: 0 };
      commAccum.set(n.community, acc);
    }
    acc.sumX += n.x;
    acc.sumY += n.y;
    acc.sumZ += n.z;
    acc.count += 1;
  }

  const communities: CommunityMeta[] = [];
  for (const [id, data] of commAccum) {
    communities.push({
      id,
      centroid: {
        x: data.sumX / data.count,
        y: data.sumY / data.count,
        z: data.sumZ / data.count,
      },
    });
  }

  const output: ProcessedGraph = { nodes: processedNodes, links: processedLinks, communities };

  // 7. Write
  writeFileSync(outputPath, JSON.stringify(output), 'utf-8');
  const bytes = Buffer.byteLength(JSON.stringify(output), 'utf-8');
  console.log(`Written ${outputPath}`);
  console.log(`  Nodes:      ${processedNodes.length}`);
  console.log(`  Links:      ${processedLinks.length}`);
  console.log(`  Communities: ${communities.length}`);
  console.log(`  Size:       ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
