import type { PresetRecord } from '../../core/types';
import { LocalStoragePresetStore } from '../../adapters/LocalStoragePresetStore';

const customStore = new LocalStoragePresetStore();

export function getAllPresets(): PresetRecord[] {
  return customStore.getAll();
}

export function savePreset(preset: PresetRecord): void {
  customStore.save(preset);
}

export function deletePreset(id: string): void {
  customStore.delete(id);
}
