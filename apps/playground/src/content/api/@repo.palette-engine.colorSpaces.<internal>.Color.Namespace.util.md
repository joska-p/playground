---
title: colorSpaces/<internal>/Color/Namespace/util
package: "@repo/palette-engine"
kind: module
module: colorSpaces/<internal>/Color/Namespace/util
---

## Functions

### bisectLeft()

> **bisectLeft**(`arr`, `value`, `lo?`, `hi?`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:91

Perform a bisect on a sorted list and locate the insertion point for
a value in arr to maintain sorted order.

#### Parameters

##### arr

`number`[]

array of sorted numbers

##### value

`number`

value to find insertion point for

##### lo?

`number`

used to specify a the low end of a subset of the list

##### hi?

`number`

used to specify a the high end of a subset of the list

#### Returns

`number`

***

### clamp()

> **clamp**(`min`, `val`, `max`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:64

Clamp value between the minimum and maximum

#### Parameters

##### min

`number`

minimum value to return

##### val

`number`

the value to return if it is between min and max

##### max

`number`

maximum value to return

#### Returns

`number`

***

### copySign()

> **copySign**(`to`, `from`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:70

Copy sign of one value to another.

#### Parameters

##### to

`number`

Number to copy sign to

##### from

`number`

Number to copy sign from

#### Returns

`number`

***

### interpolate()

> **interpolate**(`start`, `end`, `p`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:45

#### Parameters

##### start

`number`

##### end

`number`

##### p

`number`

#### Returns

`number`

***

### interpolateInv()

> **interpolateInv**(`start`, `end`, `value`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:51

#### Parameters

##### start

`number`

##### end

`number`

##### value

`number`

#### Returns

`number`

***

### isInstance()

> **isInstance**\<`C`\>(`arg`, `constructor`): `arg is InstanceType<C>`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:101

Determines whether an argument is an instance of a constructor, including subclasses.
This is done by first just checking `instanceof`,
and then comparing the string names of the constructors if that fails.

#### Type Parameters

##### C

`C` *extends* (...`args`) => `any`

#### Parameters

##### arg

`any`

##### constructor

`C`

#### Returns

`arg is InstanceType<C>`

***

### isNone()

> **isNone**(`n`): `n is null`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:27

Check if a value corresponds to a none argument

#### Parameters

##### n

`any`

Value to check

#### Returns

`n is null`

***

### isString()

> **isString**(`str`): `str is string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:6

Check if a value is a string (including a String object)

#### Parameters

##### str

`any`

Value to check

#### Returns

`str is string`

***

### mapRange()

> **mapRange**(`from`, `to`, `value`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:57

#### Parameters

##### from

\[`number`, `number`\]

##### to

\[`number`, `number`\]

##### value

`number`

#### Returns

`number`

***

### multiply\_v3\_m3x3()

> **multiply\_v3\_m3x3**(`input`, `matrix`, `out?`): [`Vector3`](@repo.palette-engine.colorSpaces.<internal>.md#vector3)

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/multiply-matrices.d.ts:146

Transforms a vector of length 3 by a 3x3 matrix. Specify the same input and output
vector to transform in place.

#### Parameters

##### input

[`Vector3`](@repo.palette-engine.colorSpaces.<internal>.md#vector3)

##### matrix

[`Matrix3x3`](@repo.palette-engine.colorSpaces.<internal>.md#matrix3x3)

##### out?

[`Vector3`](@repo.palette-engine.colorSpaces.<internal>.md#vector3)

#### Returns

[`Vector3`](@repo.palette-engine.colorSpaces.<internal>.md#vector3)

***

### multiplyMatrices()

#### Call Signature

> **multiplyMatrices**(`A`, `B`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/multiply-matrices.d.ts:34

A is m x n. B is n x p. product is m x p.

Array arguments are treated like vectors:
- A becomes 1 x n
- B becomes n x 1

Returns Matrix m x p or equivalent array or number

##### Parameters

###### A

`number`[]

Vector 1 x n

###### B

`number`[]

Vector n x 1

##### Returns

`number`

Scalar number

#### Call Signature

> **multiplyMatrices**(`A`, `B`): `number`[]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/multiply-matrices.d.ts:68

A is m x n. B is n x p. product is m x p.

Array arguments are treated like vectors:
- A becomes 1 x n
- B becomes n x 1

Returns Matrix m x p or equivalent array or number

##### Parameters

###### A

`number`[][]

Vector 1 x n

###### B

`number`[]

Vector n x 1

##### Returns

`number`[]

Scalar number

#### Call Signature

> **multiplyMatrices**(`A`, `B`): `number`[]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/multiply-matrices.d.ts:102

A is m x n. B is n x p. product is m x p.

Array arguments are treated like vectors:
- A becomes 1 x n
- B becomes n x 1

Returns Matrix m x p or equivalent array or number

##### Parameters

###### A

`number`[]

Vector 1 x n

###### B

`number`[][]

Vector n x 1

##### Returns

`number`[]

Scalar number

#### Call Signature

> **multiplyMatrices**(`A`, `B`): `number`[][]

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/multiply-matrices.d.ts:136

A is m x n. B is n x p. product is m x p.

Array arguments are treated like vectors:
- A becomes 1 x n
- B becomes n x 1

Returns Matrix m x p or equivalent array or number

##### Parameters

###### A

`number`[][]

Vector 1 x n

###### B

`number`[][]

Vector n x 1

##### Returns

`number`[][]

Scalar number

***

### serializeNumber()

> **serializeNumber**(`n`, `options`): `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:18

#### Parameters

##### n

`number`

##### options

###### precision?

`number`

###### unit?

`string`

#### Returns

`string`

***

### skipNone()

> **skipNone**(`n`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:33

Replace none values with 0

#### Parameters

##### n

`number` \| `null`

#### Returns

`number`

***

### spow()

> **spow**(`base`, `exp`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:76

Perform pow on a signed number and copy sign to result

#### Parameters

##### base

`number`

The base number

##### exp

`number`

The exponent

#### Returns

`number`

***

### toPrecision()

> **toPrecision**(`n`, `precision`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:39

Round a number to a certain number of significant digits

#### Parameters

##### n

`number`

The number to round

##### precision

`number`

Number of significant digits

#### Returns

`number`

***

### type()

> **type**(`o`): `string`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:12

Determine the internal JavaScript [[Class]] of an object.

#### Parameters

##### o

`any`

Value to check

#### Returns

`string`

***

### zdiv()

> **zdiv**(`n`, `d`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/util.d.ts:82

Perform a divide, but return zero if the denominator is zero

#### Parameters

##### n

`number`

The numerator

##### d

`number`

The denominator

#### Returns

`number`
