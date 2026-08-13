---
title: grammar/operators/registry
package: "@repo/randomart-engine-next"
kind: module
module: grammar/operators/registry
---

## Modules

- [\<internal\>](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md)

## Type Aliases

### EvalContext

> **EvalContext** = `object`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:30](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L30)

The evaluation context passed to an operator's `evaluate` — pixel coord and time.

#### Properties

##### t

> **t**: `number`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L33)

##### x

> **x**: `number`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L31)

##### y

> **y**: `number`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L32)

***

### Operator

> **Operator**\<`TArgNames`\> = `object`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:40](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L40)

The contract every grammar operator implements — knows its arity, how to evaluate, and how to
render itself to GLSL and math notation.

#### Type Parameters

##### TArgNames

`TArgNames` *extends* readonly `string`[] = readonly `string`[]

#### Properties

##### argNames

> `readonly` **argNames**: `TArgNames`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:44](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L44)

##### arity

> `readonly` **arity**: `number`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:41](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L41)

##### kind

> `readonly` **kind**: [`OperatorKind`](#operatorkind-1)

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:42](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L42)

##### label

> `readonly` **label**: `string`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:43](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L43)

##### noiseDependencies?

> `readonly` `optional` **noiseDependencies?**: readonly [`GlslFunctionsIds`](@repo.randomart-engine-next.glsl-library.md#glslfunctionsids)[]

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:49](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L49)

#### Methods

##### evaluate()

> **evaluate**(`params`): `number`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:45](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L45)

###### Parameters

###### params

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

##### toGLSL()

> **toGLSL**(`params`): `string`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L46)

###### Parameters

###### params

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

##### toMathString()

> **toMathString**(`params`): `string`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L47)

###### Parameters

###### params

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

***

### OperatorGroup

> **OperatorGroup** = `object`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:97](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L97)

One category of operators (e.g. Terminals) with its members, for pickers.

#### Properties

##### label

> **label**: `string`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:98](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L98)

##### operators

> **operators**: `object`[]

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:99](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L99)

###### id

> **id**: [`OperatorId`](#operatorid)

###### label

> **label**: `string`

***

### OperatorId

> **OperatorId** = keyof *typeof* [`OPERATORS`](#operators-1)

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:81](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L81)

Union of the ids of every built-in operator.

***

### OperatorKind

> **OperatorKind** = `"terminal"` \| `"transform"` \| `"combinator"`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L27)

The category an operator falls into: leaf, unary transform, or n-ary combinator.

## Variables

### OPERATORS

> `const` **OPERATORS**: `object`

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:53](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L53)

The built-in operator registry, keyed by operator id.

#### Type Declaration

##### abs

> **abs**: `object` = `absOp`

###### abs.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### abs.arity

> `readonly` **arity**: `1` = `1`

###### abs.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### abs.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### abs.label

> `readonly` **label**: `"abs"` = `'abs'`

###### abs.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### abs.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### const

> **const**: `object` = `constOp`

###### const.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### const.arity

> `readonly` **arity**: `0` = `0`

###### const.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### const.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### const.label

> `readonly` **label**: `"const"` = `'const'`

###### const.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### const.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### cos

> **cos**: `object` = `cosOp`

###### cos.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### cos.arity

> `readonly` **arity**: `1` = `1`

###### cos.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### cos.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### cos.label

> `readonly` **label**: `"cos"` = `'cos'`

###### cos.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### cos.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### div

> **div**: `object` = `divOp`

###### div.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### div.arity

> `readonly` **arity**: `2` = `2`

###### div.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### div.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### div.label

> `readonly` **label**: `"div"` = `'div'`

###### div.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### div.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### exp

> **exp**: `object` = `expOp`

###### exp.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### exp.arity

> `readonly` **arity**: `1` = `1`

###### exp.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### exp.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### exp.label

> `readonly` **label**: `"exp"` = `'exp'`

###### exp.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### exp.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### fract

> **fract**: `object` = `fractOp`

###### fract.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### fract.arity

> `readonly` **arity**: `1` = `1`

###### fract.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### fract.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### fract.label

> `readonly` **label**: `"fract"` = `'fract'`

###### fract.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### fract.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### greater-than

> **greater-than**: `object` = `greaterThanOp`

###### greater-than.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### greater-than.arity

> `readonly` **arity**: `2` = `2`

###### greater-than.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `-1` \| `1`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`-1` \| `1`

###### greater-than.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### greater-than.label

> `readonly` **label**: `">"` = `'>'`

###### greater-than.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### greater-than.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### if

> **if**: `object` = `ifOp`

###### if.argNames

> `readonly` **argNames**: readonly \[`"cond"`, `"truthy"`, `"falsy"`\]

###### if.arity

> `readonly` **arity**: `3` = `3`

###### if.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### if.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### if.label

> `readonly` **label**: `"if"` = `'if'`

###### if.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### if.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### less-than

> **less-than**: `object` = `lessThanOp`

###### less-than.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### less-than.arity

> `readonly` **arity**: `2` = `2`

###### less-than.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `-1` \| `1`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`-1` \| `1`

###### less-than.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### less-than.label

> `readonly` **label**: `"<"` = `'<'`

###### less-than.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### less-than.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### log

> **log**: `object` = `logOp`

###### log.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### log.arity

> `readonly` **arity**: `1` = `1`

###### log.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### log.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### log.label

> `readonly` **label**: `"log"` = `'log'`

###### log.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### log.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### mix

> **mix**: `object` = `mixOp`

###### mix.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`, `"c"`, `"d"`\]

###### mix.arity

> `readonly` **arity**: `4` = `4`

###### mix.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### mix.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### mix.label

> `readonly` **label**: `"mix"` = `'mix'`

###### mix.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### mix.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### mod

> **mod**: `object` = `modOp`

###### mod.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### mod.arity

> `readonly` **arity**: `2` = `2`

###### mod.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### mod.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### mod.label

> `readonly` **label**: `"mod"` = `'mod'`

###### mod.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### mod.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### osc

> **osc**: `object` = `oscOp`

###### osc.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### osc.arity

> `readonly` **arity**: `1` = `1`

###### osc.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### osc.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### osc.label

> `readonly` **label**: `"osc/t"` = `'osc/t'`

###### osc.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### osc.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### pow

> **pow**: `object` = `powOp`

###### pow.argNames

> `readonly` **argNames**: readonly \[`"base"`, `"exp"`\]

###### pow.arity

> `readonly` **arity**: `2` = `2`

###### pow.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### pow.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### pow.label

> `readonly` **label**: `"pow"` = `'pow'`

###### pow.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### pow.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### product

> **product**: `object` = `productOp`

###### product.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### product.arity

> `readonly` **arity**: `2` = `2`

###### product.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### product.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### product.label

> `readonly` **label**: `"product"` = `'product'`

###### product.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### product.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### radial

> **radial**: `object` = `radialOp`

###### radial.argNames

> `readonly` **argNames**: readonly \[\] = `[]`

###### radial.arity

> `readonly` **arity**: `0` = `0`

###### radial.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### radial.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### radial.label

> `readonly` **label**: `"radial"` = `'radial'`

###### radial.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### radial.toMathString

> `readonly` **toMathString**: () => `string`

###### Returns

`string`

##### random

> **random**: `object` = `randomOp`

###### random.argNames

> `readonly` **argNames**: readonly \[\] = `[]`

###### random.arity

> `readonly` **arity**: `0` = `0`

###### random.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### random.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### random.label

> `readonly` **label**: `"random"` = `'random'`

###### random.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### random.toMathString

> `readonly` **toMathString**: () => `string`

###### Returns

`string`

##### shift

> **shift**: `object` = `shiftOp`

###### shift.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### shift.arity

> `readonly` **arity**: `1` = `1`

###### shift.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### shift.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### shift.label

> `readonly` **label**: `"shift/t"` = `'shift/t'`

###### shift.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### shift.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### sin

> **sin**: `object` = `sinOp`

###### sin.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### sin.arity

> `readonly` **arity**: `1` = `1`

###### sin.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### sin.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### sin.label

> `readonly` **label**: `"sin"` = `'sin'`

###### sin.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### sin.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### sqrt

> **sqrt**: `object` = `sqrtOp`

###### sqrt.argNames

> `readonly` **argNames**: readonly \[`"value"`\]

###### sqrt.arity

> `readonly` **arity**: `1` = `1`

###### sqrt.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### sqrt.kind

> `readonly` **kind**: `"transform"` = `'transform'`

###### sqrt.label

> `readonly` **label**: `"sqrt"` = `'sqrt'`

###### sqrt.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### sqrt.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### sum

> **sum**: `object` = `sumOp`

###### sum.argNames

> `readonly` **argNames**: readonly \[`"a"`, `"b"`\]

###### sum.arity

> `readonly` **arity**: `2` = `2`

###### sum.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### sum.kind

> `readonly` **kind**: `"combinator"` = `'combinator'`

###### sum.label

> `readonly` **label**: `"sum"` = `'sum'`

###### sum.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### sum.toMathString

> `readonly` **toMathString**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### Returns

`string`

##### sweep

> **sweep**: `object` = `sweepOp`

###### sweep.argNames

> `readonly` **argNames**: readonly \[\] = `[]`

###### sweep.arity

> `readonly` **arity**: `0` = `0`

###### sweep.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### sweep.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### sweep.label

> `readonly` **label**: `"sweep"` = `'sweep'`

###### sweep.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### sweep.toMathString

> `readonly` **toMathString**: () => `string`

###### Returns

`string`

##### x

> **x**: `object` = `xOp`

###### x.argNames

> `readonly` **argNames**: readonly \[\] = `[]`

###### x.arity

> `readonly` **arity**: `0` = `0`

###### x.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### x.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### x.label

> `readonly` **label**: `"x"` = `'x'`

###### x.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### x.toMathString

> `readonly` **toMathString**: () => `string`

###### Returns

`string`

##### y

> **y**: `object` = `yOp`

###### y.argNames

> `readonly` **argNames**: readonly \[\] = `[]`

###### y.arity

> `readonly` **arity**: `0` = `0`

###### y.evaluate

> `readonly` **evaluate**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `number`\>

###### ctx

[`EvalContext`](#evalcontext)

###### Returns

`number`

###### y.kind

> `readonly` **kind**: `"terminal"` = `'terminal'`

###### y.label

> `readonly` **label**: `"y"` = `'y'`

###### y.toGLSL

> `readonly` **toGLSL**: (`__namedParameters`) => `string`

###### Parameters

###### \_\_namedParameters

###### args

[`Record`](@repo.randomart-engine-next.grammar.operators.registry.<internal>.md#record)\<`TArgNames`\[`number`\], `string`\>

###### coordVar

`string`

###### Returns

`string`

###### y.toMathString

> `readonly` **toMathString**: () => `string`

###### Returns

`string`

## Functions

### getOperator()

> **getOperator**(`id`): [`Operator`](#operator)

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:84](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L84)

Look up an operator definition by id.

#### Parameters

##### id

`"shift"` \| `"sum"` \| `"product"` \| `"mod"` \| `"pow"` \| `"exp"` \| `"div"` \| `"if"` \| `"mix"` \| `"x"` \| `"y"` \| `"const"` \| `"radial"` \| `"sweep"` \| `"random"` \| `"abs"` \| `"sqrt"` \| `"log"` \| `"fract"` \| `"sin"` \| `"cos"` \| `"less-than"` \| `"greater-than"` \| `"osc"`

#### Returns

[`Operator`](#operator)

***

### getOperatorKinds()

> **getOperatorKinds**(): [`OperatorGroup`](#operatorgroup)[]

Defined in: [packages/randomart-engine-next/src/grammar/operators/registry.ts:103](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/randomart-engine-next/src/grammar/operators/registry.ts#L103)

All operators grouped by [OperatorKind](#operatorkind-1), for building pickers.

#### Returns

[`OperatorGroup`](#operatorgroup)[]
