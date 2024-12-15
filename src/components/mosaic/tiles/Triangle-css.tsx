import { getColorsToUse } from "@/components/mosaic/lib/colors"
import styles from "./tile.module.css"

const Triangle = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
    backgroundColor: `var(${colors[0]})`,
  }

  return (
    <div style={styleObject} className={styles.tile} data-type="tile">
      <div
        className="absolute inset-0"
        style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0)", backgroundColor: `var(${colors[1]})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
          backgroundColor: `var(${colors[2]})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(100% 100%, 50% 50%, 0 100%)",
          backgroundColor: `var(${colors[3]})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 100%, 50% 50%, 0% 0%)",
          backgroundColor: `var(${colors[4]})`,
        }}
      />
    </div>
  )
}

export default Triangle
