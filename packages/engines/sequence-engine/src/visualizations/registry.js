import { builtInPresets } from './presets';
const CUSTOM_PRESETS_KEY = 'sequence-renderer:custom-presets';
function loadCustomPresets() {
  try {
    const raw = localStorage.getItem(CUSTOM_PRESETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p) => ({
      ...p,
      isBuiltIn: false
    }));
  } catch {
    return [];
  }
}
function saveCustomPresets(presets) {
  try {
    localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(presets));
  } catch {
    // localStorage unavailable — silently skip
  }
}
function getAllPresets() {
  return [...builtInPresets, ...loadCustomPresets()];
}
function savePreset(preset) {
  const customs = loadCustomPresets();
  const existing = customs.findIndex((p) => p.id === preset.id);
  if (existing >= 0) {
    customs[existing] = { ...preset, isBuiltIn: false };
  } else {
    customs.push({ ...preset, isBuiltIn: false });
  }
  saveCustomPresets(customs);
}
function deletePreset(id) {
  const customs = loadCustomPresets().filter((p) => p.id !== id);
  saveCustomPresets(customs);
}
export { builtInPresets, deletePreset, getAllPresets, savePreset };
