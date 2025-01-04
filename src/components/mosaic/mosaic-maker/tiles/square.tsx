import { cn } from "@lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Square = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div
      className={cn("tile grid grid-cols-2 grid-rows-2 transition-transform duration-300", className)}
      style={styleObject}
    >
      <div style={{ backgroundColor: `var(${colors[1]})` }} className="transition-colors duration-300" />
      <div style={{ backgroundColor: `var(${colors[2]})` }} className="transition-colors duration-300" />
      <div style={{ backgroundColor: `var(${colors[3]})` }} className="transition-colors duration-300" />
      <div style={{ backgroundColor: `var(${colors[4]})` }} className="transition-colors duration-300" />
    </div>
  );
};

export { Square };
