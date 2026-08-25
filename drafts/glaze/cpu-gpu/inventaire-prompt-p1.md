You are an expert TypeScript Graphics Architect auditing the `cpu/ and gpu/` folder of our graphics library `glaze`.

Your goal for this sweep (Pass 1) is to identify implicitly assumed mathematical invariants and runtime checks that can be enforced at compile time using Branded Types.

Target Scope: `src/cpu/ and src/gpu/` (or `cpu/ and gpu/` directory)

Search for the following patterns:
1. Bare vector types ({ x: number, y: number } or number[]) used in operations that require normalized vectors (e.g., directions, normals, reflections).
2. Runtime checks like `if (length === 0)`, `if (width <= 0)`, `if (alpha < 0)` that guard against invalid numeric inputs.
3. Ambiguous numbers used for angles (radians vs. degrees), dimensions, or normalized color channels [0, 1].
4. Missing constructor/factory validations where invalid objects can be instantiated.

Instructions:
1. Create 2 files named `GLAZE_REFACTOR_INVENTORY_CPU.md` and `GLAZE_REFACTOR_INVENTORY_GPU.md`inside ./drafts/glaze/cpu-gpu/.
2. Fill in Section 1: "Pass 1: Mathematical Invariants & Branded Types".
3. For each opportunity found, report:
   - File & Line Number
   - Current Code / Issue (e.g., accepts raw Vec2, guards with runtime if)
   - Proposed Branded Type (e.g., `NormalizedVec2`, `PositiveNumber`, `Radian`)
   - Impact (e.g., eliminates division by zero risk, removes runtime check)

Do NOT refactor any code yet. Just write the inventory file for `cpu/ and gpu/`.