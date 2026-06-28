import { getLayer } from '../../core/layers/registry';
import type { CanvasViewport } from '../../core/types';
import { uiStore } from './store';

export function getViewportState(): CanvasViewport {
  return uiStore.getState().viewport;
}

export function toggleLayer(id: string): void {
  const state = uiStore.getState();
  const layers = state.layers.map((layer) =>
    layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
  );
  uiStore.setState({ layers });
}

export function addLayer(id: string): void {
  const state = uiStore.getState();
  const layer = getLayer(id);
  if (!layer) return;

  const defaults: Record<string, unknown> = {};
  for (const key in layer.params) {
    defaults[key] = layer.params[key].default;
  }

  uiStore.setState({
    layers: [...state.layers, { id, enabled: true, params: defaults }]
  });
}

export function setViewport(v: Partial<CanvasViewport>): void {
  const current = uiStore.getState().viewport;
  uiStore.setState({ viewport: { ...current, ...v } });
}

export function updateLayerParams(id: string, params: Record<string, unknown>): void {
  const state = uiStore.getState();
  const layers = state.layers.map((layer) =>
    layer.id === id ? { ...layer, params: { ...layer.params, ...params } } : layer
  );
  uiStore.setState({ layers });
}
