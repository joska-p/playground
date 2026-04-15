import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Diamond({ colors, rotation, className }: Props) {
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
        className="mm:absolute mm:inset-0 mm:transition-colors mm:duration-500"
        style={{
          clipPath: "polygon(50% 0, 100% 0, 100% 50%)",
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="mm:absolute mm:inset-0 mm:transition-colors mm:duration-500"
        style={{
          clipPath: "polygon(100% 50%, 100% 100%, 50% 100%)",
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className="mm:absolute mm:inset-0 mm:transition-colors mm:duration-500"
        style={{
          clipPath: "polygon(50% 100%, 0 100%, 0 50%)",
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className="mm:absolute mm:inset-0 mm:transition-colors mm:duration-500"
        style={{
          clipPath: "polygon(0 50%, 0 0, 50% 0)",
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  );
}

Diamond.displayName = "Diamond";

export { Diamond };
