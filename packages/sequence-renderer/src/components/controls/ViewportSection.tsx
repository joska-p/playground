import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Slider, Switch } from '@repo/ui/data-entry';
import { setViewport } from '../../stores/ui/actions';
import { useViewport } from '../../stores/ui/selectors';

function ViewportSection() {
  const { enabled, zoom, panX, panY } = useViewport();

  return (
    <ControlSection
      title="Viewport"
      defaultOpen={true}
    >
      <ControlRow
        label="Enable"
        value={enabled}
      >
        <Switch
          checked={enabled}
          onChange={(e) => {
            setViewport({ enabled: e.target.checked });
          }}
        />
      </ControlRow>

      <ControlRow
        label="Zoom"
        value={zoom}
      >
        <Slider
          value={zoom}
          min={0.1}
          max={5}
          step={0.05}
          onChange={(e) => {
            setViewport({ zoom: Number(e.target.value) });
          }}
          showTicks={false}
        />
      </ControlRow>

      <ControlRow
        label="panX"
        value={panX}
      >
        <Slider
          value={panX}
          min={-1}
          max={1}
          step={0.05}
          onChange={(e) => {
            setViewport({ panX: Number(e.target.value) });
          }}
          showTicks={false}
        />
      </ControlRow>

      <ControlRow
        label="panY"
        value={panY}
      >
        <Slider
          value={panY}
          min={-1}
          max={1}
          step={0.05}
          onChange={(e) => {
            setViewport({ panY: Number(e.target.value) });
          }}
          showTicks={false}
        />
      </ControlRow>
    </ControlSection>
  );
}

export { ViewportSection };
