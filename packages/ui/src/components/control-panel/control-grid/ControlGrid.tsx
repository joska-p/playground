import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

export interface ControlGridProps {
    columns?: 2 | 3 | 4 | 5 | 6;
    className?: string;
    children: ReactNode;
}

const COLUMN_CLASS: Record<2 | 3 | 4 | 5 | 6, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
};

/**
 * Side-by-side fields stay compact enough that, unlike ControlRow, no portrait/landscape split is
 * needed.
 */
export function ControlGrid({ columns = 3, className, children }: ControlGridProps) {
    return <div className={cn('grid gap-2', COLUMN_CLASS[columns], className)}>{children}</div>;
}
