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

function Controls({ className, orientation = 'vertical' }: ControlsProps) {
  const vert = orientation === 'vertical';

  return (
    <div className={className}>
      <div className="rounded-lg border border-[var(--color-ca-panel-border)] bg-[var(--color-ca-panel)] p-2 text-foreground backdrop-blur-xl transition-all duration-300">
        <div
          className={`flex items-center gap-1 ${vert ? 'flex-wrap' : 'overflow-x-auto'}`}
        >
          <TransportControls />
          <span className="mx-1 h-4 w-px bg-[var(--color-ca-panel-border)]" />
          <EditControls />
          <span className="mx-1 h-4 w-px bg-[var(--color-ca-panel-border)]" />
          <BrushModeSelector />
        </div>
        <div className="mt-1.5 flex items-center gap-2 overflow-x-auto border-t border-[var(--color-ca-panel-border)] pt-1.5">
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
}

export { Controls };
export type { ControlsProps };
