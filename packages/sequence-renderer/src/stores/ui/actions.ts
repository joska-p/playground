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

export function removeLayer(layerId: string): void {
  const state = uiStore.getState();
  const enabledLayers = state.layers.filter((l) => l.enabled);
  const target = state.layers.find((l) => l.layerId === layerId);
  if (!target) return;
  if (target.enabled && enabledLayers.length <= 1) return;

  uiStore.setState({
    layers: state.layers.filter((l) => l.layerId !== layerId)
  });
}

export function moveLayerUp(layerId: string): void {
  const state = uiStore.getState();
  const idx = state.layers.findIndex((l) => l.layerId === layerId);
  if (idx <= 0) return;

  const layers = [...state.layers];
  [layers[idx - 1], layers[idx]] = [layers[idx], layers[idx - 1]];
  uiStore.setState({ layers });
}

export function moveLayerDown(layerId: string): void {
  const state = uiStore.getState();
  const idx = state.layers.findIndex((l) => l.layerId === layerId);
  if (idx < 0 || idx >= state.layers.length - 1) return;

  const layers = [...state.layers];
  [layers[idx], layers[idx + 1]] = [layers[idx + 1], layers[idx]];
  uiStore.setState({ layers });
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
