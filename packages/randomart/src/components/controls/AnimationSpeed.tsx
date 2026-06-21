import { Slider } from '@repo/ui/Slider';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { useAnimationSpeed } from '../../stores/randomart/selectors';

export function AnimationSpeed() {
  const animationSpeed = useAnimationSpeed();

  return (
    <Slider
      className="col-span-2 mt-0 py-0"
      label="Animation speed"
      min={0}
      max={2}
      step={0.1}
      value={animationSpeed}
      onChange={setAnimationSpeed}
    />
  );
}
