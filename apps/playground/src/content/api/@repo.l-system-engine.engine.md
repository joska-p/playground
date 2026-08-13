---
title: engine
package: "@repo/l-system-engine"
kind: module
module: engine
---

## Modules

- [\<internal\>](@repo.l-system-engine.engine.<internal>.md)

## Type Aliases

### ContextSensitiveOptions

> **ContextSensitiveOptions** = `object`

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L4)

Options for [contextSensitiveRule](#contextsensitiverule) — the matched name plus optional left/right context.

#### Properties

##### ignoreBrackets?

> `readonly` `optional` **ignoreBrackets?**: `boolean`

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L20)

Names of symbols to skip when scanning for context neighbors. Defaults to ['[', ']'] — the
Prusinkiewicz standard.

##### leftContext?

> `readonly` `optional` **leftContext?**: `string`

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L8)

Name of the symbol that must immediately precede the matched symbol (ignoring brackets).

##### name

> `readonly` **name**: `string`

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L6)

Name of the symbol this rule matches.

##### produce

> `readonly` **produce**: [`Word`](@repo.l-system-engine.types.md#word-1)

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L15)

The word to produce when this rule fires. For parametric context-sensitive rules, use
`parametricRule` instead.

##### rightContext?

> `readonly` `optional` **rightContext?**: `string`

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L10)

Name of the symbol that must immediately follow the matched symbol (ignoring brackets).

***

### ParametricOptions

> **ParametricOptions** = `object`

Defined in: [packages/l-system-engine/src/rules/parametric-rule.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/parametric-rule.ts#L4)

Options for [parametricRule](#parametricrule) — the matched name, an optional guard, and the production.

#### Properties

##### guard?

> `readonly` `optional` **guard?**: (`params`) => `boolean`

Defined in: [packages/l-system-engine/src/rules/parametric-rule.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/parametric-rule.ts#L11)

Optional guard predicate evaluated against the symbol's parameters. The rule only fires when
the guard returns true (or when omitted).

###### Parameters

###### params

readonly [`Parameter`](@repo.l-system-engine.types.md#parameter)[]

###### Returns

`boolean`

##### name

> `readonly` **name**: `string`

Defined in: [packages/l-system-engine/src/rules/parametric-rule.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/parametric-rule.ts#L6)

Name of the symbol this rule matches.

##### produce

> `readonly` **produce**: (`params`) => [`Word`](@repo.l-system-engine.types.md#word-1)

Defined in: [packages/l-system-engine/src/rules/parametric-rule.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/parametric-rule.ts#L13)

Produces a replacement word from the matched symbol's parameters.

###### Parameters

###### params

readonly [`Parameter`](@repo.l-system-engine.types.md#parameter)[]

###### Returns

[`Word`](@repo.l-system-engine.types.md#word-1)

***

### StochasticProduction

> **StochasticProduction** = `object`

Defined in: [packages/l-system-engine/src/rules/stochastic-rule.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/stochastic-rule.ts#L4)

One weighted production choice. Weights across a rule's productions must sum to 1.0.

#### Properties

##### produce

> `readonly` **produce**: [`Word`](@repo.l-system-engine.types.md#word-1)

Defined in: [packages/l-system-engine/src/rules/stochastic-rule.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/stochastic-rule.ts#L7)

##### weight

> `readonly` **weight**: `number`

Defined in: [packages/l-system-engine/src/rules/stochastic-rule.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/stochastic-rule.ts#L6)

Relative probability of this production being chosen.

## Functions

### contextSensitiveRule()

> **contextSensitiveRule**(`options`): [`Rule`](@repo.l-system-engine.types.md#rule)

Defined in: [packages/l-system-engine/src/rules/context-sensitive-rule.ts:64](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/context-sensitive-rule.ts#L64)

Matches a symbol by name, optionally checking left and/or right neighbors. Bracket symbols `[`
and `]` are skipped during context lookup by default (configurable via `ignoreBrackets: false`).

#### Parameters

##### options

[`ContextSensitiveOptions`](#contextsensitiveoptions)

#### Returns

[`Rule`](@repo.l-system-engine.types.md#rule)

#### Example

```ts
contextSensitiveRule({
        name: 'a',
        leftContext: 'b',
        produce: [symbol('b')]
    });
```

***

### deterministicRule()

> **deterministicRule**(`name`, `production`): [`Rule`](@repo.l-system-engine.types.md#rule)

Defined in: [packages/l-system-engine/src/rules/deterministic-rule.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/deterministic-rule.ts#L9)

Matches any symbol whose name equals `name` and always produces the same word.

#### Parameters

##### name

`string`

##### production

[`Word`](@repo.l-system-engine.types.md#word-1)

#### Returns

[`Rule`](@repo.l-system-engine.types.md#rule)

#### Example

```ts
deterministicRule('F', [symbol('F'), symbol('+'), symbol('F')]);
```

***

### expand()

> **expand**(`grammar`, `iterations`, `options?`): [`Word`](@repo.l-system-engine.types.md#word-1)

Defined in: [packages/l-system-engine/src/expand.ts:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/expand.ts#L15)

Runs the rewriting process for a given number of iterations and returns the final word. A thin
wrapper over `steps()`.

- Pure function — does not mutate the grammar.
- `seed` controls the RNG for stochastic grammars. Same seed → same result.
- `iterations = 0` returns the axiom unchanged.

#### Parameters

##### grammar

[`Grammar`](@repo.l-system-engine.types.md#grammar)

##### iterations

`number`

##### options?

[`ExpandOptions`](@repo.l-system-engine.types.md#expandoptions)

#### Returns

[`Word`](@repo.l-system-engine.types.md#word-1)

#### Example

```ts
const word = expand(grammar, 5, { seed: 42 });
```

***

### parametricRule()

> **parametricRule**(`options`): [`Rule`](@repo.l-system-engine.types.md#rule)

Defined in: [packages/l-system-engine/src/rules/parametric-rule.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/parametric-rule.ts#L32)

Matches a symbol by name and an optional guard predicate on its parameters. The production is a
function that receives the current parameters and returns a new word — enabling parameter
transformations at each step.

#### Parameters

##### options

[`ParametricOptions`](#parametricoptions)

#### Returns

[`Rule`](@repo.l-system-engine.types.md#rule)

#### Example

```ts
parametricRule({
        name: 'F',
        guard: ([length]) => length > 0.01,
        produce: ([length]) => [
            symbol('F', length * 0.5),
            symbol('+'),
            symbol('F', length * 0.5)
        ]
    });
```

***

### steps()

> **steps**(`grammar`, `options?`): [`Iterator`](@repo.l-system-engine.engine.<internal>.md#iterator)\<[`Word`](@repo.l-system-engine.types.md#word-1), [`Word`](@repo.l-system-engine.types.md#word-1)\>

Defined in: [packages/l-system-engine/src/steps.ts:47](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/steps.ts#L47)

Returns an iterator that yields one word per iteration, starting from the axiom. The first value
yielded is `grammar.axiom` (iteration 0).

Useful for animation: the UI calls `iterator.next()` on each frame.

#### Parameters

##### grammar

[`Grammar`](@repo.l-system-engine.types.md#grammar)

##### options?

[`ExpandOptions`](@repo.l-system-engine.types.md#expandoptions)

#### Returns

[`Iterator`](@repo.l-system-engine.engine.<internal>.md#iterator)\<[`Word`](@repo.l-system-engine.types.md#word-1), [`Word`](@repo.l-system-engine.types.md#word-1)\>

#### Example

```ts
const iter = steps(grammar, { seed: 42 });
    const iteration0 = iter.next().value; // axiom
    const iteration1 = iter.next().value; // after one rewrite
```

***

### stochasticRule()

> **stochasticRule**(`name`, `productions`): `StochasticRule`

Defined in: [packages/l-system-engine/src/rules/stochastic-rule.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/rules/stochastic-rule.ts#L31)

Matches any symbol whose name equals `name`. On each application, picks one of the given
productions randomly, weighted by `weight`, using `context.random`.

Weights must sum to 1.0 (±0.001 tolerance). Validation is deferred to `validate()` — this factory
does not throw.

#### Parameters

##### name

`string`

##### productions

readonly [`StochasticProduction`](#stochasticproduction)[]

#### Returns

`StochasticRule`

#### Example

```ts
stochasticRule('F', [
        { weight: 0.7, produce: [symbol('F'), symbol('F')] },
        { weight: 0.3, produce: [symbol('F')] }
    ]);
```

***

### symbol()

> **symbol**(`name`, ...`params`): [`LSymbol`](@repo.l-system-engine.types.md#lsymbol)

Defined in: [packages/l-system-engine/src/symbol.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/symbol.ts#L10)

Creates an `LSymbol` with no metadata.

#### Parameters

##### name

`string`

##### params

...`number`[]

#### Returns

[`LSymbol`](@repo.l-system-engine.types.md#lsymbol)

#### Example

```ts
symbol('F'); // { name: 'F', params: [] }
    symbol('F', 1.0); // { name: 'F', params: [1.0] }
```

***

### symbolWithMeta()

> **symbolWithMeta**(`name`, `metadata`, ...`params`): [`LSymbol`](@repo.l-system-engine.types.md#lsymbol)

Defined in: [packages/l-system-engine/src/symbol.ts:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/symbol.ts#L21)

Creates an `LSymbol` with attached metadata. Metadata is an opaque bag of plain values — the
engine never reads it.

#### Parameters

##### name

`string`

##### metadata

[`Readonly`](@repo.l-system-engine.engine.<internal>.md#readonly)\<[`Record`](@repo.l-system-engine.engine.<internal>.md#record)\<`string`, `unknown`\>\>

##### params

...`number`[]

#### Returns

[`LSymbol`](@repo.l-system-engine.types.md#lsymbol)

#### Example

```ts
symbolWithMeta('F', { shader: 'bark-thick', roughness: 0.8 }, 1.0);
```

***

### validate()

> **validate**(`grammar`): [`ValidationError`](@repo.l-system-engine.types.md#validationerror)[]

Defined in: [packages/l-system-engine/src/validate.ts:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/l-system-engine/src/validate.ts#L18)

Validates a grammar definition and returns a list of errors. An empty array means the grammar is
valid.

Checks performed:

- Stochastic rule weights sum to 1.0 (±0.001 tolerance).

#### Parameters

##### grammar

[`Grammar`](@repo.l-system-engine.types.md#grammar)

#### Returns

[`ValidationError`](@repo.l-system-engine.types.md#validationerror)[]
