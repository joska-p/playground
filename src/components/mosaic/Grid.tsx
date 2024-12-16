import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"
import type { Tiles } from "./Mosaic"
import { getColorsToUse } from "./lib/colors"

type Props = {
  tiles: Tiles
  styleObject: React.CSSProperties
  ref: React.RefObject<HTMLDivElement>
  setMosaicSize: ({ width, height }: { width: number; height: number }) => void
}

const Grid = ({ tiles, styleObject, ref, setMosaicSize }: Props) => {
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })

  useDebounce(
    () => {
      setMosaicSize({
        width: ref.current?.offsetWidth ?? gridSize.width,
        height: ref.current?.offsetHeight ?? gridSize.height,
      })
    },
    100,
    [gridSize]
  )

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setGridSize({
        width: ref.current?.offsetWidth ?? gridSize.width,
        height: ref.current?.offsetHeight ?? gridSize.height,
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
      className="flex h-dvh flex-wrap content-center justify-center gap-[var(--gap)] p-[calc(var(--gap)/2)]"
      style={styleObject}
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
