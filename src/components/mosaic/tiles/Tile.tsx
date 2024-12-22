import { DefaultTileComponents } from "./default-tile-set";

type Props = {
  name: string;
  colors: string[];
  rotation: string;
  tileComponent?: typeof DefaultTileComponents;
};

const Tile = ({ name, colors, rotation, tileComponent = DefaultTileComponents }: Props) => {
  const Component = tileComponent[name];
  return <Component colors={colors} rotation={rotation} />;
};

export default Tile;
