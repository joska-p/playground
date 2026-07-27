# Curried Functional Coordinate Transforms

Replace the `SpaceMapper` class in `@repo/graphics/math/SpaceMapper` with pure, curried factory functions in a new `@repo/graphics/math/transforms` module.

## Motivation

The current `SpaceMapper` is a stateful class holding `cssWidth`, `cssHeight`, and `dpr`. It is not used in production yet, so we can refactor without backward compatibility. The goal is a pure functional API where every transform is a factory function that takes configuration first and returns a single-argument `Point2D → Point2D` function.

## Types

All types live in `src/math/transforms.ts`. All functions accept and return `Point2D` (`{ x: number; y: number }`), which is structurally compatible with both plain objects and `Vector2` class instances.

```ts
export type Point2D = { x: number; y: number };

export type CanvasElementBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type DataDomainBounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type AspectFitMode = 'contain' | 'cover' | 'fill' | 'none';

export type ShaderUniformValues = {
  uniformResolution: [number, number];
  uniformAspectRatio: number;
  uniformMouse: [number, number];
};

export type GridCellCoordinates = {
  column: number;
  row: number;
  index: number;
};
```

## Curried Factory Functions

Every factory follows: `(configParams...) => (vector: Point2D): Point2D => { ... }`

### Atomic Transforms

| Function                   | Origin                   | Target                   | Config Params                                                                                                                          | Notes                                                                    |
| -------------------------- | ------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `createScreenToCanvas`     | Screen/Window CSS pixels | Local Canvas CSS pixels  | `canvasElementBounds: CanvasElementBounds`                                                                                             | Translates screen point by canvas top/left                               |
| `createCanvasToNormalized` | Local Canvas CSS         | [0.0, 1.0] normalized    | `canvasWidth: number, canvasHeight: number`                                                                                            | Scales pixel coordinates to percentage                                   |
| `createNormalizedToWebGL`  | [0.0, 1.0] normalized    | WebGL [-1.0, 1.0]        | _(none)_                                                                                                                               | Inverts Y-axis: $(0,0) \rightarrow (-1, 1)$, $(1,1) \rightarrow (1, -1)$ |
| `createCanvasToBuffer`     | Local Canvas CSS         | High-DPI GPU framebuffer | `devicePixelRatio: number`                                                                                                             | Linear scale: $\text{Point} \times \text{DPR}$                           |
| `createBufferToCanvas`     | High-DPI GPU framebuffer | Local Canvas CSS         | `devicePixelRatio: number`                                                                                                             | Linear scale: $\text{Point} / \text{DPR}$                                |
| `createDataToCanvas`       | Mathematical domain      | Local Canvas CSS         | `dataDomainBounds: DataDomainBounds, canvasWidth: number, canvasHeight: number, aspectFitMode: AspectFitMode, paddingFraction: number` | Scales & centers domain into canvas space                                |
| `createCanvasToData`       | Local Canvas CSS         | Mathematical domain      | `dataDomainBounds: DataDomainBounds, canvasWidth: number, canvasHeight: number, aspectFitMode: AspectFitMode, paddingFraction: number` | Inverts canvas pixels back to domain value                               |

### Composite Helpers

Composed by chaining atomic transforms inside the outer function:

| Function               | Origin                   | Target                   | Config Params                                                        |
| ---------------------- | ------------------------ | ------------------------ | -------------------------------------------------------------------- |
| `createScreenToBuffer` | Screen CSS pixels        | High-DPI GPU framebuffer | `canvasElementBounds: CanvasElementBounds, devicePixelRatio: number` |
| `createBufferToScreen` | High-DPI GPU framebuffer | Screen CSS pixels        | `canvasElementBounds: CanvasElementBounds, devicePixelRatio: number` |

### Non-Transform Utilities

| Function                     | Signature                                                                                                              | Notes                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `createShaderUniformBuilder` | `(cssWidth: number, cssHeight: number, devicePixelRatio: number) => (mouseBufferPixel?: Point2D): ShaderUniformValues` | Generates uniform dictionary                       |
| `createWorldToGrid`          | `(gridColumns: number, gridRows: number) => (vector: Point2D): GridCellCoordinates`                                    | Maps continuous position to discrete grid cell     |
| `gridToWorld`                | `(cellCoordinates: { column: number; row: number }): Point2D`                                                          | Returns cell center point `(col + 0.5, row + 0.5)` |
| `generateGLSLFragment`       | `(options?: { inputSpace?: 'canvas'                                                                                    | 'normalized'                                       | 'webgl'; flipVertically?: boolean; correctAspectRatio?: boolean }): string` | Generates GLSL string preamble |

## File Structure

### New

- `src/math/transforms.ts` — all types + all curried factories + composite helpers + utilities
- `src/math/transforms.test.ts` — full test suite

### Deleted

- `src/math/SpaceMapper.ts`
- `src/math/SpaceMapper.test.ts`

### Updated

- `package.json` — change export `"./math/SpaceMapper"` → `"./math/transforms"`
- `src/react/useShaderPass.ts` — update import from `SpaceMapper` to `transforms`
- `src/webgl/QuadPipeline.ts` — update import from `SpaceMapper` to `transforms`
- `src/webgl/QuadPipeline.test.ts` — update import from `SpaceMapper` to `transforms`
- `apps/storybook/src/stories/graphics/SpaceMapper.stories.tsx` — update import
- `apps/storybook/src/stories/graphics/QuadPipeline.stories.tsx` — update import

## Test Plan

Each factory gets two types of tests:

1. **Configuration test** — verify the factory returns a function when called with config
2. **Execution test** — verify the returned function transforms a `Point2D` correctly

Specific test groups:

- `createScreenToCanvas` — translates point relative to canvas bounds
- `createCanvasToNormalized` — maps (0,0)→(0,0), (width,height)→(1,1), center→(0.5,0.5)
- `createNormalizedToWebGL` — maps top-left (0,0)→(-1,1), bottom-right (1,1)→(1,-1), center (0.5,0.5)→(0,0)
- `createCanvasToBuffer / createBufferToCanvas` — scales by DPR, round-trips for DPR 1, 1.5, 2
- `createDataToCanvas / createCanvasToData` — round-trips under contain/cover/fill with and without padding
- `createWorldToGrid / gridToWorld` — round-trips, clamping, grid cell center calculation
- `createScreenToBuffer` — end-to-end composition from screen to buffer
- `createShaderUniformBuilder` — resolution, aspect ratio, mouse defaults
- `generateGLSLFragment` — valid GLSL output for each input space option

All tests pass in Vitest with zero deprecation warnings and zero implicit `any` types.
