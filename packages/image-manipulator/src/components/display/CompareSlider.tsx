import { useCallback, useEffect, useRef, useState } from "react";

type CompareSliderProps = {
  source: ImageData;
  result: ImageData;
};

function CompareSlider({ source, result }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const offscreenRef = useRef<{ source: HTMLCanvasElement; result: HTMLCanvasElement } | null>(
    null
  );
  const prevSourceRef = useRef<ImageData | null>(null);
  const prevResultRef = useRef<ImageData | null>(null);

  const width = source.width;
  const height = source.height;

  useEffect(() => {
    const needsRebuild =
      !offscreenRef.current || prevSourceRef.current !== source || prevResultRef.current !== result;

    if (needsRebuild) {
      const s = document.createElement("canvas");
      s.width = source.width;
      s.height = source.height;
      s.getContext("2d")!.putImageData(source, 0, 0);

      const r = document.createElement("canvas");
      r.width = result.width;
      r.height = result.height;
      r.getContext("2d")!.putImageData(result, 0, 0);

      offscreenRef.current = { source: s, result: r };
      prevSourceRef.current = source;
      prevResultRef.current = result;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!offscreenRef.current) return;
    const { source: srcCanvas, result: resCanvas } = offscreenRef.current;
    if (!srcCanvas || !resCanvas) return;

    const sliderX = (sliderPos / 100) * width;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(resCanvas, 0, 0);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sliderX, height);
    ctx.clip();
    ctx.drawImage(srcCanvas, 0, 0);
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(sliderX, 0);
    ctx.lineTo(sliderX, height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sliderX, height / 2, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#1d2021";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [source, result, sliderPos, width, height]);

  const updateSliderPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateSliderPosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateSliderPosition]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none overflow-hidden rounded-lg"
      style={{
        width: "100%",
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
        cursor: "ew-resize",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        isDragging.current = true;
        updateSliderPosition(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (!isDragging.current) return;
        updateSliderPosition(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        isDragging.current = false;
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export { CompareSlider };
