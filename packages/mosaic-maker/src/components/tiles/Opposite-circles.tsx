import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function OppositeCircles({ colors, rotation, className }: Props) {
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
        className="mm:absolute mm:right-1/2 mm:h-full mm:w-1/2 mm:rounded-r-full mm:transition-colors mm:duration-500"
      />
      <div
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
        className="mm:absolute mm:left-1/2 mm:h-full mm:w-1/2 mm:rounded-l-full mm:transition-colors mm:duration-500"
      />
    </div>
  );
}

OppositeCircles.displayName = "OppositeCircles";

export { OppositeCircles };
