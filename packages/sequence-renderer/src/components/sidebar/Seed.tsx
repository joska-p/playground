import { Input } from '@repo/ui/Input';
import { setSeed } from '../../stores/sequence/actions';
import { useSeed } from '../../stores/sequence/selectors';

function Seed() {
  const seed = useSeed();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSeed(e.target.value);

  return (
    <Input
      type="text"
      value={seed}
      onChange={handleChange}
      label="seed"
    />
  );
}

export { Seed };
