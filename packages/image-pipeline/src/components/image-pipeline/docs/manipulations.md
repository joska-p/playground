# Built-in Manipulations

## Pixel Operations (`pixel.ts`)

Each operates independently on every pixel. Accepts `opts` values via the pipeline step.

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

No parameters.

```typescript
.add("grayscale")
```

### `sepia`

Classic sepia tone matrix transformation.

No parameters.

```typescript
.add("sepia")
```

### `invert`

Inverts each channel: `255 - value`.

No parameters.

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

## Neighborhood (Convolution) Operations (`neighborhood.ts`)

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

## Whole-Image Operations (`whole.ts`)

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

`opts` uses `ResizeOptions` (typed union):

```typescript
// Scale to exact width, height auto-proportional
{ width: 400 }

// Scale to exact height, width auto-proportional
{ height: 300 }

// Exact dimensions with fit mode
{ width: 400, height: 300, fit: "fill" }      // stretch (default)
{ width: 400, height: 300, fit: "contain" }    // fit within bounds, maintain aspect ratio
{ width: 400, height: 300, fit: "cover" }      // fill bounds, crop excess

// Downscale by pixel budget (maintains aspect ratio)
{ maxPixels: 1_000_000 }
```

```typescript
Pipeline.from(src, deps).resize({ width: 800, height: 600, fit: "contain" })
// or as a raw step:
{ kind: "manip", id: "resize", opts: { width: 800 } }
```
