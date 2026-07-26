import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

type SelectionStore = {
  baseUrl: string;
  selectedDrawingId: number | null;
  scrollToDrawingId: number | null;
};

const selectionStore = createStore<SelectionStore>(() => ({
  baseUrl: '/',
  selectedDrawingId: null,
  scrollToDrawingId: null
}));

/* Getters */

export function useBaseUrl(): string {
  return useStore(selectionStore, (state) => state.baseUrl);
}

export function useSelectedDrawingId(): number | null {
  return useStore(selectionStore, (state) => state.selectedDrawingId);
}

export function useScrollToDrawingId(): number | null {
  return useStore(selectionStore, (state) => state.scrollToDrawingId);
}

/* Setters */

export function setBaseUrl(baseUrl: string): void {
  selectionStore.setState({ baseUrl });
}

export function setSelectedDrawingId(id: number | null): void {
  selectionStore.setState({ selectedDrawingId: id });
}

export function scrollToDrawing(id: number): void {
  selectionStore.setState({ scrollToDrawingId: id, selectedDrawingId: id });
}

export function clearScrollTo(): void {
  selectionStore.setState({ scrollToDrawingId: null });
}

export { selectionStore };
