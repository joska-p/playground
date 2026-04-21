/**
 * source for the color generators https://www.procjam.com/tutorials/en/color/
 */

import { AnalogousForm } from "./AnalogousForm";
import { ComplementaryForm } from "./ComplementaryForm";
import { MonochromaticForm } from "./MonochromaticForm";
import { XadicForm } from "./XadicForm";

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
