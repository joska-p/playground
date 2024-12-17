import styles from "./tile.module.css";

type Props = {
  colors: string[];
  rotation: number;
};

const MiddleCircles = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(${rotation}deg)`,
  };

  const linearGradient = {
    backgroundImage: `linear-gradient(to right, var(${colors[1]}), 50% , var(${colors[1]}), 50%, var(${colors[2]}) , var(${colors[2]}))`,
  };

  return (
    <div className={`flex items-center justify-center ${styles.tile}`} style={styleObject}>
      <div
        className="h-1/2 w-1/4 rounded-l-full"
        style={{ backgroundColor: `var(${colors[1]})` }}
      />
      <div
        className="h-1/2 w-1/4 rounded-r-full"
        style={{ backgroundColor: `var(${colors[2]})` }}
      />
    </div>
  );
};

export default MiddleCircles;
