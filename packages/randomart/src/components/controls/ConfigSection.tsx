import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Input, Textarea } from '@repo/ui/data-entry';
import { setMaxDepth, setSeedText } from '../../stores/randomart/actions/config';
import { useMaxDepth, useSeedText } from '../../stores/randomart/selectors';

function ConfigSection() {
  const seedText = useSeedText();
  const maxDepth = useMaxDepth();

  return (
    <ControlGrid columns={2}>
      <Textarea
        className="col-span-full"
        autoGrow={false}
        value={seedText}
        onChange={(e) => {
          setSeedText(e.target.value);
        }}
      />
      <Button
        size="sm"
        onClick={() => {
          setSeedText(Math.random().toString(36).slice(2, 10));
        }}
      >
        Randomize
      </Button>

      <Input
        aria-label="Max Depth"
        type="number"
        value={maxDepth}
        onChange={(e) => {
          setMaxDepth(Number(e.target.value));
        }}
      />
    </ControlGrid>
  );
}

export { ConfigSection };
