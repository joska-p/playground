I need to set up a dedicated, isolated visual testing environment for my RandomArt grammar rules in `./src/debug/grammar`. The production UI has too much state, so this needs to be a clean, independent dashboard.

Please execute Phase 1 of this setup by following these constraints:

### Scope for Phase 1

1. **Directory Setup**: Create a new standalone component or view inside `./src/debug/grammar` (e.g., `GrammarTestBench.tsx` or equivalent).
2. **Isolate the Imports**: Import a handful of core arithmetic grammar rules (like `add`, `multiply`, `modulo`, and `pow`) directly into this test file. Do not connect this view to any global application state, seed generators, or production canvas pipelines.
3. **Static UV Evaluation**: Implement a static layout that renders a grid of cards (one per rule). For each rule, evaluate its logic over a small canvas (e.g., 128x128) using a fixed coordinate grid:
   - Pass a horizontal gradient (X ranging from -1.0 to 1.0) into argument 0.
   - Pass a vertical gradient (Y ranging from -1.0 to 1.0) into argument 1.
4. **Visual & String Output**: Each card must show:
   - The rendered grayscale canvas reflecting the rule's `evaluate` output.
   - A text section underneath displaying the output strings from the rule's `toGLSL(['x', 'y'])` and `toMathString(['x', 'y'])` methods for a quick sanity check.
5. **No State Pollution**: Ensure this view is fully self-contained. For now, simply expose this component or set up a clean entry point so I can hook it up to a development route or a quick toggle switch in the app.

Do not add interactive features, tree depth parameters, or custom seed workflows yet. Let's get the basic grid rendering stably first.
