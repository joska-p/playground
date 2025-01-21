import type { ComponentProps } from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { TileSet, Palette, TileNames } from "./config";
import { initialPalette, initialTileSet, MAX_RANDOM_PALETTES } from "./config";
import { fetchPalettes } from "./libs/fetch-palettes";
import { computeNumberOfTiles, updateElementStyles } from "./libs/style-utils";
import { getRandom, shuffleArray } from "@/lib/utils";

interface MosaicContext {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  currentPalettes: Palette[];
  updatePalettes: () => void;
  currentPalette: Palette;
  updatePalette: (palette: Palette) => void;
  tileSet: TileSet;
  updateTileSet: (tileName: TileNames) => void;
  tiles: TileSet;
  updateTiles: (tileSet?: TileSet) => void;
}

const MosaicMakerContext = createContext<MosaicContext | null>(null);

function MosaicMakerProvider({ children }: ComponentProps<"div">) {
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const [paletteStock, setPaletteStock] = useState<Palette[]>([initialPalette]);
  const [currentPalettes, setCurrentPalettes] = useState<Palette[]>([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState<Palette>(initialPalette);
  const [tileSet, setTileSet] = useState<TileSet>([...initialTileSet]);
  const [tiles, setTiles] = useState<TileSet>([]);

  async function updatePalettesStock() {
    const palettes = await fetchPalettes();
    setPaletteStock(palettes);
  }

  const updatePalettes = useCallback(() => {
    setCurrentPalettes(shuffleArray(paletteStock).slice(0, MAX_RANDOM_PALETTES));
  }, [paletteStock]);

  function updatePalette(palette: Palette) {
    if (!mosaicRef.current) return;
    setCurrentPalette(palette);
    updateElementStyles(mosaicRef.current, palette);
  }

  function updateTileSet(tileName: TileNames) {
    // if this is the only tile in the set, don't remove it
    if (tileSet.length === 1 && tileName === tileSet[0]) return;

    if (tileSet.includes(tileName)) {
      setTileSet((prev) => prev.filter((tile) => tile !== tileName));
    } else {
      setTileSet((prev) => [...prev, tileName]);
    }
  }

  const updateTiles = useCallback(
    (newTileSet = tileSet) => {
      if (!mosaicRef.current) return;
      const newNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
      const newTiles = Array.from({ length: newNumberOfTiles }, () => getRandom(newTileSet));
      setTiles(newTiles);
    },
    [tileSet]
  );

  useEffect(() => {
    updatePalettesStock();
  }, []);

  useEffect(() => {
    updatePalettes();
  }, [updatePalettes]);

  useEffect(() => {
    updateTiles();
  }, [updateTiles]);

  return (
    <MosaicMakerContext
      value={{
        mosaicRef,
        currentPalettes,
        updatePalettes,
        currentPalette,
        updatePalette,
        tileSet,
        updateTileSet,
        tiles,
        updateTiles,
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
