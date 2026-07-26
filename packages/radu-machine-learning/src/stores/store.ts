import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { ChartPoint } from '../components/chart/types';

type ShowTooltipAt = {
  point: ChartPoint;
  cx: number;
  cy: number;
} | null;

type RaduStore = {
  baseUrl: string;
  selectedDrawingId: number | null;
  currentDrawingPathCount: number;
  currentDrawingPointCount: number;
  showTooltipAt: ShowTooltipAt;
};

const raduStore = createStore<RaduStore>(() => ({
  baseUrl: '/',
  selectedDrawingId: null,
  currentDrawingPathCount: 0,
  currentDrawingPointCount: 0,
  showTooltipAt: null
}));

/* Getters */

export function useBaseUrl(): string {
  return useStore(raduStore, (state) => state.baseUrl);
}

export function useSelectedDrawingId(): number | null {
  return useStore(raduStore, (state) => state.selectedDrawingId);
}

export function useCurrentDrawingPathCount(): number {
  return useStore(raduStore, (state) => state.currentDrawingPathCount);
}

export function useCurrentDrawingPointCount(): number {
  return useStore(raduStore, (state) => state.currentDrawingPointCount);
}

export function useShowTooltipAt(): ShowTooltipAt {
  return useStore(raduStore, (state) => state.showTooltipAt);
}

/* Setters */

export function setBaseUrl(baseUrl: string): void {
  raduStore.setState({ baseUrl });
}

export function setSelectedDrawingId(id: number | null): void {
  raduStore.setState({ selectedDrawingId: id });
}

export function setCurrentDrawingPathCount(count: number): void {
  raduStore.setState({ currentDrawingPathCount: count });
}

export function setCurrentDrawingPointCount(count: number): void {
  raduStore.setState({ currentDrawingPointCount: count });
}

export function setShowTooltipAt(showTooltipAt: ShowTooltipAt): void {
  raduStore.setState({ showTooltipAt });
}

export { raduStore };
