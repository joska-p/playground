import type { JSX } from "react";
import { SequenceRenderer } from "./components/SequenceRenderer";

function App(): JSX.Element {
  return (
    <div className="bg-background text-foreground h-screen">
      <SequenceRenderer />
    </div>
  );
}

export { App };
