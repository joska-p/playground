import { getColorsToUse } from "@/components/mosaic/lib/colors"
import styles from "./tile.module.css"

const Triangle = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    borderTop: `var(${colors[0]}) calc(var(--tile-height) / 2) solid`,
    borderRight: `var(${colors[1]}) calc(var(--tile-width) / 2) solid`,
    borderBottom: `var(${colors[2]}) calc(var(--tile-height) / 2) solid`,
    borderLeft: `var(${colors[3]}) calc(var(--tile-width) / 2) solid`,
    transform: `rotate(${rotation}deg)`,
  }

  return <div style={styleObject} className={styles.tile}></div>
}

export default Triangle
