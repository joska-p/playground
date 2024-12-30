type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Triangles = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
    borderTopColor: `var(${colors[1]})`,
    borderTopWidth: "calc(var(--tile-width) / 2)",
    borderRightColor: `var(${colors[2]})`,
    borderRightWidth: "calc(var(--tile-width) / 2)",
    borderBottomColor: `var(${colors[3]})`,
    borderBottomWidth: "calc(var(--tile-width) / 2)",
    borderLeftColor: `var(${colors[4]})`,
    borderLeftWidth: "calc(var(--tile-width) / 2)",
    borderStyle: "solid",
  };

  return <div style={styleObject} className={className} />;
};

export { Triangles };
