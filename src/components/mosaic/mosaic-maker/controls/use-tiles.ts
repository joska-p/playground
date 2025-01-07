import { useState } from "react";
import { updateElementStyles } from "../lib/utils";
import { CSS_VARS, DEFAULT_GAP_SIZE, DEFAULT_TILE_SIZE } from "../config";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
};

const useTiles = ({ mosaicRef }: Props) => {
  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [gapSize, setGapSize] = useState(DEFAULT_GAP_SIZE);

  const handleSetTileSize = (size: number) => {
    setTileSize(size);
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, {
      [CSS_VARS.height]: `${tileSize}px`,
      [CSS_VARS.width]: `${tileSize}px`,
    });
  };

  const handleSetGapSize = (size: number) => {
    setGapSize(size);
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, {
      [CSS_VARS.gap]: `${gapSize}px`,
    });
  };

  return {
    tileSize,
    setTileSize: handleSetTileSize,
    gapSize,
    setGapSize: handleSetGapSize,
  };
};

export { useTiles };
