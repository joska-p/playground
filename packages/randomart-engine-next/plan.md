Here is a summary of the architectural improvements and a step-by-step plan to implement them.

### The Goal of the Refactor

1. **Future-proofing:** Replace discrete arguments (`x, y`) with a single `EvalContext` object so you can easily add time (`t`), mouse coordinates, or resolution later without rewriting your operator files.
2. **Decoupling:** Remove hardcoded `if (node.type === 'x')` checks from your tree traversers. The traverser shouldn't know about specific operators; it should just blindly map arguments and call the registry.
3. **Generic AST:** Change the `Node` type to use a generic `args` object instead of `value?: number`. This allows you to easily add operators with static properties in the future (like a `noise` operator with a `frequency` property).
4. **Safe Serialization:** Remove manual `opcode` properties and auto-generate them from the registry order.

---

### Step-by-Step Implementation Plan

#### Step 1: Update Core Types

In your `registry.ts` and tree files, update the interfaces.

**In `registry.ts`:**

```typescript
// Define the context object
export type EvalContext = {
  x: number;
  y: number;
  t: number; // Ready for animation!
};

export type OperatorArgs = Record<string, number>;

export type Operator = {
  readonly arity: number;
  readonly kind: OperatorKind;
  readonly label: string;
  readonly argNames: readonly string[];

  // Update signatures to use objects
  evaluate(params: { args: OperatorArgs; ctx: EvalContext }): number;
  toGLSL(params: { args: Record<string, string>; coordVar: string }): string;
  toMathString(params: { args: Record<string, string> }): string;

  readonly noiseDependencies?: readonly GlslFunctionsIds[];
};
```

**In your Tree file:**

```typescript
export type Node = {
  readonly type: OperatorId;
  readonly args?: Record<string, number>; // Replaces 'value?: number'
  readonly children?: Node[];
};
```

#### Step 2: Refactor Operator Definitions

Update all your plain objects (like `xOp`, `constOp`, `sinOp`) to match the new signatures. Remove the `opcode` property entirely.

_Example (`coordinate.ts`):_

```typescript
export const xOp = {
  arity: 0,
  kind: 'terminal' as const,
  label: 'x',
  argNames: [] as const,
  evaluate: ({ ctx }) => ctx.x,
  toGLSL: ({ coordVar }) => `${coordVar}.x`,
  toMathString: () => 'x'
} satisfies Operator;
```

_Example (`values.ts` - constOp):_

```typescript
export const constOp = {
  arity: 0,
  kind: 'terminal' as const,
  label: 'const',
  argNames: [] as const,
  evaluate: ({ args }) => args.value ?? 0,
  toGLSL: ({ args }) => (args.value ?? 0).toFixed(4),
  toMathString: ({ args }) => `${args.value ?? 0}`
} satisfies Operator;
```

#### Step 3: Auto-generate Opcodes in Registry

Instead of manually typing `opcode: 14` in files, let the registry handle it.

**In `registry.ts`:**

```typescript
// ... define OPERATORS ...
// OP_TO_INDEX replaces manual opcodes
export const OP_TO_INDEX = new Map<OperatorId, number>(
  (Object.keys(OPERATORS) as OperatorId[]).map((id, i) => [id, i])
);
```

#### Step 4: Update Tree Generation (`buildTree`)

Update the tree builder so `const` nodes use the new generic `args` property.

```typescript
// Inside buildTree, replace the const return block:
if (pick.type === 'const') {
  return {
    type: 'const',
    args: { value: Number(rng.nextRange(-1, 1).toFixed(4)) }
  };
}
```

#### Step 5: Refactor AST Traversers (`evaluate`, `toGLSL`, `serializeToBytes`)

This is where the magic happens. You can now delete all the hardcoded `if` checks.

**Evaluate:**

```typescript
export function evaluate(node: Node, ctx: EvalContext): number {
  const op = getOperator(node.type);
  const args: OperatorArgs = { ...node.args }; // Spread static args (like const value)

  if (node.children) {
    op.argNames.forEach((name, i) => {
      args[name] = evaluate(node.children![i]!, ctx);
    });
  }
  return op.evaluate({ args, ctx });
}
```

**To GLSL:**

```typescript
export function toGLSL(node: Node): string {
  const op = getOperator(node.type);
  const args: Record<string, string> = {};

  // Convert static args to strings
  if (node.args) {
    for (const [k, v] of Object.entries(node.args)) {
      args[k] = v.toFixed(4);
    }
  }

  if (node.children) {
    op.argNames.forEach((name, i) => {
      args[name] = toGLSL(node.children![i]!);
    });
  }
  return op.toGLSL({ args, coordVar: 'p' });
}
```

**Serialize to Bytes:**

```typescript
import { OP_TO_INDEX } from './grammar/operators/registry.js';

export function serializeToBytes(node: Node): Uint8Array {
  const out: number[] = [];
  const walk = (n: Node): void => {
    out.push(OP_TO_INDEX.get(n.type)!);
    if (n.type === 'const') {
      const q = Math.round((clamp(n.args?.value ?? 0) + 1) * 127.5);
      out.push(Math.max(0, Math.min(255, q)));
    }
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return Uint8Array.from(out);
}
```

### Summary of Benefits

Once you apply this plan, your core traverser code (`evaluate`, `toGLSL`) becomes **completely generic**. If you want to add a new operator tomorrow—say, `rotate` which takes an `angle` arg and a child node—you won't have to touch `evaluate` or `toGLSL` at all. You just define the `rotateOp` object, add it to the registry, and the AST traverser will automatically handle wiring the arguments and children together.
