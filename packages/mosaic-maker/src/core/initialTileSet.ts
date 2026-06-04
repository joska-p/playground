const defaultTileSet = [
  'CornerCircles',
  'Diamond',
  'MiddleCircle',
  'OppositeCircles',
  'Rainbow',
  'Square',
  'Triangles',
  'Cube',
] as const;

export type TileSet = (typeof defaultTileSet)[number][];
export type TileNames = (typeof defaultTileSet)[number];

const initialTileSet = defaultTileSet;

export { initialTileSet };
