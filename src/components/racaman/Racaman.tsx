import { Controls } from "@/components/racaman/controls";
import { SidebarProvider } from "@components/ui/sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./canvas";
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
		<SidebarProvider position="horizontal">
			<SidebarProvider.Content
				ref={containerRef}
				className="content-center overflow-hidden"
			>
				<div className="overflow-hidden">
					{drawMode === "vector-mode" && (
						<Vectors sequence={sequence} containerSize={containerSize} />
					)}
					{drawMode === "canvas-mode" && (
						<Canvas sequence={sequence} containerSize={containerSize} />
					)}
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

export { Racaman };
