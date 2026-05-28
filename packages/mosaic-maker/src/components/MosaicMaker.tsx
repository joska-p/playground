"use client";

import { Sidebar } from "@repo/ui/Sidebar";
import { Controls } from "./controls/Controls";
import { MosaicDisplay } from "./mosaic-display/MosaicDisplay";

function MosaicMaker() {
  return (
    <Sidebar
      desktopPosition="right"
      mobilePosition="bottom"
      className="w-full h-full border-t border-border"
    >
      <Sidebar.Toggle />

      <Sidebar.Main>
        <MosaicDisplay />
      </Sidebar.Main>

      <Sidebar.Panel className="border-border p-4 border-t lg:border-t-0 lg:border-l h-full flex flex-col overflow-hidden min-w-lg">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h2 className="text-lg font-semibold tracking-tight">Mosaic Controls</h2>
          <Sidebar.Toggle className="lg:hidden" />
        </div>
        <div className="overflow-y-auto pr-2 flex-1">
          <Controls />
        </div>
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { MosaicMaker };
