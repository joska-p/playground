---
title: gpu/createSimulationEngine
package: "@repo/automa-engine"
kind: module
module: gpu/createSimulationEngine
---

## Modules

- [\<internal\>](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md)

## Type Aliases

### SimulationEngine

> **SimulationEngine** = [`ReturnType`](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md#returntype)\<*typeof* [`createSimulationEngine`](#createsimulationengine)\>

Defined in: [packages/automa-engine/src/gpu/createSimulationEngine.ts:4](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/gpu/createSimulationEngine.ts#L4)

## Functions

### createSimulationEngine()

> **createSimulationEngine**(`gl`, `width`, `height`, `simShaderSource`, `paintShaderSource`): `object`

Defined in: [packages/automa-engine/src/gpu/createSimulationEngine.ts:6](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa-engine/src/gpu/createSimulationEngine.ts#L6)

#### Parameters

##### gl

[`WebGL2RenderingContext`](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md#webgl2renderingcontext)

##### width

`number`

##### height

`number`

##### simShaderSource

`string`

##### paintShaderSource

`string`

#### Returns

`object`

##### height

###### Get Signature

> **get** **height**(): `number`

###### Returns

`number`

##### width

###### Get Signature

> **get** **width**(): `number`

###### Returns

`number`

##### destroy()

> **destroy**(): `void`

###### Returns

`void`

##### getDisplayTexture()

> **getDisplayTexture**(): [`WebGLTexture`](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md#webgltexture)

###### Returns

[`WebGLTexture`](@repo.automa-engine.gpu.createSimulationEngine.<internal>.md#webgltexture)

##### init()

> **init**(`data`): `void`

###### Parameters

###### data

`Uint8Array`

###### Returns

`void`

##### paint()

> **paint**(`col`, `row`, `value`): `void`

###### Parameters

###### col

`number`

###### row

`number`

###### value

`number`

###### Returns

`void`

##### resize()

> **resize**(`width`, `height`): `void`

###### Parameters

###### width

`number`

###### height

`number`

###### Returns

`void`

##### step()

> **step**(`rule`): `void`

###### Parameters

###### rule

[`Rule`](@repo.automa-engine.rules.registry.md#rule)

###### Returns

`void`
