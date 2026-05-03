import { useEffect, useRef } from "react";
import { useDashboardStore, updateMetrics } from "../store/useDashboardStore.js";

function useDashboardLoop() {
  const rafRef = useRef<number | null>(null);
  const paused = useDashboardStore((s) => s.paused);

  useEffect(() => {
    function loop() {
      updateMetrics();
      rafRef.current = requestAnimationFrame(loop);
    }

    if (!paused) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [paused]);
}

export { useDashboardLoop };
