import { AnimationSpeed } from './AnimationSpeed';
import { AnimationToggle } from './AnimationToggle';
import { CorrelatedToggle } from './CorrelatedToggle';
import { DownloadButton } from './DownloadButton';
import { GrammarList } from './GrammarList';
import { MaxDepth } from './MaxDepth';
import { PlaybackButton } from './PlaybackButton';
import { RenderModeToggle } from './RenderModeToggle';
import { ResetTimeButton } from './ResetTimeButton';
import { SeedInput } from './SeedInput';
import { ShuffleButton } from './ShuffleButton';
import { TimeDisplay } from './TimeDisplay';

export function Controls() {
  return (
    <div className="grid h-full grid-cols-3 items-end justify-between gap-2">
      <div className="col-span-full">
        <SeedInput />
      </div>
      <MaxDepth />
      <DownloadButton />
      <TimeDisplay />
      <AnimationSpeed />
      <RenderModeToggle />
      <CorrelatedToggle />
      <ShuffleButton />
      <PlaybackButton />
      <ResetTimeButton />
      <AnimationToggle />
      <GrammarList />
    </div>
  );
}
