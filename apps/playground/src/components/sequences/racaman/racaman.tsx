import { StrictMode } from "react";
import { SequenceMaker } from "@repo/sequence-renderer";
import "@repo/sequence-renderer/styles.css";

function StrictModeRacaman() {
  return (
    <StrictMode>
      <SequenceMaker />
    </StrictMode>
  );
}

export { StrictModeRacaman };
