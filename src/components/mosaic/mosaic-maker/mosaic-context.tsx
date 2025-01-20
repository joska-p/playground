import type { Signal } from "@preact/signals-react";
import { effect, useComputed, useSignal } from "@preact/signals-react";
import type { ComponentProps } from "react";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { initialPalette, initialRotations, initialTileSet, MAX_RANDOM_PALETTES } from "./config";
import { fetchPalettes } from "./libs/fetch-palettes";
import { computeNumberOfTiles, updateElementStyles } from "./libs/style-utils";
import { getRandom, shuffleArray, shuffleObject } from "@/lib/utils";

interface MosaicContext {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  tileSet: Signal<typeof initialTileSet>;
  currentPalettes: Signal<(typeof initialPalette)[]>;
  currentPalette: Signal<typeof initialPalette>;
  tiles: Signal<string[]>;
  shufflePalettes: () => void;
  shuffleColors: () => void;
  shuffleRotations: () => void;
  setNewTiles: () => void;
  setCurrentPalette: (palette: typeof initialPalette) => void;
  updateTileSet: (tileName: string) => void;
}

const MosaicMakerContext = createContext<MosaicContext | null>(null);

function MosaicMakerProvider({ children }: ComponentProps<"div">) {
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const tileSet = useSignal(initialTileSet);
  const allThePalettes = useSignal([initialPalette]);
  const currentPalettes = useSignal([initialPalette]);
  const currentPalette = useSignal(initialPalette);
  const numberOfTiles = useSignal(0);
  const tiles = useComputed(() =>
    Array.from({ length: numberOfTiles.value }, () => getRandom(tileSet.value))
  );

  function updateTileSet(tileName: string) {
    if (tileSet.value.length === 1 && tileName === tileSet.value[0]) return;

    const isTileInSet = tileSet.value.includes(tileName);

    tileSet.value = isTileInSet
      ? tileSet.value.filter((tile) => tile !== tileName)
      : [...tileSet.value, tileName];
  }

  const setCurrentPalette = (palette: typeof initialPalette) => {
    if (!mosaicRef.current) return;
    currentPalette.value = palette;
    updateElementStyles(mosaicRef.current, palette);
  };

  function shufflePalettes() {
    if (!allThePalettes.value.length) return;
    currentPalettes.value = shuffleArray(allThePalettes.value).slice(0, MAX_RANDOM_PALETTES);
  }

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette.value));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  const setNewTiles = useCallback(() => {
    if (!mosaicRef.current) return;
    numberOfTiles.value = computeNumberOfTiles(mosaicRef.current);
  }, [mosaicRef, numberOfTiles]);

  effect(() => {
    (async () => {
      // eslint-disable-next-line react-compiler/react-compiler
      allThePalettes.value = await fetchPalettes();
      shufflePalettes();
    })();
  });

  useEffect(() => {
    if (!mosaicRef.current) return;
    numberOfTiles.value = computeNumberOfTiles(mosaicRef.current);
  }, [numberOfTiles]);

  return (
    <MosaicMakerContext
      value={{
        mosaicRef,
        tileSet,
        currentPalettes,
        currentPalette,
        tiles,
        shufflePalettes,
        shuffleColors,
        shuffleRotations,
        setNewTiles,
        setCurrentPalette,
        updateTileSet,
      }}
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
