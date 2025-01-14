import type { ComponentProps } from "react";
import { CSS_VARS } from "../config";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Cube({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn("transition-transform duration-500", className)}
      style={{
        transform: `rotate(var(${rotation}))`,
        backgroundColor: `var(${colors[0]})`,
      }}
    >
      <div
        className={"absolute left-0 top-0 border-solid transition-[border-color] duration-500"}
        style={{
          borderLeftColor: `var(${colors[1]})`,
          borderTopColor: `var(${colors[1]})`,
          borderRightColor: `var(${colors[2]})`,
          borderBottomColor: `var(${colors[2]})`,
          borderWidth: `calc(var(${CSS_VARS.width})/2)`,
        }}
      />
      <div
        className={"absolute bottom-0 left-0 bg-inherit transition-[background-color] duration-500"}
        style={{
          backgroundColor: `var(${colors[3]})`,
          height: `calc(var(${CSS_VARS.height})/2)`,
          width: `calc(var(${CSS_VARS.width})/2)`,
        }}
      />
    </div>
  );
}

export { Cube };
