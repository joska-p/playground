type Props = {
  initialTileSet: (({
    colors,
    rotation,
  }: {
    colors?: string[]
    rotation?: number
  }) => JSX.Element)[]
  tileSet: (({ colors, rotation }: { colors?: string[]; rotation?: number }) => JSX.Element)[]
  handleChangeTileSet: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TileSetControls = ({ initialTileSet, tileSet, handleChangeTileSet }: Props) => {
  return (
    <div className="flex flex-wrap justify-around gap-2 lg:grid lg:grid-cols-2 lg:gap-8">
      {initialTileSet.map((Tile, index) => {
        const styleObject = {
          "--tile-width": "32px",
          "--tile-height": "32px",
          "--color-0": "#333333",
          "--color-1": "#555555",
          "--color-2": "#777777",
          "--color-3": "#999999",
          "--color-4": "#bbbbbb",
          "--rotation": "0deg",
        } as React.CSSProperties
        return (
          <label key={index} style={styleObject} className="flex items-center gap-2 lg:flex-col">
            <input
              type="checkbox"
              name={Tile.name}
              value={Tile.name}
              checked={tileSet.find((tile) => tile.name === Tile.name) ? true : false}
              onChange={handleChangeTileSet}
            />
            <Tile
              colors={["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"]}
              rotation={0}
            />
          </label>
        )
      })}
    </div>
  )
}

export default TileSetControls
