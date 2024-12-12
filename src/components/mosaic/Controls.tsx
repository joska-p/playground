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
    <div className="flex flex-col items-center justify-start gap-8 bg-gray-900 py-2 text-gray-50">
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

      <label htmlFor="tile-size">Tile size: {tileSize.width}px</label>
      <input
        className="h-2 cursor-pointer rounded-lg bg-gray-200"
        id="tile-size"
        type="range"
        name="Tile size"
        min="32"
        step={2}
        max="256"
        value={tileSize.width}
        onChange={handleResizeTiles}
      />

      <TileSetControls
        initialTileSet={initialTileSet}
        tileSet={tileSet}
        handleChangeTileSet={handleChangeTileSet}
      />
    </div>
  )
}

export default Controls
