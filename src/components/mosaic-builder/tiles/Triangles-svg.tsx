type Props = {
  colors: string[];
  rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Triangle = ({ colors, rotation, className }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div style={styleObject} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="triangle"
        viewBox="0 0 2 2"
      >
        <title>Triangle</title>
        <polygon points="0, 0 1, 1 2, 0" fill={`var(${colors[1]})`} />
        <polygon points="2, 0 1, 1 2, 2" fill={`var(${colors[2]})`} />
        <polygon points="0, 2 1, 1 2, 2" fill={`var(${colors[3]})`} />
        <polygon points="0, 0 1, 1 0, 2" fill={`var(${colors[4]})`} />
      </svg>
    </div>
  );
};

export { Triangle };
