const getNumberOfTiles = ({ mosaicWidth = 1, mosaicHeight = 1, tileWidth = 1, tileHeight = 1 }) => {
  if (tileWidth === 0) tileWidth = 1
  if (tileHeight === 0) tileHeight = 1
  return Math.floor(mosaicWidth / tileWidth) * Math.floor(mosaicHeight / tileHeight)
}

export { getNumberOfTiles }
