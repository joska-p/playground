import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

type RaduStore = {
  selectedDrawingId: number | null;
  currentDrawingPathCount: number;
  currentDrawingPointCount: number;
};

const raduStore = createStore<RaduStore>(() => ({
  selectedDrawingId: null,
  currentDrawingPathCount: 0,
  currentDrawingPointCount: 0
}));

/* Getters */

export function useSelectedDrawingId(): number | null {
  return useStore(raduStore, (state) => state.selectedDrawingId);
}

export function useCurrentDrawingPathCount(): number {
  return useStore(raduStore, (state) => state.currentDrawingPathCount);
}

export function useCurrentDrawingPointCount(): number {
  return useStore(raduStore, (state) => state.currentDrawingPointCount);
}

/* Setters */

export function setSelectedDrawingId(id: number | null): void {
  raduStore.setState({ selectedDrawingId: id });
}

export function setCurrentDrawingPathCount(count: number): void {
  raduStore.setState({ currentDrawingPathCount: count });
}

export function setCurrentDrawingPointCount(count: number): void {
  raduStore.setState({ currentDrawingPointCount: count });
}

export { raduStore };
