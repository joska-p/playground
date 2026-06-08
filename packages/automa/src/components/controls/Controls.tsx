import { PlaybackControls } from './PlaybackControls.tsx';
import { EditControls } from './EditControls.tsx';
import { SpeedSlider } from './SpeedSlider.tsx';
import { BrushModeSelector } from './BrushModeSelector.tsx';
import { RuleSelector } from './RuleSelector.tsx';
import { ShaderSelector } from './ShaderSelector.tsx';
import { DebugToggle, DebugPanel } from './DebugControls.tsx';
import { cn } from '@repo/ui/cn';

type ControlsProps = {
  className?: string;
};

function Controls({ className }: ControlsProps) {
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:flex lg:flex-col p-2 gap-2'
      )}
    >
      <PlaybackControls />
      <EditControls />
      <BrushModeSelector />
      <SpeedSlider />
      <RuleSelector />
      <ShaderSelector />
      <DebugToggle />
      <DebugPanel />
    </div>
  );
}

export { Controls };
export type { ControlsProps };
