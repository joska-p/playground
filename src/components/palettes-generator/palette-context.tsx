import { signal, type Signal } from "@preact/signals-react";
import { createContext, createRef, useContext, type ComponentProps } from "react";
import type { HSLColor } from "./lib/color-conversions";

type Palette = HSLColor[];
type BaseColor = HSLColor & { location: { x: number; y: number } };

type PaletteContext = {
  palettes: Signal<Palette[]>;
  baseColor: Signal<BaseColor>;
  colorSpaceRef: Signal<React.RefObject<HTMLCanvasElement | null>>;
};

const PaletteContext = createContext<PaletteContext | null>(null);

function PaletteProvider({ children }: ComponentProps<"div">) {
  const palettes = signal<Palette[]>([]);
  const baseColor = signal<BaseColor>({
    hue: 180,
    saturation: 100,
    lightness: 50,
    location: { x: 184, y: 184 },
  });
  const colorSpaceRef = signal(createRef<HTMLCanvasElement>());

  return <PaletteContext value={{ palettes, baseColor, colorSpaceRef }}>{children}</PaletteContext>;
}

function usePaletteContext() {
  const context = useContext(PaletteContext);
  if (context === null) {
    throw new Error("usePaletteContext must be used within a PaletteProvider");
  }
  return context;
}

export { PaletteProvider, usePaletteContext };
