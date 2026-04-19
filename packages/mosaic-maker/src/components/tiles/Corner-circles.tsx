import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function CornerCircles({ colors, rotation, className }: Props) {
  return (
    <div
      className={twMerge(
        "transition-[transform,background-color] duration-500",
        className,
      )}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
        className="absolute top-0 left-0 h-1/2 w-1/2 rounded-br-full transition-colors duration-500"
      />
      <div
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
        className="absolute right-0 bottom-0 h-1/2 w-1/2 rounded-tl-full transition-colors duration-500"
      />
    </div>
  );
}

CornerCircles.displayName = "CornerCircles";

export { CornerCircles };
