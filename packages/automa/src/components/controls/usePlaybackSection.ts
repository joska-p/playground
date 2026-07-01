import { SPEED_MAX_MS, SPEED_MIN_MS, SPEED_STEP_MS } from '@repo/automa-engine/config';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setSpeed, step, toggleRunning } from '../../stores/simulation/actions';
import { useRunning, useSpeedMs } from '../../stores/ui/selectors';

function usePlaybackSection() {
  const running = useRunning();
  const speedMs = useSpeedMs();

  const playPauseControl: Control = {
    id: 'play-pause',
    type: 'button',
    label: running ? 'Pause' : 'Play',
    variant: 'primary',
    onClick: toggleRunning
  };

  const stepControl: Control = {
    id: 'step',
    type: 'button',
    label: 'Step',
    disabled: running,
    onClick: () => void step()
  };

  const speedControl: Control = {
    id: 'speed',
    type: 'slider',
    label: 'Speed',
    value: speedMs,
    min: SPEED_MIN_MS,
    max: SPEED_MAX_MS,
    step: SPEED_STEP_MS,
    onChange: setSpeed
  };

  const playbackSection: ControlSection = {
    id: 'playback',
    label: 'Playback',
    defaultOpen: true,
    controls: [playPauseControl, stepControl, speedControl]
  };

  return playbackSection;
}

export { usePlaybackSection };
