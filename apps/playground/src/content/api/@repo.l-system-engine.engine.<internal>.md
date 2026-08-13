---
title: engine (internal)
package: "@repo/l-system-engine"
kind: internal
module: engine
---

## Interfaces

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

## Type Aliases

### IteratorResult

> **IteratorResult**\<`T`, `TReturn`\> = [`IteratorYieldResult`](#iteratoryieldresult)\<`T`\> \| [`IteratorReturnResult`](#iteratorreturnresult)\<`TReturn`\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:37

#### Type Parameters

##### T

`T`

##### TReturn

`TReturn` = `any`

***

### Readonly

> **Readonly**\<`T`\> = `{ readonly [P in keyof T]: T[P] }`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1597

Make all properties in T readonly

#### Type Parameters

##### T

`T`

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
