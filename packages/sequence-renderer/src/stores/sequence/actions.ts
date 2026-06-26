import { generateSequence } from '@repo/sequence-engine';
import type { SequenceRule } from '@repo/sequence-engine/rules/types';
import { getAllPresets, savePreset as persistPreset } from '@repo/sequence-engine/visualizations';
import { getLayer } from '@repo/sequence-engine/visualizations/layers/registry';
import type { CanvasViewport, PresetRecord } from '@repo/sequence-engine/visualizations/types';
import { sequenceStore } from './store';

const DEFAULT_PLAYBACK_STEPS = 2000;

function clampSteps(steps: number, maxSteps: number): number {
  if (maxSteps === 0) return DEFAULT_PLAYBACK_STEPS;
  return Math.min(Math.max(steps, 2), maxSteps);
}

function regenerateSequence(sequenceRule: SequenceRule, steps: number, seed?: string): number[] {
  return generateSequence({ sequenceRule, steps, seed });
}

export function getViewportState(): CanvasViewport {
  return sequenceStore.getState().viewport;
}

export function setSequenceRule({ sequenceRule }: { sequenceRule: SequenceRule }): void {
  const currentSteps = sequenceStore.getState().steps;
  const currentSeed = sequenceStore.getState().seed;

  const clampedSteps = clampSteps(currentSteps, sequenceRule.maxSteps);
  sequenceStore.setState({
    sequenceRule,
    steps: clampedSteps,
    sequence: regenerateSequence(sequenceRule, clampedSteps, currentSeed)
  });
}

export function setSequenceSteps({ steps }: { steps: number }): void {
  const state = sequenceStore.getState();
  const currentSeed = state.seed;
  const clampedSteps = clampSteps(steps, state.sequenceRule.maxSteps);
  sequenceStore.setState({
    steps: clampedSteps,
    sequence: regenerateSequence(state.sequenceRule, clampedSteps, currentSeed)
  });
}

export function loadPreset(presetId: string): void {
  const allPresets = getAllPresets();
  const preset = allPresets.find((p) => p.id === presetId);
  if (!preset) return;

  sequenceStore.setState({
    layers: preset.layers.map((l) => ({ ...l, params: { ...l.params } })),
    basePresetId: presetId
  });
}

export function saveCurrentPreset(name: string): void {
  const state = sequenceStore.getState();
  const id = `custom-${Date.now()}`;
  const preset: PresetRecord = {
    id,
    name,
    layers: state.layers.map((l) => ({ ...l, params: { ...l.params } })),
    isBuiltIn: false
  };
  persistPreset(preset);
  sequenceStore.setState({
    customPresets: [...state.customPresets, preset]
  });
}

export function toggleLayer(layerId: string): void {
  const state = sequenceStore.getState();
  const layers = state.layers.map((l) =>
    l.layerId === layerId ? { ...l, enabled: !l.enabled } : l
  );
  sequenceStore.setState({ layers, basePresetId: null });
}

export function addLayer(layerId: string): void {
  const state = sequenceStore.getState();
  const layer = getLayer(layerId);
  if (!layer) return;

  sequenceStore.setState({
    layers: [...state.layers, { layerId, enabled: true, params: { ...layer.defaults } }],
    basePresetId: null
  });
}

export function removeLayer(layerId: string): void {
  const state = sequenceStore.getState();
  const enabledLayers = state.layers.filter((l) => l.enabled);
  const target = state.layers.find((l) => l.layerId === layerId);
  if (!target) return;
  if (target.enabled && enabledLayers.length <= 1) return;

  sequenceStore.setState({
    layers: state.layers.filter((l) => l.layerId !== layerId),
    basePresetId: null
  });
}

export function moveLayerUp(layerId: string): void {
  const state = sequenceStore.getState();
  const idx = state.layers.findIndex((l) => l.layerId === layerId);
  if (idx <= 0) return;

  const layers = [...state.layers];
  [layers[idx - 1], layers[idx]] = [layers[idx], layers[idx - 1]];
  sequenceStore.setState({ layers, basePresetId: null });
}

export function moveLayerDown(layerId: string): void {
  const state = sequenceStore.getState();
  const idx = state.layers.findIndex((l) => l.layerId === layerId);
  if (idx < 0 || idx >= state.layers.length - 1) return;

  const layers = [...state.layers];
  [layers[idx], layers[idx + 1]] = [layers[idx + 1], layers[idx]];
  sequenceStore.setState({ layers, basePresetId: null });
}

export function setViewport(v: Partial<CanvasViewport>): void {
  const current = sequenceStore.getState().viewport;
  sequenceStore.setState({ viewport: { ...current, ...v } });
}

export function updateLayerParams(layerId: string, params: Record<string, unknown>): void {
  const state = sequenceStore.getState();
  const layers = state.layers.map((l) =>
    l.layerId === layerId ? { ...l, params: { ...l.params, ...params } } : l
  );
  sequenceStore.setState({ layers, basePresetId: null });
}

export function togglePlayback(): void {
  sequenceStore.setState((s) => ({ isPlaying: !s.isPlaying }));
}

export function setSeed(seed: string | undefined): void {
  const state = sequenceStore.getState();
  sequenceStore.setState({
    seed,
    sequence: regenerateSequence(state.sequenceRule, state.steps, seed)
  });
}
