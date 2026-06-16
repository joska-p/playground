import { createStore } from 'zustand';
import { SeededRandom } from '../../core/SeededRandom';
import { buildTree } from '../../core/engine';
import type { ExpressionNode } from '../../core/types';

type RandomartState = {
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  maxDepth: number;
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
};

function generateInitial(): RandomartState {
  const seedText = "De deux choses lune l'autre c'est le soleil";
  const maxDepth = 6;
  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth);
  const treeG = buildTree(rngG, 0, maxDepth);
  const treeB = buildTree(rngB, 0, maxDepth);

  return {
    seedText,
    activeChannel: 'red',
    maxDepth,
    treeR,
    treeG,
    treeB,
    rngR,
    rngG,
    rngB
  };
}

export const randomartStore = createStore<RandomartState>(() =>
  generateInitial()
);
