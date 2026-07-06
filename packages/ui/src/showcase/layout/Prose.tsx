export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground-muted max-w-160 space-y-3 text-sm leading-relaxed">
      {children}
    </div>
  );
}
