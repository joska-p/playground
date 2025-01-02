import { cn } from "@/lib/utils";
import { CornerCircles } from "./corner-circles";
import { Diamond } from "./diamond";
import { MiddleCircles } from "./middle-circe";
import { OppositeCircles } from "./opposite-circles";
import { Rainbow } from "./rainbow";
import { Square } from "./square";
import { Triangles } from "./triangles";
import { Cube } from "./cube";

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
  return (
    <Component
      colors={colors}
      rotation={rotation}
      className={cn(
        "relative h-[var(--tile-width)] w-[var(--tile-width)] overflow-hidden transition-[transform,colors]",
        className
      )}
    />
  );
};

export { Tile };
