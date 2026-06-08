current `evolve` logic is hardcoded for a 2-state cellular automaton (Dead or Alive) with specific survival/birth rules.

To build a **generalized, high-performance engine** that can handle _any_ outer-totalistic rules (like HighLife, Seeds, or Day & Night) or even multi-state cellular automata (like Brian's Brain or Generations rules), you need to decouple the simulation engine from the rule definition.

Here is a smart, scalable way to encode and run these rules efficiently in TypeScript.

---

## 1. Encoding the Rules (The "Smart" Data Structures)

Instead of writing custom code/loops for every new rule, we can represent rules using configurations. There are two primary types of multi-state/Conway-like rules:

### A. Life-Like Rules (2 States: Dead/Alive)

These are traditionally encoded using **B/S notation** (Birth / Survive). For example, Conway is `B3/S23`.

- **Smart encoding:** Use look-up arrays or bitmasks. Since a cell can only have 0 to 8 neighbors, an array of length 9 is incredibly fast.

### B. Generations Rules ($N$ States)

These rules introduce a "fading" or "aging" mechanism (e.g., Brian's Brain).

- State `0`: Dead
- State `1`: Alive
- State `2` to `N-1`: Refractory/Dying states (cells in these states cannot breed and ignore neighbors; they just advance by +1 state each turn until they die).

### The Unified Type Definition

Let's refactor your `types.ts` mindset to accept a generalized rule schema:

```typescript
export interface AdvancedRule {
  id: string;
  name: string;
  stateCount: number; // 2 for Conway, >2 for Generations
  // Lookup arrays where the index represents the number of active (state 1) neighbors
  birth: boolean[]; // Array of length 9: true if birth happens at that neighbor count
  survive: boolean[]; // Array of length 9: true if cell survives at that neighbor count
}

// Example: Conway's Game of Life (B3/S23)
const conwayRule: AdvancedRule = {
  id: 'conway',
  name: "Conway's Game of Life",
  stateCount: 2,
  birth: [false, false, false, true, false, false, false, false, false], // 3
  survive: [false, false, true, true, false, false, false, false, false], // 2, 3
};

// Example: Brian's Brain (B2/S/3) -> Birth on 2, No survival (dies immediately to state 2), 3 states total
const briansBrainRule: AdvancedRule = {
  id: 'brians-brain',
  name: "Brian's Brain",
  stateCount: 3,
  birth: [false, false, true, false, false, false, false, false, false], // 2
  survive: [false, false, false, false, false, false, false, false, false], // None
};
```

---

## 2. Running Them: The Generalized Engine

To make your engine blindingly fast while staying generic, we want to minimize branching (`if/else` statements) inside the core loop.

Here is how the engine can process _any_ rule structure using the look-up tables defined above:

```typescript
export class CellularAutomatonEngine {
  // A helper to quickly count active neighbors (State === 1)
  // Non-state-1 cells (like dying states) usually don't count as active neighbors
  private static countActiveNeighbors(
    current: Uint8Array,
    index: number,
    col: number,
    row: number,
    cols: number,
    rows: number
  ): number {
    const rowAbove = ((row - 1 + rows) % rows) * cols;
    const rowBelow = ((row + 1) % rows) * cols;
    const colLeft = (col - 1 + cols) % cols;
    const colRight = (col + 1) % cols;
    const rCurrent = row * cols;

    // Check if neighbor equals 1 (Active/Alive).
    // Converting the boolean true/false to 0/1 via implicit addition or bitwise operations.
    return (
      (current[rowAbove + colLeft] === 1 ? 1 : 0) +
      (current[rowAbove + col] === 1 ? 1 : 0) +
      (current[rowAbove + colRight] === 1 ? 1 : 0) +
      (current[row * cols + colLeft] === 1 ? 1 : 0) +
      (current[row * cols + colRight] === 1 ? 1 : 0) +
      (current[rowBelow + colLeft] === 1 ? 1 : 0) +
      (current[rowBelow + col] === 1 ? 1 : 0) +
      (current[rowBelow + colRight] === 1 ? 1 : 0)
    );
  }

  public static evolve(
    rule: AdvancedRule,
    current: Uint8Array,
    next: Uint8Array,
    cols: number,
    rows: number
  ): void {
    const maxState = rule.stateCount - 1;

    for (let index = 0; index < current.length; index++) {
      const cellState = current[index];
      const row = (index / cols) | 0;
      const col = index % cols;

      // 1. If the cell is in a fading/dying state (State > 1), it simply ages
      if (cellState > 1) {
        next[index] = cellState === maxState ? 0 : cellState + 1;
        continue;
      }

      // 2. Count neighbors only if the cell is capable of changing based on them (State 0 or 1)
      const neighbors = this.countActiveNeighbors(
        current,
        index,
        col,
        row,
        cols,
        rows
      );

      if (cellState === 1) {
        // Cell is alive: does it survive?
        // If yes, stays 1. If no, it dies or transitions to state 2 (if stateCount > 2)
        next[index] = rule.survive[neighbors] ? 1 : rule.stateCount > 2 ? 2 : 0;
      } else {
        // Cell is dead (0): does it experience birth?
        next[index] = rule.birth[neighbors] ? 1 : 0;
      }
    }
  }
}
```

---

## 3. Why this Approach is Smart & Extensible

1. **Zero-Code Rule Addition:** To add rules like _HighLife (B36/S23)_ or _Seeds (B2/S)_, you don't write a single line of logic. You just add a JSON-like configuration block.
2. **Cache-Friendly Lookups:** Checking `rule.birth[neighbors]` is a direct O(1) array index lookup. CPU branch predictors love this because it replaces heavy nested conditional branches (`neighbors >= 2 && neighbors <= 3`) with simple data array fetches.
3. **Generations Support:** By checking `if (cellState > 1)`, the engine automatically handles rules with 3, 4, or 50 states of decay seamlessly.

### Bonus Tip: Rule Parser String

If you want to be _truly_ elegant, you can write a tiny helper function that compiles standard B/S strings directly into your `AdvancedRule` objects:

```typescript
function parseNotation(
  name: string,
  notation: string,
  states = 2
): AdvancedRule {
  const birth: boolean[] = Array(9).fill(false);
  const survive: boolean[] = Array(9).fill(false);

  const [bPart, sPart] = notation.toUpperCase().split('/');

  bPart
    .replace('B', '')
    .split('')
    .forEach((n) => (birth[parseInt(n)] = true));
  sPart
    .replace('S', '')
    .split('')
    .forEach((n) => (survive[parseInt(n)] = true));

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    stateCount: states,
    birth,
    survive,
  };
}

// Usage:
const highLife = parseNotation('HighLife', 'B36/S23');
const briansBrain = parseNotation("Brian's Brain", 'B2/S', 3);
```
