type LoadingFallbackProps = {
  progress?: number;
};

function LoadingFallback({ progress = 0 }: LoadingFallbackProps) {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-4">
      <p className="text-sm">Computing graph layout...</p>
      <div className="bg-muted h-2 w-64 overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-white/60 transition-all duration-300 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="text-xs">{Math.round(progress * 100)}%</p>
    </div>
  );
}

export { LoadingFallback };
