import type { ComponentType } from 'react';

export type UseCaseCardProps = {
    index: number;
    title: string;
    description: string;
    snippet: string;
    Demo: ComponentType;
};

export function UseCaseCard({ index, title, description, snippet, Demo }: UseCaseCardProps) {
    return (
        <section className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#12151b] p-5">
            <header className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-500">
                    {String(index).padStart(2, '0')}
                </span>
                <h2 className="font-mono text-sm font-semibold tracking-wide text-amber-300">
                    {title}
                </h2>
            </header>
            <p className="text-sm leading-relaxed text-neutral-400">{description}</p>
            <pre className="overflow-x-auto rounded-lg border border-white/5 bg-[#0b0d11] p-4 font-mono text-xs leading-relaxed text-neutral-200">
                {snippet}
            </pre>
            <div className="h-80">
                <Demo />
            </div>
        </section>
    );
}
