import { useClear, useRandomize } from '../../stores/automaton/actions.ts';

function EditControls() {
  const clear = useClear();
  const randomize = useRandomize();

  return (
    <>
      <button
        onClick={clear}
        className="rounded bg-red-700 px-3 py-1 text-sm font-medium hover:bg-red-800"
        title="Clear (C)"
      >
        ✕ Clear
      </button>
      <button
        onClick={randomize}
        className="rounded bg-green-700 px-3 py-1 text-sm font-medium hover:bg-green-800"
        title="Randomize (R)"
      >
        ↻ Random
      </button>
    </>
  );
}

export { EditControls };
