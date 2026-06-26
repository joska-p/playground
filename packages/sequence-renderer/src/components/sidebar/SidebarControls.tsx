import type { JSX } from 'react';
import { LayerStackEditor } from '../layers/LayerStackEditor';
import { PresetSelector } from '../presets/PresetSelector';
import { Seed } from './Seed';
import { SequenceSelector } from './SequenceSelector';
import { StepsSlider } from './StepsSlider';
import { PlaybackControls } from './PlaybackControls';
import { ViewportControls } from './ViewportControls';
import { useSequenceRule } from '../../stores/sequence/selectors/useSequenceRule';

function SidebarControls(): JSX.Element {
  const sequenceRule = useSequenceRule();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3 px-3 py-3">
        <SequenceSelector />
        <Seed />
        {sequenceRule.maxSteps === 0 ? <PlaybackControls /> : <StepsSlider />}
        <PresetSelector />
      </div>

      <LayerStackEditor />
      <ViewportControls />
    </div>
  );
}

export { SidebarControls };
