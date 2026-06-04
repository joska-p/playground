import { Sidebar } from "@repo/ui/Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import { Controls } from "./organisms/Controls";
import { Outputs } from "./organisms/Outputs";

function ImageManipulator() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Sidebar desktopPosition="left" mobilePosition="bottom" className="min-h-dvh flex-1">
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
