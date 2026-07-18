import { compileToShader } from './compileToGLSL.js';
import { toMathString } from './format.js';
import { DEFAULT_RULE_ID, getRule } from './grammar/rules/registry.js';
import { encodePNG } from './png.js';
import { buildChannelTrees, evaluate } from './tree.js';
import type { GenerateError, GenerateOptions, GenerateResult } from './types.js';

const DEFAULT_SIZE = 256;
const MAX_SIZE = 4096;

// ── Public API ────────────────────────────────────────────────

/**
 * Generate a random-art image and its symbolic representations from a seed.
 *
 * Builds three correlated R/G/B expression trees, rasterizes them to a PNG
 * by evaluating all three trees per pixel, and bundles the PNG together with
 * shader / math / tree representations.
 *
 * @param textSeed The seed string. Must be non-empty.
 * @param options  Optional rule id and output size.
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

    const size = options.size ?? DEFAULT_SIZE;
    if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
      return {
        error: `size must be an integer between 1 and ${MAX_SIZE} (received ${String(
          options.size
        )}).`
      };
    }

    const { treeR, treeG, treeB } = buildChannelTrees(textSeed, rule, false);

    // Rasterize: evaluate all three trees at each pixel's normalized coordinate.
    const pixels = new Uint8Array(size * size * 3);
    for (let py = 0; py < size; py++) {
      const y = (py / (size - 1 || 1)) * 2 - 1;
      for (let px = 0; px < size; px++) {
        const x = (px / (size - 1 || 1)) * 2 - 1;
        const r = Math.round((evaluate(treeR, x, y) + 1) * 127.5);
        const g = Math.round((evaluate(treeG, x, y) + 1) * 127.5);
        const b = Math.round((evaluate(treeB, x, y) + 1) * 127.5);
        const idx = (py * size + px) * 3;
        pixels[idx] = Math.max(0, Math.min(255, r));
        pixels[idx + 1] = Math.max(0, Math.min(255, g));
        pixels[idx + 2] = Math.max(0, Math.min(255, b));
      }
    }

    const png = encodePNG(pixels, size, size);
    const shader = compileToShader(treeR, treeG, treeB);

    return {
      png,
      shader,
      mathR: toMathString(treeR),
      mathG: toMathString(treeG),
      mathB: toMathString(treeB),
      treeR,
      treeG,
      treeB
    };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
