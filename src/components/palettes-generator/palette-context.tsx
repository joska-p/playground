import { useSignal, type Signal } from "@preact/signals-react";
import { createContext, useContext, type ComponentProps } from "react";
import type { HSLColor } from "./lib/color-conversions";

type Palette = HSLColor[];
type BaseColor = HSLColor & { location: { x: number; y: number } };

interface PaletteContext {
  palettes: Signal<Palette[]>;
  baseColor: Signal<BaseColor>;
}

const PaletteContext = createContext<PaletteContext | null>(null);

function PaletteProvider({ children }: ComponentProps<"div">) {
  const palettes = useSignal<Palette[]>([]);
  const baseColor = useSignal<BaseColor>({
    hue: 180,
    saturation: 100,
    lightness: 50,
    location: { x: 184, y: 184 },
  });

  return <PaletteContext value={{ palettes, baseColor }}>{children}</PaletteContext>;
}

function usePaletteContext() {
  const context = useContext(PaletteContext);
  if (context === null) {
    throw new Error("usePaletteContext must be used within a PaletteProvider");
  }
  return context;
}

export { PaletteProvider, usePaletteContext };
