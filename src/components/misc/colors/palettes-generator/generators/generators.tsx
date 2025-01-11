import { Button } from "@/components/ui/button";
import type { Signal } from "@preact/signals-react";
import type { HSLColor } from "../lib/color-conversions";
import { complementaryPalettes } from "../lib/complementary-palettes";

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function Generators({ palettes, baseColor }: Props) {
  const palette = complementaryPalettes(baseColor.value, 4);

  function handleClick() {
    palettes.value = [...palettes.value, palette];
  }

  return <Button onClick={handleClick}>Complementary</Button>;
}

export { Generators };
