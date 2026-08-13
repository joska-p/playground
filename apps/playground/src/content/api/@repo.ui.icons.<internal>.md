---
title: icons (internal)
package: "@repo/ui"
kind: internal
module: icons
---

## Interfaces

### ComponentClass

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1136

Represents a component class in React.

#### Extends

- [`StaticLifecycle`](#staticlifecycle)\<`P`, `S`\>

#### Type Parameters

##### P

`P` = \{ \}

The props the component accepts.

##### S

`S` = [`ComponentState`](#componentstate)

The internal state of the component.

#### Constructors

##### Constructor

> **new ComponentClass**(`props`, `context?`): [`Component`](@repo.ui.data-entry.<internal>.md#component)\<`P`, `S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1138

###### Parameters

###### props

`P`

###### context?

`any`

Value of the parent [Context](https://react.dev/reference/react/Component#context) specified
in `contextType`.

###### Returns

[`Component`](@repo.ui.data-entry.<internal>.md#component)\<`P`, `S`\>

###### Inherited from

`StaticLifecycle<P, S>.constructor`

#### Properties

##### contextType?

> `optional` **contextType?**: [`Context`](@repo.ui.data-entry.<internal>.md#context-1)\<`any`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1151

##### defaultProps?

> `optional` **defaultProps?**: [`Partial`](#partial)\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1152

##### displayName?

> `optional` **displayName?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1160

Used in debugging messages. You might want to set it
explicitly if you want to display a different name for
debugging purposes.

###### See

[Legacy React Docs](https://legacy.reactjs.org/docs/react-component.html#displayname)

##### getDerivedStateFromError?

> `optional` **getDerivedStateFromError?**: [`GetDerivedStateFromError`](#getderivedstatefromerror-2)\<`P`, `S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1225

###### Inherited from

[`StaticLifecycle`](#staticlifecycle).[`getDerivedStateFromError`](#getderivedstatefromerror-1)

##### getDerivedStateFromProps?

> `optional` **getDerivedStateFromProps?**: [`GetDerivedStateFromProps`](#getderivedstatefromprops-2)\<`P`, `S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1224

###### Inherited from

[`StaticLifecycle`](#staticlifecycle).[`getDerivedStateFromProps`](#getderivedstatefromprops-1)

##### ~~propTypes?~~

> `optional` **propTypes?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1150

Ignored by React.

###### Deprecated

Only kept in types for backwards compatibility. Will be removed in a future major release.

***

### CreateIconConfig

Defined in: [packages/ui/src/components/icons/lib.tsx:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/lib.tsx#L5)

#### Properties

##### children

> **children**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/icons/lib.tsx:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/lib.tsx#L7)

##### defaultProps?

> `optional` **defaultProps?**: [`Partial`](#partial)\<[`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<[`SVGProps`](@repo.ui.cards.<internal>.md#svgprops)\<[`SVGSVGElement`](@repo.palette-engine.colorSpaces.<internal>.md#svgsvgelement)\>, `"ref"`\>\>

Defined in: [packages/ui/src/components/icons/lib.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/lib.tsx#L9)

##### name

> **name**: `string`

Defined in: [packages/ui/src/components/icons/lib.tsx:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/lib.tsx#L6)

##### viewBox?

> `optional` **viewBox?**: `string`

Defined in: [packages/ui/src/components/icons/lib.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/lib.tsx#L8)

***

### Element

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:4145

Represents a JSX element.

Where [ReactNode](@repo.ui.data-entry.<internal>.md#reactnode) represents everything that can be rendered, `ReactElement`
only represents JSX.

#### Example

```tsx
const element: ReactElement = <div />;
```

#### Extends

- [`ReactElement`](@repo.ui.data-entry.<internal>.md#reactelement)\<`any`, `any`\>

#### Properties

##### key

> **key**: `string` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:331

###### Inherited from

[`ReactElement`](@repo.ui.data-entry.<internal>.md#reactelement).[`key`](@repo.ui.data-entry.<internal>.md#key-1)

##### props

> **props**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:330

###### Inherited from

[`ReactElement`](@repo.ui.data-entry.<internal>.md#reactelement).[`props`](@repo.ui.data-entry.<internal>.md#props-1)

##### type

> **type**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:329

###### Inherited from

[`ReactElement`](@repo.ui.data-entry.<internal>.md#reactelement).[`type`](@repo.ui.data-entry.<internal>.md#type-12)

***

### FunctionComponent()

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1060

Represents the type of a function component. Can optionally
receive a type argument that represents the props the component
accepts.

#### See

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components)

#### Examples

```tsx
// With props:
type Props = { name: string }

const MyComponent: FunctionComponent<Props> = (props) => {
 return <div>{props.name}</div>
}
```

```tsx
// Without props:
const MyComponentWithoutProps: FunctionComponent = () => {
  return <div>MyComponentWithoutProps</div>
}
```

#### Type Parameters

##### P

`P` = \{ \}

The props the component accepts.

> **FunctionComponent**(`props`): [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode) \| `Promise`\<[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1061

Represents the type of a function component. Can optionally
receive a type argument that represents the props the component
accepts.

#### Parameters

##### props

`P`

#### Returns

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode) \| `Promise`\<[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)\>

#### See

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components)

#### Examples

```tsx
// With props:
type Props = { name: string }

const MyComponent: FunctionComponent<Props> = (props) => {
 return <div>{props.name}</div>
}
```

```tsx
// Without props:
const MyComponentWithoutProps: FunctionComponent = () => {
  return <div>MyComponentWithoutProps</div>
}
```

#### Properties

##### displayName?

> `optional` **displayName?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1085

Used in debugging messages. You might want to set it
explicitly if you want to display a different name for
debugging purposes.

###### See

[Legacy React Docs](https://legacy.reactjs.org/docs/react-component.html#displayname)

###### Example

```tsx

const MyComponent: FC = () => {
  return <div>Hello!</div>
}

MyComponent.displayName = 'MyAwesomeComponent'
```

##### ~~propTypes?~~

> `optional` **propTypes?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1066

Ignored by React.

###### Deprecated

Only kept in types for backwards compatibility. Will be removed in a future major release.

***

### StaticLifecycle

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1223

#### Extended by

- [`ComponentClass`](#componentclass)

#### Type Parameters

##### P

`P`

##### S

`S`

#### Properties

##### getDerivedStateFromError?

> `optional` **getDerivedStateFromError?**: [`GetDerivedStateFromError`](#getderivedstatefromerror-2)\<`P`, `S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1225

##### getDerivedStateFromProps?

> `optional` **getDerivedStateFromProps?**: [`GetDerivedStateFromProps`](#getderivedstatefromprops-2)\<`P`, `S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1224

## Type Aliases

### ComponentPropsWithoutRef

> **ComponentPropsWithoutRef**\<`T`\> = [`PropsWithoutRef`](#propswithoutref)\<[`ComponentProps`](@repo.ui.cards.<internal>.md#componentprops)\<`T`\>\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1530

Used to retrieve the props a component accepts without its ref. Can either be
passed a string, indicating a DOM element (e.g. 'div', 'span', etc.) or the
type of a React component.

#### Type Parameters

##### T

`T` *extends* [`ElementType`](#elementtype-1)

#### See

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/reference/ComponentProps)

#### Examples

```tsx
// Retrieves the props an 'input' element accepts
type InputProps = React.ComponentPropsWithoutRef<'input'>;
```

```tsx
const MyComponent = (props: { foo: number, bar: string }) => <div />;

// Retrieves the props 'MyComponent' accepts
type MyComponentPropsWithoutRef = React.ComponentPropsWithoutRef<typeof MyComponent>;
```

***

### ComponentState

> **ComponentState** = `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:227

***

### ComponentType

> **ComponentType**\<`P`\> = [`ComponentClass`](#componentclass)\<`P`\> \| [`FunctionComponent`](#functioncomponent)\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:124

Represents any user-defined component, either as a function or a class.

Similar to [JSXElementConstructor](@repo.ui.data-entry.<internal>.md#jsxelementconstructor), but with extra properties like
FunctionComponent.defaultProps defaultProps.

#### Type Parameters

##### P

`P` = \{ \}

The props the component accepts.

#### See

 - [ComponentClass](#componentclass)
 - [FunctionComponent](#functioncomponent)

***

### ElementType

> **ElementType**\<`P`, `Tag`\> = `{ [K in Tag]: P extends IntrinsicElements[K] ? K : never }`\[`Tag`\] \| [`ComponentType`](#componenttype)\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:109

Used to retrieve the possible components which accept a given set of props.

Can be passed no type parameters to get a union of all possible components
and tags.

Is a superset of [ComponentType](#componenttype).

#### Type Parameters

##### P

`P` = `any`

The props to match against. If not passed, defaults to any.

##### Tag

`Tag` *extends* keyof [`IntrinsicElements`](@repo.ui.cards.<internal>.md#intrinsicelements) = keyof [`IntrinsicElements`](@repo.ui.cards.<internal>.md#intrinsicelements)

An optional tag to match against. If not passed, attempts to match against all possible tags.

#### Examples

```tsx
// All components and tags (img, embed etc.)
// which accept `src`
type SrcComponents = ElementType<{ src: any }>;
```

```tsx
// All components
type AllComponents = ElementType;
```

```tsx
// All custom components which match `src`, and tags which
// match `src`, narrowed down to just `audio` and `embed`
type SrcComponents = ElementType<{ src: any }, 'audio' | 'embed'>;
```

***

### GetDerivedStateFromError

> **GetDerivedStateFromError**\<`P`, `S`\> = (`error`) => [`Partial`](#partial)\<`S`\> \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1236

#### Type Parameters

##### P

`P`

##### S

`S`

#### Parameters

##### error

`any`

#### Returns

[`Partial`](#partial)\<`S`\> \| `null`

***

### GetDerivedStateFromProps

> **GetDerivedStateFromProps**\<`P`, `S`\> = (`nextProps`, `prevState`) => [`Partial`](#partial)\<`S`\> \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1228

#### Type Parameters

##### P

`P`

##### S

`S`

#### Parameters

##### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

##### prevState

`S`

#### Returns

[`Partial`](#partial)\<`S`\> \| `null`

***

### IconSpinnerProps

> **IconSpinnerProps** = [`ComponentPropsWithoutRef`](#componentpropswithoutref)\<`"svg"`\>

Defined in: [packages/ui/src/components/icons/components/IconSpinner.tsx:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/components/IconSpinner.tsx#L3)

***

### Partial

> **Partial**\<`T`\> = `{ [P in keyof T]?: T[P] }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1583

Make all properties in T optional

#### Type Parameters

##### T

`T`

***

### Props

> **Props** = [`IconProps`](@repo.ui.icons.md#iconprops) & `object`

Defined in: [packages/ui/src/components/icons/Icon.tsx:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/icons/Icon.tsx#L5)

#### Type Declaration

##### name

> **name**: [`IconName`](@repo.ui.icons.md#iconname)

***

### PropsWithoutRef

> **PropsWithoutRef**\<`Props`\> = `Props` *extends* `any` ? `"ref"` *extends* keyof `Props` ? [`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<`Props`, `"ref"`\> : `Props` : `Props`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1412

Omits the 'ref' attribute from the given props object.

#### Type Parameters

##### Props

`Props`

The props object type.
