function getPaletteId(palette) {
    return Object.values(palette).sort().join("-");
}
function arePalettesEqual(a, b) {
    return getPaletteId(a) === getPaletteId(b);
}
export { arePalettesEqual, getPaletteId };
