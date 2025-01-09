import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function MiddleCircles({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn("flex items-center justify-center transition-[transform,background-color] duration-300", className)}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        className="h-1/2 w-1/4 rounded-l-full transition-colors duration-300"
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="h-1/2 w-1/4 rounded-r-full transition-colors duration-300"
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
    </div>
  );
}

export { MiddleCircles };
