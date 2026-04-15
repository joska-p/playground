import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { TileSet, Palette, TileNames } from "./config";
import {
  initialPalette,
  initialTileSet,
  MAX_NUMBER_OF_PALETTES,
} from "./config";
import { fetchPalettes } from "./lib/fetch-palettes";
import { computeNumberOfTiles, updateElementStyles } from "./lib/style-utils";
import { getRandom } from "./lib/utils";

interface MosaicContext {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  currentPalettes: Palette[];
  updateCurrentPalettes: () => void;
  currentPalette: Palette;
  updatePalette: (palette: Palette) => void;
  tileSet: TileSet;
  updateTileSet: (tileName: TileNames) => void;
  tiles: TileSet;
  updateTiles: (tileSet?: TileSet) => void;
}

const MosaicMakerContext = createContext<MosaicContext | null>(null);

function MosaicMakerProvider({ children }: ComponentProps<"div">) {
  const mosaicRef = useRef<HTMLDivElement>(null);
  const [paletteStock, setPaletteStock] = useState<Palette[]>([]);
  const [currentPalettesIndex, setCurrentPalettesIndex] = useState<number>(0);
  const [currentPalette, setCurrentPalette] = useState<Palette>(initialPalette);
  const [tileSet, setTileSet] = useState<TileSet>([...initialTileSet]);
  const [tiles, setTiles] = useState<TileSet>([]);

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

  const updatePalette = useCallback((palette: Palette) => {
    setCurrentPalette(palette);
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, palette);
  }, []);

  const updateTileSet = useCallback(
    (tileName: TileNames) => {
      // if this is the only tile in the set, don't remove it
      if (tileSet.length === 1 && tileName === tileSet[0]) return;

      if (tileSet.includes(tileName)) {
        setTileSet((prev) => prev.filter((tile) => tile !== tileName));
      } else {
        setTileSet((prev) => [...prev, tileName]);
      }
    },
    [tileSet],
  );

  const updateTiles = useCallback(
    (newTileSet = tileSet) => {
      if (!mosaicRef.current) return;
      const newNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
      const newTiles = Array.from({ length: newNumberOfTiles }, () =>
        getRandom(newTileSet),
      );
      setTiles(newTiles);
    },
    [tileSet],
  );

  const init = useCallback(async () => {
    const palettes = await fetchPalettes();
    setPaletteStock(palettes);
    updateTiles();
  }, [updateTiles]);

  useEffect(() => {
    init();
  }, [init]);

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
