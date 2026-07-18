import { ControlSection } from '@repo/ui/control-panel';
import { Switch } from '@repo/ui/data-entry';
import { setCorrelatedRGB } from '../../stores/randomart/actions/display';
import { useCorrelatedRGB } from '../../stores/randomart/selectors';

export function DisplaySection() {
  const correlatedRGB = useCorrelatedRGB();

  return (
    <ControlSection
      title="display"
      defaultOpen={false}
    >
      <Switch
        label="correlated RGB"
        checked={correlatedRGB}
        variant="primary"
        onChange={() => {
          setCorrelatedRGB(!correlatedRGB);
        }}
      />
    </ControlSection>
  );
}
