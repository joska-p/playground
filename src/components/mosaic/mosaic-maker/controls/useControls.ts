import { useCallback, useEffect, useState, useMemo } from "react";
import { getRandom, shuffleArray, shuffleObject } from "@/lib/utils";
import { defaultTileSet, defaultPalette } from "../tiles/default-options";
import { getPalettes } from "../lib/colors";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
};

const useControls = ({ mosaicRef }: Props) => {
  const [mosaicTileSet, setMosaicTileSet] = useState(defaultTileSet);
  const [palettes, setPalettes] = useState([defaultPalette]);
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);
  const [size, setSize] = useState(64);
  const [gap, setGap] = useState(0);

  const initialPalettes = useMemo(async () => {
    const palettes = await getPalettes();
    return palettes;
  }, []);

  const handleSetNewPalettes = useCallback(async () => {
    const randomPalettes = shuffleArray(await initialPalettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [initialPalettes]);

  const changeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;

    setSize(Number.parseInt(event.target.value));
    mosaicRef.current.style.setProperty("--tile-width", `${event.target.value}px`);
    mosaicRef.current.style.setProperty("--tile-height", `${event.target.value}px`);
  };

  const changeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;

    setGap(Number.parseInt(event.target.value));
    mosaicRef.current.style.setProperty("--mosaicGap", `${event.target.value}px`);
  };

  const setNewColors = (palette = getRandom(palettes)) => {
    if (!mosaicRef.current) return;
    setCurrentPalette(palette);
    Object.entries(palette).forEach(([colorName, colorValue]) =>
      mosaicRef.current!.style.setProperty(colorName, colorValue)
    );
  };

  const shuffleCssColors = (palette = getRandom(palettes)) => {
    const newPalette = shuffleObject(palette);
    setNewColors(newPalette);
  };

  const suffleCssRotations = (rotations: Record<string, string>) => {
    if (!mosaicRef.current) return;
    const newRotations = shuffleObject(rotations);
    Object.entries(newRotations).forEach(([rotationName, rotationValue]) =>
      mosaicRef.current!.style.setProperty(rotationName, rotationValue)
    );
  };

  useEffect(() => {
    handleSetNewPalettes();
  }, [handleSetNewPalettes]);

  return {
    mosaicTileSet,
    setMosaicTileSet,
    palettes,
    currentPalette,
    size,
    changeTileSize,
    gap,
    changeGapSize,
    setNewColors,
    shuffleCssColors,
    suffleCssRotations,
    handleSetNewPalettes,
  };
};

export { useControls };
