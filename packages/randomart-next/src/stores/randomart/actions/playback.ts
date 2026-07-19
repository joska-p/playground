import { randomartStore } from '../store';

export function toggleRunning(): void {
  const state = randomartStore.getState();
  randomartStore.setState({ running: !state.running }, false, 'playback/toggleRunning');
}
