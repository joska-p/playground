import { CornerCircles } from "./corner-circles-css";
import { Diamond } from "./diamond-css";
import { MiddleCircles } from "./middle-circe-css";
import { OppositeCircles } from "./opposite-circles-css";
import { Rainbow } from "./rainbow-css";
import { Square } from "./square-css";
import { Triangles } from "./triangles-css";
import { Cube } from "./cube-css";

const DefaultTileComponents = {
  [CornerCircles.name]: CornerCircles,
  [Diamond.name]: Diamond,
  [MiddleCircles.name]: MiddleCircles,
  [OppositeCircles.name]: OppositeCircles,
  [Rainbow.name]: Rainbow,
  [Square.name]: Square,
  [Triangles.name]: Triangles,
  [Cube.name]: Cube,
};

const defaultTileSet = [
  CornerCircles.name,
  Diamond.name,
  MiddleCircles.name,
  OppositeCircles.name,
  Rainbow.name,
  Square.name,
  Triangles.name,
  Cube.name,
];

const defaultRotations = {
  "--rotation-0": "0deg",
  "--rotation-1": "90deg",
  "--rotation-2": "180deg",
  "--rotation-3": "270deg",
};

const defaultPalette = {
  "--color-0": "#333333",
  "--color-1": "#555555",
  "--color-2": "#777777",
  "--color-3": "#999999",
  "--color-4": "#bbbbbb",
};

export { DefaultTileComponents, defaultTileSet, defaultRotations, defaultPalette };
