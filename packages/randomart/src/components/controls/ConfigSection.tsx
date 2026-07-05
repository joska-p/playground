import { Button, ControlRow, ControlSection, Input, Textarea } from '@repo/ui';
import { setMaxDepth, setSeedText } from '../../stores/randomart/actions/config';
import { useMaxDepth, useSeedText } from '../../stores/randomart/selectors';

function ConfigSection() {
  const seedText = useSeedText();
  const maxDepth = useMaxDepth();

  return (
    <ControlSection
      title="config"
      defaultOpen={true}
    >
      <ControlRow label="Seed">
        <Textarea
          value={seedText}
          onChange={(e) => {
            setSeedText(e.target.value);
          }}
        />
      </ControlRow>
      <ControlRow label="Shuffle">
        <Button
          onClick={() => {
            setSeedText(Math.random().toString(36).slice(2, 10));
          }}
        >
          Randomize
        </Button>
      </ControlRow>
      <ControlRow label="Max Depth">
        <Input
          type="number"
          value={maxDepth}
          onChange={(e) => {
            setMaxDepth(Number(e.target.value));
          }}
        />
      </ControlRow>
    </ControlSection>
  );
}

export { ConfigSection };
