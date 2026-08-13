---
title: colorSpaces/<internal>/Namespace/_default
package: "@repo/palette-engine"
kind: module
module: colorSpaces/<internal>/Namespace/_default
---

## Functions

### deltaE2000()

> **deltaE2000**(`color`, `sample`, `options?`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaE2000.d.ts:7

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### options?

###### kC?

`number`

###### kH?

`number`

###### kL?

`number`

#### Returns

`number`

***

### deltaE76()

> **deltaE76**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaE76.d.ts:6

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

***

### deltaECMC()

> **deltaECMC**(`color`, `sample`, `options?`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaECMC.d.ts:7

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### options?

###### c?

`number`

###### l?

`number`

#### Returns

`number`

***

### deltaEHCT()

> **deltaEHCT**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaEHCT.d.ts:7

Color distance using HCT.

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

***

### deltaEITP()

> **deltaEITP**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaEITP.d.ts:9

Delta E in ICtCp space,
which the ITU calls Delta E ITP, which is shorter.
Formulae from ITU Rec. ITU-R BT.2124-0

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

***

### deltaEJz()

> **deltaEJz**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaEJz.d.ts:12

More accurate color-difference formulae
than the simple 1976 Euclidean distance in Lab

Uses JzCzHz, which has improved perceptual uniformity
and thus a simple Euclidean root-sum of ΔL² ΔC² ΔH²
gives good results.

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

***

### deltaEOK()

> **deltaEOK**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaEOK.d.ts:8

More accurate color-difference formulae
than the simple 1976 Euclidean distance in CIE Lab

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

***

### deltaEOK2()

> **deltaEOK2**(`color`, `sample`): `number`

Defined in: node\_modules/.pnpm/colorjs.io@0.6.1/node\_modules/colorjs.io/types/src/deltaE/deltaEOK2.d.ts:15

More accurate color-difference formulae
than the simple 1976 Euclidean distance in CIE Lab
The Oklab a and b axes are scaled relative to the L axis, for better uniformity
Björn Ottosson said:
"I've recently done some tests with color distance datasets as implemented
in Colorio and on both the Combvd dataset and the OSA-UCS dataset a
scale factor of slightly more than 2 for a and b would give the best results
(2.016 works best for Combvd and 2.045 for the OSA-UCS dataset)."

#### Parameters

##### color

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

##### sample

[`ColorTypes`](@repo.palette-engine.colorSpaces.<internal>.md#colortypes)

#### Returns

`number`

#### See

\<https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-945714988\>
