import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function OppositeCircles({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn("transition-[transform,background-color] duration-500", className)}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
        className="absolute right-1/2 h-full w-1/2 rounded-r-full transition-colors duration-500"
      />
      <div
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
        className="absolute left-1/2 h-full w-1/2 rounded-l-full transition-colors duration-500"
      />
    </div>
  );
}

export { OppositeCircles };
