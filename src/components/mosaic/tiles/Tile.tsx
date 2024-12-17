import { getRandom, getRandomValue } from "@lib/utils"
import { getRandomColorsToUse } from "../lib/colors"
import CornerCircles from "./Corner-circles-css"
import Diamond from "./Diamond-css"
import MiddleCircles from "./Middle-circe-css"
import OppositeCircles from "./Opposite-circles-css"
import Rainbow from "./Rainbow-css"
import Square from "./Square-css"
import Triangle from "./Triangle-css"

const tileComponents = {
  [CornerCircles.name]: CornerCircles,
  [Diamond.name]: Diamond,
  [MiddleCircles.name]: MiddleCircles,
  [OppositeCircles.name]: OppositeCircles,
  [Rainbow.name]: Rainbow,
  [Square.name]: Square,
  [Triangle.name]: Triangle,
}

const Tile = ({
  name = getRandomValue(tileComponents),
  colorNames = getRandomColorsToUse(),
  rotation = getRandom([0, 90, 180, 270]),
}) => {
  const Component = tileComponents[name]
  return <Component colors={colorNames} rotation={rotation} />
}

export default Tile
