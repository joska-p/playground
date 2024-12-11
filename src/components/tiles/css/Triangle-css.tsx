import { colorNames } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const Triangle = ({ colors }: Props) => {
  const colorsToUse = colors || colorNames.toSorted(() => Math.random() - 0.5)

  const styleObject = {
    borderTop: `var(${colorsToUse[0]}) calc(var(--tile-height) / 2) solid`,
    borderRight: `var(${colorsToUse[1]}) calc(var(--tile-width) / 2) solid`,
    borderBottom: `var(${colorsToUse[2]}) calc(var(--tile-height) / 2) solid`,
    borderLeft: `var(${colorsToUse[3]}) calc(var(--tile-width) / 2) solid`,
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return <div style={styleObject}></div>
}

export default Triangle
