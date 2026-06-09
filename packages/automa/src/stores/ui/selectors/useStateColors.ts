import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useStateColors = () => useStore(uiStore, (s) => s.stateColors);

export { useStateColors };
