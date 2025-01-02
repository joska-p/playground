import { useCallback, useEffect, useState } from "react";
import { getRandom, shuffleArray, shuffleObject } from "@/lib/utils";
import { initialTileSet, initialPalette } from "../options";
import { getPalettes } from "../lib/colors";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
};

const useControls = ({ mosaicRef }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const [palettes, setPalettes] = useState([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);
  const [tileSize, setTileSize] = useState(64);
  const [gapSize, setGapSize] = useState(0);

  const loadPalettes = useCallback(async () => {
    const palettes = await getPalettes();
    setPalettes(palettes);
  }, []);

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  const setNewPalettes = useCallback(() => {
    const randomPalettes = shuffleArray(palettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [palettes]);

  const changeTileSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!mosaicRef.current) return;

      const newSize = Number.parseInt(event.target.value);
      setTileSize(newSize);
      mosaicRef.current.style.setProperty("--tile-width", `${newSize}px`);
      mosaicRef.current.style.setProperty("--tile-height", `${newSize}px`);
    },
    [mosaicRef]
  );

  const changeGapSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!mosaicRef.current) return;

      const newSize = Number.parseInt(event.target.value);
      setGapSize(newSize);
      mosaicRef.current.style.setProperty("--mosaicGap", `${newSize}px`);
    },
    [mosaicRef]
  );

  const setNewPalette = useCallback(
    (palette = getRandom(palettes)) => {
      if (!mosaicRef.current) return;
      setCurrentPalette(palette);
      Object.entries(palette).forEach(([colorName, colorValue]) =>
        mosaicRef.current!.style.setProperty(colorName, colorValue)
      );
    },
    [palettes, mosaicRef]
  );

  const shuffleColors = useCallback(() => {
    const newPalette = shuffleObject(currentPalette);
    setNewPalette(newPalette);
  }, [currentPalette, setNewPalette]);

  const shuffleRotations = useCallback(
    (rotations: Record<string, string>) => {
      if (!mosaicRef.current) return;
      const newRotations = shuffleObject(rotations);
      Object.entries(newRotations).forEach(([rotationName, rotationValue]) =>
        mosaicRef.current!.style.setProperty(rotationName, rotationValue)
      );
    },
    [mosaicRef]
  );

  return {
    tileSet,
    setTileSet,
    palettes,
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
