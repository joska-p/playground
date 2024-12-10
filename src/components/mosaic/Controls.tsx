type ControlsProps = {
  getNewPalette: () => void
  shuffleColors: () => void
  getNewTiles: () => void
  handleResizeTiles: (event: React.ChangeEvent<HTMLInputElement>) => void
  tileSize: { width: number; height: number }
}

const Controls = ({
  getNewPalette,
  shuffleColors,
  getNewTiles,
  handleResizeTiles,
  tileSize,
}: ControlsProps) => {
  return (
    <div className="absolute right-4 top-4 flex flex-col items-center justify-center rounded-lg bg-gray-800/50 px-8 py-4 text-gray-50">
      <button
        type="button"
        onClick={shuffleColors}
        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Shuffle
      </button>
      <button
        type="button"
        onClick={getNewPalette}
        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        New colors
      </button>
      <button
        type="button"
        onClick={getNewTiles}
        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        New tiles
      </button>
      <label htmlFor="tile-size" className="mb-2 block text-sm font-medium text-gray-50">
        Tile size: {tileSize.width}px x {tileSize.height}px
      </label>
      <input
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        id="tile-size"
        type="range"
        name="Tile size"
        min="32"
        step={1}
        max="256"
        value={tileSize.width}
        onChange={handleResizeTiles}
      />
    </div>
  )
}

export default Controls
