import { buildTree } from './build';
import { getAllRules } from '../grammar/registry';
import { SeededRandom } from '../random/SeededRandom';

import type { ExpressionNode, GrammarRule, RuleId, RuleWeights } from '../types';

export type TreeConfig = {
    seedText: string;
    maxDepth: number;
    enabledRuleIds: RuleId[];
    correlated: boolean;
    ruleWeights: RuleWeights;
};

export type TreeOutput = {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
    rngR: SeededRandom;
    rngG: SeededRandom;
    rngB: SeededRandom;
};

/**
 * With `correlated`, all channels draw from one PRNG stream so they stay visually similar for a
 * seed; otherwise each channel gets its own stream and the same seed produces clearly different art
 * per channel.
 */
export function generateTrees(config: TreeConfig): TreeOutput {
    const rules = getAllRules()
        .filter((rule) => config.enabledRuleIds.includes(rule.id as RuleId))
        .map((rule) => {
            const weightsOverride = config.ruleWeights[rule.id as RuleId] ?? rule.weight;

            return { ...rule, weight: weightsOverride };
        }) satisfies GrammarRule[];

    if (config.correlated) {
        // One shared stream, so the three trees get the same structural decisions
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

    // Salt each seed so a channel never accidentally matches the structure stream
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
