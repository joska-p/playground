import { builtInPresets } from './presets';
import type { PresetRecord } from './types';

const CUSTOM_PRESETS_KEY = 'sequence-renderer:custom-presets';

function loadCustomPresets(): PresetRecord[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PRESETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: Record<string, unknown>) => ({
      ...p,
      isBuiltIn: false
    })) as PresetRecord[];
  } catch {
    return [];
  }
}

function saveCustomPresets(presets: PresetRecord[]): void {
  try {
    localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(presets));
  } catch {
    // localStorage unavailable — silently skip
  }
}

function getAllPresets(): PresetRecord[] {
  return [...builtInPresets, ...loadCustomPresets()];
}

function getPreset(id: string): PresetRecord | undefined {
  return getAllPresets().find((p) => p.id === id);
}

function savePreset(preset: PresetRecord): void {
  const customs = loadCustomPresets();
  const existing = customs.findIndex((p) => p.id === preset.id);
  if (existing >= 0) {
    customs[existing] = { ...preset, isBuiltIn: false };
  } else {
    customs.push({ ...preset, isBuiltIn: false });
  }
  saveCustomPresets(customs);
}

function deletePreset(id: string): void {
  const customs = loadCustomPresets().filter((p) => p.id !== id);
  saveCustomPresets(customs);
}

export { builtInPresets, deletePreset, getAllPresets, getPreset, savePreset };
