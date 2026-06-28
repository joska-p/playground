import { registerRule } from '@repo/sequence-engine/rules';
import { harmonicPathRule } from './harmonicPath';

export function register(): void {
  registerRule(harmonicPathRule);
}
