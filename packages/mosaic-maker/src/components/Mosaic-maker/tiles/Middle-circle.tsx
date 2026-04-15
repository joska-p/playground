import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function MiddleCircle({ colors, rotation, className }: Props) {
  return (
    <div
      className={twMerge(
        "mm:flex mm:items-center mm:justify-center mm:transition-[transform,background-color] mm:duration-500",
        className,
      )}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        className="mm:h-1/2 mm:w-1/4 mm:rounded-l-full mm:transition-colors mm:duration-500"
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="mm:h-1/2 mm:w-1/4 mm:rounded-r-full mm:transition-colors mm:duration-500"
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
    </div>
  );
}

MiddleCircle.displayName = "MiddleCircle";

export { MiddleCircle };
