import type { ColorSpaceId } from '@repo/randomart-engine-next/types';
import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Checkbox, Textarea } from '@repo/ui/data-entry';
import { cn } from '@repo/ui/lib/cn';
import {
  setColorSpace,
  setCorrelatedRGB,
  setSeedText
} from '../../stores/randomart/actions/config';
import { useColorSpace, useCorrelatedRGB, useSeedText } from '../../stores/randomart/selectors';
import { DownloadSection } from './DownloadSection';
import { StateIOButtons } from './StateIOButtons';

const COLOR_SPACES: { id: ColorSpaceId; label: string }[] = [
  { id: 'srgb', label: 'sRGB' },
  { id: 'oklch', label: 'OKLCH' },
  { id: 'oklab', label: 'OKLab' },
  { id: 'hsl', label: 'HSL' }
];

function ConfigSection() {
  const seedText = useSeedText();
  const activeSpace = useColorSpace();
  const correlatedRGB = useCorrelatedRGB();

  return (
    <ControlGrid columns={4}>
      <Textarea
        className="col-span-3"
        autoGrow={false}
        value={seedText}
        onChange={(e) => {
          setSeedText(e.target.value);
        }}
      />

      <Checkbox
        label="linked"
        labelClassName={cn({ 'line-through': !correlatedRGB })}
        checked={correlatedRGB}
        variant="primary"
        onChange={() => {
          setCorrelatedRGB(!correlatedRGB);
        }}
      />

      <Button
        size="sm"
        onClick={() => {
          setSeedText(Math.random().toString(36).slice(2, 10));
        }}
      >
        Rand
      </Button>

      <DownloadSection />

      <StateIOButtons />

      {COLOR_SPACES.map((cs) => (
        <Button
          size="sm"
          key={`color-space-${cs.id}`}
          variant={activeSpace === cs.id ? 'accent' : 'default'}
          onClick={() => {
            setColorSpace(cs.id);
          }}
        >
          {cs.label}
        </Button>
      ))}
    </ControlGrid>
  );
}

export { ConfigSection };
