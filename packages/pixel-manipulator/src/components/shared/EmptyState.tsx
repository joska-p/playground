import type { ReactNode } from 'react';

type EmptyStateProps = {
  message: string;
  icon?: ReactNode;
};

function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="border-border flex flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center">
      {icon}
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

export { EmptyState };
