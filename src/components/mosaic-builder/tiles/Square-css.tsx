import { cn } from "@/lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Square = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div
      className={cn("tile grid grid-cols-2 grid-rows-2", className)}
      style={styleObject}
    >
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
      <div style={{ backgroundColor: `var(${colors[4]})` }} />
    </div>
  );
};

export { Square };
