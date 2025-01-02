import { useEffect } from "react";
import { Slider } from "@/components/ui/slider/slider";
import { Button } from "@/components/ui/button";
import { useControls } from "./useControls";
import { PalettePicker } from "./palette-picker";
import { TileSetControls } from "./tile-set-controls";
import { defaultRotations } from "../tiles/default-options";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
  handleSetNewTiles: (tileSet?: string[]) => void;
};

const Controls = ({ mosaicRef, handleSetNewTiles }: Props) => {
  const {
    tileSet,
    setTileSet,
    palettes,
    currentPalette,
    tileSize,
    changeTileSize,
    gapSize,
    changeGapSize,
    setNewColors,
    shuffleColors,
    shuffleRotations,
    setNewPalettes,
  } = useControls({ mosaicRef });

  useEffect(() => {
    handleSetNewTiles();
  }, [handleSetNewTiles, tileSet]);

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={shuffleColors} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => shuffleRotations(defaultRotations)} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={setNewPalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={() => handleSetNewTiles(tileSet)} size="sm">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <label className="flex flex-col items-center text-sm">
          Tile size: {tileSize}px
          <Slider min={32} max={256} step={2} value={tileSize} onChange={changeTileSize} />
        </label>

        <label className="flex flex-col items-center text-sm">
          Gap size: {gapSize}px
          <Slider min={0} step={2} max={128} value={gapSize} onChange={changeGapSize} />
        </label>
      </fieldset>

      <TileSetControls mosaicTileSet={tileSet} setMosaicTileSet={setTileSet} />

      <PalettePicker
        palettes={palettes}
        currentPalette={currentPalette}
        handleSetNewColors={setNewColors}
      />
    </form>
  );
};

export { Controls };
