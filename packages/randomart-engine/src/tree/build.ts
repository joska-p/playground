import { getAllRules } from '../grammar/registry';
import type { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../types';

// Above this depth the shared structureRng drives decisions, so R/G/B trees keep the same overall shape
const STRUCTURE_RNG_DEPTH = 3;

function weightedPick(rng: SeededRandom, rules: GrammarRule[]): number {
    if (rules.length === 0) return -1;
    const totalWeight = rules.reduce((sum, r) => sum + r.weight, 0);
    let threshold = rng.next() * totalWeight;
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        threshold -= rule.weight;
        if (threshold <= 0) return i;
    }
    return rules.length - 1;
}

// Each rule gets its own RNG draw, so seeds yield pools of different sizes — that per-rule
// variance is what drives tree variety. Terminals are always included as a guaranteed fallback.
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
    return pool.length > 0 ? pool : rules.filter((r) => r.category === 'terminal');
}

/**
 * Shallow nodes are picked by `structureRng` (shared across channels) so R/G/B trees share shape;
 * deeper nodes use `channelRng`, which is what makes each channel differ.
 */
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

    return rule.buildNode(rngToUse, () =>
        buildTree(structureRng, channelRng, currentDepth + 1, maxDepth, rules)
    );
}
