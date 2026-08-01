import { ControlGrid, ControlPanel as Panel } from '@repo/ui/control-panel';
import { Slider } from '@repo/ui/data-entry';
import {
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle,
  setAmbientLight,
  setBumpHeight,
  setChromaScale,
  setHueFrequency,
  setHueShift,
  setSunAngle
} from '../stores/store';

function ControlPanel() {
  const ambientLight = useAmbientLight();
  const bumpHeight = useBumpHeight();
  const chromaScale = useChromaScale();
  const hueFrequency = useHueFrequency();
  const hueShift = useHueShift();
  const sunAngle = useSunAngle();
  return (
    <Panel title="mandelbrot">
      <ControlGrid columns={2}>
        <Slider
          label="sun angle"
          min="0"
          max="6.283"
          step="0.01"
          value={sunAngle}
          onChange={setSunAngle}
        />

        <Slider
          label="bump height"
          min="1.0"
          max="50.0"
          step="0.5"
          value={bumpHeight}
          onChange={setBumpHeight}
        />

        <Slider
          label="ambient light"
          min="0.0"
          max="0.8"
          step="0.01"
          value={ambientLight}
          onChange={setAmbientLight}
        />

        <Slider
          label="hue shift"
          min="0"
          max="6.283"
          step="0.01"
          value={hueShift}
          onChange={setHueShift}
        />

        <Slider
          label="hue frequency"
          min="0.01"
          max="0.5"
          step="0.005"
          value={hueFrequency}
          onChange={setHueFrequency}
        />

        <Slider
          label="chroma scale"
          min="0.0"
          max="0.25"
          step="0.005"
          value={chromaScale}
          onChange={setChromaScale}
        />
      </ControlGrid>
    </Panel>
  );
}

export { ControlPanel };
