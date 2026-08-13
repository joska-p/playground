---
title: App (internal)
package: "@repo/pixel"
kind: internal
module: App
---

## Classes

### Component

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:909

#### Extends

- [`ComponentLifecycle`](#componentlifecycle)\<`P`, `S`, `SS`\>

#### Type Parameters

##### P

`P` = \{ \}

##### S

`S` = \{ \}

##### SS

`SS` = `any`

#### Constructors

##### Constructor

> **new Component**\<`P`, `S`, `SS`\>(`props`): [`Component`](#component)\<`P`, `S`, `SS`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:958

###### Parameters

###### props

`P`

###### Returns

[`Component`](#component)\<`P`, `S`, `SS`\>

###### Inherited from

`ComponentLifecycle<P, S, SS>.constructor`

##### Constructor

> **new Component**\<`P`, `S`, `SS`\>(`props`, `context`): [`Component`](#component)\<`P`, `S`, `SS`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:966

###### Parameters

###### props

`P`

###### context

`any`

value of the parent [Context](https://react.dev/reference/react/Component#context) specified
in `contextType`.

###### Returns

[`Component`](#component)\<`P`, `S`, `SS`\>

###### Inherited from

`ComponentLifecycle<P, S, SS>.constructor`

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

##### contextType?

> `static` `optional` **contextType?**: [`Context`](#context-1)\<`any`\>

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

##### props

> `readonly` **props**: [`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:979

##### ~~propTypes?~~

> `static` `optional` **propTypes?**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:937

Ignored by React.

###### Deprecated

Only kept in types for backwards compatibility. Will be removed in a future major release.

##### state

> **state**: [`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:980

#### Methods

##### componentDidCatch()?

> `optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1219

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

###### Parameters

###### error

`Error`

###### errorInfo

[`ErrorInfo`](#errorinfo)

###### Returns

`void`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentDidCatch`](#componentdidcatch-1)

##### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1198

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

###### Returns

`void`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentDidMount`](#componentdidmount-1)

##### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1261

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2) is present and returns non-null.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### snapshot?

`SS`

###### Returns

`void`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentDidUpdate`](#componentdidupdate-1)

##### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1277

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentWillMount`](#componentwillmount-1)

##### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1308

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentWillReceiveProps`](#componentwillreceiveprops-1)

##### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1214

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

###### Returns

`void`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`componentWillUnmount`](#componentwillunmount-1)

##### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1340

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

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

[`ComponentLifecycle`](#componentlifecycle).[`componentWillUpdate`](#componentwillupdate-1)

##### forceUpdate()

> **forceUpdate**(`callback?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:976

###### Parameters

###### callback?

() => `void`

###### Returns

`void`

##### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `SS` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1255

Runs before React applies the result of [render](#) to the document, and
returns an object to be given to [componentDidUpdate](#componentdidupdate-2). Useful for saving
things such as scroll position before [render](#) causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### Returns

`SS` \| `null`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate-1)

##### render()

> **render**(): [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:977

###### Returns

[`ReactNode`](#reactnode)

##### setState()

> **setState**\<`K`\>(`state`, `callback?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:971

###### Type Parameters

###### K

`K` *extends* `string` \| `number` \| `symbol`

###### Parameters

###### state

`S` \| ((`prevState`, `props`) => `S` \| [`Pick`](#pick)\<`S`, `K`\> \| `null`) \| [`Pick`](#pick)\<`S`, `K`\> \| `null`

###### callback?

() => `void`

###### Returns

`void`

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

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### nextContext

`any`

###### Returns

`boolean`

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`shouldComponentUpdate`](#shouldcomponentupdate-1)

##### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1292

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`UNSAFE_componentWillMount`](#unsafe_componentwillmount-1)

##### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1326

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`ComponentLifecycle`](#componentlifecycle).[`UNSAFE_componentWillReceiveProps`](#unsafe_componentwillreceiveprops-1)

##### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1356

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

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

[`ComponentLifecycle`](#componentlifecycle).[`UNSAFE_componentWillUpdate`](#unsafe_componentwillupdate-1)

## Interfaces

### ComponentLifecycle

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1194

#### Extends

- [`NewLifecycle`](#newlifecycle)\<`P`, `S`, `SS`\>.[`DeprecatedLifecycle`](#deprecatedlifecycle)\<`P`, `S`\>

#### Extended by

- [`Component`](#component)

#### Type Parameters

##### P

`P`

##### S

`S`

##### SS

`SS` = `any`

#### Methods

##### componentDidCatch()?

> `optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1219

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

###### Parameters

###### error

`Error`

###### errorInfo

[`ErrorInfo`](#errorinfo)

###### Returns

`void`

##### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1198

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

###### Returns

`void`

##### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1261

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2) is present and returns non-null.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### snapshot?

`SS`

###### Returns

`void`

###### Inherited from

[`NewLifecycle`](#newlifecycle).[`componentDidUpdate`](#componentdidupdate-2)

##### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1277

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`componentWillMount`](#componentwillmount-2)

##### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1308

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`componentWillReceiveProps`](#componentwillreceiveprops-2)

##### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1214

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

###### Returns

`void`

##### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1340

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

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

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`componentWillUpdate`](#componentwillupdate-2)

##### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `SS` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1255

Runs before React applies the result of [render](#) to the document, and
returns an object to be given to [componentDidUpdate](#componentdidupdate-2). Useful for saving
things such as scroll position before [render](#) causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### Returns

`SS` \| `null`

###### Inherited from

[`NewLifecycle`](#newlifecycle).[`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate-2)

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

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### nextContext

`any`

###### Returns

`boolean`

##### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1292

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`UNSAFE_componentWillMount`](#unsafe_componentwillmount-2)

##### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1326

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

###### Inherited from

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`UNSAFE_componentWillReceiveProps`](#unsafe_componentwillreceiveprops-2)

##### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1356

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

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

[`DeprecatedLifecycle`](#deprecatedlifecycle).[`UNSAFE_componentWillUpdate`](#unsafe_componentwillupdate-2)

***

### ConsumerProps

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:554

Describes the props accepted by a Context [Consumer](#consumer-1).

#### Type Parameters

##### T

`T`

The type of the value the context provides.

#### Properties

##### children

> **children**: (`value`) => [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:555

###### Parameters

###### value

`T`

###### Returns

[`ReactNode`](#reactnode)

***

### Context()

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:678

Context lets components pass information deep down without explicitly
passing props.

Created from [createContext](#)

#### See

 - [React Docs](https://react.dev/learn/passing-data-deeply-with-context)
 - [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)

#### Example

```tsx
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

#### Extends

- [`Provider`](#provider-1)\<`T`\>

#### Type Parameters

##### T

`T`

> **Context**(`props`): [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:678

Context lets components pass information deep down without explicitly
passing props.

Created from [createContext](#)

#### Parameters

##### props

[`ProviderProps`](#providerprops)

#### Returns

[`ReactNode`](#reactnode)

#### See

 - [React Docs](https://react.dev/learn/passing-data-deeply-with-context)
 - [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)

#### Example

```tsx
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

#### Properties

##### $$typeof

> `readonly` **$$typeof**: `symbol`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:572

###### Inherited from

`Provider.$$typeof`

##### Consumer

> **Consumer**: [`Consumer`](#consumer-1)\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:680

##### displayName?

> `optional` **displayName?**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:688

Used in debugging messages. You might want to set it
explicitly if you want to display a different name for
debugging purposes.

###### See

[Legacy React Docs](https://legacy.reactjs.org/docs/react-component.html#displayname)

##### Provider

> **Provider**: [`Provider`](#provider-1)\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:679

***

### DeprecatedLifecycle

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1264

#### Extended by

- [`ComponentLifecycle`](#componentlifecycle)

#### Type Parameters

##### P

`P`

##### S

`S`

#### Methods

##### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1277

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

##### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1308

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

##### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1340

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

##### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1292

Called immediately before mounting occurs, and before [Component.render](#).
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Returns

`void`

###### Deprecated

16.3, use [componentDidMount](#componentdidmount-1) or the constructor instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

##### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1326

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [Component.setState](#) generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use static [getDerivedStateFromProps](#) instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

##### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1356

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [Component.setState](#) here.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2)
or [getDerivedStateFromProps](#) prevents
this from being invoked.

###### Parameters

###### nextProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### nextState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### nextContext

`any`

###### Returns

`void`

###### Deprecated

16.3, use getSnapshotBeforeUpdate instead

###### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

***

### DO\_NOT\_USE\_OR\_YOU\_WILL\_BE\_FIRED\_EXPERIMENTAL\_REACT\_NODES

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:404

Different release channels declare additional types of ReactNode this particular release channel accepts.
App or library types should never augment this interface.

***

### Element

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:4145

Represents a JSX element.

Where [ReactNode](#reactnode) represents everything that can be rendered, `ReactElement`
only represents JSX.

#### Example

```tsx
const element: ReactElement = <div />;
```

#### Extends

- [`ReactElement`](#reactelement)\<`any`, `any`\>

#### Properties

##### key

> **key**: `string` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:331

###### Inherited from

[`ReactElement`](#reactelement).[`key`](#key-1)

##### props

> **props**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:330

###### Inherited from

[`ReactElement`](#reactelement).[`props`](#props-2)

##### type

> **type**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:329

###### Inherited from

[`ReactElement`](#reactelement).[`type`](#type-1)

***

### ErrorInfo

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:4125

#### Properties

##### componentStack?

> `optional` **componentStack?**: `string` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:4129

Captures which component contained the exception, and its ancestors.

***

### ExoticComponent()

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:570

An object masquerading as a component. These are created by functions
like [forwardRef](#), [memo](#), and [createContext](#).

In order to make TypeScript work, we pretend that they are normal
components.

But they are, in fact, not callable - instead, they are objects which
are treated specially by the renderer.

#### Extended by

- [`ProviderExoticComponent`](#providerexoticcomponent)

#### Type Parameters

##### P

`P` = \{ \}

The props the component accepts.

> **ExoticComponent**(`props`): [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:571

An object masquerading as a component. These are created by functions
like [forwardRef](#), [memo](#), and [createContext](#).

In order to make TypeScript work, we pretend that they are normal
components.

But they are, in fact, not callable - instead, they are objects which
are treated specially by the renderer.

#### Parameters

##### props

`P`

#### Returns

[`ReactNode`](#reactnode)

#### Properties

##### $$typeof

> `readonly` **$$typeof**: `symbol`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:572

***

### Iterable

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:46

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

##### TNext

`TNext` = `any`

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): [`Iterator`](#iterator-1)\<`T`, `TReturn`, `TNext`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:47

###### Returns

[`Iterator`](#iterator-1)\<`T`, `TReturn`, `TNext`\>

***

### Iterator

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:39

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

##### TNext

`TNext` = `any`

#### Methods

##### next()

> **next**(...`__namedParameters`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:41

###### Parameters

###### \_\_namedParameters

\[\] \| \[`TNext`\]

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

##### return()?

> `optional` **return**(`value?`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:42

###### Parameters

###### value?

`TReturn`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

##### throw()?

> `optional` **throw**(`e?`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:43

###### Parameters

###### e?

`any`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

***

### IteratorReturnResult

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:32

#### Type Parameters

##### TReturn

`TReturn`

#### Properties

##### done

> **done**: `true`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:33

##### value

> **value**: `TReturn`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:34

***

### IteratorYieldResult

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:27

#### Type Parameters

##### TYield

`TYield`

#### Properties

##### done?

> `optional` **done?**: `false`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:28

##### value

> **value**: `TYield`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:29

***

### NewLifecycle

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1246

#### Extended by

- [`ComponentLifecycle`](#componentlifecycle)

#### Type Parameters

##### P

`P`

##### S

`S`

##### SS

`SS`

#### Methods

##### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1261

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate-2) is present and returns non-null.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### snapshot?

`SS`

###### Returns

`void`

##### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `SS` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:1255

Runs before React applies the result of [render](#) to the document, and
returns an object to be given to [componentDidUpdate](#componentdidupdate-2). Useful for saving
things such as scroll position before [render](#) causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

###### Parameters

###### prevProps

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`P`\>

###### prevState

[`Readonly`](@repo.pixel.api.pixel.<internal>.md#readonly)\<`S`\>

###### Returns

`SS` \| `null`

***

### ProviderExoticComponent()

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:596

An [ExoticComponent](#exoticcomponent) with a `propTypes` property applied to it.

#### Extends

- [`ExoticComponent`](#exoticcomponent)\<`P`\>

#### Type Parameters

##### P

`P`

The props the component accepts.

> **ProviderExoticComponent**(`props`): [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:596

An [ExoticComponent](#exoticcomponent) with a `propTypes` property applied to it.

#### Parameters

##### props

`P`

#### Returns

[`ReactNode`](#reactnode)

#### Properties

##### $$typeof

> `readonly` **$$typeof**: `symbol`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:572

###### Inherited from

[`ExoticComponent`](#exoticcomponent).[`$$typeof`](#typeof-1)

***

### ProviderProps

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:544

Describes the props accepted by a Context [Provider](#provider-1).

#### Type Parameters

##### T

`T`

The type of the value the context provides.

#### Properties

##### children?

> `optional` **children?**: [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:546

##### value

> **value**: `T`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:545

***

### ReactElement

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:325

Represents a JSX element.

Where [ReactNode](#reactnode) represents everything that can be rendered, `ReactElement`
only represents JSX.

#### Example

```tsx
const element: ReactElement = <div />;
```

#### Extended by

- [`Element`](#element)
- [`ReactPortal`](#reactportal)

#### Type Parameters

##### P

`P` = `unknown`

The type of the props object

##### T

`T` *extends* `string` \| [`JSXElementConstructor`](#jsxelementconstructor)\<`any`\> = `string` \| [`JSXElementConstructor`](#jsxelementconstructor)\<`any`\>

The type of the component or tag

#### Properties

##### key

> **key**: `string` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:331

##### props

> **props**: `P`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:330

##### type

> **type**: `T`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:329

***

### ReactPortal

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:396

Represents a JSX element.

Where [ReactNode](#reactnode) represents everything that can be rendered, `ReactElement`
only represents JSX.

#### Example

```tsx
const element: ReactElement = <div />;
```

#### Extends

- [`ReactElement`](#reactelement)

#### Properties

##### children

> **children**: [`ReactNode`](#reactnode)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:397

##### key

> **key**: `string` \| `null`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:331

###### Inherited from

[`ReactElement`](#reactelement).[`key`](#key-1)

##### props

> **props**: `unknown`

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:330

###### Inherited from

[`ReactElement`](#reactelement).[`props`](#props-2)

##### type

> **type**: `string` \| [`JSXElementConstructor`](#jsxelementconstructor)\<`any`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:329

###### Inherited from

[`ReactElement`](#reactelement).[`type`](#type-1)

## Type Aliases

### Consumer

> **Consumer**\<`T`\> = [`ExoticComponent`](#exoticcomponent)\<[`ConsumerProps`](#consumerprops)\<`T`\>\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:659

The old way to read context, before [useContext](#) existed.

#### Type Parameters

##### T

`T`

#### See

[React Docs](https://react.dev/reference/react/createContext#consumer)

#### Example

```tsx
import { UserContext } from './user-context';

function Avatar() {
  return (
    <UserContext.Consumer>
      {user => <img src={user.profileImage} alt={user.name} />}
    </UserContext.Consumer>
  );
}
```

***

### IteratorResult

> **IteratorResult**\<`T`, `TReturn`\> = [`IteratorYieldResult`](#iteratoryieldresult)\<`T`\> \| [`IteratorReturnResult`](#iteratorreturnresult)\<`TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:37

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

***

### JSXElementConstructor

> **JSXElementConstructor**\<`P`\> = ((`props`) => [`ReactNode`](#reactnode) \| `Promise`\<[`ReactNode`](#reactnode)\>) \| ((`props`, `context`) => [`Component`](#component)\<`any`, `any`\>)

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:134

Represents any user-defined component, either as a function or a class.

Similar to [ComponentType](#), but without extra properties like
FunctionComponent.defaultProps defaultProps.

#### Type Parameters

##### P

`P`

The props the component accepts.

***

### Pick

> **Pick**\<`T`, `K`\> = `{ [P in K]: T[P] }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1604

From T, pick a set of properties whose keys are in the union K

#### Type Parameters

##### T

`T`

##### K

`K` *extends* keyof `T`

***

### Provider

> **Provider**\<`T`\> = [`ProviderExoticComponent`](#providerexoticcomponent)\<[`ProviderProps`](#providerprops)\<`T`\>\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:638

Wraps your components to specify the value of this context for all components inside.

#### Type Parameters

##### T

`T`

#### See

[React Docs](https://react.dev/reference/react/createContext#provider)

#### Example

```tsx
import { createContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

***

### ReactNode

> **ReactNode** = [`ReactElement`](#reactelement) \| `string` \| `number` \| `bigint` \| [`Iterable`](#iterable)\<[`ReactNode`](#reactnode)\> \| [`ReactPortal`](#reactportal) \| `boolean` \| `null` \| `undefined` \| [`DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES`](#do_not_use_or_you_will_be_fired_experimental_react_nodes)\[keyof [`DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES`](#do_not_use_or_you_will_be_fired_experimental_react_nodes)\] \| `Promise`\<[`AwaitedReactNode`](#)\>

Defined in: node\_modules/.pnpm/@types+react@19.2.17/node\_modules/@types/react/index.d.ts:436

Represents all of the things React can render.

Where [ReactElement](#reactelement) only represents JSX, `ReactNode` represents everything that can be rendered.

#### See

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/reference/reactnode/)

#### Examples

```tsx
// Typing children
type Props = { children: ReactNode }

const Component = ({ children }: Props) => <div>{children}</div>

<Component>hello</Component>
```

```tsx
// Typing a custom element
type Props = { customElement: ReactNode }

const Component = ({ customElement }: Props) => <div>{customElement}</div>

<Component customElement={<div>hello</div>} />
```
