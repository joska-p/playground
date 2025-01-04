import { useCallback, useEffect, useState } from "react";
import { shuffleArray } from "@lib/utils";
import { initialTileSet, initialPalette, initialRotations } from "../options";
import { getPalettes } from "../lib/colors";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
};

const useControls = ({ mosaicRef }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const [allThePalettes, setAllThePalettes] = useState([initialPalette]);
  const [palettes, setPalettes] = useState([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);
  const [currentRotations, setCurrentRotations] = useState(initialRotations);
  const [tileSize, setTileSize] = useState(64);
  const [gapSize, setGapSize] = useState(0);

  const setNewPalettes = useCallback(() => {
    const randomPalettes = shuffleArray(allThePalettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [allThePalettes]);

  useEffect(() => {
    getPalettes().then((palettes) => setAllThePalettes(palettes));
  }, []);

  useEffect(setNewPalettes, [allThePalettes, setNewPalettes]);

  useEffect(() => {
    Object.entries(currentPalette).forEach(([colorName, colorValue]) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, colorValue);
    });
  }, [mosaicRef, currentPalette]);

  useEffect(() => {
    Object.entries(currentRotations).forEach(([rotationName, rotationValue]) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(rotationName, rotationValue);
    });
  }, [mosaicRef, currentRotations]);

  useEffect(() => {
    if (!mosaicRef.current) return;
    mosaicRef.current.style.setProperty("--tile-width", `${tileSize}px`);
    mosaicRef.current.style.setProperty("--tile-height", `${tileSize}px`);
  }, [mosaicRef, tileSize]);

  useEffect(() => {
    if (!mosaicRef.current) return;
    mosaicRef.current.style.setProperty("--mosaicGap", `${gapSize}px`);
  }, [mosaicRef, gapSize]);

  return {
    tileSet,
    setTileSet,
    palettes,
    setNewPalettes,
    currentPalette,
    setCurrentPalette,
    tileSize,
    setTileSize,
    gapSize,
    setGapSize,
    currentRotations,
    setCurrentRotations,
  };
};

export { useControls };
