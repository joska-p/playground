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
 * Arranges several small controls side by side — an x/y/z vector, an
 * RGB triplet. Unlike ControlRow, this doesn't change with
 * orientation: each cell is already narrow enough to sit comfortably
 * in portrait, so adding a landscape variant would just be motion for
 * its own sake.
 */
export function ControlGrid({ columns = 3, className, children }: ControlGridProps) {
  return <div className={cn('grid gap-2', COLUMN_CLASS[columns], className)}>{children}</div>;
}
