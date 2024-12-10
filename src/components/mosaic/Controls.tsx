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
    <div className="absolute top-4 right-4 flex flex-col items-center justify-center text-gray-50 bg-gray-800/50 py-4 px-8 rounded-lg">
      <button
        type="button"
        onClick={shuffleColors}
        className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Shuffle
      </button>
      <button
        type="button"
        onClick={getNewPalette}
        className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        New colors
      </button>
      <button
        type="button"
        onClick={getNewTiles}
        className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        New tiles
      </button>
      <label htmlFor="tile-size" className="block mb-2 text-sm font-medium text-gray-50">
        Tile size: {tileSize.width}px x {tileSize.height}px
      </label>
      <input
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
