import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type Renderer = 'double-single' | 'perturbation' | 'original';

type ViewState = {
    renderer: Renderer;
};

const viewStore = createStore<ViewState>(() => ({
    renderer: 'original'
}));

// --- Renderer selectors ---
export const useRenderer = () => useStore(viewStore, (s) => s.renderer);

// --- Renderer actions ---
export const setRenderer = (renderer: Renderer) => {
    viewStore.setState({ renderer });
};
