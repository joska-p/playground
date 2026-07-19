import { createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ArgPreset = 'gradient' | 'symmetric' | 'interactive';
export type RenderMode = 'cpu' | 'gpu' | 'compare';

type TestModeState = {
  globalT: number;
  argPreset: ArgPreset;
  seed: number;
  ruleSeedOverrides: Record<string, number>;
  resolution: number;
  renderMode: RenderMode;
  query: string;
  category: string;
  selectedRuleId: string | null;
  t: number;
  animate: boolean;
};

const testModeStore = createStore<TestModeState>()(
  devtools(
    () => ({
      globalT: 0.5,
      argPreset: 'gradient',
      seed: 1,
      ruleSeedOverrides: {},
      resolution: 96,
      renderMode: 'cpu',
      query: '',
      category: 'all',
      selectedRuleId: null,
      t: 0,
      animate: false
    }),
    { name: 'testModeStore' }
  )
);

// Hooks
export const useGlobalT = () => useStore(testModeStore, (s) => s.globalT);
export const useArgPreset = () => useStore(testModeStore, (s) => s.argPreset);
export const useSeed = () => useStore(testModeStore, (s) => s.seed);
export const useResolution = () => useStore(testModeStore, (s) => s.resolution);
export const useRenderMode = () => useStore(testModeStore, (s) => s.renderMode);
export const useQuery = () => useStore(testModeStore, (s) => s.query);
export const useCategory = () => useStore(testModeStore, (s) => s.category);
export const useSelectedRuleId = () => useStore(testModeStore, (s) => s.selectedRuleId);
export const useT = () => useStore(testModeStore, (s) => s.t);
export const useAnimate = () => useStore(testModeStore, (s) => s.animate);
export const useSeedForRule = (ruleId: string) =>
  useStore(testModeStore, (s) => s.ruleSeedOverrides[ruleId] ?? s.seed);

// Actions
export function setSeed(seed: number): void {
  testModeStore.setState({ seed, ruleSeedOverrides: {} }, false, 'testMode/setSeed');
}

export function rerollGlobalSeed(): void {
  testModeStore.setState(
    { seed: Math.floor(Math.random() * 1_000_000), ruleSeedOverrides: {} },
    false,
    'testMode/rerollGlobalSeed'
  );
}

export function rerollRule(ruleId: string): void {
  testModeStore.setState(
    (state) => ({
      ruleSeedOverrides: {
        ...state.ruleSeedOverrides,
        [ruleId]: Math.floor(Math.random() * 1_000_000)
      }
    }),
    false,
    'testMode/rerollRule'
  );
}

export function setResolution(resolution: number): void {
  testModeStore.setState({ resolution }, false, 'testMode/setResolution');
}

export function setRenderMode(renderMode: RenderMode): void {
  testModeStore.setState({ renderMode }, false, 'testMode/setRenderMode');
}

export function setQuery(query: string): void {
  testModeStore.setState({ query }, false, 'testMode/setQuery');
}

export function setCategory(category: string): void {
  testModeStore.setState({ category }, false, 'testMode/setCategory');
}

export function selectRule(ruleId: string | null): void {
  testModeStore.setState({ selectedRuleId: ruleId }, false, 'testMode/selectRule');
}

export function setT(t: number): void {
  testModeStore.setState({ t }, false, 'testMode/setT');
}

export function toggleAnimate(): void {
  testModeStore.setState((state) => ({ animate: !state.animate }), false, 'testMode/toggleAnimate');
}

export function setGlobalT(value: number): void {
  testModeStore.setState({ globalT: value }, false, 'testMode/setGlobalT');
}

export function setArgPreset(value: ArgPreset): void {
  testModeStore.setState({ argPreset: value }, false, 'testMode/setArgPreset');
}

export { testModeStore };
