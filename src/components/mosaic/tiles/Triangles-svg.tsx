import styles from "./tile.module.css";

type Props = {
  colors: string[];
  rotation: string;
};

const Triangle = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div style={styleObject} className={styles.tile} data-type="tile">
      <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 2 2">
        <polygon points="0, 0 1, 1 2, 0" fill={`var(${colors[1]})`} />
        <polygon points="2, 0 1, 1 2, 2" fill={`var(${colors[2]})`} />
        <polygon points="0, 2 1, 1 2, 2" fill={`var(${colors[3]})`} />
        <polygon points="0, 0 1, 1 0, 2" fill={`var(${colors[4]})`} />
      </svg>
    </div>
  );
};

export default Triangle;
