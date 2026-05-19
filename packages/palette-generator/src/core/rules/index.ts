import { analogous } from "./analogous";
import { complementary } from "./complementary";
import { monochromatic } from "./monochromatic";
import { triadic } from "./triadic";
import type { Rule, Palette } from "./types";

const rules = {
  analogous,
  complementary,
  monochromatic,
  triadic,
} as const satisfies Record<string, Rule>;

type RuleKey = keyof typeof rules; // "analogous" | "complementary" | ...

export { rules };
export type { Rule, Palette, RuleKey };
