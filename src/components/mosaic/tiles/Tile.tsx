import { DefaultTileComponents } from "./default-tile-set";

type Props = {
  name: string;
  colors: string[];
  rotation: number;
};

const Tile = ({ name, colors, rotation }: Props) => {
  const Component = DefaultTileComponents[name];
  return <Component colors={colors} rotation={rotation} />;
};

export default Tile;
