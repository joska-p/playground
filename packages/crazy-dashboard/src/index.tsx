import { Controls } from "./components/controls/Controls.js";
import { Dashboard } from "./components/dashboard/Dashboard.js";
import { Sidebar } from "@repo/ui";

function CrazyDashboard() {
  return (
    <Sidebar desktopPosition="bottom" mobilePosition="bottom">
      <Sidebar.Main className="relative">
        <Dashboard />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { CrazyDashboard };
