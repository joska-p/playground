import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { render } from '../../core/visualizations/render';
import {
  setViewport,
  useLayersConfig,
  useSequenceSequence,
  useViewport
} from '../../stores/sequence/store';

function SequenceDisplay(): JSX.Element {
  const sequence = useSequenceSequence();
  const layers = useLayersConfig();
  const viewport = useViewport();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sequenceRef = useRef(sequence);
  const layersRef = useRef(layers);
  const viewportRef = useRef(viewport);

  const renderRaf = useRef<number | null>(null);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    render(canvas, sequenceRef.current, layersRef.current, viewportRef.current);
  }

  // Keep refs in sync for rAF reads
  useEffect(() => { sequenceRef.current = sequence; }, [sequence]);
  useEffect(() => { layersRef.current = layers; }, [layers]);
  useEffect(() => { viewportRef.current = viewport; }, [viewport]);

  // Sequence/layers change → render immediately
  useEffect(() => { draw(); }, [sequence, layers]);

  // Viewport change → throttle via rAF
  useEffect(() => {
    if (renderRaf.current !== null) return;
    renderRaf.current = requestAnimationFrame(() => {
      draw();
      renderRaf.current = null;
    });
    return () => {
      if (renderRaf.current !== null) {
        cancelAnimationFrame(renderRaf.current);
        renderRaf.current = null;
      }
    };
  }, [viewport]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let startPanX = 0;
    let startPanY = 0;

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const vp = viewportRef.current;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const zoomDelta = -e.deltaY / 500;
      const newZoom = Math.max(0.1, Math.min(5, vp.zoom * Math.exp(zoomDelta)));

      const newPanX = mx - (mx - vp.panX) * (newZoom / vp.zoom);
      const newPanY = my - (my - vp.panY) * (newZoom / vp.zoom);

      setViewport({ enabled: true, zoom: newZoom, panX: newPanX, panY: newPanY });
    }

    function handleMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      isPanning = true;
      startX = e.clientX;
      startY = e.clientY;
      const vp = viewportRef.current;
      startPanX = vp.panX;
      startPanY = vp.panY;
      if (!vp.enabled) {
        setViewport({ enabled: true });
      }
      canvas.style.cursor = 'grabbing';
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isPanning) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setViewport({ panX: startPanX + dx, panY: startPanY + dy });
    }

    function handleMouseUp() {
      if (!isPanning) return;
      isPanning = false;
      canvas.style.cursor = '';
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    />
  );
}

export { SequenceDisplay };
