import { Button } from '@repo/ui/Button';
import { type FC, useState } from 'react';
import { DetailsPanel } from './components/DetailsPanel.tsx';
import { FilterControls } from './components/FilterControls.tsx';
import { GraphCanvas } from './components/GraphCanvas.tsx';
import type { GraphData } from './components/graphData.types';
import rawData from './data/processed-graph.json' with { type: 'json' };
import { selectNode } from './stores/graph/actions';
import { useSelectedNodeIdx } from './stores/graph/selectors';

const data = rawData as unknown as GraphData;

const App: FC = () => {
  const [panelOpen, setPanelOpen] = useState(true);
  const selectedNodeIdx = useSelectedNodeIdx();

  return (
    <div className="bg-background text-foreground relative h-screen w-screen overflow-hidden">
      {/* 3D Canvas — fills the entire viewport */}
      <div className="absolute inset-0">
        <GraphCanvas data={data} />
      </div>

      {/* Floating UI overlay */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Toggle button — always visible */}
        <Button
          variant="primary"
          size="sm"
          className="bg-primary/80 border-primary/30 text-primary-foreground pointer-events-auto absolute top-4 left-4 backdrop-blur-md"
          onClick={() => setPanelOpen((p) => !p)}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 5.25C4.41421 5.25 4.75 4.91421 4.75 4.5C4.75 4.08579 4.41421 3.75 4 3.75C3.58579 3.75 3.25 4.08579 3.25 4.5C3.25 4.91421 3.58579 5.25 4 5.25ZM6.5 5.25C6.91421 5.25 7.25 4.91421 7.25 4.5C7.25 4.08579 6.91421 3.75 6.5 3.75C6.08579 3.75 5.75 4.08579 5.75 4.5C5.75 4.91421 6.08579 5.25 6.5 5.25ZM9 5.25C9.41421 5.25 9.75 4.91421 9.75 4.5C9.75 4.08579 9.41421 3.75 9 3.75C8.58579 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 8.58579 5.25 9 5.25ZM11.5 5.25C11.9142 5.25 12.25 4.91421 12.25 4.5C12.25 4.08579 11.9142 3.75 11.5 3.75C11.0858 3.75 10.75 4.08579 10.75 4.5C10.75 4.91421 11.0858 5.25 11.5 5.25ZM13.5 6C13.9142 6 14.25 5.66421 14.25 5.25C14.25 4.83579 13.9142 4.5 13.5 4.5C13.0858 4.5 12.75 4.83579 12.75 5.25C12.75 5.66421 13.0858 6 13.5 6ZM1.5 7.5C1.91421 7.5 2.25 7.16421 2.25 6.75C2.25 6.33579 1.91421 6 1.5 6C1.08579 6 0.75 6.33579 0.75 6.75C0.75 7.16421 1.08579 7.5 1.5 7.5ZM4 7.5C4.41421 7.5 4.75 7.16421 4.75 6.75C4.75 6.33579 4.41421 6 4 6C3.58579 6 3.25 6.33579 3.25 6.75C3.25 7.16421 3.58579 7.5 4 7.5ZM6.5 7.5C6.91421 7.5 7.25 7.16421 7.25 6.75C7.25 6.33579 6.91421 6 6.5 6C6.08579 6 5.75 6.33579 5.75 6.75C5.75 7.16421 6.08579 7.5 6.5 7.5ZM9 7.5C9.41421 7.5 9.75 7.16421 9.75 6.75C9.75 6.33579 9.41421 6 9 6C8.58579 6 8.25 6.33579 8.25 6.75C8.25 7.16421 8.58579 7.5 9 7.5ZM11.5 7.5C11.9142 7.5 12.25 7.16421 12.25 6.75C12.25 6.33579 11.9142 6 11.5 6C11.0858 6 10.75 6.33579 10.75 6.75C10.75 7.16421 11.0858 7.5 11.5 7.5ZM13.5 7.5C13.9142 7.5 14.25 7.16421 14.25 6.75C14.25 6.33579 13.9142 6 13.5 6C13.0858 6 12.75 6.33579 12.75 6.75C12.75 7.16421 13.0858 7.5 13.5 7.5ZM1.5 9.75C1.91421 9.75 2.25 9.41421 2.25 9C2.25 8.58579 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 8.58579 0.75 9C0.75 9.41421 1.08579 9.75 1.5 9.75ZM4 9.75C4.41421 9.75 4.75 9.41421 4.75 9C4.75 8.58579 4.41421 8.25 4 8.25C3.58579 8.25 3.25 8.58579 3.25 9C3.25 9.41421 3.58579 9.75 4 9.75ZM6.5 9.75C6.91421 9.75 7.25 9.41421 7.25 9C7.25 8.58579 6.91421 8.25 6.5 8.25C6.08579 8.25 5.75 8.58579 5.75 9C5.75 9.41421 6.08579 9.75 6.5 9.75ZM9 9.75C9.41421 9.75 9.75 9.41421 9.75 9C9.75 8.58579 9.41421 8.25 9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75ZM11.5 9.75C11.9142 9.75 12.25 9.41421 12.25 9C12.25 8.58579 11.9142 8.25 11.5 8.25C11.0858 8.25 10.75 8.58579 10.75 9C10.75 9.41421 11.0858 9.75 11.5 9.75ZM13.5 9.75C13.9142 9.75 14.25 9.41421 14.25 9C14.25 8.58579 13.9142 8.25 13.5 8.25C13.0858 8.25 12.75 8.58579 12.75 9C12.75 9.41421 13.0858 9.75 13.5 9.75ZM1.5 12C1.91421 12 2.25 11.6642 2.25 11.25C2.25 10.8358 1.91421 10.5 1.5 10.5C1.08579 10.5 0.75 10.8358 0.75 11.25C0.75 11.6642 1.08579 12 1.5 12ZM4 12C4.41421 12 4.75 11.6642 4.75 11.25C4.75 10.8358 4.41421 10.5 4 10.5C3.58579 10.5 3.25 10.8358 3.25 11.25C3.25 11.6642 3.58579 12 4 12ZM6.5 12C6.91421 12 7.25 11.6642 7.25 11.25C7.25 10.8358 6.91421 10.5 6.5 10.5C6.08579 10.5 5.75 10.8358 5.75 11.25C5.75 11.6642 6.08579 12 6.5 12ZM9 12C9.41421 12 9.75 11.6642 9.75 11.25C9.75 10.8358 9.41421 10.5 9 10.5C8.58579 10.5 8.25 10.8358 8.25 11.25C8.25 11.6642 8.58579 12 9 12ZM11.5 12C11.9142 12 12.25 11.6642 12.25 11.25C12.25 10.8358 11.9142 10.5 11.5 10.5C11.0858 10.5 10.75 10.8358 10.75 11.25C10.75 11.6642 11.0858 12 11.5 12ZM13.5 12C13.9142 12 14.25 11.6642 14.25 11.25C14.25 10.8358 13.9142 10.5 13.5 10.5C13.0858 10.5 12.75 10.8358 12.75 11.25C12.75 11.6642 13.0858 12 13.5 12Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          {panelOpen ? 'Hide' : 'Show'}
        </Button>

        {/* Side panel — slides in from the right */}
        {panelOpen && (
          <div className="scrollbar-thumb-primary/30 pointer-events-auto absolute top-14 right-4 bottom-4 flex scrollbar-thin scrollbar-track-transparent flex-col gap-4 overflow-y-auto">
            <DetailsPanel
              nodes={data.nodes}
              links={data.links}
            />
            <FilterControls nodes={data.nodes} />
          </div>
        )}

        {/* Bottom bar — selected node quick info */}
        {selectedNodeIdx !== null && !panelOpen && (
          <div className="pointer-events-auto absolute bottom-4 left-1/2 -translate-x-1/2">
            <QuickNodeBadge nodes={data.nodes} />
          </div>
        )}
      </div>
    </div>
  );
};

/** Small badge at the bottom when a node is selected but panel is closed */
function QuickNodeBadge({ nodes }: { nodes: GraphData['nodes'] }) {
  const selectedNodeIdx = useSelectedNodeIdx();
  const node = selectedNodeIdx !== null ? nodes[selectedNodeIdx] : null;
  if (!node) return null;

  return (
    <div className="border-primary/30 bg-primary/80 text-primary-foreground flex items-center gap-3 rounded-full border px-4 py-2 shadow-lg backdrop-blur-md">
      <span className="max-w-60 truncate text-sm font-semibold">
        {node.label}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => selectNode(null)}
      >
        <svg
          className="h-3 w-3"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
}

export { App };
