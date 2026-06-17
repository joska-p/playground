import { create } from 'zustand';
import { generateSequence } from '../../core/engine';
import { recamanRule } from '../../core/rules/recaman';
import type { SequenceRule } from '../../core/rules/types';
import { getLayer } from '../../core/visualizations/layers/registry';
import {
  builtInPresets,
  getAllPresets,
  savePreset as persistPreset,
  deletePreset as removePreset
} from '../../core/visualizations/registry';
import type {
  LayerConfigEntry,
  PresetRecord
} from '../../core/visualizations/types';

type SequenceState = {
  sequenceRule: SequenceRule;
  steps: number;
  layers: LayerConfigEntry[];
  sequence: number[];
  customPresets: PresetRecord[];
  basePresetId: string | null;
};

function generateInitial({
  sequenceRule,
  steps
}: {
  sequenceRule: SequenceRule;
  steps: number;
}): number[] {
  return generateSequence({ sequenceRule, steps });
}

function clampSteps({
  steps,
  maxSteps
}: {
  steps: number;
  maxSteps: number;
}): number {
  return Math.min(Math.max(steps, 2), maxSteps);
}

function buildDefaultLayers(): LayerConfigEntry[] {
  const firstPreset = builtInPresets[0];
  if (firstPreset)
    return firstPreset.layers.map((l) => ({ ...l, params: { ...l.params } }));
  return [];
}

const sequenceStore = create<SequenceState>(() => {
  const defaultLayers = buildDefaultLayers();
  return {
    sequenceRule: recamanRule,
    steps: 2,
    layers: defaultLayers,
    sequence: generateInitial({ sequenceRule: recamanRule, steps: 2 }),
    customPresets: getAllPresets().filter((p) => !p.isBuiltIn),
    basePresetId: builtInPresets[0]?.id ?? null
  };
});

export function useSequenceRule(): SequenceRule {
  return sequenceStore((s) => s.sequenceRule);
}

export function useSequenceSteps(): number {
  return sequenceStore((s) => s.steps);
}

export function useSequenceSequence(): number[] {
  return sequenceStore((s) => s.sequence);
}

export function useLayersConfig(): LayerConfigEntry[] {
  return sequenceStore((s) => s.layers);
}

export function useCustomPresets(): PresetRecord[] {
  return sequenceStore((s) => s.customPresets);
}

export function useBasePresetId(): string | null {
  return sequenceStore((s) => s.basePresetId);
}

function regenerateSequence(
  sequenceRule: SequenceRule,
  steps: number
): number[] {
  return generateSequence({ sequenceRule, steps });
}

export function setSequenceRule({
  sequenceRule
}: {
  sequenceRule: SequenceRule;
}): void {
  const currentSteps = sequenceStore.getState().steps;
  const clampedSteps = clampSteps({
    steps: currentSteps,
    maxSteps: sequenceRule.maxSteps
  });
  sequenceStore.setState({
    sequenceRule,
    steps: clampedSteps,
    sequence: regenerateSequence(sequenceRule, clampedSteps)
  });
}

export function setSequenceSteps({ steps }: { steps: number }): void {
  const state = sequenceStore.getState();
  const clampedSteps = clampSteps({
    steps,
    maxSteps: state.sequenceRule.maxSteps
  });
  sequenceStore.setState({
    steps: clampedSteps,
    sequence: regenerateSequence(state.sequenceRule, clampedSteps)
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

export function deleteCustomPreset(presetId: string): void {
  removePreset(presetId);
  const state = sequenceStore.getState();
  sequenceStore.setState({
    customPresets: state.customPresets.filter((p) => p.id !== presetId)
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
    layers: [
      ...state.layers,
      { layerId, enabled: true, params: { ...layer.defaults } }
    ],
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

export function updateLayerParams(
  layerId: string,
  params: Record<string, unknown>
): void {
  const state = sequenceStore.getState();
  const layers = state.layers.map((l) =>
    l.layerId === layerId ? { ...l, params: { ...l.params, ...params } } : l
  );
  sequenceStore.setState({ layers, basePresetId: null });
}
