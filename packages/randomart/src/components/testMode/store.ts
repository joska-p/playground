import { createStore, useStore } from 'zustand';

export type ArgPreset = 'gradient' | 'symmetric' | 'interactive';

type TestModeState = {
  globalT: number;
  argPreset: ArgPreset;
};

const testModeStore = createStore<TestModeState>()(() => ({
  globalT: 0.5,
  argPreset: 'gradient'
}));

export function useGlobalT(): number {
  return useStore(testModeStore, (s) => s.globalT);
}

export function useArgPreset(): ArgPreset {
  return useStore(testModeStore, (s) => s.argPreset);
}

export function setGlobalT(value: number): void {
  testModeStore.setState({ globalT: value }, false, 'testMode/setGlobalT');
}

export function setArgPreset(value: ArgPreset): void {
  testModeStore.setState({ argPreset: value }, false, 'testMode/setArgPreset');
}
