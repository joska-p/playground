---
title: png-export (internal)
package: "@repo/randomart-engine"
kind: internal
module: png-export
---

## Classes

### Blob

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:150

A `Blob` encapsulates immutable, raw data that can be safely shared across
multiple worker threads.

#### Since

v15.7.0, v14.18.0

#### Constructors

##### Constructor

> **new Blob**(`sources`, `options?`): [`Blob`](#blob)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:169

Creates a new `Blob` object containing a concatenation of the given sources.

{ArrayBuffer}, {TypedArray}, {DataView}, and {Buffer} sources are copied into
the 'Blob' and can therefore be safely modified after the 'Blob' is created.

String sources are also copied into the `Blob`.

###### Parameters

###### sources

(`ArrayBuffer` \| [`Blob`](#blob) \| [`BinaryLike`](#binarylike))[]

###### options?

[`BlobOptions`](#bloboptions)

###### Returns

[`Blob`](#blob)

#### Properties

##### size

> `readonly` **size**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:155

The total size of the `Blob` in bytes.

###### Since

v15.7.0, v14.18.0

##### type

> `readonly` **type**: `string`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:160

The content-type of the `Blob`.

###### Since

v15.7.0, v14.18.0

#### Methods

##### arrayBuffer()

> **arrayBuffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:175

Returns a promise that fulfills with an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing a copy of
the `Blob` data.

###### Returns

`Promise`\<`ArrayBuffer`\>

###### Since

v15.7.0, v14.18.0

##### bytes()

> **bytes**(): `Promise`\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:186

The `blob.bytes()` method returns the byte of the `Blob` object as a `Promise<Uint8Array>`.

```js
const blob = new Blob(['hello']);
blob.bytes().then((bytes) => {
  console.log(bytes); // Outputs: Uint8Array(5) [ 104, 101, 108, 108, 111 ]
});
```

###### Returns

`Promise`\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

##### slice()

> **slice**(`start?`, `end?`, `type?`): [`Blob`](#blob)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:195

Creates and returns a new `Blob` containing a subset of this `Blob` objects
data. The original `Blob` is not altered.

###### Parameters

###### start?

`number`

The starting index.

###### end?

`number`

The ending index.

###### type?

`string`

The content-type for the new `Blob`

###### Returns

[`Blob`](#blob)

###### Since

v15.7.0, v14.18.0

##### stream()

> **stream**(): [`ReadableStream`](#readablestream)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:206

Returns a new `ReadableStream` that allows the content of the `Blob` to be read.

###### Returns

[`ReadableStream`](#readablestream)

###### Since

v16.7.0

##### text()

> **text**(): `Promise`\<`string`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:201

Returns a promise that fulfills with the contents of the `Blob` decoded as a
UTF-8 string.

###### Returns

`Promise`\<`string`\>

###### Since

v15.7.0, v14.18.0

## Interfaces

### AbortSignal

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:25

#### Extends

- [`_AbortSignal`](#_abortsignal)

#### Properties

##### aborted

> `readonly` **aborted**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:11

###### Inherited from

`_AbortSignal.aborted`

##### onabort

> **onabort**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:12

###### Inherited from

`_AbortSignal.onabort`

##### reason

> `readonly` **reason**: `any`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:13

###### Inherited from

`_AbortSignal.reason`

#### Methods

##### addEventListener()

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:61

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Inherited from

`_AbortSignal.addEventListener`

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:66

###### Parameters

###### event

[`Event`](#event-1)

###### Returns

`boolean`

###### Inherited from

`_AbortSignal.dispatchEvent`

##### removeEventListener()

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:67

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Inherited from

`_AbortSignal.removeEventListener`

##### throwIfAborted()

> **throwIfAborted**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:14

###### Returns

`void`

###### Inherited from

`_AbortSignal.throwIfAborted`

***

### AbortSignal

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:10

#### Extends

- [`EventTarget`](#eventtarget-2)

#### Properties

##### aborted

> `readonly` **aborted**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:11

##### onabort

> **onabort**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:12

##### reason

> `readonly` **reason**: `any`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:13

#### Methods

##### addEventListener()

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:61

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Inherited from

[`EventTarget`](#eventtarget-2).[`addEventListener`](#addeventlistener-2)

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:66

###### Parameters

###### event

[`Event`](#event-1)

###### Returns

`boolean`

###### Inherited from

[`EventTarget`](#eventtarget-2).[`dispatchEvent`](#dispatchevent-2)

##### removeEventListener()

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:67

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Inherited from

[`EventTarget`](#eventtarget-2).[`removeEventListener`](#removeeventlistener-2)

##### throwIfAborted()

> **throwIfAborted**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:14

###### Returns

`void`

***

### AddEventListenerOptions

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:3

#### Extends

- [`EventListenerOptions`](#eventlisteneroptions)

#### Properties

##### capture?

> `optional` **capture?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:56

###### Inherited from

[`EventListenerOptions`](#eventlisteneroptions).[`capture`](#capture-1)

##### once?

> `optional` **once?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:4

##### passive?

> `optional` **passive?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:5

##### signal?

> `optional` **signal?**: [`AbortSignal`](#abortsignal)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:6

***

### ArrayBufferView

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1727

#### Type Parameters

##### TArrayBuffer

`TArrayBuffer` *extends* [`ArrayBufferLike`](#arraybufferlike) = [`ArrayBufferLike`](#arraybufferlike)

#### Properties

##### buffer

> `readonly` **buffer**: `TArrayBuffer`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1731

The ArrayBuffer instance referenced by the array.

##### byteLength

> `readonly` **byteLength**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1736

The length in bytes of the array.

##### byteOffset

> `readonly` **byteOffset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1741

The offset in bytes of the array.

***

### ArrayIterator

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:70

Describes an [Iterator](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iterator-2) produced by the runtime that inherits from the intrinsic `Iterator.prototype`.

#### Extends

- [`IteratorObject`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iteratorobject)\<`T`, [`BuiltinIteratorReturn`](#builtiniteratorreturn-1), `unknown`\>

#### Type Parameters

##### T

`T`

#### Methods

##### \[dispose\]()

> **\[dispose\]**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.disposable.d.ts:34

###### Returns

`void`

###### Inherited from

`IteratorObject.[dispose]`

##### \[iterator\]()

> **\[iterator\]**(): [`ArrayIterator`](#arrayiterator)\<`T`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:71

###### Returns

[`ArrayIterator`](#arrayiterator)\<`T`\>

###### Overrides

[`IteratorObject`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iteratorobject).[`[iterator]`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iterator-3)

##### next()

> **next**(...`__namedParameters`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:41

###### Parameters

###### \_\_namedParameters

\[\] \| \[`unknown`\]

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iteratorobject).[`next`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#next-1)

##### return()?

> `optional` **return**(`value?`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:42

###### Parameters

###### value?

`undefined`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iteratorobject).[`return`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#return-1)

##### throw()?

> `optional` **throw**(`e?`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:43

###### Parameters

###### e?

`any`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#iteratorobject).[`throw`](@repo.glaze.gpu.shapes.TextRasterizer.<internal>.md#throw-1)

***

### ArrayLike

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1575

#### Type Parameters

##### T

`T`

#### Indexable

> \[`n`: `number`\]: `T`

#### Properties

##### length

> `readonly` **length**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1576

***

### AsyncIterable

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:35

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

##### TNext

`TNext` = `any`

#### Methods

##### \[asyncIterator\]()

> **\[asyncIterator\]**(): [`AsyncIterator`](#asynciterator-1)\<`T`, `TReturn`, `TNext`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:36

###### Returns

[`AsyncIterator`](#asynciterator-1)\<`T`, `TReturn`, `TNext`\>

***

### AsyncIterator

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:28

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

##### TNext

`TNext` = `any`

#### Methods

##### next()

> **next**(...`__namedParameters`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:30

###### Parameters

###### \_\_namedParameters

\[\] \| \[`TNext`\]

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

##### return()?

> `optional` **return**(`value?`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:31

###### Parameters

###### value?

`TReturn` \| [`PromiseLike`](#promiselike)\<`TReturn`\>

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

##### throw()?

> `optional` **throw**(`e?`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:32

###### Parameters

###### e?

`any`

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>\>

***

### Blob

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:1914

#### Extends

- [`_Blob`](#_blob)

#### Properties

##### size

> `readonly` **size**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:155

The total size of the `Blob` in bytes.

###### Since

v15.7.0, v14.18.0

###### Inherited from

`_Blob.size`

##### type

> `readonly` **type**: `string`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:160

The content-type of the `Blob`.

###### Since

v15.7.0, v14.18.0

###### Inherited from

`_Blob.type`

#### Methods

##### arrayBuffer()

> **arrayBuffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:175

Returns a promise that fulfills with an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing a copy of
the `Blob` data.

###### Returns

`Promise`\<`ArrayBuffer`\>

###### Since

v15.7.0, v14.18.0

###### Inherited from

`_Blob.arrayBuffer`

##### bytes()

> **bytes**(): `Promise`\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:186

The `blob.bytes()` method returns the byte of the `Blob` object as a `Promise<Uint8Array>`.

```js
const blob = new Blob(['hello']);
blob.bytes().then((bytes) => {
  console.log(bytes); // Outputs: Uint8Array(5) [ 104, 101, 108, 108, 111 ]
});
```

###### Returns

`Promise`\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

###### Inherited from

`_Blob.bytes`

##### slice()

> **slice**(`start?`, `end?`, `type?`): [`Blob`](#blob)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:195

Creates and returns a new `Blob` containing a subset of this `Blob` objects
data. The original `Blob` is not altered.

###### Parameters

###### start?

`number`

The starting index.

###### end?

`number`

The ending index.

###### type?

`string`

The content-type for the new `Blob`

###### Returns

[`Blob`](#blob)

###### Since

v15.7.0, v14.18.0

###### Inherited from

`_Blob.slice`

##### stream()

> **stream**(): [`ReadableStream`](#readablestream)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:206

Returns a new `ReadableStream` that allows the content of the `Blob` to be read.

###### Returns

[`ReadableStream`](#readablestream)

###### Since

v16.7.0

###### Inherited from

`_Blob.stream`

##### text()

> **text**(): `Promise`\<`string`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:201

Returns a promise that fulfills with the contents of the `Blob` decoded as a
UTF-8 string.

###### Returns

`Promise`\<`string`\>

###### Since

v15.7.0, v14.18.0

###### Inherited from

`_Blob.text`

***

### BlobOptions

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:132

**`Experimental`**

#### Properties

##### endings?

> `optional` **endings?**: `"transparent"` \| `"native"`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:137

**`Experimental`**

One of either `'transparent'` or `'native'`. When set to `'native'`, line endings in string source parts
will be converted to the platform native line-ending as specified by `import { EOL } from 'node:os'`.

##### type?

> `optional` **type?**: `string`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:143

**`Experimental`**

The Blob content-type. The intent is for `type` to convey
the MIME media type of the data, however no validation of the type format
is performed.

***

### Event

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:82

#### Extends

- [`_Event`](#_event)

#### Properties

##### bubbles

> `readonly` **bubbles**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:20

###### Inherited from

`_Event.bubbles`

##### cancelable

> `readonly` **cancelable**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:22

###### Inherited from

`_Event.cancelable`

##### cancelBubble

> **cancelBubble**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:21

###### Inherited from

`_Event.cancelBubble`

##### composed

> `readonly` **composed**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:23

###### Inherited from

`_Event.composed`

##### currentTarget

> `readonly` **currentTarget**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:24

###### Inherited from

`_Event.currentTarget`

##### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:25

###### Inherited from

`_Event.defaultPrevented`

##### eventPhase

> `readonly` **eventPhase**: `0` \| `2`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:26

###### Inherited from

`_Event.eventPhase`

##### isTrusted

> `readonly` **isTrusted**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:27

###### Inherited from

`_Event.isTrusted`

##### returnValue

> **returnValue**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:28

###### Inherited from

`_Event.returnValue`

##### srcElement

> `readonly` **srcElement**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:29

###### Inherited from

`_Event.srcElement`

##### target

> `readonly` **target**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:30

###### Inherited from

`_Event.target`

##### timeStamp

> `readonly` **timeStamp**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:31

###### Inherited from

`_Event.timeStamp`

##### type

> `readonly` **type**: `string`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:32

###### Inherited from

`_Event.type`

#### Methods

##### composedPath()

> **composedPath**(): \[[`EventTarget`](#eventtarget-3)?\]

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:33

###### Returns

\[[`EventTarget`](#eventtarget-3)?\]

###### Inherited from

`_Event.composedPath`

##### initEvent()

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:34

###### Parameters

###### type

`string`

###### bubbles?

`boolean`

###### cancelable?

`boolean`

###### Returns

`void`

###### Inherited from

`_Event.initEvent`

##### preventDefault()

> **preventDefault**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:35

###### Returns

`void`

###### Inherited from

`_Event.preventDefault`

##### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:36

###### Returns

`void`

###### Inherited from

`_Event.stopImmediatePropagation`

##### stopPropagation()

> **stopPropagation**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:37

###### Returns

`void`

###### Inherited from

`_Event.stopPropagation`

***

### Event

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:19

#### Properties

##### bubbles

> `readonly` **bubbles**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:20

##### cancelable

> `readonly` **cancelable**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:22

##### cancelBubble

> **cancelBubble**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:21

##### composed

> `readonly` **composed**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:23

##### currentTarget

> `readonly` **currentTarget**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:24

##### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:25

##### eventPhase

> `readonly` **eventPhase**: `0` \| `2`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:26

##### isTrusted

> `readonly` **isTrusted**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:27

##### returnValue

> **returnValue**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:28

##### srcElement

> `readonly` **srcElement**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:29

##### target

> `readonly` **target**: [`EventTarget`](#eventtarget-3) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:30

##### timeStamp

> `readonly` **timeStamp**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:31

##### type

> `readonly` **type**: `string`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:32

#### Methods

##### composedPath()

> **composedPath**(): \[[`EventTarget`](#eventtarget-3)?\]

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:33

###### Returns

\[[`EventTarget`](#eventtarget-3)?\]

##### initEvent()

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:34

###### Parameters

###### type

`string`

###### bubbles?

`boolean`

###### cancelable?

`boolean`

###### Returns

`void`

##### preventDefault()

> **preventDefault**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:35

###### Returns

`void`

##### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:36

###### Returns

`void`

##### stopPropagation()

> **stopPropagation**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:37

###### Returns

`void`

***

### EventInit

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:40

#### Properties

##### bubbles?

> `optional` **bubbles?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:41

##### cancelable?

> `optional` **cancelable?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:42

##### composed?

> `optional` **composed?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:43

***

### EventListener()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:46

> **EventListener**(`evt`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:47

#### Parameters

##### evt

[`Event`](#event-1)

#### Returns

`void`

***

### EventListenerObject

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:50

#### Methods

##### handleEvent()

> **handleEvent**(`object`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:51

###### Parameters

###### object

[`Event`](#event-1)

###### Returns

`void`

***

### EventListenerOptions

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:55

#### Extended by

- [`AddEventListenerOptions`](#addeventlisteneroptions)

#### Properties

##### capture?

> `optional` **capture?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:56

***

### EventTarget

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:91

#### Extends

- [`_EventTarget`](#_eventtarget)

#### Extended by

- [`AbortSignal`](#abortsignal-1)

#### Methods

##### addEventListener()

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:61

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Inherited from

`_EventTarget.addEventListener`

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:66

###### Parameters

###### event

[`Event`](#event-1)

###### Returns

`boolean`

###### Inherited from

`_EventTarget.dispatchEvent`

##### removeEventListener()

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:67

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Inherited from

`_EventTarget.removeEventListener`

***

### EventTarget

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:60

#### Methods

##### addEventListener()

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:61

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:66

###### Parameters

###### event

[`Event`](#event-1)

###### Returns

`boolean`

##### removeEventListener()

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:67

###### Parameters

###### type

`string`

###### listener

[`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

***

### Float16Array

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:24

A typed array of 16-bit float values. The contents are initialized to 0. If the requested number
of bytes could not be allocated an exception is raised.

#### Type Parameters

##### TArrayBuffer

`TArrayBuffer` *extends* [`ArrayBufferLike`](#arraybufferlike) = [`ArrayBufferLike`](#arraybufferlike)

#### Indexable

> \[`index`: `number`\]: `number`

#### Properties

##### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `"Float16Array"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:367

##### buffer

> `readonly` **buffer**: `TArrayBuffer`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:33

The ArrayBuffer instance referenced by the array.

##### byteLength

> `readonly` **byteLength**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:38

The length in bytes of the array.

##### byteOffset

> `readonly` **byteOffset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:43

The offset in bytes of the array.

##### BYTES\_PER\_ELEMENT

> `readonly` **BYTES\_PER\_ELEMENT**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:28

The size in bytes of each element in the array.

##### length

> `readonly` **length**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:199

The length of the array.

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): [`ArrayIterator`](#arrayiterator)\<`number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:350

###### Returns

[`ArrayIterator`](#arrayiterator)\<`number`\>

##### at()

> **at**(`index`): `number` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:49

Returns the item located at the specified index.

###### Parameters

###### index

`number`

The zero-based index of the desired code unit. A negative index will count back from the last item.

###### Returns

`number` \| `undefined`

##### copyWithin()

> **copyWithin**(`target`, `start`, `end?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:60

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

###### Parameters

###### target

`number`

If target is negative, it is treated as length+target where length is the
length of the array.

###### start

`number`

If start is negative, it is treated as length+start. If end is negative, it
is treated as length+end.

###### end?

`number`

If not specified, length of the this object is used as its default value.

###### Returns

`this`

##### entries()

> **entries**(): [`ArrayIterator`](#arrayiterator)\<\[`number`, `number`\]\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:355

Returns an array of key, value pairs for every entry in the array

###### Returns

[`ArrayIterator`](#arrayiterator)\<\[`number`, `number`\]\>

##### every()

> **every**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:70

Determines whether all the members of an array satisfy the specified test.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`boolean`

##### fill()

> **fill**(`value`, `start?`, `end?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:80

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

###### Parameters

###### value

`number`

value to fill array section with

###### start?

`number`

index to start filling the array at. If start is negative, it is treated as
length+start where length is the length of the array.

###### end?

`number`

index to stop filling the array at. If end is negative, it is treated as
length+end.

###### Returns

`this`

##### filter()

> **filter**(`predicate`, `thisArg?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:89

Returns the elements of an array that meet the condition specified in a callback function.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `any`

A function that accepts up to three arguments. The filter method calls
the predicate function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### find()

> **find**(`predicate`, `thisArg?`): `number` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:100

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

###### Parameters

###### predicate

(`value`, `index`, `obj`) => `boolean`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`number` \| `undefined`

##### findIndex()

> **findIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:111

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

###### Parameters

###### predicate

(`value`, `index`, `obj`) => `boolean`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`number`

##### findLast()

###### Call Signature

> **findLast**\<`S`\>(`predicate`, `thisArg?`): `S` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:122

Returns the value of the last element in the array where predicate is true, and undefined
otherwise.

###### Type Parameters

###### S

`S` *extends* `number`

###### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

findLast calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found, findLast
immediately returns that element value. Otherwise, findLast returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`S` \| `undefined`

###### Call Signature

> **findLast**(`predicate`, `thisArg?`): `number` \| `undefined`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:130

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

###### thisArg?

`any`

###### Returns

`number` \| `undefined`

##### findLastIndex()

> **findLastIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:148

Returns the index of the last element in the array where predicate is true, and -1
otherwise.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

findLastIndex calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found,
findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

###### Returns

`number`

##### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:164

Performs the specified action for each element in an array.

###### Parameters

###### callbackfn

(`value`, `index`, `array`) => `void`

A function that accepts up to three arguments. forEach calls the
callbackfn function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`void`

##### includes()

> **includes**(`searchElement`, `fromIndex?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:171

Determines whether an array includes a certain element, returning true or false as appropriate.

###### Parameters

###### searchElement

`number`

The element to search for.

###### fromIndex?

`number`

The position in this array at which to begin searching for searchElement.

###### Returns

`boolean`

##### indexOf()

> **indexOf**(`searchElement`, `fromIndex?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:179

Returns the index of the first occurrence of a value in an array.

###### Parameters

###### searchElement

`number`

The value to locate in the array.

###### fromIndex?

`number`

The array index at which to begin the search. If fromIndex is omitted, the
search starts at index 0.

###### Returns

`number`

##### join()

> **join**(`separator?`): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:186

Adds all the elements of an array separated by the specified separator string.

###### Parameters

###### separator?

`string`

A string used to separate one element of an array from the next in the
resulting String. If omitted, the array elements are separated with a comma.

###### Returns

`string`

##### keys()

> **keys**(): [`ArrayIterator`](#arrayiterator)\<`number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:360

Returns an list of keys in the array

###### Returns

[`ArrayIterator`](#arrayiterator)\<`number`\>

##### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:194

Returns the index of the last occurrence of a value in an array.

###### Parameters

###### searchElement

`number`

The value to locate in the array.

###### fromIndex?

`number`

The array index at which to begin the search. If fromIndex is omitted, the
search starts at index 0.

###### Returns

`number`

##### map()

> **map**(`callbackfn`, `thisArg?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:209

Calls a defined callback function on each element of an array, and returns an array that
contains the results.

###### Parameters

###### callbackfn

(`value`, `index`, `array`) => `number`

A function that accepts up to three arguments. The map method calls the
callbackfn function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### reduce()

###### Call Signature

> **reduce**(`callbackfn`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:221

Calls the specified callback function for all the elements in an array. The return value of
the callback function is the accumulated result, and is provided as an argument in the next
call to the callback function.

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `number`

A function that accepts up to four arguments. The reduce method calls the
callbackfn function one time for each element in the array.

###### Returns

`number`

###### Call Signature

> **reduce**(`callbackfn`, `initialValue`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:222

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `number`

###### initialValue

`number`

###### Returns

`number`

###### Call Signature

> **reduce**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:234

Calls the specified callback function for all the elements in an array. The return value of
the callback function is the accumulated result, and is provided as an argument in the next
call to the callback function.

###### Type Parameters

###### U

`U`

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduce method calls the
callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start
the accumulation. The first call to the callbackfn function provides this value as an argument
instead of an array value.

###### Returns

`U`

##### reduceRight()

###### Call Signature

> **reduceRight**(`callbackfn`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:246

Calls the specified callback function for all the elements in an array, in descending order.
The return value of the callback function is the accumulated result, and is provided as an
argument in the next call to the callback function.

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `number`

A function that accepts up to four arguments. The reduceRight method calls
the callbackfn function one time for each element in the array.

###### Returns

`number`

###### Call Signature

> **reduceRight**(`callbackfn`, `initialValue`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:247

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `number`

###### initialValue

`number`

###### Returns

`number`

###### Call Signature

> **reduceRight**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:259

Calls the specified callback function for all the elements in an array, in descending order.
The return value of the callback function is the accumulated result, and is provided as an
argument in the next call to the callback function.

###### Type Parameters

###### U

`U`

###### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduceRight method calls
the callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start
the accumulation. The first call to the callbackfn function provides this value as an argument
instead of an array value.

###### Returns

`U`

##### reverse()

> **reverse**(): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:264

Reverses the elements in an Array.

###### Returns

`this`

##### set()

> **set**(`array`, `offset?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:271

Sets a value or an array of values.

###### Parameters

###### array

[`ArrayLike`](#arraylike)\<`number`\>

A typed or untyped array of values to set.

###### offset?

`number`

The index in the current array at which the values are to be written.

###### Returns

`void`

##### slice()

> **slice**(`start?`, `end?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:278

Returns a section of an array.

###### Parameters

###### start?

`number`

The beginning of the specified portion of the array.

###### end?

`number`

The end of the specified portion of the array. This is exclusive of the element at the index 'end'.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### some()

> **some**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:288

Determines whether the specified callback function returns true for any element of an array.

###### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The some method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value true, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

###### Returns

`boolean`

##### sort()

> **sort**(`compareFn?`): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:299

Sorts an array.

###### Parameters

###### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if first argument is less than second argument, zero if they're equal and a positive
value otherwise. If omitted, the elements are sorted in ascending order.
```ts
[11,2,22,1].sort((a, b) => a - b)
```

###### Returns

`this`

##### subarray()

> **subarray**(`begin?`, `end?`): [`Float16Array`](#float16array)\<`TArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:307

Gets a new Float16Array view of the ArrayBuffer store for this array, referencing the elements
at begin, inclusive, up to end, exclusive.

###### Parameters

###### begin?

`number`

The index of the beginning of the array.

###### end?

`number`

The index of the end of the array.

###### Returns

[`Float16Array`](#float16array)\<`TArrayBuffer`\>

##### toLocaleString()

> **toLocaleString**(`locales?`, `options?`): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:312

Converts a number to a string by using the current locale.

###### Parameters

###### locales?

`string` \| `string`[]

###### options?

`NumberFormatOptions`

###### Returns

`string`

##### toReversed()

> **toReversed**(): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:317

Copies the array and returns the copy with the elements in reverse order.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### toSorted()

> **toSorted**(`compareFn?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:329

Copies and sorts the array.

###### Parameters

###### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending order.
```ts
const myNums = Float16Array.from([11.25, 2, -22.5, 1]);
myNums.toSorted((a, b) => a - b) // Float16Array(4) [-22.5, 1, 2, 11.5]
```

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### toString()

> **toString**(): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:334

Returns a string representation of an array.

###### Returns

`string`

##### valueOf()

> **valueOf**(): `this`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:337

Returns the primitive value of the specified object.

###### Returns

`this`

##### values()

> **values**(): [`ArrayIterator`](#arrayiterator)\<`number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:365

Returns an list of values in the array

###### Returns

[`ArrayIterator`](#arrayiterator)\<`number`\>

##### with()

> **with**(`index`, `value`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:346

Copies the array and inserts the given number at the provided index.

###### Parameters

###### index

`number`

The index of the value to overwrite. If the index is
negative, then it replaces from the end of the array.

###### value

`number`

The value to insert into the copied array.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

A copy of the original array with the inserted value.

***

### Float16ArrayConstructor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:370

#### Constructors

##### Constructor

> **new Float16ArrayConstructor**(`length?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:372

###### Parameters

###### length?

`number`

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### Constructor

> **new Float16ArrayConstructor**(`array`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:373

###### Parameters

###### array

[`Iterable`](#iterable)\<`number`, `any`, `any`\> \| [`ArrayLike`](#arraylike)\<`number`\>

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### Constructor

> **new Float16ArrayConstructor**\<`TArrayBuffer`\>(`buffer`, `byteOffset?`, `length?`): [`Float16Array`](#float16array)\<`TArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:374

###### Parameters

###### buffer

`TArrayBuffer`

###### byteOffset?

`number`

###### length?

`number`

###### Returns

[`Float16Array`](#float16array)\<`TArrayBuffer`\>

##### Constructor

> **new Float16ArrayConstructor**(`buffer`, `byteOffset?`, `length?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:375

###### Parameters

###### buffer

`ArrayBuffer`

###### byteOffset?

`number`

###### length?

`number`

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### Constructor

> **new Float16ArrayConstructor**(`array`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:376

###### Parameters

###### array

`ArrayBuffer` \| [`ArrayLike`](#arraylike)\<`number`\>

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

#### Properties

##### BYTES\_PER\_ELEMENT

> `readonly` **BYTES\_PER\_ELEMENT**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:381

The size in bytes of each element in the array.

##### prototype

> `readonly` **prototype**: [`Float16Array`](#float16array)\<[`ArrayBufferLike`](#arraybufferlike)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:371

#### Methods

##### from()

###### Call Signature

> **from**(`arrayLike`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:393

Creates an array from an array-like or iterable object.

###### Parameters

###### arrayLike

[`ArrayLike`](#arraylike)\<`number`\>

An array-like object to convert to an array.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

###### Call Signature

> **from**\<`T`\>(`arrayLike`, `mapfn`, `thisArg?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:401

Creates an array from an array-like or iterable object.

###### Type Parameters

###### T

`T`

###### Parameters

###### arrayLike

[`ArrayLike`](#arraylike)\<`T`\>

An array-like object to convert to an array.

###### mapfn

(`v`, `k`) => `number`

A mapping function to call on every element of the array.

###### thisArg?

`any`

Value of 'this' used to invoke the mapfn.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

###### Call Signature

> **from**(`elements`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:407

Creates an array from an array-like or iterable object.

###### Parameters

###### elements

[`Iterable`](#iterable)\<`number`\>

An iterable object to convert to an array.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

###### Call Signature

> **from**\<`T`\>(`elements`, `mapfn?`, `thisArg?`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:415

Creates an array from an array-like or iterable object.

###### Type Parameters

###### T

`T`

###### Parameters

###### elements

[`Iterable`](#iterable)\<`T`\>

An iterable object to convert to an array.

###### mapfn?

(`v`, `k`) => `number`

A mapping function to call on every element of the array.

###### thisArg?

`any`

Value of 'this' used to invoke the mapfn.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

##### of()

> **of**(...`items`): [`Float16Array`](#float16array)\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:387

Returns a new array from a set of elements.

###### Parameters

###### items

...`number`[]

A set of elements to include in the new array object.

###### Returns

[`Float16Array`](#float16array)\<`ArrayBuffer`\>

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

> **\[iterator\]**(): [`Iterator`](#iterator-3)\<`T`, `TReturn`, `TNext`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:47

###### Returns

[`Iterator`](#iterator-3)\<`T`, `TReturn`, `TNext`\>

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

### PromiseLike

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1535

#### Type Parameters

##### T

`T`

#### Methods

##### then()

> **then**\<`TResult1`, `TResult2`\>(`onfulfilled?`, `onrejected?`): [`PromiseLike`](#promiselike)\<`TResult1` \| `TResult2`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1542

Attaches callbacks for the resolution and/or rejection of the Promise.

###### Type Parameters

###### TResult1

`TResult1` = `T`

###### TResult2

`TResult2` = `never`

###### Parameters

###### onfulfilled?

((`value`) => `TResult1` \| [`PromiseLike`](#promiselike)\<`TResult1`\>) \| `null`

The callback to execute when the Promise is resolved.

###### onrejected?

((`reason`) => `TResult2` \| [`PromiseLike`](#promiselike)\<`TResult2`\>) \| `null`

The callback to execute when the Promise is rejected.

###### Returns

[`PromiseLike`](#promiselike)\<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.

***

### QueuingStrategy

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:337

#### Type Parameters

##### T

`T` = `any`

#### Properties

##### highWaterMark?

> `optional` **highWaterMark?**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:338

##### size?

> `optional` **size?**: [`QueuingStrategySize`](#queuingstrategysize-1)\<`T`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:339

***

### QueuingStrategySize()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:341

#### Type Parameters

##### T

`T` = `any`

> **QueuingStrategySize**(`chunk`): `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:342

#### Parameters

##### chunk

`T`

#### Returns

`number`

***

### ReadableByteStreamController

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:239

#### Properties

##### byobRequest

> `readonly` **byobRequest**: [`ReadableStreamBYOBRequest`](#readablestreambyobrequest) \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:240

##### desiredSize

> `readonly` **desiredSize**: `number` \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:241

#### Methods

##### close()

> **close**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:242

###### Returns

`void`

##### enqueue()

> **enqueue**(`chunk`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:243

###### Parameters

###### chunk

[`ArrayBufferView`](#arraybufferview)

###### Returns

`void`

##### error()

> **error**(`error?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:244

###### Parameters

###### error?

`any`

###### Returns

`void`

***

### ReadableByteStreamControllerCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:111

> **ReadableByteStreamControllerCallback**(`controller`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:112

#### Parameters

##### controller

[`ReadableByteStreamController`](#readablebytestreamcontroller)

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### ReadableStream

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:174

This Streams API interface represents a readable stream of byte data.

#### Type Parameters

##### R

`R` = `any`

#### Properties

##### locked

> `readonly` **locked**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:175

#### Methods

##### \[asyncIterator\]()

> **\[asyncIterator\]**(): [`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:184

###### Returns

[`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`R`\>

##### cancel()

> **cancel**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:176

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

##### getReader()

###### Call Signature

> **getReader**(`options`): [`ReadableStreamBYOBReader`](#readablestreambyobreader)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:177

###### Parameters

###### options

###### mode

`"byob"`

###### Returns

[`ReadableStreamBYOBReader`](#readablestreambyobreader)

###### Call Signature

> **getReader**(): [`ReadableStreamDefaultReader`](#readablestreamdefaultreader)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:178

###### Returns

[`ReadableStreamDefaultReader`](#readablestreamdefaultreader)\<`R`\>

###### Call Signature

> **getReader**(`options?`): [`ReadableStreamReader`](#readablestreamreader)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:179

###### Parameters

###### options?

[`ReadableStreamGetReaderOptions`](#readablestreamgetreaderoptions)

###### Returns

[`ReadableStreamReader`](#readablestreamreader)\<`R`\>

##### pipeThrough()

> **pipeThrough**\<`T`\>(`transform`, `options?`): [`ReadableStream`](#readablestream)\<`T`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:180

###### Type Parameters

###### T

`T`

###### Parameters

###### transform

[`ReadableWritablePair`](#readablewritablepair)\<`T`, `R`\>

###### options?

[`StreamPipeOptions`](#streampipeoptions)

###### Returns

[`ReadableStream`](#readablestream)\<`T`\>

##### pipeTo()

> **pipeTo**(`destination`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:181

###### Parameters

###### destination

[`WritableStream`](#writablestream)\<`R`\>

###### options?

[`StreamPipeOptions`](#streampipeoptions)

###### Returns

`Promise`\<`void`\>

##### tee()

> **tee**(): \[[`ReadableStream`](#readablestream)\<`R`\>, [`ReadableStream`](#readablestream)\<`R`\>\]

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:182

###### Returns

\[[`ReadableStream`](#readablestream)\<`R`\>, [`ReadableStream`](#readablestream)\<`R`\>\]

##### values()

> **values**(`options?`): [`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:183

###### Parameters

###### options?

###### preventCancel?

`boolean`

###### Returns

[`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`R`\>

***

### ReadableStreamAsyncIterator

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:170

#### Extends

- `AsyncIterator`\<`T`, [`BuiltinIteratorReturn`](#builtiniteratorreturn), `unknown`\>

#### Type Parameters

##### T

`T`

#### Methods

##### \[asyncDispose\]()

> **\[asyncDispose\]**(): [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.esnext.disposable.d.ts:38

###### Returns

[`PromiseLike`](#promiselike)\<`void`\>

###### Inherited from

`NodeJS.AsyncIterator.[asyncDispose]`

##### \[asyncIterator\]()

> **\[asyncIterator\]**(): [`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`T`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:171

###### Returns

[`ReadableStreamAsyncIterator`](#readablestreamasynciterator-1)\<`T`\>

###### Overrides

`NodeJS.AsyncIterator.[asyncIterator]`

##### next()

> **next**(...`__namedParameters`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:30

###### Parameters

###### \_\_namedParameters

\[\] \| \[`unknown`\]

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

###### Inherited from

`NodeJS.AsyncIterator.next`

##### return()?

> `optional` **return**(`value?`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:31

###### Parameters

###### value?

[`PromiseLike`](#promiselike)\<`undefined`\>

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

###### Inherited from

`NodeJS.AsyncIterator.return`

##### throw()?

> `optional` **throw**(`e?`): `Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2018.asynciterable.d.ts:32

###### Parameters

###### e?

`any`

###### Returns

`Promise`\<[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>\>

###### Inherited from

`NodeJS.AsyncIterator.throw`

***

### ReadableStreamBYOBReader

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:207

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader)

#### Extends

- [`ReadableStreamGenericReader`](#readablestreamgenericreader)

#### Properties

##### closed

> `readonly` **closed**: `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:98

###### Inherited from

[`ReadableStreamGenericReader`](#readablestreamgenericreader).[`closed`](#closed-2)

#### Methods

##### cancel()

> **cancel**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:99

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`ReadableStreamGenericReader`](#readablestreamgenericreader).[`cancel`](#cancel-3)

##### read()

> **read**\<`T`\>(`view`, `options?`): `Promise`\<[`ReadableStreamReadResult`](#readablestreamreadresult)\<`T`\>\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:209

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/read)

###### Type Parameters

###### T

`T` *extends* [`ArrayBufferView`](#arraybufferview)\<[`ArrayBufferLike`](#arraybufferlike)\>

###### Parameters

###### view

`T`

###### options?

###### min?

`number`

###### Returns

`Promise`\<[`ReadableStreamReadResult`](#readablestreamreadresult)\<`T`\>\>

##### releaseLock()

> **releaseLock**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:216

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/releaseLock)

###### Returns

`void`

***

### ReadableStreamBYOBRequest

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:227

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest)

#### Properties

##### view

> `readonly` **view**: [`ArrayBufferView`](#arraybufferview)\<[`ArrayBufferLike`](#arraybufferlike)\> \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:229

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/view)

#### Methods

##### respond()

> **respond**(`bytesWritten`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:231

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respond)

###### Parameters

###### bytesWritten

`number`

###### Returns

`void`

##### respondWithNewView()

> **respondWithNewView**(`view`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:233

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respondWithNewView)

###### Parameters

###### view

[`ArrayBufferView`](#arraybufferview)

###### Returns

`void`

***

### ReadableStreamDefaultController

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:250

#### Type Parameters

##### R

`R` = `any`

#### Properties

##### desiredSize

> `readonly` **desiredSize**: `number` \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:251

#### Methods

##### close()

> **close**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:252

###### Returns

`void`

##### enqueue()

> **enqueue**(`chunk`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:253

###### Parameters

###### chunk

`R`

###### Returns

`void`

##### error()

> **error**(`e?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:254

###### Parameters

###### e?

`any`

###### Returns

`void`

***

### ReadableStreamDefaultReader

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:202

#### Extends

- [`ReadableStreamGenericReader`](#readablestreamgenericreader)

#### Type Parameters

##### R

`R` = `any`

#### Properties

##### closed

> `readonly` **closed**: `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:98

###### Inherited from

[`ReadableStreamGenericReader`](#readablestreamgenericreader).[`closed`](#closed-2)

#### Methods

##### cancel()

> **cancel**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:99

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`ReadableStreamGenericReader`](#readablestreamgenericreader).[`cancel`](#cancel-3)

##### read()

> **read**(): `Promise`\<[`ReadableStreamReadResult`](#readablestreamreadresult)\<`R`\>\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:203

###### Returns

`Promise`\<[`ReadableStreamReadResult`](#readablestreamreadresult)\<`R`\>\>

##### releaseLock()

> **releaseLock**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:204

###### Returns

`void`

***

### ReadableStreamErrorCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:167

> **ReadableStreamErrorCallback**(`reason`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:168

#### Parameters

##### reason

`any`

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### ReadableStreamGenericReader

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:97

#### Extended by

- [`ReadableStreamBYOBReader`](#readablestreambyobreader)
- [`ReadableStreamDefaultReader`](#readablestreamdefaultreader)

#### Properties

##### closed

> `readonly` **closed**: `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:98

#### Methods

##### cancel()

> **cancel**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:99

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

***

### ReadableStreamGetReaderOptions

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:193

#### Properties

##### mode?

> `optional` **mode?**: `"byob"`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:199

Creates a ReadableStreamBYOBReader and locks the stream to the new reader.

This call behaves the same way as the no-argument variant, except that it only works on readable byte streams, i.e. streams which were constructed specifically with the ability to handle "bring your own buffer" reading. The returned BYOB reader provides the ability to directly read individual chunks from the stream via its read() method, into developer-supplied buffers, allowing more precise control over allocation.

***

### ReadableStreamReadDoneResult

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:106

#### Type Parameters

##### T

`T`

#### Properties

##### done

> **done**: `true`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:107

##### value

> **value**: `T` \| `undefined`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:108

***

### ReadableStreamReadValueResult

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:102

#### Type Parameters

##### T

`T`

#### Properties

##### done

> **done**: `false`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:103

##### value

> **value**: `T`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:104

***

### ReadableWritablePair

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:37

#### Type Parameters

##### R

`R` = `any`

##### W

`W` = `any`

#### Properties

##### readable

> **readable**: [`ReadableStream`](#readablestream)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:38

##### writable

> **writable**: [`WritableStream`](#writablestream)\<`W`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:48

Provides a convenient, chainable way of piping this readable stream
through a transform stream (or any other { writable, readable }
pair). It simply pipes the stream into the writable side of the
supplied pair, and returns the readable side for further use.

Piping a stream will lock it for the duration of the pipe, preventing
any other consumer from acquiring a reader.

***

### StreamPipeOptions

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:50

#### Properties

##### preventAbort?

> `optional` **preventAbort?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:51

##### preventCancel?

> `optional` **preventCancel?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:52

##### preventClose?

> `optional` **preventClose?**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:94

Pipes this readable stream to a given writable stream destination.
The way in which the piping process behaves under various error
conditions can be customized with a number of passed options. It
returns a promise that fulfills when the piping process completes
successfully, or rejects if any errors were encountered.

Piping a stream will lock it for the duration of the pipe, preventing
any other consumer from acquiring a reader.

Errors and closures of the source and destination streams propagate
as follows:

An error in this source readable stream will abort destination,
unless preventAbort is truthy. The returned promise will be rejected
with the source's error, or with any error that occurs during
aborting the destination.

An error in destination will cancel this source readable stream,
unless preventCancel is truthy. The returned promise will be rejected
with the destination's error, or with any error that occurs during
canceling the source.

When this source readable stream closes, destination will be closed,
unless preventClose is truthy. The returned promise will be fulfilled
once this process completes, unless an error is encountered while
closing the destination, in which case it will be rejected with that
error.

If destination starts out closed or closing, this source readable
stream will be canceled, unless preventCancel is true. The returned
promise will be rejected with an error indicating piping to a closed
stream failed, or with any error that occurs during canceling the
source.

The signal option can be set to an AbortSignal to allow aborting an
ongoing pipe operation via the corresponding AbortController. In this
case, this source readable stream will be canceled, and destination
aborted, unless the respective options preventCancel or preventAbort
are set.

##### signal?

> `optional` **signal?**: [`AbortSignal`](#abortsignal)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:95

***

### UnderlyingByteSource

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:147

#### Properties

##### autoAllocateChunkSize?

> `optional` **autoAllocateChunkSize?**: `number`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:148

##### cancel?

> `optional` **cancel?**: [`ReadableStreamErrorCallback`](#readablestreamerrorcallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:149

##### pull?

> `optional` **pull?**: [`ReadableByteStreamControllerCallback`](#readablebytestreamcontrollercallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:150

##### start?

> `optional` **start?**: [`ReadableByteStreamControllerCallback`](#readablebytestreamcontrollercallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:151

##### type

> **type**: `"bytes"`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:152

***

### UnderlyingSink

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:160

#### Type Parameters

##### W

`W` = `any`

#### Properties

##### abort?

> `optional` **abort?**: [`UnderlyingSinkAbortCallback`](#underlyingsinkabortcallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:161

##### close?

> `optional` **close?**: [`UnderlyingSinkCloseCallback`](#underlyingsinkclosecallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:162

##### start?

> `optional` **start?**: [`UnderlyingSinkStartCallback`](#underlyingsinkstartcallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:163

##### type?

> `optional` **type?**: `undefined`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:164

##### write?

> `optional` **write?**: [`UnderlyingSinkWriteCallback`](#underlyingsinkwritecallback)\<`W`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:165

***

### UnderlyingSinkAbortCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:114

> **UnderlyingSinkAbortCallback**(`reason?`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:115

#### Parameters

##### reason?

`any`

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### UnderlyingSinkCloseCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:117

> **UnderlyingSinkCloseCallback**(): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:118

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### UnderlyingSinkStartCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:120

> **UnderlyingSinkStartCallback**(`controller`): `any`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:121

#### Parameters

##### controller

[`WritableStreamDefaultController`](#writablestreamdefaultcontroller)

#### Returns

`any`

***

### UnderlyingSinkWriteCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:123

#### Type Parameters

##### W

`W`

> **UnderlyingSinkWriteCallback**(`chunk`, `controller`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:124

#### Parameters

##### chunk

`W`

##### controller

[`WritableStreamDefaultController`](#writablestreamdefaultcontroller)

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### UnderlyingSource

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:154

#### Type Parameters

##### R

`R` = `any`

#### Properties

##### cancel?

> `optional` **cancel?**: [`UnderlyingSourceCancelCallback`](#underlyingsourcecancelcallback)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:155

##### pull?

> `optional` **pull?**: [`UnderlyingSourcePullCallback`](#underlyingsourcepullcallback)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:156

##### start?

> `optional` **start?**: [`UnderlyingSourceStartCallback`](#underlyingsourcestartcallback)\<`R`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:157

##### type?

> `optional` **type?**: `undefined`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:158

***

### UnderlyingSourceCancelCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:126

> **UnderlyingSourceCancelCallback**(`reason?`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:127

#### Parameters

##### reason?

`any`

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### UnderlyingSourcePullCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:129

#### Type Parameters

##### R

`R`

> **UnderlyingSourcePullCallback**(`controller`): `void` \| [`PromiseLike`](#promiselike)\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:130

#### Parameters

##### controller

[`ReadableStreamController`](#readablestreamcontroller)\<`R`\>

#### Returns

`void` \| [`PromiseLike`](#promiselike)\<`void`\>

***

### UnderlyingSourceStartCallback()

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:132

#### Type Parameters

##### R

`R`

> **UnderlyingSourceStartCallback**(`controller`): `any`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:133

#### Parameters

##### controller

[`ReadableStreamController`](#readablestreamcontroller)\<`R`\>

#### Returns

`any`

***

### WritableStream

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:295

This Streams API interface provides a standard abstraction for writing
streaming data to a destination, known as a sink. This object comes with
built-in back pressure and queuing.

#### Type Parameters

##### W

`W` = `any`

#### Properties

##### locked

> `readonly` **locked**: `boolean`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:296

#### Methods

##### abort()

> **abort**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:297

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

##### close()

> **close**(): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:298

###### Returns

`Promise`\<`void`\>

##### getWriter()

> **getWriter**(): [`WritableStreamDefaultWriter`](#writablestreamdefaultwriter)\<`W`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:299

###### Returns

[`WritableStreamDefaultWriter`](#writablestreamdefaultwriter)\<`W`\>

***

### WritableStreamDefaultController

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:330

This Streams API interface represents a controller allowing control of a
WritableStream's state. When constructing a WritableStream, the
underlying sink is given a corresponding WritableStreamDefaultController
instance to manipulate.

#### Methods

##### error()

> **error**(`e?`): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:331

###### Parameters

###### e?

`any`

###### Returns

`void`

***

### WritableStreamDefaultWriter

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:311

This Streams API interface is the object returned by
WritableStream.getWriter() and once created locks the < writer to the
WritableStream ensuring that no other streams can write to the underlying
sink.

#### Type Parameters

##### W

`W` = `any`

#### Properties

##### closed

> `readonly` **closed**: `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:312

##### desiredSize

> `readonly` **desiredSize**: `number` \| `null`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:313

##### ready

> `readonly` **ready**: `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:314

#### Methods

##### abort()

> **abort**(`reason?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:315

###### Parameters

###### reason?

`any`

###### Returns

`Promise`\<`void`\>

##### close()

> **close**(): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:316

###### Returns

`Promise`\<`void`\>

##### releaseLock()

> **releaseLock**(): `void`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:317

###### Returns

`void`

##### write()

> **write**(`chunk`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:318

###### Parameters

###### chunk

`W`

###### Returns

`Promise`\<`void`\>

## Type Aliases

### \_AbortSignal

> **\_AbortSignal** = *typeof* `globalThis` *extends* `object` ? `object` : [`AbortSignal`](#abortsignal-1)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:9

***

### \_Blob

> **\_Blob** = *typeof* `globalThis` *extends* `object` ? `object` : [`Blob`](#blob)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:3

***

### \_Event

> **\_Event** = *typeof* `globalThis` *extends* `object` ? `object` : [`Event`](#event-1)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:18

***

### \_EventTarget

> **\_EventTarget** = *typeof* `globalThis` *extends* `object` ? `object` : [`EventTarget`](#eventtarget-3)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:59

***

### ArrayBufferLike

> **ArrayBufferLike** = `ArrayBufferTypes`\[keyof `ArrayBufferTypes`\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1718

***

### ArrayBufferView

> **ArrayBufferView**\<`TArrayBuffer`\> = [`TypedArray`](#typedarray)\<`TArrayBuffer`\> \| `DataView`\<`TArrayBuffer`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/globals.typedarray.d.ts:18

#### Type Parameters

##### TArrayBuffer

`TArrayBuffer` *extends* [`ArrayBufferLike`](#arraybufferlike) = [`ArrayBufferLike`](#arraybufferlike)

***

### BinaryLike

> **BinaryLike** = `string` \| [`ArrayBufferView`](#arraybufferview-1)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/crypto.d.ts:680

***

### BuiltinIteratorReturn

> **BuiltinIteratorReturn** = [`ReturnType`](#returntype)\<`any`[]\[*typeof* `Symbol.iterator`\]\> *extends* [`Iterator`](#iterator-3)\<`any`, infer TReturn\> ? `TReturn` : `any`

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/compatibility/iterators.d.ts:18

***

### BuiltinIteratorReturn

> **BuiltinIteratorReturn** = `intrinsic`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:68

Defines the `TReturn` type used for built-in iterators produced by `Array`, `Map`, `Set`, and others.
This is `undefined` when `strictBuiltInIteratorReturn` is `true`; otherwise, this is `any`.

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

### ReadableStreamController

> **ReadableStreamController**\<`T`\> = [`ReadableStreamDefaultController`](#readablestreamdefaultcontroller)\<`T`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:101

#### Type Parameters

##### T

`T`

***

### ReadableStreamReader

> **ReadableStreamReader**\<`T`\> = [`ReadableStreamDefaultReader`](#readablestreamdefaultreader)\<`T`\> \| [`ReadableStreamBYOBReader`](#readablestreambyobreader)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:201

#### Type Parameters

##### T

`T`

***

### ReadableStreamReadResult

> **ReadableStreamReadResult**\<`T`\> = [`ReadableStreamReadValueResult`](#readablestreamreadvalueresult)\<`T`\> \| [`ReadableStreamReadDoneResult`](#readablestreamreaddoneresult)\<`T`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:110

#### Type Parameters

##### T

`T`

***

### ReturnType

> **ReturnType**\<`T`\> = `T` *extends* (...`args`) => infer R ? `R` : `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1648

Obtain the return type of a function type

#### Type Parameters

##### T

`T` *extends* (...`args`) => `any`

***

### TypedArray

> **TypedArray**\<`TArrayBuffer`\> = `Uint8Array`\<`TArrayBuffer`\> \| `Uint8ClampedArray`\<`TArrayBuffer`\> \| `Uint16Array`\<`TArrayBuffer`\> \| `Uint32Array`\<`TArrayBuffer`\> \| `Int8Array`\<`TArrayBuffer`\> \| `Int16Array`\<`TArrayBuffer`\> \| `Int32Array`\<`TArrayBuffer`\> \| `BigUint64Array`\<`TArrayBuffer`\> \| `BigInt64Array`\<`TArrayBuffer`\> \| [`Float16Array`](#float16array)\<`TArrayBuffer`\> \| `Float32Array`\<`TArrayBuffer`\> \| `Float64Array`\<`TArrayBuffer`\>

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/globals.typedarray.d.ts:5

#### Type Parameters

##### TArrayBuffer

`TArrayBuffer` *extends* [`ArrayBufferLike`](#arraybufferlike) = [`ArrayBufferLike`](#arraybufferlike)

## Variables

### AbortSignal

> **AbortSignal**: \{(): [`AbortSignal`](#abortsignal); `prototype`: [`AbortSignal`](#abortsignal); `abort`: [`AbortSignal`](#abortsignal); `any`: [`AbortSignal`](#abortsignal); `timeout`: [`AbortSignal`](#abortsignal); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/abortcontroller.d.ts:25

#### Type Declaration

#### Returns

[`AbortSignal`](#abortsignal)

##### prototype

> **prototype**: [`AbortSignal`](#abortsignal)

##### abort()

> **abort**(`reason?`): [`AbortSignal`](#abortsignal)

###### Parameters

###### reason?

`any`

###### Returns

[`AbortSignal`](#abortsignal)

##### any()

> **any**(`signals`): [`AbortSignal`](#abortsignal)

###### Parameters

###### signals

[`AbortSignal`](#abortsignal)[]

###### Returns

[`AbortSignal`](#abortsignal)

##### timeout()

> **timeout**(`milliseconds`): [`AbortSignal`](#abortsignal)

###### Parameters

###### milliseconds

`number`

###### Returns

[`AbortSignal`](#abortsignal)

***

### Blob

> **Blob**: *typeof* [`Blob`](#blob)

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/buffer.d.ts:1914

`Blob` class is a global reference for `import { Blob } from 'node:buffer'`
https://nodejs.org/api/buffer.html#class-blob

#### Since

v18.0.0

***

### Event

> **Event**: \{(`type`, `eventInitDict?`): [`Event`](#event); `prototype`: [`Event`](#event); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:82

#### Type Declaration

#### Parameters

##### type

`string`

##### eventInitDict?

[`EventInit`](#eventinit)

#### Returns

[`Event`](#event)

##### prototype

> **prototype**: [`Event`](#event)

***

### EventTarget

> **EventTarget**: \{(): [`EventTarget`](#eventtarget-2); `prototype`: [`EventTarget`](#eventtarget-2); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/web-globals/events.d.ts:91

#### Type Declaration

#### Returns

[`EventTarget`](#eventtarget-2)

##### prototype

> **prototype**: [`EventTarget`](#eventtarget-2)

***

### Float16Array

> **Float16Array**: [`Float16ArrayConstructor`](#float16arrayconstructor)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2025.float16.d.ts:24

***

### ReadableByteStreamController

> **ReadableByteStreamController**: \{(): [`ReadableByteStreamController`](#readablebytestreamcontroller); `prototype`: [`ReadableByteStreamController`](#readablebytestreamcontroller); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:239

#### Type Declaration

#### Returns

[`ReadableByteStreamController`](#readablebytestreamcontroller)

##### prototype

> **prototype**: [`ReadableByteStreamController`](#readablebytestreamcontroller)

***

### ReadableStream

> **ReadableStream**: \{(`underlyingSource`, `strategy?`): [`ReadableStream`](#readablestream)\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>; \<`R`\>(`underlyingSource?`, `strategy?`): [`ReadableStream`](#readablestream)\<`R`\>; `prototype`: [`ReadableStream`](#readablestream); `from`: [`ReadableStream`](#readablestream)\<`T`\>; \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:174

#### Type Declaration

#### Call Signature

> **new ReadableStream**(`underlyingSource`, `strategy?`): [`ReadableStream`](#readablestream)\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

##### Parameters

###### underlyingSource

[`UnderlyingByteSource`](#underlyingbytesource)

###### strategy?

[`QueuingStrategy`](#queuingstrategy)\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

##### Returns

[`ReadableStream`](#readablestream)\<`Uint8Array`\<[`ArrayBufferLike`](#arraybufferlike)\>\>

#### Call Signature

> **new ReadableStream**\<`R`\>(`underlyingSource?`, `strategy?`): [`ReadableStream`](#readablestream)\<`R`\>

##### Parameters

###### underlyingSource?

[`UnderlyingSource`](#underlyingsource)\<`R`\>

###### strategy?

[`QueuingStrategy`](#queuingstrategy)\<`R`\>

##### Returns

[`ReadableStream`](#readablestream)\<`R`\>

##### prototype

> **prototype**: [`ReadableStream`](#readablestream)

##### from()

> **from**\<`T`\>(`iterable`): [`ReadableStream`](#readablestream)\<`T`\>

###### Type Parameters

###### T

`T`

###### Parameters

###### iterable

[`Iterable`](#iterable)\<`T`, `any`, `any`\> \| [`AsyncIterable`](#asynciterable)\<`T`, `any`, `any`\>

###### Returns

[`ReadableStream`](#readablestream)\<`T`\>

***

### ReadableStreamBYOBReader

> **ReadableStreamBYOBReader**: \{(`stream`): [`ReadableStreamBYOBReader`](#readablestreambyobreader); `prototype`: [`ReadableStreamBYOBReader`](#readablestreambyobreader); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:207

#### Type Declaration

#### Parameters

##### stream

[`ReadableStream`](#readablestream)

#### Returns

[`ReadableStreamBYOBReader`](#readablestreambyobreader)

##### prototype

> **prototype**: [`ReadableStreamBYOBReader`](#readablestreambyobreader)

***

### ReadableStreamBYOBRequest

> **ReadableStreamBYOBRequest**: \{(): [`ReadableStreamBYOBRequest`](#readablestreambyobrequest); `prototype`: [`ReadableStreamBYOBRequest`](#readablestreambyobrequest); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:227

#### Type Declaration

#### Returns

[`ReadableStreamBYOBRequest`](#readablestreambyobrequest)

##### prototype

> **prototype**: [`ReadableStreamBYOBRequest`](#readablestreambyobrequest)

***

### ReadableStreamDefaultController

> **ReadableStreamDefaultController**: \{(): [`ReadableStreamDefaultController`](#readablestreamdefaultcontroller); `prototype`: [`ReadableStreamDefaultController`](#readablestreamdefaultcontroller); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:250

#### Type Declaration

#### Returns

[`ReadableStreamDefaultController`](#readablestreamdefaultcontroller)

##### prototype

> **prototype**: [`ReadableStreamDefaultController`](#readablestreamdefaultcontroller)

***

### ReadableStreamDefaultReader

> **ReadableStreamDefaultReader**: \{\<`R`\>(`stream`): [`ReadableStreamDefaultReader`](#readablestreamdefaultreader)\<`R`\>; `prototype`: [`ReadableStreamDefaultReader`](#readablestreamdefaultreader); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:202

#### Type Declaration

#### Parameters

##### stream

[`ReadableStream`](#readablestream)\<`R`\>

#### Returns

[`ReadableStreamDefaultReader`](#readablestreamdefaultreader)\<`R`\>

##### prototype

> **prototype**: [`ReadableStreamDefaultReader`](#readablestreamdefaultreader)

***

### WritableStream

> **WritableStream**: \{\<`W`\>(`underlyingSink?`, `strategy?`): [`WritableStream`](#writablestream)\<`W`\>; `prototype`: [`WritableStream`](#writablestream); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:295

#### Type Declaration

#### Parameters

##### underlyingSink?

[`UnderlyingSink`](#underlyingsink)\<`W`\>

##### strategy?

[`QueuingStrategy`](#queuingstrategy)\<`W`\>

#### Returns

[`WritableStream`](#writablestream)\<`W`\>

##### prototype

> **prototype**: [`WritableStream`](#writablestream)

***

### WritableStreamDefaultController

> **WritableStreamDefaultController**: \{(): [`WritableStreamDefaultController`](#writablestreamdefaultcontroller); `prototype`: [`WritableStreamDefaultController`](#writablestreamdefaultcontroller); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:330

#### Type Declaration

#### Returns

[`WritableStreamDefaultController`](#writablestreamdefaultcontroller)

##### prototype

> **prototype**: [`WritableStreamDefaultController`](#writablestreamdefaultcontroller)

***

### WritableStreamDefaultWriter

> **WritableStreamDefaultWriter**: \{\<`W`\>(`stream`): [`WritableStreamDefaultWriter`](#writablestreamdefaultwriter)\<`W`\>; `prototype`: [`WritableStreamDefaultWriter`](#writablestreamdefaultwriter); \}

Defined in: node\_modules/.pnpm/@types+node@24.13.2/node\_modules/@types/node/stream/web.d.ts:311

#### Type Declaration

#### Parameters

##### stream

[`WritableStream`](#writablestream)\<`W`\>

#### Returns

[`WritableStreamDefaultWriter`](#writablestreamdefaultwriter)\<`W`\>

##### prototype

> **prototype**: [`WritableStreamDefaultWriter`](#writablestreamdefaultwriter)
