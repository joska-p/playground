import { ControlGrid, ControlPanel as Panel } from '@repo/ui/control-panel';
import { Slider } from '@repo/ui/data-entry';
import {
  useInteriorScale,
  useIterationBase,
  useIterationCap,
  useIterationScale,
  usePixelEps,
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle,
  setInteriorScale,
  setIterationBase,
  setIterationCap,
  setIterationScale,
  setPixelEps,
  setAmbientLight,
  setBumpHeight,
  setChromaScale,
  setHueFrequency,
  setHueShift,
  setSunAngle
} from '../stores/store';

function ControlPanel() {
  const interiorScale = useInteriorScale();
  const iterationBase = useIterationBase();
  const iterationCap = useIterationCap();
  const iterationScale = useIterationScale();
  const pixelEps = usePixelEps();
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
          label="iteration base"
          min="20"
          max="200"
          step="5"
          value={iterationBase}
          onChange={setIterationBase}
        />

        <Slider
          label="iteration scale"
          min="5"
          max="80"
          step="1"
          value={iterationScale}
          onChange={setIterationScale}
        />

        <Slider
          label="iteration cap"
          min="200"
          max="3000"
          step="50"
          value={iterationCap}
          onChange={setIterationCap}
        />

        <Slider
          label="pixel eps"
          min="0.0005"
          max="0.1"
          step="0.0005"
          value={iterationCap}
          onChange={setIterationCap}
        />

        <Slider
          label="interior scale"
          min="2.0"
          max="25.0"
          step="0.5"
          value={interiorScale}
          onChange={setInteriorScale}
        />

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
