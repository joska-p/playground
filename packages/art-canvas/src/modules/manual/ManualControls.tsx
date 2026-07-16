import { ControlGrid, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import {
  setChroma,
  setDivisions,
  setIsPlaying,
  setLightness,
  useChroma,
  useDivisions,
  useIsPlaying,
  useLightness
} from './store';

function ManualControls() {
  const divisions = useDivisions();
  const chroma = useChroma();
  const lightness = useLightness();
  const isPlaying = useIsPlaying();

  function handlePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <ControlSection title="manual">
        <ControlRow label={`div: ${String(divisions)}`}>
          <Slider
            value={divisions}
            onChange={setDivisions}
            min={1}
            max={100}
            step={1}
          />
        </ControlRow>

        <ControlRow label={`Chroma`}>
          <Slider
            value={chroma}
            onChange={setChroma}
            min={0}
            max={0.4}
            step={0.01}
          />
        </ControlRow>

        <ControlRow label={`Lightness`}>
          <Slider
            value={lightness}
            onChange={setLightness}
            min={0}
            max={1}
            step={0.1}
          />
        </ControlRow>

        <ControlGrid columns={2}>
          <Button onClick={handlePlay}>{isPlaying ? 'Stop' : 'Play'}</Button>
        </ControlGrid>
      </ControlSection>
    </>
  );
}

export { ManualControls };
