import type Color from 'colorjs.io';
import type { Palette, Rule } from './types';

/**
 * Generates a color palette by applying a harmony rule to a base color.
 *
 * @param baseColor - The starting base color.
 * @param rule - The harmony rule to apply.
 * @returns A computed palette object containing derived colors.
 */
function generatePalette(baseColor: Color, rule: Rule): Palette {
    return {
        colors: rule.apply(baseColor)
    };
}

export { generatePalette };
