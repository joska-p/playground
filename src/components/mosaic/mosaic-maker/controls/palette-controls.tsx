import { cn } from "@/lib/utils";
import type { Signal } from "@preact/signals-react";
import { initialPalette } from "../config";
import { getPaletteId } from "../libs/palette-utils";
import { PaletteButton } from "./palette-button";

type Props = {
  mosaicRef: Signal<React.RefObject<HTMLDivElement | null>>;
  currentPalette: Signal<typeof initialPalette>;
  currentPalettes: Signal<(typeof initialPalette)[]>;
};

function PaletteControls({ mosaicRef, currentPalette, currentPalettes }: Props) {
  return (
    <fieldset
      className={cn(
        "flex h-[176px] w-full flex-col flex-wrap justify-center gap-2 overflow-x-auto p-2",
        "lg:h-auto lg:flex-row lg:gap-4",
        "has-[:focus-visible]:bg-accent/20"
      )}
    >
      <legend className="sr-only">Choose a color palette</legend>

      <PaletteButton
        palette={initialPalette}
        currentPalette={currentPalette}
        mosaicRef={mosaicRef}
        aria-label="Default palette"
      />
      {currentPalettes.value.map((palette) => (
        <PaletteButton
          key={getPaletteId(palette)}
          palette={palette}
          currentPalette={currentPalette}
          mosaicRef={mosaicRef}
        />
      ))}
    </fieldset>
  );
}

export { PaletteControls };
