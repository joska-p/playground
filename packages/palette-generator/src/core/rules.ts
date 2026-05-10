// oklab colors = oklab(40.1% 0.1143 0.045 / 0.9);
// 40.1% is the lightness component, 0.1143 is the chroma component, and 0.045 is the hue component
//
export type BaseColor = string;

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

export type Rules = Map<string, Rule>;

const exampleRule: Rule = {
  id: "example-rule-01",
  apply: (color: BaseColor) => [color],
  info: {
    name: "example 01",
    description: "return the input color",
  },
};

const rules: Rules = new Map([[exampleRule.id, exampleRule]]);

export { rules };
