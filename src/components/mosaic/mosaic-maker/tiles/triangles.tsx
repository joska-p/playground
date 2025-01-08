import { cn } from "@/lib/utils";
import { CSS_VARS } from "../config";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Triangles = ({ colors, rotation, className }: Props) => {
  const triangleStyle = {
    transform: `rotate(var(${rotation}))`,
    borderTopColor: `var(${colors[1]})`,
    borderRightColor: `var(${colors[2]})`,
    borderBottomColor: `var(${colors[3]})`,
    borderLeftColor: `var(${colors[4]})`,
    borderStyle: "solid",
    borderWidth: `calc(var(${CSS_VARS.width})/2)`,
  };

  return (
    <div
      style={triangleStyle}
      className={cn("border-solid transition-[transform,border-color] duration-300", className)}
    />
  );
};

export { Triangles };
