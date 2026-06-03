import { Sidebar } from "@repo/ui/Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import { Outputs } from "../components/display/Outputs";
import { Controls } from "./controls/Controls";

function ImageManipulator() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Sidebar desktopPosition="left" mobilePosition="bottom" className="min-h-screen flex-1">
        <Sidebar.Main>
          <Outputs />
        </Sidebar.Main>

        <Sidebar.Panel>
          <Controls />
        </Sidebar.Panel>
      </Sidebar>
    </ErrorBoundary>
  );
}

export { ImageManipulator };
