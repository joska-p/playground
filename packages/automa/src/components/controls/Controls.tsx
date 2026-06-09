import { cn } from '@repo/ui/cn';
import { BrushModeSelector } from './BrushModeSelector.tsx';
import { CreatureSelector } from './CreatureSelector.tsx';
import { DebugPanel, DebugToggle } from './DebugControls.tsx';
import { EditControls } from './EditControls.tsx';
import { PlaybackControls } from './PlaybackControls.tsx';
import { RuleSelector } from './RuleSelector.tsx';
import { ShaderSelector } from './ShaderSelector.tsx';
import { SpeedSlider } from './SpeedSlider.tsx';

type ControlsProps = {
  className?: string;
};

function Controls({ className }: ControlsProps) {
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-5 lg:flex lg:flex-col'
      )}
    >
      <PlaybackControls />
      <EditControls />
      <BrushModeSelector />
      <CreatureSelector />
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
