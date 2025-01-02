import { cn } from "@/lib/utils";
import styles from "./tile.module.css";
import { CornerCircles } from "./corner-circles-css";
import { Diamond } from "./diamond-css";
import { MiddleCircles } from "./middle-circe-css";
import { OppositeCircles } from "./opposite-circles-css";
import { Rainbow } from "./rainbow-css";
import { Square } from "./square-css";
import { Triangles } from "./triangles-css";
import { Cube } from "./cube-css";

const tileComponents = {
  [CornerCircles.name]: CornerCircles,
  [Diamond.name]: Diamond,
  [MiddleCircles.name]: MiddleCircles,
  [OppositeCircles.name]: OppositeCircles,
  [Rainbow.name]: Rainbow,
  [Square.name]: Square,
  [Triangles.name]: Triangles,
  [Cube.name]: Cube,
};

type TileProps = {
  name: string;
  colors: string[];
  rotation: string;
  className?: string;
  component?: (typeof tileComponents)[keyof typeof tileComponents];
};

const Tile = ({
  name,
  colors,
  rotation,
  component: Component = tileComponents[name],
  className,
}: TileProps) => {
  return <Component colors={colors} rotation={rotation} className={cn(styles.tile, className)} />;
};

export { Tile };
