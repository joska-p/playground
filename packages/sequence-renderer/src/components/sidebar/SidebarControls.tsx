import type { JSX } from 'react';
import { LayerStackEditor } from '../layers/LayerStackEditor';
import { PresetSelector } from '../presets/PresetSelector';
import { PlaybackControls } from './PlaybackControls';
import { Seed } from './Seed';
import { SequenceSelector } from './SequenceSelector';
import { StepsSlider } from './StepsSlider';
import { ViewportControls } from './ViewportControls';

function SidebarControls(): JSX.Element {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3 px-3 py-3">
        <SequenceSelector />
        <Seed />
        <StepsSlider />
        <PlaybackControls />
        <PresetSelector />
      </div>

      <LayerStackEditor />
      <ViewportControls />
    </div>
  );
}

export { SidebarControls };
