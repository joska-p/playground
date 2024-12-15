import { getColorsToUse } from "@/components/mosaic/lib/colors"
import styles from "./tile.module.css"

const Square = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <div className={`tile grid grid-cols-2 grid-rows-2 ${styles.tile}`} style={styleObject}>
      <div style={{ backgroundColor: `var(${colors[0]})` }} />
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
    </div>
  )
}

export default Square
