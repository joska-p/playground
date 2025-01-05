import { useCallback, useEffect, useState } from "react";
import { shuffleArray } from "@lib/utils";
import { CSS_VARS, initialTileSet, initialPalette, initialRotations } from "../config";
import { getPalettes } from "../lib/colors";
import { updateElementStyles } from "../lib/utils";

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
    if (!allThePalettes.length) return;
    const randomPalettes = shuffleArray(allThePalettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [allThePalettes]);

  useEffect(() => {
    const loadPalettes = async () => {
      const palettes = await getPalettes();
      setAllThePalettes(palettes);
    };
    loadPalettes();
  }, []);

  useEffect(setNewPalettes, [allThePalettes, setNewPalettes]);

  useEffect(() => {
    if (!mosaicRef.current) return;

    updateElementStyles(mosaicRef.current, currentPalette);
    updateElementStyles(mosaicRef.current, currentRotations);
    updateElementStyles(mosaicRef.current, {
      [CSS_VARS.height]: `${tileSize}px`,
      [CSS_VARS.width]: `${tileSize}px`,
      [CSS_VARS.gap]: `${gapSize}px`,
    });
  }, [mosaicRef, currentPalette, currentRotations, tileSize, gapSize]);

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
