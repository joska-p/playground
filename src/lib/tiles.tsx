const getNumberOfTiles = ({
  mosaicWidth,
  mosaicHeight,
  tileWidth,
  tileHeight,
}: {
  mosaicWidth: number
  mosaicHeight: number
  tileWidth: number
  tileHeight: number
}) => {
  if (!tileWidth || tileWidth === 0) tileWidth = 1
  if (!tileHeight || tileHeight === 0) tileHeight = 1
  return Math.floor(mosaicWidth / tileWidth) * Math.floor(mosaicHeight / tileHeight)
}

export { getNumberOfTiles }
