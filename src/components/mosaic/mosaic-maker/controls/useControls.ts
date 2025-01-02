import { useCallback, useEffect, useState, useMemo } from "react";
import { getRandom, shuffleArray } from "@/lib/utils";
import { defaultTileSet, defaultPalette } from "../tiles/default-options";
import { getPalettes } from "../lib/colors";
import { setCssTileSize, setCssGap, setCssColors } from "../lib/utils";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
};

const useControls = ({ mosaicRef }: Props) => {
  const [mosaicTileSet, setMosaicTileSet] = useState(defaultTileSet);
  const [palettes, setPalettes] = useState([defaultPalette]);
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);
  const [size, setSize] = useState(64);
  const [gap, setGap] = useState(0);

  const changeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;

    setSize(Number.parseInt(event.target.value));
    setCssTileSize({ element: mosaicRef.current, value: event.target.value });
  };

  const changeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mosaicRef.current) return;

    setGap(Number.parseInt(event.target.value));
    setCssGap({ element: mosaicRef.current, value: event.target.value });
  };

  const setNewColors = (palette = getRandom(palettes)) => {
    if (!mosaicRef.current) return;
    setCurrentPalette(palette);
    setCssColors({ element: mosaicRef.current, palette });
  };

  const initialPalettes = useMemo(async () => {
    const palettes = await getPalettes();
    return palettes;
  }, []);

  const handleSetNewPalettes = useCallback(async () => {
    const randomPalettes = shuffleArray(await initialPalettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [initialPalettes]);

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
    handleSetNewPalettes,
  };
};

export { useControls };
