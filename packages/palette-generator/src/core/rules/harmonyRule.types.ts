import type Color from 'colorjs.io';

export type Palette = {
  colors: Color[];
};

export type Rule = {
  apply: (color: Color) => Color[];
  info: {
    name: string;
    description: string;
  };
};
