import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function CornerCircles({ colors, rotation, className }: Props) {
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
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full transition-colors duration-500"
      />
      <div
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
        className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-tl-full transition-colors duration-500"
      />
    </div>
  );
}

export { CornerCircles };
