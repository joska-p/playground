---
title: react/useGpuSurface (internal)
package: "@repo/glaze"
kind: internal
module: react/useGpuSurface
---

## Interfaces

### RefObject

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:154

Created by [createRef](#), or [useRef](#) when passed `null`.

#### Example

```tsx
const ref = createRef<HTMLDivElement>();

ref.current = document.createElement('div'); // Error
```

#### Type Parameters

##### T

`T`

The type of the ref's value.

#### Properties

##### current

> **current**: `T`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:158

The current value of the ref.
