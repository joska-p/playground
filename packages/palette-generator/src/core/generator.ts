import type { Rule, BaseColor, Palette } from "./rules";

function generatePalette(baseColor: BaseColor, rule: Rule): Palette {
  return {
    colors: rule.apply(baseColor),
  };
}

export { generatePalette };
