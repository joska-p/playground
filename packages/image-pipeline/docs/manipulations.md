# Built-in Manipulations

All manipulations are defined in [`manifest.ts`](../src/core/manipulations/manifest.ts) — the single source of truth. The `Step` discriminated union is derived from this manifest, so adding a new manipulation here automatically enables autocompletion and type narrowing for step IDs and their options.

Each manipulation is declared via a type-safe factory that captures its ID as a literal and its options shape as a generic parameter:

```typescript
const brightness = definePixel("brightness", ({ red, green, blue, alpha, options }: PixelParameters<{ value?: number }>) => {
  const value = options.value ?? 1;
  return [red * value, green * value, blue * value, alpha];
});
```

Options declared as `Record<string, never>` (no 5th parameter) produce step types without an `options` field, preventing irrelevant parameters from being passed.

## Pixel Operations

Each operates independently on every pixel. Accepts `options` values via the pipeline step.

### `brightness`

Multiplies each RGB channel by `value`.

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | number | 1 | Multiplier (1 = no change, 2 = 2× brighter, 0.5 = half) |

```typescript
.add("brightness", { value: 1.5 })
```

### `contrast`

Scales each channel relative to 128 (mid-gray).

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | number | 1 | Contrast multiplier (1 = no change, 2 = 2× contrast) |

```typescript
.add("contrast", { value: 1.8 })
```

### `grayscale`

Converts to luminance using ITU-R BT.601 weights: `0.2126R + 0.7152G + 0.0722B`.

No options.

```typescript
.add("grayscale")
```

### `sepia`

Classic sepia tone matrix transformation.

No options.

```typescript
.add("sepia")
```

### `invert`

Inverts each channel: `255 - value`.

No options.

```typescript
.add("invert")
```

### `saturation`

Adjusts saturation by scaling each channel's deviation from luminance.

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | number | 1 | Saturation multiplier (0 = grayscale, 1 = original, >1 = oversaturated) |

```typescript
.add("saturation", { value: 0.5 })
```

### `hue-rotate`

Rotates hue in a YUV-like color space using a rotation matrix.

| Param | Type | Default | Description |
|---|---|---|---|
| `degrees` | number | 0 | Degrees to rotate hue (0–360) |

```typescript
.add("hue-rotate", { degrees: 180 })
```

### `opacity`

Multiplies the alpha channel.

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | number | 1 | Alpha multiplier (1 = opaque, 0 = fully transparent) |

```typescript
.add("opacity", { value: 0.5 })
```

### `threshold`

Converts to pure black/white based on luminance vs a threshold.

| Param | Type | Default | Description |
|---|---|---|---|
| `threshold` | number | 128 | Luminance threshold (0–255) |

```typescript
.add("threshold", { threshold: 100 })
```

---

## Neighborhood (Convolution) Operations (`neighborhood-manipulations.ts`)

Each reads a window of neighboring pixels using a kernel. Edge pixels are clamped (nearest pixel extended).

### `gaussian-blur`

Gaussian blur with configurable radius.

| Param | Type | Default | Description |
|---|---|---|---|
| `radius` | number | 1 | Blur radius (kernel size = `radius * 2 + 1`). Sigma = `radius / 2 + 0.5` |

```typescript
.add("gaussian-blur", { radius: 3 })
```

### `box-blur`

Uniform kernel blur (all weights equal). Faster than gaussian for large radii.

| Param | Type | Default | Description |
|---|---|---|---|
| `radius` | number | 1 | Blur radius (kernel size = `radius * 2 + 1`) |

```typescript
.add("box-blur", { radius: 2 })
```

### `sharpen

Sharpens using a Laplacian-like kernel.

| Param | Type | Default | Description |
|---|---|---|---|
| `strength` | number | 1 | Sharpening strength |

Kernel: `[0, -s, 0, -s, 1+4s, -s, 0, -s, 0]`

```typescript
.add("sharpen", { strength: 2 })
```

### `edge-detect`

Sobel edge detection. Computes gradient magnitude from Sobel X + Sobel Y kernels per channel.

No parameters.

```typescript
.add("edge-detect")
```

---

## Whole-Image Operations (`whole-image-manipulations.ts`)

Create a new ImageData with different dimensions or pixel layout.

### `histogram-equalize`

Improves contrast by spreading luminance values across the full 0–255 range. Computes a CDF-based lookup table and applies it while preserving per-pixel channel ratios.

No parameters.

```typescript
.add("histogram-equalize")
```

### `flip-horizontal`

Mirrors the image horizontally (left ↔ right).

No parameters.

```typescript
.add("flip-horizontal")
```

### `flip-vertical`

Mirrors the image vertically (top ↔ bottom).

No parameters.

```typescript
.add("flip-vertical")
```

### `rotate-90cw`

Rotates the image 90° clockwise. Width and height are swapped.

No parameters.

```typescript
.add("rotate-90cw")
```

---

## Special Step: `resize`

Resize is a **first-class built-in**, not a registered manipulation. It uses bilinear interpolation.

`options` uses `ResizeOptions` (typed union):

```typescript
// Scale to exact width, height auto-proportional
{ id: "resize", options: { width: 400 } }

// Scale to exact height, width auto-proportional
{ id: "resize", options: { height: 300 } }

// Exact dimensions with fit mode
{ id: "resize", options: { width: 400, height: 300, fit: "fill" } }      // stretch (default)
{ id: "resize", options: { width: 400, height: 300, fit: "contain" } }    // fit within bounds
{ id: "resize", options: { width: 400, height: 300, fit: "cover" } }      // fill bounds, crop

// Downscale by pixel budget (maintains aspect ratio)
{ id: "resize", options: { maximumPixels: 1_000_000 } }
```

```typescript
// Class-based API
Pipeline.from(sourceImageData, configuration).resize({ width: 800, height: 600, fit: "contain" })

// Raw step (also works with pipelineGateway.run / usePipeline)
{ id: "resize", options: { width: 800 } }
```
