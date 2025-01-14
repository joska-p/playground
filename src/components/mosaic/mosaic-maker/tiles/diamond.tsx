import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

function Diamond({ colors, rotation, className }: Props) {
  return (
    <div
      className={cn("transition-[transform,background-color] duration-500", className)}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: "polygon(50% 0, 100% 0, 100% 50%)",
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: "polygon(100% 50%, 100% 100%, 50% 100%)",
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: "polygon(50% 100%, 0 100%, 0 50%)",
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: "polygon(0 50%, 0 0, 50% 0)",
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  );
}

export { Diamond };
