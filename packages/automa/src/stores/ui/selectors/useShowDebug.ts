import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);

export { useShowDebug };
