import { useEffect, useRef } from "react";
import { CanvasRenderer } from "../renderers/CanvasRenderer.js";
import { SVGRenderer } from "../renderers/SVGRenderer.js";
import { useSequenceStore } from "../../store/useSequenceStore.js";

function SequenceDisplay() {
  const { drawMode } = useSequenceStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {drawMode === "vector-mode" && <SVGRenderer />}
      {drawMode === "canvas-mode" && <CanvasRenderer />}
    </div>
  );
}
export { SequenceDisplay };
