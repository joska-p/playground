import type { PresetStore } from '@repo/sequence-engine/store';
import type { PresetRecord } from '@repo/sequence-engine/types';

const CUSTOM_PRESETS_KEY = 'sequence-renderer:custom-presets';

export class LocalStoragePresetStore implements PresetStore {
  getAll(): PresetRecord[] {
    return this.loadCustomPresets();
  }

  save(preset: PresetRecord): void {
    const customs = this.loadCustomPresets();
    const existing = customs.findIndex((p) => p.id === preset.id);
    if (existing >= 0) {
      customs[existing] = { ...preset, isBuiltIn: false };
    } else {
      customs.push({ ...preset, isBuiltIn: false });
    }
    this.saveCustomPresets(customs);
  }

  delete(id: string): void {
    const customs = this.loadCustomPresets().filter((p) => p.id !== id);
    this.saveCustomPresets(customs);
  }

  private loadCustomPresets(): PresetRecord[] {
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

  private saveCustomPresets(presets: PresetRecord[]): void {
    try {
      localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(presets));
    } catch {
      // localStorage unavailable — silently skip
    }
  }
}
