import { StrictMode } from "react";
import { SequenceMaker } from "@repo/sequence-renderer";

function Racaman() {
  return <SequenceMaker />;
}

function StrictModeRacaman() {
  return (
    <StrictMode>
      <Racaman />
    </StrictMode>
  );
}

export { Racaman, StrictModeRacaman };
