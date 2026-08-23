import type { NestingLevel } from './levels';

const PAD_BY_DEPTH = [
    'p-3 pt-6 sm:p-6 sm:pt-8',
    'p-3 pt-5 sm:p-5 sm:pt-7',
    'p-2.5 pt-4 sm:p-4 sm:pt-6',
    'p-2.5 pt-4 sm:pt-5',
    'p-2 pt-3.5 sm:pt-4',
    'p-2 pt-3.5',
    'p-1.5 pt-3',
    'p-3'
];

const RADIUS_BY_DEPTH = [
    'rounded-xl',
    'rounded-lg',
    'rounded-lg',
    'rounded-md',
    'rounded-md',
    'rounded-md',
    'rounded-sm',
    'rounded-sm'
];

/** Renders the matryoshka stack: level[0] is the core, the last one wraps everything. */
export function renderNesting(stack: NestingLevel[]): string {
    const [level, ...rest] = stack;

    if (!level) return '';

    const depth = stack.length > 8 ? 0 : 8 - stack.length;
    const num = String(level.num);
    const label = `
        <span class="levoyage-tag" aria-hidden="true">
            <span class="levoyage-num">${num.padStart(2, '0')}</span>
            <span class="levoyage-name">${level.name}</span>
        </span>`;

    const inner =
        rest.length > 0
            ? renderNesting(rest)
            : '<div class="flex items-center justify-center py-5"><span class="levoyage-core"></span></div>';

    return `
        <div
            class="levoyage-box relative ${PAD_BY_DEPTH[depth]} ${RADIUS_BY_DEPTH[depth]}"
            style="--lv: ${level.color}"
            data-level="${num}"
            tabindex="0"
            role="button"
            aria-label="Niveau ${num} : ${level.name}. Activer pour afficher les détails."
            aria-pressed="false"
        >
            ${label}
            ${inner}
        </div>`;
}
