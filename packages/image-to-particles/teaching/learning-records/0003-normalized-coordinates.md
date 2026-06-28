# Normalized coordinates — resolution-independent design

## Summary

Normalization means working in a unitless 0–1 coordinate space instead of hardcoded pixels. Every position is a proportion of `width`/`height`; every size is a proportion of `min(width, height)`. This makes sketches automatically adapt to any canvas size without distortion.

## Key insight

The "magic" is the separation of _design intent_ from _rendering resolution_. The design lives in normalized math (`circle(0.5, 0.5, 0.2)`) and the canvas dimensions become just parameters. This makes strategies 2 (full responsive) and 3 (virtual coordinate system) from the previous session practical.

## Three strategies covered

1. **Manual multiply**: `width * 0.5`, `height * 0.5`, `min(w,h) * 0.2` — most explicit
2. **`scale()` transform**: `scale(width / 100)` then draw in 0–100 virtual units — concise but affects strokeWeight
3. **Helper functions**: `nx(0.5)`, `ny(0.5)`, `nd(0.2)` — cleanest for complex sketches

## Key nuance

Use `min(width, height)` for sizes (`nd()`), not the axis-specific dimension. Using `width` for both x-position and size on a non-square canvas stretches shapes horizontally.

## Lesson

`lessons/0002-normalized-coordinates.html` — interactive side-by-side comparison of hardcoded vs normalized at multiple resolutions.

## Reference

`reference/normalized-coordinates.md`
