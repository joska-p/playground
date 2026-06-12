const initialTileSet = [
  'CornerCircles',
  'Diamond',
  'MiddleCircle',
  'OppositeCircles',
  'Rainbow',
  'Square',
  'Triangles',
  'Cube'
] as const;

export type TileNames = (typeof initialTileSet)[number];
export type TileSet = TileNames[];

export { initialTileSet };
