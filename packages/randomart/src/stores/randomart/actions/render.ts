import { randomartStore } from '../store';
import { regenerateTrees } from './trees';

export function setRenderMode(renderMode: 'canvas' | 'glsl'): void {
  // Pass false (don't replace entire state) and the action name
  randomartStore.setState({ renderMode }, false, 'render/setRenderMode');
}

export function setCorrelatedRGB(correlatedRGB: boolean): void {
  const state = randomartStore.getState();
  const trees = regenerateTrees(state.seedText, state.maxDepth, correlatedRGB);
  state.timeRef.current = 0;

  randomartStore.setState(
    { correlatedRGB, time: 0, ...trees },
    false,
    'render/setCorrelatedRGB'
  );
}
