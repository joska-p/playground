import { cn } from "@/lib/utils";

type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Diamond = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div
      className={cn("transition-[transform,background-color] duration-300", className)}
      style={styleObject}
    >
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          clipPath: "polygon(50% 0, 100% 0, 100% 50%)",
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          clipPath: "polygon(100% 50%, 100% 100%, 50% 100%)",
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          clipPath: "polygon(50% 100%, 0 100%, 0 50%)",
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          clipPath: "polygon(0 50%, 0 0, 50% 0)",
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  );
};

export { Diamond };
