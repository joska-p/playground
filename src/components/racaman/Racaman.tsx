import { Controls } from "@/components/racaman/controls";
import {
	Sidebar,
	SidebarContent,
	SidebarProvider,
} from "@components/ui/Sidebar";
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
		<SidebarProvider className="h-full">
			<SidebarContent className="relative h-full" ref={containerRef}>
				<div className="absolute inset-0 content-center overflow-hidden">
					{drawMode === "vector-mode" && (
						<Vectors sequence={sequence} containerSize={containerSize} />
					)}
					{drawMode === "canvas-mode" && (
						<Canvas sequence={sequence} containerSize={containerSize} />
					)}
				</div>
			</SidebarContent>

			<Sidebar position="right">
				<Controls
					setSequence={setSequence}
					sequenceLength={sequence.length}
					setDrawMode={setDrawMode}
					drawMode={drawMode}
				/>
			</Sidebar>
		</SidebarProvider>
	);
};

export { Racaman };
