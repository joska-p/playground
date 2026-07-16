import { listRules } from '@repo/randomart-engine-next';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateTrees } from './adapter';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
  const mode = 'play';
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const maxDepth = 8;
  const enabledRuleIds = listRules().map((rule) => rule.id);
  const trees = generateTrees({
    seedText,
    enabledRuleIds,
    correlated: false
  });

  return {
    mode,
    seedText,
    activeChannel: 'red',
    maxDepth,
    enabledRuleIds,
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

export function updateTreeConfig(
  updater: (state: RandomartState) => Partial<RandomartState>,
  actionName?: string
): void {
  const currentState = randomartStore.getState();
  const partialNext = updater(currentState);

  const nextState = { ...currentState, ...partialNext };

  const recalculatedTrees = generateTrees({
    seedText: nextState.seedText,
    enabledRuleIds: nextState.enabledRuleIds,
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
