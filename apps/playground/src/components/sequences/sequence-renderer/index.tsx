import { StrictMode } from "react";
import { SequenceRenderer } from "@repo/sequence-renderer";

function StrictModeSequenceRenderer() {
  return (
    <StrictMode>
      <SequenceRenderer />
    </StrictMode>
  );
}

export { StrictModeSequenceRenderer };
