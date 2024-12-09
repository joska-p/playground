import { useMosaic } from "#hooks/useMosaic.ts"

type MosaicProps = {
  tileWidthPx?: number
  tileHeightPx?: number
}

const Mosaic = ({ tileWidthPx, tileHeightPx }: MosaicProps) => {
  const { mosaicRef, styleObject, tiles, getPalette, getTiles, handleResizeTiles, tileSize } =
    useMosaic({ tileWidthPx, tileHeightPx })

  return (
    <div
      style={styleObject}
      className="tiles w-full h-full justify-center content-center flex flex-wrap mx-auto"
      ref={mosaicRef}
    >
      {tiles.map(({ Tile, key }) => (
        <Tile key={key} />
      ))}

      <div className="absolute top-4 right-4 flex flex-col items-center justify-center text-gray-50 bg-gray-800/50 py-4 px-8 rounded-lg">
        <button
          type="button"
          onClick={getPalette}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Regenerate palette
        </button>
        <button
          type="button"
          onClick={getTiles}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Regenerate tiles
        </button>
        <label htmlFor="tile-size" className="block mb-2 text-sm font-medium text-gray-50">
          Tile size: {tileSize.widthPx}px x {tileSize.heightPx}px
        </label>
        <input
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          id="tile-size"
          type="range"
          name="Tile size"
          min="32"
          step={1}
          max="256"
          value={tileSize.widthPx}
          onChange={handleResizeTiles}
        />
      </div>
    </div>
  )
}

export default Mosaic
