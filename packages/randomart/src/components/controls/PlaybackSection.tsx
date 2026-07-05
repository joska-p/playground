import { Button, ControlRow, ControlSection, Slider } from '@repo/ui';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { setTime, toggleRunning } from '../../stores/randomart/actions/playback';
import { useAnimationSpeed, useRunning } from '../../stores/randomart/selectors';

function PlaybackSection() {
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  // const playPauseControl: Control = {
  //   id: 'playPause',
  //   type: 'button',
  //   label: running ? 'Pause' : 'Play',
  //   variant: 'primary',
  //   onClick: toggleRunning
  // };

  // const resetTimeControl: Control = {
  //   id: 'resetTime',
  //   type: 'button',
  //   label: 'Reset Time',
  //   onClick: () => {
  //     setTime(0);
  //   }
  // };

  // const speedControl: Control = {
  //   id: 'speed',
  //   type: 'slider',
  //   label: 'Speed',
  //   value: animationSpeed,
  //   min: 0,
  //   max: 2,
  //   step: 0.1,
  //   onChange: setAnimationSpeed
  // };

  // const section: ControlSection = {
  //   id: 'playback',
  //   label: 'Playback',
  //   defaultOpen: true,
  //   controls: [playPauseControl, resetTimeControl, speedControl]
  // };

  // return section;

  return (
    <ControlSection
      title="Playback"
      defaultOpen={true}
    >
      <Button
        variant="primary"
        onClick={toggleRunning}
      >
        {running ? 'Pause' : 'Play'}
      </Button>
      <Button
        onClick={() => {
          setTime(0);
        }}
      >
        Reset Time
      </Button>

      <ControlRow label="speed">
        <Slider
          value={animationSpeed}
          min={0}
          max={2}
          step={0.1}
          onChange={(e) => {
            setAnimationSpeed(Number(e.target.value));
          }}
        />
      </ControlRow>
    </ControlSection>
  );
}

export { PlaybackSection };
