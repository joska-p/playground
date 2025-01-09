import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  colors: [string, string, string, string, string];
  rotation: string;
}

const Rainbow = ({ colors, rotation, className }: Props) => {
  return (
    <div
      className={cn("transition-[transform,background-color] duration-500", className)}
      style={{
        backgroundColor: `var(${colors[0]})`,
        transform: `rotate(var(${rotation}))`,
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-full rounded-br-full transition-colors duration-500"
        style={{
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full transition-colors duration-500"
        style={{
          backgroundColor: `var(${colors[2]})`,
        }}
      />
    </div>
  );
};

export { Rainbow };
