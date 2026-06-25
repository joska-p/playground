# Engine Specification

This document describes the data model, core abstractions, rule system, and public API of the `@repo/l-system-engine` package.

---

## Design principles

1. **The engine is grammar-agnostic.** It does not contain `if (stochastic)` branches. It only knows: _"for each symbol in the current word, find a matching rule and apply it."_
2. **Rule types are separate from the engine.** Deterministic, stochastic, context-sensitive, and parametric are implementations of a shared `Rule` interface — not modes inside the engine.
3. **The engine is pure.** `expand` is a pure function. No global state. Stochastic rules receive a seeded random function so results are reproducible.
4. **Plain data in, plain data out.** Grammars are plain objects. The result of expansion is a plain array of symbols. No classes need to be instantiated by the caller.
5. **The engine is renderer-agnostic.** It has no knowledge of shaders, colors, or drawing. Rendering hints are carried as opaque `metadata` on symbols — the engine passes them through untouched.

---

## Core data model

### `Parameter`

A named numeric value attached to a symbol.

```ts
type Parameter = number;
```

Parameters are positional, referenced by index in rules. Names are defined at the grammar level for documentation purposes only.

---

### `Symbol`

The atomic unit of an L-system word.

```ts
interface LSymbol {
  name: string; // single character or short string, e.g. "F", "X", "+"
  params: Parameter[]; // empty array for non-parametric symbols
  metadata?: Record<string, unknown>; // opaque bag — the engine never reads this
}
```

Helper: `symbol(name, ...params)` — creates an `LSymbol`.
Helper: `symbolWithMeta(name, metadata, ...params)` — creates an `LSymbol` with metadata.

**`metadata` is the bridge between the engine and the renderer.** Rules can tag symbols with rendering hints (shader id, color, roughness…) at production time. The engine carries the metadata through each iteration transparently. The renderer reads it to select the right shader or material — the actual GLSL code never touches the engine layer.

```ts
// In a parametric rule — tagging a thick branch for a specific shader
produce: ([length]) => [symbolWithMeta('F', { shader: 'bark-thick', roughness: 0.8 }, length)];

// In the UI renderer — reading the hint
const shaderKey = symbol.metadata?.shader ?? 'default';
const program = shaderPrograms[shaderKey];
```

**What metadata should NOT contain:** GLSL source strings, WebGL objects, or anything renderer-specific that would make the Word non-serializable. Only plain values (strings, numbers, booleans).

---

### `Word`

A sequence of symbols representing the current state of the grammar.

```ts
type Word = LSymbol[];
```

The axiom is a `Word`. The result of each expansion step is a `Word`.

---

### `Context`

Information available to a rule during matching and production.

```ts
interface Context {
  word: Word; // the full current word (read-only)
  index: number; // position of the current symbol in the word
  random: () => number; // seeded random function, value in [0, 1)
}
```

The engine constructs a fresh `Context` for each symbol on each iteration.

---

### `Rule` — the core interface

Every rule type implements this interface. This is the only contract the engine cares about.

```ts
interface Rule {
  /**
   * Returns true if this rule applies to the symbol at context.index.
   * The engine calls match() on each rule in order until one returns true.
   */
  match(symbol: LSymbol, context: Context): boolean;

  /**
   * Returns the replacement word for the matched symbol.
   * Only called if match() returned true.
   */
  apply(symbol: LSymbol, context: Context): Word;
}
```

---

### `Grammar`

A complete grammar definition — everything the engine needs.

```ts
interface Grammar {
  axiom: Word;
  rules: Rule[];
  /**
   * Optional identity rule behaviour: if no rule matches a symbol,
   * should it be kept as-is (default) or removed?
   */
  unmatchedSymbol?: 'keep' | 'remove';
}
```

---

## Built-in rule factories

These are plain functions that return `Rule` objects. The developer uses these to build grammars without implementing the interface manually.

---

### `deterministicRule(name, production)`

Matches any symbol with the given name. Always produces the same word.

```ts
deterministicRule('F', [symbol('F'), symbol('+'), symbol('F')]);
```

---

### `stochasticRule(name, productions)`

Matches any symbol with the given name. Picks a production randomly by weight using `context.random`.

```ts
stochasticRule('F', [
  { weight: 0.7, produce: [symbol('F'), symbol('F')] },
  { weight: 0.3, produce: [symbol('F')] }
]);
```

**Validation:** weights must sum to 1.0 (±0.001 tolerance). Throws at grammar construction time, not at expand time.

---

### `contextSensitiveRule(options)`

Matches a symbol by name, and optionally checks its left and/or right neighbor.

```ts
contextSensitiveRule({
  name: 'F',
  leftContext: 'A', // optional — symbol name that must precede F
  rightContext: 'B', // optional — symbol name that must follow F
  produce: [symbol('F'), symbol('F')]
});
```

**Note:** Context matching ignores bracket symbols `[` and `]` by default (standard L-system convention). This is configurable.

---

### `parametricRule(options)`

Matches a symbol by name and an optional guard predicate on its parameters. The production is a function that receives the current parameters and returns a new word.

```ts
parametricRule({
  name: 'F',
  guard: ([length]) => length > 0.01,
  produce: ([length]) => [symbol('F', length * 0.5), symbol('+'), symbol('F', length * 0.5)]
});
```

---

## Engine API

### `expand(grammar, iterations, options?)`

Runs the rewriting process for a given number of iterations. Returns the final word.

```ts
function expand(grammar: Grammar, iterations: number, options?: { seed?: number }): Word;
```

- `seed` controls the random number generator for stochastic grammars. Same seed → same result. Default: random seed.
- Pure function — does not mutate the grammar.

---

### `steps(grammar, options?)`

Returns an iterator that yields one word per iteration, starting from the axiom.

```ts
function steps(grammar: Grammar, options?: { seed?: number }): Iterator<Word>;
```

Useful for animation: the UI calls `iterator.next()` on each frame.

---

### `validate(grammar)`

Validates a grammar definition and returns a list of errors (empty if valid).

```ts
function validate(grammar: Grammar): ValidationError[];
```

Checks: stochastic weights sum to 1, parametric guards are functions, no duplicate deterministic rules for the same symbol, etc.

---

## Rule resolution order

When expanding a symbol, the engine tests rules **in the order they are declared in `grammar.rules`**. The first rule whose `match()` returns `true` is applied. This means:

- More specific rules (context-sensitive, parametric with guards) should be declared **before** more general ones.
- A deterministic rule for `F` declared first will shadow any other rule for `F` declared after it.

This is intentional and simple. No priority system is needed — declaration order is the priority.

---

## What the engine does NOT do

The engine is a **string rewriter**. It has no concept of:

- Angles, distances, or drawing
- Turtle state (position, heading, stack)
- Branching symbols `[` and `]` (except for context matching)
- Rendering or output format

All of that belongs to the **interpreter**, which lives outside this package.

---

## Interpreter (out of scope for this package, documented for clarity)

A turtle interpreter maps a `Word` to a sequence of drawing commands:

| Symbol | Turtle command          |
| ------ | ----------------------- |
| `F`    | Move forward, draw line |
| `f`    | Move forward, no line   |
| `+`    | Turn left by angle δ    |
| `-`    | Turn right by angle δ   |
| `[`    | Push turtle state       |
| `]`    | Pop turtle state        |

The interpreter is the UI's responsibility and can be customized freely without touching the engine.
