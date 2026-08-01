import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

type State = {
  sunAngle: number;
  bumpHeight: number;
  ambientLight: number;
  hueShift: number;
  hueFrequency: number;
  chromaScale: number;
};

// --- Store ---

const store = createStore<State>(() => ({
  sunAngle: 2.35,
  bumpHeight: 15.0,
  ambientLight: 0.01,
  hueShift: 0.0,
  hueFrequency: 0.1,
  chromaScale: 0.05
}));

// --- Selectors ---
const useSunAngle = () => useStore(store, (s) => s.sunAngle);
const useBumpHeight = () => useStore(store, (s) => s.bumpHeight);
const useAmbientLight = () => useStore(store, (s) => s.ambientLight);
const useHueShift = () => useStore(store, (s) => s.hueShift);
const useHueFrequency = () => useStore(store, (s) => s.hueFrequency);
const useChromaScale = () => useStore(store, (s) => s.chromaScale);

// --- Actions ---
const setSunAngle = (sunAngle: number) => {
  store.setState({ sunAngle });
};
const setBumpHeight = (bumpHeight: number) => {
  store.setState({ bumpHeight });
};
const setAmbientLight = (ambientLight: number) => {
  store.setState({ ambientLight });
};
const setHueShift = (hueShift: number) => {
  store.setState({ hueShift });
};
const setHueFrequency = (hueFrequency: number) => {
  store.setState({ hueFrequency });
};
const setChromaScale = (chromaScale: number) => {
  store.setState({ chromaScale });
};

export {
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle,
  setAmbientLight,
  setBumpHeight,
  setChromaScale,
  setHueFrequency,
  setHueShift,
  setSunAngle
};
