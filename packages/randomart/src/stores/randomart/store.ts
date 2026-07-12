import type { RuleId } from '@repo/randomart-engine/grammar/registry';
import { getAllRules, getInitialWeights } from '@repo/randomart-engine/grammar/registry';
import { generateTrees } from '@repo/randomart-engine/tree/generate';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
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
 * Centrally batches updates to tree configuration fields and safely
 * recalculates the generative math trees within the exact same atomic state transition.
 */
export function updateTreeConfig(
  updater: (state: RandomartState) => Partial<RandomartState>,
  actionName?: string
): void {
  const currentState = randomartStore.getState();
  const partialNext = updater(currentState);

  // Create an integrated next state frame to calculate next trees cleanly
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
