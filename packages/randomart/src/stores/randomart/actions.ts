import { SeededRandom } from '../../core/SeededRandom';
import { buildTree } from '../../core/engine';
import { randomartStore } from './store';

function regenerateTrees(seedText: string, maxDepth: number) {
  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth);
  const treeG = buildTree(rngG, 0, maxDepth);
  const treeB = buildTree(rngB, 0, maxDepth);

  return { treeR, treeG, treeB, rngR, rngG, rngB };
}

export function setSeedText(seedText: string): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(seedText, state.maxDepth);
  randomartStore.setState({ seedText, ...trees });
}

export function setActiveChannel(channel: 'red' | 'green' | 'blue'): void {
  randomartStore.setState({ activeChannel: channel });
}
