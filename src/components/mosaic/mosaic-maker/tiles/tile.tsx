import { cn } from "@lib/utils";
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

type Props = {
  name: keyof typeof tileComponents;
  colors: [string, string, string, string, string];
  rotation: string;
  className?: string;
};

const Tile = ({ name, colors, rotation, className }: Props) => {
  if (colors.length !== 5) {
    throw new Error("Tile component requires exactly 5 colors");
  }

  const Component = tileComponents[name];
  return (
    <Component
      colors={colors}
      rotation={rotation}
      className={cn("relative h-[var(--tile-width)] w-[var(--tile-width)] overflow-hidden", className)}
    />
  );
};

export { Tile };
