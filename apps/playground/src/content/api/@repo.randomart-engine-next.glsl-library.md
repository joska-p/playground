---
title: glsl-library
package: "@repo/randomart-engine-next"
kind: module
module: glsl-library
---

## Type Aliases

### GlslFunction

> **GlslFunction** = `object`

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L15)

A self-contained GLSL helper function, optionally depending on other entries.

#### Properties

##### dependencies?

> `optional` **dependencies?**: `string`[]

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L18)

##### glsl

> **glsl**: `string`

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:17](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L17)

##### id

> **id**: `string`

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L16)

***

### GlslFunctionsIds

> **GlslFunctionsIds** = *typeof* [`glslFunctions`](#glslfunctions)\[`number`\]\[`"id"`\]

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:114](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L114)

Union of the ids of every built-in GLSL helper function.

## Variables

### GLSL\_PI

> `const` **GLSL\_PI**: `"3.141592653589793"` = `'3.141592653589793'`

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L12)

GLSL literal string for π, used across operator GLSL output.

***

### glslFunctionById

> `const` **glslFunctionById**: `Map`\<`string`, [`GlslFunction`](#glslfunction)\>

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:117](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L117)

Lookup map from helper id to its [GlslFunction](#glslfunction) definition.

***

### glslFunctions

> `const` **glslFunctions**: \[\{ `glsl`: "float random2d(vec2 co) \{\n  float dot\_ = dot(co, vec2(12.9898, 78.233));\n  return fract(sin(dot\_) \* 43758.5453);\n\}"; `id`: `"random2d"`; \}, \{ `glsl`: "float hash1(float n) \{\n  return fract(sin(n \* 127.1) \* 43758.5453);\n\}"; `id`: `"hash1"`; \}, \{ `dependencies`: \[`"hash1"`\]; `glsl`: "float smoothNoise(float t) \{\n  float i = floor(t);\n  float f = fract(t);\n  float u = f \* f \* f \* (f \* (f \* 6.0 - 15.0) + 10.0);\n  return mix(hash1(i), hash1(i + 1.0), u);\n\}"; `id`: `"smoothNoise"`; \}, \{ `dependencies`: \[`"smoothNoise"`\]; `glsl`: "// 2D version\nvec2 smoothNoise2(vec2 p) \{\n  return vec2(smoothNoise(p.x), smoothNoise(p.y));\n\}\n\n// 1D (float) version\nvec2 smoothNoise2(float t) \{\n  return vec2(smoothNoise(t), smoothNoise(t + 31.71));\n\}"; `id`: `"smoothNoise2"`; \}, \{ `glsl`: "float pseudoRecaman(vec2 coords) \{\n  float d = length(coords);\n\n  // Scale the distance to create concentric wave frequencies\n  float continuousStep = d \* 10.0;\n  float lowStep = floor(continuousStep);\n  float stepFract = fract(continuousStep);\n\n  // Instead of a random walk loop, we simulate expanding intervals\n  // using alternating analytical functions\n  float val = lowStep \* (lowStep + 1.0) \* 0.5; // Sum of steps (max expansion)\n  float nextVal = (lowStep + 1.0) \* (lowStep + 2.0) \* 0.5;\n\n  // Modulate with a sine wave based on the step to create an alternating \"in-out\" pulse\n  val += sin(lowStep \* 1.618) \* lowStep;\n  nextVal += sin((lowStep + 1.0) \* 1.618) \* (lowStep + 1.0);\n\n  // Smoothly blend between the rings to prevent harsh aliasing artifacts\n  float finalVal = mix(val, nextVal, smoothstep(0.0, 1.0, stepFract));\n\n  // Map tightly back to a \[0, 1\] range for the randomart grammar pipeline\n  return fract(finalVal \* 0.05);\n\}"; `id`: `"pseudoRecaman"`; \}, \{ `dependencies`: \[`"random2d"`\]; `glsl`: "float fbmNoise(vec2 p) \{\n  float value = 0.0;\n  float amplitude = 0.5;\n  for (int i = 0; i \< 5; i++) \{\n    value += amplitude \* random2d(p);\n    p \*= 2.0;\n    amplitude \*= 0.5;\n  \}\n  return value \* 2.0 - 1.0;\n\}"; `id`: `"fbmNoise"`; \}\]

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:104](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L104)

The built-in GLSL helper library (noise, hashing, pseudo-Recaman).

## Functions

### resolveGlslDeps()

> **resolveGlslDeps**(`requiredIds`): `string`

Defined in: [packages/randomart-engine-next/src/glsl-library.ts:125](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/glsl-library.ts#L125)

Given a list of required GLSL function IDs, returns the concatenated GLSL source with
dependencies resolved in topological order.

Throws on dependency cycles.

#### Parameters

##### requiredIds

`string`[]

#### Returns

`string`
