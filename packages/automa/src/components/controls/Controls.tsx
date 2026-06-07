import { TransportControls } from './TransportControls.tsx';
import { EditControls } from './EditControls.tsx';
import { SpeedSlider } from './SpeedSlider.tsx';
import { BrushModeSelector } from './BrushModeSelector.tsx';
import { FileControls } from './FileControls.tsx';
import { DebugToggle, DebugPanel } from './DebugControls.tsx';

type ControlsProps = {
  className?: string;
};

const Controls = ({ className }: ControlsProps) => (
  <div className={className}>
    <div className="flex flex-wrap items-center gap-2 rounded bg-black/60 p-3 text-white backdrop-blur-sm">
      <TransportControls />
      <EditControls />
      <SpeedSlider />
      <BrushModeSelector />
      <FileControls />
      <DebugToggle />
    </div>
    <DebugPanel />
  </div>
);

export { Controls };
export type { ControlsProps };
