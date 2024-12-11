import Mosaic from "#components/mosaic/Mosaic.tsx"
import CornerCircles from "#components/tiles/css/Corner-circles-css.tsx"
import MiddleCircles from "#components/tiles/css/Middle-circe-css.tsx"
import OppositeCircles from "#components/tiles/css/Opposite-circles-css.tsx"
import Square from "#components/tiles/css/Square-css.tsx"
import Triangle from "#components/tiles/css/Triangle-css.tsx"

const testSet = [OppositeCircles]

const initialTileSet = [Square, Triangle, CornerCircles, MiddleCircles, OppositeCircles]

const MosaicSvg = () => {
  return <Mosaic initialTileSet={initialTileSet} tileWidth={64} tileHeight={64} />
}

export default MosaicSvg
