import type { PresetRecord } from '../types';
import type { PresetStore } from './PresetStore';

export class InMemoryPresetStore implements PresetStore {
  private presets: PresetRecord[] = [];

  getAll(): PresetRecord[] {
    return [...this.presets];
  }

  save(preset: PresetRecord): void {
    const existing = this.presets.findIndex((p) => p.id === preset.id);
    if (existing >= 0) {
      this.presets[existing] = { ...preset, isBuiltIn: false };
    } else {
      this.presets.push({ ...preset, isBuiltIn: false });
    }
  }

  delete(id: string): void {
    this.presets = this.presets.filter((p) => p.id !== id);
  }
}
