import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { TileSet, Palette, TileNames } from "./config.js";
import {
  initialPalette,
  initialTileSet,
  MAX_NUMBER_OF_PALETTES,
  initialRotations,
} from "./config.js";
import { fetchPalettes } from "./lib/fetch-palettes.js";
import {
  computeNumberOfTiles,
  updateElementStyles,
} from "./lib/style-utils.js";
import { getRandom } from "./lib/utils.js";
import { useResizeObserver } from "@repo/ui";

export interface TileInstance {
  id: string;
  name: TileNames;
  colors: [string, string, string, string, string];
  rotation: string;
}

interface MosaicContext {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  currentPalettes: Palette[];
  updateCurrentPalettes: () => void;
  currentPalette: Palette;
  updatePalette: (palette: Palette) => void;
  tileSet: TileSet;
  updateTileSet: (tileName: TileNames) => void;
  tiles: TileInstance[];
  updateTiles: (tileSet?: TileSet) => void;
}

const MosaicMakerContext = createContext<MosaicContext | null>(null);

function generateTileColors(): [string, string, string, string, string] {
  const paletteKeys = [
    "--color-0",
    "--color-1",
    "--color-2",
    "--color-3",
    "--color-4",
  ];
  return Array.from({ length: 5 }, () => getRandom(paletteKeys)) as [
    string,
    string,
    string,
    string,
    string,
  ];
}

function generateTileRotation(): string {
  const rotationKeys = Object.keys(initialRotations);
  return getRandom(rotationKeys);
}

function MosaicMakerProvider({ children }: ComponentProps<"div">) {
  const [mosaicRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const [paletteStock, setPaletteStock] = useState<Palette[]>([]);
  const [currentPalettesIndex, setCurrentPalettesIndex] = useState<number>(0);
  const [currentPalette, setCurrentPalette] = useState<Palette>(initialPalette);
  const [tileSet, setTileSet] = useState<TileSet>([...initialTileSet]);
  const [tiles, setTiles] = useState<TileInstance[]>([]);

  const currentPalettes = useMemo(() => {
    return paletteStock.slice(
      currentPalettesIndex,
      currentPalettesIndex + MAX_NUMBER_OF_PALETTES,
    );
  }, [currentPalettesIndex, paletteStock]);

  const updateCurrentPalettes = useCallback(() => {
    setCurrentPalettesIndex((prev) =>
      prev >= paletteStock.length - MAX_NUMBER_OF_PALETTES
        ? 0
        : prev + MAX_NUMBER_OF_PALETTES,
    );
  }, [paletteStock]);

  const updatePalette = useCallback(
    (palette: Palette) => {
      setCurrentPalette(palette);
      if (!mosaicRef.current) return;
      updateElementStyles(mosaicRef.current, palette);
    },
    [mosaicRef],
  );

  const updateTileSet = useCallback(
    (tileName: TileNames) => {
      if (tileSet.length === 1 && tileName === tileSet[0]) return;
      setTileSet((prev) =>
        prev.includes(tileName)
          ? prev.filter((tile) => tile !== tileName)
          : [...prev, tileName],
      );
    },
    [tileSet],
  );

  const updateTiles = useCallback(
    (newTileSet = tileSet) => {
      if (!mosaicRef.current) return;
      const newNumberOfTiles = computeNumberOfTiles(mosaicRef.current);

      const newTiles: TileInstance[] = Array.from(
        { length: newNumberOfTiles },
        (_, i) => ({
          id: `${i}-${Math.random().toString(36).substr(2, 9)}`,
          name: getRandom(newTileSet),
          colors: generateTileColors(),
          rotation: generateTileRotation(),
        }),
      );

      setTiles(newTiles);
    },
    [tileSet, mosaicRef],
  );

  // Re-generate tiles only when dimensions change significantly
  // or explicitly triggered.
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      updateTiles();
    }
  }, [dimensions.width, dimensions.height, updateTiles]);

  useEffect(() => {
    const init = async () => {
      const palettes = await fetchPalettes();
      setPaletteStock(palettes);
    };
    init();
  }, []);

  return (
    <MosaicMakerContext
      value={{
        mosaicRef,
        currentPalettes,
        updateCurrentPalettes,
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
    throw new Error(
      "useMosaicMakerContext must be used within a MosaicMakerProvider",
    );
  }
  return context;
}

export { MosaicMakerProvider, useMosaicMakerContext };
