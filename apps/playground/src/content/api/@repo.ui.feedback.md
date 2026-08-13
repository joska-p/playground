---
title: feedback
package: "@repo/ui"
kind: module
module: feedback
---

## Modules

- [\<internal\>](@repo.ui.feedback.<internal>.md)

## Classes

### ErrorBoundary

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L18)

#### Extends

- [`Component`](@repo.ui.data-entry.<internal>.md#component)\<[`ErrorBoundaryProps`](#errorboundaryprops-1), [`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate)\>

#### Constructors

##### Constructor

> **new ErrorBoundary**(`props`): [`ErrorBoundary`](#errorboundary)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:958

###### Parameters

###### props

[`ErrorBoundaryProps`](#errorboundaryprops-1)

###### Returns

[`ErrorBoundary`](#errorboundary)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`constructor`](@repo.ui.data-entry.<internal>.md#constructor)

##### Constructor

> **new ErrorBoundary**(`props`, `context`): [`ErrorBoundary`](#errorboundary)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:966

###### Parameters

###### props

[`ErrorBoundaryProps`](#errorboundaryprops-1)

###### context

`any`

value of the parent [Context](https://react.dev/reference/react/Component#context) specified
in `contextType`.

###### Returns

[`ErrorBoundary`](#errorboundary)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`constructor`](@repo.ui.data-entry.<internal>.md#constructor)

#### Properties

##### context

> **context**: `unknown`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:955

If using React Context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

###### Example

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

###### See

[React Docs](https://react.dev/reference/react/Component#context)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`context`](@repo.ui.data-entry.<internal>.md#context)

##### contextType?

> `static` `optional` **contextType?**: [`Context`](@repo.ui.data-entry.<internal>.md#context-1)\<`any`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:931

If set, `this.context` will be set at runtime to the current value of the given Context.

###### Example

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

###### See

[https://react.dev/reference/react/Component#static-contexttype](https://react.dev/reference/react/Component#static-contexttype)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`contextType`](@repo.ui.data-entry.<internal>.md#contexttype)

##### props

> `readonly` **props**: [`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:979

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`props`](@repo.ui.data-entry.<internal>.md#props)

##### ~~propTypes?~~

> `static` `optional` **propTypes?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:937

Ignored by React.

###### Deprecated

Only kept in types for backwards compatibility. Will be removed in a future major release.

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`propTypes`](@repo.ui.data-entry.<internal>.md#proptypes)

##### state

> **state**: [`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:19](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L19)

###### Overrides

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`state`](@repo.ui.data-entry.<internal>.md#state)

#### Methods

##### componentDidCatch()

> **componentDidCatch**(`error`, `info`): `void`

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L25)

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

###### Parameters

###### error

`Error`

###### info

[`ErrorInfo`](@repo.ui.data-entry.<internal>.md#errorinfo)

###### Returns

`void`

###### Overrides

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentDidCatch`](@repo.ui.data-entry.<internal>.md#componentdidcatch)

##### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1198

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

###### Returns

`void`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentDidMount`](@repo.ui.data-entry.<internal>.md#componentdidmount)

##### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1261

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2) is present and returns non-null.

###### Parameters

###### prevProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### prevState

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`S`\>

###### snapshot?

`any`

###### Returns

`void`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentDidUpdate`](@repo.ui.data-entry.<internal>.md#componentdidupdate)

##### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1277

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](@repo.ui.data-entry.<internal>.md#componentdidmount-1) or the constructor instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentWillMount`](@repo.ui.data-entry.<internal>.md#componentwillmount)

##### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1308

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentWillReceiveProps`](@repo.ui.data-entry.<internal>.md#componentwillreceiveprops)

##### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1214

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

###### Returns

`void`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentWillUnmount`](@repo.ui.data-entry.<internal>.md#componentwillunmount)

##### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1340

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### nextState

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`S`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`componentWillUpdate`](@repo.ui.data-entry.<internal>.md#componentwillupdate)

##### forceUpdate()

> **forceUpdate**(`callback?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:976

###### Parameters

###### callback?

() => `void`

###### Returns

`void`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`forceUpdate`](@repo.ui.data-entry.<internal>.md#forceupdate)

##### getDerivedStateFromError()

> `static` **getDerivedStateFromError**(`error`): [`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L21)

###### Parameters

###### error

`Error`

###### Returns

[`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate)

##### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1255

Runs before React applies the result of [render](#) to the document, and
returns an object to be given to [componentDidUpdate](@repo.ui.data-entry.<internal>.md#componentdidupdate-2). Useful for saving
things such as scroll position before [render](#) causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

###### Parameters

###### prevProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### prevState

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`S`\>

###### Returns

`any`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`getSnapshotBeforeUpdate`](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate)

##### render()

> **render**(): [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:33](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L33)

###### Returns

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

###### Overrides

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`render`](@repo.ui.data-entry.<internal>.md#render)

##### reset()

> **reset**(): `void`

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L29)

###### Returns

`void`

##### setState()

> **setState**\<`K`\>(`state`, `callback?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:971

###### Type Parameters

###### K

`K` *extends* `"error"`

###### Parameters

###### state

[`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate) \| ((`prevState`, `props`) => [`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate) \| [`Pick`](@repo.ui.data-entry.<internal>.md#pick)\<[`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate), `K`\> \| `null`) \| [`Pick`](@repo.ui.data-entry.<internal>.md#pick)\<[`ErrorBoundaryState`](@repo.ui.feedback.<internal>.md#errorboundarystate), `K`\> \| `null`

###### callback?

() => `void`

###### Returns

`void`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`setState`](@repo.ui.data-entry.<internal>.md#setstate)

##### shouldComponentUpdate()?

> `optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1209

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, [Component.render](#), `componentWillUpdate`
and `componentDidUpdate` will not be called.

###### Parameters

###### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### nextState

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`S`\>

###### nextContext

`any`

###### Returns

`boolean`

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`shouldComponentUpdate`](@repo.ui.data-entry.<internal>.md#shouldcomponentupdate)

##### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1292

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](@repo.ui.data-entry.<internal>.md#componentdidmount-1) or the constructor instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`UNSAFE_componentWillMount`](@repo.ui.data-entry.<internal>.md#unsafe_componentwillmount)

##### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1326

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`UNSAFE_componentWillReceiveProps`](@repo.ui.data-entry.<internal>.md#unsafe_componentwillreceiveprops)

##### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1356

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](@repo.ui.data-entry.<internal>.md#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](@repo.ui.icons.<internal>.md#getderivedstatefromprops-1) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`P`\>

###### nextState

[`Readonly`](@repo.ui.data-entry.<internal>.md#readonly-2)\<`S`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use getSnapshotBeforeUpdate instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`Component`](@repo.ui.data-entry.<internal>.md#component).[`UNSAFE_componentWillUpdate`](@repo.ui.data-entry.<internal>.md#unsafe_componentwillupdate)

## Interfaces

### AlertProps

Defined in: [packages/ui/src/components/feedback/alert/Alert.tsx:25](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/Alert.tsx#L25)

Construct a type with the properties of T except for those in type K.

#### Extends

- [`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>, `"title"`\>.[`VariantProps`](@repo.ui.data-entry.<internal>.md#variantprops)\<*typeof* [`alertVariants`](#alertvariants)\>

#### Properties

##### about?

> `optional` **about?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2820

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`about`](@repo.ui.data-entry.<internal>.md#about)

##### accessKey?

> `optional` **accessKey?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2793

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`accessKey`](@repo.ui.data-entry.<internal>.md#accesskey)

##### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2491

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-activedescendant`](@repo.ui.data-entry.<internal>.md#aria-activedescendant)

##### aria-atomic?

> `optional` **aria-atomic?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2493

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-atomic`](@repo.ui.data-entry.<internal>.md#aria-atomic)

##### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2498

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-autocomplete`](@repo.ui.data-entry.<internal>.md#aria-autocomplete)

##### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2504

Defines a string value that labels the current element, which is intended to be converted into Braille.

###### See

aria-label.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-braillelabel`](@repo.ui.data-entry.<internal>.md#aria-braillelabel)

##### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2509

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

###### See

aria-roledescription.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-brailleroledescription`](@repo.ui.data-entry.<internal>.md#aria-brailleroledescription)

##### aria-busy?

> `optional` **aria-busy?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2510

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-busy`](@repo.ui.data-entry.<internal>.md#aria-busy)

##### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2515

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

###### See

 - aria-pressed
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-checked`](@repo.ui.data-entry.<internal>.md#aria-checked)

##### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2520

Defines the total number of columns in a table, grid, or treegrid.

###### See

aria-colindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colcount`](@repo.ui.data-entry.<internal>.md#aria-colcount)

##### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2525

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

###### See

 - aria-colcount
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindex`](@repo.ui.data-entry.<internal>.md#aria-colindex)

##### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2530

Defines a human readable text alternative of aria-colindex.

###### See

aria-rowindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindextext`](@repo.ui.data-entry.<internal>.md#aria-colindextext)

##### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2535

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-colindex
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colspan`](@repo.ui.data-entry.<internal>.md#aria-colspan)

##### aria-controls?

> `optional` **aria-controls?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2540

Identifies the element (or elements) whose contents or presence are controlled by the current element.

###### See

aria-owns.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-controls`](@repo.ui.data-entry.<internal>.md#aria-controls)

##### aria-current?

> `optional` **aria-current?**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"` \| `"date"` \| `"time"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2542

Indicates the element that represents the current item within a container or set of related elements.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-current`](@repo.ui.data-entry.<internal>.md#aria-current)

##### aria-describedby?

> `optional` **aria-describedby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that describes the object.

###### See

aria-labelledby

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-describedby`](@repo.ui.data-entry.<internal>.md#aria-describedby)

##### aria-description?

> `optional` **aria-description?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2552

Defines a string value that describes or annotates the current element.

###### See

related aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-description`](@repo.ui.data-entry.<internal>.md#aria-description)

##### aria-details?

> `optional` **aria-details?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2557

Identifies the element that provides a detailed, extended description for the object.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-details`](@repo.ui.data-entry.<internal>.md#aria-details)

##### aria-disabled?

> `optional` **aria-disabled?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2562

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

###### See

 - aria-hidden
 - aria-readonly.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-disabled`](@repo.ui.data-entry.<internal>.md#aria-disabled)

##### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2567

Indicates what functions can be performed when a dragged object is released on the drop target.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-dropeffect`](@repo.ui.data-entry.<internal>.md#aria-dropeffect)

##### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2572

Identifies the element that provides an error message for the object.

###### See

 - aria-invalid
 - aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-errormessage`](@repo.ui.data-entry.<internal>.md#aria-errormessage)

##### aria-expanded?

> `optional` **aria-expanded?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2574

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-expanded`](@repo.ui.data-entry.<internal>.md#aria-expanded)

##### aria-flowto?

> `optional` **aria-flowto?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2579

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-flowto`](@repo.ui.data-entry.<internal>.md#aria-flowto)

##### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2584

Indicates an element's "grabbed" state in a drag-and-drop operation.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-grabbed`](@repo.ui.data-entry.<internal>.md#aria-grabbed)

##### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2586

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-haspopup`](@repo.ui.data-entry.<internal>.md#aria-haspopup)

##### aria-hidden?

> `optional` **aria-hidden?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2591

Indicates whether the element is exposed to an accessibility API.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-hidden`](@repo.ui.data-entry.<internal>.md#aria-hidden)

##### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2596

Indicates the entered value does not conform to the format expected by the application.

###### See

aria-errormessage.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-invalid`](@repo.ui.data-entry.<internal>.md#aria-invalid)

##### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2598

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-keyshortcuts`](@repo.ui.data-entry.<internal>.md#aria-keyshortcuts)

##### aria-label?

> `optional` **aria-label?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2603

Defines a string value that labels the current element.

###### See

aria-labelledby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-label`](@repo.ui.data-entry.<internal>.md#aria-label)

##### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2608

Identifies the element (or elements) that labels the current element.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-labelledby`](@repo.ui.data-entry.<internal>.md#aria-labelledby)

##### aria-level?

> `optional` **aria-level?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2610

Defines the hierarchical level of an element within a structure.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-level`](@repo.ui.data-entry.<internal>.md#aria-level)

##### aria-live?

> `optional` **aria-live?**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2612

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-live`](@repo.ui.data-entry.<internal>.md#aria-live)

##### aria-modal?

> `optional` **aria-modal?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2614

Indicates whether an element is modal when displayed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-modal`](@repo.ui.data-entry.<internal>.md#aria-modal)

##### aria-multiline?

> `optional` **aria-multiline?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2616

Indicates whether a text box accepts multiple lines of input or only a single line.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiline`](@repo.ui.data-entry.<internal>.md#aria-multiline)

##### aria-multiselectable?

> `optional` **aria-multiselectable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2618

Indicates that the user may select more than one item from the current selectable descendants.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiselectable`](@repo.ui.data-entry.<internal>.md#aria-multiselectable)

##### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2620

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-orientation`](@repo.ui.data-entry.<internal>.md#aria-orientation)

##### aria-owns?

> `optional` **aria-owns?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2626

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

###### See

aria-controls.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-owns`](@repo.ui.data-entry.<internal>.md#aria-owns)

##### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2631

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-placeholder`](@repo.ui.data-entry.<internal>.md#aria-placeholder)

##### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2636

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-setsize.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-posinset`](@repo.ui.data-entry.<internal>.md#aria-posinset)

##### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2641

Indicates the current "pressed" state of toggle buttons.

###### See

 - aria-checked
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-pressed`](@repo.ui.data-entry.<internal>.md#aria-pressed)

##### aria-readonly?

> `optional` **aria-readonly?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2646

Indicates that the element is not editable, but is otherwise operable.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-readonly`](@repo.ui.data-entry.<internal>.md#aria-readonly)

##### aria-relevant?

> `optional` **aria-relevant?**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2651

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

###### See

aria-atomic.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-relevant`](@repo.ui.data-entry.<internal>.md#aria-relevant)

##### aria-required?

> `optional` **aria-required?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2664

Indicates that user input is required on the element before a form may be submitted.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-required`](@repo.ui.data-entry.<internal>.md#aria-required)

##### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2666

Defines a human-readable, author-localized description for the role of an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-roledescription`](@repo.ui.data-entry.<internal>.md#aria-roledescription)

##### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2671

Defines the total number of rows in a table, grid, or treegrid.

###### See

aria-rowindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowcount`](@repo.ui.data-entry.<internal>.md#aria-rowcount)

##### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2676

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

###### See

 - aria-rowcount
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindex`](@repo.ui.data-entry.<internal>.md#aria-rowindex)

##### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2681

Defines a human readable text alternative of aria-rowindex.

###### See

aria-colindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindextext`](@repo.ui.data-entry.<internal>.md#aria-rowindextext)

##### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2686

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-rowindex
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowspan`](@repo.ui.data-entry.<internal>.md#aria-rowspan)

##### aria-selected?

> `optional` **aria-selected?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2691

Indicates the current "selected" state of various widgets.

###### See

 - aria-checked
 - aria-pressed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-selected`](@repo.ui.data-entry.<internal>.md#aria-selected)

##### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2696

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-posinset.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-setsize`](@repo.ui.data-entry.<internal>.md#aria-setsize)

##### aria-sort?

> `optional` **aria-sort?**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2698

Indicates if items in a table or grid are sorted in ascending or descending order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-sort`](@repo.ui.data-entry.<internal>.md#aria-sort)

##### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2700

Defines the maximum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemax`](@repo.ui.data-entry.<internal>.md#aria-valuemax)

##### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2702

Defines the minimum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemin`](@repo.ui.data-entry.<internal>.md#aria-valuemin)

##### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2707

Defines the current value for a range widget.

###### See

aria-valuetext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuenow`](@repo.ui.data-entry.<internal>.md#aria-valuenow)

##### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2709

Defines the human readable text alternative of aria-valuenow for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuetext`](@repo.ui.data-entry.<internal>.md#aria-valuetext)

##### autoCapitalize?

> `optional` **autoCapitalize?**: `"off"` \| `"none"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2794

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCapitalize`](@repo.ui.data-entry.<internal>.md#autocapitalize)

##### autoCorrect?

> `optional` **autoCorrect?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2833

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCorrect`](@repo.ui.data-entry.<internal>.md#autocorrect)

##### autoFocus?

> `optional` **autoFocus?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2795

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoFocus`](@repo.ui.data-entry.<internal>.md#autofocus)

##### autoSave?

> `optional` **autoSave?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2834

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoSave`](@repo.ui.data-entry.<internal>.md#autosave)

##### children?

> `optional` **children?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2267

###### Inherited from

`Omit.children`

##### className?

> `optional` **className?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2796

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`className`](@repo.ui.data-entry.<internal>.md#classname)

##### color?

> `optional` **color?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2835

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`color`](@repo.ui.data-entry.<internal>.md#color-1)

##### content?

> `optional` **content?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2821

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`content`](@repo.ui.data-entry.<internal>.md#content-1)

##### contentEditable?

> `optional` **contentEditable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish) \| `"inherit"` \| `"plaintext-only"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2797

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contentEditable`](@repo.ui.data-entry.<internal>.md#contenteditable)

##### contextMenu?

> `optional` **contextMenu?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2798

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contextMenu`](@repo.ui.data-entry.<internal>.md#contextmenu)

##### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2268

###### \_\_html

> **\_\_html**: `string` \| [`TrustedHTML`](@repo.ui.data-entry.<internal>.md#trustedhtml)

###### Inherited from

`Omit.dangerouslySetInnerHTML`

##### datatype?

> `optional` **datatype?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2822

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`datatype`](@repo.ui.data-entry.<internal>.md#datatype)

##### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2787

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultChecked`](@repo.ui.data-entry.<internal>.md#defaultchecked)

##### defaultValue?

> `optional` **defaultValue?**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2788

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultValue`](@repo.ui.data-entry.<internal>.md#defaultvalue)

##### description?

> `optional` **description?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/alert/Alert.tsx:28](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/Alert.tsx#L28)

##### dir?

> `optional` **dir?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2799

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`dir`](@repo.ui.data-entry.<internal>.md#dir)

##### draggable?

> `optional` **draggable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2800

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`draggable`](@repo.ui.data-entry.<internal>.md#draggable)

##### enterKeyHint?

> `optional` **enterKeyHint?**: `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2801

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`enterKeyHint`](@repo.ui.data-entry.<internal>.md#enterkeyhint)

##### exportparts?

> `optional` **exportparts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2868

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`exportparts`](@repo.ui.cards.<internal>.md#exportparts-44)

##### hidden?

> `optional` **hidden?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2802

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`hidden`](@repo.ui.data-entry.<internal>.md#hidden)

##### icon?

> `optional` **icon?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/alert/Alert.tsx:29](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/Alert.tsx#L29)

##### id?

> `optional` **id?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2803

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`id`](@repo.ui.data-entry.<internal>.md#id)

##### inert?

> `optional` **inert?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2854

###### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inert`](@repo.ui.data-entry.<internal>.md#inert)

##### inlist?

> `optional` **inlist?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2823

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inlist`](@repo.ui.data-entry.<internal>.md#inlist)

##### inputMode?

> `optional` **inputMode?**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2859

Hints at the type of data that might be entered by the user while editing the element or its contents

###### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`inputMode`](@repo.ui.cards.<internal>.md#inputmode-55)

##### is?

> `optional` **is?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2864

Specify that a standard HTML element should behave like a defined custom built-in element

###### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`is`](@repo.ui.cards.<internal>.md#is-44)

##### itemID?

> `optional` **itemID?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2839

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemID`](@repo.ui.data-entry.<internal>.md#itemid)

##### itemProp?

> `optional` **itemProp?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2836

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemProp`](@repo.ui.data-entry.<internal>.md#itemprop)

##### itemRef?

> `optional` **itemRef?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2840

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemRef`](@repo.ui.data-entry.<internal>.md#itemref)

##### itemScope?

> `optional` **itemScope?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2837

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemScope`](@repo.ui.data-entry.<internal>.md#itemscope)

##### itemType?

> `optional` **itemType?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2838

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemType`](@repo.ui.data-entry.<internal>.md#itemtype)

##### lang?

> `optional` **lang?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2804

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`lang`](@repo.ui.data-entry.<internal>.md#lang)

##### nonce?

> `optional` **nonce?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2805

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`nonce`](@repo.ui.data-entry.<internal>.md#nonce)

##### onAbort?

> `optional` **onAbort?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2327

###### Inherited from

`Omit.onAbort`

##### onAbortCapture?

> `optional` **onAbortCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2328

###### Inherited from

`Omit.onAbortCapture`

##### onAnimationEnd?

> `optional` **onAnimationEnd?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2457

###### Inherited from

`Omit.onAnimationEnd`

##### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2458

###### Inherited from

`Omit.onAnimationEndCapture`

##### onAnimationIteration?

> `optional` **onAnimationIteration?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2459

###### Inherited from

`Omit.onAnimationIteration`

##### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2460

###### Inherited from

`Omit.onAnimationIterationCapture`

##### onAnimationStart?

> `optional` **onAnimationStart?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2455

###### Inherited from

`Omit.onAnimationStart`

##### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2456

###### Inherited from

`Omit.onAnimationStartCapture`

##### onAuxClick?

> `optional` **onAuxClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2373

###### Inherited from

`Omit.onAuxClick`

##### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2374

###### Inherited from

`Omit.onAuxClickCapture`

##### onBeforeInput?

> `optional` **onBeforeInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2299

###### Inherited from

`Omit.onBeforeInput`

##### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2300

###### Inherited from

`Omit.onBeforeInputCapture`

##### onBeforeToggle?

> `optional` **onBeforeToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2464

###### Inherited from

`Omit.onBeforeToggle`

##### onBlur?

> `optional` **onBlur?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2293

###### Inherited from

`Omit.onBlur`

##### onBlurCapture?

> `optional` **onBlurCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2294

###### Inherited from

`Omit.onBlurCapture`

##### onCanPlay?

> `optional` **onCanPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2329

###### Inherited from

`Omit.onCanPlay`

##### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2330

###### Inherited from

`Omit.onCanPlayCapture`

##### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2331

###### Inherited from

`Omit.onCanPlayThrough`

##### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2332

###### Inherited from

`Omit.onCanPlayThroughCapture`

##### onChange?

> `optional` **onChange?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2297

###### Inherited from

`Omit.onChange`

##### onChangeCapture?

> `optional` **onChangeCapture?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2298

###### Inherited from

`Omit.onChangeCapture`

##### onClick?

> `optional` **onClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2375

###### Inherited from

`Omit.onClick`

##### onClickCapture?

> `optional` **onClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2376

###### Inherited from

`Omit.onClickCapture`

##### onCompositionEnd?

> `optional` **onCompositionEnd?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2283

###### Inherited from

`Omit.onCompositionEnd`

##### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2284

###### Inherited from

`Omit.onCompositionEndCapture`

##### onCompositionStart?

> `optional` **onCompositionStart?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2285

###### Inherited from

`Omit.onCompositionStart`

##### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2286

###### Inherited from

`Omit.onCompositionStartCapture`

##### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2287

###### Inherited from

`Omit.onCompositionUpdate`

##### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2288

###### Inherited from

`Omit.onCompositionUpdateCapture`

##### onContextMenu?

> `optional` **onContextMenu?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2377

###### Inherited from

`Omit.onContextMenu`

##### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2378

###### Inherited from

`Omit.onContextMenuCapture`

##### onCopy?

> `optional` **onCopy?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2275

###### Inherited from

`Omit.onCopy`

##### onCopyCapture?

> `optional` **onCopyCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2276

###### Inherited from

`Omit.onCopyCapture`

##### onCut?

> `optional` **onCut?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2277

###### Inherited from

`Omit.onCut`

##### onCutCapture?

> `optional` **onCutCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2278

###### Inherited from

`Omit.onCutCapture`

##### onDoubleClick?

> `optional` **onDoubleClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2379

###### Inherited from

`Omit.onDoubleClick`

##### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2380

###### Inherited from

`Omit.onDoubleClickCapture`

##### onDrag?

> `optional` **onDrag?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2381

###### Inherited from

`Omit.onDrag`

##### onDragCapture?

> `optional` **onDragCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2382

###### Inherited from

`Omit.onDragCapture`

##### onDragEnd?

> `optional` **onDragEnd?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2383

###### Inherited from

`Omit.onDragEnd`

##### onDragEndCapture?

> `optional` **onDragEndCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2384

###### Inherited from

`Omit.onDragEndCapture`

##### onDragEnter?

> `optional` **onDragEnter?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2385

###### Inherited from

`Omit.onDragEnter`

##### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2386

###### Inherited from

`Omit.onDragEnterCapture`

##### onDragExit?

> `optional` **onDragExit?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2387

###### Inherited from

`Omit.onDragExit`

##### onDragExitCapture?

> `optional` **onDragExitCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2388

###### Inherited from

`Omit.onDragExitCapture`

##### onDragLeave?

> `optional` **onDragLeave?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2389

###### Inherited from

`Omit.onDragLeave`

##### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2390

###### Inherited from

`Omit.onDragLeaveCapture`

##### onDragOver?

> `optional` **onDragOver?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2391

###### Inherited from

`Omit.onDragOver`

##### onDragOverCapture?

> `optional` **onDragOverCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2392

###### Inherited from

`Omit.onDragOverCapture`

##### onDragStart?

> `optional` **onDragStart?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2393

###### Inherited from

`Omit.onDragStart`

##### onDragStartCapture?

> `optional` **onDragStartCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2394

###### Inherited from

`Omit.onDragStartCapture`

##### onDrop?

> `optional` **onDrop?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2395

###### Inherited from

`Omit.onDrop`

##### onDropCapture?

> `optional` **onDropCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2396

###### Inherited from

`Omit.onDropCapture`

##### onDurationChange?

> `optional` **onDurationChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2333

###### Inherited from

`Omit.onDurationChange`

##### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2334

###### Inherited from

`Omit.onDurationChangeCapture`

##### onEmptied?

> `optional` **onEmptied?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2335

###### Inherited from

`Omit.onEmptied`

##### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2336

###### Inherited from

`Omit.onEmptiedCapture`

##### onEncrypted?

> `optional` **onEncrypted?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2337

###### Inherited from

`Omit.onEncrypted`

##### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2338

###### Inherited from

`Omit.onEncryptedCapture`

##### onEnded?

> `optional` **onEnded?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2339

###### Inherited from

`Omit.onEnded`

##### onEndedCapture?

> `optional` **onEndedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2340

###### Inherited from

`Omit.onEndedCapture`

##### onError?

> `optional` **onError?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2313

###### Inherited from

`Omit.onError`

##### onErrorCapture?

> `optional` **onErrorCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2314

###### Inherited from

`Omit.onErrorCapture`

##### onFocus?

> `optional` **onFocus?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2291

###### Inherited from

`Omit.onFocus`

##### onFocusCapture?

> `optional` **onFocusCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2292

###### Inherited from

`Omit.onFocusCapture`

##### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2439

###### Inherited from

`Omit.onGotPointerCapture`

##### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2440

###### Inherited from

`Omit.onGotPointerCaptureCapture`

##### onInput?

> `optional` **onInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2301

###### Inherited from

`Omit.onInput`

##### onInputCapture?

> `optional` **onInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2302

###### Inherited from

`Omit.onInputCapture`

##### onInvalid?

> `optional` **onInvalid?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2307

###### Inherited from

`Omit.onInvalid`

##### onInvalidCapture?

> `optional` **onInvalidCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2308

###### Inherited from

`Omit.onInvalidCapture`

##### onKeyDown?

> `optional` **onKeyDown?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2317

###### Inherited from

`Omit.onKeyDown`

##### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2318

###### Inherited from

`Omit.onKeyDownCapture`

##### ~~onKeyPress?~~

> `optional` **onKeyPress?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2320

###### Deprecated

Use `onKeyUp` or `onKeyDown` instead

###### Inherited from

`Omit.onKeyPress`

##### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2322

###### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

###### Inherited from

`Omit.onKeyPressCapture`

##### onKeyUp?

> `optional` **onKeyUp?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2323

###### Inherited from

`Omit.onKeyUp`

##### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2324

###### Inherited from

`Omit.onKeyUpCapture`

##### onLoad?

> `optional` **onLoad?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2311

###### Inherited from

`Omit.onLoad`

##### onLoadCapture?

> `optional` **onLoadCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2312

###### Inherited from

`Omit.onLoadCapture`

##### onLoadedData?

> `optional` **onLoadedData?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2341

###### Inherited from

`Omit.onLoadedData`

##### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2342

###### Inherited from

`Omit.onLoadedDataCapture`

##### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2343

###### Inherited from

`Omit.onLoadedMetadata`

##### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2344

###### Inherited from

`Omit.onLoadedMetadataCapture`

##### onLoadStart?

> `optional` **onLoadStart?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2345

###### Inherited from

`Omit.onLoadStart`

##### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2346

###### Inherited from

`Omit.onLoadStartCapture`

##### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2441

###### Inherited from

`Omit.onLostPointerCapture`

##### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2442

###### Inherited from

`Omit.onLostPointerCaptureCapture`

##### onMouseDown?

> `optional` **onMouseDown?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2397

###### Inherited from

`Omit.onMouseDown`

##### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2398

###### Inherited from

`Omit.onMouseDownCapture`

##### onMouseEnter?

> `optional` **onMouseEnter?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2399

###### Inherited from

`Omit.onMouseEnter`

##### onMouseLeave?

> `optional` **onMouseLeave?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2400

###### Inherited from

`Omit.onMouseLeave`

##### onMouseMove?

> `optional` **onMouseMove?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2401

###### Inherited from

`Omit.onMouseMove`

##### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2402

###### Inherited from

`Omit.onMouseMoveCapture`

##### onMouseOut?

> `optional` **onMouseOut?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2403

###### Inherited from

`Omit.onMouseOut`

##### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2404

###### Inherited from

`Omit.onMouseOutCapture`

##### onMouseOver?

> `optional` **onMouseOver?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2405

###### Inherited from

`Omit.onMouseOver`

##### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2406

###### Inherited from

`Omit.onMouseOverCapture`

##### onMouseUp?

> `optional` **onMouseUp?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2407

###### Inherited from

`Omit.onMouseUp`

##### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2408

###### Inherited from

`Omit.onMouseUpCapture`

##### onPaste?

> `optional` **onPaste?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2279

###### Inherited from

`Omit.onPaste`

##### onPasteCapture?

> `optional` **onPasteCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2280

###### Inherited from

`Omit.onPasteCapture`

##### onPause?

> `optional` **onPause?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2347

###### Inherited from

`Omit.onPause`

##### onPauseCapture?

> `optional` **onPauseCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2348

###### Inherited from

`Omit.onPauseCapture`

##### onPlay?

> `optional` **onPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2349

###### Inherited from

`Omit.onPlay`

##### onPlayCapture?

> `optional` **onPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2350

###### Inherited from

`Omit.onPlayCapture`

##### onPlaying?

> `optional` **onPlaying?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2351

###### Inherited from

`Omit.onPlaying`

##### onPlayingCapture?

> `optional` **onPlayingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2352

###### Inherited from

`Omit.onPlayingCapture`

##### onPointerCancel?

> `optional` **onPointerCancel?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2431

###### Inherited from

`Omit.onPointerCancel`

##### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2432

###### Inherited from

`Omit.onPointerCancelCapture`

##### onPointerDown?

> `optional` **onPointerDown?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2425

###### Inherited from

`Omit.onPointerDown`

##### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2426

###### Inherited from

`Omit.onPointerDownCapture`

##### onPointerEnter?

> `optional` **onPointerEnter?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2433

###### Inherited from

`Omit.onPointerEnter`

##### onPointerLeave?

> `optional` **onPointerLeave?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2434

###### Inherited from

`Omit.onPointerLeave`

##### onPointerMove?

> `optional` **onPointerMove?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2427

###### Inherited from

`Omit.onPointerMove`

##### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2428

###### Inherited from

`Omit.onPointerMoveCapture`

##### onPointerOut?

> `optional` **onPointerOut?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2437

###### Inherited from

`Omit.onPointerOut`

##### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2438

###### Inherited from

`Omit.onPointerOutCapture`

##### onPointerOver?

> `optional` **onPointerOver?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2435

###### Inherited from

`Omit.onPointerOver`

##### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2436

###### Inherited from

`Omit.onPointerOverCapture`

##### onPointerUp?

> `optional` **onPointerUp?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2429

###### Inherited from

`Omit.onPointerUp`

##### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2430

###### Inherited from

`Omit.onPointerUpCapture`

##### onProgress?

> `optional` **onProgress?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2353

###### Inherited from

`Omit.onProgress`

##### onProgressCapture?

> `optional` **onProgressCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2354

###### Inherited from

`Omit.onProgressCapture`

##### onRateChange?

> `optional` **onRateChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2355

###### Inherited from

`Omit.onRateChange`

##### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2356

###### Inherited from

`Omit.onRateChangeCapture`

##### onReset?

> `optional` **onReset?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2303

###### Inherited from

`Omit.onReset`

##### onResetCapture?

> `optional` **onResetCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2304

###### Inherited from

`Omit.onResetCapture`

##### onScroll?

> `optional` **onScroll?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2445

###### Inherited from

`Omit.onScroll`

##### onScrollCapture?

> `optional` **onScrollCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2446

###### Inherited from

`Omit.onScrollCapture`

##### onScrollEnd?

> `optional` **onScrollEnd?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2447

###### Inherited from

`Omit.onScrollEnd`

##### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2448

###### Inherited from

`Omit.onScrollEndCapture`

##### onSeeked?

> `optional` **onSeeked?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2357

###### Inherited from

`Omit.onSeeked`

##### onSeekedCapture?

> `optional` **onSeekedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2358

###### Inherited from

`Omit.onSeekedCapture`

##### onSeeking?

> `optional` **onSeeking?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2359

###### Inherited from

`Omit.onSeeking`

##### onSeekingCapture?

> `optional` **onSeekingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2360

###### Inherited from

`Omit.onSeekingCapture`

##### onSelect?

> `optional` **onSelect?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2411

###### Inherited from

`Omit.onSelect`

##### onSelectCapture?

> `optional` **onSelectCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2412

###### Inherited from

`Omit.onSelectCapture`

##### onStalled?

> `optional` **onStalled?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2361

###### Inherited from

`Omit.onStalled`

##### onStalledCapture?

> `optional` **onStalledCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2362

###### Inherited from

`Omit.onStalledCapture`

##### onSubmit?

> `optional` **onSubmit?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2305

###### Inherited from

`Omit.onSubmit`

##### onSubmitCapture?

> `optional` **onSubmitCapture?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2306

###### Inherited from

`Omit.onSubmitCapture`

##### onSuspend?

> `optional` **onSuspend?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2363

###### Inherited from

`Omit.onSuspend`

##### onSuspendCapture?

> `optional` **onSuspendCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2364

###### Inherited from

`Omit.onSuspendCapture`

##### onTimeUpdate?

> `optional` **onTimeUpdate?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2365

###### Inherited from

`Omit.onTimeUpdate`

##### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2366

###### Inherited from

`Omit.onTimeUpdateCapture`

##### onToggle?

> `optional` **onToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2463

###### Inherited from

`Omit.onToggle`

##### onTouchCancel?

> `optional` **onTouchCancel?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2415

###### Inherited from

`Omit.onTouchCancel`

##### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2416

###### Inherited from

`Omit.onTouchCancelCapture`

##### onTouchEnd?

> `optional` **onTouchEnd?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2417

###### Inherited from

`Omit.onTouchEnd`

##### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2418

###### Inherited from

`Omit.onTouchEndCapture`

##### onTouchMove?

> `optional` **onTouchMove?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2419

###### Inherited from

`Omit.onTouchMove`

##### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2420

###### Inherited from

`Omit.onTouchMoveCapture`

##### onTouchStart?

> `optional` **onTouchStart?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2421

###### Inherited from

`Omit.onTouchStart`

##### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2422

###### Inherited from

`Omit.onTouchStartCapture`

##### onTransitionCancel?

> `optional` **onTransitionCancel?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2467

###### Inherited from

`Omit.onTransitionCancel`

##### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2468

###### Inherited from

`Omit.onTransitionCancelCapture`

##### onTransitionEnd?

> `optional` **onTransitionEnd?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2469

###### Inherited from

`Omit.onTransitionEnd`

##### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2470

###### Inherited from

`Omit.onTransitionEndCapture`

##### onTransitionRun?

> `optional` **onTransitionRun?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2471

###### Inherited from

`Omit.onTransitionRun`

##### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2472

###### Inherited from

`Omit.onTransitionRunCapture`

##### onTransitionStart?

> `optional` **onTransitionStart?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2473

###### Inherited from

`Omit.onTransitionStart`

##### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2474

###### Inherited from

`Omit.onTransitionStartCapture`

##### onVolumeChange?

> `optional` **onVolumeChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2367

###### Inherited from

`Omit.onVolumeChange`

##### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2368

###### Inherited from

`Omit.onVolumeChangeCapture`

##### onWaiting?

> `optional` **onWaiting?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2369

###### Inherited from

`Omit.onWaiting`

##### onWaitingCapture?

> `optional` **onWaitingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2370

###### Inherited from

`Omit.onWaitingCapture`

##### onWheel?

> `optional` **onWheel?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2451

###### Inherited from

`Omit.onWheel`

##### onWheelCapture?

> `optional` **onWheelCapture?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2452

###### Inherited from

`Omit.onWheelCapture`

##### part?

> `optional` **part?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2872

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`part`](@repo.ui.cards.<internal>.md#part-70)

##### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2846

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popover`](@repo.ui.data-entry.<internal>.md#popover)

##### popoverTarget?

> `optional` **popoverTarget?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2848

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTarget`](@repo.ui.data-entry.<internal>.md#popovertarget)

##### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"toggle"` \| `"show"` \| `"hide"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2847

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTargetAction`](@repo.ui.data-entry.<internal>.md#popovertargetaction)

##### prefix?

> `optional` **prefix?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2824

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`prefix`](@repo.ui.data-entry.<internal>.md#prefix)

##### property?

> `optional` **property?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2825

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`property`](@repo.ui.data-entry.<internal>.md#property)

##### radioGroup?

> `optional` **radioGroup?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2814

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`radioGroup`](@repo.ui.data-entry.<internal>.md#radiogroup)

##### rel?

> `optional` **rel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2826

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rel`](@repo.ui.data-entry.<internal>.md#rel)

##### resource?

> `optional` **resource?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2827

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`resource`](@repo.ui.data-entry.<internal>.md#resource)

##### results?

> `optional` **results?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2841

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`results`](@repo.ui.data-entry.<internal>.md#results)

##### rev?

> `optional` **rev?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2828

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rev`](@repo.ui.data-entry.<internal>.md#rev)

##### role?

> `optional` **role?**: [`AriaRole`](@repo.ui.data-entry.<internal>.md#ariarole)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2817

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`role`](@repo.ui.data-entry.<internal>.md#role)

##### security?

> `optional` **security?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2842

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`security`](@repo.ui.data-entry.<internal>.md#security)

##### slot?

> `optional` **slot?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2806

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`slot`](@repo.ui.data-entry.<internal>.md#slot)

##### spellCheck?

> `optional` **spellCheck?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2807

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`spellCheck`](@repo.ui.data-entry.<internal>.md#spellcheck)

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.ui.data-entry.<internal>.md#cssproperties)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2808

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`style`](@repo.ui.data-entry.<internal>.md#style)

##### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2789

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressContentEditableWarning`](@repo.ui.data-entry.<internal>.md#suppresscontenteditablewarning)

##### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2790

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressHydrationWarning`](@repo.ui.data-entry.<internal>.md#suppresshydrationwarning)

##### tabIndex?

> `optional` **tabIndex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2809

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`tabIndex`](@repo.ui.data-entry.<internal>.md#tabindex)

##### title

> **title**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/alert/Alert.tsx:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/Alert.tsx#L27)

##### translate?

> `optional` **translate?**: `"yes"` \| `"no"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2811

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`translate`](@repo.ui.data-entry.<internal>.md#translate-1)

##### typeof?

> `optional` **typeof?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2829

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`typeof`](@repo.ui.data-entry.<internal>.md#typeof-2)

##### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2843

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`unselectable`](@repo.ui.data-entry.<internal>.md#unselectable)

##### variant?

> `optional` **variant?**: `"default"` \| `"primary"` \| `"secondary"` \| `"accent"` \| `"warning"` \| `"destructive"` \| `null`

Defined in: [packages/ui/src/components/feedback/alert/variants.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/variants.ts#L5)

###### Inherited from

`VariantProps.variant`

##### vocab?

> `optional` **vocab?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2830

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`vocab`](@repo.ui.data-entry.<internal>.md#vocab)

***

### DefaultFallbackProps

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L8)

Construct a type with the properties of T except for those in type K.

#### Extends

- [`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>, `"title"`\>.[`DefaultFallbackVariants`](#defaultfallbackvariants)

#### Properties

##### about?

> `optional` **about?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2820

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`about`](@repo.ui.data-entry.<internal>.md#about)

##### accessKey?

> `optional` **accessKey?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2793

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`accessKey`](@repo.ui.data-entry.<internal>.md#accesskey)

##### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2491

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-activedescendant`](@repo.ui.data-entry.<internal>.md#aria-activedescendant)

##### aria-atomic?

> `optional` **aria-atomic?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2493

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-atomic`](@repo.ui.data-entry.<internal>.md#aria-atomic)

##### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2498

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-autocomplete`](@repo.ui.data-entry.<internal>.md#aria-autocomplete)

##### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2504

Defines a string value that labels the current element, which is intended to be converted into Braille.

###### See

aria-label.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-braillelabel`](@repo.ui.data-entry.<internal>.md#aria-braillelabel)

##### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2509

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

###### See

aria-roledescription.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-brailleroledescription`](@repo.ui.data-entry.<internal>.md#aria-brailleroledescription)

##### aria-busy?

> `optional` **aria-busy?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2510

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-busy`](@repo.ui.data-entry.<internal>.md#aria-busy)

##### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2515

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

###### See

 - aria-pressed
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-checked`](@repo.ui.data-entry.<internal>.md#aria-checked)

##### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2520

Defines the total number of columns in a table, grid, or treegrid.

###### See

aria-colindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colcount`](@repo.ui.data-entry.<internal>.md#aria-colcount)

##### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2525

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

###### See

 - aria-colcount
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindex`](@repo.ui.data-entry.<internal>.md#aria-colindex)

##### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2530

Defines a human readable text alternative of aria-colindex.

###### See

aria-rowindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindextext`](@repo.ui.data-entry.<internal>.md#aria-colindextext)

##### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2535

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-colindex
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colspan`](@repo.ui.data-entry.<internal>.md#aria-colspan)

##### aria-controls?

> `optional` **aria-controls?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2540

Identifies the element (or elements) whose contents or presence are controlled by the current element.

###### See

aria-owns.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-controls`](@repo.ui.data-entry.<internal>.md#aria-controls)

##### aria-current?

> `optional` **aria-current?**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"` \| `"date"` \| `"time"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2542

Indicates the element that represents the current item within a container or set of related elements.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-current`](@repo.ui.data-entry.<internal>.md#aria-current)

##### aria-describedby?

> `optional` **aria-describedby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that describes the object.

###### See

aria-labelledby

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-describedby`](@repo.ui.data-entry.<internal>.md#aria-describedby)

##### aria-description?

> `optional` **aria-description?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2552

Defines a string value that describes or annotates the current element.

###### See

related aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-description`](@repo.ui.data-entry.<internal>.md#aria-description)

##### aria-details?

> `optional` **aria-details?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2557

Identifies the element that provides a detailed, extended description for the object.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-details`](@repo.ui.data-entry.<internal>.md#aria-details)

##### aria-disabled?

> `optional` **aria-disabled?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2562

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

###### See

 - aria-hidden
 - aria-readonly.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-disabled`](@repo.ui.data-entry.<internal>.md#aria-disabled)

##### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2567

Indicates what functions can be performed when a dragged object is released on the drop target.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-dropeffect`](@repo.ui.data-entry.<internal>.md#aria-dropeffect)

##### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2572

Identifies the element that provides an error message for the object.

###### See

 - aria-invalid
 - aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-errormessage`](@repo.ui.data-entry.<internal>.md#aria-errormessage)

##### aria-expanded?

> `optional` **aria-expanded?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2574

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-expanded`](@repo.ui.data-entry.<internal>.md#aria-expanded)

##### aria-flowto?

> `optional` **aria-flowto?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2579

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-flowto`](@repo.ui.data-entry.<internal>.md#aria-flowto)

##### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2584

Indicates an element's "grabbed" state in a drag-and-drop operation.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-grabbed`](@repo.ui.data-entry.<internal>.md#aria-grabbed)

##### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2586

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-haspopup`](@repo.ui.data-entry.<internal>.md#aria-haspopup)

##### aria-hidden?

> `optional` **aria-hidden?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2591

Indicates whether the element is exposed to an accessibility API.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-hidden`](@repo.ui.data-entry.<internal>.md#aria-hidden)

##### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2596

Indicates the entered value does not conform to the format expected by the application.

###### See

aria-errormessage.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-invalid`](@repo.ui.data-entry.<internal>.md#aria-invalid)

##### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2598

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-keyshortcuts`](@repo.ui.data-entry.<internal>.md#aria-keyshortcuts)

##### aria-label?

> `optional` **aria-label?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2603

Defines a string value that labels the current element.

###### See

aria-labelledby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-label`](@repo.ui.data-entry.<internal>.md#aria-label)

##### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2608

Identifies the element (or elements) that labels the current element.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-labelledby`](@repo.ui.data-entry.<internal>.md#aria-labelledby)

##### aria-level?

> `optional` **aria-level?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2610

Defines the hierarchical level of an element within a structure.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-level`](@repo.ui.data-entry.<internal>.md#aria-level)

##### aria-live?

> `optional` **aria-live?**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2612

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-live`](@repo.ui.data-entry.<internal>.md#aria-live)

##### aria-modal?

> `optional` **aria-modal?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2614

Indicates whether an element is modal when displayed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-modal`](@repo.ui.data-entry.<internal>.md#aria-modal)

##### aria-multiline?

> `optional` **aria-multiline?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2616

Indicates whether a text box accepts multiple lines of input or only a single line.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiline`](@repo.ui.data-entry.<internal>.md#aria-multiline)

##### aria-multiselectable?

> `optional` **aria-multiselectable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2618

Indicates that the user may select more than one item from the current selectable descendants.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiselectable`](@repo.ui.data-entry.<internal>.md#aria-multiselectable)

##### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2620

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-orientation`](@repo.ui.data-entry.<internal>.md#aria-orientation)

##### aria-owns?

> `optional` **aria-owns?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2626

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

###### See

aria-controls.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-owns`](@repo.ui.data-entry.<internal>.md#aria-owns)

##### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2631

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-placeholder`](@repo.ui.data-entry.<internal>.md#aria-placeholder)

##### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2636

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-setsize.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-posinset`](@repo.ui.data-entry.<internal>.md#aria-posinset)

##### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2641

Indicates the current "pressed" state of toggle buttons.

###### See

 - aria-checked
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-pressed`](@repo.ui.data-entry.<internal>.md#aria-pressed)

##### aria-readonly?

> `optional` **aria-readonly?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2646

Indicates that the element is not editable, but is otherwise operable.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-readonly`](@repo.ui.data-entry.<internal>.md#aria-readonly)

##### aria-relevant?

> `optional` **aria-relevant?**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2651

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

###### See

aria-atomic.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-relevant`](@repo.ui.data-entry.<internal>.md#aria-relevant)

##### aria-required?

> `optional` **aria-required?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2664

Indicates that user input is required on the element before a form may be submitted.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-required`](@repo.ui.data-entry.<internal>.md#aria-required)

##### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2666

Defines a human-readable, author-localized description for the role of an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-roledescription`](@repo.ui.data-entry.<internal>.md#aria-roledescription)

##### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2671

Defines the total number of rows in a table, grid, or treegrid.

###### See

aria-rowindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowcount`](@repo.ui.data-entry.<internal>.md#aria-rowcount)

##### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2676

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

###### See

 - aria-rowcount
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindex`](@repo.ui.data-entry.<internal>.md#aria-rowindex)

##### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2681

Defines a human readable text alternative of aria-rowindex.

###### See

aria-colindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindextext`](@repo.ui.data-entry.<internal>.md#aria-rowindextext)

##### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2686

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-rowindex
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowspan`](@repo.ui.data-entry.<internal>.md#aria-rowspan)

##### aria-selected?

> `optional` **aria-selected?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2691

Indicates the current "selected" state of various widgets.

###### See

 - aria-checked
 - aria-pressed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-selected`](@repo.ui.data-entry.<internal>.md#aria-selected)

##### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2696

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-posinset.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-setsize`](@repo.ui.data-entry.<internal>.md#aria-setsize)

##### aria-sort?

> `optional` **aria-sort?**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2698

Indicates if items in a table or grid are sorted in ascending or descending order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-sort`](@repo.ui.data-entry.<internal>.md#aria-sort)

##### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2700

Defines the maximum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemax`](@repo.ui.data-entry.<internal>.md#aria-valuemax)

##### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2702

Defines the minimum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemin`](@repo.ui.data-entry.<internal>.md#aria-valuemin)

##### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2707

Defines the current value for a range widget.

###### See

aria-valuetext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuenow`](@repo.ui.data-entry.<internal>.md#aria-valuenow)

##### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2709

Defines the human readable text alternative of aria-valuenow for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuetext`](@repo.ui.data-entry.<internal>.md#aria-valuetext)

##### autoCapitalize?

> `optional` **autoCapitalize?**: `"off"` \| `"none"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2794

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCapitalize`](@repo.ui.data-entry.<internal>.md#autocapitalize)

##### autoCorrect?

> `optional` **autoCorrect?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2833

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCorrect`](@repo.ui.data-entry.<internal>.md#autocorrect)

##### autoFocus?

> `optional` **autoFocus?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2795

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoFocus`](@repo.ui.data-entry.<internal>.md#autofocus)

##### autoSave?

> `optional` **autoSave?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2834

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoSave`](@repo.ui.data-entry.<internal>.md#autosave)

##### children?

> `optional` **children?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2267

###### Inherited from

`Omit.children`

##### className?

> `optional` **className?**: `string`

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L15)

###### Overrides

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`className`](@repo.ui.data-entry.<internal>.md#classname)

##### color?

> `optional` **color?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2835

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`color`](@repo.ui.data-entry.<internal>.md#color-1)

##### content?

> `optional` **content?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2821

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`content`](@repo.ui.data-entry.<internal>.md#content-1)

##### contentEditable?

> `optional` **contentEditable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish) \| `"inherit"` \| `"plaintext-only"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2797

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contentEditable`](@repo.ui.data-entry.<internal>.md#contenteditable)

##### contextMenu?

> `optional` **contextMenu?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2798

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contextMenu`](@repo.ui.data-entry.<internal>.md#contextmenu)

##### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2268

###### \_\_html

> **\_\_html**: `string` \| [`TrustedHTML`](@repo.ui.data-entry.<internal>.md#trustedhtml)

###### Inherited from

`Omit.dangerouslySetInnerHTML`

##### datatype?

> `optional` **datatype?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2822

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`datatype`](@repo.ui.data-entry.<internal>.md#datatype)

##### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2787

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultChecked`](@repo.ui.data-entry.<internal>.md#defaultchecked)

##### defaultValue?

> `optional` **defaultValue?**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2788

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultValue`](@repo.ui.data-entry.<internal>.md#defaultvalue)

##### description?

> `optional` **description?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:13](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L13)

##### dir?

> `optional` **dir?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2799

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`dir`](@repo.ui.data-entry.<internal>.md#dir)

##### draggable?

> `optional` **draggable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2800

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`draggable`](@repo.ui.data-entry.<internal>.md#draggable)

##### enterKeyHint?

> `optional` **enterKeyHint?**: `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2801

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`enterKeyHint`](@repo.ui.data-entry.<internal>.md#enterkeyhint)

##### error

> **error**: `Error`

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L10)

##### exportparts?

> `optional` **exportparts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2868

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`exportparts`](@repo.ui.cards.<internal>.md#exportparts-44)

##### hidden?

> `optional` **hidden?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2802

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`hidden`](@repo.ui.data-entry.<internal>.md#hidden)

##### id?

> `optional` **id?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2803

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`id`](@repo.ui.data-entry.<internal>.md#id)

##### inert?

> `optional` **inert?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2854

###### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inert`](@repo.ui.data-entry.<internal>.md#inert)

##### inlist?

> `optional` **inlist?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2823

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inlist`](@repo.ui.data-entry.<internal>.md#inlist)

##### inputMode?

> `optional` **inputMode?**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2859

Hints at the type of data that might be entered by the user while editing the element or its contents

###### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`inputMode`](@repo.ui.cards.<internal>.md#inputmode-55)

##### is?

> `optional` **is?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2864

Specify that a standard HTML element should behave like a defined custom built-in element

###### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`is`](@repo.ui.cards.<internal>.md#is-44)

##### itemID?

> `optional` **itemID?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2839

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemID`](@repo.ui.data-entry.<internal>.md#itemid)

##### itemProp?

> `optional` **itemProp?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2836

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemProp`](@repo.ui.data-entry.<internal>.md#itemprop)

##### itemRef?

> `optional` **itemRef?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2840

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemRef`](@repo.ui.data-entry.<internal>.md#itemref)

##### itemScope?

> `optional` **itemScope?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2837

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemScope`](@repo.ui.data-entry.<internal>.md#itemscope)

##### itemType?

> `optional` **itemType?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2838

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemType`](@repo.ui.data-entry.<internal>.md#itemtype)

##### lang?

> `optional` **lang?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2804

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`lang`](@repo.ui.data-entry.<internal>.md#lang)

##### nonce?

> `optional` **nonce?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2805

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`nonce`](@repo.ui.data-entry.<internal>.md#nonce)

##### onAbort?

> `optional` **onAbort?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2327

###### Inherited from

`Omit.onAbort`

##### onAbortCapture?

> `optional` **onAbortCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2328

###### Inherited from

`Omit.onAbortCapture`

##### onAnimationEnd?

> `optional` **onAnimationEnd?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2457

###### Inherited from

`Omit.onAnimationEnd`

##### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2458

###### Inherited from

`Omit.onAnimationEndCapture`

##### onAnimationIteration?

> `optional` **onAnimationIteration?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2459

###### Inherited from

`Omit.onAnimationIteration`

##### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2460

###### Inherited from

`Omit.onAnimationIterationCapture`

##### onAnimationStart?

> `optional` **onAnimationStart?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2455

###### Inherited from

`Omit.onAnimationStart`

##### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2456

###### Inherited from

`Omit.onAnimationStartCapture`

##### onAuxClick?

> `optional` **onAuxClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2373

###### Inherited from

`Omit.onAuxClick`

##### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2374

###### Inherited from

`Omit.onAuxClickCapture`

##### onBeforeInput?

> `optional` **onBeforeInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2299

###### Inherited from

`Omit.onBeforeInput`

##### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2300

###### Inherited from

`Omit.onBeforeInputCapture`

##### onBeforeToggle?

> `optional` **onBeforeToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2464

###### Inherited from

`Omit.onBeforeToggle`

##### onBlur?

> `optional` **onBlur?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2293

###### Inherited from

`Omit.onBlur`

##### onBlurCapture?

> `optional` **onBlurCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2294

###### Inherited from

`Omit.onBlurCapture`

##### onCanPlay?

> `optional` **onCanPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2329

###### Inherited from

`Omit.onCanPlay`

##### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2330

###### Inherited from

`Omit.onCanPlayCapture`

##### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2331

###### Inherited from

`Omit.onCanPlayThrough`

##### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2332

###### Inherited from

`Omit.onCanPlayThroughCapture`

##### onChange?

> `optional` **onChange?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2297

###### Inherited from

`Omit.onChange`

##### onChangeCapture?

> `optional` **onChangeCapture?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2298

###### Inherited from

`Omit.onChangeCapture`

##### onClick?

> `optional` **onClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2375

###### Inherited from

`Omit.onClick`

##### onClickCapture?

> `optional` **onClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2376

###### Inherited from

`Omit.onClickCapture`

##### onCompositionEnd?

> `optional` **onCompositionEnd?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2283

###### Inherited from

`Omit.onCompositionEnd`

##### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2284

###### Inherited from

`Omit.onCompositionEndCapture`

##### onCompositionStart?

> `optional` **onCompositionStart?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2285

###### Inherited from

`Omit.onCompositionStart`

##### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2286

###### Inherited from

`Omit.onCompositionStartCapture`

##### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2287

###### Inherited from

`Omit.onCompositionUpdate`

##### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2288

###### Inherited from

`Omit.onCompositionUpdateCapture`

##### onContextMenu?

> `optional` **onContextMenu?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2377

###### Inherited from

`Omit.onContextMenu`

##### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2378

###### Inherited from

`Omit.onContextMenuCapture`

##### onCopy?

> `optional` **onCopy?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2275

###### Inherited from

`Omit.onCopy`

##### onCopyCapture?

> `optional` **onCopyCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2276

###### Inherited from

`Omit.onCopyCapture`

##### onCut?

> `optional` **onCut?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2277

###### Inherited from

`Omit.onCut`

##### onCutCapture?

> `optional` **onCutCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2278

###### Inherited from

`Omit.onCutCapture`

##### onDoubleClick?

> `optional` **onDoubleClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2379

###### Inherited from

`Omit.onDoubleClick`

##### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2380

###### Inherited from

`Omit.onDoubleClickCapture`

##### onDrag?

> `optional` **onDrag?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2381

###### Inherited from

`Omit.onDrag`

##### onDragCapture?

> `optional` **onDragCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2382

###### Inherited from

`Omit.onDragCapture`

##### onDragEnd?

> `optional` **onDragEnd?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2383

###### Inherited from

`Omit.onDragEnd`

##### onDragEndCapture?

> `optional` **onDragEndCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2384

###### Inherited from

`Omit.onDragEndCapture`

##### onDragEnter?

> `optional` **onDragEnter?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2385

###### Inherited from

`Omit.onDragEnter`

##### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2386

###### Inherited from

`Omit.onDragEnterCapture`

##### onDragExit?

> `optional` **onDragExit?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2387

###### Inherited from

`Omit.onDragExit`

##### onDragExitCapture?

> `optional` **onDragExitCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2388

###### Inherited from

`Omit.onDragExitCapture`

##### onDragLeave?

> `optional` **onDragLeave?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2389

###### Inherited from

`Omit.onDragLeave`

##### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2390

###### Inherited from

`Omit.onDragLeaveCapture`

##### onDragOver?

> `optional` **onDragOver?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2391

###### Inherited from

`Omit.onDragOver`

##### onDragOverCapture?

> `optional` **onDragOverCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2392

###### Inherited from

`Omit.onDragOverCapture`

##### onDragStart?

> `optional` **onDragStart?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2393

###### Inherited from

`Omit.onDragStart`

##### onDragStartCapture?

> `optional` **onDragStartCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2394

###### Inherited from

`Omit.onDragStartCapture`

##### onDrop?

> `optional` **onDrop?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2395

###### Inherited from

`Omit.onDrop`

##### onDropCapture?

> `optional` **onDropCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2396

###### Inherited from

`Omit.onDropCapture`

##### onDurationChange?

> `optional` **onDurationChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2333

###### Inherited from

`Omit.onDurationChange`

##### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2334

###### Inherited from

`Omit.onDurationChangeCapture`

##### onEmptied?

> `optional` **onEmptied?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2335

###### Inherited from

`Omit.onEmptied`

##### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2336

###### Inherited from

`Omit.onEmptiedCapture`

##### onEncrypted?

> `optional` **onEncrypted?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2337

###### Inherited from

`Omit.onEncrypted`

##### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2338

###### Inherited from

`Omit.onEncryptedCapture`

##### onEnded?

> `optional` **onEnded?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2339

###### Inherited from

`Omit.onEnded`

##### onEndedCapture?

> `optional` **onEndedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2340

###### Inherited from

`Omit.onEndedCapture`

##### onError?

> `optional` **onError?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2313

###### Inherited from

`Omit.onError`

##### onErrorCapture?

> `optional` **onErrorCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2314

###### Inherited from

`Omit.onErrorCapture`

##### onFocus?

> `optional` **onFocus?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2291

###### Inherited from

`Omit.onFocus`

##### onFocusCapture?

> `optional` **onFocusCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2292

###### Inherited from

`Omit.onFocusCapture`

##### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2439

###### Inherited from

`Omit.onGotPointerCapture`

##### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2440

###### Inherited from

`Omit.onGotPointerCaptureCapture`

##### onInput?

> `optional` **onInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2301

###### Inherited from

`Omit.onInput`

##### onInputCapture?

> `optional` **onInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2302

###### Inherited from

`Omit.onInputCapture`

##### onInvalid?

> `optional` **onInvalid?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2307

###### Inherited from

`Omit.onInvalid`

##### onInvalidCapture?

> `optional` **onInvalidCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2308

###### Inherited from

`Omit.onInvalidCapture`

##### onKeyDown?

> `optional` **onKeyDown?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2317

###### Inherited from

`Omit.onKeyDown`

##### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2318

###### Inherited from

`Omit.onKeyDownCapture`

##### ~~onKeyPress?~~

> `optional` **onKeyPress?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2320

###### Deprecated

Use `onKeyUp` or `onKeyDown` instead

###### Inherited from

`Omit.onKeyPress`

##### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2322

###### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

###### Inherited from

`Omit.onKeyPressCapture`

##### onKeyUp?

> `optional` **onKeyUp?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2323

###### Inherited from

`Omit.onKeyUp`

##### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2324

###### Inherited from

`Omit.onKeyUpCapture`

##### onLoad?

> `optional` **onLoad?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2311

###### Inherited from

`Omit.onLoad`

##### onLoadCapture?

> `optional` **onLoadCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2312

###### Inherited from

`Omit.onLoadCapture`

##### onLoadedData?

> `optional` **onLoadedData?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2341

###### Inherited from

`Omit.onLoadedData`

##### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2342

###### Inherited from

`Omit.onLoadedDataCapture`

##### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2343

###### Inherited from

`Omit.onLoadedMetadata`

##### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2344

###### Inherited from

`Omit.onLoadedMetadataCapture`

##### onLoadStart?

> `optional` **onLoadStart?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2345

###### Inherited from

`Omit.onLoadStart`

##### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2346

###### Inherited from

`Omit.onLoadStartCapture`

##### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2441

###### Inherited from

`Omit.onLostPointerCapture`

##### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2442

###### Inherited from

`Omit.onLostPointerCaptureCapture`

##### onMouseDown?

> `optional` **onMouseDown?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2397

###### Inherited from

`Omit.onMouseDown`

##### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2398

###### Inherited from

`Omit.onMouseDownCapture`

##### onMouseEnter?

> `optional` **onMouseEnter?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2399

###### Inherited from

`Omit.onMouseEnter`

##### onMouseLeave?

> `optional` **onMouseLeave?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2400

###### Inherited from

`Omit.onMouseLeave`

##### onMouseMove?

> `optional` **onMouseMove?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2401

###### Inherited from

`Omit.onMouseMove`

##### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2402

###### Inherited from

`Omit.onMouseMoveCapture`

##### onMouseOut?

> `optional` **onMouseOut?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2403

###### Inherited from

`Omit.onMouseOut`

##### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2404

###### Inherited from

`Omit.onMouseOutCapture`

##### onMouseOver?

> `optional` **onMouseOver?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2405

###### Inherited from

`Omit.onMouseOver`

##### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2406

###### Inherited from

`Omit.onMouseOverCapture`

##### onMouseUp?

> `optional` **onMouseUp?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2407

###### Inherited from

`Omit.onMouseUp`

##### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2408

###### Inherited from

`Omit.onMouseUpCapture`

##### onPaste?

> `optional` **onPaste?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2279

###### Inherited from

`Omit.onPaste`

##### onPasteCapture?

> `optional` **onPasteCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2280

###### Inherited from

`Omit.onPasteCapture`

##### onPause?

> `optional` **onPause?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2347

###### Inherited from

`Omit.onPause`

##### onPauseCapture?

> `optional` **onPauseCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2348

###### Inherited from

`Omit.onPauseCapture`

##### onPlay?

> `optional` **onPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2349

###### Inherited from

`Omit.onPlay`

##### onPlayCapture?

> `optional` **onPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2350

###### Inherited from

`Omit.onPlayCapture`

##### onPlaying?

> `optional` **onPlaying?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2351

###### Inherited from

`Omit.onPlaying`

##### onPlayingCapture?

> `optional` **onPlayingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2352

###### Inherited from

`Omit.onPlayingCapture`

##### onPointerCancel?

> `optional` **onPointerCancel?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2431

###### Inherited from

`Omit.onPointerCancel`

##### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2432

###### Inherited from

`Omit.onPointerCancelCapture`

##### onPointerDown?

> `optional` **onPointerDown?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2425

###### Inherited from

`Omit.onPointerDown`

##### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2426

###### Inherited from

`Omit.onPointerDownCapture`

##### onPointerEnter?

> `optional` **onPointerEnter?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2433

###### Inherited from

`Omit.onPointerEnter`

##### onPointerLeave?

> `optional` **onPointerLeave?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2434

###### Inherited from

`Omit.onPointerLeave`

##### onPointerMove?

> `optional` **onPointerMove?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2427

###### Inherited from

`Omit.onPointerMove`

##### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2428

###### Inherited from

`Omit.onPointerMoveCapture`

##### onPointerOut?

> `optional` **onPointerOut?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2437

###### Inherited from

`Omit.onPointerOut`

##### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2438

###### Inherited from

`Omit.onPointerOutCapture`

##### onPointerOver?

> `optional` **onPointerOver?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2435

###### Inherited from

`Omit.onPointerOver`

##### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2436

###### Inherited from

`Omit.onPointerOverCapture`

##### onPointerUp?

> `optional` **onPointerUp?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2429

###### Inherited from

`Omit.onPointerUp`

##### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2430

###### Inherited from

`Omit.onPointerUpCapture`

##### onProgress?

> `optional` **onProgress?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2353

###### Inherited from

`Omit.onProgress`

##### onProgressCapture?

> `optional` **onProgressCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2354

###### Inherited from

`Omit.onProgressCapture`

##### onRateChange?

> `optional` **onRateChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2355

###### Inherited from

`Omit.onRateChange`

##### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2356

###### Inherited from

`Omit.onRateChangeCapture`

##### onReset?

> `optional` **onReset?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2303

###### Inherited from

`Omit.onReset`

##### onResetCapture?

> `optional` **onResetCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2304

###### Inherited from

`Omit.onResetCapture`

##### onScroll?

> `optional` **onScroll?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2445

###### Inherited from

`Omit.onScroll`

##### onScrollCapture?

> `optional` **onScrollCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2446

###### Inherited from

`Omit.onScrollCapture`

##### onScrollEnd?

> `optional` **onScrollEnd?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2447

###### Inherited from

`Omit.onScrollEnd`

##### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2448

###### Inherited from

`Omit.onScrollEndCapture`

##### onSeeked?

> `optional` **onSeeked?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2357

###### Inherited from

`Omit.onSeeked`

##### onSeekedCapture?

> `optional` **onSeekedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2358

###### Inherited from

`Omit.onSeekedCapture`

##### onSeeking?

> `optional` **onSeeking?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2359

###### Inherited from

`Omit.onSeeking`

##### onSeekingCapture?

> `optional` **onSeekingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2360

###### Inherited from

`Omit.onSeekingCapture`

##### onSelect?

> `optional` **onSelect?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2411

###### Inherited from

`Omit.onSelect`

##### onSelectCapture?

> `optional` **onSelectCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2412

###### Inherited from

`Omit.onSelectCapture`

##### onStalled?

> `optional` **onStalled?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2361

###### Inherited from

`Omit.onStalled`

##### onStalledCapture?

> `optional` **onStalledCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2362

###### Inherited from

`Omit.onStalledCapture`

##### onSubmit?

> `optional` **onSubmit?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2305

###### Inherited from

`Omit.onSubmit`

##### onSubmitCapture?

> `optional` **onSubmitCapture?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2306

###### Inherited from

`Omit.onSubmitCapture`

##### onSuspend?

> `optional` **onSuspend?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2363

###### Inherited from

`Omit.onSuspend`

##### onSuspendCapture?

> `optional` **onSuspendCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2364

###### Inherited from

`Omit.onSuspendCapture`

##### onTimeUpdate?

> `optional` **onTimeUpdate?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2365

###### Inherited from

`Omit.onTimeUpdate`

##### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2366

###### Inherited from

`Omit.onTimeUpdateCapture`

##### onToggle?

> `optional` **onToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2463

###### Inherited from

`Omit.onToggle`

##### onTouchCancel?

> `optional` **onTouchCancel?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2415

###### Inherited from

`Omit.onTouchCancel`

##### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2416

###### Inherited from

`Omit.onTouchCancelCapture`

##### onTouchEnd?

> `optional` **onTouchEnd?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2417

###### Inherited from

`Omit.onTouchEnd`

##### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2418

###### Inherited from

`Omit.onTouchEndCapture`

##### onTouchMove?

> `optional` **onTouchMove?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2419

###### Inherited from

`Omit.onTouchMove`

##### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2420

###### Inherited from

`Omit.onTouchMoveCapture`

##### onTouchStart?

> `optional` **onTouchStart?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2421

###### Inherited from

`Omit.onTouchStart`

##### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2422

###### Inherited from

`Omit.onTouchStartCapture`

##### onTransitionCancel?

> `optional` **onTransitionCancel?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2467

###### Inherited from

`Omit.onTransitionCancel`

##### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2468

###### Inherited from

`Omit.onTransitionCancelCapture`

##### onTransitionEnd?

> `optional` **onTransitionEnd?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2469

###### Inherited from

`Omit.onTransitionEnd`

##### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2470

###### Inherited from

`Omit.onTransitionEndCapture`

##### onTransitionRun?

> `optional` **onTransitionRun?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2471

###### Inherited from

`Omit.onTransitionRun`

##### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2472

###### Inherited from

`Omit.onTransitionRunCapture`

##### onTransitionStart?

> `optional` **onTransitionStart?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2473

###### Inherited from

`Omit.onTransitionStart`

##### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2474

###### Inherited from

`Omit.onTransitionStartCapture`

##### onVolumeChange?

> `optional` **onVolumeChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2367

###### Inherited from

`Omit.onVolumeChange`

##### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2368

###### Inherited from

`Omit.onVolumeChangeCapture`

##### onWaiting?

> `optional` **onWaiting?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2369

###### Inherited from

`Omit.onWaiting`

##### onWaitingCapture?

> `optional` **onWaitingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2370

###### Inherited from

`Omit.onWaitingCapture`

##### onWheel?

> `optional` **onWheel?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2451

###### Inherited from

`Omit.onWheel`

##### onWheelCapture?

> `optional` **onWheelCapture?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDivElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldivelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2452

###### Inherited from

`Omit.onWheelCapture`

##### part?

> `optional` **part?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2872

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`part`](@repo.ui.cards.<internal>.md#part-70)

##### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2846

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popover`](@repo.ui.data-entry.<internal>.md#popover)

##### popoverTarget?

> `optional` **popoverTarget?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2848

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTarget`](@repo.ui.data-entry.<internal>.md#popovertarget)

##### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"toggle"` \| `"show"` \| `"hide"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2847

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTargetAction`](@repo.ui.data-entry.<internal>.md#popovertargetaction)

##### prefix?

> `optional` **prefix?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2824

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`prefix`](@repo.ui.data-entry.<internal>.md#prefix)

##### property?

> `optional` **property?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2825

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`property`](@repo.ui.data-entry.<internal>.md#property)

##### radioGroup?

> `optional` **radioGroup?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2814

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`radioGroup`](@repo.ui.data-entry.<internal>.md#radiogroup)

##### rel?

> `optional` **rel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2826

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rel`](@repo.ui.data-entry.<internal>.md#rel)

##### reset

> **reset**: () => `void`

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L11)

###### Returns

`void`

##### resetLabel?

> `optional` **resetLabel?**: `string`

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L14)

##### resource?

> `optional` **resource?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2827

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`resource`](@repo.ui.data-entry.<internal>.md#resource)

##### results?

> `optional` **results?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2841

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`results`](@repo.ui.data-entry.<internal>.md#results)

##### rev?

> `optional` **rev?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2828

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rev`](@repo.ui.data-entry.<internal>.md#rev)

##### role?

> `optional` **role?**: [`AriaRole`](@repo.ui.data-entry.<internal>.md#ariarole)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2817

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`role`](@repo.ui.data-entry.<internal>.md#role)

##### security?

> `optional` **security?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2842

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`security`](@repo.ui.data-entry.<internal>.md#security)

##### slot?

> `optional` **slot?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2806

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`slot`](@repo.ui.data-entry.<internal>.md#slot)

##### spellCheck?

> `optional` **spellCheck?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2807

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`spellCheck`](@repo.ui.data-entry.<internal>.md#spellcheck)

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.ui.data-entry.<internal>.md#cssproperties)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2808

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`style`](@repo.ui.data-entry.<internal>.md#style)

##### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2789

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressContentEditableWarning`](@repo.ui.data-entry.<internal>.md#suppresscontenteditablewarning)

##### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2790

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressHydrationWarning`](@repo.ui.data-entry.<internal>.md#suppresshydrationwarning)

##### tabIndex?

> `optional` **tabIndex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2809

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`tabIndex`](@repo.ui.data-entry.<internal>.md#tabindex)

##### title?

> `optional` **title?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L12)

##### translate?

> `optional` **translate?**: `"yes"` \| `"no"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2811

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`translate`](@repo.ui.data-entry.<internal>.md#translate-1)

##### typeof?

> `optional` **typeof?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2829

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`typeof`](@repo.ui.data-entry.<internal>.md#typeof-2)

##### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2843

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`unselectable`](@repo.ui.data-entry.<internal>.md#unselectable)

##### variant?

> `optional` **variant?**: `"default"` \| `"primary"` \| `"secondary"` \| `"accent"` \| `"warning"` \| `"destructive"` \| `null`

Defined in: [packages/ui/src/components/feedback/default-fallback/variants.ts:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/variants.ts#L9)

###### Inherited from

`DefaultFallbackVariants.variant`

##### vocab?

> `optional` **vocab?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2830

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`vocab`](@repo.ui.data-entry.<internal>.md#vocab)

***

### DialogProps

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:15](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L15)

Construct a type with the properties of T except for those in type K.

#### Extends

- [`Omit`](@repo.ui.data-entry.<internal>.md#omit)\<[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>, `"open"`\>.[`DialogVariants`](@repo.ui.feedback.<internal>.md#dialogvariants)

#### Properties

##### about?

> `optional` **about?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2820

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`about`](@repo.ui.data-entry.<internal>.md#about)

##### accessKey?

> `optional` **accessKey?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2793

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`accessKey`](@repo.ui.data-entry.<internal>.md#accesskey)

##### aria-activedescendant?

> `optional` **aria-activedescendant?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2491

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-activedescendant`](@repo.ui.data-entry.<internal>.md#aria-activedescendant)

##### aria-atomic?

> `optional` **aria-atomic?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2493

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-atomic`](@repo.ui.data-entry.<internal>.md#aria-atomic)

##### aria-autocomplete?

> `optional` **aria-autocomplete?**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2498

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-autocomplete`](@repo.ui.data-entry.<internal>.md#aria-autocomplete)

##### aria-braillelabel?

> `optional` **aria-braillelabel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2504

Defines a string value that labels the current element, which is intended to be converted into Braille.

###### See

aria-label.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-braillelabel`](@repo.ui.data-entry.<internal>.md#aria-braillelabel)

##### aria-brailleroledescription?

> `optional` **aria-brailleroledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2509

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

###### See

aria-roledescription.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-brailleroledescription`](@repo.ui.data-entry.<internal>.md#aria-brailleroledescription)

##### aria-busy?

> `optional` **aria-busy?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2510

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-busy`](@repo.ui.data-entry.<internal>.md#aria-busy)

##### aria-checked?

> `optional` **aria-checked?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2515

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

###### See

 - aria-pressed
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-checked`](@repo.ui.data-entry.<internal>.md#aria-checked)

##### aria-colcount?

> `optional` **aria-colcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2520

Defines the total number of columns in a table, grid, or treegrid.

###### See

aria-colindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colcount`](@repo.ui.data-entry.<internal>.md#aria-colcount)

##### aria-colindex?

> `optional` **aria-colindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2525

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

###### See

 - aria-colcount
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindex`](@repo.ui.data-entry.<internal>.md#aria-colindex)

##### aria-colindextext?

> `optional` **aria-colindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2530

Defines a human readable text alternative of aria-colindex.

###### See

aria-rowindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colindextext`](@repo.ui.data-entry.<internal>.md#aria-colindextext)

##### aria-colspan?

> `optional` **aria-colspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2535

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-colindex
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-colspan`](@repo.ui.data-entry.<internal>.md#aria-colspan)

##### aria-controls?

> `optional` **aria-controls?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2540

Identifies the element (or elements) whose contents or presence are controlled by the current element.

###### See

aria-owns.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-controls`](@repo.ui.data-entry.<internal>.md#aria-controls)

##### aria-current?

> `optional` **aria-current?**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"` \| `"date"` \| `"time"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2542

Indicates the element that represents the current item within a container or set of related elements.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-current`](@repo.ui.data-entry.<internal>.md#aria-current)

##### aria-describedby?

> `optional` **aria-describedby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that describes the object.

###### See

aria-labelledby

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-describedby`](@repo.ui.data-entry.<internal>.md#aria-describedby)

##### aria-description?

> `optional` **aria-description?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2552

Defines a string value that describes or annotates the current element.

###### See

related aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-description`](@repo.ui.data-entry.<internal>.md#aria-description)

##### aria-details?

> `optional` **aria-details?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2557

Identifies the element that provides a detailed, extended description for the object.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-details`](@repo.ui.data-entry.<internal>.md#aria-details)

##### aria-disabled?

> `optional` **aria-disabled?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2562

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

###### See

 - aria-hidden
 - aria-readonly.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-disabled`](@repo.ui.data-entry.<internal>.md#aria-disabled)

##### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect?**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2567

Indicates what functions can be performed when a dragged object is released on the drop target.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-dropeffect`](@repo.ui.data-entry.<internal>.md#aria-dropeffect)

##### aria-errormessage?

> `optional` **aria-errormessage?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2572

Identifies the element that provides an error message for the object.

###### See

 - aria-invalid
 - aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-errormessage`](@repo.ui.data-entry.<internal>.md#aria-errormessage)

##### aria-expanded?

> `optional` **aria-expanded?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2574

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-expanded`](@repo.ui.data-entry.<internal>.md#aria-expanded)

##### aria-flowto?

> `optional` **aria-flowto?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2579

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-flowto`](@repo.ui.data-entry.<internal>.md#aria-flowto)

##### ~~aria-grabbed?~~

> `optional` **aria-grabbed?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2584

Indicates an element's "grabbed" state in a drag-and-drop operation.

###### Deprecated

in ARIA 1.1

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-grabbed`](@repo.ui.data-entry.<internal>.md#aria-grabbed)

##### aria-haspopup?

> `optional` **aria-haspopup?**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2586

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-haspopup`](@repo.ui.data-entry.<internal>.md#aria-haspopup)

##### aria-hidden?

> `optional` **aria-hidden?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2591

Indicates whether the element is exposed to an accessibility API.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-hidden`](@repo.ui.data-entry.<internal>.md#aria-hidden)

##### aria-invalid?

> `optional` **aria-invalid?**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2596

Indicates the entered value does not conform to the format expected by the application.

###### See

aria-errormessage.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-invalid`](@repo.ui.data-entry.<internal>.md#aria-invalid)

##### aria-keyshortcuts?

> `optional` **aria-keyshortcuts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2598

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-keyshortcuts`](@repo.ui.data-entry.<internal>.md#aria-keyshortcuts)

##### aria-label?

> `optional` **aria-label?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2603

Defines a string value that labels the current element.

###### See

aria-labelledby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-label`](@repo.ui.data-entry.<internal>.md#aria-label)

##### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2608

Identifies the element (or elements) that labels the current element.

###### See

aria-describedby.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-labelledby`](@repo.ui.data-entry.<internal>.md#aria-labelledby)

##### aria-level?

> `optional` **aria-level?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2610

Defines the hierarchical level of an element within a structure.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-level`](@repo.ui.data-entry.<internal>.md#aria-level)

##### aria-live?

> `optional` **aria-live?**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2612

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-live`](@repo.ui.data-entry.<internal>.md#aria-live)

##### aria-modal?

> `optional` **aria-modal?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2614

Indicates whether an element is modal when displayed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-modal`](@repo.ui.data-entry.<internal>.md#aria-modal)

##### aria-multiline?

> `optional` **aria-multiline?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2616

Indicates whether a text box accepts multiple lines of input or only a single line.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiline`](@repo.ui.data-entry.<internal>.md#aria-multiline)

##### aria-multiselectable?

> `optional` **aria-multiselectable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2618

Indicates that the user may select more than one item from the current selectable descendants.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-multiselectable`](@repo.ui.data-entry.<internal>.md#aria-multiselectable)

##### aria-orientation?

> `optional` **aria-orientation?**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2620

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-orientation`](@repo.ui.data-entry.<internal>.md#aria-orientation)

##### aria-owns?

> `optional` **aria-owns?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2626

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

###### See

aria-controls.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-owns`](@repo.ui.data-entry.<internal>.md#aria-owns)

##### aria-placeholder?

> `optional` **aria-placeholder?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2631

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-placeholder`](@repo.ui.data-entry.<internal>.md#aria-placeholder)

##### aria-posinset?

> `optional` **aria-posinset?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2636

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-setsize.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-posinset`](@repo.ui.data-entry.<internal>.md#aria-posinset)

##### aria-pressed?

> `optional` **aria-pressed?**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2641

Indicates the current "pressed" state of toggle buttons.

###### See

 - aria-checked
 - aria-selected.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-pressed`](@repo.ui.data-entry.<internal>.md#aria-pressed)

##### aria-readonly?

> `optional` **aria-readonly?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2646

Indicates that the element is not editable, but is otherwise operable.

###### See

aria-disabled.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-readonly`](@repo.ui.data-entry.<internal>.md#aria-readonly)

##### aria-relevant?

> `optional` **aria-relevant?**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2651

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

###### See

aria-atomic.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-relevant`](@repo.ui.data-entry.<internal>.md#aria-relevant)

##### aria-required?

> `optional` **aria-required?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2664

Indicates that user input is required on the element before a form may be submitted.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-required`](@repo.ui.data-entry.<internal>.md#aria-required)

##### aria-roledescription?

> `optional` **aria-roledescription?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2666

Defines a human-readable, author-localized description for the role of an element.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-roledescription`](@repo.ui.data-entry.<internal>.md#aria-roledescription)

##### aria-rowcount?

> `optional` **aria-rowcount?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2671

Defines the total number of rows in a table, grid, or treegrid.

###### See

aria-rowindex.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowcount`](@repo.ui.data-entry.<internal>.md#aria-rowcount)

##### aria-rowindex?

> `optional` **aria-rowindex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2676

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

###### See

 - aria-rowcount
 - aria-rowspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindex`](@repo.ui.data-entry.<internal>.md#aria-rowindex)

##### aria-rowindextext?

> `optional` **aria-rowindextext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2681

Defines a human readable text alternative of aria-rowindex.

###### See

aria-colindextext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowindextext`](@repo.ui.data-entry.<internal>.md#aria-rowindextext)

##### aria-rowspan?

> `optional` **aria-rowspan?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2686

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

###### See

 - aria-rowindex
 - aria-colspan.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-rowspan`](@repo.ui.data-entry.<internal>.md#aria-rowspan)

##### aria-selected?

> `optional` **aria-selected?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2691

Indicates the current "selected" state of various widgets.

###### See

 - aria-checked
 - aria-pressed.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-selected`](@repo.ui.data-entry.<internal>.md#aria-selected)

##### aria-setsize?

> `optional` **aria-setsize?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2696

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

###### See

aria-posinset.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-setsize`](@repo.ui.data-entry.<internal>.md#aria-setsize)

##### aria-sort?

> `optional` **aria-sort?**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2698

Indicates if items in a table or grid are sorted in ascending or descending order.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-sort`](@repo.ui.data-entry.<internal>.md#aria-sort)

##### aria-valuemax?

> `optional` **aria-valuemax?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2700

Defines the maximum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemax`](@repo.ui.data-entry.<internal>.md#aria-valuemax)

##### aria-valuemin?

> `optional` **aria-valuemin?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2702

Defines the minimum allowed value for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuemin`](@repo.ui.data-entry.<internal>.md#aria-valuemin)

##### aria-valuenow?

> `optional` **aria-valuenow?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2707

Defines the current value for a range widget.

###### See

aria-valuetext.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuenow`](@repo.ui.data-entry.<internal>.md#aria-valuenow)

##### aria-valuetext?

> `optional` **aria-valuetext?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2709

Defines the human readable text alternative of aria-valuenow for a range widget.

###### Inherited from

[`AriaAttributes`](@repo.ui.data-entry.<internal>.md#ariaattributes).[`aria-valuetext`](@repo.ui.data-entry.<internal>.md#aria-valuetext)

##### autoCapitalize?

> `optional` **autoCapitalize?**: `"off"` \| `"none"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2794

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCapitalize`](@repo.ui.data-entry.<internal>.md#autocapitalize)

##### autoCorrect?

> `optional` **autoCorrect?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2833

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoCorrect`](@repo.ui.data-entry.<internal>.md#autocorrect)

##### autoFocus?

> `optional` **autoFocus?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2795

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoFocus`](@repo.ui.data-entry.<internal>.md#autofocus)

##### autoSave?

> `optional` **autoSave?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2834

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`autoSave`](@repo.ui.data-entry.<internal>.md#autosave)

##### children

> **children**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:21](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L21)

###### Overrides

`Omit.children`

##### className?

> `optional` **className?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2796

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`className`](@repo.ui.data-entry.<internal>.md#classname)

##### color?

> `optional` **color?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2835

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`color`](@repo.ui.data-entry.<internal>.md#color-1)

##### content?

> `optional` **content?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2821

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`content`](@repo.ui.data-entry.<internal>.md#content-1)

##### contentEditable?

> `optional` **contentEditable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish) \| `"inherit"` \| `"plaintext-only"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2797

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contentEditable`](@repo.ui.data-entry.<internal>.md#contenteditable)

##### contextMenu?

> `optional` **contextMenu?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2798

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`contextMenu`](@repo.ui.data-entry.<internal>.md#contextmenu)

##### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2268

###### \_\_html

> **\_\_html**: `string` \| [`TrustedHTML`](@repo.ui.data-entry.<internal>.md#trustedhtml)

###### Inherited from

`Omit.dangerouslySetInnerHTML`

##### datatype?

> `optional` **datatype?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2822

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`datatype`](@repo.ui.data-entry.<internal>.md#datatype)

##### defaultChecked?

> `optional` **defaultChecked?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2787

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultChecked`](@repo.ui.data-entry.<internal>.md#defaultchecked)

##### defaultValue?

> `optional` **defaultValue?**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2788

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`defaultValue`](@repo.ui.data-entry.<internal>.md#defaultvalue)

##### dir?

> `optional` **dir?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2799

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`dir`](@repo.ui.data-entry.<internal>.md#dir)

##### draggable?

> `optional` **draggable?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2800

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`draggable`](@repo.ui.data-entry.<internal>.md#draggable)

##### enterKeyHint?

> `optional` **enterKeyHint?**: `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2801

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`enterKeyHint`](@repo.ui.data-entry.<internal>.md#enterkeyhint)

##### exportparts?

> `optional` **exportparts?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2868

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`exportparts`](@repo.ui.cards.<internal>.md#exportparts-44)

##### hidden?

> `optional` **hidden?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2802

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`hidden`](@repo.ui.data-entry.<internal>.md#hidden)

##### id?

> `optional` **id?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2803

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`id`](@repo.ui.data-entry.<internal>.md#id)

##### inert?

> `optional` **inert?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2854

###### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inert`](@repo.ui.data-entry.<internal>.md#inert)

##### inlist?

> `optional` **inlist?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2823

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`inlist`](@repo.ui.data-entry.<internal>.md#inlist)

##### inputMode?

> `optional` **inputMode?**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2859

Hints at the type of data that might be entered by the user while editing the element or its contents

###### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`inputMode`](@repo.ui.cards.<internal>.md#inputmode-55)

##### is?

> `optional` **is?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2864

Specify that a standard HTML element should behave like a defined custom built-in element

###### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`is`](@repo.ui.cards.<internal>.md#is-44)

##### itemID?

> `optional` **itemID?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2839

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemID`](@repo.ui.data-entry.<internal>.md#itemid)

##### itemProp?

> `optional` **itemProp?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2836

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemProp`](@repo.ui.data-entry.<internal>.md#itemprop)

##### itemRef?

> `optional` **itemRef?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2840

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemRef`](@repo.ui.data-entry.<internal>.md#itemref)

##### itemScope?

> `optional` **itemScope?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2837

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemScope`](@repo.ui.data-entry.<internal>.md#itemscope)

##### itemType?

> `optional` **itemType?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2838

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`itemType`](@repo.ui.data-entry.<internal>.md#itemtype)

##### lang?

> `optional` **lang?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2804

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`lang`](@repo.ui.data-entry.<internal>.md#lang)

##### nonce?

> `optional` **nonce?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2805

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`nonce`](@repo.ui.data-entry.<internal>.md#nonce)

##### onAbort?

> `optional` **onAbort?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2327

###### Inherited from

`Omit.onAbort`

##### onAbortCapture?

> `optional` **onAbortCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2328

###### Inherited from

`Omit.onAbortCapture`

##### onAnimationEnd?

> `optional` **onAnimationEnd?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2457

###### Inherited from

`Omit.onAnimationEnd`

##### onAnimationEndCapture?

> `optional` **onAnimationEndCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2458

###### Inherited from

`Omit.onAnimationEndCapture`

##### onAnimationIteration?

> `optional` **onAnimationIteration?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2459

###### Inherited from

`Omit.onAnimationIteration`

##### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2460

###### Inherited from

`Omit.onAnimationIterationCapture`

##### onAnimationStart?

> `optional` **onAnimationStart?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2455

###### Inherited from

`Omit.onAnimationStart`

##### onAnimationStartCapture?

> `optional` **onAnimationStartCapture?**: [`AnimationEventHandler`](@repo.ui.data-entry.<internal>.md#animationeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2456

###### Inherited from

`Omit.onAnimationStartCapture`

##### onAuxClick?

> `optional` **onAuxClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2373

###### Inherited from

`Omit.onAuxClick`

##### onAuxClickCapture?

> `optional` **onAuxClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2374

###### Inherited from

`Omit.onAuxClickCapture`

##### onBeforeInput?

> `optional` **onBeforeInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2299

###### Inherited from

`Omit.onBeforeInput`

##### onBeforeInputCapture?

> `optional` **onBeforeInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2300

###### Inherited from

`Omit.onBeforeInputCapture`

##### onBeforeToggle?

> `optional` **onBeforeToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2464

###### Inherited from

`Omit.onBeforeToggle`

##### onBlur?

> `optional` **onBlur?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2293

###### Inherited from

`Omit.onBlur`

##### onBlurCapture?

> `optional` **onBlurCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2294

###### Inherited from

`Omit.onBlurCapture`

##### onCanPlay?

> `optional` **onCanPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2329

###### Inherited from

`Omit.onCanPlay`

##### onCanPlayCapture?

> `optional` **onCanPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2330

###### Inherited from

`Omit.onCanPlayCapture`

##### onCanPlayThrough?

> `optional` **onCanPlayThrough?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2331

###### Inherited from

`Omit.onCanPlayThrough`

##### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2332

###### Inherited from

`Omit.onCanPlayThroughCapture`

##### onChange?

> `optional` **onChange?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2297

###### Inherited from

`Omit.onChange`

##### onChangeCapture?

> `optional` **onChangeCapture?**: [`ChangeEventHandler`](@repo.ui.data-entry.<internal>.md#changeeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement), [`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2298

###### Inherited from

`Omit.onChangeCapture`

##### onClick?

> `optional` **onClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2375

###### Inherited from

`Omit.onClick`

##### onClickCapture?

> `optional` **onClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2376

###### Inherited from

`Omit.onClickCapture`

##### onClose?

> `optional` **onClose?**: () => `void`

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:20](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L20)

Called when the dialog is closed by the browser (Esc, backdrop click, etc.)

###### Returns

`void`

##### onCompositionEnd?

> `optional` **onCompositionEnd?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2283

###### Inherited from

`Omit.onCompositionEnd`

##### onCompositionEndCapture?

> `optional` **onCompositionEndCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2284

###### Inherited from

`Omit.onCompositionEndCapture`

##### onCompositionStart?

> `optional` **onCompositionStart?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2285

###### Inherited from

`Omit.onCompositionStart`

##### onCompositionStartCapture?

> `optional` **onCompositionStartCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2286

###### Inherited from

`Omit.onCompositionStartCapture`

##### onCompositionUpdate?

> `optional` **onCompositionUpdate?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2287

###### Inherited from

`Omit.onCompositionUpdate`

##### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture?**: [`CompositionEventHandler`](@repo.ui.data-entry.<internal>.md#compositioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2288

###### Inherited from

`Omit.onCompositionUpdateCapture`

##### onContextMenu?

> `optional` **onContextMenu?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2377

###### Inherited from

`Omit.onContextMenu`

##### onContextMenuCapture?

> `optional` **onContextMenuCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2378

###### Inherited from

`Omit.onContextMenuCapture`

##### onCopy?

> `optional` **onCopy?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2275

###### Inherited from

`Omit.onCopy`

##### onCopyCapture?

> `optional` **onCopyCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2276

###### Inherited from

`Omit.onCopyCapture`

##### onCut?

> `optional` **onCut?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2277

###### Inherited from

`Omit.onCut`

##### onCutCapture?

> `optional` **onCutCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2278

###### Inherited from

`Omit.onCutCapture`

##### onDoubleClick?

> `optional` **onDoubleClick?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2379

###### Inherited from

`Omit.onDoubleClick`

##### onDoubleClickCapture?

> `optional` **onDoubleClickCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2380

###### Inherited from

`Omit.onDoubleClickCapture`

##### onDrag?

> `optional` **onDrag?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2381

###### Inherited from

`Omit.onDrag`

##### onDragCapture?

> `optional` **onDragCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2382

###### Inherited from

`Omit.onDragCapture`

##### onDragEnd?

> `optional` **onDragEnd?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2383

###### Inherited from

`Omit.onDragEnd`

##### onDragEndCapture?

> `optional` **onDragEndCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2384

###### Inherited from

`Omit.onDragEndCapture`

##### onDragEnter?

> `optional` **onDragEnter?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2385

###### Inherited from

`Omit.onDragEnter`

##### onDragEnterCapture?

> `optional` **onDragEnterCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2386

###### Inherited from

`Omit.onDragEnterCapture`

##### onDragExit?

> `optional` **onDragExit?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2387

###### Inherited from

`Omit.onDragExit`

##### onDragExitCapture?

> `optional` **onDragExitCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2388

###### Inherited from

`Omit.onDragExitCapture`

##### onDragLeave?

> `optional` **onDragLeave?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2389

###### Inherited from

`Omit.onDragLeave`

##### onDragLeaveCapture?

> `optional` **onDragLeaveCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2390

###### Inherited from

`Omit.onDragLeaveCapture`

##### onDragOver?

> `optional` **onDragOver?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2391

###### Inherited from

`Omit.onDragOver`

##### onDragOverCapture?

> `optional` **onDragOverCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2392

###### Inherited from

`Omit.onDragOverCapture`

##### onDragStart?

> `optional` **onDragStart?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2393

###### Inherited from

`Omit.onDragStart`

##### onDragStartCapture?

> `optional` **onDragStartCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2394

###### Inherited from

`Omit.onDragStartCapture`

##### onDrop?

> `optional` **onDrop?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2395

###### Inherited from

`Omit.onDrop`

##### onDropCapture?

> `optional` **onDropCapture?**: [`DragEventHandler`](@repo.ui.data-entry.<internal>.md#drageventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2396

###### Inherited from

`Omit.onDropCapture`

##### onDurationChange?

> `optional` **onDurationChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2333

###### Inherited from

`Omit.onDurationChange`

##### onDurationChangeCapture?

> `optional` **onDurationChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2334

###### Inherited from

`Omit.onDurationChangeCapture`

##### onEmptied?

> `optional` **onEmptied?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2335

###### Inherited from

`Omit.onEmptied`

##### onEmptiedCapture?

> `optional` **onEmptiedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2336

###### Inherited from

`Omit.onEmptiedCapture`

##### onEncrypted?

> `optional` **onEncrypted?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2337

###### Inherited from

`Omit.onEncrypted`

##### onEncryptedCapture?

> `optional` **onEncryptedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2338

###### Inherited from

`Omit.onEncryptedCapture`

##### onEnded?

> `optional` **onEnded?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2339

###### Inherited from

`Omit.onEnded`

##### onEndedCapture?

> `optional` **onEndedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2340

###### Inherited from

`Omit.onEndedCapture`

##### onError?

> `optional` **onError?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2313

###### Inherited from

`Omit.onError`

##### onErrorCapture?

> `optional` **onErrorCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2314

###### Inherited from

`Omit.onErrorCapture`

##### onFocus?

> `optional` **onFocus?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2291

###### Inherited from

`Omit.onFocus`

##### onFocusCapture?

> `optional` **onFocusCapture?**: [`FocusEventHandler`](@repo.ui.data-entry.<internal>.md#focuseventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2292

###### Inherited from

`Omit.onFocusCapture`

##### onGotPointerCapture?

> `optional` **onGotPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2439

###### Inherited from

`Omit.onGotPointerCapture`

##### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2440

###### Inherited from

`Omit.onGotPointerCaptureCapture`

##### onInput?

> `optional` **onInput?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2301

###### Inherited from

`Omit.onInput`

##### onInputCapture?

> `optional` **onInputCapture?**: [`InputEventHandler`](@repo.ui.data-entry.<internal>.md#inputeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2302

###### Inherited from

`Omit.onInputCapture`

##### onInvalid?

> `optional` **onInvalid?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2307

###### Inherited from

`Omit.onInvalid`

##### onInvalidCapture?

> `optional` **onInvalidCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2308

###### Inherited from

`Omit.onInvalidCapture`

##### onKeyDown?

> `optional` **onKeyDown?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2317

###### Inherited from

`Omit.onKeyDown`

##### onKeyDownCapture?

> `optional` **onKeyDownCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2318

###### Inherited from

`Omit.onKeyDownCapture`

##### ~~onKeyPress?~~

> `optional` **onKeyPress?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2320

###### Deprecated

Use `onKeyUp` or `onKeyDown` instead

###### Inherited from

`Omit.onKeyPress`

##### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2322

###### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

###### Inherited from

`Omit.onKeyPressCapture`

##### onKeyUp?

> `optional` **onKeyUp?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2323

###### Inherited from

`Omit.onKeyUp`

##### onKeyUpCapture?

> `optional` **onKeyUpCapture?**: [`KeyboardEventHandler`](@repo.ui.data-entry.<internal>.md#keyboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2324

###### Inherited from

`Omit.onKeyUpCapture`

##### onLoad?

> `optional` **onLoad?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2311

###### Inherited from

`Omit.onLoad`

##### onLoadCapture?

> `optional` **onLoadCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2312

###### Inherited from

`Omit.onLoadCapture`

##### onLoadedData?

> `optional` **onLoadedData?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2341

###### Inherited from

`Omit.onLoadedData`

##### onLoadedDataCapture?

> `optional` **onLoadedDataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2342

###### Inherited from

`Omit.onLoadedDataCapture`

##### onLoadedMetadata?

> `optional` **onLoadedMetadata?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2343

###### Inherited from

`Omit.onLoadedMetadata`

##### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2344

###### Inherited from

`Omit.onLoadedMetadataCapture`

##### onLoadStart?

> `optional` **onLoadStart?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2345

###### Inherited from

`Omit.onLoadStart`

##### onLoadStartCapture?

> `optional` **onLoadStartCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2346

###### Inherited from

`Omit.onLoadStartCapture`

##### onLostPointerCapture?

> `optional` **onLostPointerCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2441

###### Inherited from

`Omit.onLostPointerCapture`

##### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2442

###### Inherited from

`Omit.onLostPointerCaptureCapture`

##### onMouseDown?

> `optional` **onMouseDown?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2397

###### Inherited from

`Omit.onMouseDown`

##### onMouseDownCapture?

> `optional` **onMouseDownCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2398

###### Inherited from

`Omit.onMouseDownCapture`

##### onMouseEnter?

> `optional` **onMouseEnter?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2399

###### Inherited from

`Omit.onMouseEnter`

##### onMouseLeave?

> `optional` **onMouseLeave?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2400

###### Inherited from

`Omit.onMouseLeave`

##### onMouseMove?

> `optional` **onMouseMove?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2401

###### Inherited from

`Omit.onMouseMove`

##### onMouseMoveCapture?

> `optional` **onMouseMoveCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2402

###### Inherited from

`Omit.onMouseMoveCapture`

##### onMouseOut?

> `optional` **onMouseOut?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2403

###### Inherited from

`Omit.onMouseOut`

##### onMouseOutCapture?

> `optional` **onMouseOutCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2404

###### Inherited from

`Omit.onMouseOutCapture`

##### onMouseOver?

> `optional` **onMouseOver?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2405

###### Inherited from

`Omit.onMouseOver`

##### onMouseOverCapture?

> `optional` **onMouseOverCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2406

###### Inherited from

`Omit.onMouseOverCapture`

##### onMouseUp?

> `optional` **onMouseUp?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2407

###### Inherited from

`Omit.onMouseUp`

##### onMouseUpCapture?

> `optional` **onMouseUpCapture?**: [`MouseEventHandler`](@repo.ui.data-entry.<internal>.md#mouseeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2408

###### Inherited from

`Omit.onMouseUpCapture`

##### onPaste?

> `optional` **onPaste?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2279

###### Inherited from

`Omit.onPaste`

##### onPasteCapture?

> `optional` **onPasteCapture?**: [`ClipboardEventHandler`](@repo.ui.data-entry.<internal>.md#clipboardeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2280

###### Inherited from

`Omit.onPasteCapture`

##### onPause?

> `optional` **onPause?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2347

###### Inherited from

`Omit.onPause`

##### onPauseCapture?

> `optional` **onPauseCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2348

###### Inherited from

`Omit.onPauseCapture`

##### onPlay?

> `optional` **onPlay?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2349

###### Inherited from

`Omit.onPlay`

##### onPlayCapture?

> `optional` **onPlayCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2350

###### Inherited from

`Omit.onPlayCapture`

##### onPlaying?

> `optional` **onPlaying?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2351

###### Inherited from

`Omit.onPlaying`

##### onPlayingCapture?

> `optional` **onPlayingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2352

###### Inherited from

`Omit.onPlayingCapture`

##### onPointerCancel?

> `optional` **onPointerCancel?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2431

###### Inherited from

`Omit.onPointerCancel`

##### onPointerCancelCapture?

> `optional` **onPointerCancelCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2432

###### Inherited from

`Omit.onPointerCancelCapture`

##### onPointerDown?

> `optional` **onPointerDown?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2425

###### Inherited from

`Omit.onPointerDown`

##### onPointerDownCapture?

> `optional` **onPointerDownCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2426

###### Inherited from

`Omit.onPointerDownCapture`

##### onPointerEnter?

> `optional` **onPointerEnter?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2433

###### Inherited from

`Omit.onPointerEnter`

##### onPointerLeave?

> `optional` **onPointerLeave?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2434

###### Inherited from

`Omit.onPointerLeave`

##### onPointerMove?

> `optional` **onPointerMove?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2427

###### Inherited from

`Omit.onPointerMove`

##### onPointerMoveCapture?

> `optional` **onPointerMoveCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2428

###### Inherited from

`Omit.onPointerMoveCapture`

##### onPointerOut?

> `optional` **onPointerOut?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2437

###### Inherited from

`Omit.onPointerOut`

##### onPointerOutCapture?

> `optional` **onPointerOutCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2438

###### Inherited from

`Omit.onPointerOutCapture`

##### onPointerOver?

> `optional` **onPointerOver?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2435

###### Inherited from

`Omit.onPointerOver`

##### onPointerOverCapture?

> `optional` **onPointerOverCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2436

###### Inherited from

`Omit.onPointerOverCapture`

##### onPointerUp?

> `optional` **onPointerUp?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2429

###### Inherited from

`Omit.onPointerUp`

##### onPointerUpCapture?

> `optional` **onPointerUpCapture?**: [`PointerEventHandler`](@repo.ui.data-entry.<internal>.md#pointereventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2430

###### Inherited from

`Omit.onPointerUpCapture`

##### onProgress?

> `optional` **onProgress?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2353

###### Inherited from

`Omit.onProgress`

##### onProgressCapture?

> `optional` **onProgressCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2354

###### Inherited from

`Omit.onProgressCapture`

##### onRateChange?

> `optional` **onRateChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2355

###### Inherited from

`Omit.onRateChange`

##### onRateChangeCapture?

> `optional` **onRateChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2356

###### Inherited from

`Omit.onRateChangeCapture`

##### onReset?

> `optional` **onReset?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2303

###### Inherited from

`Omit.onReset`

##### onResetCapture?

> `optional` **onResetCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2304

###### Inherited from

`Omit.onResetCapture`

##### onScroll?

> `optional` **onScroll?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2445

###### Inherited from

`Omit.onScroll`

##### onScrollCapture?

> `optional` **onScrollCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2446

###### Inherited from

`Omit.onScrollCapture`

##### onScrollEnd?

> `optional` **onScrollEnd?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2447

###### Inherited from

`Omit.onScrollEnd`

##### onScrollEndCapture?

> `optional` **onScrollEndCapture?**: [`UIEventHandler`](@repo.ui.data-entry.<internal>.md#uieventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2448

###### Inherited from

`Omit.onScrollEndCapture`

##### onSeeked?

> `optional` **onSeeked?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2357

###### Inherited from

`Omit.onSeeked`

##### onSeekedCapture?

> `optional` **onSeekedCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2358

###### Inherited from

`Omit.onSeekedCapture`

##### onSeeking?

> `optional` **onSeeking?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2359

###### Inherited from

`Omit.onSeeking`

##### onSeekingCapture?

> `optional` **onSeekingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2360

###### Inherited from

`Omit.onSeekingCapture`

##### onSelect?

> `optional` **onSelect?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2411

###### Inherited from

`Omit.onSelect`

##### onSelectCapture?

> `optional` **onSelectCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2412

###### Inherited from

`Omit.onSelectCapture`

##### onStalled?

> `optional` **onStalled?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2361

###### Inherited from

`Omit.onStalled`

##### onStalledCapture?

> `optional` **onStalledCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2362

###### Inherited from

`Omit.onStalledCapture`

##### onSubmit?

> `optional` **onSubmit?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2305

###### Inherited from

`Omit.onSubmit`

##### onSubmitCapture?

> `optional` **onSubmitCapture?**: [`SubmitEventHandler`](@repo.ui.data-entry.<internal>.md#submiteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2306

###### Inherited from

`Omit.onSubmitCapture`

##### onSuspend?

> `optional` **onSuspend?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2363

###### Inherited from

`Omit.onSuspend`

##### onSuspendCapture?

> `optional` **onSuspendCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2364

###### Inherited from

`Omit.onSuspendCapture`

##### onTimeUpdate?

> `optional` **onTimeUpdate?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2365

###### Inherited from

`Omit.onTimeUpdate`

##### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2366

###### Inherited from

`Omit.onTimeUpdateCapture`

##### onToggle?

> `optional` **onToggle?**: [`ToggleEventHandler`](@repo.ui.data-entry.<internal>.md#toggleeventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2463

###### Inherited from

`Omit.onToggle`

##### onTouchCancel?

> `optional` **onTouchCancel?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2415

###### Inherited from

`Omit.onTouchCancel`

##### onTouchCancelCapture?

> `optional` **onTouchCancelCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2416

###### Inherited from

`Omit.onTouchCancelCapture`

##### onTouchEnd?

> `optional` **onTouchEnd?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2417

###### Inherited from

`Omit.onTouchEnd`

##### onTouchEndCapture?

> `optional` **onTouchEndCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2418

###### Inherited from

`Omit.onTouchEndCapture`

##### onTouchMove?

> `optional` **onTouchMove?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2419

###### Inherited from

`Omit.onTouchMove`

##### onTouchMoveCapture?

> `optional` **onTouchMoveCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2420

###### Inherited from

`Omit.onTouchMoveCapture`

##### onTouchStart?

> `optional` **onTouchStart?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2421

###### Inherited from

`Omit.onTouchStart`

##### onTouchStartCapture?

> `optional` **onTouchStartCapture?**: [`TouchEventHandler`](@repo.ui.data-entry.<internal>.md#toucheventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2422

###### Inherited from

`Omit.onTouchStartCapture`

##### onTransitionCancel?

> `optional` **onTransitionCancel?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2467

###### Inherited from

`Omit.onTransitionCancel`

##### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2468

###### Inherited from

`Omit.onTransitionCancelCapture`

##### onTransitionEnd?

> `optional` **onTransitionEnd?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2469

###### Inherited from

`Omit.onTransitionEnd`

##### onTransitionEndCapture?

> `optional` **onTransitionEndCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2470

###### Inherited from

`Omit.onTransitionEndCapture`

##### onTransitionRun?

> `optional` **onTransitionRun?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2471

###### Inherited from

`Omit.onTransitionRun`

##### onTransitionRunCapture?

> `optional` **onTransitionRunCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2472

###### Inherited from

`Omit.onTransitionRunCapture`

##### onTransitionStart?

> `optional` **onTransitionStart?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2473

###### Inherited from

`Omit.onTransitionStart`

##### onTransitionStartCapture?

> `optional` **onTransitionStartCapture?**: [`TransitionEventHandler`](@repo.ui.data-entry.<internal>.md#transitioneventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2474

###### Inherited from

`Omit.onTransitionStartCapture`

##### onVolumeChange?

> `optional` **onVolumeChange?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2367

###### Inherited from

`Omit.onVolumeChange`

##### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2368

###### Inherited from

`Omit.onVolumeChangeCapture`

##### onWaiting?

> `optional` **onWaiting?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2369

###### Inherited from

`Omit.onWaiting`

##### onWaitingCapture?

> `optional` **onWaitingCapture?**: [`ReactEventHandler`](@repo.ui.data-entry.<internal>.md#reacteventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2370

###### Inherited from

`Omit.onWaitingCapture`

##### onWheel?

> `optional` **onWheel?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2451

###### Inherited from

`Omit.onWheel`

##### onWheelCapture?

> `optional` **onWheelCapture?**: [`WheelEventHandler`](@repo.ui.data-entry.<internal>.md#wheeleventhandler)\<[`HTMLDialogElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmldialogelement)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2452

###### Inherited from

`Omit.onWheelCapture`

##### open?

> `optional` **open?**: `boolean`

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L18)

Controls whether the dialog is open (required for stateless mode)

##### part?

> `optional` **part?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2872

###### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

###### Inherited from

[`WebViewHTMLAttributes`](@repo.ui.cards.<internal>.md#webviewhtmlattributes).[`part`](@repo.ui.cards.<internal>.md#part-70)

##### popover?

> `optional` **popover?**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2846

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popover`](@repo.ui.data-entry.<internal>.md#popover)

##### popoverTarget?

> `optional` **popoverTarget?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2848

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTarget`](@repo.ui.data-entry.<internal>.md#popovertarget)

##### popoverTargetAction?

> `optional` **popoverTargetAction?**: `"toggle"` \| `"show"` \| `"hide"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2847

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`popoverTargetAction`](@repo.ui.data-entry.<internal>.md#popovertargetaction)

##### prefix?

> `optional` **prefix?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2824

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`prefix`](@repo.ui.data-entry.<internal>.md#prefix)

##### property?

> `optional` **property?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2825

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`property`](@repo.ui.data-entry.<internal>.md#property)

##### radioGroup?

> `optional` **radioGroup?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2814

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`radioGroup`](@repo.ui.data-entry.<internal>.md#radiogroup)

##### rel?

> `optional` **rel?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2826

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rel`](@repo.ui.data-entry.<internal>.md#rel)

##### resource?

> `optional` **resource?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2827

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`resource`](@repo.ui.data-entry.<internal>.md#resource)

##### results?

> `optional` **results?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2841

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`results`](@repo.ui.data-entry.<internal>.md#results)

##### rev?

> `optional` **rev?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2828

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`rev`](@repo.ui.data-entry.<internal>.md#rev)

##### role?

> `optional` **role?**: [`AriaRole`](@repo.ui.data-entry.<internal>.md#ariarole)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2817

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`role`](@repo.ui.data-entry.<internal>.md#role)

##### security?

> `optional` **security?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2842

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`security`](@repo.ui.data-entry.<internal>.md#security)

##### size?

> `optional` **size?**: `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"full"` \| `null`

Defined in: [packages/ui/src/components/feedback/dialog/variants.ts:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/variants.ts#L7)

###### Inherited from

`DialogVariants.size`

##### slot?

> `optional` **slot?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2806

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`slot`](@repo.ui.data-entry.<internal>.md#slot)

##### spellCheck?

> `optional` **spellCheck?**: [`Booleanish`](@repo.ui.data-entry.<internal>.md#booleanish)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2807

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`spellCheck`](@repo.ui.data-entry.<internal>.md#spellcheck)

##### style?

> `optional` **style?**: [`CSSProperties`](@repo.ui.data-entry.<internal>.md#cssproperties)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2808

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`style`](@repo.ui.data-entry.<internal>.md#style)

##### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2789

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressContentEditableWarning`](@repo.ui.data-entry.<internal>.md#suppresscontenteditablewarning)

##### suppressHydrationWarning?

> `optional` **suppressHydrationWarning?**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2790

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`suppressHydrationWarning`](@repo.ui.data-entry.<internal>.md#suppresshydrationwarning)

##### tabIndex?

> `optional` **tabIndex?**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2809

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`tabIndex`](@repo.ui.data-entry.<internal>.md#tabindex)

##### title?

> `optional` **title?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2810

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`title`](@repo.ui.data-entry.<internal>.md#title)

##### translate?

> `optional` **translate?**: `"yes"` \| `"no"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2811

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`translate`](@repo.ui.data-entry.<internal>.md#translate-1)

##### typeof?

> `optional` **typeof?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2829

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`typeof`](@repo.ui.data-entry.<internal>.md#typeof-2)

##### unselectable?

> `optional` **unselectable?**: `"off"` \| `"on"`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2843

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`unselectable`](@repo.ui.data-entry.<internal>.md#unselectable)

##### vocab?

> `optional` **vocab?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:2830

###### Inherited from

[`HTMLAttributes`](@repo.ui.data-entry.<internal>.md#htmlattributes).[`vocab`](@repo.ui.data-entry.<internal>.md#vocab)

***

### ErrorBoundaryProps

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:7](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L7)

#### Properties

##### children

> **children**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:8](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L8)

##### fallback?

> `optional` **fallback?**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode) \| [`FallbackRenderer`](#fallbackrenderer)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:9](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L9)

##### onError?

> `optional` **onError?**: (`error`, `info`) => `void`

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L11)

###### Parameters

###### error

`Error`

###### info

[`ErrorInfo`](@repo.ui.data-entry.<internal>.md#errorinfo)

###### Returns

`void`

##### variant?

> `optional` **variant?**: [`ColorVariant`](@repo.ui.feedback.<internal>.md#colorvariant)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L10)

***

### ToastProviderProps

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:81](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L81)

#### Properties

##### children

> **children**: [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:85](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L85)

##### dismiss

> **dismiss**: (`id`) => `void`

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:84](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L84)

###### Parameters

###### id

`number`

###### Returns

`void`

##### toast

> **toast**: (`options`) => `number`

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:83](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L83)

###### Parameters

###### options

[`ToastOptions`](@repo.ui.feedback.<internal>.md#toastoptions)

###### Returns

`number`

##### toasts

> **toasts**: [`ToastItem`](@repo.ui.feedback.<internal>.md#toastitem)[]

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:82](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L82)

## Type Aliases

### DefaultFallbackVariants

> **DefaultFallbackVariants** = [`VariantProps`](@repo.ui.data-entry.<internal>.md#variantprops)\<*typeof* [`defaultFallbackVariants`](#defaultfallbackvariants-1)\>

Defined in: [packages/ui/src/components/feedback/default-fallback/variants.ts:31](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/variants.ts#L31)

***

### FallbackIconColor

> **FallbackIconColor** = *typeof* [`fallbackIconColor`](#fallbackiconcolor-1)

Defined in: [packages/ui/src/components/feedback/default-fallback/variants.ts:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/variants.ts#L32)

***

### FallbackRenderer

> **FallbackRenderer** = (`props`) => [`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

Defined in: [packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/error-boundary/ErrorBoundary.tsx#L5)

#### Parameters

##### props

###### error

`Error`

###### reset

() => `void`

#### Returns

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

## Variables

### alertVariants

> `const` **alertVariants**: (`props?`) => `string`

Defined in: [packages/ui/src/components/feedback/alert/variants.ts:3](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/variants.ts#L3)

#### Parameters

##### props?

ConfigVariants\<\{ variant: \{ default: string; primary: string; secondary: string; accent: string; warning: string; destructive: string; \}; \}\> & ClassProp

#### Returns

`string`

***

### defaultFallbackVariants

> `const` **defaultFallbackVariants**: (`props?`) => `string`

Defined in: [packages/ui/src/components/feedback/default-fallback/variants.ts:5](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/variants.ts#L5)

#### Parameters

##### props?

ConfigVariants\<\{ variant: \{ default: string; primary: string; secondary: string; accent: string; warning: string; destructive: string; \}; \}\> & ClassProp

#### Returns

`string`

***

### fallbackIconColor

> `const` **fallbackIconColor**: [`Record`](@repo.ui.feedback.<internal>.md#record)\<[`ColorVariant`](@repo.ui.feedback.<internal>.md#colorvariant), `string`\>

Defined in: [packages/ui/src/components/feedback/default-fallback/variants.ts:22](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/variants.ts#L22)

## Functions

### Alert()

> **Alert**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/alert/Alert.tsx:32](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/alert/Alert.tsx#L32)

#### Parameters

##### \_\_namedParameters

[`AlertProps`](#alertprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DefaultFallback()

> **DefaultFallback**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/default-fallback/DefaultFallback.tsx#L18)

#### Parameters

##### \_\_namedParameters

[`DefaultFallbackProps`](#defaultfallbackprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### Dialog()

> **Dialog**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:24](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L24)

#### Parameters

##### \_\_namedParameters

[`DialogProps`](#dialogprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DialogActions()

> **DialogActions**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:68](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L68)

#### Parameters

##### \_\_namedParameters

###### cancelLabel?

`string` = `'Cancel'`

###### confirmLabel?

`string` = `'Confirm'`

###### onConfirm?

() => `void`

###### onOpenChange

(`open`) => `void`

###### open

`boolean`

###### variant?

`"default"` \| `"primary"` \| `"secondary"` \| `"accent"` \| `"warning"` \| `"destructive"` \| `"outline"` \| `"link"` \| `null`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DialogBody()

> **DialogBody**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:46](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L46)

#### Parameters

##### \_\_namedParameters

###### children

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

###### className?

`string`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DialogDescription()

> **DialogDescription**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:54](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L54)

#### Parameters

##### \_\_namedParameters

###### children

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

###### className?

`string`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DialogFooter()

> **DialogFooter**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:64](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L64)

#### Parameters

##### \_\_namedParameters

###### children

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

###### className?

`string`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### DialogTitle()

> **DialogTitle**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/dialog/Dialog.tsx:50](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/dialog/Dialog.tsx#L50)

#### Parameters

##### \_\_namedParameters

###### children

[`ReactNode`](@repo.ui.data-entry.<internal>.md#reactnode)

###### className?

`string`

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### ToastProvider()

> **ToastProvider**(`__namedParameters`): [`Element`](@repo.ui.icons.<internal>.md#element)

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:88](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L88)

#### Parameters

##### \_\_namedParameters

[`ToastProviderProps`](#toastproviderprops)

#### Returns

[`Element`](@repo.ui.icons.<internal>.md#element)

***

### ToastViewport()

> **ToastViewport**(`__namedParameters`): [`ReactPortal`](@repo.ui.data-entry.<internal>.md#reactportal) \| `null`

Defined in: [packages/ui/src/components/feedback/toast/Toast.tsx:27](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/Toast.tsx#L27)

#### Parameters

##### \_\_namedParameters

###### onDismiss

(`id`) => `void`

###### toasts

[`ToastItem`](@repo.ui.feedback.<internal>.md#toastitem)[]

#### Returns

[`ReactPortal`](@repo.ui.data-entry.<internal>.md#reactportal) \| `null`

***

### useToast()

> **useToast**(): [`ToastContextValue`](@repo.ui.feedback.<internal>.md#toastcontextvalue)

Defined in: [packages/ui/src/components/feedback/toast/useToast.ts:11](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/ui/src/components/feedback/toast/useToast.ts#L11)

#### Returns

[`ToastContextValue`](@repo.ui.feedback.<internal>.md#toastcontextvalue)
