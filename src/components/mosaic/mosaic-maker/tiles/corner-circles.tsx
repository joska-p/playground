import { cn } from "@/lib/utils";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CornerCircles = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  const circleStyles = (color: string) => ({
    backgroundColor: `var(${color})`,
  });

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={styleObject}>
      <div
        style={circleStyles(colors[1])}
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full transition-colors duration-300"
      />
      <div
        style={circleStyles(colors[2])}
        className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-tl-full transition-colors duration-300"
      />
    </div>
  );
};

export { CornerCircles };
