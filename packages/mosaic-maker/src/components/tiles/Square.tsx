import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Square({ colors, rotation, className }: Props) {
  const squareStyle = {
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div
      className={twMerge(
        "mm:tile grid mm:grid-cols-2 mm:grid-rows-2 mm:transition-transform mm:duration-500",
        className,
      )}
      style={squareStyle}
    >
      <div
        className={"mm:transition-colors mm:duration-500"}
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className={"mm:transition-colors mm:duration-500"}
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className={"mm:transition-colors mm:duration-500"}
        style={{
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className={"mm:transition-colors mm:duration-500"}
        style={{
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  );
}

Square.displayName = "Square";

export { Square };
