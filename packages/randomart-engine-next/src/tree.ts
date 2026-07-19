import type { TreeView } from './format.js';
import type { OperatorId } from './grammar/operators/registry.js';
import { getOperator } from './grammar/operators/registry.js';
import type { Rule } from './grammar/rules/registry.js';
import type { SeededRandom } from './prng.js';
import { createCorrelatedRng, createDualRng } from './prng.js';

export type Node = {
  readonly type: OperatorId;
  readonly args: Record<string, Node | number>;
};

type PoolEntry = {
  type: OperatorId;
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
  for (const operator of operators) {
    if (operator.arity === 0 || rng.next() < structuralProbability) {
      pool.push(operator);
    }
  }
  return pool;
}

function weightedRandomPick(rng: SeededRandom, pool: readonly PoolEntry[]): PoolEntry {
  const totalWeight = pool.reduce((sum, operator) => sum + operator.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (const operator of pool) {
    threshold -= operator.weight;
    if (threshold <= 0) return operator;
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
  const hasTerminals = specEntries.some((entry) => entry.arity === 0);
  const operators = hasTerminals ? specEntries : [...specEntries, ...DEFAULT_TERMINALS];

  let pool: PoolEntry[];

  if (forceTerminal) {
    pool = operators.filter((operator) => operator.arity === 0);
    if (pool.length === 0) pool = [...DEFAULT_TERMINALS];
  } else if (forceOperator) {
    pool = operators.filter((operator) => operator.arity > 0);
    if (pool.length === 0) pool = [...operators];
  } else {
    const structuralProbability = 1 - currentDepth / maxDepth;
    pool = buildOperatorPool(rng, operators, structuralProbability);
  }

  const pick = weightedRandomPick(rng, pool);
  const operator = getOperator(pick.type);
  const args: Record<string, Node | number> = {};

  // Construct arguments uniformly by iterating over declared operator argument slot tags
  for (const argName of operator.argNames) {
    if (pick.type === 'const' && argName === 'value') {
      args[argName] = Number(rng.nextRange(-1, 1).toFixed(4));
    } else {
      args[argName] = buildTree(spec, maxDepth, pickRng, currentDepth + 1);
    }
  }

  return { type: pick.type, args };
}

export function evaluate(node: Node, x: number, y: number, t = 0): number {
  const operator = getOperator(node.type);
  const ctx = { x, y, t };
  const resolvedArgs: Record<string, number> = {};

  for (const name of operator.argNames) {
    const value = node.args[name];
    resolvedArgs[name] = typeof value === 'number' ? value : evaluate(value!, x, y, t);
  }

  return operator.evaluate({ args: resolvedArgs, ctx });
}

export function toGLSL(node: Node, coordVar = 'p'): string {
  const op = getOperator(node.type);
  const resolvedArgs: Record<string, string> = {};

  for (const name of op.argNames) {
    const val = node.args[name];
    resolvedArgs[name] = typeof val === 'number' ? val.toFixed(4) : toGLSL(val!, coordVar);
  }

  return op.toGLSL({ args: resolvedArgs, coordVar });
}

export function toStructuredView(node: Node): TreeView {
  const op = getOperator(node.type);
  const constVal = node.args['value'];
  const hasConstVal = typeof constVal === 'number';
  const label = hasConstVal ? `const(${constVal})` : node.type;

  const view: TreeView = { label, type: node.type };
  if (hasConstVal) {
    view.value = constVal;
  }

  const childrenViews: TreeView[] = [];
  for (const name of op.argNames) {
    const child = node.args[name];
    if (child && typeof child !== 'number') {
      childrenViews.push(toStructuredView(child));
    }
  }

  if (childrenViews.length > 0) {
    view.children = childrenViews;
  }

  return view;
}

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
