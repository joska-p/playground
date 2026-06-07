import { Slider } from '@repo/ui/Slider';
import { useSetSpeed } from '../../stores/automaton/actions.ts';
import { useSpeedMs } from '../../stores/automaton/selectors.ts';

type SpeedSliderProps = {
  orientation?: 'vertical' | 'horizontal';
};

function SpeedSlider({ orientation = 'vertical' }: SpeedSliderProps) {
  const speedMs = useSpeedMs();
  const setSpeed = useSetSpeed();

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
