import { createStore } from 'zustand';
import { SeededRandom } from '../../core/SeededRandom';
import { buildTree } from '../../core/engine';
import { getAllRules } from '../../core/grammar/registry';
import type { ExpressionNode } from '../../core/types';

type RandomartState = {
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  maxDepth: number;
  enabledRuleIds: string[];
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
  running: boolean;
  time: number;
  timeRef: { current: number };
};

function generateInitial(): RandomartState {
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const maxDepth = 6;
  const enabledRuleIds = getAllRules().map((r) => r.id);
  const rules = getAllRules().filter((r) => enabledRuleIds.includes(r.id));
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
    timeRef: { current: 0 }
  };
}

export const randomartStore = createStore<RandomartState>(() =>
  generateInitial()
);
