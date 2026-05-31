# Design Note: Custom manipulations + worker

## Problem

`pipelineGateway` sends steps to a Web Worker, but only built-in
manipulations are registered in the worker. Custom manipulations
(like `demo-warm`) cannot be passed because functions don't
serialize across `postMessage`.

This creates a hidden distinction:

| Path               | Built-in | Custom |
|--------------------|----------|--------|
| `pipelineGateway`  | ✅       | ❌     |
| `Pipeline` (main)  | ✅       | ✅     |

The API pretends there's no difference, but there is.

## Possible fix

Give `pipelineGateway` an optional `definitions` param — serializable
descriptors sent alongside steps. The worker reconstructs them
before running.

Pixel fns are easy: store the function body as a string, eval with
`new Function()` in the worker. Neighborhood/whole fns are harder
because they capture closure scope.

## Files

- `pipeline-gateway.ts` — entry point, sends to worker
- `pipeline.worker.ts` — receives, runs, posts back
- `manipData.ts` — has `DEMO_MANIPULATIONS` as a local-only example

## Next

Decide if the fix is worth it, or if the main-thread `Pipeline` is
sufficient for custom cases.
