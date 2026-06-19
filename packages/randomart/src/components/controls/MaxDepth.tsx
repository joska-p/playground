import { Input } from '@repo/ui/Input';
import { setMaxDepth } from '../../stores/randomart/actions/seed';
import { useMaxDepth } from '../../stores/randomart/selectors/useMaxDepth';

function MaxDepth() {
  const maxDepth = useMaxDepth();

  return (
    <Input
      label="Max depth"
      type="number"
      min="1"
      max="10"
      value={maxDepth}
      onChange={(e) => setMaxDepth(Number(e.target.value))}
    />
  );
}

export { MaxDepth };
