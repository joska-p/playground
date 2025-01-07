import { cn } from "@lib/utils";

type Props = {
  colors: [string, string, string, string, string];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Diamond = ({ colors, rotation, className }: Props) => {
  const diamondStyle = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  const sectionStyles = (clipPath: string, color: string) => ({
    clipPath,
    backgroundColor: `var(${color})`,
  });

  return (
    <div className={cn("transition-[transform,background-color] duration-300", className)} style={diamondStyle}>
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={sectionStyles("polygon(50% 0, 100% 0, 100% 50%)", colors[1])}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={sectionStyles("polygon(100% 50%, 100% 100%, 50% 100%)", colors[2])}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={sectionStyles("polygon(50% 100%, 0 100%, 0 50%)", colors[3])}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={sectionStyles("polygon(0 50%, 0 0, 50% 0)", colors[4])}
      />
    </div>
  );
};

export { Diamond };
