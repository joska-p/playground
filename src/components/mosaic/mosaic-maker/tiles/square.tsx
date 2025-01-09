import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Square({ colors, rotation, className }: Props) {
  const squareStyle = {
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div
      className={cn("tile grid grid-cols-2 grid-rows-2 transition-transform duration-500", className)}
      style={squareStyle}
    >
      <div
        className={"transition-colors duration-500"}
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className={"transition-colors duration-500"}
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className={"transition-colors duration-500"}
        style={{
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className={"transition-colors duration-500"}
        style={{
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  );
}

export { Square };
