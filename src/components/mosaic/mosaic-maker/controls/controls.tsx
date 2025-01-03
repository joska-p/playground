import { useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider/slider";
import { Button } from "@/components/ui/button";
import { getRandom } from "@/lib/utils.ts";
import { useControls } from "./useControls";
import { PalettePicker } from "./palette-picker";
import { TileSetSelection } from "./tile-set-selection.tsx";
import { computeNumberOfTiles } from "../lib/utils.ts";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
  setTiles: (tileSet: string[]) => void;
};

const Controls = ({ mosaicRef, setTiles }: Props) => {
  const {
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
    shuffleColors,
    shuffleRotations,
  } = useControls({ mosaicRef });

  const setNewTiles = useCallback(() => {
    if (!mosaicRef.current) return;

    const computedNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
    const newTiles = Array.from({ length: computedNumberOfTiles }, () => getRandom(tileSet));
    setTiles(newTiles);
  }, [mosaicRef, setTiles, tileSet]);

  useEffect(setNewTiles, [tileSet, setNewTiles]);

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={shuffleColors} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={shuffleRotations} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={setNewPalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={setNewTiles} size="sm">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <label className="flex flex-col items-center text-sm">
          Tile size: {tileSize}px
          <Slider
            min={32}
            max={256}
            step={2}
            value={tileSize}
            onChange={(event) => setTileSize(Number(event.target.value))}
          />
        </label>

        <label className="flex flex-col items-center text-sm">
          Gap size: {gapSize}px
          <Slider
            min={0}
            step={2}
            max={128}
            value={gapSize}
            onChange={(event) => setGapSize(Number(event.target.value))}
          />
        </label>
      </fieldset>

      <TileSetSelection tileSet={tileSet} setTileSet={setTileSet} />

      <PalettePicker
        palettes={palettes}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
      />
    </form>
  );
};

export { Controls };
