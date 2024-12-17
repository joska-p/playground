import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"
import type { DefaultTileSet } from "./Mosaic"
import Tile from "./tiles/Tile"

type Props = {
  tiles: DefaultTileSet
  ref: React.RefObject<HTMLDivElement>
  setNewTiles: () => void
  styleObject: React.CSSProperties
}

const Grid = ({ tiles, ref, setNewTiles, styleObject }: Props) => {
  const [mosaicSize, setMosaicSize] = useState({ width: 0, height: 0 })

  useDebounce(
    () => {
      setNewTiles()
    },
    100,
    [mosaicSize]
  )

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setMosaicSize({
        width: ref.current?.offsetWidth ?? mosaicSize.width,
        height: ref.current?.offsetHeight ?? mosaicSize.height,
      })
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={ref}
      className="flex h-full w-full flex-wrap place-content-center gap-[var(--gap)] overflow-hidden"
      style={styleObject}
    >
      {tiles.map((tile, index) => (
        <Tile key={index} name={tile.name} />
      ))}
    </section>
  )
}

export default Grid
