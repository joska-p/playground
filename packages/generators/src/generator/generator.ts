import { Rule } from "../rules/rules.js";

function* signalGenerator(rule: Rule): Generator<number> {}

export { signalGenerator };
