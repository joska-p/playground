import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

type RaduStore = {
  selectedDrawingId: number | null;
};

const raduStore = createStore<RaduStore>(() => ({
  selectedDrawingId: null
}));

export function useSelectedDrawingId(): number | null {
  return useStore(raduStore, (state) => state.selectedDrawingId);
}

export function setSelectedDrawingId(id: number | null): void {
  raduStore.setState({ selectedDrawingId: id });
}

export { raduStore };
