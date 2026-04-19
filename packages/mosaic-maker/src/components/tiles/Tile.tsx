import { twMerge } from "tailwind-merge";
import { TILE_REGISTRY, type Shape } from "./tile-registry.js";

export interface Props {
  name: string;
  colors: [string, string, string, string, string];
  rotation: string;
  className?: string;
}

function ShapeRenderer({ shape, colors }: { shape: Shape; colors: string[] }) {
  const fillColor = `var(${colors[shape.colorIndex]})`;

  switch (shape.type) {
    case "circle":
      return (
        <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill={fillColor} />
      );
    case "rect":
      return (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          fill={fillColor}
        />
      );
    case "path":
      return <path d={shape.d} fill={fillColor} />;
    case "polygon":
      return <polygon points={shape.points} fill={fillColor} />;
    default:
      return null;
  }
}

function Tile({ name, colors, rotation, className }: Props) {
  const definition = TILE_REGISTRY[name];

  if (!definition) {
    console.warn(`Tile pattern "${name}" not found in registry.`);
    return null;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={twMerge(
        "relative h-(--tile-size) w-(--tile-size) overflow-hidden transition-transform",
        className,
      )}
      style={{ transform: `rotate(var(${rotation}))` } as React.CSSProperties}
    >
      {definition.shapes.map((shape, index) => (
        <ShapeRenderer
          key={`${name}-shape-${index}`}
          shape={shape}
          colors={colors}
        />
      ))}
    </svg>
  );
}

Tile.displayName = "Tile";

export { Tile };
