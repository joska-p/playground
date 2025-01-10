/**
What is analogous palette?
An analogous color palette is a set of colors that are close to each other in
terms of hue, but not exactly the same. For example, if we have a palette with
colors A, B, and C, then the analogous palette would be colors D, E, and F.

How to generate analogous palette?
To generate an analogous palette, we can use a hue value to determine which
colors to use. For example, if we have a palette with colors A, B, and C, then
the analogous palette would be colors D, E, and F. To generate the analogous
palette, we can use the following formula:

baseColor = H, S, L
colorD = (H + 30) % 360, S, L
colorE = (H + 60) % 360, S, L
colorF = (H + 90) % 360, S, L


How to do more than 3 colors palette ?
What about N colors palette ?
Let's say we have color A and we want to generate N colors.
We need to calculate the interval between each color.
We can use the following formula:
interval = 360 / N
and then we can calculate the hue value of each color like this:

H = (H + interval * i) % 360

And now if we wan't to generate multiple palettes of any length we can use randomness like this:

leet palette = []
for (let i = 0; i < N; i++) {
  H = (H + interval * i) % 360
  S = S
  L = L
  palette.push(getColor(H))
}


Let also add a small amount of randomness in the saturation and lightness like this:

for (let i = 0; i < N; i++) {
  H = (H + interval * i) % 360
  S = S + Math.random() * 0.1
  L = L + Math.random() * 0.1
  palette.push([H, S, L])
}
 
  Now time implement the code
 */

import type { HSLColor } from "./color-conversions";

export function generateAnalogousPaletteFromHSL(baseColor: HSLColor, length: number): HSLColor[] {
  const step = 360 / length;
  const colors = Array.from({ length }, (_, i) => {
    const hue = (baseColor.hue + i * step) % 360;
    const saturation = baseColor.saturation + (Math.random() * 2 - 1) * 20;
    const lightness = baseColor.lightness + (Math.random() * 2 - 1) * 20;
    return { hue, saturation, lightness };
  });
  return colors;
}
