import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { CSS_VARS } from "../config";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Triangles({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn("border-solid transition-[transform,border-color] duration-500", className)}
      style={{
        transform: `rotate(var(${rotation}))`,
        borderTopColor: `var(${colors[1]})`,
        borderRightColor: `var(${colors[2]})`,
        borderBottomColor: `var(${colors[3]})`,
        borderLeftColor: `var(${colors[4]})`,
        borderStyle: "solid",
        borderWidth: `calc(var(${CSS_VARS.width})/2)`,
      }}
    />
  );
}

export { Triangles };
