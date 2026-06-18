import { Input } from '@repo/ui/Input';
import { setSeedText } from '../../stores/randomart/actions';
import { useSeedText } from '../../stores/randomart/selectors/useSeedText';

export function SeedInput() {
  const seedText = useSeedText();

  return (
    <Input
      type="text"
      value={seedText}
      onChange={(e) => setSeedText(e.target.value)}
      placeholder="Try 'galaxy', 'ocean', or 'sunset'..."
      variant="primary"
      label="Seed Text"
      fullWidth
    />
  );
}
