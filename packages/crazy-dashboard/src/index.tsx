import { Controls } from "./components/controls/Controls.js";
import { Dashboard } from "./components/dashboard/Dashboard.js";
import { Sidebar } from "@repo/ui";
import { useDashboardLoop } from "./hooks/useDashboardLoop.js";
import { useDashboardStore } from "./store/useDashboardStore.js";

function CrazyDashboard() {
  const theme = useDashboardStore((s) => s.theme);
  useDashboardLoop();

  return (
    <div data-theme={theme} className="h-full w-full">
      <Sidebar desktopPosition="top" mobilePosition="top">
        <Sidebar.Main className="relative">
          <Dashboard />
        </Sidebar.Main>

        <Sidebar.Panel>
          <Controls />
        </Sidebar.Panel>
      </Sidebar>
    </div>
  );
}

export { CrazyDashboard };
