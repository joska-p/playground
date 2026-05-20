import { useGraphStore } from "../store/useGraphStore";

export function LoadingOverlay() {
  const isReady = useGraphStore((s) => s.isReady);

  if (isReady) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <span className="text-accent text-sm tracking-widest animate-pulse">SIMULATING FORCES…</span>
    </div>
  );
}
