import { cn } from "@lib/utils";

type SquareProps = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const COMMON_STYLES = "transition-colors duration-300";

const Square = ({ colors, rotation, className }: SquareProps) => {
  const squareStyle = {
    transform: `rotate(var(${rotation}))`,
  };

  const sectionStyle = (color: string) => ({
    backgroundColor: `var(${color})`,
  });

  return (
    <div
      className={cn("tile grid grid-cols-2 grid-rows-2 transition-transform duration-300", className)}
      style={squareStyle}
    >
      <div style={sectionStyle(colors[1])} className={COMMON_STYLES} />
      <div style={sectionStyle(colors[2])} className={COMMON_STYLES} />
      <div style={sectionStyle(colors[3])} className={COMMON_STYLES} />
      <div style={sectionStyle(colors[4])} className={COMMON_STYLES} />
    </div>
  );
};

export { Square, type SquareProps };
