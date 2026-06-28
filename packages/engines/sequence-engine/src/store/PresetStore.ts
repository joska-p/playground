import type { PresetRecord } from '../types';

export type PresetStore = {
  getAll(): PresetRecord[];
  save(preset: PresetRecord): void;
  delete(id: string): void;
};
