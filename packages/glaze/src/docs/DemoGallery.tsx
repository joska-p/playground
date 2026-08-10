import { useState } from 'react';
import { Accordion, AccordionItem, Badge } from '@repo/ui/data-display';
import { useCases, useCaseLevels } from '../example/useCases';

const levelName = (level: number): string =>
    useCaseLevels.find((entry) => entry.level === level)?.name ?? `Level ${String(level)}`;

/**
 * Single-open demo accordion. Only the open item mounts its canvas, so at most
 * one frame loop runs at a time; closing an item unmounts it, which triggers
 * surface.destroy() and cancels its rAF. This is why the whole page stays fast
 * even though some demos push thousands of shapes per frame.
 */
export function DemoGallery() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <Accordion>
            {useCases.map((useCase) => {
                const isOpen = openId === useCase.id;
                return (
                    <AccordionItem
                        key={useCase.id}
                        title={`${useCase.title} — ${levelName(useCase.level)}`}
                        open={isOpen}
                        onToggle={(event) => {
                            setOpenId(event.currentTarget.open ? useCase.id : null);
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <p className="text-sm leading-relaxed text-foreground-muted">
                                {useCase.description}
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge variant="warning" size="sm">
                                    Level {useCase.level}
                                </Badge>
                                <Badge size="sm">{levelName(useCase.level)}</Badge>
                            </div>
                            <pre className="overflow-x-auto rounded-lg border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed text-foreground">
                                {useCase.snippet}
                            </pre>
                            <div className="h-80">
                                {isOpen && <useCase.Demo />}
                            </div>
                            {!isOpen && (
                                <p className="font-mono text-xs text-foreground-dim">
                                    Closed — the demo mounts its canvas only when this section is
                                    open.
                                </p>
                            )}
                        </div>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
