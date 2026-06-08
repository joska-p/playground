import { Slider } from '@repo/ui/Slider';
import { setSpeed } from '../../stores/simulation/actions.ts';
import { useSpeedMs } from '../../stores/ui/selectors.ts';
import {
  SPEED_MIN_MS,
  SPEED_MAX_MS,
  SPEED_STEP_MS,
} from '../../core/config.ts';

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
      className="max-w-52 flex items-center gap-3 py-0 lg:mt-2 lg:block lg:items-start lg:gap-2"
    />
  );
}

export { SpeedSlider };
