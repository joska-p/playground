import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { StrictMode, useEffect, useRef, useState } from "react";
import { Canvas } from "./canvas";
import { Controls } from "./controls";
import { createRacamanSequence } from "./lib/sequence";
import { Vectors } from "./vectors";

const Racaman = () => {
  const [sequence, setSequence] = useState<number[]>(createRacamanSequence(50));
  const [drawMode, setDrawMode] = useState("vector-mode");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SidebarProvider desktopPosition="bottom" mobilePosition={"bottom"}>
      <SidebarProvider.Content className="relative">
        <div ref={containerRef} className="absolute inset-0 content-center overflow-hidden">
          {drawMode === "vector-mode" && <Vectors sequence={sequence} containerSize={containerSize} />}
          {drawMode === "canvas-mode" && <Canvas sequence={sequence} containerSize={containerSize} />}
        </div>
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar>
        <Controls
          setSequence={setSequence}
          sequenceLength={sequence.length}
          setDrawMode={setDrawMode}
          drawMode={drawMode}
        />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
};

const StrictModeRacaman = () => {
  return (
    <StrictMode>
      <Racaman />
    </StrictMode>
  );
};

export { Racaman, StrictModeRacaman };
