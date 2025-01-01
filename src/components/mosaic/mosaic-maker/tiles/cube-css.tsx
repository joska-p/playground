import { cn } from "@/lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Cube = ({ colors, rotation, className }: Props) => {
  const styleObjectCube = {
    height: "var(--tile-width)",
    width: "var(--tile-width)",
    transform: `rotate(var(${rotation}))`,
  };
  const styleObjectEdges = {
    backgroundColor: `var(${colors[0]})`,
    borderTopColor: `var(${colors[1]})`,
    borderTopWidth: "calc(var(--tile-width) / 2)",
    borderRightColor: `var(${colors[2]})`,
    borderRightWidth: "calc(var(--tile-width) / 2)",
    borderBottomColor: `var(${colors[2]})`,
    borderBottomWidth: "calc(var(--tile-width) / 2)",
    borderLeftColor: `var(${colors[1]})`,
    borderLeftWidth: "calc(var(--tile-width) / 2)",
    borderStyle: "solid",
  };

  const styleObjectinnerSquare = {
    height: "calc(var(--tile-width) / 2)",
    width: "calc(var(--tile-width) / 2)",
    backgroundColor: `var(${colors[3]})`,
  };

  return (
    <div style={styleObjectCube} className={cn("relative", className)}>
      <div style={styleObjectEdges} className="inset absolute" />
      <div style={styleObjectinnerSquare} className="absolute bottom-0 left-0"></div>
    </div>
  );
};

export { Cube };
