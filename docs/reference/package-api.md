# Package API

> Quick reference for what's exported from each package.

---

## 📦 @repo/ui

### Components

```tsx
import { 
  Button, 
  Input, 
  Slider, 
  Switch, 
  Select,
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  ColorPalette,
  Sidebar,
  Label
} from "@repo/ui";
```

### Utils

```tsx
import { cn } from "@repo/ui";
```

### Variants

```tsx
import { buttonVariants, inputVariants, sliderVariants } from "@repo/ui";
```

---

## 🎨 @repo/mosaic-maker

### Main

```tsx
import { MosaicMaker } from "@repo/mosaic-maker";
```

### Store

```tsx
import { 
  useMosaicStore,
  updatePalette,
  updateTileSet,
  updateTiles,
  updateCurrentPalettes,
  initPalettes
} from "@repo/mosaic-maker";
```

### Config

```tsx
import { 
  initialPalette, 
  initialTileSet,
  MAX_NUMBER_OF_PALETTES 
} from "@repo/mosaic-maker";
```

---

## 📊 @repo/sequence-renderer

### Main

```tsx
import { SequenceRenderer } from "@repo/sequence-renderer";
```

### Store

```tsx
import { 
  useSequenceStore,
  setSequenceRule,
  setSteps,
  setVisualizationId
} from "@repo/sequence-renderer";
```

### Core

```tsx
import { recamanRule } from "@repo/sequence-renderer";
```

---

## 🖌️ @repo/palette-generator

### Main

```tsx
import { PaletteGenerator } from "@repo/palette-generator";
```

---

## ✨ @repo/image-to-particles

### Main

```tsx
import { ImageToParticles } from "@repo/image-to-particles";
```

---

## 🎛️ @repo/tailwind-config

Used automatically in `@repo/ui` — import design tokens in Tailwind:

```css
/* In your CSS */
@plugin "@repo/tailwind-config";
```

> Note: You rarely import this directly—the tokens are re-exported through `@repo/ui`.

---

## 📚 Learn More

| Topic | Where |
|-------|-------|
| Component API | [reference/component-api](./component-api.md) |
| Design tokens | [reference/design-tokens](./design-tokens.md) |
| Mojosaic Engine | [explanation/mosaic-engine](./mosaic-engine.md) |