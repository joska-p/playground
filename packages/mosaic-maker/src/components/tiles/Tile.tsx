import { type ComponentType } from "react";
import { twMerge } from "tailwind-merge";
import { CornerCircles } from "./Corner-circles.js";
import { Cube } from "./Cube.js";
import { Diamond } from "./Diamond.js";
import { MiddleCircle } from "./Middle-circle.js";
import { OppositeCircles } from "./Opposite-circles.js";
import { Rainbow } from "./Rainbow.js";
import { Square } from "./Square.js";
import { Triangles } from "./Triangles.js";

export interface TileComponentProps {
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

export interface Props {
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
        "relative h-(--tile-size) w-(--tile-size) overflow-hidden",
        className,
      )}
    />
  );
}

Tile.displayName = "Tile";

export { Tile };
