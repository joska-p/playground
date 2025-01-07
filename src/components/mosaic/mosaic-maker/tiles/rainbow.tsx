import { cn } from "@lib/utils";

interface RainbowProps extends React.HTMLAttributes<HTMLDivElement> {
  colors: [string, string, string, string, string];
  rotation: string;
}

const COMMON_STYLES = "absolute left-0 top-0 rounded-br-full transition-colors duration-300";

const Rainbow = ({ colors, rotation, className }: RainbowProps) => {
  const containerStyle = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  const sectionStyle = (color: string) => ({
    backgroundColor: `var(${color})`,
  });

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={containerStyle}>
      <div style={sectionStyle(colors[1])} className={cn(COMMON_STYLES, "h-full w-full")} />
      <div style={sectionStyle(colors[2])} className={cn(COMMON_STYLES, "h-1/2 w-1/2")} />
    </div>
  );
};

export { Rainbow, type RainbowProps };
