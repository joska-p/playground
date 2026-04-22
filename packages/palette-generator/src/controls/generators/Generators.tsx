/**
 * source for the color generators https://www.procjam.com/tutorials/en/color/
 */

import { AnalogousForm } from "./AnalogousForm.js";
import { ComplementaryForm } from "./ComplementaryForm.js";
import { MonochromaticForm } from "./MonochromaticForm.js";
import { XadicForm } from "./XadicForm.js";

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
