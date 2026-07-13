import type { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border-white/10 bg-white/[0.03] font-mono text-[10px] tracking-wider uppercase">
      {children}
    </span>
  );
}
