# Color Theory — Palette Generator Reference

All hue angles in degrees on the HSL color wheel (0–360).

## Standard Harmony Schemes

### Monochromatic

- **Hue**: fixed to base hue
- **Variation**: lightness ± spread, saturation can also vary
- **Math**: `L_i = clamp(base_L + i * step, 5, 95)` where `step = spread / count`

### Analogous

- **Hue**: step away from base by `angle` degrees
- **Math**: `H_i = (base_H + i * angle) mod 360`
- **Default angle**: 30° (3 colors → base −30°, base, base +30°)

### Complementary

- **Hue**: exactly opposite
- **Math**: `H_comp = (base_H + 180) mod 360`
- **If count > 2**: intermediate hues are interpolated, or S/L variants are generated

### Split-Complementary

- **Hue**: base + the two colors adjacent to the complement
- **Math**:
  ```
  comp = (base_H + 180) mod 360
  H_1  = (comp - angle) mod 360
  H_2  = (comp + angle) mod 360
  ```
- **Default angle**: 30°

### Triadic

- **Hue**: three colors evenly spaced (equilateral triangle on the wheel)
- **Math**:
  ```
  H_1 = (base_H + 120) mod 360
  H_2 = (base_H + 240) mod 360
  ```
- **If count > 3**: repeat hues with S/L variants

### Tetradic (Rectangle / Double-Complementary)

- **Hue**: two complementary pairs offset by `n` degrees
- **Math**:
  ```
  H_1 = (base_H)          mod 360
  H_2 = (base_H + offset) mod 360
  H_3 = (base_H + 180)    mod 360
  H_4 = (base_H + 180 + offset) mod 360
  ```
- **Default offset**: 60° (Rectangle). Offset = 90° gives Square harmony.

## Multi-Color Interpolation

Generates a smooth gradient between N pinned base colors:

```
for i in 0..count:
  t = i / (count - 1)
  segment = floor(t * (N - 1))
  local_t = t * (N - 1) - segment
  color = lerp(pinned[segment], pinned[segment + 1], local_t)
```

Interpolates each HSL channel independently. Note: hue interpolation goes the short way around the wheel.

## Sources

- https://www.procjam.com/tutorials/en/color/
- https://www.ngene.org/color_harmony.html
- https://tigercolor.com/color-lab/color-theory/color-harmonies.htm
