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
}: ControlsProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 bg-gray-900 py-2 text-gray-50 lg:flex-col lg:gap-8">
      <button
        type="button"
        onClick={swapColors}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800"
      >
        Swap colors
      </button>

      <button
        type="button"
        onClick={getNewPalette}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800"
      >
        New colors
      </button>

      <button
        type="button"
        onClick={getNewTiles}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-800"
      >
        New tiles
      </button>

      <label className="flex flex-col items-center gap-2 text-sm">
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

      <TileSetControls
        initialTileSet={initialTileSet}
        tileSet={tileSet}
        handleChangeTileSet={handleChangeTileSet}
      />
    </div>
  )
}

export default Controls
