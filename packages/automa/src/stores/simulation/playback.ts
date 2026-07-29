import { uiStore } from '../ui/store';
import { step } from './actions';

const play = async (): Promise<void> => {
  uiStore.setState({ running: true });
  while (uiStore.getState().running) {
    step();
    await new Promise((r) => setTimeout(r, uiStore.getState().speedMs));
  }
};

const pause = (): void => {
  uiStore.setState({ running: false });
};

const toggleRunning = (): void => {
  if (uiStore.getState().running) {
    pause();
  } else {
    void play();
  }
};

const setSpeed = (ms: number): void => {
  uiStore.setState({ speedMs: ms });
};

export { pause, setSpeed, toggleRunning };
