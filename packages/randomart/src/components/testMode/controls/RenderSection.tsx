import { ControlSection } from '@repo/ui/control-panel';
import { Select, Switch } from '@repo/ui/data-entry';
import { RENDER_MODE_OPTIONS } from '../lib/renderModes';
import { setRenderMode, setResolution, toggleAnimate, useAnimate, useRenderMode, useResolution } from '../store';

export function RenderSection() {
  const resolution = useResolution();
  const animate = useAnimate();
  const renderMode = useRenderMode();

  return (
    <ControlSection title="render" defaultOpen>
      <div className="flex items-center justify-between">
        <span className="text-foreground-muted text-xs">Renderer</span>
        <div className="flex gap-1">
          {RENDER_MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setRenderMode(option.value);
              }}
              className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
                renderMode === option.value
                  ? 'bg-neutral-600 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-foreground-muted text-xs">
          Resolution{renderMode === 'gpu' ? ' (CPU only)' : ''}
        </span>
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
      </div>

      <div className="flex items-center justify-between">
        <span className="text-foreground-muted text-xs">Animate</span>
        <Switch checked={animate} onChange={toggleAnimate} label={animate ? 'On' : 'Off'} />
      </div>
    </ControlSection>
  );
}
