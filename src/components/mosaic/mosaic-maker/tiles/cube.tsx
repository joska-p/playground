import { cn } from "@lib/utils";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Cube = ({ colors, rotation, className }: Props) => {
  const cubeStyle = {
    transform: `rotate(var(${rotation}))`,
    backgroundColor: `var(${colors[0]})`,
  };

  const edgeStyle = {
    borderLeftColor: `var(${colors[1]})`,
    borderTopColor: `var(${colors[1]})`,
    borderRightColor: `var(${colors[2]})`,
    borderBottomColor: `var(${colors[2]})`,
  };

  return (
    <div style={cubeStyle} className={cn("transition-transform duration-300", className)}>
      <div
        style={edgeStyle}
        className="absolute left-0 top-0 border-b-[calc(var(--tile-width)/2)] border-l-[calc(var(--tile-width)/2)] border-r-[calc(var(--tile-width)/2)] border-t-[calc(var(--tile-width)/2)] border-solid transition-[border-color] duration-300"
      />
      <div className="absolute bottom-0 left-0 h-[calc(var(--tile-width)/2)] w-[calc(var(--tile-width)/2)] bg-inherit transition-[background-color] duration-300" />
    </div>
  );
};

export { Cube };
