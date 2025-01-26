import { MosaicMaker } from "@jpotin/mosaic-maker";
import { StrictMode } from "react";
import "@jpotin/mosaic-maker/dist/mosaic-maker.css";

function StrictModeMosaicMaker() {
  return (
    <StrictMode>
      <MosaicMaker />
    </StrictMode>
  );
}

export { StrictModeMosaicMaker };
