import styles from "./tile.module.css"

type Props = {
  colors: string[]
  rotation: number
}

const Diamond = ({ colors, rotation }: Props) => {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
    backgroundColor: `var(${colors[0]})`,
  }

  return (
    <div className={styles.tile} style={styleObject}>
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(50% 0, 100% 0, 100% 50%)",
          backgroundColor: `var(${colors[1]})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(100% 50%, 100% 100%, 50% 100%)",
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(50% 100%, 0 100%, 0 50%)",
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 50%, 0 0, 50% 0)",
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  )
}

export default Diamond
