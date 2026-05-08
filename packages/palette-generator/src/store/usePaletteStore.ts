import { create } from "zustand";
import type { HSLColor } from "../utils/colorConversions.js";

type Palette = HSLColor[];
type BaseColor = HSLColor & { location: { x: number; y: number } };

interface PaletteState {
  palettes: Palette[];
  baseColor: BaseColor;
}

const initialBaseColor: BaseColor = {
  hue: 180,
  saturation: 100,
  lightness: 50,
  location: { x: 184, y: 184 },
};

const usePaletteStore = create<PaletteState>()(() => ({
  palettes: [],
  baseColor: initialBaseColor,
}));

function setBaseColor(baseColor: BaseColor) {
  usePaletteStore.setState({ baseColor });
}

function addPalette(palette: Palette) {
  const { palettes } = usePaletteStore.getState();
  usePaletteStore.setState({ palettes: [...palettes, palette] });
}

function removePalette(index: number) {
  const { palettes } = usePaletteStore.getState();
  usePaletteStore.setState({ palettes: palettes.filter((_, i) => i !== index) });
}

function clearPalettes() {
  usePaletteStore.setState({ palettes: [] });
}

export type { Palette, BaseColor };
export { usePaletteStore, setBaseColor, addPalette, removePalette, clearPalettes };
