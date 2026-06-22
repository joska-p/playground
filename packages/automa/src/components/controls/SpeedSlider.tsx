import {
  SPEED_MAX_MS,
  SPEED_MIN_MS,
  SPEED_STEP_MS
} from '@repo/automa-engine/discrete/config';
import { Slider } from '@repo/ui/Slider';
import { setSpeed } from '../../stores/simulation/actions';
import { useSpeedMs } from '../../stores/ui/selectors';

function SpeedSlider() {
  const speedMs = useSpeedMs();

  return (
    <Slider
      variant="primary"
      label="Speed"
      value={speedMs}
      onChange={setSpeed}
      min={SPEED_MIN_MS}
      max={SPEED_MAX_MS}
      step={SPEED_STEP_MS}
      unit="ms"
      className="flex max-w-52 items-center gap-3 py-0 lg:mt-2 lg:block lg:items-start lg:gap-2"
    />
  );
}

export { SpeedSlider };
