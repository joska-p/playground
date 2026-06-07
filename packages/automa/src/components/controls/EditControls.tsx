import { Button } from '@repo/ui/Button';
import { useClear, useRandomize } from '../../stores/automaton/actions.ts';

function EditControls() {
  const clear = useClear();
  const randomize = useRandomize();

  return (
    <>
      <Button
        variant="destructive"
        size="small"
        onClick={clear}
        title="Clear (C)"
        aria-label="Clear grid"
      >
        ✕ Clear
      </Button>
      <Button
        variant="accent"
        size="small"
        onClick={randomize}
        title="Randomize (R)"
        aria-label="Randomize grid"
      >
        ↻ Randomize
      </Button>
    </>
  );
}

export { EditControls };
