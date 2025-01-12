/**
 * source for the color generators https://www.procjam.com/tutorials/en/color/
 */

import type { Signal } from "@preact/signals-react";
import type { HSLColor } from "../../lib/color-conversions";
import { AnalogousForm } from "./analogous-form";
import { ComplementaryForm } from "./complementary-form";
import { MonochromaticForm } from "./monochromatic-form";
import { XadicForm } from "./xadic-form";

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function Generators({ palettes, baseColor }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <MonochromaticForm palettes={palettes} baseColor={baseColor} />
      <XadicForm palettes={palettes} baseColor={baseColor} />
      <AnalogousForm palettes={palettes} baseColor={baseColor} />
      <ComplementaryForm palettes={palettes} baseColor={baseColor} />
    </div>
  );
}

export { Generators };
