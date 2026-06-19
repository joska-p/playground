import { createStore } from 'zustand';
import { getAllRules } from '../../core/grammar/registry';
import { SeededRandom } from '../../core/random/SeededRandom';
import { buildTree } from '../../core/tree/build';
import type { RandomartState } from './types';

function generateInitial(): RandomartState {
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const maxDepth = 6;
  const enabledRuleIds = getAllRules().map((r) => r.id);
  const rules = getAllRules();
  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth, rules);
  const treeG = buildTree(rngG, 0, maxDepth, rules);
  const treeB = buildTree(rngB, 0, maxDepth, rules);

  return {
    seedText,
    activeChannel: 'red',
    maxDepth,
    enabledRuleIds,
    treeR,
    treeG,
    treeB,
    rngR,
    rngG,
    rngB,
    running: false,
    time: 0,
    timeRef: { current: 0 },
    renderMode: 'glsl',
    correlatedRGB: false
  };
}

export const randomartStore = createStore<RandomartState>(() =>
  generateInitial()
);
