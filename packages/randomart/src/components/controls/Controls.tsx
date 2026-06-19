import { CorrelatedToggle } from './CorrelatedToggle';
import { DownloadButton } from './DownloadButton';
import { MaxDepth } from './MaxDepth';
import { PlaybackButton } from './PlaybackButton';
import { RenderModeToggle } from './RenderModeToggle';
import { ResetTimeButton } from './ResetTimeButton';
import { SeedInput } from './SeedInput';
import { ShuffleButton } from './ShuffleButton';
import { TimeDisplay } from './TimeDisplay';

export function Controls() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <SeedInput />
      <MaxDepth />
      <ShuffleButton />
      <PlaybackButton />
      <TimeDisplay />
      <ResetTimeButton />
      <RenderModeToggle />
      <CorrelatedToggle />
      <DownloadButton />
    </div>
  );
}
