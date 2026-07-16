import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Slider, Textarea } from '@repo/ui/data-entry';
import { setAnimationSpeed, setSeedText } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import { useAnimationSpeed, useRunning, useSeedText } from '../../stores/randomart/selectors';
import { DownloadSection } from './DownloadSection';

function ConfigSection() {
  const seedText = useSeedText();
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  return (
    <ControlGrid columns={3}>
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

      <Button
        size="sm"
        variant="primary"
        onClick={toggleRunning}
      >
        {running ? 'Pause' : 'Play'}
      </Button>

      <DownloadSection />

      <Slider
        className="col-span-3"
        aria-label="animation speed"
        value={animationSpeed}
        min={0}
        max={2}
        step={0.1}
        onChange={setAnimationSpeed}
      />
    </ControlGrid>
  );
}

export { ConfigSection };
