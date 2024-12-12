import TileSetControls from "./Tile-set-controls"

type ControlsProps = {
  getNewPalette: () => void
  swapColors: () => void
  getNewTiles: () => void
  handleResizeTiles: (event: React.ChangeEvent<HTMLInputElement>) => void
  tileSize: { width: number; height: number }
  initialTileSet: (({
    colors,
    rotation,
  }: {
    colors?: string[]
    rotation?: number
  }) => JSX.Element)[]
  tileSet: (({ colors, rotation }: { colors?: string[]; rotation?: number }) => JSX.Element)[]
  handleChangeTileSet: (event: React.ChangeEvent<HTMLInputElement>) => void
  gap: number
  handleChangeGap: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Controls = ({
  getNewPalette,
  swapColors,
  getNewTiles,
  handleResizeTiles,
  tileSize,
  initialTileSet,
  tileSet,
  handleChangeTileSet,
  gap,
  handleChangeGap,
}: ControlsProps) => {
  return (
    <div className="flex w-full flex-col gap-4 bg-gray-900 p-2 text-gray-50 lg:gap-8 lg:px-2 lg:py-6">
      <div className="flex flex-row items-center justify-around gap-2 lg:flex-col lg:gap-6">
        <button
          type="button"
          onClick={swapColors}
          className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800 lg:w-full"
        >
          Swap colors
        </button>
        <button
          type="button"
          onClick={getNewPalette}
          className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800 lg:w-full"
        >
          New colors
        </button>
        <button
          type="button"
          onClick={getNewTiles}
          className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800 lg:w-full"
        >
          New tiles
        </button>
      </div>

      <label className="flex flex-row items-center justify-center gap-2 text-sm lg:flex-col lg:gap-4">
        Tile size: {tileSize.width}px
        <input
          className="h-2 cursor-pointer rounded-lg bg-gray-200"
          type="range"
          name="Tile size"
          min="32"
          step={2}
          max="256"
          value={tileSize.width}
          onChange={handleResizeTiles}
        />
      </label>

      <label className="flex flex-row items-center justify-center gap-2 text-sm lg:flex-col lg:gap-4">
        Gap size: {gap}px
        <input
          className="h-2 cursor-pointer rounded-lg bg-gray-200"
          type="range"
          name="Tile size"
          min="0"
          step={1}
          max={tileSize.width}
          value={gap}
          onChange={handleChangeGap}
        />
      </label>

      <TileSetControls
        initialTileSet={initialTileSet}
        tileSet={tileSet}
        handleChangeTileSet={handleChangeTileSet}
      />
    </div>
  )
}

export default Controls
