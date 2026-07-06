import { ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { resetViewport } from '../../stores/ui/actions';

function ViewportSection() {
  return (
    <ControlSection
      title="Viewport"
      defaultOpen={true}
    >
      <Button onClick={resetViewport}>Reset</Button>
    </ControlSection>
  );
}

export { ViewportSection };
