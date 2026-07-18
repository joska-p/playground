import { DEFAULT_RULE_ID, getRule } from '@repo/randomart-engine-next';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateTrees } from './adapter';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
  const mode = 'play';
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const preset = getRule(DEFAULT_RULE_ID);
  const selectedRuleId = DEFAULT_RULE_ID;
  const minDepth = preset.minDepth;
  const maxDepth = preset.maxDepth;

  const trees = generateTrees({
    seedText,
    selectedRuleId,
    customOperators: null,
    minDepth,
    maxDepth,
    correlated: false
  });

  return {
    mode,
    seedText,
    activeChannel: 'red',
    selectedRuleId,
    customOperators: null,
    minDepth,
    maxDepth,
    ...trees,
    running: false,
    time: 0,
    animationSpeed: 0.3,
    activeAnimationBehaviorIds: ['hue-shift'],
    colorSpace: 'srgb',
    correlatedRGB: false
  };
}

export const randomartStore = createStore<RandomartState>()(
  devtools(() => generateInitial(), { name: 'RandomartStore' })
);

export function updateTreeConfig(
  updater: (state: RandomartState) => Partial<RandomartState>,
  actionName?: string
): void {
  const currentState = randomartStore.getState();
  const partialNext = updater(currentState);

  const nextState = { ...currentState, ...partialNext };

  const recalculatedTrees = generateTrees({
    seedText: nextState.seedText,
    selectedRuleId: nextState.selectedRuleId,
    customOperators: nextState.customOperators,
    minDepth: nextState.minDepth,
    maxDepth: nextState.maxDepth,
    correlated: nextState.correlatedRGB
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
