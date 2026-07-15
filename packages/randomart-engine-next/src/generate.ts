/**
 * The public `generate` entry point.
 *
 * Ties the pieces together: pick a grammar rule, build the expression tree,
 * rasterize it to a PNG by evaluating the expression per pixel, and bundle the
 * PNG together with the shader / math / tree / node representations.
 *
 * All input validation errors are returned as structured `{ error }` objects
 * rather than thrown, matching the task's error-handling contract.
 */

import { makeColorMapper } from './color.js';
import { evaluate } from './expression.js';
import { encodePNG } from './png.js';
import { DEFAULT_RULE_ID, getRule } from './rules.js';
import type { GenerateError, GenerateOptions, GenerateResult } from './types.js';

const DEFAULT_SIZE = 256;
const MAX_SIZE = 4096;

/**
 * Generate a random-art image and its symbolic representations from a seed.
 *
 * @param textSeed The seed string. Must be non-empty.
 * @param options  Optional rule id, color palette, and output size.
 * @returns Either a {@link GenerateResult} or a {@link GenerateError}.
 */
export function generate(
  textSeed: string,
  options: GenerateOptions = {}
): GenerateResult | GenerateError {
  try {
    if (typeof textSeed !== 'string' || textSeed.length === 0) {
      return { error: 'textSeed must be a non-empty string.' };
    }

    const ruleId = options.ruleId ?? DEFAULT_RULE_ID;
    if (options.enabledRuleIds && !options.enabledRuleIds.includes(ruleId)) {
      return { error: `Rule "${ruleId}" is not enabled.` };
    }
    const rule = getRule(ruleId);
    if (!rule) {
      return { error: `Unknown ruleId "${ruleId}".` };
    }

    const size = options.size ?? DEFAULT_SIZE;
    if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
      return {
        error: `size must be an integer between 1 and ${MAX_SIZE} (received ${String(
          options.size
        )}).`
      };
    }

    let colorFn: (v: number) => { r: number; g: number; b: number };
    try {
      colorFn = makeColorMapper(options.colorPalette);
    } catch (err) {
      return { error: (err as Error).message };
    }

    const node = rule.buildNode(textSeed);

    // Rasterize: evaluate the expression at each pixel's normalized coordinate.
    const pixels = new Uint8Array(size * size * 3);
    for (let py = 0; py < size; py++) {
      const y = (py / (size - 1 || 1)) * 2 - 1;
      for (let px = 0; px < size; px++) {
        const x = (px / (size - 1 || 1)) * 2 - 1;
        const v = evaluate(node, x, y);
        const { r, g, b } = colorFn(v);
        const idx = (py * size + px) * 3;
        pixels[idx] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
      }
    }

    const png = encodePNG(pixels, size, size);

    return {
      png,
      shader: rule.toGPU(textSeed),
      math: rule.toMathString(textSeed),
      tree: rule.toTreeView(textSeed),
      node
    };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
