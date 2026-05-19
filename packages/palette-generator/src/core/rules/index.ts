import { rule01 } from "./rule01";
import type { Rule, Palette } from "./types";

const rules = {
  rule01,
} as const satisfies Record<string, Rule>;

type RuleKey = keyof typeof rules; // "rule01" | ...

export { rules };
export type { Rule, Palette, RuleKey };
