import { getAllRules } from '../grammar/registry';
import { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode, GrammarRule, RuleId, RuleWeights } from '../types';
import { buildTree } from './build';

/**
 * Options controlling tree generation.
 */
export type TreeConfig = {
    seedText: string;
    maxDepth: number;
    enabledRuleIds: RuleId[];
    correlated: boolean;
    ruleWeights: RuleWeights;
};

/**
 * The generated per-channel trees plus the PRNG instances that produced them.
 */
export type TreeOutput = {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
    rngR: SeededRandom;
    rngG: SeededRandom;
    rngB: SeededRandom;
};

/**
 * Generates one expression tree per color channel from a seed string. In
 * correlated mode all channels share a single PRNG stream; otherwise each
 * channel gets its own PRNG, which produces visibly different art for the same
 * seed.
 * @param config - Tree generation options.
 * @returns The generated per-channel trees and their PRNG instances.
 * @example
 * ```ts
 * const { treeR, treeG, treeB } = generateTrees({
 *     seedText: 'hello world',
 *     maxDepth: 8,
 *     enabledRuleIds: ['x', 'y', 'sin', 'cos', 'add', 'constant'],
 *     correlated: false
 * });
 * ```
 */
export function generateTrees(config: TreeConfig): TreeOutput {
    const rules = getAllRules()
        .filter((rule) => config.enabledRuleIds.includes(rule.id as RuleId))
        .map((rule) => {
            const weightsOverride = config.ruleWeights[rule.id as RuleId] ?? rule.weight;
            return { ...rule, weight: weightsOverride };
        }) satisfies GrammarRule[];

    if (config.correlated) {
        // All three channels share one RNG stream so they get the same structural
        // decisions, but they're built as separate trees — no aliasing.
        const rng = new SeededRandom(config.seedText + '_rgb');
        return {
            treeR: buildTree(rng, rng, 0, config.maxDepth, rules),
            treeG: buildTree(rng, rng, 0, config.maxDepth, rules),
            treeB: buildTree(rng, rng, 0, config.maxDepth, rules),
            rngR: rng,
            rngG: rng,
            rngB: rng
        };
    }

    // Mix the base seed string with unique properties so structural hashes change completely
    const structureRng = new SeededRandom(`${config.seedText}_struct_${String(config.maxDepth)}`);
    const rngR = new SeededRandom(`${config.seedText}_red`);
    const rngG = new SeededRandom(`${config.seedText}_green`);
    const rngB = new SeededRandom(`${config.seedText}_blue`);

    return {
        treeR: buildTree(structureRng, rngR, 0, config.maxDepth, rules),
        treeG: buildTree(structureRng, rngG, 0, config.maxDepth, rules),
        treeB: buildTree(structureRng, rngB, 0, config.maxDepth, rules),
        rngR,
        rngG,
        rngB
    };
}
