import styles from "./tile.module.css";

type Props = {
  colors: string[];
  rotation: string;
};

const Rainbow = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div className={styles.tile} style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute left-0 top-0 h-full w-full rounded-br-full"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full"
      />
    </div>
  );
};

export default Rainbow;
