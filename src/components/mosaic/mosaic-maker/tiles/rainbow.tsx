import { cn } from "@lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Rainbow = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute left-0 top-0 h-full w-full rounded-br-full transition-colors duration-300"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full transition-colors duration-300"
      />
    </div>
  );
};

export { Rainbow };
