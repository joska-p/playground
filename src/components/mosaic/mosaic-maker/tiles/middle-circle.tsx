import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function MiddleCircle({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center transition-[transform,background-color] duration-500",
        className
      )}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        className="h-1/2 w-1/4 rounded-l-full transition-colors duration-500"
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="h-1/2 w-1/4 rounded-r-full transition-colors duration-500"
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
    </div>
  );
}

export { MiddleCircle };
