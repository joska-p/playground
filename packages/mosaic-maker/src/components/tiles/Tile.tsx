import { twMerge } from "tailwind-merge";
import { TILE_REGISTRY, type Shape } from "../../core/tile-registry.js";

export interface Props {
  name: string;
  colors: [string, string, string, string, string];
  rotation: string;
  className?: string;
}

function ShapeRenderer({ shape, colors }: { shape: Shape; colors: string[] }) {
  const fillColor = `var(${colors[shape.colorIndex]})`;
  const commonProps = {
    fill: fillColor,
    className: "transition-all duration-500",
  };

  switch (shape.type) {
    case "circle":
      return (
        <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...commonProps} />
      );
    case "rect":
      return (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          {...commonProps}
        />
      );
    case "path":
      return <path d={shape.d} {...commonProps} />;
    case "polygon":
      return <polygon points={shape.points} {...commonProps} />;
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
        "relative h-(--tile-size) w-(--tile-size) overflow-hidden transition-transform duration-500",
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
