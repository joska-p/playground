# randomart

Generate visual and symbolic representations of a text seed using the random-art
hash-visualization scheme described by Perrig & Song in
[_Hash Visualization: A New Technique to Improve Real-World Security_](https://users.ece.cmu.edu/~adrian/projects/validation/validation.pdf).

A text seed is expanded into a deterministic pseudo-random stream, which is used
to grow a random expression tree from a small context-free grammar. That tree is
a pure function `f(x, y) -> [-1, 1]` evaluated per pixel to paint an image — and
the exact same tree is also rendered as a GLSL shader, a math formula, a
structured tree view, and a raw byte array.

- **Zero runtime dependencies.** PNG encoding uses Node's built-in `zlib`.
- **Deterministic.** The same seed + rule always produces identical output.
- **Extensible.** A grammar-rules registry is the core, pluggable feature.

## Install

```bash
pnpm install
```

## API

The main entry point is `generate`:

```ts
import { generate } from "randomart";
import { writeFile } from "node:fs/promises";

const result = await generate("hello world", {
  ruleId: "classic",                       // optional, defaults to "classic"
  size: 256,                               // optional, defaults to 256
  colorPalette: ["#0a0a0a", "#38bdf8", "#f8fafc"], // optional, defaults to grayscale
});

if ("error" in result) {
  console.error(result.error);
} else {
  await writeFile("art.png", result.png); // Buffer
  console.log(result.math);   // "mix(sin(π·...), ...)"
  console.log(result.shader); // valid GLSL fragment shader
  console.log(result.tree);   // nested { label, type, children } object
  console.log(result.node);   // serializable expression node
}
```

### `generate(textSeed, options?)`

Returns `Promise<GenerateResult | GenerateError>`.

| Option         | Type       | Default       | Description                                   |
| -------------- | ---------- | ------------- | --------------------------------------------- |
| `ruleId`       | `string`   | `"classic"`   | Grammar rule to use (see registry below).     |
| `size`         | `number`   | `256`         | Square output size in pixels (1–4096).        |
| `colorPalette` | `string[]` | grayscale     | Hex colors interpolated across the value range.|

`GenerateResult` contains:

| Field    | Type       | Description                                     |
| -------- | ---------- | ----------------------------------------------- |
| `png`    | `Buffer`   | Encoded PNG image.                              |
| `shader` | `string`   | GLSL fragment shader reproducing the image.     |
| `math`   | `string`   | Human-readable mathematical expression.         |
| `tree`   | `TreeView` | Nested structure describing the expression.     |
| `node`   | `ExprNode` | Serializable expression node for further use.   |

Invalid input (empty seed, unknown `ruleId`, bad `size`, malformed hex color) is
returned as a structured `{ error: string }` object rather than thrown.

### Working with rules directly

```ts
import { listRules, getRule } from "randomart";

listRules().forEach((r) => console.log(r.id, "-", r.displayName));

const rule = getRule("trig")!;
rule.toCPU("seed");        // Uint8Array  (raw byte representation)
rule.toGPU("seed");        // string      (GLSL snippet)
rule.toMathString("seed"); // string      (math expression)
rule.toTreeView("seed");   // TreeView     (structured tree)
rule.buildNode("seed");    // ExprNode     (node for further processing)
```

## CLI

Run via the `randomart` script (backed by `tsx`):

```bash
tsx randomart <textseed> <outputfile> [options]
```

Or through the package script:

```bash
pnpm randomart "hello world" out.png
```

**Options**

| Flag                   | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `--rule <id>`          | Grammar rule id (default `classic`).                 |
| `--size <number>`      | Square output size in pixels (default `256`).        |
| `--colors <h1,h2,...>` | Comma-separated hex colors (default grayscale).      |
| `-h`, `--help`         | Show usage and the list of available rules.          |

**Examples**

```bash
# Default 256x256 grayscale
pnpm randomart "hello world" out.png

# Trigonometric rule, 512px, custom palette
pnpm randomart "hello world" out.png --rule trig --size 512 --colors "#0a0a0a,#38bdf8,#f8fafc"
```

On invalid input the CLI prints the error plus a usage message and exits with a
non-zero status code.

## Grammar rules

The **grammar-rules registry** is the core feature. Each rule is a self-contained
recipe implementing the `GrammarRule` interface:

```ts
interface GrammarRule {
  readonly id: string;
  readonly displayName: string;
  toCPU(textSeed: string): Uint8Array;
  toGPU(textSeed: string): string;
  toMathString(textSeed: string): string;
  toTreeView(textSeed: string): object;
  buildNode(textSeed: string): object;
}
```

Rules differ only in their **grammar spec** — which operators are available and
how the tree grows — producing visually distinct families of art from the same
engine:

| Id        | Name                    | Character                                  |
| --------- | ----------------------- | ------------------------------------------ |
| `classic` | Classic Random Art      | Balanced mix of trig, products, and wells. |
| `trig`    | Trigonometric Waves     | Smooth interference / wave patterns.       |
| `blocky`  | Blocky Modular          | Hard edges via modulo and absolute value.  |
| `smooth`  | Smooth Wells            | Soft blends of well and mix primitives.    |

### How generation works

1. The seed's UTF-8 bytes are folded (FNV-1a) into a 32-bit state.
2. A `mulberry32` generator expands that state into a deterministic stream.
3. `grow()` recursively selects grammar productions from the stream, respecting
   the rule's `minDepth` / `maxDepth` bounds, to build an `ExprNode` tree.
4. The tree is evaluated per pixel (CPU) and rendered symbolically (GPU / math /
   tree / bytes).

### Extending the registry

To add a new rule, register another `GrammarSpec` in `src/rules.ts`:

```ts
createRule("swirl", "Swirl", {
  operators: [
    { type: "sin", arity: 1 },
    { type: "product", arity: 2 },
    { type: "mix", arity: 3 },
  ],
  terminalBias: 0.28, // chance of stopping at a leaf once past minDepth
  minDepth: 4,        // guarantees a non-trivial tree
  maxDepth: 11,       // caps overall complexity
});
```

Available operator productions: `sum`, `product`, `mod`, `sin`, `cos`, `abs`,
`well`, `tent`, `mix`. Terminals (`x`, `y`, and random `const` values) are added
automatically. If you need a brand-new operator, add its evaluation, GLSL, math,
tree, and byte forms in `src/expression.ts` and reference it from a spec.

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `pnpm lint`       | Run ESLint.                       |
| `pnpm typecheck`  | Type-check with TypeScript.       |
| `pnpm build`      | Emit compiled JS + types to `dist`. |
| `pnpm randomart`  | Run the CLI.                      |

## License

MIT
