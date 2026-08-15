import type { RuleId } from '@repo/randomart-engine/grammar/registry';
import { getAllRules, getInitialWeights } from '@repo/randomart-engine/grammar/registry';
import { generateTrees } from '@repo/randomart-engine/tree/generate';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
    const mode = 'play';
    const seedText = "De deux choses lune l'autre c'est le soleil";
    const maxDepth = 8;
    const enabledRuleIds = getAllRules().map((rule) => rule.id as RuleId);
    const ruleWeights = getInitialWeights();
    const trees = generateTrees({
        seedText,
        maxDepth,
        enabledRuleIds,
        correlated: false,
        ruleWeights
    });

    return {
        mode,
        seedText,
        activeChannel: 'red',
        maxDepth,
        enabledRuleIds,
        ruleWeights,
        ...trees,
        running: false,
        time: 0,
        animationSpeed: 0.3,
        correlatedRGB: false,
        activeAnimationBehaviorIds: ['hue-shift']
    };
}

export const randomartStore = createStore<RandomartState>()(
    devtools(() => generateInitial(), { name: 'RandomartStore' })
);

/**
 * Rebuilds the trees in the same setState that applies the config change, so the store never
 * holds a config that doesn't match its trees.
 */
export function updateTreeConfig(
    updater: (state: RandomartState) => Partial<RandomartState>,
    actionName?: string
): void {
    const currentState = randomartStore.getState();
    const partialNext = updater(currentState);

    // Regenerate against the merged state, not the current one: the updater may change the seed,
    // depth or weights, and the new trees must match that pending change.
    const nextState = { ...currentState, ...partialNext };

    const recalculatedTrees = generateTrees({
        seedText: nextState.seedText,
        maxDepth: nextState.maxDepth,
        enabledRuleIds: nextState.enabledRuleIds,
        correlated: nextState.correlatedRGB,
        ruleWeights: nextState.ruleWeights
    });

    randomartStore.setState(
        {
            ...partialNext,
            ...recalculatedTrees
        },
        false,
        actionName ?? 'config/updateTreeConfig'
    );
}
