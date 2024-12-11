import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const Triangle = ({ colors = getColorsToUse() }: Props) => {
  const styleObject = {
    borderTop: `var(${colors[0]}) calc(var(--tile-height) / 2) solid`,
    borderRight: `var(${colors[1]}) calc(var(--tile-width) / 2) solid`,
    borderBottom: `var(${colors[2]}) calc(var(--tile-height) / 2) solid`,
    borderLeft: `var(${colors[3]}) calc(var(--tile-width) / 2) solid`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return <div style={styleObject}></div>
}

export default Triangle
