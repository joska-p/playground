import { useState } from 'react';
import { Accordion, AccordionItem, Badge } from '@repo/ui/data-display';
import { useCases, useCaseLevels } from './useCases';

const levelName = (level: number): string =>
    useCaseLevels.find((entry) => entry.level === level)?.name ?? `Level ${String(level)}`;

const levelEmoji = (level: number): string =>
    useCaseLevels.find((entry) => entry.level === level)?.emoji ?? '';

function CodeBlock({ children }: { children: string }) {
    return (
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface-raised/30 p-4 font-mono text-xs leading-relaxed text-foreground">
            {children}
        </pre>
    );
}

export function DemoGallery() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <p className="text-sm leading-relaxed text-foreground-muted">
                    Five levels, one lifecycle: from a canvas that runs itself to a GPGPU simulation
                    — each demo builds on the concepts before it.
                </p>
                <div className="flex flex-wrap gap-2">
                    {useCaseLevels.map((level) => (
                        <Badge
                            key={level.level}
                            appearance="outline"
                            size="sm"
                            title={level.description}
                        >
                            {level.emoji} {level.name}
                        </Badge>
                    ))}
                </div>
            </div>

            <Accordion>
                {useCases.map((useCase) => {
                    const isOpen = openId === useCase.id;
                    return (
                        <AccordionItem
                            key={useCase.id}
                            title={`${levelEmoji(useCase.level)} ${useCase.title} — ${levelName(
                                useCase.level
                            )}`}
                            open={isOpen}
                            onToggle={(event) => {
                                setOpenId(event.currentTarget.open ? useCase.id : null);
                            }}
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm leading-relaxed text-foreground-muted">
                                        {useCase.summary}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="warning"
                                            size="sm"
                                        >
                                            Level {useCase.level}
                                        </Badge>
                                        <Badge size="sm">{levelName(useCase.level)}</Badge>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    {useCase.sections.map((section) => (
                                        <section
                                            key={section.heading}
                                            className="flex flex-col gap-2"
                                        >
                                            <h4 className="text-sm font-semibold text-foreground">
                                                {section.heading}
                                            </h4>
                                            {section.body.map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="text-sm leading-relaxed text-foreground-muted"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                            {section.code && <CodeBlock>{section.code}</CodeBlock>}
                                        </section>
                                    ))}
                                </div>

                                <div className="h-80 overflow-hidden rounded-lg border border-border bg-background/60">
                                    {isOpen && <useCase.Demo />}
                                </div>
                                {!isOpen && (
                                    <p className="font-mono text-xs text-foreground-dim">
                                        Closed — the demo mounts its canvas only when this section
                                        is open.
                                    </p>
                                )}
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
