import { useCallback, useEffect, useMemo, useState } from "react";
import { getRandom, shuffleArray, shuffleObject } from "@/lib/utils";
import { initialTileSet, initialPalette } from "../options";
import { getPalettes } from "../lib/colors";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
};

const useControls = ({ mosaicRef }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const [currentPalettes, setCurrentPalettes] = useState([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);
  const [tileSize, setTileSize] = useState(64);
  const [gapSize, setGapSize] = useState(0);

  const palettes = useMemo(async () => {
    const palettes = await getPalettes();
    return palettes;
  }, []);

  const setNewPalettes = useCallback(async () => {
    const newPalettes = await palettes;
    const randomPalettes = shuffleArray(newPalettes).slice(0, 39);
    setCurrentPalettes(randomPalettes);
  }, [palettes]);

  useEffect(() => {
    setNewPalettes();
  }, [setNewPalettes]);

  const changeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;

    const newSize = Number.parseInt(event.target.value);
    setTileSize(newSize);
    mosaicRef.current.style.setProperty("--tile-width", `${newSize}px`);
    mosaicRef.current.style.setProperty("--tile-height", `${newSize}px`);
  };

  const changeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;
    const newSize = Number.parseInt(event.target.value);
    setGapSize(newSize);
    mosaicRef.current.style.setProperty("--mosaicGap", `${newSize}px`);
  };

  const setNewPalette = (palette = getRandom(currentPalettes)) => {
    setCurrentPalette(palette);
    Object.entries(palette).forEach(([colorName, colorValue]) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, colorValue);
    });
  };

  const shuffleColors = () => {
    const newPalette = shuffleObject(currentPalette);
    Object.entries(newPalette).forEach(([colorName, colorValue]) =>
      mosaicRef.current!.style.setProperty(colorName, colorValue)
    );
  };

  const shuffleRotations = (rotations: Record<string, string>) => {
    const newRotations = shuffleObject(rotations);
    Object.entries(newRotations).forEach(([rotationName, rotationValue]) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(rotationName, rotationValue);
    });
  };

  return {
    tileSet,
    setTileSet,
    currentPalettes,
    currentPalette,
    tileSize,
    changeTileSize,
    gapSize,
    changeGapSize,
    setNewPalette,
    shuffleColors,
    shuffleRotations,
    setNewPalettes,
  };
};

export { useControls };
