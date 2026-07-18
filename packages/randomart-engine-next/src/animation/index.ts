/**
 * Animation behaviors — spatial coordinate transforms and color post-effects.
 *
 * Each behavior defines a GLSL snippet injected into the fragment shader.
 * Spatial behaviors modify the `p` coordinate variable before evaluation;
 * color behaviors modify the `color` variable after evaluation.
 *
 * Behaviors are split by type into `spatial.ts` and `color.ts`.
 */

import type { AnimationBehavior } from '../types.js';
import { colorBehaviors } from './color.js';
import { spatialBehaviors } from './spatial.js';

export const animationRegistry: readonly AnimationBehavior[] = [
  ...spatialBehaviors,
  ...colorBehaviors
];

export type AnimationBehaviorId = (typeof animationRegistry)[number]['id'];
