import { Input } from '@repo/ui/Input';
import { useStore } from 'zustand';
import { randomartStore } from '../../stores/randomart/store';

export function TimeDisplay() {
  const time = useStore(randomartStore, (s) => s.time);

  return (
    <Input
      type="text"
      variant="outline"
      label="Time"
      value={`${time.toFixed(2)}s`}
      readOnly
    />
  );
}
