import type Color from "colorjs.io";

export type BaseColor = Color;

export type Palette = {
  colors: BaseColor[];
};

export type Rule = {
  id: string;
  apply: (color: BaseColor) => BaseColor[];
  info: {
    name: string;
    description: string;
  };
};

const exampleRule: Rule = {
  id: "rule01",
  apply: (color: BaseColor) => [color, color, color, color, color, color],
  info: {
    name: "example 01",
    description: "return the input color",
  },
};

const rules = {
  [exampleRule.id]: exampleRule,
} as const;

export { rules };
