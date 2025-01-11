import { Button } from "@/components/ui/button";
import type { Signal } from "@preact/signals-react";
import type { HSLColor } from "../lib/color-conversions";
import { monochromeColorScheme } from "../lib/monochrome-color-scheme";

type Props = {
  palettes: Signal<HSLColor[][]>;
  baseColor: Signal<HSLColor>;
};

function Generators({ palettes, baseColor }: Props) {
  const monochrome = monochromeColorScheme(baseColor.value, 4);

  function handleClick() {
    palettes.value = [monochrome];
  }

  return <Button onClick={handleClick}>Monochrome</Button>;
}

export { Generators };
