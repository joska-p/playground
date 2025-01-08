import { cn } from "@/lib/utils";
import { CSS_VARS } from "../config";

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
    borderWidth: `calc(var(${CSS_VARS.width})/2)`,
  };

  const squareStyle = {
    backgroundColor: `var(${colors[3]})`,
    height: `calc(var(${CSS_VARS.height})/2)`,
    width: `calc(var(${CSS_VARS.width})/2)`,
  };

  return (
    <div style={cubeStyle} className={cn("transition-transform duration-300", className)}>
      <div style={edgeStyle} className={"absolute left-0 top-0 border-solid transition-[border-color] duration-300"} />
      <div
        style={squareStyle}
        className={"absolute bottom-0 left-0 bg-inherit transition-[background-color] duration-300"}
      />
    </div>
  );
};

export { Cube };
