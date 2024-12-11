type ControlsProps = {
  getNewPalette: () => void
  shuffleColors: () => void
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
  shuffleColors,
  getNewTiles,
  handleResizeTiles,
  tileSize,
  initialTileSet,
  tileSet,
  handleChangeTileSet,
}: ControlsProps) => {
  return (
    <div className="flex items-center justify-around gap-4 bg-gray-900 py-2 text-gray-50">
      <button
        type="button"
        onClick={shuffleColors}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        Shuffle
      </button>
      <button
        type="button"
        onClick={getNewPalette}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        New colors
      </button>
      <button
        type="button"
        onClick={getNewTiles}
        className="rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        New tiles
      </button>
      <label htmlFor="tile-size" className="block text-sm font-medium text-gray-50">
        Tile size: {tileSize.width}px
      </label>
      <input
        className="h-2 cursor-pointer appearance-none rounded-lg bg-gray-200"
        id="tile-size"
        type="range"
        name="Tile size"
        min="32"
        step={2}
        max="256"
        value={tileSize.width}
        onChange={handleResizeTiles}
      />
      <div className="flex gap-8">
        {initialTileSet.map((Tile, index) => {
          const styleObject = {
            "--tile-width": "32px",
            "--tile-height": "32px",
            "--color-0": "#333333",
            "--color-1": "#555555",
            "--color-2": "#777777",
            "--color-3": "#999999",
            "--color-4": "#bbbbbb",
            "--rotation": "0deg",
          } as React.CSSProperties
          return (
            <label key={index} style={styleObject} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={Tile.name}
                value={Tile.name}
                checked={tileSet.find((tile) => tile.name === Tile.name) ? true : false}
                onChange={handleChangeTileSet}
              />
              <Tile
                colors={["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"]}
                rotation={0}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default Controls
