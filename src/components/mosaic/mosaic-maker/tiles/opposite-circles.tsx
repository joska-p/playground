import { cn } from "@lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const OppositeCircles = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute right-1/2 h-full w-1/2 rounded-r-full transition-colors duration-300"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute left-1/2 h-full w-1/2 rounded-l-full transition-colors duration-300"
      />
    </div>
  );
};

export { OppositeCircles };
