import styles from "./tile.module.css";

type Props = {
  colors: string[];
  rotation: string;
};

const Square = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(var(${rotation}))`,
  };

  return (
    <div className={`tile grid grid-cols-2 grid-rows-2 ${styles.tile}`} style={styleObject}>
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
      <div style={{ backgroundColor: `var(${colors[4]})` }} />
    </div>
  );
};

export default Square;
