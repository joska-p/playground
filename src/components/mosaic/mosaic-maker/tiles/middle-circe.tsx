import { cn } from "@/lib/utils";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MiddleCircles = ({ colors, rotation, className }: Props) => {
  const containerStyle = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  const circleStyle = (color: string) => ({
    backgroundColor: `var(${color})`,
  });

  return (
    <div
      className={cn("flex items-center justify-center transition-[transform,background-color] duration-300", className)}
      style={containerStyle}
    >
      <div className="h-1/2 w-1/4 rounded-l-full transition-colors duration-300" style={circleStyle(colors[1])} />
      <div className="h-1/2 w-1/4 rounded-r-full transition-colors duration-300" style={circleStyle(colors[2])} />
    </div>
  );
};

export { MiddleCircles };
