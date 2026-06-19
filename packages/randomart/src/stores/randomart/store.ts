import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAllRules } from '../../core/grammar/registry';
import { generateTrees } from './actions/trees';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const maxDepth = 6;
  const enabledRuleIds = getAllRules().map((r) => r.id);
  const trees = generateTrees({ seedText, maxDepth, enabledRuleIds, correlated: false });

  return {
    seedText,
    activeChannel: 'red',
    maxDepth,
    enabledRuleIds,
    ...trees,
    running: false,
    time: 0,
    renderMode: 'glsl',
    correlatedRGB: false
  };
}

export const randomartStore = createStore<RandomartState>()(
  devtools(() => generateInitial(), { name: 'RandomartStore' })
);

// Reactive subscriber: auto-regenerate trees when config changes
randomartStore.subscribe((state, prev) => {
  const configChanged = (
    state.seedText !== prev.seedText ||
    state.maxDepth !== prev.maxDepth ||
    state.enabledRuleIds !== prev.enabledRuleIds ||
    state.correlatedRGB !== prev.correlatedRGB
  );
  if (!configChanged) return;

  const trees = generateTrees({
    seedText: state.seedText,
    maxDepth: state.maxDepth,
    enabledRuleIds: state.enabledRuleIds,
    correlated: state.correlatedRGB,
  });

  randomartStore.setState({ ...trees, time: 0 });
});
