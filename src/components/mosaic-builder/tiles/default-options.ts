import { CornerCircles } from "./Corner-circles-css";
import { Diamond } from "./Diamond-css";
import { MiddleCircles } from "./Middle-circe-css";
import { OppositeCircles } from "./Opposite-circles-css";
import { Rainbow } from "./Rainbow-css";
import { Square } from "./Square-css";
import { Triangles } from "./Triangles-css";

const DefaultTileComponents = {
  [CornerCircles.name]: CornerCircles,
  [Diamond.name]: Diamond,
  [MiddleCircles.name]: MiddleCircles,
  [OppositeCircles.name]: OppositeCircles,
  [Rainbow.name]: Rainbow,
  [Square.name]: Square,
  [Triangles.name]: Triangles,
};

const defaultTileSet = [
  CornerCircles.name,
  Diamond.name,
  MiddleCircles.name,
  OppositeCircles.name,
  Rainbow.name,
  Square.name,
  Triangles.name,
];

const defaultRotations = {
  "--rotation-0": "0deg",
  "--rotation-1": "90deg",
  "--rotation-2": "180deg",
  "--rotation-3": "270deg",
};

const defaulColors = {
  "--color-0": "#333333",
  "--color-1": "#555555",
  "--color-2": "#777777",
  "--color-3": "#999999",
  "--color-4": "#bbbbbb",
};

const defaultPalette = ["#333333", "#555555", "#777777", "#999999", "#bbbbbb"];

export { DefaultTileComponents, defaultTileSet, defaultRotations, defaulColors, defaultPalette };

export type DefaultTileSet = typeof defaultTileSet;
