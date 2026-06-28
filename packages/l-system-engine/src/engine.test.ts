import { describe, expect, it } from 'vitest';
import {
  contextSensitiveRule,
  deterministicRule,
  expand,
  parametricRule,
  steps,
  stochasticRule,
  symbol,
  symbolWithMeta,
  validate
} from './engine';
import type { Word } from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Renders a Word to a compact string like "F+F-F" for easy assertion. */
function wordToString(word: Word): string {
  return word
    .map((s) => {
      const params = s.params.length > 0 ? `(${s.params.join(',')})` : '';
      return `${s.name}${params}`;
    })
    .join('');
}

// ---------------------------------------------------------------------------
// EX-01 — Koch Curve (deterministic, no params)
// ---------------------------------------------------------------------------

describe('EX-01 — Koch Curve (deterministic)', () => {
  const grammar = {
    axiom: [symbol('F')],
    rules: [
      deterministicRule('F', [
        symbol('F'),
        symbol('+'),
        symbol('F'),
        symbol('-'),
        symbol('F'),
        symbol('-'),
        symbol('F'),
        symbol('+'),
        symbol('F')
      ])
    ]
  };

  it('iteration 0 returns the axiom', () => {
    expect(wordToString(expand(grammar, 0))).toBe('F');
  });

  it('iteration 1 → F+F-F-F+F (9 symbols)', () => {
    const word = expand(grammar, 1);
    expect(wordToString(word)).toBe('F+F-F-F+F');
    expect(word).toHaveLength(9);
  });

  it('iteration 2 → 49 symbols', () => {
    // Each F→9 symbols, 4 operators pass through: 5×9 + 4 = 49
    expect(expand(grammar, 2)).toHaveLength(49);
  });

  it('+ and - symbols pass through unchanged (no rule)', () => {
    const word = expand(grammar, 1);
    const plusCount = word.filter((s) => s.name === '+').length;
    const minusCount = word.filter((s) => s.name === '-').length;
    expect(plusCount).toBe(2);
    expect(minusCount).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// EX-02 — Binary Tree (deterministic, branching)
// ---------------------------------------------------------------------------

describe('EX-02 — Binary Tree (deterministic, branching)', () => {
  const grammar = {
    axiom: [symbol('0')],
    rules: [
      deterministicRule('1', [symbol('1'), symbol('1')]),
      deterministicRule('0', [symbol('1'), symbol('['), symbol('0'), symbol(']'), symbol('0')])
    ]
  };

  it('iteration 0 → "0"', () => {
    expect(wordToString(expand(grammar, 0))).toBe('0');
  });

  it('iteration 1 → "1[0]0"', () => {
    expect(wordToString(expand(grammar, 1))).toBe('1[0]0');
  });

  it('iteration 2 → "11[1[0]0]1[0]0"', () => {
    expect(wordToString(expand(grammar, 2))).toBe('11[1[0]0]1[0]0');
  });

  it('iteration 3 → "1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0"', () => {
    expect(wordToString(expand(grammar, 3))).toBe('1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0');
  });

  it('bracket symbols pass through unchanged', () => {
    const word = expand(grammar, 2);
    const brackets = word.filter((s) => s.name === '[' || s.name === ']');
    expect(brackets.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// EX-03 — Signal propagation (context-sensitive)
// ---------------------------------------------------------------------------

describe('EX-03 — Signal propagation (context-sensitive)', () => {
  const grammar = {
    axiom: [symbol('b'), symbol('a'), symbol('a'), symbol('a'), symbol('a'), symbol('a')],
    rules: [
      // an 'a' with a 'b' to its left becomes 'b'
      contextSensitiveRule({ name: 'a', leftContext: 'b', produce: [symbol('b')] }),
      // 'b' always stays 'b'
      deterministicRule('b', [symbol('b')])
    ]
  };

  it('iteration 0 → "baaaaa"', () => {
    expect(wordToString(expand(grammar, 0))).toBe('baaaaa');
  });

  it('iteration 1 → "bbaaaa" — signal propagates one step', () => {
    expect(wordToString(expand(grammar, 1))).toBe('bbaaaa');
  });

  it('iteration 2 → "bbbaaa"', () => {
    expect(wordToString(expand(grammar, 2))).toBe('bbbaaa');
  });

  it('iteration 5 → "bbbbbb" — fully propagated', () => {
    expect(wordToString(expand(grammar, 5))).toBe('bbbbbb');
  });

  it('propagates exactly one step per iteration', () => {
    for (let i = 0; i <= 5; i++) {
      const word = expand(grammar, i);
      const bCount = word.filter((s) => s.name === 'b').length;
      expect(bCount).toBe(i + 1);
    }
  });
});

// ---------------------------------------------------------------------------
// EX-04 — Shrinking branch (parametric)
// ---------------------------------------------------------------------------

describe('EX-04 — Shrinking branch (parametric)', () => {
  const grammar = {
    axiom: [symbol('F', 1.0)],
    rules: [
      parametricRule({
        name: 'F',
        guard: ([l]) => (l ?? 0) > 0.01,
        produce: ([l = 0]) => [symbol('F', l * 0.5), symbol('+'), symbol('F', l * 0.5)]
      }),
      parametricRule({
        name: 'F',
        guard: ([l]) => (l ?? 0) <= 0.01,
        produce: ([l = 0]) => [symbol('F', l)]
      })
    ]
  };

  it('iteration 0 → F(1)', () => {
    const word = expand(grammar, 0);
    expect(word).toHaveLength(1);
    expect(word[0]?.name).toBe('F');
    expect(word[0]?.params[0]).toBeCloseTo(1.0);
  });

  it('iteration 1 → F(0.5) + F(0.5)', () => {
    const word = expand(grammar, 1);
    expect(wordToString(word)).toBe('F(0.5)+F(0.5)');
  });

  it('iteration 2 → 4 F symbols with param 0.25', () => {
    const word = expand(grammar, 2);
    const fSymbols = word.filter((s) => s.name === 'F');
    expect(fSymbols).toHaveLength(4);
    for (const sym of fSymbols) {
      expect(sym.params[0]).toBeCloseTo(0.25);
    }
  });

  it('F symbol count doubles each iteration (1→2→4→8)', () => {
    for (let i = 0; i <= 3; i++) {
      const word = expand(grammar, i);
      const fCount = word.filter((s) => s.name === 'F').length;
      expect(fCount).toBe(2 ** i);
    }
  });

  it('guard stops expansion when length ≤ 0.01', () => {
    // After 7 iterations l ≈ 0.0078, guard fails — F stops expanding
    const word7 = expand(grammar, 7);
    const word8 = expand(grammar, 8);
    const fCount7 = word7.filter((s) => s.name === 'F').length;
    const fCount8 = word8.filter((s) => s.name === 'F').length;
    // Once all guards fail, F count stabilises
    expect(fCount8).toBe(fCount7);
  });
});

// ---------------------------------------------------------------------------
// EX-05 — Stochastic branching
// ---------------------------------------------------------------------------

describe('EX-05 — Stochastic branching', () => {
  const grammar = {
    axiom: [symbol('F')],
    rules: [
      stochasticRule('F', [
        { weight: 0.7, produce: [symbol('F'), symbol('F')] },
        { weight: 0.3, produce: [symbol('F')] }
      ])
    ]
  };

  it('determinism: same seed → identical word', () => {
    const a = expand(grammar, 5, { seed: 42 });
    const b = expand(grammar, 5, { seed: 42 });
    expect(wordToString(a)).toBe(wordToString(b));
  });

  it('variance: different seeds → different words (overwhelmingly)', () => {
    // Find two seeds that produce different words (virtually guaranteed with enough tries)
    let foundDifference = false;
    for (let s = 0; s < 50; s++) {
      const a = expand(grammar, 5, { seed: s });
      const b = expand(grammar, 5, { seed: s + 500 });
      if (wordToString(a) !== wordToString(b)) {
        foundDifference = true;
        break;
      }
    }
    expect(foundDifference).toBe(true);
  });

  it('distribution: ~70% FF / ~30% F over 1000 runs (±5%)', () => {
    let doubleCount = 0;
    const total = 1000;
    for (let seed = 0; seed < total; seed++) {
      const word = expand(grammar, 1, { seed });
      if (word.length === 2) doubleCount++;
    }
    const ratio = doubleCount / total;
    expect(ratio).toBeGreaterThan(0.65);
    expect(ratio).toBeLessThan(0.75);
  });
});

// ---------------------------------------------------------------------------
// EX-06 — Metadata passthrough
// ---------------------------------------------------------------------------

describe('EX-06 — Metadata passthrough', () => {
  const grammar = {
    axiom: [symbolWithMeta('F', { shader: 'trunk' })],
    rules: [
      deterministicRule('F', [
        symbolWithMeta('F', { shader: 'trunk' }),
        symbol('+'),
        symbolWithMeta('F', { shader: 'twig' })
      ])
    ]
  };

  it('iteration 0 — axiom has shader: trunk', () => {
    const word = expand(grammar, 0);
    expect(word[0]?.metadata?.['shader']).toBe('trunk');
  });

  it('iteration 1 — first F has trunk, second F has twig', () => {
    const word = expand(grammar, 1);
    const fSymbols = word.filter((s) => s.name === 'F');
    expect(fSymbols[0]?.metadata?.['shader']).toBe('trunk');
    expect(fSymbols[1]?.metadata?.['shader']).toBe('twig');
  });

  it('iteration 2 — 4 F symbols alternating trunk/twig', () => {
    const word = expand(grammar, 2);
    const fSymbols = word.filter((s) => s.name === 'F');
    expect(fSymbols).toHaveLength(4);
    const shaders = fSymbols.map((s) => s.metadata?.['shader']);
    expect(shaders).toEqual(['trunk', 'twig', 'trunk', 'twig']);
  });

  it('metadata is not inherited from parent (no bleed-through)', () => {
    // A plain symbol without metadata should remain metadata-less
    const grammar2 = {
      axiom: [symbolWithMeta('F', { shader: 'trunk' })],
      rules: [deterministicRule('F', [symbol('F')])] // child has no metadata
    };
    const word = expand(grammar2, 1);
    expect(word[0]?.metadata).toBeUndefined();
  });

  it('symbol with no metadata has metadata === undefined, not {}', () => {
    expect(symbol('F').metadata).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// steps() — iterator API
// ---------------------------------------------------------------------------

describe('steps() iterator', () => {
  const grammar = {
    axiom: [symbol('F')],
    rules: [deterministicRule('F', [symbol('F'), symbol('F')])]
  };

  it('first value yielded is the axiom (iteration 0)', () => {
    const iter = steps(grammar);
    expect(wordToString(iter.next().value)).toBe('F');
  });

  it('subsequent calls advance by one step each', () => {
    const iter = steps(grammar);
    iter.next(); // axiom
    expect(wordToString(iter.next().value)).toBe('FF');
    expect(wordToString(iter.next().value)).toBe('FFFF');
    expect(wordToString(iter.next().value)).toBe('FFFFFFFF');
  });

  it('expand(n) matches consuming n+1 steps from steps()', () => {
    const seed = 7;
    const iter = steps(grammar, { seed });
    for (let i = 0; i <= 4; i++) {
      const fromSteps = iter.next().value;
      const fromExpand = expand(grammar, i, { seed });
      expect(wordToString(fromSteps)).toBe(wordToString(fromExpand));
    }
  });
});

// ---------------------------------------------------------------------------
// unmatchedSymbol: 'remove'
// ---------------------------------------------------------------------------

describe('unmatchedSymbol: remove', () => {
  it('drops symbols with no matching rule', () => {
    const grammar = {
      axiom: [symbol('F'), symbol('+'), symbol('F')],
      rules: [deterministicRule('F', [symbol('F')])],
      unmatchedSymbol: 'remove' as const
    };
    const word = expand(grammar, 1);
    expect(word.every((s) => s.name === 'F')).toBe(true);
    expect(word).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Rule priority — declaration order
// ---------------------------------------------------------------------------

describe('rule priority — declaration order', () => {
  it('first matching rule wins; later rules are shadowed', () => {
    const grammar = {
      axiom: [symbol('F')],
      rules: [
        deterministicRule('F', [symbol('A')]), // declared first → wins
        deterministicRule('F', [symbol('B')])
      ]
    };
    expect(wordToString(expand(grammar, 1))).toBe('A');
  });

  it('parametric guard miss falls through to next rule', () => {
    const grammar = {
      axiom: [symbol('F', 0.005)],
      rules: [
        parametricRule({
          name: 'F',
          guard: ([l]) => (l ?? 0) > 0.01,
          produce: ([l = 0]) => [symbol('F', l * 0.5), symbol('F', l * 0.5)]
        }),
        deterministicRule('F', [symbol('X')]) // fallback
      ]
    };
    // 0.005 <= 0.01 → guard fails → deterministic fallback → X
    expect(wordToString(expand(grammar, 1))).toBe('X');
  });
});

// ---------------------------------------------------------------------------
// validate()
// ---------------------------------------------------------------------------

describe('validate()', () => {
  it('returns empty array for a valid grammar', () => {
    const grammar = {
      axiom: [symbol('F')],
      rules: [
        stochasticRule('F', [
          { weight: 0.7, produce: [symbol('F'), symbol('F')] },
          { weight: 0.3, produce: [symbol('F')] }
        ])
      ]
    };
    expect(validate(grammar)).toHaveLength(0);
  });

  it('returns an error when stochastic weights do not sum to 1', () => {
    const grammar = {
      axiom: [symbol('F')],
      rules: [
        stochasticRule('F', [
          { weight: 0.6, produce: [symbol('F'), symbol('F')] },
          { weight: 0.3, produce: [symbol('F')] }
        ])
      ]
    };
    const errors = validate(grammar);
    expect(errors).toHaveLength(1);
    expect(errors[0]?.code).toBe('STOCHASTIC_WEIGHT_SUM');
  });

  it('returns no error for deterministic grammar', () => {
    const grammar = {
      axiom: [symbol('F')],
      rules: [deterministicRule('F', [symbol('F'), symbol('F')])]
    };
    expect(validate(grammar)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Context-sensitive — bracket skipping
// ---------------------------------------------------------------------------

describe('contextSensitiveRule — bracket handling', () => {
  it('skips bracket symbols when scanning for left context', () => {
    // word: A [ ] F — context lookup for F should find A (skipping brackets)
    const grammar = {
      axiom: [symbol('A'), symbol('['), symbol(']'), symbol('F')],
      rules: [contextSensitiveRule({ name: 'F', leftContext: 'A', produce: [symbol('X')] })]
    };
    const word = expand(grammar, 1);
    // A passes through, brackets pass through, F → X
    const names = word.map((s) => s.name);
    expect(names).toContain('X');
    expect(names).not.toContain('F');
  });

  it('does NOT skip brackets when ignoreBrackets is false', () => {
    // word: A [ ] F — with ignoreBrackets:false the immediate left is ']', not 'A'
    const grammar = {
      axiom: [symbol('A'), symbol('['), symbol(']'), symbol('F')],
      rules: [
        contextSensitiveRule({
          name: 'F',
          leftContext: 'A',
          produce: [symbol('X')],
          ignoreBrackets: false
        })
      ]
    };
    const word = expand(grammar, 1);
    const names = word.map((s) => s.name);
    // F should NOT be replaced — left neighbor is ']', not 'A'
    expect(names).toContain('F');
    expect(names).not.toContain('X');
  });
});
