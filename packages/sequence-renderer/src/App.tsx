import { SequenceRenderer } from "./components/SequenceRenderer";
import type { JSX } from "react";

function App(): JSX.Element {
  return (
    <div className="bg-background text-foreground h-screen">
      <SequenceRenderer />
    </div>
  );
}

export { App };
