import { createContext, useContext, useState } from "react";
import type { ComponentProps } from "react";
import type { HSLColor } from "./lib/color-conversions";

export type Palette = HSLColor[];
export type BaseColor = HSLColor & { location: { x: number; y: number } };

interface PaletteContext {
  palettes: Palette[];
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>;
  baseColor: BaseColor;
  setBaseColor: React.Dispatch<React.SetStateAction<BaseColor>>;
}

const PaletteContext = createContext<PaletteContext | null>(null);

function PaletteProvider({ children }: ComponentProps<"div">) {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [baseColor, setBaseColor] = useState<BaseColor>({
    hue: 180,
    saturation: 100,
    lightness: 50,
    location: { x: 184, y: 184 },
  });

  return (
    <PaletteContext value={{ palettes, setPalettes, baseColor, setBaseColor }}>
      {children}
    </PaletteContext>
  );
}

function usePaletteContext() {
  const context = useContext(PaletteContext);
  if (context === null) {
    throw new Error("usePaletteContext must be used within a PaletteProvider");
  }
  return context;
}

export { PaletteProvider, usePaletteContext };
