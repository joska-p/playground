import { getRandom, getRandomValue } from "@lib/utils";
import { getRandomColorsToUse } from "../lib/colors";
import { DefaultTileComponents } from "./default-tile-set";

const Tile = ({
  name = getRandomValue(DefaultTileComponents),
  colorNames = getRandomColorsToUse(),
  rotation = getRandom([0, 90, 180, 270]),
}) => {
  const Component = DefaultTileComponents[name];
  return <Component colors={colorNames} rotation={rotation} />;
};

export default Tile;
