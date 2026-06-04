import { Sidebar } from '@repo/ui/Sidebar';
import type { JSX } from 'react';
import { Controls } from './controls/Controls';
import { SequenceDisplay } from './sequence-display/SequenceDisplay';

function SequenceRenderer(): JSX.Element {
  return (
    <Sidebar
      desktopPosition="bottom"
      mobilePosition="bottom"
    >
      <Sidebar.Main>
        <SequenceDisplay />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { SequenceRenderer };
