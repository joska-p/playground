import { ControlGrid } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { setSeedText } from '../../stores/randomart/actions/config';
import { DownloadButton } from './DownloadButton';
import { StateIOButtons } from './StateIOButtons';

function ActionControls() {
  return (
    <ControlGrid columns={4}>
      <Button
        size="sm"
        onClick={() => {
          setSeedText(Math.random().toString(36).slice(2, 10));
        }}
      >
        Rand
      </Button>
      <DownloadButton />
      <StateIOButtons />
    </ControlGrid>
  );
}

export { ActionControls };
