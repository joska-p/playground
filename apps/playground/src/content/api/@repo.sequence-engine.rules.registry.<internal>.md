---
title: rules/registry (internal)
package: "@repo/sequence-engine"
kind: internal
module: rules/registry
---

## Variables

### initialRules

> `const` **initialRules**: readonly \[\{ `description`: `"Jump back by 'n' if possible, otherwise jump forward."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"recaman"`; `maxSteps`: `1000`; `name`: `"Recaman's Rule"`; \}, \{ `description`: `"F(n) = F(n-1) + F(n-2). Grows exponentially."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"fibonacci"`; `maxSteps`: `20`; `name`: `"Fibonacci"`; \}, \{ `description`: `"The sequence of prime numbers: 2, 3, 5, 7, 11..."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"primes"`; `maxSteps`: `300`; `name`: `"Primes"`; \}, \{ `description`: `"Sum of integers up to n: 1, 3, 6, 10, 15..."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"triangular"`; `maxSteps`: `500`; `name`: `"Triangular"`; \}, \{ `description`: `"If even, n/2; if odd, 3n+1. The famous hailstone sequence."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"collatz"`; `maxSteps`: `10000`; `name`: `"Collatz (3n+1)"`; \}, \{ `description`: `"1, 11, 21, 1211, 111221... each term describes the previous."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"look-and-say"`; `maxSteps`: `15`; `name`: `"Look and Say"`; \}, \{ `description`: `"P(n) = P(n-2) + P(n-3). Begins 1, 1, 1, 2, 2, 3, 4, 5, 7, 9..."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"padovan"`; `maxSteps`: `200`; `name`: `"Padovan"`; \}, \{ `description`: `"n²: 1, 4, 9, 16, 25, 36... Quadratic growth."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"square-numbers"`; `maxSteps`: `500`; `name`: `"Square Numbers"`; \}, \{ `description`: `"f(0)=0, f(1)=1; f(2n)=f(n), f(2n+1)=f(n)+f(n+1). Fractal series."`; `getNext`: (`__namedParameters`) => `number`; `id`: `"stern-diatomic"`; `maxSteps`: `5000`; `name`: `"Stern's Diatomic"`; \}\]

Defined in: [rules/registry.ts:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/sequence-engine/src/rules/registry.ts#L14)
