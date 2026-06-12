# @repo/automa — Migration to @repo/worker-pool

## What

Replace the module-level `Worker` in `stores/simulation/actions.ts` with `WorkerPool<StepRequest, StepResponse>` configured with `maxPoolSize: 1`.

## Why

| Current (raw Worker) | Target (WorkerPool) | Benefit |
|----------------------|---------------------|---------|
| Manual worker lifecycle (init/destroy) | `pool.teardown()` handles cleanup | Less boilerplate |
| No queue — drops steps if worker busy | Internal FIFO queue | No lost steps under load |
| `setInterval` fires regardless of completion | Async loop awaits each `pool.run()` | Self-regulating, no queue buildup |
| Message protocol inline in actions.ts | Declarative `serialize`/`deserialize` | Separation of concerns |
| Single worker hardcoded | `maxPoolSize: 1` explicit | Clear intent, extensible |

## Migration Steps

1. **Add dependency**: `pnpm add @repo/worker-pool` in automa
2. **Create WorkerPool instance** in `actions.ts` (module level):
   ```ts
   import { WorkerPool } from '@repo/worker-pool';
   import { WORKER_MESSAGE_STEP } from '../../core/config';

   type StepRequest = {
     type: typeof WORKER_MESSAGE_STEP;
     grid: Uint8Array;
     cols: number;
     rows: number;
     ruleId: string;
   };

   type StepResponse = {
     type: typeof WORKER_MESSAGE_STEP;
     grid: Uint8Array;
   };

   const pool = new WorkerPool<StepRequest, StepResponse>({
     maxPoolSize: 1,
     workerFactory: () => new Worker(new URL('../../core/worker', import.meta.url), { type: 'module' }),
     serialize: (task) => ({
       message: task,
       transfer: [task.grid.buffer]
     }),
     deserialize: (event) => {
       const data = event.data as StepResponse;
       return { ok: true, value: data };
     }
   });
   ```
3. **Update `init()`** — remove `new Worker(...)`, keep store initialization
4. **Update `destroy()`** — replace `worker.terminate()` with `pool.teardown()`
5. **Replace `step()`** with async loop in `play()`:
   ```ts
   const play = async (): void => {
     uiStore.setState({ running: true });
     while (uiStore.getState().running) {
       const state = simulationStore.getState();
       await pool.run({
         type: WORKER_MESSAGE_STEP,
         grid: state.grid,
         cols: state.cols,
         rows: state.rows,
         ruleId: state.ruleId
       });
       await new Promise(r => setTimeout(r, uiStore.getState().speedMs));
     }
   };
   ```
6. **Remove** `worker` variable, `worker.onmessage` handler, `intervalId` logic
7. **Keep** `core/worker.ts` — must remain importable by `workerFactory`
8. **Verify** existing automa tests pass unchanged

## Why Async Loop Over setInterval

Current `setInterval(step, speedMs)` has a flaw: if a step takes longer than `speedMs`, multiple steps queue up in the worker, causing lag and memory pressure.

The async loop:
- Awaits `pool.run()` → next step starts only after previous completes
- Naturally adapts to variable step duration
- `speedMs` becomes minimum delay between steps, not fixed interval
- Eliminates `intervalId` management

## Risk: Low

- Single worker, simple protocol
- Worker message format unchanged (still uses transferable `Uint8Array`)
- Only orchestration changes