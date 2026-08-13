---
title: colorSpaces/<internal>/Namespace/Color
package: "@repo/palette-engine"
kind: module
module: colorSpaces/<internal>/Namespace/Color
---

## Namespaces

- [defaults](@repo.palette-engine.colorSpaces.<internal>.Color.Namespace.defaults.md)
- [util](@repo.palette-engine.colorSpaces.<internal>.Color.Namespace.util.md)

## Classes

### Space

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:88

Class for color spaces. Each color space corresponds to a `ColorSpace` instance

#### Constructors

##### Constructor

> **new Space**(`options`): [`Space`](#space)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:89

###### Parameters

###### options

[`SpaceOptions`](@repo.palette-engine.colorSpaces.<internal>.md#spaceoptions)

###### Returns

[`Space`](#space)

#### Properties

##### aliases?

> `optional` **aliases?**: `string`[]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:129

##### base

> **base**: [`Space`](#space) \| `null`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:130

##### coords

> **coords**: [`Record`](@repo.palette-engine.colorSpaces.<internal>.md#record)\<`string`, [`CoordMeta`](@repo.palette-engine.colorSpaces.<internal>.md#coordmeta-1)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:131

##### DEFAULT\_FORMAT

> `static` **DEFAULT\_FORMAT**: `object`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:91

###### name

> **name**: `"color"`

###### type

> **type**: `"functions"`

##### formats

> **formats**: [`Record`](@repo.palette-engine.colorSpaces.<internal>.md#record)\<`string`, [`Format`](@repo.palette-engine.colorSpaces.<internal>.md#format-3)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:134

##### fromBase?

> `optional` **fromBase?**: (`coords`) => [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:132

###### Parameters

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

##### gamutSpace

> **gamutSpace**: [`Space`](#space)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:137

##### id

> **id**: `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:128

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:127

##### referred?

> `optional` **referred?**: `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:135

##### registry

> `static` **registry**: [`Record`](@repo.palette-engine.colorSpaces.<internal>.md#record)\<`string`, [`Space`](#space)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:116

##### toBase?

> `optional` **toBase?**: (`coords`) => [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:133

###### Parameters

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

##### white

> **white**: [`White`](@repo.palette-engine.colorSpaces.<internal>.md#white-2)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:136

#### Accessors

##### all

###### Get Signature

> **get** `static` **all**(): [`Space`](#space)[]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:118

###### Returns

[`Space`](#space)[]

##### cssId

###### Get Signature

> **get** **cssId**(): `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:123

The ID used by CSS, such as `display-p3` or `--cam16-jmh`

###### Returns

`string`

##### isPolar

###### Get Signature

> **get** **isPolar**(): `boolean`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:124

###### Returns

`boolean`

##### isUnbounded

###### Get Signature

> **get** **isUnbounded**(): `boolean`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:125

###### Returns

`boolean`

#### Methods

##### equals()

> **equals**(`space`): `boolean`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:153

###### Parameters

###### space

`string` \| [`Space`](#space)

###### Returns

`boolean`

##### findFormat()

> `static` **findFormat**(`filters`, `spaces?`): [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default) \| `null`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:120

###### Parameters

###### filters

`string` \| `object`

###### spaces?

[`Space`](#space)[]

###### Returns

[`default`](@repo.palette-engine.colorSpaces.<internal>.md#default) \| `null`

##### from()

###### Call Signature

> **from**(`color`): [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:139

###### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Call Signature

> **from**(`space`, `coords`): [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:140

###### Parameters

###### space

`string` \| [`Space`](#space)

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

##### get()

> `static` **get**(`space`, ...`alternatives`): [`Space`](#space)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:96

###### Parameters

###### space

`string` \| [`Space`](#space)

###### alternatives

...(`string` \| [`Space`](#space))[]

###### Returns

[`Space`](#space)

###### Throws

If no matching color space is found

##### getFormat()

> **getFormat**(`format?`): [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default) \| `null`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:142

###### Parameters

###### format?

`string` \| [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default) \| [`Format`](@repo.palette-engine.colorSpaces.<internal>.md#format-3)

###### Returns

[`default`](@repo.palette-engine.colorSpaces.<internal>.md#default) \| `null`

##### getMinCoords()

> **getMinCoords**(): [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:144

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

##### inGamut()

> **inGamut**(`coords`, `options?`): `boolean`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:146

###### Parameters

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### options?

###### epsilon?

`number`

###### Returns

`boolean`

##### register()

###### Call Signature

> `static` **register**(`space`): [`Space`](#space)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:113

###### Parameters

###### space

[`Space`](#space)

###### Returns

[`Space`](#space)

###### Throws

If a space with the provided id already exists

###### Call Signature

> `static` **register**(`id`, `space`): [`Space`](#space)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:114

###### Parameters

###### id

`string`

###### space

[`Space`](#space)

###### Returns

[`Space`](#space)

###### Throws

If a space with the provided id already exists

##### resolveCoord()

> `static` **resolveCoord**(`ref`, `workingSpace?`): [`CoordMeta`](@repo.palette-engine.colorSpaces.<internal>.md#coordmeta-1) & `object`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:101

###### Parameters

###### ref

[`Ref`](@repo.palette-engine.colorSpaces.<internal>.md#ref)

###### workingSpace?

`string` \| [`Space`](#space)

###### Returns

[`CoordMeta`](@repo.palette-engine.colorSpaces.<internal>.md#coordmeta-1) & `object`

###### Throws

If no space or an unknown space is provided

##### to()

###### Call Signature

> **to**(`color`): [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:148

###### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Call Signature

> **to**(`space`, `coords`): [`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:149

###### Parameters

###### space

`string` \| [`Space`](#space)

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### Returns

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

##### toString()

> **toString**(): `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/ColorSpace.d.ts:151

###### Returns

`string`

## Variables

### distance

> `const` **distance**: [`ToColorNamespace`](@repo.palette-engine.colorSpaces.<internal>.md#tocolornamespace)\<*typeof* [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default-15)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:111

***

### equals

> `const` **equals**: [`ToColorNamespace`](@repo.palette-engine.colorSpaces.<internal>.md#tocolornamespace)\<*typeof* [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default-9)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:109

***

### getAll

> `const` **getAll**: [`ToColorNamespace`](@repo.palette-engine.colorSpaces.<internal>.md#tocolornamespace)\<*typeof* [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default-4)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:107

***

### hooks

> `const` **hooks**: [`Hooks`](@repo.palette-engine.colorSpaces.<internal>.md#hooks)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/hooks.d.ts:50

***

### inGamut

> `const` **inGamut**: [`ToColorNamespace`](@repo.palette-engine.colorSpaces.<internal>.md#tocolornamespace)\<*typeof* [`default`](@repo.palette-engine.colorSpaces.<internal>.md#default-12)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:110

***

### spaces

> `const` **spaces**: *typeof* [`Space`](#space)\[`"registry"`\]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:116

***

### to

> `const` **to**: [`ToColorNamespace`](@repo.palette-engine.colorSpaces.<internal>.md#tocolornamespace)\<*typeof* [`to`](@repo.palette-engine.colorSpaces.<internal>.md#to-5)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:108

***

### WHITES

> `const` **WHITES**: [`Record`](@repo.palette-engine.colorSpaces.<internal>.md#record)\<`string`, [`White`](@repo.palette-engine.colorSpaces.<internal>.md#white-1)\>

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/adapt.d.ts:20

## Functions

### parse()

> **parse**(`str`, `options?`): [`ColorConstructor`](@repo.palette-engine.colorSpaces.<internal>.md#colorconstructor-1)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/parse.d.ts:11

Convert a CSS Color string to a color object

#### Parameters

##### str

`string`

##### options?

[`ParseOptions`](@repo.palette-engine.colorSpaces.<internal>.md#parseoptions)

#### Returns

[`ColorConstructor`](@repo.palette-engine.colorSpaces.<internal>.md#colorconstructor-1)

***

### set()

#### Call Signature

> **set**(`color`, `prop`, `value`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:121

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### prop

[`Ref`](@repo.palette-engine.colorSpaces.<internal>.md#ref)

###### value

`number` \| ((`coord`) => `number`)

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

#### Call Signature

> **set**(`color`, `props`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:127

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### props

[`Record`](@repo.palette-engine.colorSpaces.<internal>.md#record)\<`string`, `number` \| ((`coord`) => `number`)\>

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

***

### setAll()

#### Call Signature

> **setAll**(`color`, `coords`, `alpha?`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:132

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### alpha?

`number`

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

#### Call Signature

> **setAll**(`color`, `space`, `coords`, `alpha?`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:134

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### space

`string` \| [`Space`](#space)

###### coords

[`Coords`](@repo.palette-engine.colorSpaces.<internal>.md#coords-10)

###### alpha?

`number`

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

***

### toGamut()

#### Call Signature

> **toGamut**(`color`, `options?`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:141

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### options?

[`ToGamutOptions`](@repo.palette-engine.colorSpaces.<internal>.md#togamutoptions)

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

#### Call Signature

> **toGamut**(`color`, `space?`): [`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/color.d.ts:143

##### Parameters

###### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

###### space?

`string`

##### Returns

[`Color`](@repo.palette-engine.colorSpaces.<internal>.md#color)
