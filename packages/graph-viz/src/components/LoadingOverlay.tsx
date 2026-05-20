import { useGraphStore } from "../store/useGraphStore";

export function LoadingOverlay() {
  const isReady = useGraphStore((s) => s.isReady);

  if (isReady) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
      <span className="text-accent animate-pulse text-sm tracking-widest">SIMULATING FORCES…</span>
    </div>
  );
}
