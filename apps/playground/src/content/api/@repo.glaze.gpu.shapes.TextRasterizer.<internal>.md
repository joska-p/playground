---
title: gpu/shapes/TextRasterizer (internal)
package: "@repo/glaze"
kind: internal
module: gpu/shapes/TextRasterizer
---

## Interfaces

### AbortSignal

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3381

The **`AbortSignal`** interface represents a signal object that allows you to communicate with an asynchronous operation (such as a fetch request) and abort it if required via an AbortController object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal)

#### Extends

- `EventTarget`

#### Properties

##### aborted

> `readonly` **aborted**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3387

The **`aborted`** read-only property returns a value that indicates whether the asynchronous operations the signal is communicating with are aborted (true) or not (false).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/aborted)

##### onabort

> **onabort**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3389

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event)

##### reason

> `readonly` **reason**: `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3395

The **`reason`** read-only property returns a JavaScript value that indicates the abort reason.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/reason)

#### Methods

##### addEventListener()

###### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3402

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Type Parameters

###### K

`K` *extends* `"abort"`

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

###### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3403

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14386

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

###### Parameters

###### event

`Event`

###### Returns

`boolean`

###### Inherited from

`EventTarget.dispatchEvent`

##### removeEventListener()

###### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3404

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Type Parameters

###### K

`K` *extends* `"abort"`

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

###### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3405

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

##### throwIfAborted()

> **throwIfAborted**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3401

The **`throwIfAborted()`** method throws the signal's abort reason if the signal has been aborted; otherwise it does nothing.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/throwIfAborted)

###### Returns

`void`

***

### AbortSignalEventMap

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3372

#### Properties

##### abort

> **abort**: `Event`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3373

***

### AddEventListenerOptions

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:28

#### Extends

- [`EventListenerOptions`](#eventlisteneroptions)

#### Properties

##### capture?

> `optional` **capture?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:741

###### Inherited from

[`EventListenerOptions`](#eventlisteneroptions).[`capture`](#capture-1)

##### once?

> `optional` **once?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:29

##### passive?

> `optional` **passive?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:30

##### signal?

> `optional` **signal?**: [`AbortSignal`](#abortsignal)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:31

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

### CanvasCompositing

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10272

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### globalAlpha

> **globalAlpha**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10274

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalAlpha)

##### globalCompositeOperation

> **globalCompositeOperation**: [`GlobalCompositeOperation`](#globalcompositeoperation-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10276

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

***

### CanvasDrawImage

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10279

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### drawImage()

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10281

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10282

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

###### Call Signature

> **drawImage**(`image`, `sx`, `sy`, `sw`, `sh`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10283

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

***

### CanvasDrawPath

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10286

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### beginPath()

> **beginPath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10288

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/beginPath)

###### Returns

`void`

##### clip()

###### Call Signature

> **clip**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10290

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clip)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Call Signature

> **clip**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10291

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

##### fill()

###### Call Signature

> **fill**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10293

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fill)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Call Signature

> **fill**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10294

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

##### isPointInPath()

###### Call Signature

> **isPointInPath**(`x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10296

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInPath)

###### Parameters

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

###### Call Signature

> **isPointInPath**(`path`, `x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10297

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

##### isPointInStroke()

###### Call Signature

> **isPointInStroke**(`x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10299

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInStroke)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`boolean`

###### Call Signature

> **isPointInStroke**(`path`, `x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10300

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### Returns

`boolean`

##### stroke()

###### Call Signature

> **stroke**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10302

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/stroke)

###### Returns

`void`

###### Call Signature

> **stroke**(`path`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10303

###### Parameters

###### path

[`Path2D`](#path2d)

###### Returns

`void`

***

### CanvasFillStrokeStyles

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10306

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### fillStyle

> **fillStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10308

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle)

##### strokeStyle

> **strokeStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10310

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

#### Methods

##### createConicGradient()

> **createConicGradient**(`startAngle`, `x`, `y`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10312

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createConicGradient)

###### Parameters

###### startAngle

`number`

###### x

`number`

###### y

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

##### createLinearGradient()

> **createLinearGradient**(`x0`, `y0`, `x1`, `y1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10314

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### x1

`number`

###### y1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

##### createPattern()

> **createPattern**(`image`, `repetition`): [`CanvasPattern`](#canvaspattern) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10316

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createPattern)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### repetition

`string` \| `null`

###### Returns

[`CanvasPattern`](#canvaspattern) \| `null`

##### createRadialGradient()

> **createRadialGradient**(`x0`, `y0`, `r0`, `x1`, `y1`, `r1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10318

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### r0

`number`

###### x1

`number`

###### y1

`number`

###### r1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

***

### CanvasFilters

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10321

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### filter

> **filter**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10323

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/filter)

***

### CanvasGradient

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10331

The **`CanvasGradient`** interface represents an opaque object describing a gradient. It is returned by the methods CanvasRenderingContext2D.createLinearGradient(), CanvasRenderingContext2D.createConicGradient() or CanvasRenderingContext2D.createRadialGradient().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasGradient)

#### Methods

##### addColorStop()

> **addColorStop**(`offset`, `color`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10337

The **`CanvasGradient.addColorStop()`** method adds a new color stop, defined by an offset and a color, to a given canvas gradient.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasGradient/addColorStop)

###### Parameters

###### offset

`number`

###### color

`string`

###### Returns

`void`

***

### CanvasImageData

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10345

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### createImageData()

###### Call Signature

> **createImageData**(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10347

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createImageData)

###### Parameters

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

###### Call Signature

> **createImageData**(`imageData`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10348

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### Returns

[`ImageData`](#imagedata)

##### getImageData()

> **getImageData**(`sx`, `sy`, `sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10350

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getImageData)

###### Parameters

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

##### putImageData()

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10352

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/putImageData)

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`, `dirtyX`, `dirtyY`, `dirtyWidth`, `dirtyHeight`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10353

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### dirtyX

`number`

###### dirtyY

`number`

###### dirtyWidth

`number`

###### dirtyHeight

`number`

###### Returns

`void`

***

### CanvasImageSmoothing

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10356

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### imageSmoothingEnabled

> **imageSmoothingEnabled**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10358

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

##### imageSmoothingQuality

> **imageSmoothingQuality**: [`ImageSmoothingQuality`](#imagesmoothingquality-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10360

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality)

***

### CanvasPath

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10363

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`Path2D`](#path2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### arc()

> **arc**(`x`, `y`, `radius`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10365

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arc)

###### Parameters

###### x

`number`

###### y

`number`

###### radius

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

##### arcTo()

> **arcTo**(`x1`, `y1`, `x2`, `y2`, `radius`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10367

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arcTo)

###### Parameters

###### x1

`number`

###### y1

`number`

###### x2

`number`

###### y2

`number`

###### radius

`number`

###### Returns

`void`

##### bezierCurveTo()

> **bezierCurveTo**(`cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10369

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo)

###### Parameters

###### cp1x

`number`

###### cp1y

`number`

###### cp2x

`number`

###### cp2y

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

##### closePath()

> **closePath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10371

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/closePath)

###### Returns

`void`

##### ellipse()

> **ellipse**(`x`, `y`, `radiusX`, `radiusY`, `rotation`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10373

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/ellipse)

###### Parameters

###### x

`number`

###### y

`number`

###### radiusX

`number`

###### radiusY

`number`

###### rotation

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

##### lineTo()

> **lineTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10375

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

##### moveTo()

> **moveTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10377

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

##### quadraticCurveTo()

> **quadraticCurveTo**(`cpx`, `cpy`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10379

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)

###### Parameters

###### cpx

`number`

###### cpy

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

##### rect()

> **rect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10381

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

##### roundRect()

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10383

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| (`number` \| [`DOMPointInit`](#dompointinit))[]

###### Returns

`void`

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44554

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| [`Iterable`](#iterable)\<`number` \| [`DOMPointInit`](#dompointinit), `any`, `any`\>

###### Returns

`void`

***

### CanvasPathDrawingStyles

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10386

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### lineCap

> **lineCap**: [`CanvasLineCap`](#canvaslinecap)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10388

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineCap)

##### lineDashOffset

> **lineDashOffset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10390

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

##### lineJoin

> **lineJoin**: [`CanvasLineJoin`](#canvaslinejoin)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10392

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineJoin)

##### lineWidth

> **lineWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10394

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineWidth)

##### miterLimit

> **miterLimit**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10396

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/miterLimit)

#### Methods

##### getLineDash()

> **getLineDash**(): `number`[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10398

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getLineDash)

###### Returns

`number`[]

##### setLineDash()

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10400

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

`number`[]

###### Returns

`void`

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44559

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

***

### CanvasPattern

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10408

The **`CanvasPattern`** interface represents an opaque object describing a pattern, based on an image, a canvas, or a video, created by the CanvasRenderingContext2D.createPattern() method.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasPattern)

#### Methods

##### setTransform()

> **setTransform**(`transform?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10414

The **`CanvasPattern.setTransform()`** method uses a DOMMatrix object as the pattern's transformation matrix and invokes it on the pattern.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasPattern/setTransform)

###### Parameters

###### transform?

[`DOMMatrix2DInit`](#dommatrix2dinit)

###### Returns

`void`

***

### CanvasRect

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10422

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### clearRect()

> **clearRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10424

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clearRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

##### fillRect()

> **fillRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10426

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

##### strokeRect()

> **strokeRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10428

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

***

### CanvasRenderingContext2D

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10436

The **`CanvasRenderingContext2D`** interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a <canvas> element. It is used for drawing shapes, text, images, and other objects.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D)

#### Extends

- [`CanvasCompositing`](#canvascompositing).[`CanvasDrawImage`](#canvasdrawimage).[`CanvasDrawPath`](#canvasdrawpath).[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`CanvasFilters`](#canvasfilters).[`CanvasImageData`](#canvasimagedata).[`CanvasImageSmoothing`](#canvasimagesmoothing).[`CanvasPath`](#canvaspath).[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`CanvasRect`](#canvasrect).[`CanvasSettings`](#canvassettings).[`CanvasShadowStyles`](#canvasshadowstyles).[`CanvasState`](#canvasstate).[`CanvasText`](#canvastext).[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`CanvasTransform`](#canvastransform).[`CanvasUserInterface`](#canvasuserinterface)

#### Properties

##### canvas

> `readonly` **canvas**: [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10442

The **`CanvasRenderingContext2D.canvas`** property, part of the Canvas API, is a read-only reference to the HTMLCanvasElement object that is associated with a given context. It might be null if there is no associated <canvas> element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/canvas)

##### direction

> **direction**: [`CanvasDirection`](#canvasdirection)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10488

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/direction)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`direction`](#direction-1)

##### fillStyle

> **fillStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10308

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`fillStyle`](#fillstyle)

##### filter

> **filter**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10323

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/filter)

###### Inherited from

[`CanvasFilters`](#canvasfilters).[`filter`](#filter)

##### font

> **font**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10490

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/font)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`font`](#font-1)

##### fontKerning

> **fontKerning**: [`CanvasFontKerning`](#canvasfontkerning)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10492

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontKerning)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontKerning`](#fontkerning-1)

##### fontStretch

> **fontStretch**: [`CanvasFontStretch`](#canvasfontstretch)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10494

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontStretch)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontStretch`](#fontstretch-1)

##### fontVariantCaps

> **fontVariantCaps**: [`CanvasFontVariantCaps`](#canvasfontvariantcaps)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10496

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontVariantCaps)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontVariantCaps`](#fontvariantcaps-1)

##### globalAlpha

> **globalAlpha**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10274

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalAlpha)

###### Inherited from

[`CanvasCompositing`](#canvascompositing).[`globalAlpha`](#globalalpha)

##### globalCompositeOperation

> **globalCompositeOperation**: [`GlobalCompositeOperation`](#globalcompositeoperation-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10276

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

###### Inherited from

[`CanvasCompositing`](#canvascompositing).[`globalCompositeOperation`](#globalcompositeoperation)

##### imageSmoothingEnabled

> **imageSmoothingEnabled**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10358

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

###### Inherited from

[`CanvasImageSmoothing`](#canvasimagesmoothing).[`imageSmoothingEnabled`](#imagesmoothingenabled)

##### imageSmoothingQuality

> **imageSmoothingQuality**: [`ImageSmoothingQuality`](#imagesmoothingquality-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10360

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality)

###### Inherited from

[`CanvasImageSmoothing`](#canvasimagesmoothing).[`imageSmoothingQuality`](#imagesmoothingquality)

##### letterSpacing

> **letterSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10498

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/letterSpacing)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`letterSpacing`](#letterspacing-1)

##### lineCap

> **lineCap**: [`CanvasLineCap`](#canvaslinecap)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10388

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineCap)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineCap`](#linecap)

##### lineDashOffset

> **lineDashOffset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10390

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineDashOffset`](#linedashoffset)

##### lineJoin

> **lineJoin**: [`CanvasLineJoin`](#canvaslinejoin)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10392

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineJoin)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineJoin`](#linejoin)

##### lineWidth

> **lineWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10394

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineWidth)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineWidth`](#linewidth)

##### miterLimit

> **miterLimit**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10396

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/miterLimit)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`miterLimit`](#miterlimit)

##### shadowBlur

> **shadowBlur**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10457

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowBlur)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowBlur`](#shadowblur-1)

##### shadowColor

> **shadowColor**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10459

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowColor)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowColor`](#shadowcolor-1)

##### shadowOffsetX

> **shadowOffsetX**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10461

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowOffsetX`](#shadowoffsetx-1)

##### shadowOffsetY

> **shadowOffsetY**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10463

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowOffsetY`](#shadowoffsety-1)

##### strokeStyle

> **strokeStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10310

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`strokeStyle`](#strokestyle)

##### textAlign

> **textAlign**: [`CanvasTextAlign`](#canvastextalign)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10500

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textAlign`](#textalign-1)

##### textBaseline

> **textBaseline**: [`CanvasTextBaseline`](#canvastextbaseline)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10502

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textBaseline)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textBaseline`](#textbaseline-1)

##### textRendering

> **textRendering**: [`CanvasTextRendering`](#canvastextrendering)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10504

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textRendering)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textRendering`](#textrendering-1)

##### wordSpacing

> **wordSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10506

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/wordSpacing)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`wordSpacing`](#wordspacing-1)

#### Methods

##### arc()

> **arc**(`x`, `y`, `radius`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10365

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arc)

###### Parameters

###### x

`number`

###### y

`number`

###### radius

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arc`](#arc)

##### arcTo()

> **arcTo**(`x1`, `y1`, `x2`, `y2`, `radius`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10367

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arcTo)

###### Parameters

###### x1

`number`

###### y1

`number`

###### x2

`number`

###### y2

`number`

###### radius

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arcTo`](#arcto)

##### beginPath()

> **beginPath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10288

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/beginPath)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`beginPath`](#beginpath)

##### bezierCurveTo()

> **bezierCurveTo**(`cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10369

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo)

###### Parameters

###### cp1x

`number`

###### cp1y

`number`

###### cp2x

`number`

###### cp2y

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`bezierCurveTo`](#beziercurveto)

##### clearRect()

> **clearRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10424

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clearRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`clearRect`](#clearrect)

##### clip()

###### Call Signature

> **clip**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10290

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clip)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`clip`](#clip)

###### Call Signature

> **clip**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10291

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`clip`](#clip)

##### closePath()

> **closePath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10371

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/closePath)

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`closePath`](#closepath)

##### createConicGradient()

> **createConicGradient**(`startAngle`, `x`, `y`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10312

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createConicGradient)

###### Parameters

###### startAngle

`number`

###### x

`number`

###### y

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createConicGradient`](#createconicgradient)

##### createImageData()

###### Call Signature

> **createImageData**(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10347

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createImageData)

###### Parameters

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`createImageData`](#createimagedata)

###### Call Signature

> **createImageData**(`imageData`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10348

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`createImageData`](#createimagedata)

##### createLinearGradient()

> **createLinearGradient**(`x0`, `y0`, `x1`, `y1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10314

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### x1

`number`

###### y1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createLinearGradient`](#createlineargradient)

##### createPattern()

> **createPattern**(`image`, `repetition`): [`CanvasPattern`](#canvaspattern) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10316

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createPattern)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### repetition

`string` \| `null`

###### Returns

[`CanvasPattern`](#canvaspattern) \| `null`

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createPattern`](#createpattern)

##### createRadialGradient()

> **createRadialGradient**(`x0`, `y0`, `r0`, `x1`, `y1`, `r1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10318

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### r0

`number`

###### x1

`number`

###### y1

`number`

###### r1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createRadialGradient`](#createradialgradient)

##### drawFocusIfNeeded()

###### Call Signature

> **drawFocusIfNeeded**(`element`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10529

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded)

###### Parameters

###### element

[`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)

###### Returns

`void`

###### Inherited from

[`CanvasUserInterface`](#canvasuserinterface).[`drawFocusIfNeeded`](#drawfocusifneeded-1)

###### Call Signature

> **drawFocusIfNeeded**(`path`, `element`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10530

###### Parameters

###### path

[`Path2D`](#path2d)

###### element

[`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)

###### Returns

`void`

###### Inherited from

[`CanvasUserInterface`](#canvasuserinterface).[`drawFocusIfNeeded`](#drawfocusifneeded-1)

##### drawImage()

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10281

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10282

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

###### Call Signature

> **drawImage**(`image`, `sx`, `sy`, `sw`, `sh`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10283

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

##### ellipse()

> **ellipse**(`x`, `y`, `radiusX`, `radiusY`, `rotation`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10373

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/ellipse)

###### Parameters

###### x

`number`

###### y

`number`

###### radiusX

`number`

###### radiusY

`number`

###### rotation

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`ellipse`](#ellipse)

##### fill()

###### Call Signature

> **fill**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10293

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fill)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`fill`](#fill)

###### Call Signature

> **fill**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10294

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`fill`](#fill)

##### fillRect()

> **fillRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10426

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`fillRect`](#fillrect)

##### fillText()

> **fillText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10479

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

###### Inherited from

[`CanvasText`](#canvastext).[`fillText`](#filltext-1)

##### getContextAttributes()

> **getContextAttributes**(): [`CanvasRenderingContext2DSettings`](#canvasrenderingcontext2dsettings)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10452

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getContextAttributes)

###### Returns

[`CanvasRenderingContext2DSettings`](#canvasrenderingcontext2dsettings)

###### Inherited from

[`CanvasSettings`](#canvassettings).[`getContextAttributes`](#getcontextattributes-1)

##### getImageData()

> **getImageData**(`sx`, `sy`, `sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10350

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getImageData)

###### Parameters

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`getImageData`](#getimagedata)

##### getLineDash()

> **getLineDash**(): `number`[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10398

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getLineDash)

###### Returns

`number`[]

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`getLineDash`](#getlinedash)

##### getTransform()

> **getTransform**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10511

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getTransform)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`CanvasTransform`](#canvastransform).[`getTransform`](#gettransform-1)

##### isContextLost()

> **isContextLost**(): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10468

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isContextLost)

###### Returns

`boolean`

###### Inherited from

[`CanvasState`](#canvasstate).[`isContextLost`](#iscontextlost-1)

##### isPointInPath()

###### Call Signature

> **isPointInPath**(`x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10296

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInPath)

###### Parameters

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInPath`](#ispointinpath)

###### Call Signature

> **isPointInPath**(`path`, `x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10297

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInPath`](#ispointinpath)

##### isPointInStroke()

###### Call Signature

> **isPointInStroke**(`x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10299

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInStroke)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInStroke`](#ispointinstroke)

###### Call Signature

> **isPointInStroke**(`path`, `x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10300

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInStroke`](#ispointinstroke)

##### lineTo()

> **lineTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10375

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`lineTo`](#lineto)

##### measureText()

> **measureText**(`text`): [`TextMetrics`](#textmetrics)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10481

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/measureText)

###### Parameters

###### text

`string`

###### Returns

[`TextMetrics`](#textmetrics)

###### Inherited from

[`CanvasText`](#canvastext).[`measureText`](#measuretext-1)

##### moveTo()

> **moveTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10377

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`moveTo`](#moveto)

##### putImageData()

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10352

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/putImageData)

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`putImageData`](#putimagedata)

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`, `dirtyX`, `dirtyY`, `dirtyWidth`, `dirtyHeight`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10353

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### dirtyX

`number`

###### dirtyY

`number`

###### dirtyWidth

`number`

###### dirtyHeight

`number`

###### Returns

`void`

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`putImageData`](#putimagedata)

##### quadraticCurveTo()

> **quadraticCurveTo**(`cpx`, `cpy`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10379

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)

###### Parameters

###### cpx

`number`

###### cpy

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`quadraticCurveTo`](#quadraticcurveto)

##### rect()

> **rect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10381

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`rect`](#rect)

##### reset()

> **reset**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10470

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/reset)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`reset`](#reset-1)

##### resetTransform()

> **resetTransform**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10513

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/resetTransform)

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`resetTransform`](#resettransform-1)

##### restore()

> **restore**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10472

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/restore)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`restore`](#restore-1)

##### rotate()

> **rotate**(`angle`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10515

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)

###### Parameters

###### angle

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`rotate`](#rotate-1)

##### roundRect()

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10383

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| (`number` \| [`DOMPointInit`](#dompointinit))[]

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44554

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| [`Iterable`](#iterable)\<`number` \| [`DOMPointInit`](#dompointinit), `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

##### save()

> **save**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10474

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/save)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`save`](#save-1)

##### scale()

> **scale**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10517

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/scale)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`scale`](#scale-1)

##### setLineDash()

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10400

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

`number`[]

###### Returns

`void`

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`setLineDash`](#setlinedash)

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44559

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`setLineDash`](#setlinedash)

##### setTransform()

###### Call Signature

> **setTransform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10519

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setTransform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`setTransform`](#settransform-2)

###### Call Signature

> **setTransform**(`transform?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10520

###### Parameters

###### transform?

[`DOMMatrix2DInit`](#dommatrix2dinit)

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`setTransform`](#settransform-2)

##### stroke()

###### Call Signature

> **stroke**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10302

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/stroke)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`stroke`](#stroke)

###### Call Signature

> **stroke**(`path`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10303

###### Parameters

###### path

[`Path2D`](#path2d)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`stroke`](#stroke)

##### strokeRect()

> **strokeRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10428

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`strokeRect`](#strokerect)

##### strokeText()

> **strokeText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10483

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

###### Inherited from

[`CanvasText`](#canvastext).[`strokeText`](#stroketext-1)

##### transform()

> **transform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10522

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/transform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`transform`](#transform-1)

##### translate()

> **translate**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10524

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/translate)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`translate`](#translate-1)

***

### CanvasRenderingContext2DSettings

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:381

#### Properties

##### alpha?

> `optional` **alpha?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:382

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:383

##### desynchronized?

> `optional` **desynchronized?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:384

##### willReadFrequently?

> `optional` **willReadFrequently?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:385

***

### CanvasSettings

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10450

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)

#### Methods

##### getContextAttributes()

> **getContextAttributes**(): [`CanvasRenderingContext2DSettings`](#canvasrenderingcontext2dsettings)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10452

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getContextAttributes)

###### Returns

[`CanvasRenderingContext2DSettings`](#canvasrenderingcontext2dsettings)

***

### CanvasShadowStyles

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10455

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### shadowBlur

> **shadowBlur**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10457

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowBlur)

##### shadowColor

> **shadowColor**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10459

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowColor)

##### shadowOffsetX

> **shadowOffsetX**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10461

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)

##### shadowOffsetY

> **shadowOffsetY**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10463

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)

***

### CanvasState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10466

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### isContextLost()

> **isContextLost**(): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10468

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isContextLost)

###### Returns

`boolean`

##### reset()

> **reset**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10470

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/reset)

###### Returns

`void`

##### restore()

> **restore**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10472

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/restore)

###### Returns

`void`

##### save()

> **save**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10474

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/save)

###### Returns

`void`

***

### CanvasText

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10477

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### fillText()

> **fillText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10479

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

##### measureText()

> **measureText**(`text`): [`TextMetrics`](#textmetrics)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10481

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/measureText)

###### Parameters

###### text

`string`

###### Returns

[`TextMetrics`](#textmetrics)

##### strokeText()

> **strokeText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10483

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

***

### CanvasTextDrawingStyles

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10486

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Properties

##### direction

> **direction**: [`CanvasDirection`](#canvasdirection)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10488

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/direction)

##### font

> **font**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10490

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/font)

##### fontKerning

> **fontKerning**: [`CanvasFontKerning`](#canvasfontkerning)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10492

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontKerning)

##### fontStretch

> **fontStretch**: [`CanvasFontStretch`](#canvasfontstretch)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10494

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontStretch)

##### fontVariantCaps

> **fontVariantCaps**: [`CanvasFontVariantCaps`](#canvasfontvariantcaps)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10496

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontVariantCaps)

##### letterSpacing

> **letterSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10498

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/letterSpacing)

##### textAlign

> **textAlign**: [`CanvasTextAlign`](#canvastextalign)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10500

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign)

##### textBaseline

> **textBaseline**: [`CanvasTextBaseline`](#canvastextbaseline)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10502

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textBaseline)

##### textRendering

> **textRendering**: [`CanvasTextRendering`](#canvastextrendering)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10504

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textRendering)

##### wordSpacing

> **wordSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10506

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/wordSpacing)

***

### CanvasTransform

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10509

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)
- [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

#### Methods

##### getTransform()

> **getTransform**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10511

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getTransform)

###### Returns

[`DOMMatrix`](#dommatrix)

##### resetTransform()

> **resetTransform**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10513

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/resetTransform)

###### Returns

`void`

##### rotate()

> **rotate**(`angle`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10515

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)

###### Parameters

###### angle

`number`

###### Returns

`void`

##### scale()

> **scale**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10517

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/scale)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

##### setTransform()

###### Call Signature

> **setTransform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10519

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setTransform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

###### Call Signature

> **setTransform**(`transform?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10520

###### Parameters

###### transform?

[`DOMMatrix2DInit`](#dommatrix2dinit)

###### Returns

`void`

##### transform()

> **transform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10522

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/transform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

##### translate()

> **translate**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10524

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/translate)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

***

### CanvasUserInterface

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10527

#### Extended by

- [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)

#### Methods

##### drawFocusIfNeeded()

###### Call Signature

> **drawFocusIfNeeded**(`element`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10529

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded)

###### Parameters

###### element

[`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)

###### Returns

`void`

###### Call Signature

> **drawFocusIfNeeded**(`path`, `element`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10530

###### Parameters

###### path

[`Path2D`](#path2d)

###### element

[`Element`](@repo.palette-engine.colorSpaces.<internal>.md#element)

###### Returns

`void`

***

### DOMMatrix

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11435

The **`DOMMatrix`** interface represents 4×4 matrices, suitable for 2D and 3D operations including rotation and translation. It is a mutable version of the DOMMatrixReadOnly interface. The interface is available inside web workers.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix)

#### Extends

- [`DOMMatrixReadOnly`](#dommatrixreadonly)

#### Properties

##### a

> **a**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11437

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`a`](#a-3)

##### b

> **b**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11439

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`b`](#b-3)

##### c

> **c**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11441

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`c`](#c-3)

##### d

> **d**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11443

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`d`](#d-3)

##### e

> **e**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11445

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`e`](#e-3)

##### f

> **f**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11447

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`f`](#f-3)

##### is2D

> `readonly` **is2D**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11606

The readonly **`is2D`** property of the DOMMatrixReadOnly interface is a Boolean flag that is true when the matrix is 2D. The value is true if the matrix was initialized as a 2D matrix and only 2D transformation operations were applied. Otherwise, the matrix is defined in 3D, and is2D is false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/is2D)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`is2D`](#is2d-2)

##### isIdentity

> `readonly` **isIdentity**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11612

The readonly **`isIdentity`** property of the DOMMatrixReadOnly interface is a Boolean whose value is true if the matrix is the identity matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/isIdentity)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`isIdentity`](#isidentity-1)

##### m11

> **m11**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11449

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m11`](#m11-3)

##### m12

> **m12**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11451

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m12`](#m12-3)

##### m13

> **m13**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11453

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m13`](#m13-2)

##### m14

> **m14**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11455

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m14`](#m14-2)

##### m21

> **m21**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11457

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m21`](#m21-3)

##### m22

> **m22**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11459

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m22`](#m22-3)

##### m23

> **m23**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11461

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m23`](#m23-2)

##### m24

> **m24**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11463

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m24`](#m24-2)

##### m31

> **m31**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11465

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m31`](#m31-2)

##### m32

> **m32**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11467

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m32`](#m32-2)

##### m33

> **m33**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11469

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m33`](#m33-2)

##### m34

> **m34**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11471

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m34`](#m34-2)

##### m41

> **m41**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11473

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m41`](#m41-3)

##### m42

> **m42**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11475

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m42`](#m42-3)

##### m43

> **m43**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11477

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m43`](#m43-2)

##### m44

> **m44**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11479

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix#instance_properties)

###### Overrides

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`m44`](#m44-2)

#### Methods

##### flipX()

> **flipX**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11650

The **`flipX()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the x-axis. This is equivalent to multiplying the matrix by DOMMatrix(-1, 0, 0, 1, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipX)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`flipX`](#flipx-1)

##### flipY()

> **flipY**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11656

The **`flipY()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the y-axis. This is equivalent to multiplying the matrix by DOMMatrix(1, 0, 0, -1, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipY)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`flipY`](#flipy-1)

##### inverse()

> **inverse**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11662

The **`inverse()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the inverse of the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to NaN and its is2D property is set to false. The original matrix is not changed.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/inverse)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`inverse`](#inverse-1)

##### invertSelf()

> **invertSelf**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11485

The **`invertSelf()`** method of the DOMMatrix interface inverts the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to NaN and its is2D property is set to false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/invertSelf)

###### Returns

[`DOMMatrix`](#dommatrix)

##### multiply()

> **multiply**(`other?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11668

The **`multiply()`** method of the DOMMatrixReadOnly interface creates and returns a new matrix which is the dot product of the matrix and the otherMatrix parameter. If otherMatrix is omitted, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/multiply)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`multiply`](#multiply-1)

##### multiplySelf()

> **multiplySelf**(`other?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11491

The **`multiplySelf()`** method of the DOMMatrix interface multiplies a matrix by the otherMatrix parameter, computing the dot product of the original matrix and the specified matrix: A⋅B. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/multiplySelf)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrix`](#dommatrix)

##### preMultiplySelf()

> **preMultiplySelf**(`other?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11497

The **`preMultiplySelf()`** method of the DOMMatrix interface modifies the matrix by pre-multiplying it with the specified DOMMatrix. This is equivalent to the dot product B⋅A, where matrix A is the source matrix and B is the matrix given as an input to the method. If no matrix is specified as the multiplier, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/preMultiplySelf)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotate()

> **rotate**(`rotX?`, `rotY?`, `rotZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11674

The **`rotate()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix around each of its axes by the specified number of degrees. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotate)

###### Parameters

###### rotX?

`number`

###### rotY?

`number`

###### rotZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`rotate`](#rotate-3)

##### rotateAxisAngle()

> **rotateAxisAngle**(`x?`, `y?`, `z?`, `angle?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11680

The **`rotateAxisAngle()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix by the given vector and angle. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateAxisAngle)

###### Parameters

###### x?

`number`

###### y?

`number`

###### z?

`number`

###### angle?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`rotateAxisAngle`](#rotateaxisangle-1)

##### rotateAxisAngleSelf()

> **rotateAxisAngleSelf**(`x?`, `y?`, `z?`, `angle?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11503

The **`rotateAxisAngleSelf()`** method of the DOMMatrix interface is a transformation method that rotates the source matrix by the given vector and angle, returning the altered matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateAxisAngleSelf)

###### Parameters

###### x?

`number`

###### y?

`number`

###### z?

`number`

###### angle?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotateFromVector()

> **rotateFromVector**(`x?`, `y?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11686

The **`rotateFromVector()`** method of the DOMMatrixReadOnly interface is returns a new DOMMatrix created by rotating the source matrix by the angle between the specified vector and (1, 0). The rotation angle is determined by the angle between the vector (1,0)T and (x,y)T in the clockwise direction, or (+/-)arctan(y/x). If x and y are both 0, the angle is specified as 0. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateFromVector)

###### Parameters

###### x?

`number`

###### y?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`rotateFromVector`](#rotatefromvector-1)

##### rotateFromVectorSelf()

> **rotateFromVectorSelf**(`x?`, `y?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11509

The **`rotateFromVectorSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by rotating the matrix by the angle between the specified vector and (1, 0). The rotation angle is determined by the angle between the vector (1,0)T and (x,y)T in the clockwise direction, or (+/-)arctan(y/x). If x and y are both 0, the angle is specified as 0, and the matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateFromVectorSelf)

###### Parameters

###### x?

`number`

###### y?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotateSelf()

> **rotateSelf**(`rotX?`, `rotY?`, `rotZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11515

The **`rotateSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It rotates the source matrix around each of its axes by the specified number of degrees and returns the rotated matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/rotateSelf)

###### Parameters

###### rotX?

`number`

###### rotY?

`number`

###### rotZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### scale()

> **scale**(`scaleX?`, `scaleY?`, `scaleZ?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11692

The **`scale()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a scale transform applied.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale)

###### Parameters

###### scaleX?

`number`

###### scaleY?

`number`

###### scaleZ?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`scale`](#scale-3)

##### scale3d()

> **scale3d**(`scale?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11698

The **`scale3d()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the result of a 3D scale transform being applied to the matrix. It returns a new DOMMatrix created by scaling the source 3d matrix by the given scale factor centered on the origin point specified by the origin parameters, with a default origin of (0, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale3d)

###### Parameters

###### scale?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`scale3d`](#scale3d-1)

##### scale3dSelf()

> **scale3dSelf**(`scale?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11521

The **`scale3dSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor to all three axes, centered on the given origin, with a default origin of (0, 0, 0), returning the 3D-scaled matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/scale3dSelf)

###### Parameters

###### scale?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### ~~scaleNonUniform()~~

> **scaleNonUniform**(`scaleX?`, `scaleY?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11700

###### Parameters

###### scaleX?

`number`

###### scaleY?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Deprecated

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`scaleNonUniform`](#scalenonuniform-1)

##### scaleSelf()

> **scaleSelf**(`scaleX?`, `scaleY?`, `scaleZ?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11527

The **`scaleSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix by applying a specified scaling factor, centered on the given origin, with a default origin of (0, 0), returning the scaled matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/scaleSelf)

###### Parameters

###### scaleX?

`number`

###### scaleY?

`number`

###### scaleZ?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### setMatrixValue()

> **setMatrixValue**(`transformList`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11533

The **`setMatrixValue()`** method of the DOMMatrix interface replaces the contents of the matrix with the matrix described by the specified transform or transforms, returning itself.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/setMatrixValue)

###### Parameters

###### transformList

`string`

###### Returns

[`DOMMatrix`](#dommatrix)

##### skewX()

> **skewX**(`sx?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11706

The **`skewX()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its x-axis. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewX)

###### Parameters

###### sx?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`skewX`](#skewx-1)

##### skewXSelf()

> **skewXSelf**(`sx?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11539

The **`skewXSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the X-axis and returns the skewed matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/skewXSelf)

###### Parameters

###### sx?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### skewY()

> **skewY**(`sy?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11712

The **`skewY()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its y-axis. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewY)

###### Parameters

###### sy?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`skewY`](#skewy-1)

##### skewYSelf()

> **skewYSelf**(`sy?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11545

The **`skewYSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It skews the source matrix by applying the specified skew transformation along the Y-axis and returns the skewed matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/skewYSelf)

###### Parameters

###### sy?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### toFloat32Array()

> **toFloat32Array**(): `Float32Array`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11718

The **`toFloat32Array()`** method of the DOMMatrixReadOnly interface returns a new Float32Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as single-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat32Array)

###### Returns

`Float32Array`\<`ArrayBuffer`\>

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`toFloat32Array`](#tofloat32array-1)

##### toFloat64Array()

> **toFloat64Array**(): `Float64Array`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11724

The **`toFloat64Array()`** method of the DOMMatrixReadOnly interface returns a new Float64Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as double-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat64Array)

###### Returns

`Float64Array`\<`ArrayBuffer`\>

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`toFloat64Array`](#tofloat64array-1)

##### toJSON()

> **toJSON**(): `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11730

The **`toJSON()`** method of the DOMMatrixReadOnly interface creates and returns a JSON object. The JSON object includes the 2D matrix elements a through f, the 16 elements of the 4X4 3D matrix, m[1-4][1-4], the boolean is2D property, and the boolean isIdentity property.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toJSON)

###### Returns

`any`

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`toJSON`](#tojson-1)

##### toString()

> **toString**(): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11743

###### Returns

`string`

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`toString`](#tostring-1)

##### transformPoint()

> **transformPoint**(`point?`): [`DOMPoint`](#dompoint)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11736

The **`transformPoint`** method of the DOMMatrixReadOnly interface creates a new DOMPoint object, transforming a specified point by the matrix. Neither the matrix nor the original point are altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/transformPoint)

###### Parameters

###### point?

[`DOMPointInit`](#dompointinit)

###### Returns

[`DOMPoint`](#dompoint)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`transformPoint`](#transformpoint-1)

##### translate()

> **translate**(`tx?`, `ty?`, `tz?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11742

The **`translate()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a translation applied.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/translate)

###### Parameters

###### tx?

`number`

###### ty?

`number`

###### tz?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`DOMMatrixReadOnly`](#dommatrixreadonly).[`translate`](#translate-3)

##### translateSelf()

> **translateSelf**(`tx?`, `ty?`, `tz?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11551

The **`translateSelf()`** method of the DOMMatrix interface is a mutable transformation method that modifies a matrix. It applies the specified vectors and returns the updated matrix. The default vector is [0, 0, 0].

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/translateSelf)

###### Parameters

###### tx?

`number`

###### ty?

`number`

###### tz?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

***

### DOMMatrix2DInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:554

#### Extended by

- [`DOMMatrixInit`](#dommatrixinit)

#### Properties

##### a?

> `optional` **a?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:555

##### b?

> `optional` **b?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:556

##### c?

> `optional` **c?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:557

##### d?

> `optional` **d?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:558

##### e?

> `optional` **e?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:559

##### f?

> `optional` **f?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:560

##### m11?

> `optional` **m11?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:561

##### m12?

> `optional` **m12?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:562

##### m21?

> `optional` **m21?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:563

##### m22?

> `optional` **m22?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:564

##### m41?

> `optional` **m41?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:565

##### m42?

> `optional` **m42?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:566

***

### DOMMatrixInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:569

#### Extends

- [`DOMMatrix2DInit`](#dommatrix2dinit)

#### Properties

##### a?

> `optional` **a?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:555

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`a`](#a-1)

##### b?

> `optional` **b?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:556

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`b`](#b-1)

##### c?

> `optional` **c?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:557

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`c`](#c-1)

##### d?

> `optional` **d?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:558

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`d`](#d-1)

##### e?

> `optional` **e?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:559

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`e`](#e-1)

##### f?

> `optional` **f?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:560

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`f`](#f-1)

##### is2D?

> `optional` **is2D?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:570

##### m11?

> `optional` **m11?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:561

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m11`](#m11-1)

##### m12?

> `optional` **m12?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:562

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m12`](#m12-1)

##### m13?

> `optional` **m13?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:571

##### m14?

> `optional` **m14?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:572

##### m21?

> `optional` **m21?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:563

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m21`](#m21-1)

##### m22?

> `optional` **m22?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:564

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m22`](#m22-1)

##### m23?

> `optional` **m23?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:573

##### m24?

> `optional` **m24?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:574

##### m31?

> `optional` **m31?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:575

##### m32?

> `optional` **m32?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:576

##### m33?

> `optional` **m33?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:577

##### m34?

> `optional` **m34?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:578

##### m41?

> `optional` **m41?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:565

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m41`](#m41-1)

##### m42?

> `optional` **m42?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:566

###### Inherited from

[`DOMMatrix2DInit`](#dommatrix2dinit).[`m42`](#m42-1)

##### m43?

> `optional` **m43?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:579

##### m44?

> `optional` **m44?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:580

***

### DOMMatrixReadOnly

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11588

The **`DOMMatrixReadOnly`** interface represents a read-only 4×4 matrix, suitable for 2D and 3D operations. The DOMMatrix interface — which is based upon DOMMatrixReadOnly—adds mutability, allowing you to alter the matrix after creating it.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly)

#### Extended by

- [`DOMMatrix`](#dommatrix)

#### Properties

##### a

> `readonly` **a**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11590

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### b

> `readonly` **b**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11592

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### c

> `readonly` **c**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11594

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### d

> `readonly` **d**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11596

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### e

> `readonly` **e**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11598

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### f

> `readonly` **f**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11600

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### is2D

> `readonly` **is2D**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11606

The readonly **`is2D`** property of the DOMMatrixReadOnly interface is a Boolean flag that is true when the matrix is 2D. The value is true if the matrix was initialized as a 2D matrix and only 2D transformation operations were applied. Otherwise, the matrix is defined in 3D, and is2D is false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/is2D)

##### isIdentity

> `readonly` **isIdentity**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11612

The readonly **`isIdentity`** property of the DOMMatrixReadOnly interface is a Boolean whose value is true if the matrix is the identity matrix.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/isIdentity)

##### m11

> `readonly` **m11**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11614

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m12

> `readonly` **m12**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11616

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m13

> `readonly` **m13**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11618

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m14

> `readonly` **m14**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11620

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m21

> `readonly` **m21**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11622

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m22

> `readonly` **m22**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11624

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m23

> `readonly` **m23**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11626

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m24

> `readonly` **m24**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11628

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m31

> `readonly` **m31**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11630

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m32

> `readonly` **m32**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11632

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m33

> `readonly` **m33**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11634

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m34

> `readonly` **m34**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11636

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m41

> `readonly` **m41**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11638

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m42

> `readonly` **m42**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11640

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m43

> `readonly` **m43**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11642

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

##### m44

> `readonly` **m44**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11644

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly#instance_properties)

#### Methods

##### flipX()

> **flipX**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11650

The **`flipX()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the x-axis. This is equivalent to multiplying the matrix by DOMMatrix(-1, 0, 0, 1, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipX)

###### Returns

[`DOMMatrix`](#dommatrix)

##### flipY()

> **flipY**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11656

The **`flipY()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix flipped about the y-axis. This is equivalent to multiplying the matrix by DOMMatrix(1, 0, 0, -1, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/flipY)

###### Returns

[`DOMMatrix`](#dommatrix)

##### inverse()

> **inverse**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11662

The **`inverse()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the inverse of the original matrix. If the matrix cannot be inverted, the new matrix's components are all set to NaN and its is2D property is set to false. The original matrix is not changed.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/inverse)

###### Returns

[`DOMMatrix`](#dommatrix)

##### multiply()

> **multiply**(`other?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11668

The **`multiply()`** method of the DOMMatrixReadOnly interface creates and returns a new matrix which is the dot product of the matrix and the otherMatrix parameter. If otherMatrix is omitted, the matrix is multiplied by a matrix in which every element is 0 except the bottom-right corner and the element immediately above and to its left: m33 and m34. These have the default value of 1. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/multiply)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotate()

> **rotate**(`rotX?`, `rotY?`, `rotZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11674

The **`rotate()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix around each of its axes by the specified number of degrees. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotate)

###### Parameters

###### rotX?

`number`

###### rotY?

`number`

###### rotZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotateAxisAngle()

> **rotateAxisAngle**(`x?`, `y?`, `z?`, `angle?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11680

The **`rotateAxisAngle()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by rotating the source matrix by the given vector and angle. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateAxisAngle)

###### Parameters

###### x?

`number`

###### y?

`number`

###### z?

`number`

###### angle?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### rotateFromVector()

> **rotateFromVector**(`x?`, `y?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11686

The **`rotateFromVector()`** method of the DOMMatrixReadOnly interface is returns a new DOMMatrix created by rotating the source matrix by the angle between the specified vector and (1, 0). The rotation angle is determined by the angle between the vector (1,0)T and (x,y)T in the clockwise direction, or (+/-)arctan(y/x). If x and y are both 0, the angle is specified as 0. The original matrix is not altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/rotateFromVector)

###### Parameters

###### x?

`number`

###### y?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### scale()

> **scale**(`scaleX?`, `scaleY?`, `scaleZ?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11692

The **`scale()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a scale transform applied.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale)

###### Parameters

###### scaleX?

`number`

###### scaleY?

`number`

###### scaleZ?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### scale3d()

> **scale3d**(`scale?`, `originX?`, `originY?`, `originZ?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11698

The **`scale3d()`** method of the DOMMatrixReadOnly interface creates a new matrix which is the result of a 3D scale transform being applied to the matrix. It returns a new DOMMatrix created by scaling the source 3d matrix by the given scale factor centered on the origin point specified by the origin parameters, with a default origin of (0, 0, 0). The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/scale3d)

###### Parameters

###### scale?

`number`

###### originX?

`number`

###### originY?

`number`

###### originZ?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### ~~scaleNonUniform()~~

> **scaleNonUniform**(`scaleX?`, `scaleY?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11700

###### Parameters

###### scaleX?

`number`

###### scaleY?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

###### Deprecated

##### skewX()

> **skewX**(`sx?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11706

The **`skewX()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its x-axis. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewX)

###### Parameters

###### sx?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### skewY()

> **skewY**(`sy?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11712

The **`skewY()`** method of the DOMMatrixReadOnly interface returns a new DOMMatrix created by applying the specified skew transformation to the source matrix along its y-axis. The original matrix is not modified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/skewY)

###### Parameters

###### sy?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

##### toFloat32Array()

> **toFloat32Array**(): `Float32Array`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11718

The **`toFloat32Array()`** method of the DOMMatrixReadOnly interface returns a new Float32Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as single-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat32Array)

###### Returns

`Float32Array`\<`ArrayBuffer`\>

##### toFloat64Array()

> **toFloat64Array**(): `Float64Array`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11724

The **`toFloat64Array()`** method of the DOMMatrixReadOnly interface returns a new Float64Array containing all 16 elements (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) which comprise the matrix. The elements are stored into the array as double-precision floating-point numbers in column-major (colexographical access, or "colex") order. (In other words, down the first column from top to bottom, then the second column, and so forth.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toFloat64Array)

###### Returns

`Float64Array`\<`ArrayBuffer`\>

##### toJSON()

> **toJSON**(): `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11730

The **`toJSON()`** method of the DOMMatrixReadOnly interface creates and returns a JSON object. The JSON object includes the 2D matrix elements a through f, the 16 elements of the 4X4 3D matrix, m[1-4][1-4], the boolean is2D property, and the boolean isIdentity property.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/toJSON)

###### Returns

`any`

##### toString()

> **toString**(): `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11743

###### Returns

`string`

##### transformPoint()

> **transformPoint**(`point?`): [`DOMPoint`](#dompoint)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11736

The **`transformPoint`** method of the DOMMatrixReadOnly interface creates a new DOMPoint object, transforming a specified point by the matrix. Neither the matrix nor the original point are altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/transformPoint)

###### Parameters

###### point?

[`DOMPointInit`](#dompointinit)

###### Returns

[`DOMPoint`](#dompoint)

##### translate()

> **translate**(`tx?`, `ty?`, `tz?`): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11742

The **`translate()`** method of the DOMMatrixReadOnly interface creates a new matrix being the result of the original matrix with a translation applied.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/translate)

###### Parameters

###### tx?

`number`

###### ty?

`number`

###### tz?

`number`

###### Returns

[`DOMMatrix`](#dommatrix)

***

### DOMPoint

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11793

A **`DOMPoint`** object represents a 2D or 3D point in a coordinate system; it includes values for the coordinates in up to three dimensions, as well as an optional perspective value. DOMPoint is based on DOMPointReadOnly but allows its properties' values to be changed.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint)

#### Extends

- [`DOMPointReadOnly`](#dompointreadonly)

#### Properties

##### w

> **w**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11799

The DOMPoint interface's **`w`** property holds the point's perspective value, w, for a point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/w)

###### Overrides

[`DOMPointReadOnly`](#dompointreadonly).[`w`](#w-2)

##### x

> **x**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11805

The DOMPoint interface's **`x`** property holds the horizontal coordinate, x, for a point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/x)

###### Overrides

[`DOMPointReadOnly`](#dompointreadonly).[`x`](#x-2)

##### y

> **y**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11811

The DOMPoint interface's **`y`** property holds the vertical coordinate, y, for a point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/y)

###### Overrides

[`DOMPointReadOnly`](#dompointreadonly).[`y`](#y-2)

##### z

> **z**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11817

The DOMPoint interface's **`z`** property specifies the depth coordinate of a point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/z)

###### Overrides

[`DOMPointReadOnly`](#dompointreadonly).[`z`](#z-2)

#### Methods

##### matrixTransform()

> **matrixTransform**(`matrix?`): [`DOMPoint`](#dompoint)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11869

The **`matrixTransform()`** method of the DOMPointReadOnly interface applies a matrix transform specified as an object to the DOMPointReadOnly object, creating and returning a new DOMPointReadOnly object. Neither the matrix nor the point are altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/matrixTransform)

###### Parameters

###### matrix?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMPoint`](#dompoint)

###### Inherited from

[`DOMPointReadOnly`](#dompointreadonly).[`matrixTransform`](#matrixtransform-1)

##### toJSON()

> **toJSON**(): `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11875

The DOMPointReadOnly method **`toJSON()`** returns an object giving the JSON form of the point object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/toJSON)

###### Returns

`any`

###### Inherited from

[`DOMPointReadOnly`](#dompointreadonly).[`toJSON`](#tojson-3)

***

### DOMPointInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:583

#### Properties

##### w?

> `optional` **w?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:584

##### x?

> `optional` **x?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:585

##### y?

> `optional` **y?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:586

##### z?

> `optional` **z?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:587

***

### DOMPointReadOnly

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11839

The **`DOMPointReadOnly`** interface specifies the coordinate and perspective fields used by DOMPoint to define a 2D or 3D point in a coordinate system.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly)

#### Extended by

- [`DOMPoint`](#dompoint)

#### Properties

##### w

> `readonly` **w**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11845

The DOMPointReadOnly interface's **`w`** property holds the point's perspective value, w, for a read-only point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/w)

##### x

> `readonly` **x**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11851

The DOMPointReadOnly interface's **`x`** property holds the horizontal coordinate, x, for a read-only point in space. This property cannot be changed by JavaScript code in this read-only version of the DOMPoint object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/x)

##### y

> `readonly` **y**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11857

The DOMPointReadOnl**`y`** interface's y property holds the vertical coordinate, y, for a read-only point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/y)

##### z

> `readonly` **z**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11863

The DOMPointReadOnly interface's **`z`** property holds the depth coordinate, z, for a read-only point in space.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/z)

#### Methods

##### matrixTransform()

> **matrixTransform**(`matrix?`): [`DOMPoint`](#dompoint)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11869

The **`matrixTransform()`** method of the DOMPointReadOnly interface applies a matrix transform specified as an object to the DOMPointReadOnly object, creating and returning a new DOMPointReadOnly object. Neither the matrix nor the point are altered.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/matrixTransform)

###### Parameters

###### matrix?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMPoint`](#dompoint)

##### toJSON()

> **toJSON**(): `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11875

The DOMPointReadOnly method **`toJSON()`** returns an object giving the JSON form of the point object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/toJSON)

###### Returns

`any`

***

### DOMRectInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:597

#### Properties

##### height?

> `optional` **height?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:598

##### width?

> `optional` **width?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:599

##### x?

> `optional` **x?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:600

##### y?

> `optional` **y?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:601

***

### DOMRectReadOnly

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12027

The **`DOMRectReadOnly`** interface specifies the standard properties (also used by DOMRect) to define a rectangle whose properties are immutable.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly)

#### Properties

##### bottom

> `readonly` **bottom**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12033

The **`bottom`** read-only property of the DOMRectReadOnly interface returns the bottom coordinate value of the DOMRect. (Has the same value as y + height, or y if height is negative.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/bottom)

##### height

> `readonly` **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12039

The **`height`** read-only property of the DOMRectReadOnly interface represents the height of the DOMRect.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/height)

##### left

> `readonly` **left**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12045

The **`left`** read-only property of the DOMRectReadOnly interface returns the left coordinate value of the DOMRect. (Has the same value as x, or x + width if width is negative.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/left)

##### right

> `readonly` **right**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12051

The **`right`** read-only property of the DOMRectReadOnly interface returns the right coordinate value of the DOMRect. (Has the same value as x + width, or x if width is negative.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/right)

##### top

> `readonly` **top**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12057

The **`top`** read-only property of the DOMRectReadOnly interface returns the top coordinate value of the DOMRect. (Has the same value as y, or y + height if height is negative.)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/top)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12063

The **`width`** read-only property of the DOMRectReadOnly interface represents the width of the DOMRect.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/width)

##### x

> `readonly` **x**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12069

The **`x`** read-only property of the DOMRectReadOnly interface represents the x coordinate of the DOMRect's origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/x)

##### y

> `readonly` **y**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12075

The **`y`** read-only property of the DOMRectReadOnly interface represents the y coordinate of the DOMRect's origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/y)

#### Methods

##### toJSON()

> **toJSON**(): `any`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12081

The DOMRectReadOnly method **`toJSON()`** returns a JSON representation of the DOMRectReadOnly object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/toJSON)

###### Returns

`any`

***

### EventInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:734

#### Extended by

- [`GPUUncapturedErrorEventInit`](#gpuuncapturederroreventinit)

#### Properties

##### bubbles?

> `optional` **bubbles?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:735

##### cancelable?

> `optional` **cancelable?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:736

##### composed?

> `optional` **composed?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:737

***

### EventListener()

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14300

> **EventListener**(`evt`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14301

#### Parameters

##### evt

`Event`

#### Returns

`void`

***

### EventListenerObject

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14304

#### Methods

##### handleEvent()

> **handleEvent**(`object`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14305

###### Parameters

###### object

`Event`

###### Returns

`void`

***

### EventListenerOptions

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:740

#### Extended by

- [`AddEventListenerOptions`](#addeventlisteneroptions)
- [`AddEventListenerOptions`](@repo.palette-engine.colorSpaces.<internal>.md#addeventlisteneroptions)

#### Properties

##### capture?

> `optional` **capture?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:741

***

### GPUAdapterInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15193

The **`GPUAdapterInfo`** interface of the WebGPU API contains identifying information about a GPUAdapter.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo)

#### Properties

##### architecture

> `readonly` **architecture**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15199

The **`architecture`** read-only property of the GPUAdapterInfo interface returns the name of the family or class of GPUs the adapter belongs to, or an empty string if it is not available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/architecture)

##### description

> `readonly` **description**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15205

The **`description`** read-only property of the GPUAdapterInfo interface returns a human-readable string describing the adapter, or an empty string if it is not available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/description)

##### device

> `readonly` **device**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15211

The **`device`** read-only property of the GPUAdapterInfo interface returns a vendor-specific identifier for the adapter, or an empty string if it is not available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/device)

##### isFallbackAdapter

> `readonly` **isFallbackAdapter**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15217

The **`isFallbackAdapter`** read-only property of the GPUAdapterInfo interface returns true if the adapter is a fallback adapter, and false if not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/isFallbackAdapter)

##### subgroupMaxSize

> `readonly` **subgroupMaxSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15223

The **`subgroupMaxSize`** read-only property of the GPUAdapterInfo interface returns the maximum supported subgroup size for the GPUAdapter. This can be used along with the subgroups feature.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/subgroupMaxSize)

##### subgroupMinSize

> `readonly` **subgroupMinSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15229

The **`subgroupMinSize`** read-only property of the GPUAdapterInfo interface returns the minimum supported subgroup size for the GPUAdapter. This can be used along with the subgroups feature.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/subgroupMinSize)

##### vendor

> `readonly` **vendor**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15235

The **`vendor`** read-only property of the GPUAdapterInfo interface returns the name of the adapter vendor, or an empty string if it is not available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUAdapterInfo/vendor)

***

### GPUBindGroup

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15249

The **`GPUBindGroup`** interface of the WebGPU API is based on a GPUBindGroupLayout and defines a set of resources to be bound together in a group and how those resources are used in shader stages.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUBindGroupDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:824

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### entries

> **entries**: [`GPUBindGroupEntry`](#gpubindgroupentry)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:825

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### layout

> **layout**: [`GPUBindGroupLayout`](#gpubindgrouplayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:826

***

### GPUBindGroupEntry

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:829

#### Properties

##### binding

> **binding**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:830

##### resource

> **resource**: [`GPUBindingResource`](#gpubindingresource)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:831

***

### GPUBindGroupLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15263

The **`GPUBindGroupLayout`** interface of the WebGPU API defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating GPUBindGroups.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroupLayout)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUBindGroupLayoutDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:834

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### entries

> **entries**: [`GPUBindGroupLayoutEntry`](#gpubindgrouplayoutentry)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:835

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPUBindGroupLayoutEntry

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:838

#### Properties

##### binding

> **binding**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:839

##### buffer?

> `optional` **buffer?**: [`GPUBufferBindingLayout`](#gpubufferbindinglayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:840

##### externalTexture?

> `optional` **externalTexture?**: [`GPUExternalTextureBindingLayout`](#gpuexternaltexturebindinglayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:841

##### sampler?

> `optional` **sampler?**: [`GPUSamplerBindingLayout`](#gpusamplerbindinglayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:842

##### storageTexture?

> `optional` **storageTexture?**: [`GPUStorageTextureBindingLayout`](#gpustoragetexturebindinglayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:843

##### texture?

> `optional` **texture?**: [`GPUTextureBindingLayout`](#gputexturebindinglayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:844

##### visibility

> **visibility**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:845

***

### GPUBindingCommandsMixin

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15271

#### Extended by

- [`GPURenderBundleEncoder`](#gpurenderbundleencoder)
- [`GPUComputePassEncoder`](#gpucomputepassencoder)
- [`GPURenderPassEncoder`](#gpurenderpassencoder)

#### Methods

##### setBindGroup()

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15273

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

`number`[]

###### Returns

`void`

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsetsData`, `dynamicOffsetsDataStart`, `dynamicOffsetsDataLength`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15274

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsetsData

`Uint32Array`\<[`ArrayBufferLike`](#arraybufferlike)\>

###### dynamicOffsetsDataStart

`number`

###### dynamicOffsetsDataLength

`number`

###### Returns

`void`

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44625

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

[`Iterable`](#iterable)\<`number`, `any`, `any`\>

###### Returns

`void`

***

### GPUBlendComponent

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:848

#### Properties

##### dstFactor?

> `optional` **dstFactor?**: [`GPUBlendFactor`](#gpublendfactor)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:849

##### operation?

> `optional` **operation?**: [`GPUBlendOperation`](#gpublendoperation)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:850

##### srcFactor?

> `optional` **srcFactor?**: [`GPUBlendFactor`](#gpublendfactor)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:851

***

### GPUBlendState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:854

#### Properties

##### alpha

> **alpha**: [`GPUBlendComponent`](#gpublendcomponent)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:855

##### color

> **color**: [`GPUBlendComponent`](#gpublendcomponent)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:856

***

### GPUBuffer

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15283

The **`GPUBuffer`** interface of the WebGPU API represents a block of memory that can be used to store raw data to use in GPU operations.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

##### mapState

> `readonly` **mapState**: [`GPUBufferMapState`](#gpubuffermapstate-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15289

The **`mapState`** read-only property of the GPUBuffer interface represents the mapped state of the GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/mapState)

##### size

> `readonly` **size**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15295

The **`size`** read-only property of the GPUBuffer interface represents the length of the GPUBuffer's memory allocation, in bytes.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/size)

##### usage

> `readonly` **usage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15301

The **`usage`** read-only property of the GPUBuffer interface contains the bitwise flags representing the allowed usages of the GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/usage)

#### Methods

##### destroy()

> **destroy**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15307

The **`destroy()`** method of the GPUBuffer interface destroys the GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/destroy)

###### Returns

`void`

##### getMappedRange()

> **getMappedRange**(`offset?`, `size?`): `ArrayBuffer`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15313

The **`getMappedRange()`** method of the GPUBuffer interface returns an ArrayBuffer containing the mapped contents of the GPUBuffer in the specified range.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/getMappedRange)

###### Parameters

###### offset?

`number`

###### size?

`number`

###### Returns

`ArrayBuffer`

##### mapAsync()

> **mapAsync**(`mode`, `offset?`, `size?`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15319

The **`mapAsync()`** method of the GPUBuffer interface maps the specified range of the GPUBuffer. It returns a Promise that resolves when the GPUBuffer's content is ready to be accessed. While the GPUBuffer is mapped it cannot be used in any GPU commands.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/mapAsync)

###### Parameters

###### mode

`number`

###### offset?

`number`

###### size?

`number`

###### Returns

`Promise`\<`void`\>

##### unmap()

> **unmap**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15325

The **`unmap()`** method of the GPUBuffer interface unmaps the mapped range of the GPUBuffer, making its contents available for use by the GPU again after it has previously been mapped with GPUBuffer.mapAsync() (the GPU cannot access a mapped GPUBuffer).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBuffer/unmap)

###### Returns

`void`

***

### GPUBufferBinding

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:859

#### Properties

##### buffer

> **buffer**: [`GPUBuffer`](#gpubuffer)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:860

##### offset?

> `optional` **offset?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:861

##### size?

> `optional` **size?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:862

***

### GPUBufferBindingLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:865

#### Properties

##### hasDynamicOffset?

> `optional` **hasDynamicOffset?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:866

##### minBindingSize?

> `optional` **minBindingSize?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:867

##### type?

> `optional` **type?**: [`GPUBufferBindingType`](#gpubufferbindingtype)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:868

***

### GPUBufferDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:871

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### mappedAtCreation?

> `optional` **mappedAtCreation?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:872

##### size

> **size**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:873

##### usage

> **usage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:874

***

### GPUCanvasConfiguration

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:877

#### Properties

##### alphaMode?

> `optional` **alphaMode?**: [`GPUCanvasAlphaMode`](#gpucanvasalphamode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:878

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:879

##### device

> **device**: [`GPUDevice`](#gpudevice)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:880

##### format

> **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:881

##### toneMapping?

> `optional` **toneMapping?**: [`GPUCanvasToneMapping`](#gpucanvastonemapping)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:882

##### usage?

> `optional` **usage?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:883

##### viewFormats?

> `optional` **viewFormats?**: [`GPUTextureFormat`](#gputextureformat-1)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:884

***

### GPUCanvasContext

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15339

The **`GPUCanvasContext`** interface of the WebGPU API represents the WebGPU rendering context of a <canvas> element, returned via an HTMLCanvasElement.getContext() call with a contextType of "webgpu".
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext)

#### Properties

##### canvas

> `readonly` **canvas**: [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| [`OffscreenCanvas`](#offscreencanvas)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15345

The **`canvas`** read-only property of the GPUCanvasContext interface returns a reference to the canvas that the context was created from.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext/canvas)

#### Methods

##### configure()

> **configure**(`configuration`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15351

The **`configure()`** method of the GPUCanvasContext interface configures the context to use for rendering with a given GPUDevice. When called the canvas will initially be cleared to transparent black.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext/configure)

###### Parameters

###### configuration

[`GPUCanvasConfiguration`](#gpucanvasconfiguration)

###### Returns

`void`

##### getConfiguration()

> **getConfiguration**(): [`GPUCanvasConfiguration`](#gpucanvasconfiguration) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15357

The **`getConfiguration()`** method of the GPUCanvasContext interface returns the current configuration set for the context.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext/getConfiguration)

###### Returns

[`GPUCanvasConfiguration`](#gpucanvasconfiguration) \| `null`

##### getCurrentTexture()

> **getCurrentTexture**(): [`GPUTexture`](#gputexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15363

The **`getCurrentTexture()`** method of the GPUCanvasContext interface returns the next GPUTexture to be composited to the document by the canvas context.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext/getCurrentTexture)

###### Returns

[`GPUTexture`](#gputexture)

##### unconfigure()

> **unconfigure**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15369

The **`unconfigure()`** method of the GPUCanvasContext interface removes any previously-set context configuration, and destroys any textures returned via getCurrentTexture() while the canvas context was configured.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCanvasContext/unconfigure)

###### Returns

`void`

***

### GPUCanvasToneMapping

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:887

#### Properties

##### mode?

> `optional` **mode?**: [`GPUCanvasToneMappingMode`](#gpucanvastonemappingmode-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:888

***

### GPUColorDict

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:891

#### Properties

##### a

> **a**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:892

##### b

> **b**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:893

##### g

> **g**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:894

##### r

> **r**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:895

***

### GPUColorTargetState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:898

#### Properties

##### blend?

> `optional` **blend?**: [`GPUBlendState`](#gpublendstate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:899

##### format

> **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:900

##### writeMask?

> `optional` **writeMask?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:901

***

### GPUCommandBuffer

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15383

The **`GPUCommandBuffer`** interface of the WebGPU API represents a pre-recorded list of GPU commands that can be submitted to a GPUQueue for execution.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandBuffer)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUCommandBufferDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:904

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPUCommandEncoder

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15397

The **`GPUCommandEncoder`** interface of the WebGPU API represents an encoder that collects a sequence of GPU commands to be issued to the GPU.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder)

#### Extends

- [`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### beginComputePass()

> **beginComputePass**(`descriptor?`): [`GPUComputePassEncoder`](#gpucomputepassencoder)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15403

The **`beginComputePass()`** method of the GPUCommandEncoder interface starts encoding a compute pass, returning a GPUComputePassEncoder that can be used to control computation.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/beginComputePass)

###### Parameters

###### descriptor?

[`GPUComputePassDescriptor`](#gpucomputepassdescriptor)

###### Returns

[`GPUComputePassEncoder`](#gpucomputepassencoder)

##### beginRenderPass()

> **beginRenderPass**(`descriptor`): [`GPURenderPassEncoder`](#gpurenderpassencoder)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15409

The **`beginRenderPass()`** method of the GPUCommandEncoder interface starts encoding a render pass, returning a GPURenderPassEncoder that can be used to control rendering.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/beginRenderPass)

###### Parameters

###### descriptor

[`GPURenderPassDescriptor`](#gpurenderpassdescriptor)

###### Returns

[`GPURenderPassEncoder`](#gpurenderpassencoder)

##### clearBuffer()

> **clearBuffer**(`buffer`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15415

The **`clearBuffer()`** method of the GPUCommandEncoder interface encodes a command that fills a region of a GPUBuffer with zeroes.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/clearBuffer)

###### Parameters

###### buffer

[`GPUBuffer`](#gpubuffer)

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

##### copyBufferToBuffer()

###### Call Signature

> **copyBufferToBuffer**(`source`, `destination`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15421

The **`copyBufferToBuffer()`** method of the GPUCommandEncoder interface encodes a command that copies data from one GPUBuffer to another.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyBufferToBuffer)

###### Parameters

###### source

[`GPUBuffer`](#gpubuffer)

###### destination

[`GPUBuffer`](#gpubuffer)

###### size?

`number`

###### Returns

`void`

###### Call Signature

> **copyBufferToBuffer**(`source`, `sourceOffset`, `destination`, `destinationOffset`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15422

###### Parameters

###### source

[`GPUBuffer`](#gpubuffer)

###### sourceOffset

`number`

###### destination

[`GPUBuffer`](#gpubuffer)

###### destinationOffset

`number`

###### size?

`number`

###### Returns

`void`

##### copyBufferToTexture()

###### Call Signature

> **copyBufferToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15428

The **`copyBufferToTexture()`** method of the GPUCommandEncoder interface encodes a command that copies data from a GPUBuffer to a GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyBufferToTexture)

###### Parameters

###### source

[`GPUTexelCopyBufferInfo`](#gputexelcopybufferinfo)

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### copySize

[`GPUExtent3D`](#gpuextent3d)

###### Returns

`void`

###### Call Signature

> **copyBufferToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44634

The **`copyBufferToTexture()`** method of the GPUCommandEncoder interface encodes a command that copies data from a GPUBuffer to a GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyBufferToTexture)

###### Parameters

###### source

[`GPUTexelCopyBufferInfo`](#gputexelcopybufferinfo)

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### copySize

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

##### copyTextureToBuffer()

###### Call Signature

> **copyTextureToBuffer**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15434

The **`copyTextureToBuffer()`** method of the GPUCommandEncoder interface encodes a command that copies data from a GPUTexture to a GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyTextureToBuffer)

###### Parameters

###### source

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### destination

[`GPUTexelCopyBufferInfo`](#gputexelcopybufferinfo)

###### copySize

[`GPUExtent3D`](#gpuextent3d)

###### Returns

`void`

###### Call Signature

> **copyTextureToBuffer**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44640

The **`copyTextureToBuffer()`** method of the GPUCommandEncoder interface encodes a command that copies data from a GPUTexture to a GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyTextureToBuffer)

###### Parameters

###### source

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### destination

[`GPUTexelCopyBufferInfo`](#gputexelcopybufferinfo)

###### copySize

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

##### copyTextureToTexture()

###### Call Signature

> **copyTextureToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15440

The **`copyTextureToTexture()`** method of the GPUCommandEncoder interface encodes a command that copies data from one GPUTexture to another.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyTextureToTexture)

###### Parameters

###### source

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### copySize

[`GPUExtent3D`](#gpuextent3d)

###### Returns

`void`

###### Call Signature

> **copyTextureToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44646

The **`copyTextureToTexture()`** method of the GPUCommandEncoder interface encodes a command that copies data from one GPUTexture to another.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/copyTextureToTexture)

###### Parameters

###### source

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### copySize

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

##### finish()

> **finish**(`descriptor?`): [`GPUCommandBuffer`](#gpucommandbuffer)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15446

The **`finish()`** method of the GPUCommandEncoder interface completes recording of the command sequence encoded on this GPUCommandEncoder, returning a corresponding GPUCommandBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/finish)

###### Parameters

###### descriptor?

[`GPUCommandBufferDescriptor`](#gpucommandbufferdescriptor)

###### Returns

[`GPUCommandBuffer`](#gpucommandbuffer)

##### insertDebugMarker()

> **insertDebugMarker**(`markerLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15584

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/insertDebugMarker)

###### Parameters

###### markerLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`insertDebugMarker`](#insertdebugmarker-2)

##### popDebugGroup()

> **popDebugGroup**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15586

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/popDebugGroup)

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`popDebugGroup`](#popdebuggroup-2)

##### pushDebugGroup()

> **pushDebugGroup**(`groupLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15588

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/pushDebugGroup)

###### Parameters

###### groupLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`pushDebugGroup`](#pushdebuggroup-2)

##### resolveQuerySet()

> **resolveQuerySet**(`querySet`, `firstQuery`, `queryCount`, `destination`, `destinationOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15452

The **`resolveQuerySet()`** method of the GPUCommandEncoder interface encodes a command that resolves a GPUQuerySet, copying the results into a specified GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/resolveQuerySet)

###### Parameters

###### querySet

[`GPUQuerySet`](#gpuqueryset)

###### firstQuery

`number`

###### queryCount

`number`

###### destination

[`GPUBuffer`](#gpubuffer)

###### destinationOffset

`number`

###### Returns

`void`

***

### GPUCommandEncoderDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:907

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPUCompilationInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15466

The **`GPUCompilationInfo`** interface of the WebGPU API represents an array of GPUCompilationMessage objects generated by the GPU shader module compiler to help diagnose problems with shader code.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationInfo)

#### Properties

##### messages

> `readonly` **messages**: readonly [`GPUCompilationMessage`](#gpucompilationmessage)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15472

The **`messages`** read-only property of the GPUCompilationInfo interface is an array of GPUCompilationMessage objects, each one containing the details of an individual shader compilation message. Messages can be informational, warnings, or errors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationInfo/messages)

***

### GPUCompilationMessage

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15486

The **`GPUCompilationMessage`** interface of the WebGPU API represents a single informational, warning, or error message generated by the GPU shader module compiler.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage)

#### Properties

##### length

> `readonly` **length**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15492

The **`length`** read-only property of the GPUCompilationMessage interface is a number representing the length of the substring that the message corresponds to.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/length)

##### lineNum

> `readonly` **lineNum**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15498

The **`lineNum`** read-only property of the GPUCompilationMessage interface is a number representing the line number in the shader code that the message corresponds to.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/lineNum)

##### linePos

> `readonly` **linePos**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15504

The **`linePos`** read-only property of the GPUCompilationMessage interface is a number representing the position in the code line that the message corresponds to. This could be an exact point, or the start of the relevant substring.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/linePos)

##### message

> `readonly` **message**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15510

The **`message`** read-only property of the GPUCompilationMessage interface is a string representing human-readable message text.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/message)

##### offset

> `readonly` **offset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15516

The **`offset`** read-only property of the GPUCompilationMessage interface is a number representing the offset from the start of the shader code to the exact point, or the start of the relevant substring, that the message corresponds to.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/offset)

##### type

> `readonly` **type**: [`GPUCompilationMessageType`](#gpucompilationmessagetype-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15522

The **`type`** read-only property of the GPUCompilationMessage interface is an enumerated value representing the type of the message. Each type represents a different severity level.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCompilationMessage/type)

***

### GPUComputePassDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:910

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### timestampWrites?

> `optional` **timestampWrites?**: [`GPUComputePassTimestampWrites`](#gpucomputepasstimestampwrites)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:911

***

### GPUComputePassEncoder

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15536

The **`GPUComputePassEncoder`** interface of the WebGPU API encodes commands related to controlling the compute shader stage, as issued by a GPUComputePipeline. It forms part of the overall encoding activity of a GPUCommandEncoder.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder)

#### Extends

- [`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### dispatchWorkgroups()

> **dispatchWorkgroups**(`workgroupCountX`, `workgroupCountY?`, `workgroupCountZ?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15542

The **`dispatchWorkgroups()`** method of the GPUComputePassEncoder interface dispatches a specific grid of workgroups to perform the work being done by the current GPUComputePipeline (i.e., set via GPUComputePassEncoder.setPipeline()).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/dispatchWorkgroups)

###### Parameters

###### workgroupCountX

`number`

###### workgroupCountY?

`number`

###### workgroupCountZ?

`number`

###### Returns

`void`

##### dispatchWorkgroupsIndirect()

> **dispatchWorkgroupsIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15548

The **`dispatchWorkgroupsIndirect()`** method of the GPUComputePassEncoder interface dispatches a grid of workgroups, defined by the parameters of a GPUBuffer, to perform the work being done by the current GPUComputePipeline (i.e., set via GPUComputePassEncoder.setPipeline()).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/dispatchWorkgroupsIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

##### end()

> **end**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15554

The **`end()`** method of the GPUComputePassEncoder interface completes recording of the current compute pass command sequence.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/end)

###### Returns

`void`

##### insertDebugMarker()

> **insertDebugMarker**(`markerLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15584

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/insertDebugMarker)

###### Parameters

###### markerLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`insertDebugMarker`](#insertdebugmarker-2)

##### popDebugGroup()

> **popDebugGroup**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15586

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/popDebugGroup)

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`popDebugGroup`](#popdebuggroup-2)

##### pushDebugGroup()

> **pushDebugGroup**(`groupLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15588

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/pushDebugGroup)

###### Parameters

###### groupLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`pushDebugGroup`](#pushdebuggroup-2)

##### setBindGroup()

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15273

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

`number`[]

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsetsData`, `dynamicOffsetsDataStart`, `dynamicOffsetsDataLength`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15274

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsetsData

`Uint32Array`\<[`ArrayBufferLike`](#arraybufferlike)\>

###### dynamicOffsetsDataStart

`number`

###### dynamicOffsetsDataLength

`number`

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44625

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

[`Iterable`](#iterable)\<`number`, `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

##### setPipeline()

> **setPipeline**(`pipeline`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15560

The **`setPipeline()`** method of the GPUComputePassEncoder interface sets the GPUComputePipeline to use for this compute pass.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setPipeline)

###### Parameters

###### pipeline

[`GPUComputePipeline`](#gpucomputepipeline)

###### Returns

`void`

***

### GPUComputePassTimestampWrites

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:914

#### Properties

##### beginningOfPassWriteIndex?

> `optional` **beginningOfPassWriteIndex?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:915

##### endOfPassWriteIndex?

> `optional` **endOfPassWriteIndex?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:916

##### querySet

> **querySet**: [`GPUQuerySet`](#gpuqueryset)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:917

***

### GPUComputePipeline

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15574

The **`GPUComputePipeline`** interface of the WebGPU API represents a pipeline that controls the compute shader stage and can be used in a GPUComputePassEncoder.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePipeline)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase).[`GPUPipelineBase`](#gpupipelinebase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### getBindGroupLayout()

> **getBindGroupLayout**(`index`): [`GPUBindGroupLayout`](#gpubindgrouplayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15848

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePipeline/getBindGroupLayout)

###### Parameters

###### index

`number`

###### Returns

[`GPUBindGroupLayout`](#gpubindgrouplayout)

###### Inherited from

[`GPUPipelineBase`](#gpupipelinebase).[`getBindGroupLayout`](#getbindgrouplayout-1)

***

### GPUComputePipelineDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:920

#### Extends

- [`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase)

#### Properties

##### compute

> **compute**: [`GPUProgrammableStage`](#gpuprogrammablestage)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:921

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase).[`label`](#label-19)

##### layout

> **layout**: `"auto"` \| [`GPUPipelineLayout`](#gpupipelinelayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:994

###### Inherited from

[`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase).[`layout`](#layout-2)

***

### GPUCopyExternalImageDestInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:924

#### Extends

- [`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

#### Properties

##### aspect?

> `optional` **aspect?**: [`GPUTextureAspect`](#gputextureaspect)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1134

###### Inherited from

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo).[`aspect`](#aspect-1)

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:925

##### mipLevel?

> `optional` **mipLevel?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1135

###### Inherited from

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo).[`mipLevel`](#miplevel-1)

##### origin?

> `optional` **origin?**: [`GPUOrigin3D`](#gpuorigin3d)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1136

###### Inherited from

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo).[`origin`](#origin-2)

##### premultipliedAlpha?

> `optional` **premultipliedAlpha?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:926

##### texture

> **texture**: [`GPUTexture`](#gputexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1137

###### Inherited from

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo).[`texture`](#texture-2)

***

### GPUCopyExternalImageSourceInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:929

#### Properties

##### flipY?

> `optional` **flipY?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:930

##### origin?

> `optional` **origin?**: [`GPUOrigin2D`](#gpuorigin2d)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:931

##### source

> **source**: [`GPUCopyExternalImageSource`](#gpucopyexternalimagesource)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:932

***

### GPUDebugCommandsMixin

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15582

#### Extended by

- [`GPUCommandEncoder`](#gpucommandencoder)
- [`GPURenderBundleEncoder`](#gpurenderbundleencoder)
- [`GPUComputePassEncoder`](#gpucomputepassencoder)
- [`GPURenderPassEncoder`](#gpurenderpassencoder)

#### Methods

##### insertDebugMarker()

> **insertDebugMarker**(`markerLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15584

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/insertDebugMarker)

###### Parameters

###### markerLabel

`string`

###### Returns

`void`

##### popDebugGroup()

> **popDebugGroup**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15586

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/popDebugGroup)

###### Returns

`void`

##### pushDebugGroup()

> **pushDebugGroup**(`groupLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15588

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/pushDebugGroup)

###### Parameters

###### groupLabel

`string`

###### Returns

`void`

***

### GPUDepthStencilState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:935

#### Properties

##### depthBias?

> `optional` **depthBias?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:936

##### depthBiasClamp?

> `optional` **depthBiasClamp?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:937

##### depthBiasSlopeScale?

> `optional` **depthBiasSlopeScale?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:938

##### depthCompare?

> `optional` **depthCompare?**: [`GPUCompareFunction`](#gpucomparefunction)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:939

##### depthWriteEnabled?

> `optional` **depthWriteEnabled?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:940

##### format

> **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:941

##### stencilBack?

> `optional` **stencilBack?**: [`GPUStencilFaceState`](#gpustencilfacestate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:942

##### stencilFront?

> `optional` **stencilFront?**: [`GPUStencilFaceState`](#gpustencilfacestate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:943

##### stencilReadMask?

> `optional` **stencilReadMask?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:944

##### stencilWriteMask?

> `optional` **stencilWriteMask?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:945

***

### GPUDevice

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15601

The **`GPUDevice`** interface of the WebGPU API represents a logical GPU device. This is the main interface through which the majority of WebGPU functionality is accessed.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice)

#### Extends

- `EventTarget`.[`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### adapterInfo

> `readonly` **adapterInfo**: [`GPUAdapterInfo`](#gpuadapterinfo)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15607

The **`adapterInfo`** read-only property of the GPUDevice interface returns a GPUAdapterInfo object containing identifying information about the device's originating adapter.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/adapterInfo)

##### features

> `readonly` **features**: [`GPUSupportedFeatures`](#gpusupportedfeatures)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15613

The **`features`** read-only property of the GPUDevice interface returns a GPUSupportedFeatures object that describes additional functionality supported by the device. Only features requested during the creation of the device (i.e., when GPUAdapter.requestDevice() is called) are included.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/features)

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

##### limits

> `readonly` **limits**: [`GPUSupportedLimits`](#gpusupportedlimits)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15619

The **`limits`** read-only property of the GPUDevice interface returns a GPUSupportedLimits object that describes the limits supported by the device. All limit values will be included, and the limits requested during the creation of the device (i.e., when GPUAdapter.requestDevice() is called) will be reflected in those values.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/limits)

##### lost

> `readonly` **lost**: `Promise`\<[`GPUDeviceLostInfo`](#gpudevicelostinfo)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15625

The **`lost`** read-only property of the GPUDevice interface contains a Promise that remains pending throughout the device's lifetime and resolves with a GPUDeviceLostInfo object when the device is lost.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/lost)

##### onuncapturederror

> **onuncapturederror**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15627

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/uncapturederror_event)

##### queue

> `readonly` **queue**: [`GPUQueue`](#gpuqueue)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15633

The **`queue`** read-only property of the GPUDevice interface returns the primary GPUQueue for the device.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/queue)

#### Methods

##### addEventListener()

###### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15742

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Type Parameters

###### K

`K` *extends* `"uncapturederror"`

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

###### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15743

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

##### createBindGroup()

> **createBindGroup**(`descriptor`): [`GPUBindGroup`](#gpubindgroup)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15639

The **`createBindGroup()`** method of the GPUDevice interface creates a GPUBindGroup based on a GPUBindGroupLayout that defines a set of resources to be bound together in a group and how those resources are used in shader stages.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createBindGroup)

###### Parameters

###### descriptor

[`GPUBindGroupDescriptor`](#gpubindgroupdescriptor)

###### Returns

[`GPUBindGroup`](#gpubindgroup)

##### createBindGroupLayout()

> **createBindGroupLayout**(`descriptor`): [`GPUBindGroupLayout`](#gpubindgrouplayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15645

The **`createBindGroupLayout()`** method of the GPUDevice interface creates a GPUBindGroupLayout that defines the structure and purpose of related GPU resources such as buffers that will be used in a pipeline, and is used as a template when creating GPUBindGroups.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createBindGroupLayout)

###### Parameters

###### descriptor

[`GPUBindGroupLayoutDescriptor`](#gpubindgrouplayoutdescriptor)

###### Returns

[`GPUBindGroupLayout`](#gpubindgrouplayout)

##### createBuffer()

> **createBuffer**(`descriptor`): [`GPUBuffer`](#gpubuffer)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15651

The **`createBuffer()`** method of the GPUDevice interface creates a GPUBuffer in which to store raw data to use in GPU operations.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createBuffer)

###### Parameters

###### descriptor

[`GPUBufferDescriptor`](#gpubufferdescriptor)

###### Returns

[`GPUBuffer`](#gpubuffer)

##### createCommandEncoder()

> **createCommandEncoder**(`descriptor?`): [`GPUCommandEncoder`](#gpucommandencoder)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15657

The **`createCommandEncoder()`** method of the GPUDevice interface creates a GPUCommandEncoder, used to encode commands to be issued to the GPU.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createCommandEncoder)

###### Parameters

###### descriptor?

[`GPUCommandEncoderDescriptor`](#gpucommandencoderdescriptor)

###### Returns

[`GPUCommandEncoder`](#gpucommandencoder)

##### createComputePipeline()

> **createComputePipeline**(`descriptor`): [`GPUComputePipeline`](#gpucomputepipeline)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15663

The **`createComputePipeline()`** method of the GPUDevice interface creates a GPUComputePipeline that can control the compute shader stage and be used in a GPUComputePassEncoder.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createComputePipeline)

###### Parameters

###### descriptor

[`GPUComputePipelineDescriptor`](#gpucomputepipelinedescriptor)

###### Returns

[`GPUComputePipeline`](#gpucomputepipeline)

##### createComputePipelineAsync()

> **createComputePipelineAsync**(`descriptor`): `Promise`\<[`GPUComputePipeline`](#gpucomputepipeline)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15669

The **`createComputePipelineAsync()`** method of the GPUDevice interface returns a Promise that fulfills with a GPUComputePipeline, which can control the compute shader stage and be used in a GPUComputePassEncoder, once the pipeline can be used without any stalling.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createComputePipelineAsync)

###### Parameters

###### descriptor

[`GPUComputePipelineDescriptor`](#gpucomputepipelinedescriptor)

###### Returns

`Promise`\<[`GPUComputePipeline`](#gpucomputepipeline)\>

##### createPipelineLayout()

> **createPipelineLayout**(`descriptor`): [`GPUPipelineLayout`](#gpupipelinelayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15675

The **`createPipelineLayout()`** method of the GPUDevice interface creates a GPUPipelineLayout that defines the GPUBindGroupLayouts used by a pipeline. GPUBindGroups used with the pipeline during command encoding must have compatible GPUBindGroupLayouts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createPipelineLayout)

###### Parameters

###### descriptor

[`GPUPipelineLayoutDescriptor`](#gpupipelinelayoutdescriptor)

###### Returns

[`GPUPipelineLayout`](#gpupipelinelayout)

##### createQuerySet()

> **createQuerySet**(`descriptor`): [`GPUQuerySet`](#gpuqueryset)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15681

The **`createQuerySet()`** method of the GPUDevice interface creates a GPUQuerySet that can be used to record the results of queries on passes, such as occlusion or timestamp queries.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createQuerySet)

###### Parameters

###### descriptor

[`GPUQuerySetDescriptor`](#gpuquerysetdescriptor)

###### Returns

[`GPUQuerySet`](#gpuqueryset)

##### createRenderBundleEncoder()

> **createRenderBundleEncoder**(`descriptor`): [`GPURenderBundleEncoder`](#gpurenderbundleencoder)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15687

The **`createRenderBundleEncoder()`** method of the GPUDevice interface creates a GPURenderBundleEncoder that can be used to pre-record bundles of commands. These can be reused in GPURenderPassEncoders via the executeBundles() method, as many times as required.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createRenderBundleEncoder)

###### Parameters

###### descriptor

[`GPURenderBundleEncoderDescriptor`](#gpurenderbundleencoderdescriptor)

###### Returns

[`GPURenderBundleEncoder`](#gpurenderbundleencoder)

##### createRenderPipeline()

> **createRenderPipeline**(`descriptor`): [`GPURenderPipeline`](#gpurenderpipeline)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15693

The **`createRenderPipeline()`** method of the GPUDevice interface creates a GPURenderPipeline that can control the vertex and fragment shader stages and be used in a GPURenderPassEncoder or GPURenderBundleEncoder.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createRenderPipeline)

###### Parameters

###### descriptor

[`GPURenderPipelineDescriptor`](#gpurenderpipelinedescriptor)

###### Returns

[`GPURenderPipeline`](#gpurenderpipeline)

##### createRenderPipelineAsync()

> **createRenderPipelineAsync**(`descriptor`): `Promise`\<[`GPURenderPipeline`](#gpurenderpipeline)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15699

The **`createRenderPipelineAsync()`** method of the GPUDevice interface returns a Promise that fulfills with a GPURenderPipeline, which can control the vertex and fragment shader stages and be used in a GPURenderPassEncoder or GPURenderBundleEncoder, once the pipeline can be used without any stalling.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createRenderPipelineAsync)

###### Parameters

###### descriptor

[`GPURenderPipelineDescriptor`](#gpurenderpipelinedescriptor)

###### Returns

`Promise`\<[`GPURenderPipeline`](#gpurenderpipeline)\>

##### createSampler()

> **createSampler**(`descriptor?`): [`GPUSampler`](#gpusampler)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15705

The **`createSampler()`** method of the GPUDevice interface creates a GPUSampler, which controls how shaders transform and filter texture resource data.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createSampler)

###### Parameters

###### descriptor?

[`GPUSamplerDescriptor`](#gpusamplerdescriptor)

###### Returns

[`GPUSampler`](#gpusampler)

##### createShaderModule()

> **createShaderModule**(`descriptor`): [`GPUShaderModule`](#gpushadermodule)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15711

The **`createShaderModule()`** method of the GPUDevice interface creates a GPUShaderModule from a string of WGSL source code.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createShaderModule)

###### Parameters

###### descriptor

[`GPUShaderModuleDescriptor`](#gpushadermoduledescriptor)

###### Returns

[`GPUShaderModule`](#gpushadermodule)

##### createTexture()

> **createTexture**(`descriptor`): [`GPUTexture`](#gputexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15717

The **`createTexture()`** method of the GPUDevice interface creates a GPUTexture in which to store 1D, 2D, or 3D arrays of data, such as images, to use in GPU rendering operations.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/createTexture)

###### Parameters

###### descriptor

[`GPUTextureDescriptor`](#gputexturedescriptor)

###### Returns

[`GPUTexture`](#gputexture)

##### destroy()

> **destroy**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15723

The **`destroy()`** method of the GPUDevice interface destroys the device, preventing further operations on it.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/destroy)

###### Returns

`void`

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14386

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

###### Parameters

###### event

`Event`

###### Returns

`boolean`

###### Inherited from

`EventTarget.dispatchEvent`

##### importExternalTexture()

> **importExternalTexture**(`descriptor`): [`GPUExternalTexture`](#gpuexternaltexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15729

The **`importExternalTexture()`** method of the GPUDevice interface takes an HTMLVideoElement or a VideoFrame object as an input and returns a GPUExternalTexture wrapper object containing a snapshot of the video that can be used as a frame in GPU rendering operations.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/importExternalTexture)

###### Parameters

###### descriptor

[`GPUExternalTextureDescriptor`](#gpuexternaltexturedescriptor)

###### Returns

[`GPUExternalTexture`](#gpuexternaltexture)

##### popErrorScope()

> **popErrorScope**(): `Promise`\<[`GPUError`](#gpuerror) \| `null`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15735

The **`popErrorScope()`** method of the GPUDevice interface pops an existing GPU error scope from the error scope stack (originally pushed using GPUDevice.pushErrorScope()) and returns a Promise that resolves to an object describing the first error captured in the scope, or null if no error occurred.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/popErrorScope)

###### Returns

`Promise`\<[`GPUError`](#gpuerror) \| `null`\>

##### pushErrorScope()

> **pushErrorScope**(`filter`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15741

The **`pushErrorScope()`** method of the GPUDevice interface pushes a new GPU error scope onto the device's error scope stack, allowing you to capture errors of a particular type.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDevice/pushErrorScope)

###### Parameters

###### filter

[`GPUErrorFilter`](#gpuerrorfilter)

###### Returns

`void`

##### removeEventListener()

###### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15744

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Type Parameters

###### K

`K` *extends* `"uncapturederror"`

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

###### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15745

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

***

### GPUDeviceEventMap

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15591

#### Properties

##### uncapturederror

> **uncapturederror**: [`GPUUncapturedErrorEvent`](#gpuuncapturederrorevent)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15592

***

### GPUDeviceLostInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15759

The **`GPUDeviceLostInfo`** interface of the WebGPU API represents the object returned when the GPUDevice.lost Promise resolves. This provides information as to why a device has been lost.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDeviceLostInfo)

#### Properties

##### message

> `readonly` **message**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15765

The **`message`** read-only property of the GPUDeviceLostInfo interface provides a human-readable message that explains why the device was lost.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDeviceLostInfo/message)

##### reason

> `readonly` **reason**: [`GPUDeviceLostReason`](#gpudevicelostreason)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15771

The **`reason`** read-only property of the GPUDeviceLostInfo interface defines the reason the device was lost in a machine-readable way.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUDeviceLostInfo/reason)

***

### GPUError

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15785

The **`GPUError`** interface of the WebGPU API is the base interface for errors surfaced by GPUDevice.popErrorScope and the uncapturederror event.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUError)

#### Properties

##### message

> `readonly` **message**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15791

The **`message`** read-only property of the GPUError interface provides a human-readable message that explains why the error occurred.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUError/message)

***

### GPUExtent3DDict

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:954

#### Properties

##### depthOrArrayLayers?

> `optional` **depthOrArrayLayers?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:955

##### height?

> `optional` **height?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:956

##### width

> **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:957

***

### GPUExternalTexture

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15805

The **`GPUExternalTexture`** interface of the WebGPU API represents a wrapper object containing an HTMLVideoElement snapshot that can be used as a texture in GPU rendering operations.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUExternalTexture)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUExternalTextureBindingLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:960

***

### GPUExternalTextureDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:963

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:964

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### source

> **source**: [`HTMLVideoElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlvideoelement) \| [`VideoFrame`](#videoframe)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:965

***

### GPUFragmentState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:968

#### Extends

- [`GPUProgrammableStage`](#gpuprogrammablestage)

#### Properties

##### constants?

> `optional` **constants?**: [`Record`](#record)\<`string`, `number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1014

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`constants`](#constants-1)

##### entryPoint?

> `optional` **entryPoint?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1015

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`entryPoint`](#entrypoint-1)

##### module

> **module**: [`GPUShaderModule`](#gpushadermodule)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1016

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`module`](#module-1)

##### targets

> **targets**: ([`GPUColorTargetState`](#gpucolortargetstate) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:969

***

### GPUMultisampleState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:972

#### Properties

##### alphaToCoverageEnabled?

> `optional` **alphaToCoverageEnabled?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:973

##### count?

> `optional` **count?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:974

##### mask?

> `optional` **mask?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:975

***

### GPUObjectBase

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15827

#### Extended by

- [`GPUTexture`](#gputexture)
- [`GPUDevice`](#gpudevice)
- [`GPUTextureView`](#gputextureview)
- [`GPUQueue`](#gpuqueue)
- [`GPUBindGroup`](#gpubindgroup)
- [`GPUBindGroupLayout`](#gpubindgrouplayout)
- [`GPUBuffer`](#gpubuffer)
- [`GPUCommandEncoder`](#gpucommandencoder)
- [`GPUComputePipeline`](#gpucomputepipeline)
- [`GPUPipelineLayout`](#gpupipelinelayout)
- [`GPUQuerySet`](#gpuqueryset)
- [`GPURenderBundleEncoder`](#gpurenderbundleencoder)
- [`GPURenderPipeline`](#gpurenderpipeline)
- [`GPUSampler`](#gpusampler)
- [`GPUShaderModule`](#gpushadermodule)
- [`GPUExternalTexture`](#gpuexternaltexture)
- [`GPUCommandBuffer`](#gpucommandbuffer)
- [`GPUComputePassEncoder`](#gpucomputepassencoder)
- [`GPURenderPassEncoder`](#gpurenderpassencoder)
- [`GPURenderBundle`](#gpurenderbundle)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

***

### GPUObjectDescriptorBase

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:978

#### Extended by

- [`GPUTextureViewDescriptor`](#gputextureviewdescriptor)
- [`GPUBindGroupDescriptor`](#gpubindgroupdescriptor)
- [`GPUBindGroupLayoutDescriptor`](#gpubindgrouplayoutdescriptor)
- [`GPUBufferDescriptor`](#gpubufferdescriptor)
- [`GPUCommandEncoderDescriptor`](#gpucommandencoderdescriptor)
- [`GPUPipelineLayoutDescriptor`](#gpupipelinelayoutdescriptor)
- [`GPUQuerySetDescriptor`](#gpuquerysetdescriptor)
- [`GPUSamplerDescriptor`](#gpusamplerdescriptor)
- [`GPUShaderModuleDescriptor`](#gpushadermoduledescriptor)
- [`GPUTextureDescriptor`](#gputexturedescriptor)
- [`GPUExternalTextureDescriptor`](#gpuexternaltexturedescriptor)
- [`GPUComputePassDescriptor`](#gpucomputepassdescriptor)
- [`GPURenderPassDescriptor`](#gpurenderpassdescriptor)
- [`GPUCommandBufferDescriptor`](#gpucommandbufferdescriptor)
- [`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase)
- [`GPURenderPassLayout`](#gpurenderpasslayout)
- [`GPURenderBundleDescriptor`](#gpurenderbundledescriptor)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

***

### GPUOrigin2DDict

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:982

#### Properties

##### x?

> `optional` **x?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:983

##### y?

> `optional` **y?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:984

***

### GPUOrigin3DDict

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:987

#### Properties

##### x?

> `optional` **x?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:988

##### y?

> `optional` **y?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:989

##### z?

> `optional` **z?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:990

***

### GPUPipelineBase

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15846

#### Extended by

- [`GPUComputePipeline`](#gpucomputepipeline)
- [`GPURenderPipeline`](#gpurenderpipeline)

#### Methods

##### getBindGroupLayout()

> **getBindGroupLayout**(`index`): [`GPUBindGroupLayout`](#gpubindgrouplayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15848

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePipeline/getBindGroupLayout)

###### Parameters

###### index

`number`

###### Returns

[`GPUBindGroupLayout`](#gpubindgrouplayout)

***

### GPUPipelineDescriptorBase

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:993

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Extended by

- [`GPUComputePipelineDescriptor`](#gpucomputepipelinedescriptor)
- [`GPURenderPipelineDescriptor`](#gpurenderpipelinedescriptor)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### layout

> **layout**: `"auto"` \| [`GPUPipelineLayout`](#gpupipelinelayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:994

***

### GPUPipelineLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15877

The **`GPUPipelineLayout`** interface of the WebGPU API defines the GPUBindGroupLayouts used by a pipeline. GPUBindGroups used with the pipeline during command encoding must have compatible GPUBindGroupLayouts.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUPipelineLayout)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUPipelineLayoutDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1001

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### bindGroupLayouts

> **bindGroupLayouts**: ([`GPUBindGroupLayout`](#gpubindgrouplayout) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1002

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPUPrimitiveState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1005

#### Properties

##### cullMode?

> `optional` **cullMode?**: [`GPUCullMode`](#gpucullmode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1006

##### frontFace?

> `optional` **frontFace?**: [`GPUFrontFace`](#gpufrontface)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1007

##### stripIndexFormat?

> `optional` **stripIndexFormat?**: [`GPUIndexFormat`](#gpuindexformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1008

##### topology?

> `optional` **topology?**: [`GPUPrimitiveTopology`](#gpuprimitivetopology)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1009

##### unclippedDepth?

> `optional` **unclippedDepth?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1010

***

### GPUProgrammableStage

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1013

#### Extended by

- [`GPUFragmentState`](#gpufragmentstate)
- [`GPUVertexState`](#gpuvertexstate)

#### Properties

##### constants?

> `optional` **constants?**: [`Record`](#record)\<`string`, `number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1014

##### entryPoint?

> `optional` **entryPoint?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1015

##### module

> **module**: [`GPUShaderModule`](#gpushadermodule)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1016

***

### GPUQuerySet

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15891

The **`GPUQuerySet`** interface of the WebGPU API is used to record the results of queries on passes, such as occlusion or timestamp queries.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQuerySet)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### count

> `readonly` **count**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15897

The **`count`** read-only property of the GPUQuerySet interface is a number specifying the number of queries managed by the GPUQuerySet.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQuerySet/count)

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

##### type

> `readonly` **type**: [`GPUQueryType`](#gpuquerytype)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15903

The **`type`** read-only property of the GPUQuerySet interface is an enumerated value specifying the type of queries managed by the GPUQuerySet.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQuerySet/type)

#### Methods

##### destroy()

> **destroy**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15909

The **`destroy()`** method of the GPUQuerySet interface destroys the GPUQuerySet.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQuerySet/destroy)

###### Returns

`void`

***

### GPUQuerySetDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1019

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### count

> **count**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1020

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### type

> **type**: [`GPUQueryType`](#gpuquerytype)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1021

***

### GPUQueue

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15923

The **`GPUQueue`** interface of the WebGPU API controls execution of encoded commands on the GPU.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### copyExternalImageToTexture()

###### Call Signature

> **copyExternalImageToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15929

The **`copyExternalImageToTexture()`** method of the GPUQueue interface copies a snapshot taken from a source image, video, or canvas into a given GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/copyExternalImageToTexture)

###### Parameters

###### source

[`GPUCopyExternalImageSourceInfo`](#gpucopyexternalimagesourceinfo)

###### destination

[`GPUCopyExternalImageDestInfo`](#gpucopyexternalimagedestinfo)

###### copySize

[`GPUExtent3D`](#gpuextent3d)

###### Returns

`void`

###### Call Signature

> **copyExternalImageToTexture**(`source`, `destination`, `copySize`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44655

The **`copyExternalImageToTexture()`** method of the GPUQueue interface copies a snapshot taken from a source image, video, or canvas into a given GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/copyExternalImageToTexture)

###### Parameters

###### source

[`GPUCopyExternalImageSourceInfo`](#gpucopyexternalimagesourceinfo)

###### destination

[`GPUCopyExternalImageDestInfo`](#gpucopyexternalimagedestinfo)

###### copySize

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

##### onSubmittedWorkDone()

> **onSubmittedWorkDone**(): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15935

The **`onSubmittedWorkDone()`** method of the GPUQueue interface returns a Promise that resolves when all the work submitted to the GPU via this GPUQueue at the point the method is called has been processed.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/onSubmittedWorkDone)

###### Returns

`Promise`\<`void`\>

##### submit()

###### Call Signature

> **submit**(`commandBuffers`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15941

The **`submit()`** method of the GPUQueue interface schedules the execution of command buffers represented by one or more GPUCommandBuffer objects by the GPU.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/submit)

###### Parameters

###### commandBuffers

[`GPUCommandBuffer`](#gpucommandbuffer)[]

###### Returns

`void`

###### Call Signature

> **submit**(`commandBuffers`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44661

The **`submit()`** method of the GPUQueue interface schedules the execution of command buffers represented by one or more GPUCommandBuffer objects by the GPU.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/submit)

###### Parameters

###### commandBuffers

[`Iterable`](#iterable)\<[`GPUCommandBuffer`](#gpucommandbuffer)\>

###### Returns

`void`

##### writeBuffer()

> **writeBuffer**(`buffer`, `bufferOffset`, `data`, `dataOffset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15947

The **`writeBuffer()`** method of the GPUQueue interface writes a provided data source into a given GPUBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/writeBuffer)

###### Parameters

###### buffer

[`GPUBuffer`](#gpubuffer)

###### bufferOffset

`number`

###### data

[`AllowSharedBufferSource`](#allowsharedbuffersource)

###### dataOffset?

`number`

###### size?

`number`

###### Returns

`void`

##### writeTexture()

###### Call Signature

> **writeTexture**(`destination`, `data`, `dataLayout`, `size`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15953

The **`writeTexture()`** method of the GPUQueue interface writes a provided data source into a given GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/writeTexture)

###### Parameters

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### data

[`AllowSharedBufferSource`](#allowsharedbuffersource)

###### dataLayout

[`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout)

###### size

[`GPUExtent3D`](#gpuextent3d)

###### Returns

`void`

###### Call Signature

> **writeTexture**(`destination`, `data`, `dataLayout`, `size`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44667

The **`writeTexture()`** method of the GPUQueue interface writes a provided data source into a given GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUQueue/writeTexture)

###### Parameters

###### destination

[`GPUTexelCopyTextureInfo`](#gputexelcopytextureinfo)

###### data

[`AllowSharedBufferSource`](#allowsharedbuffersource)

###### dataLayout

[`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout)

###### size

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

***

### GPURenderBundle

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15967

The **`GPURenderBundle`** interface of the WebGPU API represents a container for pre-recorded bundles of commands.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundle)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPURenderBundleDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1027

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPURenderBundleEncoder

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15981

The **`GPURenderBundleEncoder`** interface of the WebGPU API is used to pre-record bundles of commands.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder)

#### Extends

- [`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`GPUObjectBase`](#gpuobjectbase).[`GPURenderCommandsMixin`](#gpurendercommandsmixin)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### draw()

> **draw**(`vertexCount`, `instanceCount?`, `firstVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15997

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/draw)

###### Parameters

###### vertexCount

`number`

###### instanceCount?

`number`

###### firstVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`draw`](#draw-1)

##### drawIndexed()

> **drawIndexed**(`indexCount`, `instanceCount?`, `firstIndex?`, `baseVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15999

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexed)

###### Parameters

###### indexCount

`number`

###### instanceCount?

`number`

###### firstIndex?

`number`

###### baseVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndexed`](#drawindexed-1)

##### drawIndexedIndirect()

> **drawIndexedIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16001

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexedIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndexedIndirect`](#drawindexedindirect-1)

##### drawIndirect()

> **drawIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16003

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndirect`](#drawindirect-1)

##### finish()

> **finish**(`descriptor?`): [`GPURenderBundle`](#gpurenderbundle)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15987

The **`finish()`** method of the GPURenderBundleEncoder interface completes recording of the current render bundle command sequence, returning a GPURenderBundle object that can be passed into a GPURenderPassEncoder.executeBundles() call to execute those commands in a specific render pass.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/finish)

###### Parameters

###### descriptor?

[`GPURenderBundleDescriptor`](#gpurenderbundledescriptor)

###### Returns

[`GPURenderBundle`](#gpurenderbundle)

##### insertDebugMarker()

> **insertDebugMarker**(`markerLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15584

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/insertDebugMarker)

###### Parameters

###### markerLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`insertDebugMarker`](#insertdebugmarker-2)

##### popDebugGroup()

> **popDebugGroup**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15586

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/popDebugGroup)

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`popDebugGroup`](#popdebuggroup-2)

##### pushDebugGroup()

> **pushDebugGroup**(`groupLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15588

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/pushDebugGroup)

###### Parameters

###### groupLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`pushDebugGroup`](#pushdebuggroup-2)

##### setBindGroup()

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15273

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

`number`[]

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsetsData`, `dynamicOffsetsDataStart`, `dynamicOffsetsDataLength`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15274

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsetsData

`Uint32Array`\<[`ArrayBufferLike`](#arraybufferlike)\>

###### dynamicOffsetsDataStart

`number`

###### dynamicOffsetsDataLength

`number`

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44625

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

[`Iterable`](#iterable)\<`number`, `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

##### setIndexBuffer()

> **setIndexBuffer**(`buffer`, `indexFormat`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16005

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setIndexBuffer)

###### Parameters

###### buffer

[`GPUBuffer`](#gpubuffer)

###### indexFormat

[`GPUIndexFormat`](#gpuindexformat)

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setIndexBuffer`](#setindexbuffer-1)

##### setPipeline()

> **setPipeline**(`pipeline`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16007

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setPipeline)

###### Parameters

###### pipeline

[`GPURenderPipeline`](#gpurenderpipeline)

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setPipeline`](#setpipeline-2)

##### setVertexBuffer()

> **setVertexBuffer**(`slot`, `buffer`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16009

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setVertexBuffer)

###### Parameters

###### slot

`number`

###### buffer

[`GPUBuffer`](#gpubuffer) \| `null`

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setVertexBuffer`](#setvertexbuffer-1)

***

### GPURenderBundleEncoderDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1030

#### Extends

- [`GPURenderPassLayout`](#gpurenderpasslayout)

#### Properties

##### colorFormats

> **colorFormats**: ([`GPUTextureFormat`](#gputextureformat-1) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1065

###### Inherited from

[`GPURenderPassLayout`](#gpurenderpasslayout).[`colorFormats`](#colorformats-1)

##### depthReadOnly?

> `optional` **depthReadOnly?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1031

##### depthStencilFormat?

> `optional` **depthStencilFormat?**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1066

###### Inherited from

[`GPURenderPassLayout`](#gpurenderpasslayout).[`depthStencilFormat`](#depthstencilformat-1)

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPURenderPassLayout`](#gpurenderpasslayout).[`label`](#label-31)

##### sampleCount?

> `optional` **sampleCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1067

###### Inherited from

[`GPURenderPassLayout`](#gpurenderpasslayout).[`sampleCount`](#samplecount-1)

##### stencilReadOnly?

> `optional` **stencilReadOnly?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1032

***

### GPURenderCommandsMixin

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15995

#### Extended by

- [`GPURenderBundleEncoder`](#gpurenderbundleencoder)
- [`GPURenderPassEncoder`](#gpurenderpassencoder)

#### Methods

##### draw()

> **draw**(`vertexCount`, `instanceCount?`, `firstVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15997

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/draw)

###### Parameters

###### vertexCount

`number`

###### instanceCount?

`number`

###### firstVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

##### drawIndexed()

> **drawIndexed**(`indexCount`, `instanceCount?`, `firstIndex?`, `baseVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15999

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexed)

###### Parameters

###### indexCount

`number`

###### instanceCount?

`number`

###### firstIndex?

`number`

###### baseVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

##### drawIndexedIndirect()

> **drawIndexedIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16001

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexedIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

##### drawIndirect()

> **drawIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16003

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

##### setIndexBuffer()

> **setIndexBuffer**(`buffer`, `indexFormat`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16005

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setIndexBuffer)

###### Parameters

###### buffer

[`GPUBuffer`](#gpubuffer)

###### indexFormat

[`GPUIndexFormat`](#gpuindexformat)

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

##### setPipeline()

> **setPipeline**(`pipeline`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16007

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setPipeline)

###### Parameters

###### pipeline

[`GPURenderPipeline`](#gpurenderpipeline)

###### Returns

`void`

##### setVertexBuffer()

> **setVertexBuffer**(`slot`, `buffer`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16009

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setVertexBuffer)

###### Parameters

###### slot

`number`

###### buffer

[`GPUBuffer`](#gpubuffer) \| `null`

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

***

### GPURenderPassColorAttachment

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1035

#### Properties

##### clearValue?

> `optional` **clearValue?**: [`GPUColor`](#gpucolor)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1036

##### depthSlice?

> `optional` **depthSlice?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1037

##### loadOp

> **loadOp**: [`GPULoadOp`](#gpuloadop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1038

##### resolveTarget?

> `optional` **resolveTarget?**: [`GPUTexture`](#gputexture) \| [`GPUTextureView`](#gputextureview)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1039

##### storeOp

> **storeOp**: [`GPUStoreOp`](#gpustoreop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1040

##### view

> **view**: [`GPUTexture`](#gputexture) \| [`GPUTextureView`](#gputextureview)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1041

***

### GPURenderPassDepthStencilAttachment

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1044

#### Properties

##### depthClearValue?

> `optional` **depthClearValue?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1045

##### depthLoadOp?

> `optional` **depthLoadOp?**: [`GPULoadOp`](#gpuloadop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1046

##### depthReadOnly?

> `optional` **depthReadOnly?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1047

##### depthStoreOp?

> `optional` **depthStoreOp?**: [`GPUStoreOp`](#gpustoreop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1048

##### stencilClearValue?

> `optional` **stencilClearValue?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1049

##### stencilLoadOp?

> `optional` **stencilLoadOp?**: [`GPULoadOp`](#gpuloadop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1050

##### stencilReadOnly?

> `optional` **stencilReadOnly?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1051

##### stencilStoreOp?

> `optional` **stencilStoreOp?**: [`GPUStoreOp`](#gpustoreop)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1052

##### view

> **view**: [`GPUTexture`](#gputexture) \| [`GPUTextureView`](#gputextureview)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1053

***

### GPURenderPassDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1056

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### colorAttachments

> **colorAttachments**: ([`GPURenderPassColorAttachment`](#gpurenderpasscolorattachment) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1057

##### depthStencilAttachment?

> `optional` **depthStencilAttachment?**: [`GPURenderPassDepthStencilAttachment`](#gpurenderpassdepthstencilattachment)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1058

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### maxDrawCount?

> `optional` **maxDrawCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1059

##### occlusionQuerySet?

> `optional` **occlusionQuerySet?**: [`GPUQuerySet`](#gpuqueryset)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1060

##### timestampWrites?

> `optional` **timestampWrites?**: [`GPURenderPassTimestampWrites`](#gpurenderpasstimestampwrites)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1061

***

### GPURenderPassEncoder

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16018

The **`GPURenderPassEncoder`** interface of the WebGPU API encodes commands related to controlling the vertex and fragment shader stages, as issued by a GPURenderPipeline. It forms part of the overall encoding activity of a GPUCommandEncoder.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder)

#### Extends

- [`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`GPUObjectBase`](#gpuobjectbase).[`GPURenderCommandsMixin`](#gpurendercommandsmixin)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### beginOcclusionQuery()

> **beginOcclusionQuery**(`queryIndex`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16024

The **`beginOcclusionQuery()`** method of the GPURenderPassEncoder interface begins an occlusion query at the specified index of the relevant GPUQuerySet (provided as the value of the occlusionQuerySet descriptor property when invoking GPUCommandEncoder.beginRenderPass() to run the render pass).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/beginOcclusionQuery)

###### Parameters

###### queryIndex

`number`

###### Returns

`void`

##### draw()

> **draw**(`vertexCount`, `instanceCount?`, `firstVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15997

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/draw)

###### Parameters

###### vertexCount

`number`

###### instanceCount?

`number`

###### firstVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`draw`](#draw-1)

##### drawIndexed()

> **drawIndexed**(`indexCount`, `instanceCount?`, `firstIndex?`, `baseVertex?`, `firstInstance?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15999

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexed)

###### Parameters

###### indexCount

`number`

###### instanceCount?

`number`

###### firstIndex?

`number`

###### baseVertex?

`number`

###### firstInstance?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndexed`](#drawindexed-1)

##### drawIndexedIndirect()

> **drawIndexedIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16001

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndexedIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndexedIndirect`](#drawindexedindirect-1)

##### drawIndirect()

> **drawIndirect**(`indirectBuffer`, `indirectOffset`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16003

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/drawIndirect)

###### Parameters

###### indirectBuffer

[`GPUBuffer`](#gpubuffer)

###### indirectOffset

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`drawIndirect`](#drawindirect-1)

##### end()

> **end**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16030

The **`end()`** method of the GPURenderPassEncoder interface completes recording of the current render pass command sequence.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/end)

###### Returns

`void`

##### endOcclusionQuery()

> **endOcclusionQuery**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16036

The **`endOcclusionQuery()`** method of the GPURenderPassEncoder interface ends an active occlusion query previously started with beginOcclusionQuery().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/endOcclusionQuery)

###### Returns

`void`

##### executeBundles()

###### Call Signature

> **executeBundles**(`bundles`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16042

The **`executeBundles()`** method of the GPURenderPassEncoder interface executes commands previously recorded into the referenced GPURenderBundles, as part of this render pass.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/executeBundles)

###### Parameters

###### bundles

[`GPURenderBundle`](#gpurenderbundle)[]

###### Returns

`void`

###### Call Signature

> **executeBundles**(`bundles`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44676

The **`executeBundles()`** method of the GPURenderPassEncoder interface executes commands previously recorded into the referenced GPURenderBundles, as part of this render pass.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/executeBundles)

###### Parameters

###### bundles

[`Iterable`](#iterable)\<[`GPURenderBundle`](#gpurenderbundle)\>

###### Returns

`void`

##### insertDebugMarker()

> **insertDebugMarker**(`markerLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15584

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/insertDebugMarker)

###### Parameters

###### markerLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`insertDebugMarker`](#insertdebugmarker-2)

##### popDebugGroup()

> **popDebugGroup**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15586

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/popDebugGroup)

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`popDebugGroup`](#popdebuggroup-2)

##### pushDebugGroup()

> **pushDebugGroup**(`groupLabel`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15588

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUCommandEncoder/pushDebugGroup)

###### Parameters

###### groupLabel

`string`

###### Returns

`void`

###### Inherited from

[`GPUDebugCommandsMixin`](#gpudebugcommandsmixin).[`pushDebugGroup`](#pushdebuggroup-2)

##### setBindGroup()

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15273

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

`number`[]

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsetsData`, `dynamicOffsetsDataStart`, `dynamicOffsetsDataLength`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15274

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsetsData

`Uint32Array`\<[`ArrayBufferLike`](#arraybufferlike)\>

###### dynamicOffsetsDataStart

`number`

###### dynamicOffsetsDataLength

`number`

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

###### Call Signature

> **setBindGroup**(`index`, `bindGroup`, `dynamicOffsets?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44625

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePassEncoder/setBindGroup)

###### Parameters

###### index

`number`

###### bindGroup

[`GPUBindGroup`](#gpubindgroup) \| `null`

###### dynamicOffsets?

[`Iterable`](#iterable)\<`number`, `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`GPUBindingCommandsMixin`](#gpubindingcommandsmixin).[`setBindGroup`](#setbindgroup)

##### setBlendConstant()

###### Call Signature

> **setBlendConstant**(`color`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16048

The **`setBlendConstant()`** method of the GPURenderPassEncoder interface sets the constant blend color and alpha values used with "constant" and "one-minus-constant" blend factors (as set in the descriptor of the GPUDevice.createRenderPipeline() method, in the blend property).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setBlendConstant)

###### Parameters

###### color

[`GPUColor`](#gpucolor)

###### Returns

`void`

###### Call Signature

> **setBlendConstant**(`color`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44682

The **`setBlendConstant()`** method of the GPURenderPassEncoder interface sets the constant blend color and alpha values used with "constant" and "one-minus-constant" blend factors (as set in the descriptor of the GPUDevice.createRenderPipeline() method, in the blend property).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setBlendConstant)

###### Parameters

###### color

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

##### setIndexBuffer()

> **setIndexBuffer**(`buffer`, `indexFormat`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16005

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setIndexBuffer)

###### Parameters

###### buffer

[`GPUBuffer`](#gpubuffer)

###### indexFormat

[`GPUIndexFormat`](#gpuindexformat)

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setIndexBuffer`](#setindexbuffer-1)

##### setPipeline()

> **setPipeline**(`pipeline`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16007

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setPipeline)

###### Parameters

###### pipeline

[`GPURenderPipeline`](#gpurenderpipeline)

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setPipeline`](#setpipeline-2)

##### setScissorRect()

> **setScissorRect**(`x`, `y`, `width`, `height`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16054

The **`setScissorRect()`** method of the GPURenderPassEncoder interface sets the scissor rectangle used during the rasterization stage. After transformation into viewport coordinates any fragments that fall outside the scissor rectangle will be discarded.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setScissorRect)

###### Parameters

###### x

`number`

###### y

`number`

###### width

`number`

###### height

`number`

###### Returns

`void`

##### setStencilReference()

> **setStencilReference**(`reference`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16060

The **`setStencilReference()`** method of the GPURenderPassEncoder interface sets the stencil reference value using during stencil tests with the "replace" stencil operation (as set in the descriptor of the GPUDevice.createRenderPipeline() method, in the properties defining the various stencil operations).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setStencilReference)

###### Parameters

###### reference

`number`

###### Returns

`void`

##### setVertexBuffer()

> **setVertexBuffer**(`slot`, `buffer`, `offset?`, `size?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16009

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderBundleEncoder/setVertexBuffer)

###### Parameters

###### slot

`number`

###### buffer

[`GPUBuffer`](#gpubuffer) \| `null`

###### offset?

`number`

###### size?

`number`

###### Returns

`void`

###### Inherited from

[`GPURenderCommandsMixin`](#gpurendercommandsmixin).[`setVertexBuffer`](#setvertexbuffer-1)

##### setViewport()

> **setViewport**(`x`, `y`, `width`, `height`, `minDepth`, `maxDepth`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16066

The **`setViewport()`** method of the GPURenderPassEncoder interface sets the viewport used during the rasterization stage to linearly map from normalized device coordinates to viewport coordinates.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPassEncoder/setViewport)

###### Parameters

###### x

`number`

###### y

`number`

###### width

`number`

###### height

`number`

###### minDepth

`number`

###### maxDepth

`number`

###### Returns

`void`

***

### GPURenderPassLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1064

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Extended by

- [`GPURenderBundleEncoderDescriptor`](#gpurenderbundleencoderdescriptor)

#### Properties

##### colorFormats

> **colorFormats**: ([`GPUTextureFormat`](#gputextureformat-1) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1065

##### depthStencilFormat?

> `optional` **depthStencilFormat?**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1066

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### sampleCount?

> `optional` **sampleCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1067

***

### GPURenderPassTimestampWrites

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1070

#### Properties

##### beginningOfPassWriteIndex?

> `optional` **beginningOfPassWriteIndex?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1071

##### endOfPassWriteIndex?

> `optional` **endOfPassWriteIndex?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1072

##### querySet

> **querySet**: [`GPUQuerySet`](#gpuqueryset)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1073

***

### GPURenderPipeline

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16080

The **`GPURenderPipeline`** interface of the WebGPU API represents a pipeline that controls the vertex and fragment shader stages and can be used in a GPURenderPassEncoder or GPURenderBundleEncoder.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPURenderPipeline)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase).[`GPUPipelineBase`](#gpupipelinebase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### getBindGroupLayout()

> **getBindGroupLayout**(`index`): [`GPUBindGroupLayout`](#gpubindgrouplayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15848

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUComputePipeline/getBindGroupLayout)

###### Parameters

###### index

`number`

###### Returns

[`GPUBindGroupLayout`](#gpubindgrouplayout)

###### Inherited from

[`GPUPipelineBase`](#gpupipelinebase).[`getBindGroupLayout`](#getbindgrouplayout-1)

***

### GPURenderPipelineDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1076

#### Extends

- [`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase)

#### Properties

##### depthStencil?

> `optional` **depthStencil?**: [`GPUDepthStencilState`](#gpudepthstencilstate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1077

##### fragment?

> `optional` **fragment?**: [`GPUFragmentState`](#gpufragmentstate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1078

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase).[`label`](#label-19)

##### layout

> **layout**: `"auto"` \| [`GPUPipelineLayout`](#gpupipelinelayout)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:994

###### Inherited from

[`GPUPipelineDescriptorBase`](#gpupipelinedescriptorbase).[`layout`](#layout-2)

##### multisample?

> `optional` **multisample?**: [`GPUMultisampleState`](#gpumultisamplestate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1079

##### primitive?

> `optional` **primitive?**: [`GPUPrimitiveState`](#gpuprimitivestate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1080

##### vertex

> **vertex**: [`GPUVertexState`](#gpuvertexstate)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1081

***

### GPUSampler

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16094

The **`GPUSampler`** interface of the WebGPU API represents an object that can control how shaders transform and filter texture resource data.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSampler)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUSamplerBindingLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1089

#### Properties

##### type?

> `optional` **type?**: [`GPUSamplerBindingType`](#gpusamplerbindingtype)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1090

***

### GPUSamplerDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1093

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### addressModeU?

> `optional` **addressModeU?**: [`GPUAddressMode`](#gpuaddressmode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1094

##### addressModeV?

> `optional` **addressModeV?**: [`GPUAddressMode`](#gpuaddressmode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1095

##### addressModeW?

> `optional` **addressModeW?**: [`GPUAddressMode`](#gpuaddressmode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1096

##### compare?

> `optional` **compare?**: [`GPUCompareFunction`](#gpucomparefunction)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1097

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### lodMaxClamp?

> `optional` **lodMaxClamp?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1098

##### lodMinClamp?

> `optional` **lodMinClamp?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1099

##### magFilter?

> `optional` **magFilter?**: [`GPUFilterMode`](#gpufiltermode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1100

##### maxAnisotropy?

> `optional` **maxAnisotropy?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1101

##### minFilter?

> `optional` **minFilter?**: [`GPUFilterMode`](#gpufiltermode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1102

##### mipmapFilter?

> `optional` **mipmapFilter?**: [`GPUMipmapFilterMode`](#gpumipmapfiltermode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1103

***

### GPUShaderModule

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16108

The **`GPUShaderModule`** interface of the WebGPU API represents an internal shader module object, a container for WGSL shader code that can be submitted to the GPU for execution by a pipeline.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUShaderModule)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

#### Methods

##### getCompilationInfo()

> **getCompilationInfo**(): `Promise`\<[`GPUCompilationInfo`](#gpucompilationinfo)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16114

The **`getCompilationInfo()`** method of the GPUShaderModule interface returns a Promise that fulfills with a GPUCompilationInfo object containing messages generated during the GPUShaderModule's compilation.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUShaderModule/getCompilationInfo)

###### Returns

`Promise`\<[`GPUCompilationInfo`](#gpucompilationinfo)\>

***

### GPUShaderModuleDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1106

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### code

> **code**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1107

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

***

### GPUStencilFaceState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1110

#### Properties

##### compare?

> `optional` **compare?**: [`GPUCompareFunction`](#gpucomparefunction)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1111

##### depthFailOp?

> `optional` **depthFailOp?**: [`GPUStencilOperation`](#gpustenciloperation)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1112

##### failOp?

> `optional` **failOp?**: [`GPUStencilOperation`](#gpustenciloperation)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1113

##### passOp?

> `optional` **passOp?**: [`GPUStencilOperation`](#gpustenciloperation)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1114

***

### GPUStorageTextureBindingLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1117

#### Properties

##### access?

> `optional` **access?**: [`GPUStorageTextureAccess`](#gpustoragetextureaccess)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1118

##### format

> **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1119

##### viewDimension?

> `optional` **viewDimension?**: [`GPUTextureViewDimension`](#gputextureviewdimension)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1120

***

### GPUSupportedFeatures

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16128

The **`GPUSupportedFeatures`** interface of the WebGPU API is a Set-like object that describes additional functionality supported by a GPUAdapter.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedFeatures)

#### Extends

- `ReadonlySet`\<`string`\>

#### Properties

##### size

> `readonly` **size**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:127

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): [`SetIterator`](#setiterator)\<`string`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:216

Iterates over values in the set.

###### Returns

[`SetIterator`](#setiterator)\<`string`\>

##### entries()

> **entries**(): [`SetIterator`](#setiterator)\<\[`string`, `string`\]\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:221

Returns an iterable of [v,v] pairs for every value `v` in the set.

###### Returns

[`SetIterator`](#setiterator)\<\[`string`, `string`\]\>

##### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16129

###### Parameters

###### callbackfn

(`value`, `key`, `parent`) => `void`

###### thisArg?

`any`

###### Returns

`void`

##### has()

> **has**(`value`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:126

###### Parameters

###### value

`string`

###### Returns

`boolean`

##### keys()

> **keys**(): [`SetIterator`](#setiterator)\<`string`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:226

Despite its name, returns an iterable of the values in the set.

###### Returns

[`SetIterator`](#setiterator)\<`string`\>

##### values()

> **values**(): [`SetIterator`](#setiterator)\<`string`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:231

Returns an iterable of values in the set.

###### Returns

[`SetIterator`](#setiterator)\<`string`\>

***

### GPUSupportedLimits

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16143

The **`GPUSupportedLimits`** interface of the WebGPU API describes the limits supported by a GPUAdapter.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits)

#### Properties

##### maxBindGroups

> `readonly` **maxBindGroups**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16145

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxBindGroupsPlusVertexBuffers

> `readonly` **maxBindGroupsPlusVertexBuffers**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16147

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxBindingsPerBindGroup

> `readonly` **maxBindingsPerBindGroup**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16149

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxBufferSize

> `readonly` **maxBufferSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16151

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxColorAttachmentBytesPerSample

> `readonly` **maxColorAttachmentBytesPerSample**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16153

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxColorAttachments

> `readonly` **maxColorAttachments**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16155

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeInvocationsPerWorkgroup

> `readonly` **maxComputeInvocationsPerWorkgroup**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16157

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeWorkgroupSizeX

> `readonly` **maxComputeWorkgroupSizeX**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16159

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeWorkgroupSizeY

> `readonly` **maxComputeWorkgroupSizeY**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16161

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeWorkgroupSizeZ

> `readonly` **maxComputeWorkgroupSizeZ**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16163

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeWorkgroupsPerDimension

> `readonly` **maxComputeWorkgroupsPerDimension**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16167

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxComputeWorkgroupStorageSize

> `readonly` **maxComputeWorkgroupStorageSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16165

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxDynamicStorageBuffersPerPipelineLayout

> `readonly` **maxDynamicStorageBuffersPerPipelineLayout**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16169

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxDynamicUniformBuffersPerPipelineLayout

> `readonly` **maxDynamicUniformBuffersPerPipelineLayout**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16171

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxInterStageShaderVariables

> `readonly` **maxInterStageShaderVariables**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16173

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxSampledTexturesPerShaderStage

> `readonly` **maxSampledTexturesPerShaderStage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16175

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxSamplersPerShaderStage

> `readonly` **maxSamplersPerShaderStage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16177

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxStorageBufferBindingSize

> `readonly` **maxStorageBufferBindingSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16179

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxStorageBuffersPerShaderStage

> `readonly` **maxStorageBuffersPerShaderStage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16181

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxStorageTexturesPerShaderStage

> `readonly` **maxStorageTexturesPerShaderStage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16183

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxTextureArrayLayers

> `readonly` **maxTextureArrayLayers**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16185

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxTextureDimension1D

> `readonly` **maxTextureDimension1D**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16187

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxTextureDimension2D

> `readonly` **maxTextureDimension2D**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16189

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxTextureDimension3D

> `readonly` **maxTextureDimension3D**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16191

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxUniformBufferBindingSize

> `readonly` **maxUniformBufferBindingSize**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16193

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxUniformBuffersPerShaderStage

> `readonly` **maxUniformBuffersPerShaderStage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16195

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxVertexAttributes

> `readonly` **maxVertexAttributes**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16197

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxVertexBufferArrayStride

> `readonly` **maxVertexBufferArrayStride**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16199

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### maxVertexBuffers

> `readonly` **maxVertexBuffers**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16201

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### minStorageBufferOffsetAlignment

> `readonly` **minStorageBufferOffsetAlignment**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16203

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

##### minUniformBufferOffsetAlignment

> `readonly` **minUniformBufferOffsetAlignment**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16205

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUSupportedLimits#instance_properties)

***

### GPUTexelCopyBufferInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1123

#### Extends

- [`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout)

#### Properties

##### buffer

> **buffer**: [`GPUBuffer`](#gpubuffer)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1124

##### bytesPerRow?

> `optional` **bytesPerRow?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1128

###### Inherited from

[`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout).[`bytesPerRow`](#bytesperrow-1)

##### offset?

> `optional` **offset?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1129

###### Inherited from

[`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout).[`offset`](#offset-3)

##### rowsPerImage?

> `optional` **rowsPerImage?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1130

###### Inherited from

[`GPUTexelCopyBufferLayout`](#gputexelcopybufferlayout).[`rowsPerImage`](#rowsperimage-1)

***

### GPUTexelCopyBufferLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1127

#### Extended by

- [`GPUTexelCopyBufferInfo`](#gputexelcopybufferinfo)

#### Properties

##### bytesPerRow?

> `optional` **bytesPerRow?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1128

##### offset?

> `optional` **offset?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1129

##### rowsPerImage?

> `optional` **rowsPerImage?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1130

***

### GPUTexelCopyTextureInfo

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1133

#### Extended by

- [`GPUCopyExternalImageDestInfo`](#gpucopyexternalimagedestinfo)

#### Properties

##### aspect?

> `optional` **aspect?**: [`GPUTextureAspect`](#gputextureaspect)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1134

##### mipLevel?

> `optional` **mipLevel?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1135

##### origin?

> `optional` **origin?**: [`GPUOrigin3D`](#gpuorigin3d)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1136

##### texture

> **texture**: [`GPUTexture`](#gputexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1137

***

### GPUTexture

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16219

The **`GPUTexture`** interface of the WebGPU API represents a container used to store 1D, 2D, or 3D arrays of data, such as images, to use in GPU rendering operations.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### depthOrArrayLayers

> `readonly` **depthOrArrayLayers**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16225

The **`depthOrArrayLayers`** read-only property of the GPUTexture interface represents the depth or layer count of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/depthOrArrayLayers)

##### dimension

> `readonly` **dimension**: [`GPUTextureDimension`](#gputexturedimension-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16231

The **`dimension`** read-only property of the GPUTexture interface represents the dimension of the set of texels for each GPUTexture subresource.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/dimension)

##### format

> `readonly` **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16237

The **`format`** read-only property of the GPUTexture interface represents the format of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/format)

##### height

> `readonly` **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16243

The **`height`** read-only property of the GPUTexture interface represents the height of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/height)

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

##### mipLevelCount

> `readonly` **mipLevelCount**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16249

The **`mipLevelCount`** read-only property of the GPUTexture interface represents the number of mip levels of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/mipLevelCount)

##### sampleCount

> `readonly` **sampleCount**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16255

The **`sampleCount`** read-only property of the GPUTexture interface represents the sample count of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/sampleCount)

##### usage

> `readonly` **usage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16261

The **`usage`** read-only property of the GPUTexture interface is the bitwise flags representing the allowed usages of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/usage)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16267

The **`width`** read-only property of the GPUTexture interface represents the width of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/width)

#### Methods

##### createView()

> **createView**(`descriptor?`): [`GPUTextureView`](#gputextureview)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16273

The **`createView()`** method of the GPUTexture interface creates a GPUTextureView representing a specific view of the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/createView)

###### Parameters

###### descriptor?

[`GPUTextureViewDescriptor`](#gputextureviewdescriptor)

###### Returns

[`GPUTextureView`](#gputextureview)

##### destroy()

> **destroy**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16279

The **`destroy()`** method of the GPUTexture interface destroys the GPUTexture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTexture/destroy)

###### Returns

`void`

***

### GPUTextureBindingLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1140

#### Properties

##### multisampled?

> `optional` **multisampled?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1141

##### sampleType?

> `optional` **sampleType?**: [`GPUTextureSampleType`](#gputexturesampletype)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1142

##### viewDimension?

> `optional` **viewDimension?**: [`GPUTextureViewDimension`](#gputextureviewdimension)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1143

***

### GPUTextureDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1146

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### dimension?

> `optional` **dimension?**: [`GPUTextureDimension`](#gputexturedimension-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1147

##### format

> **format**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1148

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### mipLevelCount?

> `optional` **mipLevelCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1149

##### sampleCount?

> `optional` **sampleCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1150

##### size

> **size**: [`GPUExtent3D`](#gpuextent3d)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1151

##### usage

> **usage**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1152

##### viewFormats?

> `optional` **viewFormats?**: [`GPUTextureFormat`](#gputextureformat-1)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1153

***

### GPUTextureView

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16293

The **`GPUTextureView`** interface of the WebGPU API represents a view into a subset of the texture resources defined by a particular GPUTexture.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUTextureView)

#### Extends

- [`GPUObjectBase`](#gpuobjectbase)

#### Properties

##### label

> **label**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15829

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUBindGroup/label)

###### Inherited from

[`GPUObjectBase`](#gpuobjectbase).[`label`](#label-17)

***

### GPUTextureViewDescriptor

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1156

#### Extends

- [`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase)

#### Properties

##### arrayLayerCount?

> `optional` **arrayLayerCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1157

##### aspect?

> `optional` **aspect?**: [`GPUTextureAspect`](#gputextureaspect)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1158

##### baseArrayLayer?

> `optional` **baseArrayLayer?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1159

##### baseMipLevel?

> `optional` **baseMipLevel?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1160

##### dimension?

> `optional` **dimension?**: [`GPUTextureViewDimension`](#gputextureviewdimension)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1161

##### format?

> `optional` **format?**: [`GPUTextureFormat`](#gputextureformat-1)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1162

##### label?

> `optional` **label?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:979

###### Inherited from

[`GPUObjectDescriptorBase`](#gpuobjectdescriptorbase).[`label`](#label-18)

##### mipLevelCount?

> `optional` **mipLevelCount?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1163

##### usage?

> `optional` **usage?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1164

***

### GPUUncapturedErrorEvent

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16307

The **`GPUUncapturedErrorEvent`** interface of the WebGPU API is the event object type for the GPUDevice uncapturederror event, used for telemetry and to report unexpected errors.
Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUUncapturedErrorEvent)

#### Extends

- `Event`

#### Properties

##### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14273

###### Inherited from

`Event.AT_TARGET`

##### bubbles

> `readonly` **bubbles**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14164

The **`bubbles`** read-only property of the Event interface indicates whether the event bubbles up through the DOM tree or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

###### Inherited from

`Event.bubbles`

##### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14274

###### Inherited from

`Event.BUBBLING_PHASE`

##### cancelable

> `readonly` **cancelable**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14177

The **`cancelable`** read-only property of the Event interface indicates whether the event can be canceled, and therefore prevented as if the event never happened.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

###### Inherited from

`Event.cancelable`

##### ~~cancelBubble~~

> **cancelBubble**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14171

The **`cancelBubble`** property of the Event interface is deprecated. Use Event.stopPropagation() instead. Setting its value to true before returning from an event handler prevents propagation of the event. In later implementations, setting this to false does nothing. See Browser compatibility for details.

###### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

###### Inherited from

`Event.cancelBubble`

##### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14272

###### Inherited from

`Event.CAPTURING_PHASE`

##### composed

> `readonly` **composed**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14183

The read-only **`composed`** property of the Event interface returns a boolean value which indicates whether or not the event will propagate across the shadow DOM boundary into the standard DOM.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

###### Inherited from

`Event.composed`

##### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14189

The **`currentTarget`** read-only property of the Event interface identifies the element to which the event handler has been attached.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

###### Inherited from

`Event.currentTarget`

##### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14195

The **`defaultPrevented`** read-only property of the Event interface returns a boolean value indicating whether or not the call to Event.preventDefault() canceled the event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

###### Inherited from

`Event.defaultPrevented`

##### error

> `readonly` **error**: [`GPUError`](#gpuerror)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16313

The **`error`** read-only property of the GPUUncapturedErrorEvent interface is a GPUError object instance providing access to the details of the error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/GPUUncapturedErrorEvent/error)

##### eventPhase

> `readonly` **eventPhase**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14201

The **`eventPhase`** read-only property of the Event interface indicates which phase of the event flow is currently being evaluated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

###### Inherited from

`Event.eventPhase`

##### isTrusted

> `readonly` **isTrusted**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14207

The **`isTrusted`** read-only property of the Event interface is a boolean value that is true when the event was generated by the user agent (including via user actions and programmatic methods such as HTMLElement.focus()), and false when the event was dispatched via EventTarget.dispatchEvent(). The only exception is the click event, which initializes the isTrusted property to false in user agents.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

###### Inherited from

`Event.isTrusted`

##### NONE

> `readonly` **NONE**: `0`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14271

###### Inherited from

`Event.NONE`

##### ~~returnValue~~

> **returnValue**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14214

The Event property **`returnValue`** indicates whether the default action for this event has been prevented or not.

###### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

###### Inherited from

`Event.returnValue`

##### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14221

The deprecated **`Event.srcElement`** is an alias for the Event.target property. Use Event.target instead.

###### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

###### Inherited from

`Event.srcElement`

##### target

> `readonly` **target**: `EventTarget` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14227

The read-only **`target`** property of the Event interface is a reference to the object onto which the event was dispatched. It is different from Event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

###### Inherited from

`Event.target`

##### timeStamp

> `readonly` **timeStamp**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14233

The **`timeStamp`** read-only property of the Event interface returns the time (in milliseconds) at which the event was created.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

###### Inherited from

`Event.timeStamp`

##### type

> `readonly` **type**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14239

The **`type`** read-only property of the Event interface returns a string containing the event's type. It is set when the event is constructed and is the name commonly used to refer to the specific event, such as click, load, or error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

###### Inherited from

`Event.type`

#### Methods

##### composedPath()

> **composedPath**(): `EventTarget`[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14245

The **`composedPath()`** method of the Event interface returns the event's path which is an array of the objects on which listeners will be invoked. This does not include nodes in shadow trees if the shadow root was created with its ShadowRoot.mode closed.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

###### Returns

`EventTarget`[]

###### Inherited from

`Event.composedPath`

##### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14252

The **`Event.initEvent()`** method is used to initialize the value of an event created using Document.createEvent().

###### Parameters

###### type

`string`

###### bubbles?

`boolean`

###### cancelable?

`boolean`

###### Returns

`void`

###### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

###### Inherited from

`Event.initEvent`

##### preventDefault()

> **preventDefault**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14258

The **`preventDefault()`** method of the Event interface tells the user agent that the event is being explicitly handled, so its default action, such as page scrolling, link navigation, or pasting text, should not be taken.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

###### Returns

`void`

###### Inherited from

`Event.preventDefault`

##### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14264

The **`stopImmediatePropagation()`** method of the Event interface prevents other listeners of the same event from being called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

###### Returns

`void`

###### Inherited from

`Event.stopImmediatePropagation`

##### stopPropagation()

> **stopPropagation**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14270

The **`stopPropagation()`** method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases. It does not, however, prevent any default behaviors from occurring; for instance, clicks on links are still processed. If you want to stop those behaviors, see the preventDefault() method. It also does not prevent propagation to other event-handlers of the current element. If you want to stop those, see stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

###### Returns

`void`

###### Inherited from

`Event.stopPropagation`

***

### GPUUncapturedErrorEventInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1167

#### Extends

- [`EventInit`](#eventinit)

#### Properties

##### bubbles?

> `optional` **bubbles?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:735

###### Inherited from

[`EventInit`](#eventinit).[`bubbles`](#bubbles)

##### cancelable?

> `optional` **cancelable?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:736

###### Inherited from

[`EventInit`](#eventinit).[`cancelable`](#cancelable)

##### composed?

> `optional` **composed?**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:737

###### Inherited from

[`EventInit`](#eventinit).[`composed`](#composed)

##### error

> **error**: [`GPUError`](#gpuerror)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1168

***

### GPUVertexAttribute

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1171

#### Properties

##### format

> **format**: [`GPUVertexFormat`](#gpuvertexformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1172

##### offset

> **offset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1173

##### shaderLocation

> **shaderLocation**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1174

***

### GPUVertexBufferLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1177

#### Properties

##### arrayStride

> **arrayStride**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1178

##### attributes

> **attributes**: [`GPUVertexAttribute`](#gpuvertexattribute)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1179

##### stepMode?

> `optional` **stepMode?**: [`GPUVertexStepMode`](#gpuvertexstepmode)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1180

***

### GPUVertexState

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1183

#### Extends

- [`GPUProgrammableStage`](#gpuprogrammablestage)

#### Properties

##### buffers?

> `optional` **buffers?**: ([`GPUVertexBufferLayout`](#gpuvertexbufferlayout) \| `null`)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1184

##### constants?

> `optional` **constants?**: [`Record`](#record)\<`string`, `number`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1014

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`constants`](#constants-1)

##### entryPoint?

> `optional` **entryPoint?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1015

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`entryPoint`](#entrypoint-1)

##### module

> **module**: [`GPUShaderModule`](#gpushadermodule)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1016

###### Inherited from

[`GPUProgrammableStage`](#gpuprogrammablestage).[`module`](#module-1)

***

### ImageBitmap

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22684

The **`ImageBitmap`** interface represents a bitmap image which can be drawn to a <canvas> without undue latency. It can be created from a variety of source objects using the Window.createImageBitmap() or WorkerGlobalScope.createImageBitmap() factory method. ImageBitmap provides an asynchronous and resource efficient pathway to prepare textures for rendering in WebGL.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmap)

#### Properties

##### height

> `readonly` **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22690

The **`ImageBitmap.height`** read-only property returns the ImageBitmap object's height in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmap/height)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22696

The **`ImageBitmap.width`** read-only property returns the ImageBitmap object's width in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmap/width)

#### Methods

##### close()

> **close**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22702

The **`ImageBitmap.close()`** method disposes of all graphical resources associated with an ImageBitmap.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmap/close)

###### Returns

`void`

***

### ImageBitmapRenderingContext

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22715

The **`ImageBitmapRenderingContext`** interface is a canvas rendering context that provides the functionality to replace the canvas's contents with the given ImageBitmap. Its context id (the first argument to HTMLCanvasElement.getContext() or OffscreenCanvas.getContext()) is "bitmaprenderer".

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmapRenderingContext)

#### Properties

##### canvas

> `readonly` **canvas**: [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| [`OffscreenCanvas`](#offscreencanvas)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22721

The **`ImageBitmapRenderingContext.canvas`** property, part of the Canvas API, is a read-only reference to the HTMLCanvasElement or OffscreenCanvas object that is associated with the given context.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmapRenderingContext/canvas)

#### Methods

##### transferFromImageBitmap()

> **transferFromImageBitmap**(`bitmap`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22727

The **`ImageBitmapRenderingContext.transferFromImageBitmap()`** method displays the given ImageBitmap in the canvas associated with this rendering context. The ownership of the ImageBitmap is transferred to the canvas as well.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap)

###### Parameters

###### bitmap

[`ImageBitmap`](#imagebitmap) \| `null`

###### Returns

`void`

***

### ImageData

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22784

The **`ImageData`** interface represents the underlying pixel data of an area of a <canvas> element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData)

#### Properties

##### colorSpace

> `readonly` **colorSpace**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22790

The read-only **`ImageData.colorSpace`** property is a string indicating the color space of the image data.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/colorSpace)

##### data

> `readonly` **data**: [`ImageDataArray`](#imagedataarray)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22796

The readonly **`ImageData.data`** property returns a Uint8ClampedArray or Float16Array that contains the ImageData object's pixel data. Data is stored as a one-dimensional array in the RGBA order.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/data)

##### height

> `readonly` **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22802

The readonly **`ImageData.height`** property returns the number of rows in the ImageData object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/height)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22808

The readonly **`ImageData.width`** property returns the number of pixels per row in the ImageData object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/ImageData/width)

***

### ImageDataSettings

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1297

#### Properties

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1298

##### pixelFormat?

> `optional` **pixelFormat?**: [`ImageDataPixelFormat`](#imagedatapixelformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1299

***

### ImageEncodeOptions

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1322

#### Properties

##### quality?

> `optional` **quality?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1323

##### type?

> `optional` **type?**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1324

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

> **\[iterator\]**(): [`Iterator`](#iterator-2)\<`T`, `TReturn`, `TNext`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:47

###### Returns

[`Iterator`](#iterator-2)\<`T`, `TReturn`, `TNext`\>

***

### Iterator

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:39

#### Extended by

- [`IteratorObject`](#iteratorobject)

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

### IteratorObject

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:60

Describes an [Iterator](#iterator-2) produced by the runtime that inherits from the intrinsic `Iterator.prototype`.

#### Extends

- [`Iterator`](#iterator-2)\<`T`, `TReturn`, `TNext`\>

#### Extended by

- [`SetIterator`](#setiterator)
- [`SetIterator`](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md#setiterator)
- [`ArrayIterator`](@repo.palette-engine.colorSpaces.<internal>.md#arrayiterator)
- [`MapIterator`](@repo.palette-engine.colorSpaces.<internal>.md#mapiterator)
- [`MediaKeyStatusMapIterator`](@repo.palette-engine.colorSpaces.<internal>.md#mediakeystatusmapiterator-1)
- [`SetIterator`](@repo.palette-engine.colorSpaces.<internal>.md#setiterator)
- [`StylePropertyMapReadOnlyIterator`](@repo.palette-engine.colorSpaces.<internal>.md#stylepropertymapreadonlyiterator-1)
- [`ArrayIterator`](@repo.randomart-engine.png-export.<internal>.md#arrayiterator)
- [`SetIterator`](@repo.worker-pool.worker-pool.<internal>.md#setiterator)

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `unknown`

##### TNext

`TNext` = `unknown`

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): [`IteratorObject`](#iteratorobject)\<`T`, `TReturn`, `TNext`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:61

###### Returns

[`IteratorObject`](#iteratorobject)\<`T`, `TReturn`, `TNext`\>

##### next()

> **next**(...`__namedParameters`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:41

###### Parameters

###### \_\_namedParameters

\[\] \| \[`TNext`\]

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

###### Inherited from

[`Iterator`](#iterator-2).[`next`](#next)

##### return()?

> `optional` **return**(`value?`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:42

###### Parameters

###### value?

`TReturn`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

###### Inherited from

[`Iterator`](#iterator-2).[`return`](#return)

##### throw()?

> `optional` **throw**(`e?`): [`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:43

###### Parameters

###### e?

`any`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `TReturn`\>

###### Inherited from

[`Iterator`](#iterator-2).[`throw`](#throw)

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

### OffscreenCanvas

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26738

When using the <canvas> element or the Canvas API, rendering, animation, and user interaction usually happen on the main execution thread of a web application. The computation relating to canvas animations and rendering can have a significant impact on application performance.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas)

#### Extends

- `EventTarget`

#### Properties

##### height

> **height**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26744

The **`height`** property returns and sets the height of an OffscreenCanvas object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/height)

##### oncontextlost

> **oncontextlost**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26746

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/contextlost_event)

##### oncontextrestored

> **oncontextrestored**: ((`this`, `ev`) => `any`) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26748

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/contextrestored_event)

##### width

> **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26754

The **`width`** property returns and sets the width of an OffscreenCanvas object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/width)

#### Methods

##### addEventListener()

###### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26777

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Type Parameters

###### K

`K` *extends* keyof [`OffscreenCanvasEventMap`](#offscreencanvaseventmap)

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

###### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26778

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`AddEventListenerOptions`](#addeventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.addEventListener`

##### convertToBlob()

> **convertToBlob**(`options?`): `Promise`\<`Blob`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26760

The **`OffscreenCanvas.convertToBlob()`** method creates a Blob object representing the image contained in the canvas.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/convertToBlob)

###### Parameters

###### options?

[`ImageEncodeOptions`](#imageencodeoptions)

###### Returns

`Promise`\<`Blob`\>

##### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:14386

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

###### Parameters

###### event

`Event`

###### Returns

`boolean`

###### Inherited from

`EventTarget.dispatchEvent`

##### getContext()

###### Call Signature

> **getContext**(`contextId`, `options?`): [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26766

The **`OffscreenCanvas.getContext()`** method returns a drawing context for an offscreen canvas, or null if the context identifier is not supported, or the offscreen canvas has already been set to a different context mode.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/getContext)

###### Parameters

###### contextId

`"2d"`

###### options?

`any`

###### Returns

[`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d) \| `null`

###### Call Signature

> **getContext**(`contextId`, `options?`): [`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26767

###### Parameters

###### contextId

`"bitmaprenderer"`

###### options?

`any`

###### Returns

[`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext) \| `null`

###### Call Signature

> **getContext**(`contextId`, `options?`): [`WebGLRenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webglrenderingcontext) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26768

###### Parameters

###### contextId

`"webgl"`

###### options?

`any`

###### Returns

[`WebGLRenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webglrenderingcontext) \| `null`

###### Call Signature

> **getContext**(`contextId`, `options?`): [`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26769

###### Parameters

###### contextId

`"webgl2"`

###### options?

`any`

###### Returns

[`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext) \| `null`

###### Call Signature

> **getContext**(`contextId`, `options?`): [`OffscreenRenderingContext`](#offscreenrenderingcontext) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26770

###### Parameters

###### contextId

[`OffscreenRenderingContextId`](#offscreenrenderingcontextid)

###### options?

`any`

###### Returns

[`OffscreenRenderingContext`](#offscreenrenderingcontext) \| `null`

##### removeEventListener()

###### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26779

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Type Parameters

###### K

`K` *extends* keyof [`OffscreenCanvasEventMap`](#offscreencanvaseventmap)

###### Parameters

###### type

`K`

###### listener

(`this`, `ev`) => `any`

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

###### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26780

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target. The event listener to be removed is identified using a combination of the event type, the event listener function itself, and various optional options that may affect the matching process; see Matching event listeners for removal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

###### Parameters

###### type

`string`

###### listener

[`EventListenerOrEventListenerObject`](#eventlisteneroreventlistenerobject)

###### options?

`boolean` \| [`EventListenerOptions`](#eventlisteneroptions)

###### Returns

`void`

###### Overrides

`EventTarget.removeEventListener`

##### transferToImageBitmap()

> **transferToImageBitmap**(): [`ImageBitmap`](#imagebitmap)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26776

The **`OffscreenCanvas.transferToImageBitmap()`** method creates an ImageBitmap object from the most recently rendered image of the OffscreenCanvas. The OffscreenCanvas allocates a new image for its subsequent rendering.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvas/transferToImageBitmap)

###### Returns

[`ImageBitmap`](#imagebitmap)

***

### OffscreenCanvasEventMap

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26728

#### Properties

##### contextlost

> **contextlost**: `Event`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26729

##### contextrestored

> **contextrestored**: `Event`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26730

***

### OffscreenCanvasRenderingContext2D

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26793

The **`OffscreenCanvasRenderingContext2D`** interface is a CanvasRenderingContext2D rendering context for drawing to the bitmap of an OffscreenCanvas object. It is similar to the CanvasRenderingContext2D object, with the following differences:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/OffscreenCanvasRenderingContext2D)

#### Extends

- [`CanvasCompositing`](#canvascompositing).[`CanvasDrawImage`](#canvasdrawimage).[`CanvasDrawPath`](#canvasdrawpath).[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`CanvasFilters`](#canvasfilters).[`CanvasImageData`](#canvasimagedata).[`CanvasImageSmoothing`](#canvasimagesmoothing).[`CanvasPath`](#canvaspath).[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`CanvasRect`](#canvasrect).[`CanvasShadowStyles`](#canvasshadowstyles).[`CanvasState`](#canvasstate).[`CanvasText`](#canvastext).[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`CanvasTransform`](#canvastransform)

#### Properties

##### canvas

> `readonly` **canvas**: [`OffscreenCanvas`](#offscreencanvas)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26795

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/canvas)

##### direction

> **direction**: [`CanvasDirection`](#canvasdirection)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10488

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/direction)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`direction`](#direction-1)

##### fillStyle

> **fillStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10308

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`fillStyle`](#fillstyle)

##### filter

> **filter**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10323

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/filter)

###### Inherited from

[`CanvasFilters`](#canvasfilters).[`filter`](#filter)

##### font

> **font**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10490

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/font)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`font`](#font-1)

##### fontKerning

> **fontKerning**: [`CanvasFontKerning`](#canvasfontkerning)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10492

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontKerning)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontKerning`](#fontkerning-1)

##### fontStretch

> **fontStretch**: [`CanvasFontStretch`](#canvasfontstretch)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10494

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontStretch)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontStretch`](#fontstretch-1)

##### fontVariantCaps

> **fontVariantCaps**: [`CanvasFontVariantCaps`](#canvasfontvariantcaps)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10496

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fontVariantCaps)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`fontVariantCaps`](#fontvariantcaps-1)

##### globalAlpha

> **globalAlpha**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10274

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalAlpha)

###### Inherited from

[`CanvasCompositing`](#canvascompositing).[`globalAlpha`](#globalalpha)

##### globalCompositeOperation

> **globalCompositeOperation**: [`GlobalCompositeOperation`](#globalcompositeoperation-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10276

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

###### Inherited from

[`CanvasCompositing`](#canvascompositing).[`globalCompositeOperation`](#globalcompositeoperation)

##### imageSmoothingEnabled

> **imageSmoothingEnabled**: `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10358

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

###### Inherited from

[`CanvasImageSmoothing`](#canvasimagesmoothing).[`imageSmoothingEnabled`](#imagesmoothingenabled)

##### imageSmoothingQuality

> **imageSmoothingQuality**: [`ImageSmoothingQuality`](#imagesmoothingquality-3)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10360

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality)

###### Inherited from

[`CanvasImageSmoothing`](#canvasimagesmoothing).[`imageSmoothingQuality`](#imagesmoothingquality)

##### letterSpacing

> **letterSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10498

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/letterSpacing)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`letterSpacing`](#letterspacing-1)

##### lineCap

> **lineCap**: [`CanvasLineCap`](#canvaslinecap)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10388

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineCap)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineCap`](#linecap)

##### lineDashOffset

> **lineDashOffset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10390

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineDashOffset`](#linedashoffset)

##### lineJoin

> **lineJoin**: [`CanvasLineJoin`](#canvaslinejoin)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10392

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineJoin)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineJoin`](#linejoin)

##### lineWidth

> **lineWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10394

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineWidth)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`lineWidth`](#linewidth)

##### miterLimit

> **miterLimit**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10396

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/miterLimit)

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`miterLimit`](#miterlimit)

##### shadowBlur

> **shadowBlur**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10457

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowBlur)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowBlur`](#shadowblur-1)

##### shadowColor

> **shadowColor**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10459

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowColor)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowColor`](#shadowcolor-1)

##### shadowOffsetX

> **shadowOffsetX**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10461

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowOffsetX`](#shadowoffsetx-1)

##### shadowOffsetY

> **shadowOffsetY**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10463

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)

###### Inherited from

[`CanvasShadowStyles`](#canvasshadowstyles).[`shadowOffsetY`](#shadowoffsety-1)

##### strokeStyle

> **strokeStyle**: `string` \| [`CanvasGradient`](#canvasgradient) \| [`CanvasPattern`](#canvaspattern)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10310

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`strokeStyle`](#strokestyle)

##### textAlign

> **textAlign**: [`CanvasTextAlign`](#canvastextalign)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10500

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textAlign`](#textalign-1)

##### textBaseline

> **textBaseline**: [`CanvasTextBaseline`](#canvastextbaseline)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10502

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textBaseline)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textBaseline`](#textbaseline-1)

##### textRendering

> **textRendering**: [`CanvasTextRendering`](#canvastextrendering)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10504

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textRendering)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`textRendering`](#textrendering-1)

##### wordSpacing

> **wordSpacing**: `string`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10506

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/wordSpacing)

###### Inherited from

[`CanvasTextDrawingStyles`](#canvastextdrawingstyles).[`wordSpacing`](#wordspacing-1)

#### Methods

##### arc()

> **arc**(`x`, `y`, `radius`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10365

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arc)

###### Parameters

###### x

`number`

###### y

`number`

###### radius

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arc`](#arc)

##### arcTo()

> **arcTo**(`x1`, `y1`, `x2`, `y2`, `radius`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10367

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arcTo)

###### Parameters

###### x1

`number`

###### y1

`number`

###### x2

`number`

###### y2

`number`

###### radius

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arcTo`](#arcto)

##### beginPath()

> **beginPath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10288

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/beginPath)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`beginPath`](#beginpath)

##### bezierCurveTo()

> **bezierCurveTo**(`cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10369

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo)

###### Parameters

###### cp1x

`number`

###### cp1y

`number`

###### cp2x

`number`

###### cp2y

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`bezierCurveTo`](#beziercurveto)

##### clearRect()

> **clearRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10424

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clearRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`clearRect`](#clearrect)

##### clip()

###### Call Signature

> **clip**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10290

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clip)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`clip`](#clip)

###### Call Signature

> **clip**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10291

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`clip`](#clip)

##### closePath()

> **closePath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10371

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/closePath)

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`closePath`](#closepath)

##### createConicGradient()

> **createConicGradient**(`startAngle`, `x`, `y`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10312

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createConicGradient)

###### Parameters

###### startAngle

`number`

###### x

`number`

###### y

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createConicGradient`](#createconicgradient)

##### createImageData()

###### Call Signature

> **createImageData**(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10347

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createImageData)

###### Parameters

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`createImageData`](#createimagedata)

###### Call Signature

> **createImageData**(`imageData`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10348

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`createImageData`](#createimagedata)

##### createLinearGradient()

> **createLinearGradient**(`x0`, `y0`, `x1`, `y1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10314

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### x1

`number`

###### y1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createLinearGradient`](#createlineargradient)

##### createPattern()

> **createPattern**(`image`, `repetition`): [`CanvasPattern`](#canvaspattern) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10316

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createPattern)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### repetition

`string` \| `null`

###### Returns

[`CanvasPattern`](#canvaspattern) \| `null`

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createPattern`](#createpattern)

##### createRadialGradient()

> **createRadialGradient**(`x0`, `y0`, `r0`, `x1`, `y1`, `r1`): [`CanvasGradient`](#canvasgradient)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10318

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)

###### Parameters

###### x0

`number`

###### y0

`number`

###### r0

`number`

###### x1

`number`

###### y1

`number`

###### r1

`number`

###### Returns

[`CanvasGradient`](#canvasgradient)

###### Inherited from

[`CanvasFillStrokeStyles`](#canvasfillstrokestyles).[`createRadialGradient`](#createradialgradient)

##### drawImage()

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10281

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage)

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

###### Call Signature

> **drawImage**(`image`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10282

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

###### Call Signature

> **drawImage**(`image`, `sx`, `sy`, `sw`, `sh`, `dx`, `dy`, `dw`, `dh`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10283

###### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### dx

`number`

###### dy

`number`

###### dw

`number`

###### dh

`number`

###### Returns

`void`

###### Inherited from

[`CanvasDrawImage`](#canvasdrawimage).[`drawImage`](#drawimage)

##### ellipse()

> **ellipse**(`x`, `y`, `radiusX`, `radiusY`, `rotation`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10373

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/ellipse)

###### Parameters

###### x

`number`

###### y

`number`

###### radiusX

`number`

###### radiusY

`number`

###### rotation

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`ellipse`](#ellipse)

##### fill()

###### Call Signature

> **fill**(`fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10293

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fill)

###### Parameters

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`fill`](#fill)

###### Call Signature

> **fill**(`path`, `fillRule?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10294

###### Parameters

###### path

[`Path2D`](#path2d)

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`fill`](#fill)

##### fillRect()

> **fillRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10426

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`fillRect`](#fillrect)

##### fillText()

> **fillText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10479

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

###### Inherited from

[`CanvasText`](#canvastext).[`fillText`](#filltext-1)

##### getImageData()

> **getImageData**(`sx`, `sy`, `sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10350

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getImageData)

###### Parameters

###### sx

`number`

###### sy

`number`

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

###### Returns

[`ImageData`](#imagedata)

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`getImageData`](#getimagedata)

##### getLineDash()

> **getLineDash**(): `number`[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10398

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getLineDash)

###### Returns

`number`[]

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`getLineDash`](#getlinedash)

##### getTransform()

> **getTransform**(): [`DOMMatrix`](#dommatrix)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10511

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getTransform)

###### Returns

[`DOMMatrix`](#dommatrix)

###### Inherited from

[`CanvasTransform`](#canvastransform).[`getTransform`](#gettransform-1)

##### isContextLost()

> **isContextLost**(): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10468

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isContextLost)

###### Returns

`boolean`

###### Inherited from

[`CanvasState`](#canvasstate).[`isContextLost`](#iscontextlost-1)

##### isPointInPath()

###### Call Signature

> **isPointInPath**(`x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10296

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInPath)

###### Parameters

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInPath`](#ispointinpath)

###### Call Signature

> **isPointInPath**(`path`, `x`, `y`, `fillRule?`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10297

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### fillRule?

[`CanvasFillRule`](#canvasfillrule)

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInPath`](#ispointinpath)

##### isPointInStroke()

###### Call Signature

> **isPointInStroke**(`x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10299

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/isPointInStroke)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInStroke`](#ispointinstroke)

###### Call Signature

> **isPointInStroke**(`path`, `x`, `y`): `boolean`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10300

###### Parameters

###### path

[`Path2D`](#path2d)

###### x

`number`

###### y

`number`

###### Returns

`boolean`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`isPointInStroke`](#ispointinstroke)

##### lineTo()

> **lineTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10375

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`lineTo`](#lineto)

##### measureText()

> **measureText**(`text`): [`TextMetrics`](#textmetrics)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10481

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/measureText)

###### Parameters

###### text

`string`

###### Returns

[`TextMetrics`](#textmetrics)

###### Inherited from

[`CanvasText`](#canvastext).[`measureText`](#measuretext-1)

##### moveTo()

> **moveTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10377

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`moveTo`](#moveto)

##### putImageData()

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10352

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/putImageData)

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### Returns

`void`

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`putImageData`](#putimagedata)

###### Call Signature

> **putImageData**(`imageData`, `dx`, `dy`, `dirtyX`, `dirtyY`, `dirtyWidth`, `dirtyHeight`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10353

###### Parameters

###### imageData

[`ImageData`](#imagedata)

###### dx

`number`

###### dy

`number`

###### dirtyX

`number`

###### dirtyY

`number`

###### dirtyWidth

`number`

###### dirtyHeight

`number`

###### Returns

`void`

###### Inherited from

[`CanvasImageData`](#canvasimagedata).[`putImageData`](#putimagedata)

##### quadraticCurveTo()

> **quadraticCurveTo**(`cpx`, `cpy`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10379

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)

###### Parameters

###### cpx

`number`

###### cpy

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`quadraticCurveTo`](#quadraticcurveto)

##### rect()

> **rect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10381

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`rect`](#rect)

##### reset()

> **reset**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10470

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/reset)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`reset`](#reset-1)

##### resetTransform()

> **resetTransform**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10513

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/resetTransform)

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`resetTransform`](#resettransform-1)

##### restore()

> **restore**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10472

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/restore)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`restore`](#restore-1)

##### rotate()

> **rotate**(`angle`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10515

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)

###### Parameters

###### angle

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`rotate`](#rotate-1)

##### roundRect()

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10383

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| (`number` \| [`DOMPointInit`](#dompointinit))[]

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44554

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| [`Iterable`](#iterable)\<`number` \| [`DOMPointInit`](#dompointinit), `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

##### save()

> **save**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10474

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/save)

###### Returns

`void`

###### Inherited from

[`CanvasState`](#canvasstate).[`save`](#save-1)

##### scale()

> **scale**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10517

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/scale)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`scale`](#scale-1)

##### setLineDash()

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10400

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

`number`[]

###### Returns

`void`

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`setLineDash`](#setlinedash)

###### Call Signature

> **setLineDash**(`segments`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44559

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash)

###### Parameters

###### segments

[`Iterable`](#iterable)\<`number`\>

###### Returns

`void`

###### Inherited from

[`CanvasPathDrawingStyles`](#canvaspathdrawingstyles).[`setLineDash`](#setlinedash)

##### setTransform()

###### Call Signature

> **setTransform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10519

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setTransform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`setTransform`](#settransform-2)

###### Call Signature

> **setTransform**(`transform?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10520

###### Parameters

###### transform?

[`DOMMatrix2DInit`](#dommatrix2dinit)

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`setTransform`](#settransform-2)

##### stroke()

###### Call Signature

> **stroke**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10302

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/stroke)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`stroke`](#stroke)

###### Call Signature

> **stroke**(`path`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10303

###### Parameters

###### path

[`Path2D`](#path2d)

###### Returns

`void`

###### Inherited from

[`CanvasDrawPath`](#canvasdrawpath).[`stroke`](#stroke)

##### strokeRect()

> **strokeRect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10428

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasRect`](#canvasrect).[`strokeRect`](#strokerect)

##### strokeText()

> **strokeText**(`text`, `x`, `y`, `maxWidth?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10483

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/strokeText)

###### Parameters

###### text

`string`

###### x

`number`

###### y

`number`

###### maxWidth?

`number`

###### Returns

`void`

###### Inherited from

[`CanvasText`](#canvastext).[`strokeText`](#stroketext-1)

##### transform()

> **transform**(`a`, `b`, `c`, `d`, `e`, `f`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10522

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/transform)

###### Parameters

###### a

`number`

###### b

`number`

###### c

`number`

###### d

`number`

###### e

`number`

###### f

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`transform`](#transform-1)

##### translate()

> **translate**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10524

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/translate)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasTransform`](#canvastransform).[`translate`](#translate-1)

***

### Path2D

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:27118

The **`Path2D`** interface of the Canvas 2D API is used to declare a path that can then be used on a CanvasRenderingContext2D object. The path methods of the CanvasRenderingContext2D interface are also present on this interface, which gives you the convenience of being able to retain and replay your path whenever desired.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Path2D)

#### Extends

- [`CanvasPath`](#canvaspath)

#### Methods

##### addPath()

> **addPath**(`path`, `transform?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:27124

The **`Path2D.addPath()`** method of the Canvas 2D API adds one Path2D object to another Path2D object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Path2D/addPath)

###### Parameters

###### path

[`Path2D`](#path2d)

###### transform?

[`DOMMatrix2DInit`](#dommatrix2dinit)

###### Returns

`void`

##### arc()

> **arc**(`x`, `y`, `radius`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10365

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arc)

###### Parameters

###### x

`number`

###### y

`number`

###### radius

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arc`](#arc)

##### arcTo()

> **arcTo**(`x1`, `y1`, `x2`, `y2`, `radius`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10367

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/arcTo)

###### Parameters

###### x1

`number`

###### y1

`number`

###### x2

`number`

###### y2

`number`

###### radius

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`arcTo`](#arcto)

##### bezierCurveTo()

> **bezierCurveTo**(`cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10369

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo)

###### Parameters

###### cp1x

`number`

###### cp1y

`number`

###### cp2x

`number`

###### cp2y

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`bezierCurveTo`](#beziercurveto)

##### closePath()

> **closePath**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10371

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/closePath)

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`closePath`](#closepath)

##### ellipse()

> **ellipse**(`x`, `y`, `radiusX`, `radiusY`, `rotation`, `startAngle`, `endAngle`, `counterclockwise?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10373

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/ellipse)

###### Parameters

###### x

`number`

###### y

`number`

###### radiusX

`number`

###### radiusY

`number`

###### rotation

`number`

###### startAngle

`number`

###### endAngle

`number`

###### counterclockwise?

`boolean`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`ellipse`](#ellipse)

##### lineTo()

> **lineTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10375

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/lineTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`lineTo`](#lineto)

##### moveTo()

> **moveTo**(`x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10377

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo)

###### Parameters

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`moveTo`](#moveto)

##### quadraticCurveTo()

> **quadraticCurveTo**(`cpx`, `cpy`, `x`, `y`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10379

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)

###### Parameters

###### cpx

`number`

###### cpy

`number`

###### x

`number`

###### y

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`quadraticCurveTo`](#quadraticcurveto)

##### rect()

> **rect**(`x`, `y`, `w`, `h`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10381

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`rect`](#rect)

##### roundRect()

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10383

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| (`number` \| [`DOMPointInit`](#dompointinit))[]

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

###### Call Signature

> **roundRect**(`x`, `y`, `w`, `h`, `radii?`): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44554

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/roundRect)

###### Parameters

###### x

`number`

###### y

`number`

###### w

`number`

###### h

`number`

###### radii?

`number` \| [`DOMPointInit`](#dompointinit) \| [`Iterable`](#iterable)\<`number` \| [`DOMPointInit`](#dompointinit), `any`, `any`\>

###### Returns

`void`

###### Inherited from

[`CanvasPath`](#canvaspath).[`roundRect`](#roundrect)

***

### PlaneLayout

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1953

#### Properties

##### offset

> **offset**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1954

##### stride

> **stride**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:1955

***

### SetIterator

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:190

Describes an [Iterator](#iterator-2) produced by the runtime that inherits from the intrinsic `Iterator.prototype`.

#### Extends

- [`IteratorObject`](#iteratorobject)\<`T`, [`BuiltinIteratorReturn`](#builtiniteratorreturn), `unknown`\>

#### Type Parameters

##### T

`T`

#### Methods

##### \[iterator\]()

> **\[iterator\]**(): [`SetIterator`](#setiterator)\<`T`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:191

###### Returns

[`SetIterator`](#setiterator)\<`T`\>

###### Overrides

[`IteratorObject`](#iteratorobject).[`[iterator]`](#iterator-3)

##### next()

> **next**(...`__namedParameters`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:41

###### Parameters

###### \_\_namedParameters

\[\] \| \[`unknown`\]

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](#iteratorobject).[`next`](#next-1)

##### return()?

> `optional` **return**(`value?`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:42

###### Parameters

###### value?

`undefined`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](#iteratorobject).[`return`](#return-1)

##### throw()?

> `optional` **throw**(`e?`): [`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:43

###### Parameters

###### e?

`any`

###### Returns

[`IteratorResult`](#iteratorresult)\<`T`, `undefined`\>

###### Inherited from

[`IteratorObject`](#iteratorobject).[`throw`](#throw-1)

***

### TextMetrics

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36564

The **`TextMetrics`** interface represents the dimensions of a piece of text in the canvas; a TextMetrics instance can be retrieved using the CanvasRenderingContext2D.measureText() method.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics)

#### Properties

##### actualBoundingBoxAscent

> `readonly` **actualBoundingBoxAscent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36570

The read-only **`actualBoundingBoxAscent`** property of the TextMetrics interface is a double giving the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline attribute to the top of the bounding rectangle used to render the text, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/actualBoundingBoxAscent)

##### actualBoundingBoxDescent

> `readonly` **actualBoundingBoxDescent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36576

The read-only **`actualBoundingBoxDescent`** property of the TextMetrics interface is a double giving the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline attribute to the bottom of the bounding rectangle used to render the text, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/actualBoundingBoxDescent)

##### actualBoundingBoxLeft

> `readonly` **actualBoundingBoxLeft**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36582

The read-only **`actualBoundingBoxLeft`** property of the TextMetrics interface is a double giving the distance parallel to the baseline from the alignment point given by the CanvasRenderingContext2D.textAlign property to the left side of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going left from the given alignment point.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/actualBoundingBoxLeft)

##### actualBoundingBoxRight

> `readonly` **actualBoundingBoxRight**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36588

The read-only **`actualBoundingBoxRight`** property of the TextMetrics interface is a double giving the distance parallel to the baseline from the alignment point given by the CanvasRenderingContext2D.textAlign property to the right side of the bounding rectangle of the given text, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/actualBoundingBoxRight)

##### alphabeticBaseline

> `readonly` **alphabeticBaseline**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36594

The read-only **`alphabeticBaseline`** property of the TextMetrics interface is a double giving the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline property to the alphabetic baseline of the line box, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/alphabeticBaseline)

##### emHeightAscent

> `readonly` **emHeightAscent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36600

The read-only **`emHeightAscent`** property of the TextMetrics interface returns the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline property to the top of the em square in the line box, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/emHeightAscent)

##### emHeightDescent

> `readonly` **emHeightDescent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36606

The read-only **`emHeightDescent`** property of the TextMetrics interface returns the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline property to the bottom of the em square in the line box, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/emHeightDescent)

##### fontBoundingBoxAscent

> `readonly` **fontBoundingBoxAscent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36612

The read-only **`fontBoundingBoxAscent`** property of the TextMetrics interface returns the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline attribute, to the top of the highest bounding rectangle of all the fonts used to render the text, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/fontBoundingBoxAscent)

##### fontBoundingBoxDescent

> `readonly` **fontBoundingBoxDescent**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36618

The read-only **`fontBoundingBoxDescent`** property of the TextMetrics interface returns the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline attribute to the bottom of the bounding rectangle of all the fonts used to render the text, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/fontBoundingBoxDescent)

##### hangingBaseline

> `readonly` **hangingBaseline**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36624

The read-only **`hangingBaseline`** property of the TextMetrics interface is a double giving the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline property to the hanging baseline of the line box, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/hangingBaseline)

##### ideographicBaseline

> `readonly` **ideographicBaseline**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36630

The read-only **`ideographicBaseline`** property of the TextMetrics interface is a double giving the distance from the horizontal line indicated by the CanvasRenderingContext2D.textBaseline property to the ideographic baseline of the line box, in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/ideographicBaseline)

##### width

> `readonly` **width**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36636

The read-only **`width`** property of the TextMetrics interface contains the text's advance width (the width of that inline box) in CSS pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextMetrics/width)

***

### VideoColorSpace

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37784

The **`VideoColorSpace`** interface of the WebCodecs API represents the color space of a video.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace)

#### Properties

##### fullRange

> `readonly` **fullRange**: `boolean` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37790

The **`fullRange`** read-only property of the VideoColorSpace interface returns true if full-range color values are used.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace/fullRange)

##### matrix

> `readonly` **matrix**: [`VideoMatrixCoefficients`](#videomatrixcoefficients) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37796

The **`matrix`** read-only property of the VideoColorSpace interface returns the matrix coefficient of the video. Matrix coefficients describe the relationship between sample component values and color coordinates.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace/matrix)

##### primaries

> `readonly` **primaries**: [`VideoColorPrimaries`](#videocolorprimaries) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37802

The **`primaries`** read-only property of the VideoColorSpace interface returns the color gamut of the video.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace/primaries)

##### transfer

> `readonly` **transfer**: [`VideoTransferCharacteristics`](#videotransfercharacteristics) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37808

The **`transfer`** read-only property of the VideoColorSpace interface returns the opto-electronic transfer characteristics of the video.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace/transfer)

#### Methods

##### toJSON()

> **toJSON**(): [`VideoColorSpaceInit`](#videocolorspaceinit)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37814

The **`toJSON()`** method of the VideoColorSpace interface is a serializer that returns a JSON representation of the VideoColorSpace object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoColorSpace/toJSON)

###### Returns

[`VideoColorSpaceInit`](#videocolorspaceinit)

***

### VideoColorSpaceInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:2984

#### Properties

##### fullRange?

> `optional` **fullRange?**: `boolean` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:2985

##### matrix?

> `optional` **matrix?**: [`VideoMatrixCoefficients`](#videomatrixcoefficients) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:2986

##### primaries?

> `optional` **primaries?**: [`VideoColorPrimaries`](#videocolorprimaries) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:2987

##### transfer?

> `optional` **transfer?**: [`VideoTransferCharacteristics`](#videotransfercharacteristics) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:2988

***

### VideoFrame

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37971

The **`VideoFrame`** interface of the Web Codecs API represents a frame of a video.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame)

#### Properties

##### codedHeight

> `readonly` **codedHeight**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37977

The **`codedHeight`** property of the VideoFrame interface returns the height of the VideoFrame in pixels, potentially including non-visible padding, and prior to considering potential ratio adjustments.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/codedHeight)

##### codedRect

> `readonly` **codedRect**: [`DOMRectReadOnly`](#domrectreadonly) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37983

The **`codedRect`** property of the VideoFrame interface returns a DOMRectReadOnly with the width and height matching VideoFrame.codedWidth and VideoFrame.codedHeight.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/codedRect)

##### codedWidth

> `readonly` **codedWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37989

The **`codedWidth`** property of the VideoFrame interface returns the width of the VideoFrame in pixels, potentially including non-visible padding, and prior to considering potential ratio adjustments.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/codedWidth)

##### colorSpace

> `readonly` **colorSpace**: [`VideoColorSpace`](#videocolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37995

The **`colorSpace`** property of the VideoFrame interface returns a VideoColorSpace object representing the color space of the video.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/colorSpace)

##### displayHeight

> `readonly` **displayHeight**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38001

The **`displayHeight`** property of the VideoFrame interface returns the height of the VideoFrame after applying aspect ratio adjustments.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/displayHeight)

##### displayWidth

> `readonly` **displayWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38007

The **`displayWidth`** property of the VideoFrame interface returns the width of the VideoFrame after applying aspect ratio adjustments.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/displayWidth)

##### duration

> `readonly` **duration**: `number` \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38013

The **`duration`** property of the VideoFrame interface returns an integer indicating the duration of the video in microseconds.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/duration)

##### format

> `readonly` **format**: [`VideoPixelFormat`](#videopixelformat) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38019

The **`format`** property of the VideoFrame interface returns the pixel format of the VideoFrame.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/format)

##### timestamp

> `readonly` **timestamp**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38025

The **`timestamp`** property of the VideoFrame interface returns an integer indicating the timestamp of the video in microseconds.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/timestamp)

##### visibleRect

> `readonly` **visibleRect**: [`DOMRectReadOnly`](#domrectreadonly) \| `null`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38031

The **`visibleRect`** property of the VideoFrame interface returns a DOMRectReadOnly describing the visible rectangle of pixels for this VideoFrame.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/visibleRect)

#### Methods

##### allocationSize()

> **allocationSize**(`options?`): `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38037

The **`allocationSize()`** method of the VideoFrame interface returns the number of bytes required to hold the video as filtered by options passed into the method.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/allocationSize)

###### Parameters

###### options?

[`VideoFrameCopyToOptions`](#videoframecopytooptions)

###### Returns

`number`

##### clone()

> **clone**(): [`VideoFrame`](#videoframe)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38043

The **`clone()`** method of the VideoFrame interface creates a new VideoFrame object referencing the same media resource as the original.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/clone)

###### Returns

[`VideoFrame`](#videoframe)

##### close()

> **close**(): `void`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38049

The **`close()`** method of the VideoFrame interface clears all states and releases the reference to the media resource.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/close)

###### Returns

`void`

##### copyTo()

> **copyTo**(`destination`, `options?`): `Promise`\<[`PlaneLayout`](#planelayout)[]\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:38055

The **`copyTo()`** method of the VideoFrame interface copies the contents of the VideoFrame to an ArrayBuffer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/VideoFrame/copyTo)

###### Parameters

###### destination

[`AllowSharedBufferSource`](#allowsharedbuffersource)

###### options?

[`VideoFrameCopyToOptions`](#videoframecopytooptions)

###### Returns

`Promise`\<[`PlaneLayout`](#planelayout)[]\>

***

### VideoFrameBufferInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3062

#### Properties

##### codedHeight

> **codedHeight**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3063

##### codedWidth

> **codedWidth**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3064

##### colorSpace?

> `optional` **colorSpace?**: [`VideoColorSpaceInit`](#videocolorspaceinit)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3065

##### displayHeight?

> `optional` **displayHeight?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3066

##### displayWidth?

> `optional` **displayWidth?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3067

##### duration?

> `optional` **duration?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3068

##### format

> **format**: [`VideoPixelFormat`](#videopixelformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3069

##### layout?

> `optional` **layout?**: [`PlaneLayout`](#planelayout)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3070

##### timestamp

> **timestamp**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3071

##### visibleRect?

> `optional` **visibleRect?**: [`DOMRectInit`](#domrectinit)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3072

***

### VideoFrameCopyToOptions

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3088

#### Properties

##### colorSpace?

> `optional` **colorSpace?**: [`PredefinedColorSpace`](#predefinedcolorspace)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3089

##### format?

> `optional` **format?**: [`VideoPixelFormat`](#videopixelformat)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3090

##### layout?

> `optional` **layout?**: [`PlaneLayout`](#planelayout)[]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3091

##### rect?

> `optional` **rect?**: [`DOMRectInit`](#domrectinit)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3092

***

### VideoFrameInit

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3095

#### Properties

##### alpha?

> `optional` **alpha?**: [`AlphaOption`](#alphaoption)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3096

##### displayHeight?

> `optional` **displayHeight?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3097

##### displayWidth?

> `optional` **displayWidth?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3098

##### duration?

> `optional` **duration?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3099

##### timestamp?

> `optional` **timestamp?**: `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3100

##### visibleRect?

> `optional` **visibleRect?**: [`DOMRectInit`](#domrectinit)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3101

***

### WebGLTexture

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:40805

The **`WebGLTexture`** interface is part of the WebGL API and represents an opaque texture object providing storage and state for texturing operations.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/WebGLTexture)

## Type Aliases

### AllowSharedBufferSource

> **AllowSharedBufferSource** = [`ArrayBufferLike`](#arraybufferlike) \| [`ArrayBufferView`](#arraybufferview)\<[`ArrayBufferLike`](#arraybufferlike)\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44133

***

### AlphaOption

> **AlphaOption** = `"discard"` \| `"keep"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44242

***

### ArrayBufferLike

> **ArrayBufferLike** = `ArrayBufferTypes`\[keyof `ArrayBufferTypes`\]

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1718

***

### BuiltinIteratorReturn

> **BuiltinIteratorReturn** = `intrinsic`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:68

Defines the `TReturn` type used for built-in iterators produced by `Array`, `Map`, `Set`, and others.
This is `undefined` when `strictBuiltInIteratorReturn` is `true`; otherwise, this is `any`.

***

### CanvasDirection

> **CanvasDirection** = `"inherit"` \| `"ltr"` \| `"rtl"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44267

***

### CanvasFillRule

> **CanvasFillRule** = `"evenodd"` \| `"nonzero"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44268

***

### CanvasFontKerning

> **CanvasFontKerning** = `"auto"` \| `"none"` \| `"normal"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44269

***

### CanvasFontStretch

> **CanvasFontStretch** = `"condensed"` \| `"expanded"` \| `"extra-condensed"` \| `"extra-expanded"` \| `"normal"` \| `"semi-condensed"` \| `"semi-expanded"` \| `"ultra-condensed"` \| `"ultra-expanded"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44270

***

### CanvasFontVariantCaps

> **CanvasFontVariantCaps** = `"all-petite-caps"` \| `"all-small-caps"` \| `"normal"` \| `"petite-caps"` \| `"small-caps"` \| `"titling-caps"` \| `"unicase"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44271

***

### CanvasImageSource

> **CanvasImageSource** = [`HTMLOrSVGImageElement`](#htmlorsvgimageelement) \| [`HTMLVideoElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlvideoelement) \| [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| [`ImageBitmap`](#imagebitmap) \| [`OffscreenCanvas`](#offscreencanvas) \| [`VideoFrame`](#videoframe)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44147

***

### CanvasLineCap

> **CanvasLineCap** = `"butt"` \| `"round"` \| `"square"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44272

***

### CanvasLineJoin

> **CanvasLineJoin** = `"bevel"` \| `"miter"` \| `"round"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44273

***

### CanvasTextAlign

> **CanvasTextAlign** = `"center"` \| `"end"` \| `"left"` \| `"right"` \| `"start"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44274

***

### CanvasTextBaseline

> **CanvasTextBaseline** = `"alphabetic"` \| `"bottom"` \| `"hanging"` \| `"ideographic"` \| `"middle"` \| `"top"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44275

***

### CanvasTextRendering

> **CanvasTextRendering** = `"auto"` \| `"geometricPrecision"` \| `"optimizeLegibility"` \| `"optimizeSpeed"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44276

***

### EventListenerOrEventListenerObject

> **EventListenerOrEventListenerObject** = [`EventListener`](#eventlistener) \| [`EventListenerObject`](#eventlistenerobject)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44158

***

### GlobalCompositeOperation

> **GlobalCompositeOperation** = `"color"` \| `"color-burn"` \| `"color-dodge"` \| `"copy"` \| `"darken"` \| `"destination-atop"` \| `"destination-in"` \| `"destination-out"` \| `"destination-over"` \| `"difference"` \| `"exclusion"` \| `"hard-light"` \| `"hue"` \| `"lighten"` \| `"lighter"` \| `"luminosity"` \| `"multiply"` \| `"overlay"` \| `"saturation"` \| `"screen"` \| `"soft-light"` \| `"source-atop"` \| `"source-in"` \| `"source-out"` \| `"source-over"` \| `"xor"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44342

***

### GPUAddressMode

> **GPUAddressMode** = `"clamp-to-edge"` \| `"mirror-repeat"` \| `"repeat"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44305

***

### GPUBindingResource

> **GPUBindingResource** = [`GPUSampler`](#gpusampler) \| [`GPUTexture`](#gputexture) \| [`GPUTextureView`](#gputextureview) \| [`GPUBuffer`](#gpubuffer) \| [`GPUBufferBinding`](#gpubufferbinding) \| [`GPUExternalTexture`](#gpuexternaltexture)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44174

***

### GPUBlendFactor

> **GPUBlendFactor** = `"constant"` \| `"dst"` \| `"dst-alpha"` \| `"one"` \| `"one-minus-constant"` \| `"one-minus-dst"` \| `"one-minus-dst-alpha"` \| `"one-minus-src"` \| `"one-minus-src-alpha"` \| `"src"` \| `"src-alpha"` \| `"src-alpha-saturated"` \| `"zero"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44307

***

### GPUBlendOperation

> **GPUBlendOperation** = `"add"` \| `"max"` \| `"min"` \| `"reverse-subtract"` \| `"subtract"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44308

***

### GPUBufferBindingType

> **GPUBufferBindingType** = `"read-only-storage"` \| `"storage"` \| `"uniform"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44309

***

### GPUBufferMapState

> **GPUBufferMapState** = `"mapped"` \| `"pending"` \| `"unmapped"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44310

***

### GPUCanvasAlphaMode

> **GPUCanvasAlphaMode** = `"opaque"` \| `"premultiplied"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44311

***

### GPUCanvasToneMappingMode

> **GPUCanvasToneMappingMode** = `"extended"` \| `"standard"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44312

***

### GPUColor

> **GPUColor** = `number`[] \| [`GPUColorDict`](#gpucolordict)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44177

***

### GPUCompareFunction

> **GPUCompareFunction** = `"always"` \| `"equal"` \| `"greater"` \| `"greater-equal"` \| `"less"` \| `"less-equal"` \| `"never"` \| `"not-equal"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44313

***

### GPUCompilationMessageType

> **GPUCompilationMessageType** = `"error"` \| `"info"` \| `"warning"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44314

***

### GPUCopyExternalImageSource

> **GPUCopyExternalImageSource** = [`ImageBitmap`](#imagebitmap) \| [`ImageData`](#imagedata) \| [`HTMLImageElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlimageelement) \| [`HTMLVideoElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlvideoelement) \| [`VideoFrame`](#videoframe) \| [`HTMLCanvasElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlcanvaselement) \| [`OffscreenCanvas`](#offscreencanvas)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44179

***

### GPUCullMode

> **GPUCullMode** = `"back"` \| `"front"` \| `"none"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44315

***

### GPUDeviceLostReason

> **GPUDeviceLostReason** = `"destroyed"` \| `"unknown"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44316

***

### GPUErrorFilter

> **GPUErrorFilter** = `"internal"` \| `"out-of-memory"` \| `"validation"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44317

***

### GPUExtent3D

> **GPUExtent3D** = [`GPUIntegerCoordinate`](#gpuintegercoordinate)[] \| [`GPUExtent3DDict`](#gpuextent3ddict)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44181

***

### GPUFilterMode

> **GPUFilterMode** = `"linear"` \| `"nearest"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44319

***

### GPUFrontFace

> **GPUFrontFace** = `"ccw"` \| `"cw"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44320

***

### GPUIndexFormat

> **GPUIndexFormat** = `"uint16"` \| `"uint32"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44321

***

### GPUIntegerCoordinate

> **GPUIntegerCoordinate** = `number`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44184

***

### GPULoadOp

> **GPULoadOp** = `"clear"` \| `"load"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44322

***

### GPUMipmapFilterMode

> **GPUMipmapFilterMode** = `"linear"` \| `"nearest"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44323

***

### GPUOrigin2D

> **GPUOrigin2D** = [`GPUIntegerCoordinate`](#gpuintegercoordinate)[] \| [`GPUOrigin2DDict`](#gpuorigin2ddict)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44187

***

### GPUOrigin3D

> **GPUOrigin3D** = [`GPUIntegerCoordinate`](#gpuintegercoordinate)[] \| [`GPUOrigin3DDict`](#gpuorigin3ddict)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44188

***

### GPUPrimitiveTopology

> **GPUPrimitiveTopology** = `"line-list"` \| `"line-strip"` \| `"point-list"` \| `"triangle-list"` \| `"triangle-strip"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44326

***

### GPUQueryType

> **GPUQueryType** = `"occlusion"` \| `"timestamp"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44327

***

### GPUSamplerBindingType

> **GPUSamplerBindingType** = `"comparison"` \| `"filtering"` \| `"non-filtering"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44328

***

### GPUStencilOperation

> **GPUStencilOperation** = `"decrement-clamp"` \| `"decrement-wrap"` \| `"increment-clamp"` \| `"increment-wrap"` \| `"invert"` \| `"keep"` \| `"replace"` \| `"zero"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44329

***

### GPUStorageTextureAccess

> **GPUStorageTextureAccess** = `"read-only"` \| `"read-write"` \| `"write-only"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44330

***

### GPUStoreOp

> **GPUStoreOp** = `"discard"` \| `"store"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44331

***

### GPUTextureAspect

> **GPUTextureAspect** = `"all"` \| `"depth-only"` \| `"stencil-only"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44332

***

### GPUTextureDimension

> **GPUTextureDimension** = `"1d"` \| `"2d"` \| `"3d"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44333

***

### GPUTextureFormat

> **GPUTextureFormat** = `"astc-10x10-unorm"` \| `"astc-10x10-unorm-srgb"` \| `"astc-10x5-unorm"` \| `"astc-10x5-unorm-srgb"` \| `"astc-10x6-unorm"` \| `"astc-10x6-unorm-srgb"` \| `"astc-10x8-unorm"` \| `"astc-10x8-unorm-srgb"` \| `"astc-12x10-unorm"` \| `"astc-12x10-unorm-srgb"` \| `"astc-12x12-unorm"` \| `"astc-12x12-unorm-srgb"` \| `"astc-4x4-unorm"` \| `"astc-4x4-unorm-srgb"` \| `"astc-5x4-unorm"` \| `"astc-5x4-unorm-srgb"` \| `"astc-5x5-unorm"` \| `"astc-5x5-unorm-srgb"` \| `"astc-6x5-unorm"` \| `"astc-6x5-unorm-srgb"` \| `"astc-6x6-unorm"` \| `"astc-6x6-unorm-srgb"` \| `"astc-8x5-unorm"` \| `"astc-8x5-unorm-srgb"` \| `"astc-8x6-unorm"` \| `"astc-8x6-unorm-srgb"` \| `"astc-8x8-unorm"` \| `"astc-8x8-unorm-srgb"` \| `"bc1-rgba-unorm"` \| `"bc1-rgba-unorm-srgb"` \| `"bc2-rgba-unorm"` \| `"bc2-rgba-unorm-srgb"` \| `"bc3-rgba-unorm"` \| `"bc3-rgba-unorm-srgb"` \| `"bc4-r-snorm"` \| `"bc4-r-unorm"` \| `"bc5-rg-snorm"` \| `"bc5-rg-unorm"` \| `"bc6h-rgb-float"` \| `"bc6h-rgb-ufloat"` \| `"bc7-rgba-unorm"` \| `"bc7-rgba-unorm-srgb"` \| `"bgra8unorm"` \| `"bgra8unorm-srgb"` \| `"depth16unorm"` \| `"depth24plus"` \| `"depth24plus-stencil8"` \| `"depth32float"` \| `"depth32float-stencil8"` \| `"eac-r11snorm"` \| `"eac-r11unorm"` \| `"eac-rg11snorm"` \| `"eac-rg11unorm"` \| `"etc2-rgb8a1unorm"` \| `"etc2-rgb8a1unorm-srgb"` \| `"etc2-rgb8unorm"` \| `"etc2-rgb8unorm-srgb"` \| `"etc2-rgba8unorm"` \| `"etc2-rgba8unorm-srgb"` \| `"r16float"` \| `"r16sint"` \| `"r16snorm"` \| `"r16uint"` \| `"r16unorm"` \| `"r32float"` \| `"r32sint"` \| `"r32uint"` \| `"r8sint"` \| `"r8snorm"` \| `"r8uint"` \| `"r8unorm"` \| `"rg11b10ufloat"` \| `"rg16float"` \| `"rg16sint"` \| `"rg16snorm"` \| `"rg16uint"` \| `"rg16unorm"` \| `"rg32float"` \| `"rg32sint"` \| `"rg32uint"` \| `"rg8sint"` \| `"rg8snorm"` \| `"rg8uint"` \| `"rg8unorm"` \| `"rgb10a2uint"` \| `"rgb10a2unorm"` \| `"rgb9e5ufloat"` \| `"rgba16float"` \| `"rgba16sint"` \| `"rgba16snorm"` \| `"rgba16uint"` \| `"rgba16unorm"` \| `"rgba32float"` \| `"rgba32sint"` \| `"rgba32uint"` \| `"rgba8sint"` \| `"rgba8snorm"` \| `"rgba8uint"` \| `"rgba8unorm"` \| `"rgba8unorm-srgb"` \| `"stencil8"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44334

***

### GPUTextureSampleType

> **GPUTextureSampleType** = `"depth"` \| `"float"` \| `"sint"` \| `"uint"` \| `"unfilterable-float"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44335

***

### GPUTextureViewDimension

> **GPUTextureViewDimension** = `"1d"` \| `"2d"` \| `"2d-array"` \| `"3d"` \| `"cube"` \| `"cube-array"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44336

***

### GPUVertexFormat

> **GPUVertexFormat** = `"float16"` \| `"float16x2"` \| `"float16x4"` \| `"float32"` \| `"float32x2"` \| `"float32x3"` \| `"float32x4"` \| `"sint16"` \| `"sint16x2"` \| `"sint16x4"` \| `"sint32"` \| `"sint32x2"` \| `"sint32x3"` \| `"sint32x4"` \| `"sint8"` \| `"sint8x2"` \| `"sint8x4"` \| `"snorm16"` \| `"snorm16x2"` \| `"snorm16x4"` \| `"snorm8"` \| `"snorm8x2"` \| `"snorm8x4"` \| `"uint16"` \| `"uint16x2"` \| `"uint16x4"` \| `"uint32"` \| `"uint32x2"` \| `"uint32x3"` \| `"uint32x4"` \| `"uint8"` \| `"uint8x2"` \| `"uint8x4"` \| `"unorm10-10-10-2"` \| `"unorm16"` \| `"unorm16x2"` \| `"unorm16x4"` \| `"unorm8"` \| `"unorm8x2"` \| `"unorm8x4"` \| `"unorm8x4-bgra"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44337

***

### GPUVertexStepMode

> **GPUVertexStepMode** = `"instance"` \| `"vertex"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44338

***

### HTMLOrSVGImageElement

> **HTMLOrSVGImageElement** = [`HTMLImageElement`](@repo.palette-engine.colorSpaces.<internal>.md#htmlimageelement) \| [`SVGImageElement`](@repo.palette-engine.colorSpaces.<internal>.md#svgimageelement)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44199

***

### ImageDataArray

> **ImageDataArray** = `Uint8ClampedArray`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44206

***

### ImageDataPixelFormat

> **ImageDataPixelFormat** = `"rgba-float16"` \| `"rgba-unorm8"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44350

***

### ImageSmoothingQuality

> **ImageSmoothingQuality** = `"high"` \| `"low"` \| `"medium"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44352

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

### OffscreenRenderingContext

> **OffscreenRenderingContext** = [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d) \| [`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext) \| [`WebGLRenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webglrenderingcontext) \| [`WebGL2RenderingContext`](@repo.palette-engine.colorSpaces.<internal>.md#webgl2renderingcontext) \| [`GPUCanvasContext`](#gpucanvascontext)

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44213

***

### OffscreenRenderingContextId

> **OffscreenRenderingContextId** = `"2d"` \| `"bitmaprenderer"` \| `"webgl"` \| `"webgl2"` \| `"webgpu"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44383

***

### PredefinedColorSpace

> **PredefinedColorSpace** = `"display-p3"` \| `"srgb"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44396

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

### VideoColorPrimaries

> **VideoColorPrimaries** = `"bt470bg"` \| `"bt709"` \| `"smpte170m"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44464

***

### VideoMatrixCoefficients

> **VideoMatrixCoefficients** = `"bt470bg"` \| `"bt709"` \| `"rgb"` \| `"smpte170m"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44467

***

### VideoPixelFormat

> **VideoPixelFormat** = `"BGRA"` \| `"BGRX"` \| `"I420"` \| `"I420A"` \| `"I422"` \| `"I444"` \| `"NV12"` \| `"RGBA"` \| `"RGBX"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44468

***

### VideoTransferCharacteristics

> **VideoTransferCharacteristics** = `"bt709"` \| `"iec61966-2-1"` \| `"smpte170m"`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:44469

## Variables

### AbortSignal

> **AbortSignal**: \{(): [`AbortSignal`](#abortsignal); `prototype`: [`AbortSignal`](#abortsignal); `abort`: [`AbortSignal`](#abortsignal); `any`: [`AbortSignal`](#abortsignal); `timeout`: [`AbortSignal`](#abortsignal); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:3381

#### Type Declaration

#### Returns

[`AbortSignal`](#abortsignal)

##### prototype

> **prototype**: [`AbortSignal`](#abortsignal)

##### abort()

> **abort**(`reason?`): [`AbortSignal`](#abortsignal)

The **`AbortSignal.abort()`** static method returns an AbortSignal that is already set as aborted (and which does not trigger an abort event).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_static)

###### Parameters

###### reason?

`any`

###### Returns

[`AbortSignal`](#abortsignal)

##### any()

> **any**(`signals`): [`AbortSignal`](#abortsignal)

The **`AbortSignal.any()`** static method takes an iterable of abort signals and returns an AbortSignal. The returned abort signal is aborted when any of the input iterable abort signals are aborted. The abort reason will be set to the reason of the first signal that is aborted. If any of the given abort signals are already aborted then so will be the returned AbortSignal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static)

###### Parameters

###### signals

[`AbortSignal`](#abortsignal)[]

###### Returns

[`AbortSignal`](#abortsignal)

##### timeout()

> **timeout**(`milliseconds`): [`AbortSignal`](#abortsignal)

The **`AbortSignal.timeout()`** static method returns an AbortSignal that will automatically abort after a specified time.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static)

###### Parameters

###### milliseconds

`number`

###### Returns

[`AbortSignal`](#abortsignal)

***

### CanvasGradient

> **CanvasGradient**: \{(): [`CanvasGradient`](#canvasgradient); `prototype`: [`CanvasGradient`](#canvasgradient); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10331

#### Type Declaration

#### Returns

[`CanvasGradient`](#canvasgradient)

##### prototype

> **prototype**: [`CanvasGradient`](#canvasgradient)

***

### CanvasPattern

> **CanvasPattern**: \{(): [`CanvasPattern`](#canvaspattern); `prototype`: [`CanvasPattern`](#canvaspattern); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10408

#### Type Declaration

#### Returns

[`CanvasPattern`](#canvaspattern)

##### prototype

> **prototype**: [`CanvasPattern`](#canvaspattern)

***

### CanvasRenderingContext2D

> **CanvasRenderingContext2D**: \{(): [`CanvasRenderingContext2D`](#canvasrenderingcontext2d); `prototype`: [`CanvasRenderingContext2D`](#canvasrenderingcontext2d); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:10436

#### Type Declaration

#### Returns

[`CanvasRenderingContext2D`](#canvasrenderingcontext2d)

##### prototype

> **prototype**: [`CanvasRenderingContext2D`](#canvasrenderingcontext2d)

***

### DOMMatrix

> **DOMMatrix**: \{(`init?`): [`DOMMatrix`](#dommatrix); `prototype`: [`DOMMatrix`](#dommatrix); `fromFloat32Array`: [`DOMMatrix`](#dommatrix); `fromFloat64Array`: [`DOMMatrix`](#dommatrix); `fromMatrix`: [`DOMMatrix`](#dommatrix); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11435

#### Type Declaration

#### Parameters

##### init?

`string` \| `number`[]

#### Returns

[`DOMMatrix`](#dommatrix)

##### prototype

> **prototype**: [`DOMMatrix`](#dommatrix)

##### fromFloat32Array()

> **fromFloat32Array**(`array32`): [`DOMMatrix`](#dommatrix)

The **`fromFloat32Array()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an array of single-precision (32-bit) floating-point values.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromFloat32Array_static)

###### Parameters

###### array32

`Float32Array`\<`ArrayBuffer`\>

###### Returns

[`DOMMatrix`](#dommatrix)

##### fromFloat64Array()

> **fromFloat64Array**(`array64`): [`DOMMatrix`](#dommatrix)

The **`fromFloat64Array()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an array of double-precision (64-bit) floating-point values.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromFloat64Array_static)

###### Parameters

###### array64

`Float64Array`\<`ArrayBuffer`\>

###### Returns

[`DOMMatrix`](#dommatrix)

##### fromMatrix()

> **fromMatrix**(`other?`): [`DOMMatrix`](#dommatrix)

The **`fromMatrix()`** static method of the DOMMatrix interface creates a new DOMMatrix object given an existing matrix or an object which provides the values for its properties.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrix/fromMatrix_static)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrix`](#dommatrix)

***

### DOMMatrixReadOnly

> **DOMMatrixReadOnly**: \{(`init?`): [`DOMMatrixReadOnly`](#dommatrixreadonly); `prototype`: [`DOMMatrixReadOnly`](#dommatrixreadonly); `fromFloat32Array`: [`DOMMatrixReadOnly`](#dommatrixreadonly); `fromFloat64Array`: [`DOMMatrixReadOnly`](#dommatrixreadonly); `fromMatrix`: [`DOMMatrixReadOnly`](#dommatrixreadonly); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11588

#### Type Declaration

#### Parameters

##### init?

`string` \| `number`[]

#### Returns

[`DOMMatrixReadOnly`](#dommatrixreadonly)

##### prototype

> **prototype**: [`DOMMatrixReadOnly`](#dommatrixreadonly)

##### fromFloat32Array()

> **fromFloat32Array**(`array32`): [`DOMMatrixReadOnly`](#dommatrixreadonly)

The **`fromFloat32Array()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an array of single-precision (32-bit) floating-point values.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromFloat32Array_static)

###### Parameters

###### array32

`Float32Array`\<`ArrayBuffer`\>

###### Returns

[`DOMMatrixReadOnly`](#dommatrixreadonly)

##### fromFloat64Array()

> **fromFloat64Array**(`array64`): [`DOMMatrixReadOnly`](#dommatrixreadonly)

The **`fromFloat64Array()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an array of double-precision (64-bit) floating-point values.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromFloat64Array_static)

###### Parameters

###### array64

`Float64Array`\<`ArrayBuffer`\>

###### Returns

[`DOMMatrixReadOnly`](#dommatrixreadonly)

##### fromMatrix()

> **fromMatrix**(`other?`): [`DOMMatrixReadOnly`](#dommatrixreadonly)

The **`fromMatrix()`** static method of the DOMMatrixReadOnly interface creates a new DOMMatrixReadOnly object given an existing matrix or an object which provides the values for its properties.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/fromMatrix_static)

###### Parameters

###### other?

[`DOMMatrixInit`](#dommatrixinit)

###### Returns

[`DOMMatrixReadOnly`](#dommatrixreadonly)

***

### DOMPoint

> **DOMPoint**: \{(`x?`, `y?`, `z?`, `w?`): [`DOMPoint`](#dompoint); `prototype`: [`DOMPoint`](#dompoint); `fromPoint`: [`DOMPoint`](#dompoint); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11793

#### Type Declaration

#### Parameters

##### x?

`number`

##### y?

`number`

##### z?

`number`

##### w?

`number`

#### Returns

[`DOMPoint`](#dompoint)

##### prototype

> **prototype**: [`DOMPoint`](#dompoint)

##### fromPoint()

> **fromPoint**(`other?`): [`DOMPoint`](#dompoint)

The **`fromPoint()`** static method of the DOMPoint interface creates and returns a new mutable DOMPoint object given a source point.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPoint/fromPoint_static)

###### Parameters

###### other?

[`DOMPointInit`](#dompointinit)

###### Returns

[`DOMPoint`](#dompoint)

***

### DOMPointReadOnly

> **DOMPointReadOnly**: \{(`x?`, `y?`, `z?`, `w?`): [`DOMPointReadOnly`](#dompointreadonly); `prototype`: [`DOMPointReadOnly`](#dompointreadonly); `fromPoint`: [`DOMPointReadOnly`](#dompointreadonly); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:11839

#### Type Declaration

#### Parameters

##### x?

`number`

##### y?

`number`

##### z?

`number`

##### w?

`number`

#### Returns

[`DOMPointReadOnly`](#dompointreadonly)

##### prototype

> **prototype**: [`DOMPointReadOnly`](#dompointreadonly)

##### fromPoint()

> **fromPoint**(`other?`): [`DOMPointReadOnly`](#dompointreadonly)

The static DOMPointReadOnly method **`fromPoint()`** creates and returns a new DOMPointReadOnly object given a source point.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMPointReadOnly/fromPoint_static)

###### Parameters

###### other?

[`DOMPointInit`](#dompointinit)

###### Returns

[`DOMPointReadOnly`](#dompointreadonly)

***

### DOMRectReadOnly

> **DOMRectReadOnly**: \{(`x?`, `y?`, `width?`, `height?`): [`DOMRectReadOnly`](#domrectreadonly); `prototype`: [`DOMRectReadOnly`](#domrectreadonly); `fromRect`: [`DOMRectReadOnly`](#domrectreadonly); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:12027

#### Type Declaration

#### Parameters

##### x?

`number`

##### y?

`number`

##### width?

`number`

##### height?

`number`

#### Returns

[`DOMRectReadOnly`](#domrectreadonly)

##### prototype

> **prototype**: [`DOMRectReadOnly`](#domrectreadonly)

##### fromRect()

> **fromRect**(`other?`): [`DOMRectReadOnly`](#domrectreadonly)

The **`fromRect()`** static method of the DOMRectReadOnly object creates a new DOMRectReadOnly object with a given location and dimensions.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRectReadOnly/fromRect_static)

###### Parameters

###### other?

[`DOMRectInit`](#domrectinit)

###### Returns

[`DOMRectReadOnly`](#domrectreadonly)

***

### GPUAdapterInfo

> **GPUAdapterInfo**: \{(): [`GPUAdapterInfo`](#gpuadapterinfo); `prototype`: [`GPUAdapterInfo`](#gpuadapterinfo); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15193

#### Type Declaration

#### Returns

[`GPUAdapterInfo`](#gpuadapterinfo)

##### prototype

> **prototype**: [`GPUAdapterInfo`](#gpuadapterinfo)

***

### GPUBindGroup

> **GPUBindGroup**: \{(): [`GPUBindGroup`](#gpubindgroup); `prototype`: [`GPUBindGroup`](#gpubindgroup); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15249

#### Type Declaration

#### Returns

[`GPUBindGroup`](#gpubindgroup)

##### prototype

> **prototype**: [`GPUBindGroup`](#gpubindgroup)

***

### GPUBindGroupLayout

> **GPUBindGroupLayout**: \{(): [`GPUBindGroupLayout`](#gpubindgrouplayout); `prototype`: [`GPUBindGroupLayout`](#gpubindgrouplayout); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15263

#### Type Declaration

#### Returns

[`GPUBindGroupLayout`](#gpubindgrouplayout)

##### prototype

> **prototype**: [`GPUBindGroupLayout`](#gpubindgrouplayout)

***

### GPUBuffer

> **GPUBuffer**: \{(): [`GPUBuffer`](#gpubuffer); `prototype`: [`GPUBuffer`](#gpubuffer); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15283

#### Type Declaration

#### Returns

[`GPUBuffer`](#gpubuffer)

##### prototype

> **prototype**: [`GPUBuffer`](#gpubuffer)

***

### GPUCanvasContext

> **GPUCanvasContext**: \{(): [`GPUCanvasContext`](#gpucanvascontext); `prototype`: [`GPUCanvasContext`](#gpucanvascontext); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15339

#### Type Declaration

#### Returns

[`GPUCanvasContext`](#gpucanvascontext)

##### prototype

> **prototype**: [`GPUCanvasContext`](#gpucanvascontext)

***

### GPUCommandBuffer

> **GPUCommandBuffer**: \{(): [`GPUCommandBuffer`](#gpucommandbuffer); `prototype`: [`GPUCommandBuffer`](#gpucommandbuffer); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15383

#### Type Declaration

#### Returns

[`GPUCommandBuffer`](#gpucommandbuffer)

##### prototype

> **prototype**: [`GPUCommandBuffer`](#gpucommandbuffer)

***

### GPUCommandEncoder

> **GPUCommandEncoder**: \{(): [`GPUCommandEncoder`](#gpucommandencoder); `prototype`: [`GPUCommandEncoder`](#gpucommandencoder); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15397

#### Type Declaration

#### Returns

[`GPUCommandEncoder`](#gpucommandencoder)

##### prototype

> **prototype**: [`GPUCommandEncoder`](#gpucommandencoder)

***

### GPUCompilationInfo

> **GPUCompilationInfo**: \{(): [`GPUCompilationInfo`](#gpucompilationinfo); `prototype`: [`GPUCompilationInfo`](#gpucompilationinfo); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15466

#### Type Declaration

#### Returns

[`GPUCompilationInfo`](#gpucompilationinfo)

##### prototype

> **prototype**: [`GPUCompilationInfo`](#gpucompilationinfo)

***

### GPUCompilationMessage

> **GPUCompilationMessage**: \{(): [`GPUCompilationMessage`](#gpucompilationmessage); `prototype`: [`GPUCompilationMessage`](#gpucompilationmessage); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15486

#### Type Declaration

#### Returns

[`GPUCompilationMessage`](#gpucompilationmessage)

##### prototype

> **prototype**: [`GPUCompilationMessage`](#gpucompilationmessage)

***

### GPUComputePassEncoder

> **GPUComputePassEncoder**: \{(): [`GPUComputePassEncoder`](#gpucomputepassencoder); `prototype`: [`GPUComputePassEncoder`](#gpucomputepassencoder); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15536

#### Type Declaration

#### Returns

[`GPUComputePassEncoder`](#gpucomputepassencoder)

##### prototype

> **prototype**: [`GPUComputePassEncoder`](#gpucomputepassencoder)

***

### GPUComputePipeline

> **GPUComputePipeline**: \{(): [`GPUComputePipeline`](#gpucomputepipeline); `prototype`: [`GPUComputePipeline`](#gpucomputepipeline); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15574

#### Type Declaration

#### Returns

[`GPUComputePipeline`](#gpucomputepipeline)

##### prototype

> **prototype**: [`GPUComputePipeline`](#gpucomputepipeline)

***

### GPUDevice

> **GPUDevice**: \{(): [`GPUDevice`](#gpudevice); `prototype`: [`GPUDevice`](#gpudevice); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15601

#### Type Declaration

#### Returns

[`GPUDevice`](#gpudevice)

##### prototype

> **prototype**: [`GPUDevice`](#gpudevice)

***

### GPUDeviceLostInfo

> **GPUDeviceLostInfo**: \{(): [`GPUDeviceLostInfo`](#gpudevicelostinfo); `prototype`: [`GPUDeviceLostInfo`](#gpudevicelostinfo); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15759

#### Type Declaration

#### Returns

[`GPUDeviceLostInfo`](#gpudevicelostinfo)

##### prototype

> **prototype**: [`GPUDeviceLostInfo`](#gpudevicelostinfo)

***

### GPUError

> **GPUError**: \{(): [`GPUError`](#gpuerror); `prototype`: [`GPUError`](#gpuerror); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15785

#### Type Declaration

#### Returns

[`GPUError`](#gpuerror)

##### prototype

> **prototype**: [`GPUError`](#gpuerror)

***

### GPUExternalTexture

> **GPUExternalTexture**: \{(): [`GPUExternalTexture`](#gpuexternaltexture); `prototype`: [`GPUExternalTexture`](#gpuexternaltexture); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15805

#### Type Declaration

#### Returns

[`GPUExternalTexture`](#gpuexternaltexture)

##### prototype

> **prototype**: [`GPUExternalTexture`](#gpuexternaltexture)

***

### GPUPipelineLayout

> **GPUPipelineLayout**: \{(): [`GPUPipelineLayout`](#gpupipelinelayout); `prototype`: [`GPUPipelineLayout`](#gpupipelinelayout); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15877

#### Type Declaration

#### Returns

[`GPUPipelineLayout`](#gpupipelinelayout)

##### prototype

> **prototype**: [`GPUPipelineLayout`](#gpupipelinelayout)

***

### GPUQuerySet

> **GPUQuerySet**: \{(): [`GPUQuerySet`](#gpuqueryset); `prototype`: [`GPUQuerySet`](#gpuqueryset); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15891

#### Type Declaration

#### Returns

[`GPUQuerySet`](#gpuqueryset)

##### prototype

> **prototype**: [`GPUQuerySet`](#gpuqueryset)

***

### GPUQueue

> **GPUQueue**: \{(): [`GPUQueue`](#gpuqueue); `prototype`: [`GPUQueue`](#gpuqueue); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15923

#### Type Declaration

#### Returns

[`GPUQueue`](#gpuqueue)

##### prototype

> **prototype**: [`GPUQueue`](#gpuqueue)

***

### GPURenderBundle

> **GPURenderBundle**: \{(): [`GPURenderBundle`](#gpurenderbundle); `prototype`: [`GPURenderBundle`](#gpurenderbundle); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15967

#### Type Declaration

#### Returns

[`GPURenderBundle`](#gpurenderbundle)

##### prototype

> **prototype**: [`GPURenderBundle`](#gpurenderbundle)

***

### GPURenderBundleEncoder

> **GPURenderBundleEncoder**: \{(): [`GPURenderBundleEncoder`](#gpurenderbundleencoder); `prototype`: [`GPURenderBundleEncoder`](#gpurenderbundleencoder); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:15981

#### Type Declaration

#### Returns

[`GPURenderBundleEncoder`](#gpurenderbundleencoder)

##### prototype

> **prototype**: [`GPURenderBundleEncoder`](#gpurenderbundleencoder)

***

### GPURenderPassEncoder

> **GPURenderPassEncoder**: \{(): [`GPURenderPassEncoder`](#gpurenderpassencoder); `prototype`: [`GPURenderPassEncoder`](#gpurenderpassencoder); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16018

#### Type Declaration

#### Returns

[`GPURenderPassEncoder`](#gpurenderpassencoder)

##### prototype

> **prototype**: [`GPURenderPassEncoder`](#gpurenderpassencoder)

***

### GPURenderPipeline

> **GPURenderPipeline**: \{(): [`GPURenderPipeline`](#gpurenderpipeline); `prototype`: [`GPURenderPipeline`](#gpurenderpipeline); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16080

#### Type Declaration

#### Returns

[`GPURenderPipeline`](#gpurenderpipeline)

##### prototype

> **prototype**: [`GPURenderPipeline`](#gpurenderpipeline)

***

### GPUSampler

> **GPUSampler**: \{(): [`GPUSampler`](#gpusampler); `prototype`: [`GPUSampler`](#gpusampler); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16094

#### Type Declaration

#### Returns

[`GPUSampler`](#gpusampler)

##### prototype

> **prototype**: [`GPUSampler`](#gpusampler)

***

### GPUShaderModule

> **GPUShaderModule**: \{(): [`GPUShaderModule`](#gpushadermodule); `prototype`: [`GPUShaderModule`](#gpushadermodule); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16108

#### Type Declaration

#### Returns

[`GPUShaderModule`](#gpushadermodule)

##### prototype

> **prototype**: [`GPUShaderModule`](#gpushadermodule)

***

### GPUSupportedFeatures

> **GPUSupportedFeatures**: \{(): [`GPUSupportedFeatures`](#gpusupportedfeatures); `prototype`: [`GPUSupportedFeatures`](#gpusupportedfeatures); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16128

#### Type Declaration

#### Returns

[`GPUSupportedFeatures`](#gpusupportedfeatures)

##### prototype

> **prototype**: [`GPUSupportedFeatures`](#gpusupportedfeatures)

***

### GPUSupportedLimits

> **GPUSupportedLimits**: \{(): [`GPUSupportedLimits`](#gpusupportedlimits); `prototype`: [`GPUSupportedLimits`](#gpusupportedlimits); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16143

#### Type Declaration

#### Returns

[`GPUSupportedLimits`](#gpusupportedlimits)

##### prototype

> **prototype**: [`GPUSupportedLimits`](#gpusupportedlimits)

***

### GPUTexture

> **GPUTexture**: \{(): [`GPUTexture`](#gputexture); `prototype`: [`GPUTexture`](#gputexture); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16219

#### Type Declaration

#### Returns

[`GPUTexture`](#gputexture)

##### prototype

> **prototype**: [`GPUTexture`](#gputexture)

***

### GPUTextureView

> **GPUTextureView**: \{(): [`GPUTextureView`](#gputextureview); `prototype`: [`GPUTextureView`](#gputextureview); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16293

#### Type Declaration

#### Returns

[`GPUTextureView`](#gputextureview)

##### prototype

> **prototype**: [`GPUTextureView`](#gputextureview)

***

### GPUUncapturedErrorEvent

> **GPUUncapturedErrorEvent**: \{(`type`, `gpuUncapturedErrorEventInitDict`): [`GPUUncapturedErrorEvent`](#gpuuncapturederrorevent); `prototype`: [`GPUUncapturedErrorEvent`](#gpuuncapturederrorevent); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:16307

#### Type Declaration

#### Parameters

##### type

`string`

##### gpuUncapturedErrorEventInitDict

[`GPUUncapturedErrorEventInit`](#gpuuncapturederroreventinit)

#### Returns

[`GPUUncapturedErrorEvent`](#gpuuncapturederrorevent)

##### prototype

> **prototype**: [`GPUUncapturedErrorEvent`](#gpuuncapturederrorevent)

***

### ImageBitmap

> **ImageBitmap**: \{(): [`ImageBitmap`](#imagebitmap); `prototype`: [`ImageBitmap`](#imagebitmap); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22684

#### Type Declaration

#### Returns

[`ImageBitmap`](#imagebitmap)

##### prototype

> **prototype**: [`ImageBitmap`](#imagebitmap)

***

### ImageBitmapRenderingContext

> **ImageBitmapRenderingContext**: \{(): [`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext); `prototype`: [`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22715

#### Type Declaration

#### Returns

[`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext)

##### prototype

> **prototype**: [`ImageBitmapRenderingContext`](#imagebitmaprenderingcontext)

***

### ImageData

> **ImageData**: \{(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata); (`data`, `sw`, `sh?`, `settings?`): [`ImageData`](#imagedata); `prototype`: [`ImageData`](#imagedata); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:22784

#### Type Declaration

#### Call Signature

> **new ImageData**(`sw`, `sh`, `settings?`): [`ImageData`](#imagedata)

##### Parameters

###### sw

`number`

###### sh

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

##### Returns

[`ImageData`](#imagedata)

#### Call Signature

> **new ImageData**(`data`, `sw`, `sh?`, `settings?`): [`ImageData`](#imagedata)

##### Parameters

###### data

[`ImageDataArray`](#imagedataarray)

###### sw

`number`

###### sh?

`number`

###### settings?

[`ImageDataSettings`](#imagedatasettings)

##### Returns

[`ImageData`](#imagedata)

##### prototype

> **prototype**: [`ImageData`](#imagedata)

***

### OffscreenCanvas

> **OffscreenCanvas**: \{(`width`, `height`): [`OffscreenCanvas`](#offscreencanvas); `prototype`: [`OffscreenCanvas`](#offscreencanvas); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26738

#### Type Declaration

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

[`OffscreenCanvas`](#offscreencanvas)

##### prototype

> **prototype**: [`OffscreenCanvas`](#offscreencanvas)

***

### OffscreenCanvasRenderingContext2D

> **OffscreenCanvasRenderingContext2D**: \{(): [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d); `prototype`: [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:26793

#### Type Declaration

#### Returns

[`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

##### prototype

> **prototype**: [`OffscreenCanvasRenderingContext2D`](#offscreencanvasrenderingcontext2d)

***

### Path2D

> **Path2D**: \{(`path?`): [`Path2D`](#path2d); `prototype`: [`Path2D`](#path2d); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:27118

#### Type Declaration

#### Parameters

##### path?

`string` \| [`Path2D`](#path2d)

#### Returns

[`Path2D`](#path2d)

##### prototype

> **prototype**: [`Path2D`](#path2d)

***

### TextMetrics

> **TextMetrics**: \{(): [`TextMetrics`](#textmetrics); `prototype`: [`TextMetrics`](#textmetrics); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:36564

#### Type Declaration

#### Returns

[`TextMetrics`](#textmetrics)

##### prototype

> **prototype**: [`TextMetrics`](#textmetrics)

***

### VideoColorSpace

> **VideoColorSpace**: \{(`init?`): [`VideoColorSpace`](#videocolorspace); `prototype`: [`VideoColorSpace`](#videocolorspace); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37784

#### Type Declaration

#### Parameters

##### init?

[`VideoColorSpaceInit`](#videocolorspaceinit)

#### Returns

[`VideoColorSpace`](#videocolorspace)

##### prototype

> **prototype**: [`VideoColorSpace`](#videocolorspace)

***

### VideoFrame

> **VideoFrame**: \{(`image`, `init?`): [`VideoFrame`](#videoframe); (`data`, `init`): [`VideoFrame`](#videoframe); `prototype`: [`VideoFrame`](#videoframe); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:37971

#### Type Declaration

#### Call Signature

> **new VideoFrame**(`image`, `init?`): [`VideoFrame`](#videoframe)

##### Parameters

###### image

[`CanvasImageSource`](#canvasimagesource)

###### init?

[`VideoFrameInit`](#videoframeinit)

##### Returns

[`VideoFrame`](#videoframe)

#### Call Signature

> **new VideoFrame**(`data`, `init`): [`VideoFrame`](#videoframe)

##### Parameters

###### data

[`AllowSharedBufferSource`](#allowsharedbuffersource)

###### init

[`VideoFrameBufferInit`](#videoframebufferinit)

##### Returns

[`VideoFrame`](#videoframe)

##### prototype

> **prototype**: [`VideoFrame`](#videoframe)

***

### WebGLTexture

> **WebGLTexture**: \{(): [`WebGLTexture`](#webgltexture); `prototype`: [`WebGLTexture`](#webgltexture); \}

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.dom.d.ts:40805

#### Type Declaration

#### Returns

[`WebGLTexture`](#webgltexture)

##### prototype

> **prototype**: [`WebGLTexture`](#webgltexture)
