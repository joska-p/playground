import { useStore } from 'zustand';
import { uiStore } from '../store';

const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);

export { useShowDebug };
