import styles from "./tile.module.css";

type Props = {
  colors: string[];
  rotation: string;
};

const Triangles = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
    borderWidth: "calc(var(--tile-width) / 2)",
    borderTopColor: `var(${colors[1]})`,
    borderRightColor: `var(${colors[2]})`,
    borderBottomColor: `var(${colors[3]})`,
    borderLeftColor: `var(${colors[4]})`,
    borderStyle: "solid",
  };

  return <div style={styleObject} className={styles.tile} data-type="tile" />;
};

export default Triangles;
