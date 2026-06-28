import { getLayer } from '../../core/layers/registry';
import type { CanvasViewport } from '../../core/types';
import { uiStore } from './store';

export function getViewportState(): CanvasViewport {
  return uiStore.getState().viewport;
}

export function toggleLayer(layerId: string): void {
  const state = uiStore.getState();
  const layers = state.layers.map((l) =>
    l.layerId === layerId ? { ...l, enabled: !l.enabled } : l
  );
  uiStore.setState({ layers });
}

export function addLayer(layerId: string): void {
  const state = uiStore.getState();
  const layer = getLayer(layerId);
  if (!layer) return;

  uiStore.setState({
    layers: [...state.layers, { layerId, enabled: true, params: { ...layer.defaults } }]
  });
}

export function setViewport(v: Partial<CanvasViewport>): void {
  const current = uiStore.getState().viewport;
  uiStore.setState({ viewport: { ...current, ...v } });
}

export function updateLayerParams(layerId: string, params: Record<string, unknown>): void {
  const state = uiStore.getState();
  const layers = state.layers.map((l) =>
    l.layerId === layerId ? { ...l, params: { ...l.params, ...params } } : l
  );
  uiStore.setState({ layers });
}
