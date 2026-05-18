import type { Rule, Palette } from "./rules";
import type Color from "colorjs.io";

function generatePalette(baseColor: Color, rule: Rule): Palette {
  return {
    colors: rule.apply(baseColor),
  };
}

export { generatePalette };
