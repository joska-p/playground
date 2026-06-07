import { Slider } from '@repo/ui/Slider';
import { setSpeed } from '../../stores/simulation/actions.ts';
import { useSpeedMs } from '../../stores/ui/selectors.ts';

type SpeedSliderProps = {
  orientation?: 'vertical' | 'horizontal';
};

function SpeedSlider({ orientation = 'vertical' }: SpeedSliderProps) {
  const speedMs = useSpeedMs();

  return (
    <Slider
      variant="primary"
      layout={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      label="Speed"
      value={speedMs}
      onChange={setSpeed}
      min={50}
      max={1000}
      step={10}
      unit="ms"
    />
  );
}

export { SpeedSlider };
