# First p5.js sketch — setup/draw + mouse trail

Wrote the first p5.js lesson using instance mode inside a React component (`P5Sketch` wrapper). The lesson covers `setup()`/`draw()`, the coordinate system, basic shapes, fill/stroke, and a live interactive mouse-trail sketch.

Key detail: the `p.background()` call with alpha (`background(0, 0, 95, 30)`) creates smear trails instead of a full clear — the conceptual seed of particle systems.

Teaching approach shifted from standalone HTML files to React components inside the existing Vite + pnpm monorepo setup, at the user's suggestion.
