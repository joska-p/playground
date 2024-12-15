import type { Tiles } from "./Mosaic"
import { getColorsToUse } from "./lib/colors"

type Props = {
  tiles: Tiles
  styleObject: React.CSSProperties
  ref: React.RefObject<HTMLDivElement>
}

const Grid = ({ tiles, styleObject, ref }: Props) => {
  return (
    <section
      style={styleObject}
      className="relative flex h-dvh w-full flex-wrap content-center justify-center gap-[var(--gap)] overflow-hidden p-[calc(var(--gap)/2)]"
      ref={ref}
    >
      {tiles.map((Tile, index) => (
        <Tile
          key={index}
          colors={getColorsToUse()}
          rotation={[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}
        />
      ))}
    </section>
  )
}

export default Grid
