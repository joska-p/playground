import { getRandom } from "@/lib/utils";
import type { Signal } from "@preact/signals-react";
import { computed, effect, signal } from "@preact/signals-react";
import type { ComponentProps } from "react";
import { createContext, createRef, useContext } from "react";
import { initialPalette, initialTileSet, MAX_RANDOM_PALETTES } from "./config";
import { fetchPalettes } from "./libs/fetch-palettes";
import { computeNumberOfTiles } from "./libs/style-utils";

type MosaicContext = {
  mosaicRef: Signal<React.RefObject<HTMLDivElement | null>>;
  tileSet: Signal<typeof initialTileSet>;
  allThePalettes: Signal<(typeof initialPalette)[]>;
  currentPalettes: Signal<(typeof initialPalette)[]>;
  currentPalette: Signal<typeof initialPalette>;
  tiles: Signal<string[]>;
};

const MosaicMakerContext = createContext<MosaicContext | null>(null);

function MosaicMakerProvider({ children }: ComponentProps<"div">) {
  const mosaicRef = signal(createRef<HTMLDivElement>());
  const tileSet = signal(initialTileSet);
  const allThePalettes = signal([initialPalette]);
  const currentPalettes = signal([initialPalette]);
  const currentPalette = signal(initialPalette);
  const tiles = computed(() => {
    const newTileSet = tileSet.value;
    const mosaicElement = mosaicRef.value.current;
    const numberOfTiles = mosaicElement ? computeNumberOfTiles(mosaicElement) : 0;
    return Array.from({ length: numberOfTiles }, () => getRandom(newTileSet));
  });

  effect(() => {
    (async () => {
      allThePalettes.value = await fetchPalettes();
      currentPalettes.value = allThePalettes.value.slice(0, MAX_RANDOM_PALETTES);
    })();
  });

  return (
    <MosaicMakerContext
      value={{ mosaicRef, tileSet, allThePalettes, currentPalettes, currentPalette, tiles }}
    >
      {children}
    </MosaicMakerContext>
  );
}

function useMosaicMakerContext() {
  const context = useContext(MosaicMakerContext);
  if (!context) {
    throw new Error("useMosaicMakerContext must be used within a MosaicMakerProvider");
  }
  return context;
}

export { MosaicMakerProvider, useMosaicMakerContext };