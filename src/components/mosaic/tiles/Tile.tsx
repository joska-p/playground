import { DefaultTileComponents } from "./default-tile-set";
import styles from "./tile.module.css";

import { cn } from "@/lib/utils";
type Props = {
  name: string;
  colors: string[];
  rotation: string;
  tileComponent?: typeof DefaultTileComponents;
} & React.HTMLAttributes<HTMLDivElement>;

const Tile = ({
  name,
  colors,
  rotation,
  tileComponent = DefaultTileComponents,
  className,
}: Props) => {
  const Component = tileComponent[name];
  return <Component colors={colors} rotation={rotation} className={cn(styles.tile, className)} />;
};

export default Tile;
