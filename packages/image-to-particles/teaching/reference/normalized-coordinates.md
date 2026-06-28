# Normalized Coordinates (0–1 space)

## Why

Design in unitless proportions; map to pixels at render time. One sketch works at any resolution without distortion.

## Core helpers

```javascript
// Position
function nx(v) {
  return v * width;
} // 0.5 → center x
function ny(v) {
  return v * height;
} // 0.5 → center y

// Size — use min(w,h) so circles stay round
function nd(v) {
  return v * min(width, height);
}
```

## Three strategies

| Strategy                | How                                        | Best for                      |
| ----------------------- | ------------------------------------------ | ----------------------------- |
| **Manual multiply**     | `circle(width*0.5, height*0.5, width*0.2)` | Clarity; readable code        |
| **`scale()` transform** | `scale(width / 100)` then draw in 0–100    | Concise; natural coords       |
| **Helper functions**    | `nx(0.5)`, `ny(0.5)`, `nd(0.2)`            | Complex sketches; reusability |

## Rules of thumb

- **Position** → multiply by the corresponding axis (`width` for x, `height` for y)
- **Size / radius** → multiply by `min(width, height)` to avoid stretching
- **Aspect-ratio-aware** = multiply by `min(w,h)`; **fill-space** = use axis-specific values

## Common pattern: `map()` as normalization

```javascript
// p5's map() maps one range to another
// Equivalent: brightness maps to vertical position
let y = map(brightness, 0, 255, 0, height);
```

## Pitfalls

- Using `width` for both x-position and size on non-square canvases stretches shapes horizontally
- `scale()` affects strokeWeight — use `strokeWeight(1 / scale)` to compensate or avoid `scale()` for pixel-precise work
- Normalization is trivially simple but changes how you _think_ about coordinates — worth the shift
