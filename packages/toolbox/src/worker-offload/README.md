# worker-offload

Offload computation to a Web Worker without writing a separate worker file.

```ts
import { useWorker } from "@repo/toolbox/useWorker";

function Calculator() {
  const { execute, status, result, error } = useWorker((n: number) => n * 2);

  useEffect(() => { execute(42); }, []);

  if (status === "running") return <Spinner />;
  if (status === "error") return <div>Failed: {error?.message}</div>;
  return <div>Result: {result}</div>;
}
```

```tsx
import { TaskBoundary } from "@repo/toolbox/TaskBoundary";

<TaskBoundary
  fn={(data: Input) => expensiveTransform(data)}
  input={data}
  loading={<Spinner />}
  error={(err) => <ErrorPanel message={err.message} />}
>
  {(result) => <ResultView value={result} />}
</TaskBoundary>
```

---

## API

### `useWorker(fn)`

| Return field | Description |
|---|---|
| `execute(input)` | Runs `fn(input)` in a Worker. Returns `Promise<O>`. |
| `status` | `"idle"` \| `"running"` \| `"success"` \| `"error"` |
| `result` | Last successful output (`undefined` until success) |
| `error` | Last error (`undefined` unless error) |

**`fn` must be a pure function.** It is serialized via `.toString()` and cannot capture closures or import modules.

```ts
const { execute, status, result } = useWorker((x: number) => x * 2);
execute(21).then(console.log); // 42
```

The `execute` reference is stable if `fn` is stable (memoize with `useCallback` if needed).

### `TaskBoundary`

| Prop | Type |
|---|---|
| `fn` | `(input: I) => O` |
| `input` | `I` |
| `children` | `(result: O) => ReactNode` |
| `loading?` | `ReactNode` |
| `error?` | `(error: Error) => ReactNode` |

Calls `execute(input)` on mount and whenever `input` changes.

---

## How it works

`useWorker` takes your function, serializes it into a Blob URL, and creates a Web Worker from it.

```
useWorker(fn)
  ↓
compileFn(fn) → Blob URL → new Worker(url)
  ↓
worker.onmessage → resolve/reject promise → update status/result/error
  ↓
cleanup on unmount or retry: terminate worker, revoke blob URL
```

`createWorkerPool` was removed — a single worker per task is the right default for small apps. The module went from ~650 lines to ~270 lines total.

### File layout

```
worker-offload/
  hooks/useWorker.ts            — the hook (~80 lines)
  components/TaskBoundary.tsx   — declarative wrapper (~30 lines)
  utils/createWorkerFunction.ts — standalone utility (~30 lines)
```

### Alternative: dedicated worker file

If your computation needs imports or state, write a dedicated worker file instead:

```ts
// my-worker.ts
self.onmessage = (e) => {
  const result = expensiveComputation(e.data._input);
  self.postMessage({ _taskId: e.data._taskId, _output: result });
};
```

Then use `createWorkerFunction` or provide your own factory:

```ts
import { createWorkerFunction } from "@repo/toolbox/createWorkerFunction";

const { createWorker, revoke } = createWorkerFunction((n: number) => n * 2);
const worker = createWorker();
worker.postMessage({ _input: 21, _taskId: 1 });
// ... handle response manually
revoke(); // release the blob URL when done
```
