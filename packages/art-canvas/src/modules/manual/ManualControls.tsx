import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Slider } from '@repo/ui/data-entry';
import {
  setChroma,
  setDivisions,
  setLightness,
  useChroma,
  useDivisions,
  useLightness
} from './store';

function ManualControls() {
  const divisions = useDivisions();
  const chroma = useChroma();
  const lightness = useLightness();
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
      </ControlSection>
    </>
  );
}

export { ManualControls };
