import { colorNames } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}
const Square = ({ colors }: Props) => {
  const colorsToUse = colors || colorNames.toSorted(() => Math.random() - 0.5)

  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2" style={styleObject}>
      <div style={{ backgroundColor: `var(${colorsToUse[0]})` }} />
      <div style={{ backgroundColor: `var(${colorsToUse[1]})` }} />
      <div style={{ backgroundColor: `var(${colorsToUse[2]})` }} />
      <div style={{ backgroundColor: `var(${colorsToUse[3]})` }} />
    </div>
  )
}

export default Square
