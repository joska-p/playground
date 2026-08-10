import { useCases, useCaseLevels, type UseCase, type UseCaseLevel } from './useCases';
import { UseCaseCard } from './UseCaseCard';
import { LifecycleReport } from './report/LifecycleReport';

const LEVEL_COLORS: Record<number, string> = {
    1: 'text-green-400',
    2: 'text-yellow-400',
    3: 'text-orange-400',
    4: 'text-rose-400'
};

const levelOf = (level: number): UseCaseLevel | undefined =>
    useCaseLevels.find((entry) => entry.level === level);

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
            <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-8">
                <LifecycleReport />
                {useCases.map((useCase: UseCase, index: number) => {
                    const level = levelOf(useCase.level);
                    const previous = index > 0 ? useCases[index - 1] : undefined;
                    const showLevel = previous?.level !== useCase.level;

                    return (
                        <div
                            key={useCase.id}
                            className="flex flex-col gap-4"
                        >
                            {showLevel && level && (
                                <div className="flex items-baseline gap-3 pt-2">
                                    <span className="font-mono text-2xl">{level.emoji}</span>
                                    <div className="flex flex-col">
                                        <h2
                                            className={`font-mono text-sm font-semibold uppercase tracking-wide ${LEVEL_COLORS[level.level] ?? 'text-neutral-300'}`}
                                        >
                                            Level {level.level} — {level.name}
                                        </h2>
                                        <span className="font-mono text-xs text-neutral-500">
                                            {level.description}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <UseCaseCard
                                index={index + 1}
                                title={useCase.title}
                                description={useCase.description}
                                snippet={useCase.snippet}
                                Demo={useCase.Demo}
                            />
                        </div>
                    );
                })}
            </main>
        </div>
    );
}
