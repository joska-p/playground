import { Icon } from '@repo/ui/Icon';
import type { GraphNode } from '../../../data/graphData.types';

function ConnectionRow({
  node,
  direction
}: {
  node: GraphNode;
  direction: 'in' | 'out';
}) {
  const dir = direction === 'out' ? 'arrow-right' : 'arrow-left';
  return (
    <li className="bg-background/50 flex items-center gap-2 rounded-md px-2 py-1 text-xs">
      <Icon
        name={dir}
        className={
          direction === 'out'
            ? 'text-accent size-3.5 shrink-0'
            : 'text-primary size-3.5 shrink-0'
        }
      />
      <span className="truncate">{node.label}</span>
    </li>
  );
}

export { ConnectionRow };
