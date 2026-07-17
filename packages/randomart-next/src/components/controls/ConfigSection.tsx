import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Textarea } from '@repo/ui/data-entry';
import { setSeedText } from '../../stores/randomart/actions/config';
import { useSeedText } from '../../stores/randomart/selectors';
import { DownloadSection } from './DownloadSection';

function ConfigSection() {
  const seedText = useSeedText();

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

      <DownloadSection />
    </ControlGrid>
  );
}

export { ConfigSection };
