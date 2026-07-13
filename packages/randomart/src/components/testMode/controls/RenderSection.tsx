import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Select, Switch } from '@repo/ui/data-entry';
import { RENDER_MODE_OPTIONS } from '../lib/renderModes';
import {
  setRenderMode,
  setResolution,
  toggleAnimate,
  useAnimate,
  useRenderMode,
  useResolution
} from '../store';

export function RenderSection() {
  const resolution = useResolution();
  const animate = useAnimate();
  const renderMode = useRenderMode();

  return (
    <ControlSection
      title="render"
      defaultOpen
    >
      <ControlRow label="Renderer">
        <div className="flex gap-1">
          {RENDER_MODE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={renderMode === option.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                setRenderMode(option.value);
              }}
              className="px-2 py-1 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </ControlRow>

      <ControlRow label={`Resolution${renderMode === 'gpu' ? ' (CPU only)' : ''}`}>
        <Select
          value={resolution}
          disabled={renderMode === 'gpu'}
          onChange={(e) => {
            setResolution(Number(e.target.value));
          }}
        >
          <option value={48}>48</option>
          <option value={64}>64</option>
          <option value={96}>96</option>
          <option value={128}>128</option>
          <option value={192}>192</option>
        </Select>
      </ControlRow>

      <ControlRow label="Animate">
        <Switch
          checked={animate}
          onChange={toggleAnimate}
          label={animate ? 'On' : 'Off'}
        />
      </ControlRow>
    </ControlSection>
  );
}
