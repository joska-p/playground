import { StrictMode } from "react";
import { SequenceMaker } from "@repo/sequence-renderer";

function Recaman() {
  return <SequenceMaker />;
}

function StrictModeRecaman() {
  return (
    <StrictMode>
      <Recaman />
    </StrictMode>
  );
}

export { Recaman, StrictModeRecaman };
