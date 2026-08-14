import { useState } from 'react';

type Reflection = {
    id: number;
    name: string;
    kindString?: string;
    comment?: {
        summary?: { kind: string; text: string }[];
        blockTags?: { tag: string; content: { kind: string; text: string }[] }[];
    };
    signatures?: Reflection[];
    type?: { type: string; name?: string; types?: Reflection[]; elementType?: { name: string } };
    typeParameters?: { name: string; type?: unknown; constraint?: unknown }[];
    children?: Reflection[];
    parameters?: Reflection[];
};

function renderCommentSummary(summary?: { text: string }[]) {
    if (!summary) return null;
    return <p className="text-sm opacity-90">{summary.map((s) => s.text).join('')}</p>;
}

function renderExamples(blockTags?: { tag: string; content: { text: string }[] }[]) {
    if (!blockTags) return null;
    const examples = blockTags.filter((t) => t.tag === '@example');
    if (examples.length === 0) return null;

    return (
        <div className="mt-2 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Example:
            </span>
            {examples.map((ex, idx) => (
                <pre
                    key={idx}
                    className="bg-muted/50 rounded p-2 text-xs font-mono overflow-x-auto"
                >
                    <code>{ex.content.map((c) => c.text).join('')}</code>
                </pre>
            ))}
        </div>
    );
}

function ReflectionItem({ item }: { item: Reflection }) {
    const [expanded, setExpanded] = useState(false);

    const summary = item.comment?.summary ?? item.signatures?.[0]?.comment?.summary;
    const blockTags = item.comment?.blockTags ?? item.signatures?.[0]?.comment?.blockTags;
    const kind = item.kindString ?? 'Member';

    return (
        <div className="border-border/30 rounded-lg border p-4 space-y-3 bg-surface/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                        {kind}
                    </span>
                    <h4 className="font-mono font-semibold text-sm">{item.name}</h4>
                </div>
                {(item.typeParameters ?? item.children ?? item.type) && (
                    <button
                        onClick={() => {
                            setExpanded(!expanded);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {expanded ? 'Collapse details' : 'Expand details +'}
                    </button>
                )}
            </div>

            {renderCommentSummary(summary)}
            {renderExamples(blockTags)}

            {expanded && (
                <div className="mt-3 pt-3 border-t border-border/20 space-y-2 text-xs font-mono text-muted-foreground">
                    {item.typeParameters && item.typeParameters.length > 0 && (
                        <div>
                            <span className="font-semibold">Type Parameters:</span>
                            <ul className="list-disc pl-4 mt-1">
                                {item.typeParameters.map((tp, idx) => (
                                    <li key={idx}>{tp.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.type && (
                        <div>
                            <span className="font-semibold">Type:</span>{' '}
                            <span className="text-foreground">{JSON.stringify(item.type)}</span>
                        </div>
                    )}
                    {item.children && item.children.length > 0 && (
                        <div>
                            <span className="font-semibold">
                                Members / Children ({item.children.length}):
                            </span>
                            <div className="space-y-2 mt-2">
                                {item.children.map((child) => (
                                    <div
                                        key={child.id}
                                        className="p-2 bg-muted/20 rounded"
                                    >
                                        <span className="font-bold text-foreground">
                                            {child.name}
                                        </span>
                                        {child.kindString && (
                                            <span className="ml-2 text-[10px] opacity-75">
                                                ({child.kindString})
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function ApiView({ typedoc }: { typedoc: Reflection }) {
    const children = typedoc.children ?? [];
    if (children.length === 0) {
        return <p className="text-sm text-muted-foreground">No exported members found.</p>;
    }

    return (
        <div className="space-y-4">
            {children.map((child) => (
                <ReflectionItem
                    key={child.id}
                    item={child}
                />
            ))}
        </div>
    );
}
