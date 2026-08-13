---
title: react/interactions (internal)
package: "@repo/glaze"
kind: internal
module: react/interactions
---

## Type Aliases

### Exclude

> **Exclude**\<`T`, `U`\> = `T` *extends* `U` ? `never` : `T`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1618

Exclude from T those types that are assignable to U

#### Type Parameters

##### T

`T`

##### U

`U`

***

### Omit

> **Omit**\<`T`, `K`\> = [`Pick`](#pick)\<`T`, [`Exclude`](#exclude)\<keyof `T`, `K`\>\>

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1628

Construct a type with the properties of T except for those in type K.

#### Type Parameters

##### T

`T`

##### K

`K` *extends* keyof `any`

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
