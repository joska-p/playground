import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { Point2D } from '@repo/graphics/2d/transforms';

export type Renderer = 'double-single' | 'perturbation' | 'original';

export type View = { pan: Point2D; zoom: number };

type ViewState = {
  renderer: Renderer;
  pan: Point2D;
  zoom: number;
  resetVersion: number;
};

// Shared view state: pan/zoom/renderer are the only things safe to share
// across renderers (same complex-plane convention in every shader). Params
// stay per-renderer in the dedicated stores.
const viewStore = createStore<ViewState>(() => ({
  renderer: 'original',
  pan: { x: 0, y: 0 },
  zoom: 1,
  resetVersion: 0
}));

// --- View selectors ---
export const useRenderer = () => useStore(viewStore, (s) => s.renderer);
export const useViewPan = () => useStore(viewStore, (s) => s.pan);
export const useViewZoom = () => useStore(viewStore, (s) => s.zoom);
export const useResetVersion = () => useStore(viewStore, (s) => s.resetVersion);

// --- View actions ---
export const setRenderer = (renderer: Renderer) => {
  viewStore.setState({ renderer });
};
export const setView = (view: View) => {
  viewStore.setState(view);
};
export const resetView = () => {
  viewStore.setState({
    pan: { x: 0, y: 0 },
    zoom: 1,
    resetVersion: viewStore.getState().resetVersion + 1
  });
};
