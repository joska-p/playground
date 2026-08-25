You are an expert TypeScript Graphics Architect continuing the audit of the `cpu/` folder in `glaze`.

Your goal for this sweep (Pass 2) is to identify "dishonest" functions, hidden global state reads, and side effects that should be pushed to the edges of the application shell.

Target Scope: `src/cpu/` (or `cpu/` directory)

Search for the following patterns:
1. Core functions reading non-deterministic or global environment data (`Math.random()`, `performance.now()`, `Date.now()`, `window`, `document`).
2. Unexpected input mutations (e.g., math or helper functions mutating argument vectors/objects directly instead of returning fresh immutable data).
3. Missing parameter injections (e.g., hardcoded delta times, unseeded randomness, or unpassed canvas bounds).

Instructions:
1. Read the existing `GLAZE_REFACTOR_INVENTORY.md` at the root of the repository.
2. Append Section 2: "Pass 2: Dishonesty & Side-Effects Isolation".
3. For each opportunity found, report:
   - File & Line Number
   - Current Code / Issue (e.g., calls `Math.random()` inside update loop, mutates parameter `vec`)
   - Fix Strategy (e.g., inject explicit `seed: number` or `dt`, return new object `{ ... }`)
   - Impact (e.g., makes update function 100% deterministic and unit-testable)

Do NOT refactor any code yet. Just append Section 2 to `GLAZE_REFACTOR_INVENTORY.md`.