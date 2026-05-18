import type Color from "colorjs.io";

export type Palette = {
  colors: Color[];
};

export type Rule = {
  id: string;
  apply: (color: Color) => Color[];
  info: {
    name: string;
    description: string;
  };
};

const exampleRule: Rule = {
  id: "rule01",
  apply: (color: Color) => [color, color, color, color, color, color],
  info: {
    name: "example 01",
    description: "return the input color",
  },
};

const rules = {
  [exampleRule.id]: exampleRule,
} as const;

export { rules };
