import { create } from "zustand";
import type { Palette } from "../core/rules";
import Color from "colorjs.io";

type PaletteState = {
  palettes: Palette[];
  baseColor: Color;
  setBaseColor: (baseColor: Color) => void;
  addPalette: (palette: Palette) => void;
};

const initialBaseColor = new Color("oklch", [0.7, 0.1, 196]);

const usePaletteStore = create<PaletteState>()(() => ({
  palettes: [],
  baseColor: initialBaseColor,
  setBaseColor,
  addPalette,
}));

function setBaseColor(baseColor: Color) {
  usePaletteStore.setState({ baseColor });
}

function addPalette(palette: Palette) {
  const { palettes } = usePaletteStore.getState();
  usePaletteStore.setState({ palettes: [...palettes, palette] });
}

export { usePaletteStore, setBaseColor, addPalette };
