import styles from "./tile.module.css"

type Props = {
  colors: string[]
  rotation: number
}

const OppositeCircles = ({ colors, rotation }: Props) => {
  const styleObject = {
    backgroundColor: `var(${colors[0]})`,
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <div className={styles.tile} style={styleObject}>
      <div
        style={{ backgroundColor: `var(${colors[1]})` }}
        className="absolute right-1/2 h-full w-1/2 rounded-r-full"
      />
      <div
        style={{ backgroundColor: `var(${colors[2]})` }}
        className="absolute left-1/2 h-full w-1/2 rounded-l-full"
      />
    </div>
  )
}

export default OppositeCircles
