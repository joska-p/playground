---
title: compile/glslLibrary
package: "@repo/randomart-engine"
kind: module
module: compile/glslLibrary
---

## Type Aliases

### GlslFunction

> **GlslFunction** = `object`

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:2](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L2)

A reusable GLSL function: its source plus the ids of any other library functions it depends on.

#### Properties

##### dependencies?

> `optional` **dependencies?**: `string`[]

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L5)

##### glsl

> **glsl**: `string`

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L4)

##### id

> **id**: `string`

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L3)

***

### GlslFunctionsIds

> **GlslFunctionsIds** = *typeof* [`glslFunctions`](#glslfunctions)\[`number`\]\[`"id"`\]

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:98](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L98)

Union of the ids of every function in [glslFunctions](#glslfunctions).

## Variables

### functionById

> `const` **functionById**: `Map`\<`string`, [`GlslFunction`](#glslfunction)\>

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:101](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L101)

The GLSL library keyed by function id.

***

### glslFunctions

> `const` **glslFunctions**: \[\{ `glsl`: "float random2d(vec2 co) \{\n  float dot\_ = dot(co, vec2(12.9898, 78.233));\n  return fract(sin(dot\_) \* 43758.5453);\n\}"; `id`: `"random2d"`; \}, \{ `glsl`: "float hash1(float n) \{\n  return fract(sin(n \* 127.1) \* 43758.5453);\n\}"; `id`: `"hash1"`; \}, \{ `dependencies`: \[`"hash1"`\]; `glsl`: "float smoothNoise(float t) \{\n  float i = floor(t);\n  float f = fract(t);\n  float u = f \* f \* f \* (f \* (f \* 6.0 - 15.0) + 10.0);\n  return mix(hash1(i), hash1(i + 1.0), u);\n\}"; `id`: `"smoothNoise"`; \}, \{ `dependencies`: \[`"smoothNoise"`\]; `glsl`: "vec2 smoothNoise2(float t) \{\n  return vec2(smoothNoise(t), smoothNoise(t + 31.71));\n\}"; `id`: `"smoothNoise2"`; \}, \{ `glsl`: "float pseudoRecaman(vec2 coords) \{\n  float d = length(coords);\n  float continuousStep = clamp(d \* 15.0, 1.0, 15.0);\n  int lowStep = int(floor(continuousStep));\n  float stepFract = fract(continuousStep);\n\n  float val = 0.0;\n  float nextVal = 0.0;\n\n  for(int i = 1; i \< 16; i++) \{\n    if (i \<= lowStep + 1) \{\n      float flip = fract(sin(val \* 12.9898) \* 43758.5453);\n      float nextFlipped = (flip \> 0.5 && (val - float(i)) \> 0.0) ? (val - float(i)) : (val + float(i));\n\n      if (i \<= lowStep) \{\n        val = nextFlipped;\n      \}\n      if (i == lowStep + 1) \{\n        nextVal = nextFlipped;\n      \}\n    \}\n  \}\n\n  float finalVal = mix(val, nextVal, stepFract);\n  return fract(finalVal \* 0.2);\n\}"; `id`: `"pseudoRecaman"`; \}, \{ `dependencies`: \[`"random2d"`\]; `glsl`: "float fbmNoise(vec2 p) \{\n  float value = 0.0;\n  float amplitude = 0.5;\n  for (int i = 0; i \< 5; i++) \{\n    value += amplitude \* random2d(p);\n    p \*= 2.0;\n    amplitude \*= 0.5;\n  \}\n  return value \* 2.0 - 1.0;\n\}"; `id`: `"fbmNoise"`; \}\]

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:88](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L88)

The library of reusable GLSL functions (hashing, smooth noise, fbm).

## Functions

### resolveGlslDeps()

> **resolveGlslDeps**(`requiredIds`): `string`

Defined in: [packages/randomart-engine/src/compile/glslLibrary.ts:108](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/compile/glslLibrary.ts#L108)

Returns the concatenated source of the requested functions and all of their transitive
dependencies, topologically ordered (dependencies first). Throws when a dependency cycle is
detected.

#### Parameters

##### requiredIds

`string`[]

#### Returns

`string`
