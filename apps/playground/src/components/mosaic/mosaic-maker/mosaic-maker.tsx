import { MosaicMaker } from "@repo/mosaic-maker/MosaicMaker";
import "@repo/mosaic-maker/styles.css";
import { StrictMode } from "react";

function StrictModeMosaicMaker() {
  return (
    <StrictMode>
      <MosaicMaker />
    </StrictMode>
  );
}

export { StrictModeMosaicMaker };
