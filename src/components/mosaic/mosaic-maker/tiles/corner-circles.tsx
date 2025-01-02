type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CornerCircles = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div className={className} style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full transition-colors"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-tl-full transition-colors"
      />
    </div>
  );
};

export { CornerCircles };
