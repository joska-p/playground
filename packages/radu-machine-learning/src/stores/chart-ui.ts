import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { ChartPoint } from '../components/chart/types';

type ShowTooltipAt = {
  point: ChartPoint;
  cx: number;
  cy: number;
} | null;

type ChartUiStore = {
  showTooltipAt: ShowTooltipAt;
};

const chartUiStore = createStore<ChartUiStore>(() => ({
  showTooltipAt: null
}));

/* Getters */

export function useShowTooltipAt(): ShowTooltipAt {
  return useStore(chartUiStore, (state) => state.showTooltipAt);
}

/* Setters */

export function setShowTooltipAt(value: ShowTooltipAt): void {
  chartUiStore.setState({ showTooltipAt: value });
}

export { chartUiStore };
