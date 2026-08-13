---
title: feedback (internal)
package: "@repo/ui"
kind: internal
module: feedback
---

## Interfaces

### ErrorBoundaryState

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L14)

#### Properties

##### error

> **error**: `Error` \| `null`

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L15)

***

### ToastContextValue

Defined in: [packages/ui/src/components/feedback/toast/useToast.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/useToast.ts#L4)

#### Properties

##### dismiss

> **dismiss**: (`id`) => `void`

Defined in: [packages/ui/src/components/feedback/toast/useToast.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/useToast.ts#L6)

###### Parameters

###### id

`number`

###### Returns

`void`

##### toast

> **toast**: (`options`) => `number`

Defined in: [packages/ui/src/components/feedback/toast/useToast.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/useToast.ts#L5)

###### Parameters

###### options

[`ToastOptions`](#toastoptions)

###### Returns

`number`

***

### ToastOptions

Defined in: [packages/ui/src/hooks/useToastQueue.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L5)

#### Properties

##### description?

> `optional` **description?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/hooks/useToastQueue.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L7)

##### duration?

> `optional` **duration?**: `number`

Defined in: [packages/ui/src/hooks/useToastQueue.ts:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L10)

Milliseconds before auto-dismiss. Defaults to 4000. Pass 0 to disable.

##### title

> **title**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/hooks/useToastQueue.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L6)

##### variant?

> `optional` **variant?**: [`ColorVariant`](#colorvariant)

Defined in: [packages/ui/src/hooks/useToastQueue.ts:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L8)

## Type Aliases

### ColorVariant

> **ColorVariant** = `"default"` \| `"primary"` \| `"secondary"` \| `"accent"` \| `"warning"` \| `"destructive"`

Defined in: [packages/ui/src/lib/colorVariant.ts:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/lib/colorVariant.ts#L12)

## Shared color-variant system.

Every component in this library accepts the same `variant` prop with these values: default,
primary, secondary, accent, warning, destructive, ghost, outline.

`COLOR_CLASSES` is the single source of truth mapping each variant to its canonical bg + text
Tailwind classes. CVA variant configs in individual components spread this object and add any
overrides.

***

### DialogVariants

> **DialogVariants** = [`VariantProps`](@repo.ui.data-entry.<internal>.md#variantprops)\<*typeof* [`dialogVariants`](#dialogvariants-1)\>

Defined in: [packages/ui/src/components/feedback/dialog/variants.ts:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/variants.ts#L28)

***

### Record

> **Record**\<`K`, `T`\> = `{ [P in K]: T }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1611

Construct a type with a set of properties K of type T

#### Type Parameters

##### K

`K` *extends* keyof `any`

##### T

`T`

***

### ToastItem

> **ToastItem** = `object` & [`ToastOptions`](#toastoptions)

Defined in: [packages/ui/src/hooks/useToastQueue.ts:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/hooks/useToastQueue.ts#L13)

#### Type Declaration

##### exiting?

> `optional` **exiting?**: `boolean`

##### id

> **id**: `number`

## Variables

### dialogVariants

> `const` **dialogVariants**: (`props?`) => `string`

Defined in: [packages/ui/src/components/feedback/dialog/variants.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/variants.ts#L3)

#### Parameters

##### props?

ConfigVariants\<\{ size: \{ sm: string; md: string; lg: string; xl: string; full: string; \}; \}\> & ClassProp

#### Returns

`string`
