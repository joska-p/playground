import { useGraphIsReady } from '../store/graphStore';

export function LoadingOverlay() {
  const isReady = useGraphIsReady();

  if (isReady) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <span className="text-sm tracking-widest text-primary font-mono animate-[gv-pulse_1.5s_ease-in-out_infinite]">
        SIMULATING FORCES…
      </span>
    </div>
  );
}
