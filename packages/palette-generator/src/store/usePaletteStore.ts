import { create } from "zustand";
import type { BaseColor, Palette } from "../core/rules";
import Color from "colorjs.io";

type PaletteState = {
  palettes: Palette[];
  baseColor: BaseColor;
  setBaseColor: (baseColor: BaseColor) => void;
  addPalette: (palette: Palette) => void;
};

const initialBaseColor: BaseColor = new Color("lab", [0.7, 0.1, 196]);

const usePaletteStore = create<PaletteState>()(() => ({
  palettes: [],
  baseColor: initialBaseColor,
  setBaseColor,
  addPalette,
}));

function setBaseColor(baseColor: BaseColor) {
  usePaletteStore.setState({ baseColor });
}

function addPalette(palette: Palette) {
  const { palettes } = usePaletteStore.getState();
  usePaletteStore.setState({ palettes: [...palettes, palette] });
}

export { usePaletteStore, setBaseColor, addPalette };
