import { Slider } from '@repo/ui/Slider';
import { Switch } from '@repo/ui/Switch';
import type { JSX } from 'react';
import {
  setViewport,
  useViewport
} from '../../stores/sequence/store';

function ViewportControls(): JSX.Element {
  const viewport = useViewport();

  return (
    <div className="border-border flex w-full flex-col gap-2 border-t px-3 py-2">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium">
          Viewport
        </span>
        <Switch
          variant="secondary"
          size="sm"
          checked={viewport.enabled}
          onCheckedChange={(enabled) => setViewport({ enabled, zoom: 1, panX: 0, panY: 0 })}
          label="Enable Manual Viewport"
        />
      </div>

      {viewport.enabled && (
        <div className="flex flex-col gap-2">
          <Slider
            variant="secondary"
            layout="inline"
            label="Zoom"
            min={0.1}
            max={5}
            step={0.05}
            value={viewport.zoom}
            onChange={(zoom) => setViewport({ zoom })}
          />
          <Slider
            variant="secondary"
            layout="inline"
            label="Pan X"
            min={-2000}
            max={2000}
            step={1}
            value={viewport.panX}
            onChange={(panX) => setViewport({ panX })}
          />
          <Slider
            variant="secondary"
            layout="inline"
            label="Pan Y"
            min={-2000}
            max={2000}
            step={1}
            value={viewport.panY}
            onChange={(panY) => setViewport({ panY })}
          />
        </div>
      )}
    </div>
  );
}

export { ViewportControls };