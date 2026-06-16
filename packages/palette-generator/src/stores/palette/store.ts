import Color from 'colorjs.io';
import { create } from 'zustand';
import type { Palette } from '../../core/rules/types';

type PaletteState = {
  palettes: Palette[];
  baseColor: Color;
};

const initialBaseColor = new Color('oklch', [0.7, 0.1, 196]);

const paletteStore = create<PaletteState>(() => ({
  palettes: [],
  baseColor: initialBaseColor
}));

export function usePalettePalettes(): Palette[] {
  return paletteStore((s) => s.palettes);
}

export function usePaletteBaseColor(): Color {
  return paletteStore((s) => s.baseColor);
}

export function setPaletteBaseColor(baseColor: Color) {
  paletteStore.setState({ baseColor });
}

export function addPalette(palette: Palette) {
  const { palettes } = paletteStore.getState();
  paletteStore.setState({ palettes: [...palettes, palette] });
}
