import Mosaic from "#components/mosaic/Mosaic.tsx"
import CornerCircles from "#components/tiles/svg/Corner-circles-svg.tsx"
import MiddleCircle from "#components/tiles/svg/Middle-circle-svg.tsx"
import OppositeCircles from "#components/tiles/svg/Opposite-circles-svg.tsx"
import Square from "#components/tiles/svg/Square-svg.tsx"
import Triangle from "#components/tiles/svg/Triangle-svg.tsx"

const tileSet = [CornerCircles, MiddleCircle, OppositeCircles, Square, Triangle]

const MosaicSvg = () => {
  return <Mosaic tileSet={tileSet} tileWidth={64} tileHeight={64} />
}

export default MosaicSvg
