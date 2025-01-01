import { useEffect } from "react";
import { Slider } from "@/components/ui/slider/slider";
import { Button } from "@/components/ui/button";
import { useControls } from "./useControls";
import { shuffleCssColors, suffleCssRotations } from "../lib/utils";
import { PalettePicker } from "./palette-picker";
import { TileSetControls } from "./tile-set-controls";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement>;
  handleSetNewTiles: (tileSet?: string[]) => void;
};

const Controls = ({ mosaicRef, handleSetNewTiles }: Props) => {
  const {
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
  } = useControls({ mosaicRef });

  useEffect(() => {
    handleSetNewTiles();
  }, [handleSetNewTiles]);

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={() => shuffleCssColors(mosaicRef.current!)} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => suffleCssRotations(mosaicRef.current!)} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={handleSetNewPalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={() => handleSetNewTiles(mosaicTileSet)} size="sm">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <label className="flex flex-col items-center text-sm">
          Tile size: {size}px
          <Slider min={32} max={256} step={2} value={size} onChange={changeTileSize} />
        </label>

        <label className="flex flex-col items-center text-sm">
          Gap size: {gap}px
          <Slider min={0} step={2} max={128} value={gap} onChange={changeGapSize} />
        </label>
      </fieldset>

      <TileSetControls
        mosaicTileSet={mosaicTileSet}
        setMosaicTileSet={setMosaicTileSet}
        handleSetNewTiles={handleSetNewTiles}
      />

      <PalettePicker
        palettes={palettes}
        currentPalette={currentPalette}
        handleSetNewColors={setNewColors}
      />
    </form>
  );
};

export { Controls };
