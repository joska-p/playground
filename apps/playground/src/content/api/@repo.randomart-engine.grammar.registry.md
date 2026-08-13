---
title: grammar/registry
package: "@repo/randomart-engine"
kind: module
module: grammar/registry
---

## Modules

- [\<internal\>](@repo.randomart-engine.grammar.registry.<internal>.md)

## Type Aliases

### RuleId

> **RuleId** = *typeof* [`allRules`](#allrules)\[`number`\]\[`"id"`\]

Defined in: [packages/randomart-engine/src/grammar/registry.ts:56](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L56)

Union of the ids of every rule in [allRules](#allrules).

## Variables

### allRules

> `const` **allRules**: readonly \[\{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `x`) => `number`; `id`: `"x"`; `name`: `"x"`; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `_x`, `y`) => `number`; `id`: `"y"`; `name`: `"y"`; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `0`; `buildNode`: (`rng`) => [`ExpressionNode`](@repo.randomart-engine.types.md#expressionnode); `category`: `"terminal"`; `evaluate`: (`_args`, `_x`, `_y`, `_t`, `node`) => `number`; `id`: `"constant"`; `name`: `"const"`; `toGLSL`: (`_args`, `node`) => `string`; `toMathString`: (`_args`, `node`) => `string`; `toTreeView`: (`_args`, `depth`, `node`) => `string`; `weight`: `0.5`; \}, \{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `x`, `y`) => `number`; `id`: `"random"`; `name`: `"prandom"`; `noiseDependencies`: \[`"random2d"`\]; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `0.3`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"sin"`; `name`: `"sin"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `1.2`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"cos"`; `name`: `"cos"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"sqrt"`; `name`: `"sqrt"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.8`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"abs"`; `name`: `"abs"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"multiply"`; `name`: `"x"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"add"`; `name`: `"+"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `1`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"modulo"`; `name`: `"mod"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.4`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"exp"`; `name`: `"exp"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.8`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"log"`; `name`: `"log"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.8`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"pow"`; `name`: `"pow"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.7`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `-1` \| `1`; `id`: `"less-than"`; `name`: `"<"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.4`; \}, \{ `arity`: `2`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `-1` \| `1`; `id`: `"greater-than"`; `name`: `">"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.4`; \}, \{ `arity`: `3`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"if"`; `name`: `"if"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.6`; \}, \{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `x`, `y`) => `number`; `id`: `"fbm"`; `name`: `"fbm"`; `noiseDependencies`: \[`"fbmNoise"`\]; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `0.8`; \}, \{ `arity`: `3`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"smoothstep"`; `name`: `"smoothstep"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.5`; \}, \{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `x`, `y`) => `number`; `id`: `"radial"`; `name`: `"radial"`; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `0.6`; \}, \{ `arity`: `0`; `buildNode`: () => `object`; `category`: `"terminal"`; `evaluate`: (`_args`, `x`, `y`) => `number`; `id`: `"sweep"`; `name`: `"Sweep"`; `toGLSL`: () => `string`; `toMathString`: () => `string`; `toTreeView`: (`_args`, `depth`) => `string`; `weight`: `0.5`; \}, \{ `arity`: `1`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"fract"`; `name`: `"fract"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.6`; \}, \{ `arity`: `3`; `buildNode`: (`_rng`, `buildChild`) => `object`; `category`: `"structural"`; `evaluate`: (`args`) => `number`; `id`: `"clamp"`; `name`: `"clamp"`; `toGLSL`: (`args`) => `string`; `toMathString`: (`args`) => `string`; `toTreeView`: (`args`, `depth`) => `string`; `weight`: `0.5`; \}\]

Defined in: [packages/randomart-engine/src/grammar/registry.ts:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L29)

Every built-in grammar rule, in registration order.

## Functions

### getAllRuleIds()

> **getAllRuleIds**(): (`"x"` \| `"y"` \| `"constant"` \| `"random"` \| `"sin"` \| `"cos"` \| `"sqrt"` \| `"abs"` \| `"multiply"` \| `"add"` \| `"modulo"` \| `"exp"` \| `"log"` \| `"pow"` \| `"less-than"` \| `"greater-than"` \| `"if"` \| `"fbm"` \| `"smoothstep"` \| `"radial"` \| `"sweep"` \| `"fract"` \| `"clamp"`)[]

Defined in: [packages/randomart-engine/src/grammar/registry.ts:71](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L71)

Returns the id of every registered rule.

#### Returns

(`"x"` \| `"y"` \| `"constant"` \| `"random"` \| `"sin"` \| `"cos"` \| `"sqrt"` \| `"abs"` \| `"multiply"` \| `"add"` \| `"modulo"` \| `"exp"` \| `"log"` \| `"pow"` \| `"less-than"` \| `"greater-than"` \| `"if"` \| `"fbm"` \| `"smoothstep"` \| `"radial"` \| `"sweep"` \| `"fract"` \| `"clamp"`)[]

***

### getAllRules()

> **getAllRules**(): [`GrammarRule`](@repo.randomart-engine.types.md#grammarrule)[]

Defined in: [packages/randomart-engine/src/grammar/registry.ts:66](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L66)

Returns all registered rules — the full grammar.

#### Returns

[`GrammarRule`](@repo.randomart-engine.types.md#grammarrule)[]

***

### getInitialWeights()

> **getInitialWeights**(): [`Record`](@repo.randomart-engine.grammar.registry.<internal>.md#record)\<`"x"` \| `"y"` \| `"constant"` \| `"random"` \| `"sin"` \| `"cos"` \| `"sqrt"` \| `"abs"` \| `"multiply"` \| `"add"` \| `"modulo"` \| `"exp"` \| `"log"` \| `"pow"` \| `"less-than"` \| `"greater-than"` \| `"if"` \| `"fbm"` \| `"smoothstep"` \| `"radial"` \| `"sweep"` \| `"fract"` \| `"clamp"`, `number`\>

Defined in: [packages/randomart-engine/src/grammar/registry.ts:76](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L76)

Returns the default weight of every rule — the baseline that `ruleWeights` overrides on top of.

#### Returns

[`Record`](@repo.randomart-engine.grammar.registry.<internal>.md#record)\<`"x"` \| `"y"` \| `"constant"` \| `"random"` \| `"sin"` \| `"cos"` \| `"sqrt"` \| `"abs"` \| `"multiply"` \| `"add"` \| `"modulo"` \| `"exp"` \| `"log"` \| `"pow"` \| `"less-than"` \| `"greater-than"` \| `"if"` \| `"fbm"` \| `"smoothstep"` \| `"radial"` \| `"sweep"` \| `"fract"` \| `"clamp"`, `number`\>

***

### getRule()

> **getRule**(`id`): [`GrammarRule`](@repo.randomart-engine.types.md#grammarrule) \| `undefined`

Defined in: [packages/randomart-engine/src/grammar/registry.ts:61](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine/src/grammar/registry.ts#L61)

Looks up a rule by id, or `undefined` when the id is unknown.

#### Parameters

##### id

`"x"` \| `"y"` \| `"constant"` \| `"random"` \| `"sin"` \| `"cos"` \| `"sqrt"` \| `"abs"` \| `"multiply"` \| `"add"` \| `"modulo"` \| `"exp"` \| `"log"` \| `"pow"` \| `"less-than"` \| `"greater-than"` \| `"if"` \| `"fbm"` \| `"smoothstep"` \| `"radial"` \| `"sweep"` \| `"fract"` \| `"clamp"`

#### Returns

[`GrammarRule`](@repo.randomart-engine.types.md#grammarrule) \| `undefined`
