import { cn } from "@/lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Triangles = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    transform: `rotate(var(${rotation}))`,
    borderTopColor: `var(${colors[1]})`,
    borderRightColor: `var(${colors[2]})`,
    borderBottomColor: `var(${colors[3]})`,
    borderLeftColor: `var(${colors[4]})`,
    borderStyle: "solid",
  };

  return (
    <div
      style={styleObject}
      className={cn(
        "border-b-[calc(var(--tile-width)/2)] border-l-[calc(var(--tile-width)/2)] border-r-[calc(var(--tile-width)/2)] border-t-[calc(var(--tile-width)/2)] border-solid transition-[transform,border-color] duration-300",
        className
      )}
    />
  );
};

export { Triangles };
