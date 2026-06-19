import { randomartStore } from '../store';
import { regenerateTrees } from './trees';

export function setSeedText(seedText: string): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(seedText, state.maxDepth, state.correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState(
    { seedText, time: 0, ...trees },
    false,
    'seed/setSeedText'
  );
}

export function setMaxDepth(maxDepth: number): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(state.seedText, maxDepth, state.correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState(
    { maxDepth, time: 0, ...trees },
    false,
    'seed/setMaxDepth'
  );
}
