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
        "mm:transition-[transform,background-color] mm:duration-500",
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
        className="mm:absolute mm:top-0 mm:left-0 mm:h-1/2 mm:w-1/2 mm:rounded-br-full mm:transition-colors mm:duration-500"
      />
      <div
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
        className="mm:absolute mm:right-0 mm:bottom-0 mm:h-1/2 mm:w-1/2 mm:rounded-tl-full mm:transition-colors mm:duration-500"
      />
    </div>
  );
}

CornerCircles.displayName = "CornerCircles";

export { CornerCircles };
