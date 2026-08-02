import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type Renderer = 'double-single' | 'perturbation' | 'original';

type State = {
  renderer: Renderer;
  iterationBase: number;
  iterationScale: number;
  iterationCap: number;
  interiorScale: number;
  pixelEps: number;
  sunAngle: number;
  bumpHeight: number;
  ambientLight: number;
  hueShift: number;
  hueFrequency: number;
  chromaScale: number;
};

// --- Store ---

const store = createStore<State>(() => ({
  renderer: 'original',
  iterationBase: 70,
  iterationScale: 30,
  iterationCap: 1200,
  interiorScale: 9.0,
  pixelEps: 0.0025,
  sunAngle: 2.35,
  bumpHeight: 15.0,
  ambientLight: 0.2,
  hueShift: 0.0,
  hueFrequency: 0.1,
  chromaScale: 0.05
}));

// --- Selectors ---
const useRenderer = () => useStore(store, (s) => s.renderer);
const useIterationBase = () => useStore(store, (s) => s.iterationBase);
const useIterationScale = () => useStore(store, (s) => s.iterationScale);
const useIterationCap = () => useStore(store, (s) => s.iterationCap);
const useInteriorScale = () => useStore(store, (s) => s.interiorScale);
const usePixelEps = () => useStore(store, (s) => s.pixelEps);
const useSunAngle = () => useStore(store, (s) => s.sunAngle);
const useBumpHeight = () => useStore(store, (s) => s.bumpHeight);
const useAmbientLight = () => useStore(store, (s) => s.ambientLight);
const useHueShift = () => useStore(store, (s) => s.hueShift);
const useHueFrequency = () => useStore(store, (s) => s.hueFrequency);
const useChromaScale = () => useStore(store, (s) => s.chromaScale);

// --- Actions ---
const setRenderer = (renderer: Renderer) => {
  store.setState({ renderer });
};
const setIterationBase = (iterationBase: number) => {
  store.setState({ iterationBase });
};
const setIterationScale = (iterationScale: number) => {
  store.setState({ iterationScale });
};
const setIterationCap = (iterationCap: number) => {
  store.setState({ iterationCap });
};
const setInteriorScale = (interiorScale: number) => {
  store.setState({ interiorScale });
};
const setPixelEps = (pixelEps: number) => {
  store.setState({ pixelEps });
};
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
  useRenderer,
  useIterationBase,
  useIterationScale,
  useIterationCap,
  useInteriorScale,
  usePixelEps,
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle,
  setRenderer,
  setIterationBase,
  setIterationScale,
  setIterationCap,
  setInteriorScale,
  setPixelEps,
  setAmbientLight,
  setBumpHeight,
  setChromaScale,
  setHueFrequency,
  setHueShift,
  setSunAngle
};
