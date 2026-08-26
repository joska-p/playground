import type { GraphNode } from '../../../core/pipeline/graphData.schema';

function ConnectionRow({ node, direction }: { node: GraphNode; direction: 'in' | 'out' }) {
    const symbol = direction === 'out' ? '→' : '←';

    return (
        <li className="bg-background/50 flex items-center gap-2 rounded-md px-2 py-1 text-xs">
            <span
                className={
                    direction === 'out'
                        ? 'text-accent font-mono size-3.5 shrink-0'
                        : 'text-primary font-mono size-3.5 shrink-0'
                }
            >
                {symbol}
            </span>
            <span className="truncate">{node.label}</span>
        </li>
    );
}

export { ConnectionRow };
