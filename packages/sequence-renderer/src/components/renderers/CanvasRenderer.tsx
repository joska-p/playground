import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { visualizations } from "../../core/visualizations/index";
import { useSequenceStore } from "../../store/useSequenceStore";

function CanvasRenderer() {
  const { sequence, visualizationId } = useSequenceStore(
    useShallow((state) => ({
      sequence: state.sequence,
      visualizationId: state.visualizationId,
    }))
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const viz = visualizations.find((v) => v.id === visualizationId);
      viz?.draw(canvasRef.current, sequence);
    }
  }, [sequence, visualizationId]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}

export { CanvasRenderer };
