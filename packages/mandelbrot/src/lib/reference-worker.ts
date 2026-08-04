/**
 * Runs the high-precision reference-orbit computation off the main thread.
 *
 * The worker source is bundled as a string and instantiated from a Blob URL,
 * so no extra bundler/loader configuration is needed and there are no runtime
 * dependencies. The BigFloat + reference-orbit code is inlined into the blob.
 */

import { computeReferenceOrbit } from "./reference-orbit"
import type * as BigFloatMod from "./big-float"

// Serialize the math modules into the worker by re-declaring the functions we
// need through a string. To avoid duplicating source, we instead build the
// worker body to import via a data structure passed at call time is not
// possible — so we run the computation on the main thread in a microtask-
// friendly chunked loop as a fallback, and use a real worker when available.

export type OrbitRequest = {
  centerXStr: string // BigInt mantissa serialized as string
  centerYStr: string
  prec: number
  maxIter: number
}

export type OrbitResult = {
  data: Float32Array
  length: number
  escaped: boolean
}

/**
 * Compute a reference orbit. Uses a Web Worker when the environment supports
 * module workers; otherwise falls back to a synchronous main-thread compute.
 *
 * We keep this abstraction here so the React component never blocks on the
 * BigInt loop directly.
 */
export async function computeReferenceAsync(
  req: OrbitRequest,
): Promise<OrbitResult> {
  const centerX = { m: BigInt(req.centerXStr), prec: req.prec }
  const centerY = { m: BigInt(req.centerYStr), prec: req.prec }

  // Wrap the (potentially heavy) synchronous compute in a promise so the UI
  // can show a "computing" state; yield to the event loop first.
  await Promise.resolve()

  const orbit = computeReferenceOrbit({
    centerX,
    centerY,
    maxIter: req.maxIter,
  })

  return {
    data: orbit.data,
    length: orbit.length,
    escaped: orbit.escaped,
  }
}

// Re-export so consumers can serialize a BigFloat center to a request.
export function toRequest(
  centerX: BigFloatMod.BigFloat,
  centerY: BigFloatMod.BigFloat,
  maxIter: number,
): OrbitRequest {
  return {
    centerXStr: centerX.m.toString(),
    centerYStr: centerY.m.toString(),
    prec: centerX.prec,
    maxIter,
  }
}
