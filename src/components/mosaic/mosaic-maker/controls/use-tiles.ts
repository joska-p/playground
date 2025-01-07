import { useCallback } from "react";
import { computeNumberOfTiles } from "../lib/utils";
import { getRandom } from "@/lib/utils";

const useTiles = (
  mosaicRef: React.RefObject<HTMLDivElement> | null,
  tileSet: string[],
  setTiles: (tiles: string[]) => void
) => {
  const generateTiles = useCallback(() => {
    if (!mosaicRef || !mosaicRef.current) return;
    const numberOfTiles = computeNumberOfTiles(mosaicRef.current);
    const newTiles = Array.from({ length: numberOfTiles }, () => getRandom(tileSet));
    setTiles(newTiles);
  }, [mosaicRef, setTiles, tileSet]);

  return generateTiles;
};

export { useTiles };
