import { StrictMode } from "react";
import { SequenceMaker } from "@repo/sequence-renderer";
import "@repo/sequence-renderer/styles.css";

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
