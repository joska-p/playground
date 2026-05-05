# Code Review Report & Plan

## Review Summary

No high-severity issues found. 5 low-severity items identified across bugs, structure, tests, and consistency.

---

## Findings

### Bugs

#### 1. `random.ts`: Exclusive max bound (low severity)
- **File**: `random.ts`
- **Issue**: `Math.random()` returns `[0,1)`, so generated values are always `< max`. The test uses `toBeLessThanOrEqual(max)` which passes, but the function never produces `max`.
- **Impact**: If the intended range is `[min, max]`, this is incorrect.
- **Fix**: Document the exclusive upper bound or adjust to include `max` (e.g., `min + Math.random() * (max - min + Number.EPSILON)`).

#### 2. `ramp.ts`: Division by zero for `duration=0` (low severity)
- **File**: `ramp.ts`
- **Issue**: When `duration=0`, `steps = 0`, so `(end - start) / steps` is `NaN`, producing `NaN` values.
- **Impact**: Only triggers if `duration` is 0 or negative.
- **Fix**: Validate inputs or handle edge cases.

### Structure

#### 3. Unnecessary IIFE in generators (inconsistency)
- **Files**: All new generator files
- **Issue**: New generators use an IIFE pattern inconsistent with the old codebase's direct `function*` syntax.
- **Fix**: Rewrite using standard generator functions:
  ```typescript
  export function* constant(value: number): Generator<number> {
    while (true) yield value;
  }
  ```

### Tests

#### 4. `random.test.ts`: Flaky probabilistic assertion
- **File**: `random.test.ts`
- **Issue**: "Should generate different values" test uses probabilistic check (50 samples, expects >10 unique values). Could fail intermittently.
- **Fix**: Increase sample count or mock `Math.random()` for determinism.

### Consistency

#### 5. Missing sample rate comments
- **Files**: `sinusoid.ts`, `square.ts`
- **Issue**: Hardcode `sampleRate = 100` but lack the comment present in `ramp.ts` ("100 samples per second").
- **Fix**: Add comments to match.

---

## Plan

### Task 1: Fix `random.ts` exclusive max bound
- **File**: `random.ts`
- **Action**: Adjust random generation to include `max` in range or document exclusive bound
- **Verification**: Update test to use `toBeLessThan(max)` instead of `toBeLessThanOrEqual(max)`

### Task 2: Fix `ramp.ts` division by zero
- **File**: `ramp.ts`
- **Action**: Add input validation for `duration > 0` or handle `duration=0` edge case
- **Verification**: Add test for `duration=0` behavior

### Task 3: Refactor generators to use `function*` syntax
- **Files**: All new generator files using IIFE pattern
- **Action**: Replace IIFE pattern with standard `function*` syntax
- **Verification**: Ensure all tests still pass

### Task 4: Fix flaky `random.test.ts` test
- **File**: `random.test.ts`
- **Action**: Mock `Math.random()` or increase sample count for deterministic testing
- **Verification**: Run test multiple times to confirm stability

### Task 5: Add sample rate comments to `sinusoid.ts` and `square.ts`
- **Files**: `sinusoid.ts`, `square.ts`
- **Action**: Add comment "100 samples per second" next to `sampleRate = 100`
- **Verification**: Visual inspection

---

## Acceptance Criteria
- All 5 issues resolved
- All existing tests pass
- No new lint or type errors
