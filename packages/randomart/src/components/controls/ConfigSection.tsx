import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Input, Slider, Textarea } from '@repo/ui/data-entry';
import { setAnimationSpeed, setMaxDepth, setSeedText } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import {
  useAnimationSpeed,
  useMaxDepth,
  useRunning,
  useSeedText
} from '../../stores/randomart/selectors';

function ConfigSection() {
  const seedText = useSeedText();
  const maxDepth = useMaxDepth();
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

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

      <Button
        size="sm"
        variant="primary"
        onClick={toggleRunning}
      >
        {running ? 'Pause' : 'Play'}
      </Button>

      <Slider
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
