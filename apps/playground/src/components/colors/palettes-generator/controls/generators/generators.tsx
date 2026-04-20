/**
 * source for the color generators https://www.procjam.com/tutorials/en/color/
 */

import { AnalogousForm } from "./analogous-form";
import { ComplementaryForm } from "./complementary-form";
import { MonochromaticForm } from "./monochromatic-form";
import { XadicForm } from "./xadic-form";

function Generators() {
  return (
    <div className="flex flex-col gap-4">
      <MonochromaticForm />
      <XadicForm />
      <AnalogousForm />
      <ComplementaryForm />
    </div>
  );
}

export { Generators };
