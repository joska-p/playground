You are an expert TypeScript Graphics Architect completing the audit of the `cpu/` folder in `glaze`.

Your goal for this final sweep (Pass 3) is to identify lifecycle ordering risks and Single Level of Abstraction Principle (SLAP) violations.

Target Scope: `src/cpu/` (or `cpu/` directory)

Search for the following patterns:
1. Lifecycle Methods called out-of-order: Functions or rendering calls that assume an active frame, bound context, or loaded asset without demanding compile-time proof (candidates for Proof Tokens like `ActiveFrameToken` or `BoundContextToken`).
2. SLAP Violations: Functions that mix low-level operations (raw loops, bitwise math, canvas API primitives) with high-level orchestrations (scene management, entity updates).
3. Monolithic Methods: Functions doing multiple distinct tasks that need section comments to explain what they do instead of delegating to smaller, focused helper functions.

Instructions:
1. Read the existing `GLAZE_REFACTOR_INVENTORY_CPU.md` and `GLAZE_REFACTOR_INVENTORY_GPU.md` inside ./drafts/glaze/cpu-gpu/.
2. Append Section 3: "Pass 3: Lifecycle Guarantees & Abstraction Levels (SLAP)".
3. For each opportunity found, report:
   - File & Line Number
   - Current Code / Issue (e.g., method mixes raw array loop with canvas draw calls, or rendering method lacks context proof token)
   - Proposed Refactoring (e.g., introduce `ActiveFrameToken`, extract low-level loop into pure helper function)
   - Impact (e.g., prevents out-of-order execution, enforces single level of abstraction)
4. At the very end of `GLAZE_REFACTOR_INVENTORY_CPU.md` and `GLAZE_REFACTOR_INVENTORY_GPU.md`, add a "Recommended Order of Refactoring for cpu/gpu" summary list, ordering the tasks from lowest-level leaves (math/utilities) up to high-level core modules.

Do NOT refactor any code yet. Just finalize `GLAZE_REFACTOR_INVENTORY_CPU.md` and `GLAZE_REFACTOR_INVENTORY_GPU.md`.