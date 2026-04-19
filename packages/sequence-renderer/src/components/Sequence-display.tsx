import { useEffect, useRef } from "react";
import { CanvasRenderer } from "./renderers/Canvas-renderer.js";
import { SVGRenderer } from "./renderers/SVG-renderer.js";
import { useSequenceContext } from "./Sequence-context.js";

function SequenceDisplay() {
  const { drawMode, setContainerSize } = useSequenceContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {drawMode === "vector-mode" && <SVGRenderer />}
      {drawMode === "canvas-mode" && <CanvasRenderer />}
    </div>
  );
}
export { SequenceDisplay };
