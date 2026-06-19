import { randomartStore } from '../store';

export function toggleRunning(): void {
  const state = randomartStore.getState();
  randomartStore.setState(
    { running: !state.running },
    false,
    'playback/toggleRunning'
  );
}

export function setRunning(running: boolean): void {
  randomartStore.setState({ running }, false, 'playback/setRunning');
}

export function setTime(time: number): void {
  const state = randomartStore.getState();
  state.timeRef.current = time;
  randomartStore.setState({ time }, false, 'playback/setTime');
}
