import { type ComponentType } from "react";
import { twMerge } from "tailwind-merge";
import { CornerCircles } from "./Corner-circles";
import { Cube } from "./Cube";
import { Diamond } from "./Diamond";
import { MiddleCircle } from "./Middle-circle";
import { OppositeCircles } from "./Opposite-circles";
import { Rainbow } from "./Rainbow";
import { Square } from "./Square";
import { Triangles } from "./Triangles";

interface TileComponentProps {
  colors: [string, string, string, string, string];
  rotation: string;
  className?: string;
}

const tileComponents: Record<string, ComponentType<TileComponentProps>> = {
  CornerCircles,
  Diamond,
  MiddleCircle,
  OppositeCircles,
  Rainbow,
  Square,
  Triangles,
  Cube,
};

interface Props {
  name: keyof typeof tileComponents;
  colors: [string, string, string, string, string];
  rotation: string;
  className?: string;
}

function Tile({ name, colors, rotation, className }: Props) {
  if (colors.length < 5) {
    throw new Error("Tile component requires exactly 5 colors");
  }

  const TileComponent = tileComponents[name];

  if (!TileComponent) {
    return null;
  }

  return (
    <TileComponent
      colors={colors}
      rotation={rotation}
      className={twMerge(
        "mm:relative mm:h-(--tile-size) mm:w-(--tile-size) mm:overflow-hidden",
        className,
      )}
    />
  );
}

Tile.displayName = "Tile";

export { Tile };
