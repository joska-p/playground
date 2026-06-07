import { TransportControls } from './TransportControls.tsx';
import { EditControls } from './EditControls.tsx';
import { SpeedSlider } from './SpeedSlider.tsx';
import { BrushModeSelector } from './BrushModeSelector.tsx';
import { FileControls } from './FileControls.tsx';
import { DebugToggle, DebugPanel } from './DebugControls.tsx';

type ControlsProps = {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
};

const Controls = ({ className, orientation = 'vertical' }: ControlsProps) => {
  const vert = orientation === 'vertical';

  return (
    <div className={className}>
      <div
        className={`rounded bg-card/60 p-2 text-card-foreground backdrop-blur-sm ${
          vert ? 'flex flex-col gap-1.5 min-w-0' : 'flex flex-col gap-1'
        }`}
      >
        <div
          className={`flex items-center gap-1 ${vert ? 'flex-wrap' : 'overflow-x-auto'}`}
        >
          <TransportControls />
          <EditControls />
          <BrushModeSelector />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="min-w-24 flex-1">
            <SpeedSlider orientation={orientation} />
          </div>
          <FileControls />
          <DebugToggle />
        </div>
      </div>
      <DebugPanel />
    </div>
  );
};

export { Controls };
export type { ControlsProps };
