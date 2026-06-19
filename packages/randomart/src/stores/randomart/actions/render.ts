import { randomartStore } from '../store';
import { regenerateTrees } from './trees';

export function setRenderMode(renderMode: 'canvas' | 'glsl'): void {
  randomartStore.setState({ renderMode });
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(state.seedText, state.maxDepth, correlatedRGB);
  state.timeRef.current = 0;
  randomartStore.setState({ correlatedRGB, time: 0, ...trees });
}
