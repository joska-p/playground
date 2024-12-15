import { getColorsToUse } from "@/components/mosaic/lib/colors"
import styles from "./tile.module.css"

const Diamond = ({
  colors = getColorsToUse(),
  rotation = [0, 90, 180, 270].sort(() => Math.random() - 0.5)[0],
}) => {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
    backgroundColor: `var(${colors[0]})`,
  }

  return (
    <div className={`tile grid grid-cols-2 grid-rows-2 ${styles.tile}`} style={styleObject}>
      <div
        style={{
          borderTopColor: `var(${colors[1]})`,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: `var(${colors[1]})`,
          borderWidth: "calc(var(--tile-height) / 4)",
        }}
      />
      <div
        style={{
          borderTopColor: `var(${colors[2]})`,
          borderRightColor: `var(${colors[2]})`,
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          borderWidth: "calc(var(--tile-height) / 4)",
        }}
      />
      <div
        style={{
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: `var(${colors[3]})`,
          borderLeftColor: `var(${colors[3]})`,
          borderWidth: "calc(var(--tile-height) / 4)",
        }}
      />
      <div
        style={{
          borderTopColor: "transparent",
          borderRightColor: `var(${colors[4]})`,
          borderBottomColor: `var(${colors[4]})`,
          borderLeftColor: "transparent",
          borderWidth: "calc(var(--tile-height) / 4)",
        }}
      />
    </div>
  )
}

export default Diamond
