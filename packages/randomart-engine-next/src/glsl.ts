/**
 * GLSL helper functions and dependency resolver.
 *
 * Re-exports everything from glsl-library.ts — the single source of truth
 * for reusable GLSL functions. New library functions are added in
 * glsl-library.ts and wired into the compiler in compileToGLSL.ts.
 */

export { functionById, glslFunctions, resolveGlslDeps } from './glsl-library.js';

export type { GlslFunction, GlslFunctionsIds } from './glsl-library.js';
