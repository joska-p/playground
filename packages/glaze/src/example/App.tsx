import { useCases } from './useCases';
import { UseCaseCard } from './UseCaseCard';

export function App() {
    return (
        <div className="min-h-dvh w-full bg-[#0b0d11] text-neutral-200">
            <header className="border-b border-white/10 px-6 py-4">
                <div className="flex items-baseline gap-3">
                    <h1 className="font-mono text-sm font-semibold tracking-wide text-amber-300">
                        @repo/glaze
                    </h1>
                    <span className="font-mono text-xs text-neutral-500">
                        one use case per card — snippet above, live demo below
                    </span>
                </div>
            </header>
            <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-8">
                {useCases.map((useCase, index) => (
                    <UseCaseCard
                        key={useCase.id}
                        index={index + 1}
                        title={useCase.title}
                        description={useCase.description}
                        snippet={useCase.snippet}
                        Demo={useCase.Demo}
                    />
                ))}
            </main>
        </div>
    );
}
