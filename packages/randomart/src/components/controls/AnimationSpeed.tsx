import { Slider } from '@repo/ui/Slider';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import {
  useAnimationSpeed,
  useRenderMode
} from '../../stores/randomart/selectors';

export function AnimationSpeed() {
  const animationSpeed = useAnimationSpeed();
  const renderMode = useRenderMode();
  const disabled = renderMode === 'canvas';

  return (
    <Slider
      className="mt-0 w-fit py-0"
      label="Animation speed"
      min={0}
      max={2}
      step={0.1}
      value={animationSpeed}
      onChange={setAnimationSpeed}
      disabled={disabled}
      helperText={disabled ? 'Only available in GLSL mode' : undefined}
    />
  );
}
