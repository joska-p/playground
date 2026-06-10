import { useStore } from 'zustand';
import { uiStore } from '../store';

const useStateColors = () => useStore(uiStore, (s) => s.stateColors);

export { useStateColors };
