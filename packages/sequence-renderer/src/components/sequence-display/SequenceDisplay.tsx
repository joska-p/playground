import { useEffect, useRef } from "react";
import { visualizations } from "../../core/visualizations/visualizations";
import { useSequenceSequence, useSequenceVisualizationId } from "../../store/sequenceStore";

function SequenceDisplay() {
  const sequence = useSequenceSequence();
  const visualizationId = useSequenceVisualizationId();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const viz = visualizations.find((v: { id: string }) => v.id === visualizationId);
      viz?.draw(canvasRef.current, sequence);
    }
  }, [sequence, visualizationId]);

  return <canvas ref={canvasRef} width={800} height={600} className="h-full w-full" />;
}

export { SequenceDisplay };
