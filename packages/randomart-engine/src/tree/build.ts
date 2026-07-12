import { getAllRules } from '../grammar/registry';
import type { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../types';

// Depth below which the shared structureRng drives category selection,
// keeping the overall tree shape consistent across R/G/B channels.
const STRUCTURE_RNG_DEPTH = 3;

function weightedPick(rng: SeededRandom, rules: GrammarRule[]): number {
  if (rules.length === 0) return -1;
  const totalWeight = rules.reduce((sum, r) => sum + r.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule) continue;
    threshold -= rule.weight;
    if (threshold <= 0) return i;
  }
  return rules.length - 1;
}

// Builds the candidate pool by rolling each structural rule independently
// against structuralProbability. Each rule gets its own RNG draw, so different
// seeds produce pools of different sizes — this per-rule variance is what drives
// tree variety. Terminals are always included as a guaranteed fallback.
function buildPool(
  rng: SeededRandom,
  rules: GrammarRule[],
  structuralProbability: number
): GrammarRule[] {
  const pool: GrammarRule[] = [];
  for (const rule of rules) {
    if (rule.category === 'terminal' || rng.next() < structuralProbability) {
      pool.push(rule);
    }
  }
  // If no terminals were in the rule set somehow, fall back to all terminals
  return pool.length > 0 ? pool : rules.filter((r) => r.category === 'terminal');
}

export function buildTree(
  structureRng: SeededRandom,
  channelRng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  rules?: GrammarRule[]
): ExpressionNode {
  const availableRules = rules ?? getAllRules();
  const rngToUse = currentDepth < STRUCTURE_RNG_DEPTH ? structureRng : channelRng;

  const structuralProbability = 1 - currentDepth / maxDepth;
  const pool = buildPool(rngToUse, availableRules, structuralProbability);
  const idx = weightedPick(rngToUse, pool);
  const rule = pool[idx];

  if (!rule) {
    throw new Error('No rule found to build node');
  }

  return rule.buildNode(rngToUse, () =>
    buildTree(structureRng, channelRng, currentDepth + 1, maxDepth, rules)
  );
}
