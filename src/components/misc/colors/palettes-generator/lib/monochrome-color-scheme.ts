/*
A monochrome color scheme.
numColors = 4 //how many colors we want our scheme to have
colors = [] //the final color palette array

//get our hue first, outside of the loop,
//so all the colors we make will have the same hue
h = random(0, 1)

for i = 0, numColors
    //all these colors are going to have the same saturation,
    //though you could experiment with changing this as well
    s = 1
    //the value is going to go from 0 to 1 in steps
    //so that the last color will have 1 value, and the first color will be black.
    //you could instead multiply this by i + 1,
    //so that the darkest color will be a dark shade of your hue rather than black.
    v = (1/numColors) * i

    colors[i] = (h, s, v)
*/

import { HSLToHex, type HSLColor } from "./color-conversions";

export function monochromeColorScheme(numColors: number): string[] {
  const colors: HSLColor[] = [];
  const h = Math.random();
  for (let i = 0; i < numColors; i++) {
    const s = 1;
    const v = (1 / numColors) * i;
    colors.push({ hue: h, saturation: s, lightness: v });
  }
  return colors.map((color) => HSLToHex(color));
}
