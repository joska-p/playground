import { cn } from "@/lib/utils";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const OppositeCircles = ({ colors, rotation, className }: Props) => {
  const containerStyle = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  const circleStyle = (color: string) => ({
    backgroundColor: `var(${color})`,
  });

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={containerStyle}>
      <div
        style={circleStyle(colors[1])}
        className="absolute right-1/2 h-full w-1/2 rounded-r-full transition-colors duration-300"
      />
      <div
        style={circleStyle(colors[2])}
        className="absolute left-1/2 h-full w-1/2 rounded-l-full transition-colors duration-300"
      />
    </div>
  );
};

export { OppositeCircles };
