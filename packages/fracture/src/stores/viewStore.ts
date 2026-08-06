import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { Point2D } from '@repo/glaze/core/coords/camera';

export type Renderer = 'double-single' | 'perturbation' | 'original';

export type View = { pan: Point2D; zoom: number };

type ViewState = {
    renderer: Renderer;
    pan: Point2D;
    zoom: number;
};

const viewStore = createStore<ViewState>(() => ({
    renderer: 'original',
    pan: { x: 0, y: 0 },
    zoom: 1
}));

// --- View selectors ---
export const useRenderer = () => useStore(viewStore, (s) => s.renderer);
export const useViewPan = () => useStore(viewStore, (s) => s.pan);
export const useViewZoom = () => useStore(viewStore, (s) => s.zoom);

// --- View actions ---
export const setRenderer = (renderer: Renderer) => {
    viewStore.setState({ renderer });
};
export const setView = (view: View) => {
    viewStore.setState(view);
};
