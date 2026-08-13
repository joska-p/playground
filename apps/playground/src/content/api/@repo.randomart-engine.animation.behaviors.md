---
title: animation/behaviors
package: "@repo/randomart-engine"
kind: module
module: animation/behaviors
---

## Variables

### animationRegistry

> `const` **animationRegistry**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)[]

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:420](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L420)

Every built-in animation behavior, in registration order — the default catalog passed to
`compileToGLSL`.

***

### chromaticAberrationBehavior

> `const` **chromaticAberrationBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:318](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L318)

Splits the red and blue channels along the field direction.

***

### colorDriftBehavior

> `const` **colorDriftBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:204](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L204)

Drifts the color tint through smooth noise.

***

### contrastPulseBehavior

> `const` **contrastPulseBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:161](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L161)

Pulses the contrast of the color.

***

### domainWarpBehavior

> `const` **domainWarpBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:117](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L117)

Warps coordinates with layered sine-based domain warping.

***

### driftBehavior

> `const` **driftBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:73](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L73)

Translates the coordinate field steadily over time.

***

### edgeDetectBehavior

> `const` **edgeDetectBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:245](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L245)

Draws a neon outline on luminance edges.

***

### expandBehavior

> `const` **expandBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:82](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L82)

Scales coordinates outward over time.

***

### filmGrainBehavior

> `const` **filmGrainBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:350](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L350)

Adds animated film grain.

***

### goldenWanderBehavior

> `const` **goldenWanderBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:175](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L175)

Wanders the field along golden-ratio sinusoids.

***

### hueShiftBehavior

> `const` **hueShiftBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L4)

Rotates the color hue over time.

***

### inversionBehavior

> `const` **inversionBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:308](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L308)

Cross-fades the color to its inverse.

***

### kaleidoscopeBehavior

> `const` **kaleidoscopeBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:91](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L91)

Mirrors the coordinate field into a six-fold kaleidoscope.

***

### mirrorTileBehavior

> `const` **mirrorTileBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:135](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L135)

Tiles the field with mirrored repeats.

***

### mouseProximityBehavior

> `const` **mouseProximityBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:278](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L278)

Pushes coordinates away from the pointer.

***

### noiseCrawlBehavior

> `const` **noiseCrawlBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:190](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L190)

Crawls coordinates along smooth-noise offsets.

***

### pixelationBehavior

> `const` **pixelationBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:294](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L294)

Snaps coordinates to a coarse animated pixel grid.

***

### recamanPulseBehavior

> `const` **recamanPulseBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:219](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L219)

Applies a Recamán-inspired trigonometric warp.

***

### rippleBehavior

> `const` **rippleBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L32)

Adds concentric ripples to the coordinate field.

***

### rotateBehavior

> `const` **rotateBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L42)

Rotates the coordinate field around its origin.

***

### scanLinesBehavior

> `const` **scanLinesBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:366](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L366)

Overlays animated scan lines.

***

### swirlBehavior

> `const` **swirlBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:57](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L57)

Twists the coordinate field into a swirl, strongest at the center.

***

### tunnelBehavior

> `const` **tunnelBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:145](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L145)

Maps coordinates through an endless tunnel projection.

***

### vignetteBehavior

> `const` **vignetteBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:334](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L334)

Darkens the frame edges into a breathing vignette.

***

### voronoiBehavior

> `const` **voronoiBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:381](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L381)

Warps the field through a living Voronoi partition.

***

### zoomBehavior

> `const` **zoomBehavior**: [`AnimationBehavior`](@repo.randomart-engine.types.md#animationbehavior)

Defined in: [packages/randomart-engine/src/animation/behaviors.ts:23](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/animation/behaviors.ts#L23)

Scales the coordinate field, breathing in and out.
