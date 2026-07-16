import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider, Switch, Textarea } from '@repo/ui/data-entry';
import { setAnimationSpeed, setSeedText } from '../../stores/randomart/actions/config';
import { setCorrelatedRGB } from '../../stores/randomart/actions/display';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import {
  useAnimationSpeed,
  useCorrelatedRGB,
  useRunning,
  useSeedText
} from '../../stores/randomart/selectors';
import { DownloadSection } from './DownloadSection';

function ConfigSection() {
  const seedText = useSeedText();
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();
  const correlatedRGB = useCorrelatedRGB();

  return (
    <ControlSection title="config">
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

        <Switch
          label="RGB"
          checked={correlatedRGB}
          variant="primary"
          onChange={() => {
            setCorrelatedRGB(!correlatedRGB);
          }}
        />

        <Slider
          className="col-span-2"
          aria-label="animation speed"
          value={animationSpeed}
          min={0}
          max={2}
          step={0.1}
          onChange={setAnimationSpeed}
        />
      </ControlGrid>
    </ControlSection>
  );
}

export { ConfigSection };
