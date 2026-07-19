import { compileToShader } from './compileToGLSL.js';
import { toMathString } from './format.js';
import type { RuleId } from './grammar/rules/registry.js';
import { DEFAULT_RULE_ID, getRule } from './grammar/rules/registry.js';
import { encodePNG } from './png.js';
import type { Node } from './tree.js';
import { buildChannelTrees, evaluate } from './tree.js';

export type GenerateOptions = {
  ruleId?: RuleId;
  enabledRuleIds?: RuleId[];
  size?: number;
};

export type GenerateResult = {
  png: Buffer;
  shader: string;
  mathR: string;
  mathG: string;
  mathB: string;
  treeR: Node;
  treeG: Node;
  treeB: Node;
};

export type GenerateError = {
  error: string;
};

const DEFAULT_SIZE = 256;
const MAX_SIZE = 4096;

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
