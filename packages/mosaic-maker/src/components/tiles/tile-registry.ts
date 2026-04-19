export type Shape =
  | { type: "circle"; cx: number; cy: number; r: number; colorIndex: number }
  | { type: "rect"; x: number; y: number; width: number; height: number; colorIndex: number }
  | { type: "path"; d: string; colorIndex: number }
  | { type: "polygon"; points: string; colorIndex: number };

export interface TileDefinition {
  shapes: Shape[];
}

export const TILE_REGISTRY: Record<string, TileDefinition> = {
  Square: {
    shapes: [{ type: "rect", x: 0, y: 0, width: 100, height: 100, colorIndex: 0 }],
  },
  CornerCircles: {
    shapes: [
      { type: "circle", cx: 0, cy: 0, r: 50, colorIndex: 0 },
      { type: "circle", cx: 100, cy: 100, r: 50, colorIndex: 1 },
    ],
  },
  OppositeCircles: {
    shapes: [
      { type: "circle", cx: 100, cy: 0, r: 50, colorIndex: 0 },
      { type: "circle", cx: 0, cy: 100, r: 50, colorIndex: 1 },
    ],
  },
  MiddleCircle: {
    shapes: [
      { type: "rect", x: 0, y: 0, width: 100, height: 100, colorIndex: 0 },
      { type: "circle", cx: 50, cy: 50, r: 50, colorIndex: 1 },
    ],
  },
  Diamond: {
    shapes: [{ type: "polygon", points: "50,0 100,50 50,100 0,50", colorIndex: 0 }],
  },
  Triangles: {
    shapes: [
      { type: "polygon", points: "0,0 100,0 50,50", colorIndex: 0 },
      { type: "polygon", points: "0,100 100,100 50,50", colorIndex: 1 },
    ],
  },
  Cube: {
    shapes: [
      { type: "polygon", points: "50,0 100,25 100,75 50,50", colorIndex: 0 },
      { type: "polygon", points: "50,0 0,25 0,75 50,50", colorIndex: 1 },
      { type: "polygon", points: "50,100 100,75 50,50 0,75", colorIndex: 2 },
    ],
  },
  Rainbow: {
    shapes: [
      { type: "circle", cx: 100, cy: 100, r: 100, colorIndex: 0 },
      { type: "circle", cx: 100, cy: 100, r: 80, colorIndex: 1 },
      { type: "circle", cx: 100, cy: 100, r: 60, colorIndex: 2 },
      { type: "circle", cx: 100, cy: 100, r: 40, colorIndex: 3 },
      { type: "circle", cx: 100, cy: 100, r: 20, colorIndex: 4 },
    ],
  },
};
