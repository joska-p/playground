import type { TreeView } from './format.js';
import type { OperatorId } from './grammar/operators/registry.js';
import { getOperator } from './grammar/operators/registry.js';
import type { Rule } from './grammar/rules/registry.js';
import type { SeededRandom } from './prng.js';
import { createCorrelatedRng, createDualRng } from './prng.js';
import { clamp } from './util.js';

export type Node = {
  readonly type: OperatorId;
  readonly value?: number;
  readonly children?: Node[];
};

type PoolEntry = {
  type: Node['type'];
  arity: number;
  weight: number;
};

const DEFAULT_TERMINALS: readonly PoolEntry[] = [
  { type: 'x', arity: 0, weight: 1.0 },
  { type: 'y', arity: 0, weight: 1.0 },
  { type: 'const', arity: 0, weight: 0.5 }
];

const operatorToPoolEntry = (id: OperatorId): PoolEntry => ({
  type: id,
  arity: getOperator(id).arity,
  weight: id === 'const' ? 0.5 : 1.0
});

function buildOperatorPool(
  rng: SeededRandom,
  operators: readonly PoolEntry[],
  structuralProbability: number
): PoolEntry[] {
  const pool: PoolEntry[] = [];
  for (const op of operators) {
    if (op.arity === 0 || rng.next() < structuralProbability) {
      pool.push(op);
    }
  }
  return pool;
}

function weightedRandomPick(rng: SeededRandom, pool: readonly PoolEntry[]): PoolEntry {
  const totalWeight = pool.reduce((sum, op) => sum + op.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (const op of pool) {
    threshold -= op.weight;
    if (threshold <= 0) return op;
  }
  return pool[pool.length - 1]!;
}

export function buildTree(
  spec: Rule,
  maxDepth: number,
  pickRng: (depth: number) => SeededRandom,
  currentDepth = 0
): Node {
  const rng = pickRng(currentDepth);
  const forceTerminal = currentDepth >= maxDepth;
  const forceOperator = currentDepth < spec.minDepth;

  const specEntries = [...spec.operators].map(operatorToPoolEntry);
  const hasTerminals = specEntries.some((e) => e.arity === 0);
  const operators = hasTerminals ? specEntries : [...specEntries, ...DEFAULT_TERMINALS];

  let pool: PoolEntry[];

  if (forceTerminal) {
    pool = operators.filter((op) => op.arity === 0);
    if (pool.length === 0) pool = [...DEFAULT_TERMINALS];
  } else if (forceOperator) {
    pool = operators.filter((op) => op.arity > 0);
    if (pool.length === 0) pool = [...operators];
  } else {
    const structuralProbability = 1 - currentDepth / maxDepth;
    pool = buildOperatorPool(rng, operators, structuralProbability);
  }

  const pick = weightedRandomPick(rng, pool);

  if (pick.type === 'const') {
    return { type: 'const', value: Number(rng.nextRange(-1, 1).toFixed(4)) };
  }

  if (pick.arity === 0) {
    return { type: pick.type };
  }

  const children: Node[] = [];
  for (let i = 0; i < pick.arity; i++) {
    children.push(buildTree(spec, maxDepth, pickRng, currentDepth + 1));
  }
  return { type: pick.type, children };
}

export function evaluate(node: Node, x: number, y: number): number {
  if (node.type === 'x') return x;
  if (node.type === 'y') return y;
  if (node.type === 'const') return node.value ?? 0;

  const op = getOperator(node.type);
  if (op.arity === 0) return op.evaluate({}, x, y);

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, evaluate(node.children![i]!, x, y)])
  ) as Record<string, number>;
  return op.evaluate(args, x, y);
}

export function toGLSL(node: Node): string {
  if (node.type === 'x') return 'p.x';
  if (node.type === 'y') return 'p.y';
  if (node.type === 'const') return (node.value ?? 0).toFixed(4);

  const op = getOperator(node.type);
  if (op.arity === 0) return op.toGLSL({});

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, toGLSL(node.children![i]!)])
  ) as Record<string, string>;
  return op.toGLSL(args);
}

export function serializeToBytes(node: Node): Uint8Array {
  const out: number[] = [];
  const walk = (n: Node): void => {
    out.push(getOperator(n.type).opcode);
    if (n.type === 'const') {
      const q = Math.round((clamp(n.value ?? 0) + 1) * 127.5);
      out.push(Math.max(0, Math.min(255, q)));
    }
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return Uint8Array.from(out);
}

export function toStructuredView(node: Node): TreeView {
  const label = node.type === 'const' ? `const(${node.value ?? 0})` : node.type;
  const view: TreeView = { label, type: node.type };
  if (node.type === 'const') view.value = node.value ?? 0;
  if (node.children && node.children.length > 0) {
    view.children = node.children.map(toStructuredView);
  }
  return view;
}

/** Depth below which the shared structureRng drives branching decisions,
 *  keeping the overall tree shape consistent across R/G/B channels. */
const STRUCTURE_RNG_DEPTH = 3;

export function buildChannelTrees(
  seedText: string,
  spec: Rule,
  correlated: boolean
): { treeR: Node; treeG: Node; treeB: Node } {
  const pickRng =
    (structure: SeededRandom, channel: SeededRandom) =>
    (depth: number): SeededRandom =>
      depth < STRUCTURE_RNG_DEPTH ? structure : channel;

  if (correlated) {
    const { structure, channels } = createCorrelatedRng(seedText);
    return {
      treeR: buildTree(spec, spec.maxDepth, pickRng(structure, channels[0])),
      treeG: buildTree(spec, spec.maxDepth, pickRng(structure, channels[1])),
      treeB: buildTree(spec, spec.maxDepth, pickRng(structure, channels[2]))
    };
  }

  const { structure, channels } = createDualRng(seedText, spec.maxDepth);
  return {
    treeR: buildTree(spec, spec.maxDepth, pickRng(structure, channels[0])),
    treeG: buildTree(spec, spec.maxDepth, pickRng(structure, channels[1])),
    treeB: buildTree(spec, spec.maxDepth, pickRng(structure, channels[2]))
  };
}
