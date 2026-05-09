import { create } from "zustand";
import type { Palette, BaseColor } from "../core/config.js";
import { initialBaseColor } from "../core/config.js";

type PaletteState = {
  palettes: Palette[];
  baseColor: BaseColor;
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
