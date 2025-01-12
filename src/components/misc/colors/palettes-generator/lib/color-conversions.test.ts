import { describe, expect, test } from "vitest";
import type { HSLColor, RGBColor } from "./color-conversions";
import { HSLToHex, HSLToRGB, RGBToHSL, RGBToHex, hexToHSL, hexToRGB } from "./color-conversions";

describe("color-conversions", () => {
  test("should convert RGB to HSL", () => {
    const rgb: RGBColor = { red: 200, green: 200, blue: 200 };
    const hsl: HSLColor = { hue: 0, saturation: 0, lightness: 78 };
    expect(RGBToHSL(rgb)).toEqual(hsl);
  });

  test("should convert HSL to RGB", () => {
    const hsl: HSLColor = { hue: 7, saturation: 55, lightness: 48 };
    const rgb: RGBColor = { red: 190, green: 71, blue: 55 };
    expect(HSLToRGB(hsl)).toEqual(rgb);
  });

  test("should convert RGB to hex", () => {
    const rgb: RGBColor = { red: 190, green: 71, blue: 55 };
    const hex = "#be4737";
    expect(RGBToHex(rgb)).toEqual(hex);
  });

  test("should convert HSL to Hex", () => {
    const hsl: HSLColor = { hue: 7, saturation: 55, lightness: 48 };
    const hex = "#be4737";
    expect(HSLToHex(hsl)).toEqual(hex);
  });

  test("should convert hex to RGB", () => {
    const hex = "#be4737";
    const rgb: RGBColor = { red: 190, green: 71, blue: 55 };
    expect(hexToRGB(hex)).toEqual(rgb);
  });

  test("should convert hex to HSL", () => {
    const hex = "#be4737";
    const hsl: HSLColor = { hue: 7, saturation: 55, lightness: 48 };
    expect(hexToHSL(hex)).toEqual(hsl);
  });
});
