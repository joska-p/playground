import type Color from "colorjs.io";
import type { Rule } from "./types";

const rule01: Rule = {
  apply: (color: Color) => [color, color, color, color, color, color],
  info: {
    name: "example 01",
    description: "return the input color",
  },
};

export { rule01 };
