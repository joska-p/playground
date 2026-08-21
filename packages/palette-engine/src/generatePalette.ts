import type { Palette, Rule } from './types';
import type Color from 'colorjs.io';

function generatePalette(baseColor: Color, rule: Rule): Palette {
    return {
        colors: rule.apply(baseColor)
    };
}

export { generatePalette };
