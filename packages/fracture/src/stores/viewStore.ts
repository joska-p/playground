import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

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
