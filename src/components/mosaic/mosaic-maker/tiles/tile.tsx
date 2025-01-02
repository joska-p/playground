import { cn } from "@/lib/utils";
import { DefaultTileComponents } from "./default-options";
import styles from "./tile.module.css";

type TileProps = {
  name: string;
  colors: string[];
  rotation: string;
  className?: string;
  component?: (typeof DefaultTileComponents)[keyof typeof DefaultTileComponents];
};

const Tile = ({
  name,
  colors,
  rotation,
  component: Component = DefaultTileComponents[name],
  className,
}: TileProps) => {
  return <Component colors={colors} rotation={rotation} className={cn(styles.tile, className)} />;
};

export { Tile };
