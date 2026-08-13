---
title: rules/recaman
package: "@repo/sequence-engine"
kind: module
module: rules/recaman
---

## Variables

### recamanRule

> `const` **recamanRule**: `object`

Defined in: [rules/recaman.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/recaman.ts#L4)

Recamán's sequence rule: jump backward by n if positive and unseen, else jump forward.

#### Type Declaration

##### description

> `readonly` **description**: `"Jump back by 'n' if possible, otherwise jump forward."` = `"Jump back by 'n' if possible, otherwise jump forward."`

##### getNext

> `readonly` **getNext**: (`__namedParameters`) => `number`

###### Parameters

###### \_\_namedParameters

[`NextStepOptions`](@repo.sequence-engine.rules.types.md#nextstepoptions)

###### Returns

`number`

##### id

> `readonly` **id**: `"recaman"` = `'recaman'`

##### maxSteps

> `readonly` **maxSteps**: `1000` = `1000`

##### name

> `readonly` **name**: `"Recaman's Rule"` = `"Recaman's Rule"`
